import React, { useState } from "react";
import ActionTable from "../components/tabels";
import PopupForm from "../components/modals";

const Bookshelf = () => {
  const [showFormBookshelf, setShowFormBookshelf] = useState(false);
  return (
    <>
      {showFormBookshelf && (
        <PopupForm
          title={"Add New BookShelf"}
          titleDesc={
            "Please fill in the details below to add a bookshelf to the library."
          }
          name1={"Shelf Name"}
          name2={"Location"}
          quantity={"Capacity"}
          description={"Description"}
          button={"Add Bookshelf"}
          onClick={() => setShowFormBookshelf(false)}
        />
      )}

      <div className="text-[#8c8b8b]">
        <h2 className="text-xl">Welcome to Manage Booksshelf</h2>
      </div>
      <ActionTable
        addButton="New Bookshelf"
        onClick={() => setShowFormBookshelf(true)}
        col1="Id"
        col2="Shlef Name"
        col3="Location"
        col5="Description"
        col4="Capacity"
      />
    </>
  );
};

export default Bookshelf;
