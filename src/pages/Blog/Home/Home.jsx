// Home.jsx
import { useEffect, useState } from "react";
import Header from "../../../components/BlogComponents/Header/Header";
import Posts from "../../../components/BlogComponents/Create/Posts";
import Sidebar from "../../../components/BlogComponents/Sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TopBar from "../../../components/BlogComponents/Topbar/Topbar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://learned.onrender.com/blog/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <TopBar />
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
