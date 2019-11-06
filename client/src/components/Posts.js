import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Posts(props) {
  const [posts, setPosts] = useState([""]);
  const { userId } = props;
  // console.log(userId);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`http://localhost:9000/api/users/${userId}/posts`)
        .then(res => {
          // console.log(res.data.userPosts);
          setPosts(res.data.userPosts);
        })
        .catch(err => {
          console.error(err);
        });
    }
    fetchData();
  }, [userId]);
  return (
    <div className="userQuotes">
      {posts.map(post => (
        <p className="quote" key={post.id}>
          "{post.text}"
        </p>
      ))}
    </div>
  );
}
