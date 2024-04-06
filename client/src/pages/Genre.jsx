import React, { useState } from "react";
import PopupForm from "../components/modals";
import ActionTable from "../components/tabels";

const Genre = () => {
  const [showFormGenere, setShowFormGenere] = useState(false);
  return (
    <>
      {showFormGenere && (
        <PopupForm
          title={"Add New Genere"}
          titleDesc={"Please fill the genere details."}
          name1="Genere Name"
          button={"Add Genere"}
          onClick={() => setShowFormGenere(false)}
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
      />
    </>
  );
};

export default Genre;
