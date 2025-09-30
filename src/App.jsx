import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // import custom CSS

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/shorten", { originalUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Backend not reachable");
    }
  };

  return (
    <div className="container">
      <h1 className="title">🔗 URL Shortener</h1>
      <p className="subtitle">Shrink your long links into clean, shareable URLs</p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your long URL..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Shorten URL
        </button>
      </form>
      {shortUrl && (
        <div className="result">
          <p>✅ Your Short Link:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
