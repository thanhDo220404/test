"use client";
import React, { useEffect, useState } from "react";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Bắt đầu từ câu hỏi đầu tiên
  const [money, setMoney] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data2.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể đọc dữ liệu.");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleAnswer = (isAnswerCorrect) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (isAnswerCorrect === currentQuestion.answer) {
      // Nếu đáp án đúng
      setMoney((prevMoney) => prevMoney + currentQuestion.score);

      // Chuyển sang câu hỏi tiếp theo nếu không phải câu hỏi cuối cùng
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      // Nếu đáp án sai
      setMoney((prevMoney) => prevMoney - 2 * currentQuestion.score);

      // Quay về câu hỏi trước nếu không phải câu hỏi đầu tiên
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  if (error) {
    return <div className="text-center mt-3">{error}</div>;
  }

  if (questions.length === 0) {
    return <div className="text-center mt-3">Đang tải câu hỏi...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className="text-center mt-3">
        <p>Sờ co re: {money.toLocaleString()}</p>
      </div>
      <div className="d-flex justify-content-center">
        <div className="card mx-3">
          <ul className="">
            {questions.map((question, index) => (
              <li
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`card my-3 px-3 py-3 ${
                  currentQuestionIndex === index
                    ? "bg-primary text-light"
                    : "bg-light"
                }`}
              >
                <strong>Câu {index + 1} : </strong>
                {question.question}
              </li>
            ))}
          </ul>
        </div>

        <div className="card w-50">
          {currentQuestion && (
            <>
              <img
                src={`/img/${currentQuestion.image}`}
                style={{ height: "300px", objectFit: "cover" }}
                alt={currentQuestion.question || "Question Image"}
              />
              <div className="px-3">
                <h2>{currentQuestion.question}</h2>
                <p>Phát biểu này đúng hay sai ?</p>
                <button
                  className="btn btn-success"
                  onClick={() => handleAnswer(true)}
                >
                  Đúng rồi
                </button>
                <button
                  className="mx-3 btn btn-danger"
                  onClick={() => handleAnswer(false)}
                >
                  Sai nhé
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
