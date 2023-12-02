import "./Single.css";
import Sidebar from "../../../components/BlogComponents/Sidebar/Sidebar";
import SinglePost from "../../../components/BlogComponents/singlePost/singlePost";

export default function Single() {
  return (
    <div className="single">
      <SinglePost/>
      <Sidebar />
    </div>
  );
}