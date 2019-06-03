import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  mainPanel: {
    display: "flex",
    flexDirection: "column",
    minWidth: "450px",
    "& input": {
      border: "1px solid #202020",
      height: "30px",
      bordeRadius: "0",
      backgroundColor: "snow",
      padding: "5px 0 5px 15px"
    },
    "& label": {
      textAlign: "left",
      fontSize: "30px",
      fontWeight: "800",
      marginTop: "15px",
      letterSpacing: "1px"
    }
  },
  title: {
    fontSize: "100px",
    fontWeight: "800"
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "25px",
    "& button": {
      border: "none",
      minWidth: "220px",
      height: "75px",
      backgroundColor: "black",
      color: "white",
      fontSize: "20px",
      fontWeight: "800"
    }
  }
});

function SimpleFormHooks(props) {
  const classes = useStyles();

  const possibleQuestion = [
    "No comment.",
    "I’m not at liberty to say.",
    "Wait and see.",
    "Let me get back to you.",
    "I’m sorry, that’s confidential.",
    "I’d rather not talk about it.",
    "I’ll tell you when you’re older.",
    "My lawyer says I don’t have to answer that question.",
    "You do not want to know",
    "Maybe your friend should try again",
    "I do not know you well enough"
  ];

  const [petition, setPetition] = useState("");
  const [fakePetition, setFakePetition] = useState("");

  const [answer, setAnswer] = useState("");
  const [isClicked, showAnswer] = useState(false);
  const [useTrick, setTrick] = useState(false);
  const [isDisabled, setAvailability] = useState(false);
  const [question, setQuestion] = useState("");

  const handleChange = evt => {
    setPetition(evt.target.value);
  };

  const getAnswer = () => {
    (!petition.length || !fakePetition.length) &&
      setAnswer("You must first write a petition");
    !question.length && setAnswer("How about that question?");
    !useTrick &&
      petition.length > 0 &&
      setAnswer(
        possibleQuestion[Math.floor(Math.random() * possibleQuestion.length)]
      );
    showAnswer(true);
    setAvailability(true);
  };

  const resetQuestion = () => {
    setAvailability(false);
    setPetition("");
    setAnswer("");
    showAnswer(false);
    setTrick(false);
    setQuestion("");
    setFakePetition("");
  };

  const handleQuestionChange = evt => {
    setQuestion(evt.target.value);
  };

  useEffect(() => {
    // const defaultQuestion = "Peter please answer the following question";
    petition.charCodeAt(0) === 46 && setTrick(true);
    // useTrick && setPetition(defaultQuestion.slice(0, petition.length));
    // !useTrick && setFakePetition(defaultQuestion.slice(0, fakePetition.length));
    // console.log(useTrick);
    petition.length === 0 && setTrick(false);
  }, [petition, useTrick, fakePetition.length]);

  const handleTrickQuestion = evt => {
    const defaultQuestion = "Peter please answer the following question";
    setFakePetition(defaultQuestion.slice(0, evt.target.value.length));
  };
  const handleKey = evt => {
    answer.charCodeAt(0) === 46 && setTrick(true);
    if (useTrick) {
      if (evt.key === "Backspace") {
        setAnswer(answer.slice(0, petition.length - 1));
      } else if (evt.keyCode === 32) {
        setAnswer(answer + " ");
      } else if (
        (evt.keyCode >= 65 && evt.keyCode <= 90) ||
        evt.keyCode === 190
      ) {
        setAnswer(answer + evt.key);
      }
    }
  };
  return (
    <div className={classes.root}>
      <p className={classes.title}>Answers Village</p>
      <h1>First ask your question and then fill in the petition</h1>
      <small>We got all kinds of answers for you!</small>
      <div className={classes.mainPanel}>
        <label htmlFor="petition">Petition</label>
        <input
          type="text"
          id="petition"
          placeholder="Peter please answer the following question"
          value={useTrick ? fakePetition : petition}
          onKeyDown={handleKey}
          onChange={useTrick ? handleTrickQuestion : handleChange}
          disabled={isDisabled}
        />
        <label htmlFor="question">Question</label>
        <input
          type="text"
          id="question"
          placeholder="e.g. When am I getting married?"
          value={question}
          onChange={handleQuestionChange}
          disabled={isDisabled}
        />

        <h1>{isClicked && answer}</h1>
      </div>
      <div className={classes.buttons}>
        <button onClick={getAnswer} disabled={isDisabled}>
          Get answer
        </button>
        <button onClick={resetQuestion}>New Question</button>
      </div>
    </div>
  );
}

export default SimpleFormHooks;
