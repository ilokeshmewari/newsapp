import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://vedantatimes.com/wp-json/wp/v2/posts/${id}?_embed`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading blog...</p>;
  if (!blog) return <p className="p-6 text-center">Blog not found.</p>;

  const featuredImage =
    blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <button
        onClick={goBack}
        className="mb-4 py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
      >
       {'<'} Back
      </button>

      <h1 className="text-4xl font-bold mb-6 text-center">{blog.title.rendered}</h1>
      
    
      {featuredImage && (
        <img
          src={featuredImage}
          alt={blog.title.rendered}
          className="w-full h-auto rounded-lg shadow-lg mb-8"
        />
      )}

      <div
        className="prose max-w-none space-y-6"
        dangerouslySetInnerHTML={{ __html: blog.content.rendered }}
      />

      <style jsx>{`
        .prose table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
        }
        .prose th,
        .prose td {
          padding: 1rem;
          text-align: left;
          border: 1px solid #ddd;
        }
        .prose th {
          background-color: #f4f4f4;
        }
        .prose img {
          border-radius: 8px;
        }
        
        /* Make subheadings bolder */
        .prose h2, .prose h3, .prose h4 {
          font-weight: bold;
        }

        /* Increase font size of paragraphs */
        .prose p {
          font-size: 16px;
        }

        /* Style links to be blue */
        .prose a {
          color: #1e40af; /* Tailwind blue color */
          text-decoration: underline;
        }

        .prose a:hover {
          color: #2563eb; /* Slightly lighter blue on hover */
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
