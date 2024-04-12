import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PopupForm,{EditForm} from "../components/modals";
import ActionTable from "../components/tabels";
import { createAuthor, deleteAuthor, fetchAuthors, fetchAuthorsById, updateAuthor } from "../action/CatalogAction";

const Author = () => {
  const [loading, setLoading] = useState(true);
  const [showFormAuthor, setShowFormAuthor] = useState(false);
  const [author, setAuthor] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editAuthor, setEditAuthor] = useState([])
  const [id,setId] =useState(null)

  useEffect(()=>{
      const fetchData = async () => {
        const authorData = await fetchAuthors();
        setAuthor(authorData)
        setLoading(false);
      } 
      fetchData()
  },[])

  useEffect(() => {
    const fetchIdData = async () => {
      if (showEditForm && id) {
        try {
          const authorDataById = await fetchAuthorsById(id);
          setEditAuthor(authorDataById);
        } catch (error) {
          toast.error("Error fetching author data");
        }
      }
    };
    fetchIdData();
  }, [showEditForm, id]);

  const handleAddAuthor = async (formData) => {
    try {
      await createAuthor(formData);
      // Optionally, refetch the authors list after adding a new author
      const updatedAuthors = await fetchAuthors();
      setAuthor(updatedAuthors);
      setShowFormAuthor(false);
    } catch (error) {
      toast.error("Error adding author");
      throw error;
    }
  };

  const handleAuthorData = async (formData) => {
    try {
      const updateAuthorData = await updateAuthor(id, formData);
      setEditAuthor(updateAuthorData)
      const updatedAuthor = await fetchAuthors();
      setAuthor(updatedAuthor);
      setShowEditForm(false)
    } catch (error) {
      toast.error("Error adding author");
      throw error;
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this author?");
    if (confirmDelete) {
      try {
        await deleteAuthor(authorId);
        toast.success("Author deleted successfully");
        const updatedAuthor = await fetchAuthors();
        setAuthor(updatedAuthor);
      } catch (error) {
        toast.error("Error deleting Author");
      }
    }
  };

  const onClose = () =>{
    setShowEditForm(false);
    setShowFormAuthor(false);
  }

  const handleEditAuthor = async (authorId) =>{
    try{
      setShowEditForm(true);
      setId(authorId);
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
      title={"Add New Author"}
      titleDesc={"Please fill the details to add new author."}
      name1="First Name"
      name2="Last Name"
      date="DOB"
      description="Biography"
      button={"Add Author"}
      passKeyNam1="firstName"
      passKeyNam2="familyName"
      passKeyDate="dob"
      passKeyDesc="biography"
      onSubmit={handleAuthorData}
      onClick={onClose}
      msg="Author"
      form={editAuthor}
      />
     )

     }
      {showFormAuthor && (
        <PopupForm
          title={"Add New Author"}
          titleDesc={"Please fill the details to add new author."}
          name1="First Name"
          name2="Last Name"
          date="DOB"
          description="Biography"
          button={"Add Author"}
          passKeyNam1="firstName"
          passKeyNam2="familyName"
          passKeyDate="dob"
          passKeyDesc="biography"
          onSubmit={handleAddAuthor}
          onClick={() => setShowFormAuthor(false)}
          msg="Author"
        />
      )}

      <div className="text-[#8c8b8b]">
        <h2 className="text-xl">Welcome to Manage Author</h2>
      </div>
      <ActionTable
        addButton="New Author"
        onClick={() => setShowFormAuthor(true)}
        col1="Id"
        col2="First Name"
        col3="Family Name"
        col4="DOB"
        col5="Description"
        path="/dashboard/catalog/author/view"
        mapData={author}
        data1="id"
        data2="firstName"
        data3="familyName"
        data4="dob"
        onDelete={handleDeleteAuthor}
        onEdit={handleEditAuthor}
        load = {loading}
      />
    </>
  );
};

export default Author;
