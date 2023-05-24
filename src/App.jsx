import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Home from "./pages/Home";

const App = () => {
  return (
    <div
      className="app"
      style={{ backgroundImage: 'url("./src/assets/ques1.png")' }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </div>
  );
};

export default App;
