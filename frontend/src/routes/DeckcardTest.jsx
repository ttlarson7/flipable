import React from "react";

const DeckcardTest = ({ term, correct, index, setAnswers, answers }) => {


    const handleAnswer = (e) => {
        setAnswers(() => {
            const newAnswers = [...answers];
            newAnswers[index] = e.target.value;
            return newAnswers;
        })
        console.log(answers);
    }
    if (correct[index] === -1) {
        return (
            <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                    <p>What is the definition of <b>{term}?</b></p>
                <div className="card-actions justify-center">
                    <textarea className="textarea textarea-secondary w-full" placeholder="Answer" onChange={handleAnswer}></textarea>
                </div>
            </div>
        </div>
        )
    }

    if (correct[index] === 0) {
        return (
            <div className="indicator">
                <span className="indicator-item badge bg-error text-black">X</span> 
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body border border-error rounded-2xl">
                            <p>What is the definition of {term}?</p>
                        <div className="card-actions justify-end border-error">
                                <p>{answers[index]}</p>
                        </div>
                    </div>
                </div>
    </div>
            
        )
    }


    if (correct[index] === 1) {
        return (
            <div className="card w-96 bg-base-100 shadow-xl border-green-500">
            <div className="card-body">
                    <p>What is the definition of {term}?</p>
                <div className="card-actions justify-end">
                        <p className="border-green-500">{answers[index]}</p>
                </div>
            </div>
        </div>
        )
    }

    
}

export default DeckcardTest;