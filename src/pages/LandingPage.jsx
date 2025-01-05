import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import featimage from '../assets/featured.jpg';

const LandingPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleBlogs, setVisibleBlogs] = useState(6); // Initially show 6 blogs

  useEffect(() => {
    fetch("https://vedantatimes.com/wp-json/wp/v2/posts?_embed")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  // Function to decode HTML entities
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const truncateExcerpt = (excerpt) => {
    const plainText = excerpt.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return plainText.length > 100 ? `${plainText.slice(0, 100)}...` : plainText;
  };

  const toggleBlogs = () => {
    setVisibleBlogs((prev) => (prev === 6 ? blogs.length : 6)); // Toggle between 6 blogs and all blogs
  };

  if (loading) return <p className="p-6 text-center">Loading articles...</p>;

  return (
    <div className="p-6 lg:px-24 md:px-0">
      {/* Top Image Section */}
      <div className="relative mb-8 mx-2 z-10 cursor-pointer group">
        <img
          src={featimage}
          alt="Featured"
          className="w-full h-80 md:h-96 object-cover rounded-lg transition-all group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-blue-600 opacity-60 rounded-lg transition-all group-hover:bg-blue-700 group-hover:opacity-70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <h2 className="text-white text-3xl md:text-4xl font-bold text-center px-4">
            Explore Latest Articles Here, You Are Welcome!
          </h2>
          <p className="text-white text-sm md:text-base mt-2 text-center px-4">
            This site is created by Lokesh Singh Mewari for the SportsDuniya assignment.
          </p>
          <p className="text-white">We are using vedantatimes.com API</p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Latest Articles</h1>
      {/* Blue Horizontal Line */}
      <hr className="border-t-2 border-blue-600 mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogs.slice(0, visibleBlogs).map((blog) => {
          const featuredImage =
            blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const decodedTitle = decodeHtml(blog.title.rendered); // Decode the title

          return (
            <div
              key={blog.id}
              className="border rounded-md p-4 shadow hover:shadow-lg transition-transform transform hover:scale-105"
            >
              {featuredImage && (
                <div className="relative group">
                  <img
                    src={featuredImage}
                    alt={decodedTitle}
                    className="w-full h-40 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-40 transition-all rounded-md"></div>
                </div>
              )}
              <h3 className="font-bold text-xl mb-2">{decodedTitle}</h3> {/* Use decoded title */}
              <p className="text-gray-700 mb-4">
                {truncateExcerpt(blog.excerpt.rendered)}
              </p>
              <Link
                to={`/blogs/${blog.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Read More
              </Link>
            </div>
          );
        })}
      </div>

      {/* Toggle Button */}
      <div className="text-center mt-6">
        <button
          onClick={toggleBlogs}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          {visibleBlogs === 6 ? "Load More" : "Show Less"}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
