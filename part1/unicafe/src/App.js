import React, { useState } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => setGood(good + 1);
  const handleClickNeutral = () => setNeutral(neutral + 1);
  const handleClickBad = () => setBad(bad + 1);

  const Statistic = ({ stat, text }) => (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  );
  const Statistics = () => {
    if (good === 0 && neutral === 0 && bad === 0) {
      return <p>No feedback given</p>
    }
    const all = good + neutral + bad;
    return (
      <table>
        <tbody>
          <Statistic stat={good} text={'good'} />
          <Statistic stat={neutral} text={'neutral'} />
          <Statistic stat={bad} text={'bad'} />
          <Statistic stat={all} text={'all'} />
          <Statistic stat={(good - bad) / all * 100} text={'average'} />
          <Statistic stat={good / all * 100} text={'positive'} />
        </tbody>
      </table>
    );
  };
  const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text={'good'}/>
      <Button onClick={handleClickNeutral} text={'neutral'} />
      <Button onClick={handleClickBad} text={'bad'} />
      <h1>statistics</h1>
      <Statistics />
    </div>
  );
}

export default App;
