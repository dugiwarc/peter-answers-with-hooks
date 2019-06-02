import React, { useState } from "react";

export default function SimpleFormHooks() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isClicked, showAnswer] = useState(false);
  const handleChange = evt => {
    const defaultQuestion = "Peter please answer the following question";
    let input = evt.target.value;
    setAnswer(answer + input.slice(input.length - 1));
    console.log(answer);
    setQuestion(defaultQuestion.slice(0, input.length));
  };

  const getAnswer = () => {
    setAnswer(answer);
    showAnswer(true);
  };

  const resetQuestion = () => {
    setQuestion("");
    setAnswer("");
    showAnswer(false);
  };
  return (
    <div>
      <h1>Question: {question}</h1>
      <input type="text" value={question} onChange={handleChange} />
      <h1>Answer: {isClicked && answer}</h1>
      <button onClick={getAnswer}>Get answer</button>
      <button onClick={resetQuestion}>Reset</button>
    </div>
  );
}
