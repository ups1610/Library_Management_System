import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"
import ActionTable from "../components/tabels";
import PopupForm, { EditForm } from "../components/modals";
import { createBookshelf, deleteBookshelf, fetchBookshelf, fetchBookshelfById, updateBookshelf } from "../action/CatalogAction";
import { useAuth } from "../context/Authetication";

const Bookshelf = () => {
  const [loading, setLoading] = useState(true);
  const [showFormBookshelf, setShowFormBookshelf] = useState(false);
  const [bookshelf, setBookshelf] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editBookshelf, setEditBookshelf] = useState([])
  const [id,setId] =useState(null)
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const booksData = await fetchBookshelf(token);
      setBookshelf(booksData);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchIdData = async () => {
      if (showEditForm && id) {
        try {
          const bookshelfDataById = await fetchBookshelfById(id, token);
          setEditBookshelf(bookshelfDataById);
        } catch (error) {
          toast.error("Error fetching author data");
        }
      }
    };
    fetchIdData();
  }, [showEditForm, id]);

  const handleAddBookshelf = async (formData) => {
    try {
      await createBookshelf(formData, token);
      // Optionally, refetch the authors list after adding a new author
      const updatedBookshelf = await fetchBookshelf(token);
      setBookshelf(updatedBookshelf);
      setShowFormBookshelf(false);
    } catch (error) {
      toast.error("Error adding bookshelf");
      throw error;
    }
  };

  const handleBookshelfData = async (formData) => {
    try {
      const updateBookshelfData = await updateBookshelf(id, formData, token);
      setEditBookshelf(updateBookshelfData)
      const updatedBookshelf = await fetchBookshelf(token);
      setBookshelf(updatedBookshelf);
      setShowEditForm(false)
    } catch (error) {
      toast.error("Error edit bookshelf");
      throw error;
    }
  };

  const handleDeleteBookshelf = async (bookshelfId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this bookshelf?");
    if (confirmDelete) {
      try {
        await deleteBookshelf(bookshelfId, token);
        toast.success("Bookshelf deleted successfully");
        const updatedBookshelf = await fetchBookshelf(token);
        setBookshelf(updatedBookshelf);
      } catch (error) {
        toast.error("Error deleting bookshelf");
      }
    }
  };

  const onClose = () =>{
    setShowEditForm(false);
    setShowFormBookshelf(false);
  }

  const handleEditBookshelf = async (bookId) =>{
    try{
      setShowEditForm(true);
      setId(bookId);
    }
    catch(error)
    {
      toast.error("Error in updating Author")
    }
  }

  return (
    <>
      {showEditForm && (
        <EditForm
        title={"Add New BookShelf"}
          titleDesc={
            "Please fill in the details below to add a bookshelf to the library."
          }
          name1={"Shelf Name"}
          name2={"Location"}
          quantity={"Capacity"}
          description={"Description"}
          button={"Add Bookshelf"}
          passKeyNam1="shelfName"
          passKeyNam2="location"
          passKeyQty="capacity"
          passKeyDesc="description"
          onSubmit={handleBookshelfData}
          onClick={onClose}
          msg="Bookshelf"
          form={editBookshelf}
         />
      )}
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
          passKeyNam1="shelfName"
          passKeyNam2="location"
          passKeyQty="capacity"
          passKeyDesc="description"
          onSubmit={handleAddBookshelf}
          onClick={() => setShowFormBookshelf(false)}
          msg="Bookshelf"
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
        path="/dashboard/catalog/bookshelf/view"
        mapData={bookshelf}
        data1="id"
        data2="shelfName"
        data3="location"
        data4="capacity"
        onDelete={handleDeleteBookshelf}
        onEdit={handleEditBookshelf}
        load = {loading}
      />
    </>
  );
};

export default Bookshelf;
