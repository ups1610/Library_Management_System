import React, { useState } from "react";
import ActionTable from "../components/tabels";

function Catalog() {
  return (
    <div>
      <ManageBooks />
    </div>
  );
}

export default Catalog;

const ManageBooks = () => {
  return (
    <>
      <div className="text-[#8c8b8b]">
        <h2 className="text-xl">Welcome to Manage Books</h2>
      </div>
      <div className="mt-5 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div className="">
          <ActionTable 
          col1="Id"
          col2="Name"
          col3="Author"
          col4="Genre"
          col5="Description"
           />
        </div>
      </div>
    </>
  );
};

export { ManageBooks };
