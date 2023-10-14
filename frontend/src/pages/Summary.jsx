import "./Summary.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Summary = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sinceLastCommit, setSinceLastCommit] = useState(0);
  const [summary, setSummary] = useState("");
  const url = searchParams.get("url");
  const poi = searchParams.get("poi");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/receive_repo?url=${url}&poi=${poi}`)
      .then((response) => {
        setSinceLastCommit(response.data.since_last_commit);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="backgroundWaves">
      <div className="header">
        <h1 id="companyName">company name here </h1>
      </div>
      <div className="main">
          <h1 className="title">Summarization of Commits Since</h1>
          <h1 className="title2">{sinceLastCommit} Commits Ago</h1>
        <div className="summary">
          <p>
          Code summary goes here. We use Co:here’s API to summarize all Github commits since your last one.Code summary goes here. We use Co:here’s API to summarize all Github commits since your last one.Code summary goes here. We use Co:here’s API to summarize all Github commits since your last one.Code summary goes here. We use Co:here’s API to summarize all Github commits since your last one.Code summary goes here. We use Co:here’s API to summarize all Github commits since your last one.Code summary goes here. We use Co:here’s API to summarize all Github commits since your last one.Code summary goes here. We use Co:here’s API to summarize all Github commits since your last one.Code summary goes here. We use Co:here’s API to summarize all Github commits since your last one. 
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Summary;
