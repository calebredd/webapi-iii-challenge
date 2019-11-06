import React, { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Posts from "./components/Posts.js";
function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:9000/api/users")
        .then(res => {
          // console.log(res.data.users);
          setUsers(res.data.users);
        })
        .catch(err => {
          console.error(err);
        });
    }
    fetchData();
  }, []);
  // console.log(users);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Users and Posts API</h1>
      </header>
      <div className="users">
        {users.map(user => (
          <div className="userCard" key={user.id}>
            <p className="userName">{user.name}</p>
            <Posts userId={user.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
