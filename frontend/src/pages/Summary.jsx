import "./Summary.css";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
        setErrorMessage(`${error.response.data.error}`);
      });
  }, []);

  if (errorMessage) {
    return (
      <div>
        <header className="navbar">
          <img
            src="src/img/gitgestLogo.png"
            alt="Image of GitGest Logo"
            width="60"
            height="60"
          />
          <h1 id="companyName">GitGest</h1>
        </header>
        <div className="center">
          <div className="leftSide">
            <img
              src="src/img/angryRobot.png"
              alt="Image of Angry Robot"
              width="400"
              height="500"
            />
          </div>
          <div className="rightSide">
            <h1 id="errorTitle">Error</h1>
            <p id="errorParagraph">{errorMessage}</p>
            <Link to={"/"}>
              <button id="homeButton">Back</button>
            </Link>
          </div>             
        </div>
      </div>
    );
  }

  if (!isLoading) {
    return (
      <div>
        <header className="navbar">
          <img
            src="src/img/gitgestLogo.png"
            alt="Image of GitGest Logo"
            width="60"
            height="60"
          />
          <h1 id="companyName">GitGest</h1>
        </header>
        <div className="main">
          <h1 className="title">Summarization of Commits Since</h1>
          <h1 className="title2">{sinceLastCommit} Commits Ago</h1>
          <div className="summary">
            <p className="display-linebreak">{summary}</p>
          </div>
            <Link to={"/"}>
              <button id="homeButton">Back</button>
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="backgroundLoader">
      <div>
        <h1 className="loading">Loading...</h1>
      </div>
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
