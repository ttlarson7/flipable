const Flashcard = ({ term, definiton }) => {
  return (
    <li>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <label className="swap swap-flip text-9xl">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />
            <div className="swap-on">
              <h2 className="card-title">{term}</h2>
            </div>
            <div className="swap-off">
              <p className="text-2xl">{definiton}</p>
            </div>
          </label>
        </div>
      </div>
    </li>
  );
};

export default Flashcard;
