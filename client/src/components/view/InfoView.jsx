import React, { useEffect, useState } from "react";
import { options, settings } from "../../utils/constants/InfoViewData";
import PopupForm from "../modals";
import { Link, useParams } from "react-router-dom";
import {
  createInstance,
  deleteInstance,
  fetchAuthorsBookById,
  fetchAuthorsById,
  fetchBooks,
  fetchBooksById,
  fetchBookshelf,
  fetchBookshelfBookById,
  fetchBookshelfById,
  fetchGenreBookById,
  fetchGenreById,
  fetchInstance,
  fetchInstanceById,
} from "../../action/CatalogAction";
import { MdAdd } from "react-icons/md";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Authetication";

function BookView(props) {
  const [book, setBook] = useState([]);
  const [instance, setInstance] = useState([]);
  const [author, setAuthor] = useState([]);
  const [bookByAuthor, setBookByAuthor] = useState([]);
  const [genre, setGenre] = useState([]);
  const [genreBook, setGenreBook] = useState([]);
  const [shelf, setShelf] = useState([])
  const [shelfBook , setShelfBook] = useState([])
  const { name, id } = useParams();
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchBookData = await fetchBooksById(id, token);
        const fetchInstanceData = await fetchInstanceById(id, token);
        const fetchAuthor = await fetchAuthorsById(id, token);
        const fetchAuthorBooks = await fetchAuthorsBookById(id, token);
        const fetchGenreData = await fetchGenreById(id, token);
        const fetchGenreBooks = await fetchGenreBookById(id, token);
        const fetchShelfData = await fetchBookshelfById(id, token)
        const fetchShelfBookData = await fetchBookshelfBookById(id, token)
        setBook(fetchBookData);
        setInstance(fetchInstanceData);
        setAuthor(fetchAuthor);
        setBookByAuthor(fetchAuthorBooks);
        setGenre(fetchGenreData);
        setGenreBook(fetchGenreBooks);
        setShelf(fetchShelfData)
        setShelfBook(fetchShelfBookData)
      } catch (error) {
        console.log("Error occur: " + error);
      }
    };
    fetchData();
  }, [id, useParams]);

  return (
    <>
      <div className="text-[#8c8b8b]">
        <h2 className="text-xl">Detail View</h2>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row w-full h-full">
        <div className="sm:w-1/4 flex flex-col gap-5">
          <div className="w-full p-2 bg-white border rounded-md shadow-md">
            <Options />
          </div>

          <div className="w-full p-2 bg-white border rounded-md shadow-md">
            <Settings />
          </div>
        </div>

        <div className="sm:w-3/4">
          <div className="flex flex-col gap-4 sm:pl-2">
            {name === "book" && (
              <div className="w-full p-2 bg-white border rounded-md mt-4 sm:mt-0">
                <InfoDetails book={book} instance={instance} />
              </div>
            )}

            {name === "author" && (
              <div className="w-full p-2 bg-white border rounded-md shadow-md">
                <PersonDetail person={author} book={bookByAuthor} />
              </div>
            )}

            {name === "genre" && (
              <div className="w-full p-2 bg-white border rounded-md shadow-md">
                <GenreDetail genre={genre} book={genreBook} />
              </div>
            )}

            {name === "bookshelf" && (
              <div className="w-full p-2 bg-white border rounded-md shadow-md">
                <BookshelfDetail shelf={shelf} book={shelfBook} />
              </div>
            )}

            <div className="w-full p-2 bg-white border rounded-md mt-4 sm:mt-0 mb-5">
              <InfoInstance id={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookView;

const Options = (props) => {
  return (
    <>
      <table className="table table-auto w-full">
        <caption className="text-lg flex flex-row gap-2 m-2 font-medium items-center group">
          Options
        </caption>
        <tbody>
          {options.map((option, index) => (
            <tr key={index} className="border-b">
              <td className="w-full text-sm gap-3 flex flex-row hover:bg-gray-100">
                <button className="flex items-center p-2 rounded-lg group ">
                  <span>{option.icon}</span>
                  <span className="ms-3">{option.label}</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const Settings = (props) => {
  return (
    <>
      <table className="table table-auto w-full">
        <caption className="text-lg flex flex-row gap-2 m-2 font-medium items-center group">
          Settings
        </caption>
        <tbody>
          {settings.map((setting, index) => (
            <tr key={index} className="border-b">
              <td className="w-full text-sm gap-3 flex flex-row hover:bg-gray-100">
                <button
                  className="flex items-center p-2 rounded-lg group "
                  onClick={setting.onClick}
                >
                  <span>{setting.icon}</span>
                  <span className="ms-3">{setting.label}</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const PersonDetail = (props) => {
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function popularGenre(booksData) {
    const allGenres = booksData.reduce((all, book) => {
      return all.concat(book.genre);
    }, []);
    const uniqueGenres = Array.from(new Set(allGenres));
    return uniqueGenres.join(", ");
  }

  return (
    <>
      <div className="flex-grow">
        <table className="w-full table-auto">
          <caption className="text-lg flex flex-row gap-2 m-2 font-medium items-center group">
            About Author
          </caption>
          <tbody className="text-sm">
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Name :</td>
              <td>
                {props.person.firstName} {props.person.familyName}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">DOB :</td>
              <td className="font-medium">{formatDate(props.person.dob)}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Total Books Written :</td>
              <td>{props.book.length}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Popular Books :</td>
              <td>
                <ul className="flex flex-row gap-2">
                  {props.book.length > 0 && Array.isArray(props.book) ? (
                    props.book.map((book) => (
                      <li key={book.id} className="bg-gray-200 p-1 rounded-sm">
                        {book.title}
                      </li>
                    ))
                  ) : (
                    <li className="bg-gray-200 p-1 rounded-sm">N/A</li>
                  )}
                </ul>
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Popular Genre :</td>
              <td>
                {popularGenre(props.book).length
                  ? popularGenre(props.book)
                  : "N/A"}
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Description :</td>
              <td className="text-medium">
                {props.person.biography}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const GenreDetail = (props) => {
  
  return (
    <>
      <div className="flex-grow">
        <table className="w-full table-auto">
          <caption className="text-lg flex flex-row gap-2 m-2 font-medium items-center group">
            About Genre
          </caption>
          <tbody className="text-sm">
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Name :</td>
              <td>{props.genre.genreName}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Total Books Entitled :</td>
              <td className="font-medium">{props.book.length}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Popular Books :</td>
              <td>
                <ul className="flex flex-row gap-2">
                  {props.book.length > 0 && Array.isArray(props.book) ? (
                    props.book.map((book) => (
                      <li key={book.id} className="bg-gray-200 p-1 rounded-sm">
                        {book.title}
                      </li>
                    ))
                  ) : (
                    <li className="bg-gray-200 p-1 rounded-sm">N/A</li>
                  )}
                </ul>
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Popular Author :</td>
              <td>
                <ul className="flex flex-row gap-2">
                  {props.book.length > 0 && Array.isArray(props.book) ? (
                    [...new Set(props.book.map((book) => book.authorName))].map(
                      (authorName, index) => (
                        <li key={index} className="bg-gray-200 p-1 rounded-sm">
                          {authorName}
                        </li>
                      )
                    )
                  ) : (
                    <li className="bg-gray-200 p-1 rounded-sm">N/A</li>
                  )}
                </ul>
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Description :</td>
              <td className="text-medium text-blue-500">
                <Link
                  to={`https://www.google.com/search?q=${encodeURIComponent(
                    props.genre.genreName
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get more info
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const BookshelfDetail = (props) => {

  function getGenre(bookshelfData) {
    const allGenres = bookshelfData.reduce((all, book) => {
      return all.concat(book.book.genre);
    }, []);
    const uniqueGenres = Array.from(new Set(allGenres));
    return uniqueGenres.join(", ");
  }
  
  return (
    <>
      <div className="flex-grow">
        <table className="w-full table-auto">
          <caption className="text-lg flex flex-row gap-2 m-2 font-medium items-center group">
            About Bookshelf
          </caption>
          <tbody className="text-sm">
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Name :</td>
              <td>{props.shelf.shelfName}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Total Books Entitled :</td>
              <td className="font-medium">
                {props.book ? Object.keys(props.book).length : 'N/A'}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Genre Covered :</td>
              <td className="font-medium">{getGenre(props.book)}</td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Popular Books :</td>
              <td>
                <ul className="flex flex-row gap-2">
                  {props.book && Array.isArray(props.book) && props.book.length > 0 ? (
                    props.book.map((item) => (
                      <li key={item.id} className="bg-gray-200 p-1 rounded-sm">
                        {item.book.title}
                      </li>
                    ))
                  ) : (
                    <li className="bg-gray-200 p-1 rounded-sm">N/A</li>
                  )}
                </ul>
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Popular Authors :</td>
              <td>
                <ul className="flex flex-row gap-2">
                  {props.book && Array.isArray(props.book) && props.book.length > 0 ? (
                    [...new Set(props.book.map((item) => item.book.authorName))].map(
                      (authorName, index) => (
                        <li key={index} className="bg-gray-200 p-1 rounded-sm">
                          {authorName}
                        </li>
                      )
                    )
                  ) : (
                    <li className="bg-gray-200 p-1 rounded-sm">N/A</li>
                  )}
                </ul>
              </td>
            </tr>

            <tr className="border-b border-gray-100">
              <td className="w-1/4 p-2">Description :</td>
              <td className="text-medium">
                {props.shelf.description}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};


export const InfoDetails = (props) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-4 sm:p-8">
        <h2 className="text-lg sm:text-xl font-medium mb-4">
          Book Information
        </h2>
        <div className="flex flex-col md:flex-row">
          {/* Image Div */}
          <div className="max-w-xs md:max-w-none mb-4 md:mb-0 md:mr-4">
            <div className="border-2 p-2 h-72">
              <img
                alt=""
                src="https://m.media-amazon.com/images/I/411t3aQzVaL.jpg"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="secondaryText text-lg sm:text-xl font-bold text-gray-900 mt-4 text-center">
              {props.book.title}
            </h3>
          </div>

          {/* Table Div */}
          <div className="flex-grow">
            <table className="w-full table-auto">
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">ISBN :</td>
                  <td>{props.book.ISBN}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Name :</td>
                  <td className="font-medium">{props.book.title}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Author :</td>
                  <td>{props.book.authorName}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Genre :</td>
                  <td>
                    <ul className="flex flex-row  gap-2">
                      {props.book.genre &&
                        Array.isArray(props.book.genre) &&
                        props.book.genre.map((gen) => (
                          <li key={gen} className="bg-gray-200 p-1 rounded-sm">
                            {gen}
                          </li>
                        ))}
                    </ul>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Total books :</td>
                  <td>
                    {props.instance.length > 0 && props.instance[0].bookshelf
                      ? props.instance[0].bookshelf.capacity
                      : "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Imprint :</td>
                  <td>
                    {props.instance.length > 0 && props.instance[0]
                      ? props.instance[0].imprint
                      : "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Status :</td>
                  <td>
                    <span className="bg-green-700 px-2 rounded-sm text-white">
                      {props.instance.length > 0 && props.instance[0]
                        ? props.instance[0].status
                        : "N/A"}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Description :</td>
                  <td className="text-medium text-blue-500">
                    <Link
                      to={`https://www.google.com/search?q=${encodeURIComponent(
                        props.book.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get more info
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InfoInstance = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [book, setBook] = useState([]);
  const [bookshelf, setBookshelf] = useState([]);
  const [instanceAll, setInstanceAll] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await fetchBooks(token);
        const BookshelfData = await fetchBookshelf(token);
        setBook(bookData);
        setBookshelf(BookshelfData);
      } catch (error) {
        console.log("Error occur: " + error);
      }
    };
    fetchData();
  }, [showForm]);

  useEffect(() => {
    const fetchInstanceData = async () => {
      try {
        const fetchInstanceAll = await fetchInstance(token);
        setInstanceAll(fetchInstanceAll);
      } catch (error) {
        console.log("Error occur: " + error);
      }
    };
    fetchInstanceData();
  }, [props.id, instanceAll]);

  const handleAddInstance = async (formData) => {
    console.log("=======================" + formData);
    await createInstance(formData, token);
    const fetchInstanceAll = await fetchInstance(token);
    setInstanceAll(fetchInstanceAll);
    setShowForm(false);
  };

  const handleDeleteInstance = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        await deleteInstance(id, token);
        toast.success("Instance deleted successfully");
        const fetchInstanceAll = await fetchInstance(token);
        setInstanceAll(fetchInstanceAll);
      } catch (error) {
        toast.error("Error deleting instance");
      }
    }
  };
  return (
    <>
      {showForm && (
        <PopupForm
          title={"Add New Instance"}
          titleDesc={
            "Please fill in the details below to add a new instance to the book."
          }
          selectName1={"Book"}
          selectName2={"Bookshelf"}
          input={"Imprint"}
          selectName4={"Status"}
          button={"Add Instance"}
          mapData1={book}
          mapData2={bookshelf}
          onSubmit={handleAddInstance}
          passKeySel1="book"
          passKeySel2="bookshelf"
          passKeySel4="status"
          passKeyInput="imprint"
          onClick={() => setShowForm(false)}
          msg="Instance"
          optionName1="title"
          optionName3="shelfName"
        />
      )}
      <div className="p-4 flex flex-col sm:flex-row justify-between overflow-hidden">
        <h2 className="text-lg sm:text-xl font-medium mb-2">Instance</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="border-2 font-medium hover:bg-gray-600 hover:text-white px-4 py-2 rounded-lg flex items-center"
          >
            <MdAdd size={20} />
          </button>
          <select className="border-2 px-4 py-2 rounded-lg border-gray-300 text-gray-700 sm:text-sm">
            <option value="">Filter</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
          <div className="relative w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search for..."
              className="border-2 px-2 w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 overflow-x-auto">
        <div className="rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left ltr:text-left rtl:text-right bg-black text-white">
              <tr>
                <th className="whitespace-nowrap px-1 py-2 font-medium">Id</th>
                <th className="whitespace-nowrap px-1 py-2 font-medium">
                  Book
                </th>
                <th className="whitespace-nowrap px-1 py-2 font-medium">
                  Imprint
                </th>
                <th className="whitespace-nowrap px-1 py-2 font-medium">
                  Status
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {instanceAll.map((item, index) => (
                <tr key={index} className="text-gray-900">
                  <td className="whitespace-nowrap px-1 py-2">{item.id}</td>
                  <td className="whitespace-nowrap px-1 py-2">
                    {item.book && item.book.title ? item.book.title : "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-1 py-2">
                    {item.imprint ? item.imprint : "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-1 py-2">
                    <span className="bg-green-500 p-1 rounded-sm">
                      {item.status ? item.status : "N/A"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-1 py-2">
                    <button className="p-1 px-2 mx-1 shadow-sm font-medium rounded-sm border-2 border-blue-400">
                      Edit
                    </button>
                    <button className="p-1 px-2 mx-1 shadow-sm font-medium rounded-sm border-2 border-green-400">
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteInstance(item.id)}
                      className="p-1 px-2 mx-1 shadow-sm font-medium rounded-sm border-2 border-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
