import React, { useState } from "react";
import ReactDOM from "react-dom";

// Stats
const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => (
  <>
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  </>
);

// Button
const Button = ({ addFeedback, children }) => (
  <button onClick={addFeedback}>{children}</button>
);

// Main app
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addFeedback = (e) => {
    const feedback = e.target.innerHTML;
    switch (feedback) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
    }
  };

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = `${(good / all) * 100} %`;

  return (
    <div>
      <h2>give feedback</h2>
      <Button addFeedback={addFeedback}>good</Button>
      <Button addFeedback={addFeedback}>neutral</Button>
      <Button addFeedback={addFeedback}>bad</Button>
      <h2>statistics</h2>
      {all ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
