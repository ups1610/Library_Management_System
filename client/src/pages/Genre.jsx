import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"
import PopupForm, { EditForm } from "../components/modals";
import ActionTable from "../components/tabels";
import { createGenre, deleteGenre, fetchGenre, fetchGenreById, updateGenre } from "../action/CatalogAction";

const Genre = () => {
  const [showFormGenere, setShowFormGenere] = useState(false);
  const [genre, setGenre] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editGenre, setEditGenre] = useState([])
  const [id,setId] =useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const booksData = await fetchGenre();
      setGenre(booksData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchIdData = async () => {
      if (showEditForm && id) {
        try {
          const authorDataById = await fetchGenreById(id);
          setEditGenre(authorDataById);
        } catch (error) {
          toast.error("Error fetching author data");
        }
      }
    };
    fetchIdData();
  }, [showEditForm, id]);

  const handleAddGenre = async (formData) => {
    try {
      await createGenre(formData);
      // Optionally, refetch the authors list after adding a new author
      const updatedGenre = await fetchGenre();
      setGenre(updatedGenre);
      setShowFormGenere(false);
    } catch (error) {
      toast.error("Error adding genre");
      throw error;
    }
  };

  const handleGenreData = async (formData) => {
    try {
      const updateAuthorData = await updateGenre(id, formData);
      setEditGenre(updateAuthorData)
      const updatedAuthor = await fetchGenre();
      setGenre(updatedAuthor);
      setShowEditForm(false)
    } catch (error) {
      toast.error("Error adding author");
      throw error;
    }
  };

  const handleDeleteGenre = async (genreId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this genre?");
    if (confirmDelete) {
      try {
        await deleteGenre(genreId);
        toast.success("Genredeleted successfully");
        const updatedGenre = await fetchGenre();
        setGenre(updatedGenre);
      } catch (error) {
        toast.error("Error deleting genre");
      }
    }
  };

  const onClose = () =>{
    setShowEditForm(false);
    setShowFormGenere(false);
  }

  const handleEditGenre = async (genreId) =>{
    try{
      setShowEditForm(true);
      setId(genreId);
    }
    catch(error)
    {
      toast.error("Error in updating genre")
    }
  }

  return (
    <>
    {showEditForm && (
      <EditForm
      title={"Add New Genere"}
          titleDesc={"Please fill the genere details."}
          name1="Genere Name"
          button={"Add Genere"}
          passKeyNam1="genreName"
          onSubmit={handleGenreData}
          onClick={onClose}
          msg="Genre"
          form={editGenre}

       />
    )}
      {showFormGenere && (
        <PopupForm
          title={"Add New Genere"}
          titleDesc={"Please fill the genere details."}
          name1="Genere Name"
          button={"Add Genere"}
          passKeyNam1="genreName"
          onSubmit={handleAddGenre}
          onClick={() => setShowFormGenere(false)}
          msg="Genre"
        />
      )}

      <div className="text-[#8c8b8b]">
        <h2 className="text-xl">Welcome to Manage Genre</h2>
      </div>
      <ActionTable
        addButton="New Genre"
        onClick={() => setShowFormGenere(true)}
        col1="Id"
        col2="Genre"
        mapData={genre}
        data1="id"
        data2="genreName"
        onDelete={handleDeleteGenre}
        onEdit={handleEditGenre}
        path="/dashboard/catalog/genre/view"
      />
    </>
  );
};

export default Genre;
