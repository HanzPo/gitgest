import "./Summary.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Summary = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [summary, setSummary] = useState("");
  const url = searchParams.get("url");
  const poi = searchParams.get("poi");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/?url=${url}&poi=${poi}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        
      });
  }, []);

  return (
    <div>
      <div className="header">
        <h1 id="companyName">company name here </h1>
      </div>
      <div className="main">
        <div className="title">
          <h1>Summarization of Commits Since</h1>
          <p>{url}</p>
        </div>
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
