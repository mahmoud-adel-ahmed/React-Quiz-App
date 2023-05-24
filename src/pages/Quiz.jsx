import React, { useEffect, useState } from "react";
import { UseQuizContext } from "../context";
import Question from "../components/Question";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";

const Quiz = () => {
  let { name, questions = [], currQues, score } = UseQuizContext();

  return (
    <>
      {questions.length ? (
        <div className="quiz">
          <span className="subtitle">Welcome, {name}</span>
          {questions ? (
            <>
              <div className="quizInfo">
                <span>{questions[currQues]?.category}</span>
                <span>Score : {score}</span>
              </div>
              <Question />
            </>
          ) : (
            <CircularProgress
              style={{ margin: 100 }}
              color="inherit"
              size={150}
              thickness={1}
            />
          )}
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Quiz;
