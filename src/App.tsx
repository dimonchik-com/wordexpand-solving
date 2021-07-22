import React, { useState, useRef } from "react";
import { shuffle } from "lodash";
import "./App.css";
// @ts-ignore
import * as words from "categorized-words";

function App() {
  const [type, setType] = useState("N");
  const [seachValue, updateSearch] = useState("");
  const [strLen, setStrLen] = useState("");
  const inputRef = useRef<any>(null);

  const clickButton = (key: string) => {
    setType(key);
    inputRef.current.focus();
  };

  const startTyping = (event: any) => {
    updateSearch(event.target.value);
  };

  const result = shuffle(
    words[type].filter(
      (element: string) =>
        element.startsWith(seachValue) &&
        (!strLen || element.length === +strLen)
    )
  )
    .sort((a: string, b: string) => a.length - b.length)
    .slice(0, 200);

  return (
    <div className="App">
      <button
        className={type === "N" ? "active" : "p1"}
        onClick={() => clickButton("N")}
      >
        nouns
      </button>
      <button
        className={type === "V" ? "active" : "p1"}
        onClick={() => clickButton("V")}
      >
        verbs
      </button>
      <button
        className={type === "A" ? "active" : "p1"}
        onClick={() => clickButton("A")}
      >
        adjectives
      </button>
      <input
        size={3}
        value={strLen}
        onChange={(e) => setStrLen(e.target.value)}
      />
      <hr />
      <input
        type="text"
        value={seachValue}
        className="p2"
        onChange={startTyping}
        ref={inputRef}
      />
      <input type="submit" value="Clear" onClick={() => updateSearch("")} />
      {result.map((element: string) => {
        return <p>{element}</p>;
      })}
      <hr />
    </div>
  );
}

export default App;
