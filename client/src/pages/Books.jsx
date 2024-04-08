import React, { useEffect, useState } from "react";
import ActionTable from "../components/tabels";
import PopupForm from "../components/modals";
import { fetchBooks } from "../action/CatalogAction";

const Books = () => {
  const [showFormBook, setShowFormBook] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const booksData = await fetchBooks();
      setBooks(booksData);
    };
    fetchData();
  }, []);

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
        mapData ={books}
        data1={"id"}
        data2={"title"}
        data3={"authorName"}
        data4={"genre"}
      />
    </>
  );
};

export default Books;
