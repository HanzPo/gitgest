import "./Summary.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Summary = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sinceLastCommit, setSinceLastCommit] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [summary, setSummary] = useState("");
  const url = searchParams.get("url");
  const poi = searchParams.get("poi");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/receive_repo?url=${url}&poi=${poi}`)
      .then((response) => {
        setSinceLastCommit(response.data.since_last_commit);
        setSummary(response.data.summary);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(`Error: ${error.response.data.error}`);
      });
  }, []);

  if (errorMessage) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }  

  if (!isLoading) {
    return (
      <div>
        <div className="header">
          <h1 id="companyName">GitGest</h1>
        </div>
        <div className="main">
          <h1 className="title">Summarization of Commits Since</h1>
          <h1 className="title2">{sinceLastCommit} Commits Ago</h1>
          <div className="summary">
            <p className="display-linebreak">{summary}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backgroundLoader">
      <div className="fakeBody">
        <div className="scene">
          <div className="shadow"></div>
          <div className="jumper">
            <div className="spinner">
              <div className="scaler">
                <div className="loader">
                  <div className="cuboid">
                    <div className="cuboid__side"></div>
                    <div className="cuboid__side"></div>
                    <div className="cuboid__side"></div>
                    <div className="cuboid__side"></div>
                    <div className="cuboid__side"></div>
                    <div className="cuboid__side"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
