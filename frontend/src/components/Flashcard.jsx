const Flashcard = ({ term, definition, setFlashCards }) => {
  const handleDeleteClick = () => {
    document.getElementById("delete_modal").showModal();
  };

  const handleDelete = () => {
    // Call the setFlashCards function passed from the parent component
    setFlashCards();
    // Close the modal
    document.getElementById("delete_modal").close();
  };

  return (
    <li className="flex justify-center items-center">
      <label className="swap swap-flip text-9xl ">
        <input type="checkbox" />
        <div className="card items-center text-center swap-off bg-base-100 h-64 w-80 justify-center border border-primary">
          <div className="bg-primary border border-primary rounded">
            <p className="card-title text-base-100 font-bold text-2xl ml-3 mr-3 mb-1 ">
              {term}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              className="m-2 p-2 py-4 btn btn-neutral rounded"
              onClick={() => console.log("Edit clicked")}
            >
              Edit
            </button>

            <button
              className="btn btn-error rounded m-2 p-2"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="card items-center text-center swap-on bg-base-100 h-64 w-80 flex justify-center border border-primary overflow-auto">
          <div className="max-w-full pt-6">
            <p className="text-2xl m-4 whitespace-normal break-words">
              {definition}
            </p>
          </div>
        </div>
      </label>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box bg-base-100">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this card?
          </h3>
          <p className="py-4">
            Press ESC key or click the close button below to close Press Delete
            to delete your card
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-success rounded">Close</button>
              <button className="btn btn-error rounded" onClick={handleDelete}>
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </li>
  );
};

export default Flashcard;
