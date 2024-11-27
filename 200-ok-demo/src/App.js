import React, { useState } from "react";
import "./App.css";

function App() {
  const [res, setRes] = useState(undefined);
  const [err, setErr] = useState(undefined);

  const fetchData = async () => {
    try {
      const requestData = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      if (!requestData.ok) throw new Error("Failed to fetch data!");
      if (requestData.status === 200) {
        const data = await requestData.json();
        setRes(data);
      } else {
        return;
      }
    } catch (err) {
      setErr(err);
    }
  };

  return (
    <div className="container">
      <h1>Fetch API Data</h1>
      <button onClick={fetchData}>Get Data</button>
      {err && <p className="error">Error: {err.message}</p>}
      {res ? (
        <div className="response">
          <h2>Title: {res.title}</h2>
          <p>Body: {res.body}</p>
        </div>
      ) : (
        <p className="loading">Click the button to load data...</p>
      )}
    </div>
  );
}

export default App;
