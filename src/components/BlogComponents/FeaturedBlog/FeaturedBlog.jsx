import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import './FeaturedBlog.css';

const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        // Fetch all blog posts from your API
        const response = await axios.get("http://localhost:8000/blog/posts");

        // Filter the posts to get only the featured ones
        const featuredPosts = response.data.filter((post) => post.featured);

        setFeaturedBlogs(featuredPosts);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  return (
    <div className="featured-blogs">
      <h2>Featured Blogs</h2>
      <div className="blog-list">
        {featuredBlogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <Link to={`/blog/posts/${blog._id}`}>
              <h3>{blog.title}</h3>
            </Link>
            <p>{blog.desc}</p>
            <p>Author: {blog.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogs;
