import { useState, useEffect } from "react";
import "./App.css";
import React from "react";

const options = { method: "GET" };

function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "15px",
    width: "25vh",
    height: "25vh",
    justifyContent: "space-around",
    position: "reletive",
  };

  const url = `https://api.opensea.io/api/v1/assets?owner=0x0704136a21b94e6bbfcc5c9c09b0db243320f558&order_direction=desc&offset=${
    offset * limit
  }&limit=${limit}`;
  // const url =    "https://api.opensea.io/api/v1/bundles?on_sale=true&owner=0x0704136a21b94e6bbfcc5c9c09b0db243320f558&limit=20&offset=1";
  //  "https://api.opensea.io/api/v1/asset?owner=0x0704136a21b94e6bbfcc5c9c09b0db243320f558&offset=0&limit=300";

  const getData = (uri) => {
    fetch(uri, options)
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (data.length === 0) {
      getData(url);
    }
  });

  useEffect(() => {
    getData(url);
  }, [offset, url]);

  return (
    <div className="App">
      <header className="App-header">
        <p>NFT Art of Talented Artists</p>
      </header>
      {data.assets && data.assets.length > 0 ? (
        <>
          {/* {createButtons(setOffset, offset, data)} */}
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
          {createButtons(setOffset, offset, data)}
        </>
      ) : (
        <>
          <main className="App-main" style={{ flexDirection: "column" }}>
            <h3>No more NFT's here</h3>
            {createButtons(setOffset, offset, data)}
          </main>
        </>
      )}
    </div>
  );
}

export default App;

function createButtons(setOffset, offset, data) {
  const btn = {
    margin: "1.5rem",
    padding: ".5rem",
    minWidth: "100px",
    color: "rgba(40, 44, 52, 1)",
    border: "1px solid rgba(40, 44, 52, 1)",
    borderRadius: "5px",
  };

  const next = {
    background:
      data.assets && data.assets.length > 0
        ? "rgba(97, 175, 239, .95)"
        : "rgba(97, 175, 239, .15)",
  };

  const previous = {
    background:
      offset !== 0 ? "rgba(97, 175, 239, .95)" : "rgba(97, 175, 239, .15)",
  };

  return (
    <div>
      <button
        style={{ ...btn, ...previous }}
        onClick={() => setOffset(offset === 0 ? 0 : offset - 1)}
        disabled={offset === 0}
      >
        Previous
      </button>
      <button
        style={{ ...btn, ...next }}
        onClick={() => setOffset(offset + 1)}
        disabled={data.assets && data.assets.length > 0 ? "" : "disabled"}
      >
        Next
      </button>
    </div>
  );
}
