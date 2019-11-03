import React, { useState, useEffect } from "react";
import firebase from "./firebase";

export default () => {
  const [sampleData, setSampleData] = useState("{}");
  const [inputContains, setInputContains] = useState("game");
  const [inputContainsAny, setInputContainsAny] = useState("game,tech");
  const [inputWhereIn, setInputWhereIn] = useState("tweet,podcast");
  const [resultContains, setResultContains] = useState("");
  const [resultContainsAny, setResultContainsAny] = useState("");
  const [resultWhereIn, setResultWhereIn] = useState("");
  const collectionRef = firebase.firestore().collection("blogs");

  const onArrayContain = async () => {
    setResultContains("Loading...");
    const hitData = await collectionRef
      .where("tags", "array-contains", inputContains)
      .get()
      .then(res => res.docs.map(doc => doc.id));
    console.log(hitData);
    setResultContains(JSON.stringify(hitData, null, 4));
  };

  const onArrayContainAny = async () => {
    setResultContainsAny("Loading...");
    const where = inputContainsAny.split(",");
    console.log("array-contains-any", where);
    const hitData = await collectionRef
      .where("tags", "array-contains-any", where)
      .get()
      .then(res => res.docs.map(doc => doc.id));
    console.log(hitData);
    setResultContainsAny(JSON.stringify(hitData, null, 4));
  };

  const onWhereIn = async () => {
    setResultWhereIn("Loading...");
    const where = inputWhereIn.split(",");
    console.log("in", where);
    const hitData = await collectionRef
      .where("type", "in", where)
      .get()
      .then(res => res.docs.map(doc => doc.id));
    console.log(hitData);
    setResultWhereIn(JSON.stringify(hitData, null, 4));
  };

  const fetchSampleData = async () => {
    const tmpSampleData = {};
    await collectionRef
      .get()
      .then(res => res.docs.map(doc => (tmpSampleData[doc.id] = doc.data())));
    setSampleData(JSON.stringify(tmpSampleData, null, 2));
  };

  useEffect(() => {
    fetchSampleData();
  });

  return (
    <div className="section is-space py-6">
      <div className="inner">
        <h1 className="heading is-xl is-strong mb-6">Firestore Sandbox</h1>
        <div className="inner">
          <h1 className="heading is-md is-strong">
            Sample Data (documentId : documentData)
          </h1>
          <pre>
            <code className="code block overflow-scroll h-64 my-3">
              {sampleData}
            </code>
          </pre>
        </div>

        <div className="inner mt-6">
          <h1 className="heading is-xl is-strong mb-3">Queries</h1>
          <div className="mb-6">
            <h1 className="heading is-md is-strong mb-3">Array Contains</h1>
            <p>
              firebase.firestore().collection("blogs").where("tags",
              "array-contains", "{inputContains}")
            </p>
            <input
              type="text"
              className="input my-3"
              placeholder="A"
              value={inputContains}
              onChange={e => setInputContains(e.target.value)}
            />
            <button
              className="btn is-primary is-plain "
              onClick={onArrayContain}
            >
              Submit
            </button>
            {resultContains && (
              <div>
                <h3 className="heading is-sm is-strong mb-3">
                  Array Contains's Result (documentIds)
                </h3>
                <code className="code block mb-3">{resultContains}</code>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h1 className="heading is-md is-strong mb-3">Array Contain Any</h1>
            <p>
              firebase.firestore().collection("blogs").where("tags",
              "array-contains-any", [
              {inputContainsAny
                .split(",")
                .map(t => `"${t}"`)
                .join(",")}
              ])
            </p>
            <input
              type="text"
              className="input my-3"
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
                <h3 className="heading is-sm is-strong mb-3">
                  Array Contain Any's Result (documentIds)
                </h3>
                <code className="code block mb-3">{resultContainsAny}</code>
              </div>
            )}
          </div>
          <div className="mb-6">
            <h1 className="heading is-md is-strong mb-3">WhereIn</h1>
            <p>
              firebase.firestore().collection("blogs").where("type", "in", [
              {inputWhereIn
                .split(",")
                .map(t => `"${t}"`)
                .join(",")}
              ])
            </p>
            <input
              type="text"
              className="input my-3"
              placeholder="A,B"
              value={inputWhereIn}
              onChange={e => setInputWhereIn(e.target.value)}
            />
            <button className="btn is-primary is-plain " onClick={onWhereIn}>
              Submit
            </button>
            {resultWhereIn && (
              <div>
                <h3 className="heading is-sm is-strong mb-3">
                  WhereIn's Result (documentIds)
                </h3>
                <code className="code block mb-3">{resultWhereIn}</code>
              </div>
            )}
          </div>
        </div>
        <footer>
          <p>
            Maker is{" "}
            <a
              className="text is-link is-primary"
              href="https://twitter.com/nabettu"
              rel="noopener noreferrer"
              target="_blank"
            >
              @nabettu
            </a>
          </p>
          <p className="texts">
            <a
              className="text is-link is-primary"
              href="https://github.com/nabettu/firestore-sandbox"
              rel="noopener noreferrer"
              target="_blank"
            >
              Repository
            </a>{" "}
            on GitHub.
          </p>
        </footer>
      </div>
    </div>
  );
};
