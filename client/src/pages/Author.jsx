import React, { useState } from "react";
import PopupForm from "../components/modals";
import ActionTable from "../components/tabels";

const Author = () => {
  const [showFormAuthor, setShowFormAuthor] = useState(false);

  return (
    <>
      {showFormAuthor && (
        <PopupForm
          title={"Add New Author"}
          titleDesc={"Please fill the details to add new author."}
          name1="First Name"
          name2="Last Name"
          date="DOB"
          description="Biography"
          button={"Add Author"}
          onClick={() => setShowFormAuthor(false)}
        />
      )}

      <div className="text-[#8c8b8b]">
        <h2 className="text-xl">Welcome to Manage Author</h2>
      </div>
      <ActionTable
        addButton="New Author"
        onClick={() => setShowFormAuthor(true)}
        col1="Id"
        col2="Name"
        col3="DOB"
        col4="Biography"
      />
    </>
  );
};

export default Author;
