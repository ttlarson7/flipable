const CommunityFlashcard = ({ term, definition }) => {
  return (
    <li className="flex justify-center items-center m-2">
      <label className="swap swap-flip text-4xl md:text-9xl break-words">
        <input type="checkbox" />
        <div className="card items-center text-center swap-off bg-base-100 justify-center border border-primary p-4 rounded-md w-72 h-56 md:w-96 md:h-64 max-w-full">
          <div className="bg-primary border border-primary rounded">
            <p className="card-title text-base-100 font-bold text-lg md:text-2xl">
              {term}
            </p>
          </div>
          <div className="flex justify-center"></div>
        </div>
        <div className="card items-center text-center swap-on bg-base-100 flex justify-center border border-primary p-4 overflow-auto rounded-md w-72 h-56 md:w-96 md:h-64 max-w-full">
          <div className="max-w-full">
            <p className="text-lg md:text-2xl m-4 whitespace-normal break-words">
              {definition}
            </p>
          </div>
        </div>
      </label>
    </li>
  );
};

export default CommunityFlashcard;
