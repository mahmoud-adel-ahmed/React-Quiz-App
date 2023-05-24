import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

let QuizContext = createContext("");

export let ContextProvider = ({ children }) => {
  let [name, setName] = useState("");
  let [questions, setQuestions] = useState([]);
  let [score, setScore] = useState(0);
  let [options, setOptions] = useState();
  let [currQues, setCurrQues] = useState(0);

  let fetchQuestions = async (category = "", difficulty = "") => {
    try {
      let { data } = await axios.get(
        `https://opentdb.com/api.php?amount=10${
          category && `&category=${category}`
        }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
      );
      setQuestions(data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        name,
        setName,
        fetchQuestions,
        questions,
        setQuestions,
        score,
        setScore,
        options,
        setOptions,
        currQues,
        setCurrQues,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export let UseQuizContext = () => {
  return useContext(QuizContext);
};
