import { useState, useEffect } from "react";
import "./App.css";
import React from "react";

const options = { method: "GET" };

function App() {
  const [data, setData] = useState([]);

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "15px",
    height: "25vh",
    justifyContent: "space-around",
  };

  const getData = () => {
    fetch(
      "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20",
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (data.length === 0) {
      getData();
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <p>NFT Art of Talented Artists</p>
      </header>
      <main className="App-main">
        {data.assets &&
          data.assets.map((c) => {
            return (
              <div id={c.token_id} style={divStyle}>
                <img src={c.collection.featured_image_url} height="100%" alt="" />
                <span>{c.collection.name}</span>
              </div>
            );
          })}
      </main>
    </div>
  );
}

export default App;
