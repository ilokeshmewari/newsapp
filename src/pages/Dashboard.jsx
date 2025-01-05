import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Papa from "papaparse";
import jsPDF from "jspdf";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [payoutData, setPayoutData] = useState([]);
  const [totalPayout, setTotalPayout] = useState(0);

  // Fetching articles from the API
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("https://vedantatimes.com/wp-json/wp/v2/posts");
      const data = await response.json();
      setArticlesData(data);
    };

    fetchArticles();
  }, []);

  // Calculating the payout based on the number of articles written by each author
  const calculatePayout = () => {
    const authorData = {};

    // Group articles by author and calculate article count and payout
    articlesData.forEach((article) => {
      const authorId = article.author;
      let authorName;

      // Mapping author ID to author name
      if (authorId === 1) {
        authorName = "Deepak Singh"; // Author ID 1 -> Deepak Singh
      } else if (authorId === 2) {
        authorName = "Lokesh Singh Mewari"; // Author ID 2 -> Lokesh Singh Mewari
      } else {
        authorName = "Unknown"; // If author ID is not 1 or 2
      }

      // Accumulating the article count and payout for each author
      if (!authorData[authorName]) {
        authorData[authorName] = { articleCount: 0, payout: 0 };
      }
      authorData[authorName].articleCount++;
    });

    // Calculate payout for each author
    const payout = Object.keys(authorData).map((authorName) => {
      const { articleCount } = authorData[authorName];
      const payoutAmount = articleCount * 2; // $2 per article
      authorData[authorName].payout = payoutAmount;

      return { authorName, articleCount, payout: payoutAmount };
    });

    setPayoutData(payout);
    setTotalPayout(payout.reduce((total, item) => total + item.payout, 0));
  };

  // Download CSV
  const downloadCSV = () => {
    const csv = Papa.unparse(payoutData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "author_payout_data.csv";
    link.click();
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Payout Data", 20, 10);
    let y = 20;
    payoutData.forEach((item) => {
      doc.text(`${item.authorName}: ${item.articleCount} articles - $${item.payout}`, 20, y + 10);
      y += 10;
    });

    doc.text(`Total Payout: $${totalPayout}`, 20, y + 20);
    doc.save("payout_data.pdf");
  };

  const chartData = {
    labels: payoutData.map((item) => item.authorName),
    datasets: [
      {
        label: "Articles Written",
        data: payoutData.map((item) => item.articleCount),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Author Article Overview",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <div className="mb-8">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="bg-white p-4 rounded-md shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payout Data</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Articles Written</th>
              <th className="px-4 py-2 border">Payout ($)</th>
            </tr>
          </thead>
          <tbody>
            {payoutData.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.authorName}</td>
                <td className="px-4 py-2 border">{item.articleCount}</td>
                <td className="px-4 py-2 border">{item.payout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mb-4">
        <button
          onClick={calculatePayout}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Calculate Payout
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={downloadCSV}
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 mr-4"
        >
          Download Articles CSV
        </button>
        <button
          onClick={downloadPDF}
          className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700"
        >
          Download Payout PDF
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
