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
    maxWidth: "25vh",
    height: "auto",
    justifyContent: "space-around",
    position: "reletive",
  };

  const url =
    "https://api.opensea.io/api/v1/assets?owner=0x0704136a21b94e6bbfcc5c9c09b0db243320f558&order_direction=desc&offset=0&limit=50";
  //const url =
  //  "https://api.opensea.io/api/v1/asset?owner=0x0704136a21b94e6bbfcc5c9c09b0db243320f558&offset=0&limit=300";

  const getData = () => {
    fetch(url, options)
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
                <a href={c.permalink}>
                  <img
                    src={c.image_preview_url}
                    height="100%"
                    width="100%"
                    alt=""
                  />
                </a>
                <span>{c.name}</span>
              </div>
            );
          })}
      </main>
    </div>
  );
}

export default App;
