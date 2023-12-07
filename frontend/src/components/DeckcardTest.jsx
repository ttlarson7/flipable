import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const DeckcardTest = ({ term, correct, index, setAnswers, answers, domEleID }) => {
  const handleAnswer = (e) => {
    setAnswers(() => {
      const newAnswers = [...answers];
      newAnswers[index] = e.target.value;
      return newAnswers;
    });
  };
  if (correct[index] === -1) {
    return (
      <div className="card w-96 bg-base-100 shadow-xl" id = {`${domEleID}`} >
        <div className="card-body">
          <p className = "test-base">
            {index + 1}. What is the definition of <b>{term}?</b>
          </p>
          <div className="card-actions justify-center">
            <textarea
              className="textarea textarea-secondary w-full h-full"
              placeholder="Answer"
              onChange={handleAnswer}
            ></textarea>
          </div>
        </div>
      </div>
    );
  }

  if (correct[index] === 0) {
    return (
      <div className="indicator">
        <span className="indicator-item badge badge-error text-black">
          <CiCircleRemove />
        </span>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body border border-error rounded-2xl">
            <p>What is the definition of {term}?</p>
            <div className="card-actions justify-end border-error">
              <p>{answers[index]}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (correct[index] === 1) {
    return (
      <div className="indicator">
        <div className="card96 bg-base-100 shadow-xl border border-success">
          <span className="indicator-item badge badge-success text-black">
            <CiCircleCheck />
          </span>
          <div className="card-body">
            <p>What is the definition of {term}?</p>
            <div className="card-actions justify-end">
              <p className="border-success">{answers[index]}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DeckcardTest;
