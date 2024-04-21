import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"
import ActionTable from "../components/tabels";
import PopupForm, { EditForm } from "../components/modals";
import { createBooks, deleteBook, fetchAuthors, fetchBooks, fetchBooksById, fetchGenre, updateBook } from "../action/CatalogAction";
import { useAuth } from "../context/Authetication";

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [showFormBook, setShowFormBook] = useState(false);
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState([]);
  const [genre, setGenre] = useState([])
  const [showEditForm, setShowEditForm] = useState(false);
  const [editBook, setEditBook] = useState([])
  const [id,setId] =useState(null)
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const booksData = await fetchBooks(token);
      const authorDetail = await fetchAuthors(token);
      const genreDetail = await fetchGenre(token);
      setAuthor(authorDetail);
      setGenre(genreDetail);
      setBooks(booksData);
      setLoading(false);
    };
    fetchData();
  },[]);

  useEffect(() => {
    const fetchIdData = async () => {
      if (showEditForm && id) {
        try {
          const bookDataById = await fetchBooksById(id, token);
          setEditBook(bookDataById);
        } catch (error) {
          toast.error("Error fetching books data");
        }
      }
    };
    fetchIdData();
  }, [showEditForm, id]);


  const handleAddBook = async (formData) => {
    try {
      formData.genre = Array.isArray(formData.genre) ? formData.genre : [formData.genre];
      await createBooks(formData,token);
      // Optionally, refetch the authors list after adding a new author
      const updatedBook = await fetchBooks(token);
      setBooks(updatedBook);
      setShowFormBook(false);
      // setSelectedData(formData)
    } catch (error) {
      toast.error("Error adding bookshelf");
      throw error;
    }
  };

  const handleBookData = async (formData) => {
    try {
      // Fetch genre data if needed
      const genreData = await fetchGenre(token);
  
      // Map author and genre IDs
      const authorId = formData.authorId;
      const genreIds = formData.genre.map(genre => {
        const foundGenre = genreData.find(item => item.genreName === genre);
        return foundGenre ? foundGenre.id : null;
      });
  
      // Format formData
      const updatedFormData = {
        title: formData.title,
        authorId: authorId,
        genre: genreIds,
        ISBN: formData.ISBN
      };
  
      const updateBookData = await updateBook(id, updatedFormData, token);
      setEditBook(updateBookData);
      
      const updatedBook = await fetchBooks(token);
      setBooks(updatedBook);
      
      setShowEditForm(false);
    } catch (error) {
      toast.error("Error editing book");
      throw error;
    }
  };
  

  const handleDeleteBook = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await deleteBook(bookId, token);
        toast.success("Book deleted successfully");
        const updatedBook = await fetchBooks(token);
        setBooks(updatedBook);
      } catch (error) {
        toast.error("Error deleting book");
      }
    }
  };

  const onClose = () =>{
    setShowEditForm(false);
    setShowFormBook(false);
  }

  const handleEditBook = async (bookId) =>{
    try{
      setShowEditForm(true);
      setId(bookId);
    }
    catch(error)
    {
      toast.error("Error in updating book")
    }
  }

  
  return (
    <>
    {showEditForm && (
      <EditForm
      title={"Edit Book"}
          titleDesc={
            "Please fill in the details below to add a new book to the library."
          }
          name1={"Book Name"}
          name2={"ISBN"}
          button={"Edit Book"}
          onSubmit={handleBookData}
          passKeyNam1="title"
          passKeyNam2="ISBN"
          onClick={onClose}
          msg="Book"
          form={editBook}
       />
    )}

      {showFormBook && (
        <PopupForm
          title={"Add New Book"}
          titleDesc={
            "Please fill in the details below to add a new book to the library."
          }
          name1={"Book Name"}
          name2={"ISBN"}
          selectName1={"Author"}
          selectName3={"Genere"}
          button={"Add Book"}
          mapData1={author}
          mapData3={genre}
          onSubmit={handleAddBook}
          passKeyNam1="title"
          passKeyNam2="ISBN"
          passKeySel1="authorId"
          passKeySel3="genre"
          onClick={() => setShowFormBook(false)}
          msg="Book"
          optionName1="firstName"
          optionName2="genreName"
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
        path="/dashboard/catalog/book/view"
        mapData ={books}
        data1={"id"}
        data2={"title"}
        data3={"authorName"}
        data4={"genre"}
        onDelete={handleDeleteBook}
        onEdit={handleEditBook}
        load = {loading}
      />
    </>
  );
};

export default Books;
