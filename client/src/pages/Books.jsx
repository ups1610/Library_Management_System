import React, { useState } from "react";
import ActionTable from "../components/tabels";
import PopupForm from "../components/modals";

const Books = () => {
  const [showFormBook, setShowFormBook] = useState(false);

  return (
    <>
      {showFormBook && (
        <PopupForm
          title={"Add New Book"}
          titleDesc={
            "Please fill in the details below to add a new book to the library."
          }
          name1={"Book Name"}
          selectName1={"Author"}
          selectName2={"Genere"}
          input={"ISBN"}
          button={"Add Book"}
          onClick={() => setShowFormBook(false)}
        />
      )}

      <div className="text-[#8c8b8b]">
        <h2 className="text-xl">Welcome to Manage Books</h2>
      </div>
      <ActionTable
        addButton="New Book"
        onClick={() => setShowFormBook(true)}
        col1="Id"
        col2="Name"
        col3="Author"
        col4="Genre"
        path="/dashboard/view"
      />
    </>
  );
};

export default Books;
