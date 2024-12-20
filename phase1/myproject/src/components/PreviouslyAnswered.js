import React from 'react';

const PreviouslyAnswered = ({ answeredQuestions }) => {
  return (
    <div className="answered-questions">
      <h3>Previously Answered Questions</h3>
      <table className="answered-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {answeredQuestions.map((q, index) => (
            <tr key={index}>
              <td>{q.question || 'Unknown'}</td>
              <td>{q.yourAnswer || 'N/A'}</td>
              <td>{q.correctAnswer || 'N/A'}</td>
              <td className={q.isCorrect ? 'correct' : 'incorrect'}>
                {q.isCorrect ? 'Correct' : 'Incorrect'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviouslyAnswered;
