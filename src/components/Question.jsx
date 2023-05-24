import React, { useEffect, useState } from "react";
import { UseQuizContext } from "../context";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const Question = () => {
  let [error, setError] = useState(false);
  let [selected, setSelected] = useState();
  let { questions, score, setScore, currQues, setCurrQues } = UseQuizContext();
  let navigate = useNavigate();
  let allAnswers = [
    ...questions?.[currQues]?.incorrect_answers,
    questions?.[currQues]?.correct_answer,
  ];

  const handleSelect = (i) => {
    let correct = questions?.[currQues]?.correct_answer;
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    let correct = questions?.[currQues]?.correct_answer;
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (currQues >= questions.length - 1) {
      navigate("/results");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  useEffect(() => {
    allAnswers.sort(() => Math.random() - 0.5);
  }, [currQues, questions]);

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>
      <div className="singleQuestion">
        <h2
          dangerouslySetInnerHTML={{ __html: questions[currQues]?.question }}
        ></h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {questions.length &&
            allAnswers?.map((answer) => (
              <button
                className={`singleOption  ${selected && handleSelect(answer)}`}
                onClick={() => handleCheck(answer)}
                disabled={selected}
                dangerouslySetInnerHTML={{ __html: answer }}
                key={answer}
              ></button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
