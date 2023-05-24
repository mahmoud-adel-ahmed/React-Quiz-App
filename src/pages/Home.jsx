import { Button, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import Categories from "../../src/data/Categories";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { UseQuizContext } from "../context";
import Img from "../assets/quiz.svg";

const Home = () => {
  let [category, setCategory] = useState("");
  let [difficulty, setDifficulty] = useState("");
  let [error, setError] = useState(false);

  let {
    name,
    setName,

    fetchQuestions,
  } = UseQuizContext();
  let navigate = useNavigate();

  let handleSubmit = async () => {
    // console.log(category, name, difficulty);
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    }
    setError(false);
    await fetchQuestions(category, difficulty);
    navigate("/quiz");
    setDifficulty("");
    setCategory("");
    setName("");
  };

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>

        <div className="settings__select">
          {error && <ErrorMessage>Please Fill In Quiz Fields</ErrorMessage>}
          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            label="Select Category"
            variant="outlined"
            style={{ marginBottom: 30 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Categories?.map(({ category, value }) => (
              <MenuItem key={category} value={value}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Select Difficulty"
            variant="outlined"
            style={{ marginBottom: 30 }}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem key="easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="hard" value="hard">
              Hard
            </MenuItem>
          </TextField>

          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src={Img} alt="quiz img" className="banner" />
    </div>
  );
};

export default Home;
