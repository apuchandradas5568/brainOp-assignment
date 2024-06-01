import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/userContext";
import { useLoaderData, useNavigate } from "react-router-dom";

const Post = () => {

  const data = useLoaderData()

  console.log(data.data.data);
  const {user, setUser} = useContext(AuthContext)
  const [posts, setPosts] = useState([...data.data.data])
  const navigate = useNavigate()








  const handleLogout = () => {
    axios.post("http://localhost:3333/auth/sign-out", {}, { withCredentials: true })
    localStorage.removeItem('userdata');
    setUser(null);
    navigate('/sign-in')
  }

  return (
    <>
      <div className="shadow-md top-0 left-0 right-0 fixed  p-8   bg-gray-100 ">
      <div className="flex   mx-auto max-w-[1200px] justify-between items-center">
        <h1 className="text-3xl font-bold ">Explore MelodyVerse</h1>
        <button onClick={handleLogout} className="btn bg-indigo-700 text-white px-8 py-3 rounded-md hover:bg-indigo-800  ">
          Sign Out
        </button>
      </div>
      </div>
      <div className="post-list mt-28  container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-card rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                <p className="text-gray-700 line-clamp-3">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
