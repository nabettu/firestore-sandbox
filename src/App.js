import React, { useState, useEffect } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvJUTfvuoyhzV5o-0RBaZswkPv7RDmfUo",
  authDomain: "testtesttestaaa-37182.firebaseapp.com",
  databaseURL: "https://testtesttestaaa-37182.firebaseio.com",
  projectId: "testtesttestaaa-37182",
  storageBucket: "testtesttestaaa-37182.appspot.com",
  messagingSenderId: "182294101262",
  appId: "1:182294101262:web:a78f8f55c315ce9086eb5f"
};

firebase.initializeApp(firebaseConfig);

export default () => {
  const [sampleData, setSampleData] = useState("{}");
  const [inputContains, setInputContains] = useState("A");
  const [inputContainsAny, setInputContainsAny] = useState("A,B");
  const [resultContains, setResultContains] = useState("");
  const [resultContainsAny, setResultContainsAny] = useState("");

  const onArrayContain = async () => {
    const hitData = await firebase
      .firestore()
      .collection("test")
      .where("array", "array-contains", inputContains)
      .get()
      .then(res => {
        const returnData = [];
        res.forEach(doc => returnData.push(doc.id));
        return returnData;
      });
    console.log(hitData);
    setResultContains(JSON.stringify(hitData));
  };

  const onArrayContainAny = async () => {
    const where = inputContainsAny.split(",");
    console.log("array-contains-any", where);
    const hitData = await firebase
      .firestore()
      .collection("test")
      .where("array", "array-contains-any", where)
      .get()
      .then(res => {
        const returnData = [];
        res.forEach(doc => returnData.push(doc.id));
        return returnData;
      });
    console.log(hitData);
    setResultContainsAny(JSON.stringify(hitData));
  };

  const fetchSampleData = async () => {
    const tmpSampleData = {};
    await firebase
      .firestore()
      .collection("test")
      .get()
      .then(res => {
        res.forEach(doc => (tmpSampleData[doc.id] = doc.data()));
      });
    setSampleData(JSON.stringify(tmpSampleData));
  };

  useEffect(() => {
    fetchSampleData();
  }, []);

  return (
    <div className="section is-space">
      <div className="inner">
        <h1 className="heading is-xl is-strong">Firestore Sandbox</h1>
        <div className="inner">
          <h1 className="heading is-md is-strong">Sample Data</h1>
          <code
            className="code"
            style={{ display: "block", width: "400px", margin: "1rem" }}
          >
            {sampleData}
          </code>
        </div>
        <div className="inner">
          <h1 className="heading is-md">Array Contains</h1>
          <input
            type="text"
            class="input"
            placeholder="A"
            value={inputContains}
            onChange={e => setInputContains(e.target.value)}
          />
          <button className="btn is-primary is-plain " onClick={onArrayContain}>
            Submit
          </button>
          {resultContains && (
            <div>
              <h1 className="heading is-m">Result</h1>
              <code
                className="code"
                style={{ display: "block", width: "400px", margin: "1rem" }}
              >
                {resultContains}
              </code>
            </div>
          )}
        </div>
        <div>
          <h1 className="heading is-md">Array Contain Any</h1>
          <input
            type="text"
            class="input"
            placeholder="A,B"
            value={inputContainsAny}
            onChange={e => setInputContainsAny(e.target.value)}
          />
          <button
            className="btn is-primary is-plain "
            onClick={onArrayContainAny}
          >
            Submit
          </button>
          {resultContainsAny && (
            <div>
              <h1 className="heading is-m">Result</h1>
              <code
                className="code"
                style={{ display: "block", width: "400px", margin: "1rem" }}
              >
                {resultContainsAny}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
