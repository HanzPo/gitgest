import "./Summary.css";

const Summary = () => {
  return (
    <div>
      <div className="header">
        <h1 id="companyName">company name here </h1>
      </div>
      <div className="main">
        <div className="summary">
          <p id="summaryText">
          Code summary goes here. We use Co:here’s API to summarize all Github commits since your last one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
