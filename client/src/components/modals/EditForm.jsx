import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import Multiselect from "multiselect-react-dropdown";
import "../../styles/Forms.css";

function EditForm(props) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        biography: "",
        shelfName: "",
        location: "",
        capacity: "",
        description: "",
        genreName: "",
        title: "",
        ISBN: "",
        authorId: "",
        genre: [],
      });

      useEffect(() => {
        if (props.form) {
            setFormData(props.form);}
      }, [props.form]);      

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenreSelect = (selectedList, selectedItem) => {
    const Ids = selectedList.map((item) => item.id);
    setFormData((prevData) => ({
      ...prevData,
      genre: Ids,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      await props.onSubmit(formData);
      toast.success(`${props.msg} added successfully`);
    } catch (error) {
      toast.error(`Error adding ${props.msg.toLowerCase()}`);
    }
  };

  return (
    <div className="z-10 fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <button onClick={props.onClick}>
          <X size="24" />
        </button>
        <div className="mx-auto max-w-lg">
          {props.title && (
            <h1 className="text-center text-2xl font-bold text-black sm:text-3xl">
              {props.title}
            </h1>
          )}

          {props.titleDesc && (
            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              {props.titleDesc}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <div className="flex justify-between gap-2">
              {props.name1 && (
                <div>
                  <label htmlFor={props.passKeyNam1} className="sr-only">
                    {props.name1}
                  </label>
                  <input
                    type="text"
                    id={props.passKeyNam1}
                    name={props.passKeyNam1}
                    value={formData[props.passKeyNam1]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder={props.form[props.passKeyNam1]}
                  />
                </div>
              )}
              {props.name2 && (
                <div>
                  <label htmlFor={props.passKeyNam2} className="sr-only">
                    {props.name2}
                  </label>
                  <input
                    type="text"
                    id={props.passKeyNam2}
                    name={props.passKeyNam2}
                    value={formData[props.passKeyNam2]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder={props.form[props.passKeyNam2]}
                  />
                </div>
              )}
            </div>

            {props.date && (
              <div>
                <label htmlFor={props.passKeyDate} className="sr-only">
                  {props.date}
                </label>
                <input
                  type="date"
                  id={props.passKeyDate}
                  name={props.passKeyDate}
                  value={formData[props.passKeyDate]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder={props.form[props.passKeyDate]}
                />
              </div>
            )}

            {props.quantity && (
              <div>
                <label htmlFor={props.passKeyQty} className="sr-only">
                  {props.quantity}
                </label>
                <input
                  type="number"
                  id={props.passKeyQty}
                  name={props.passKeyQty}
                  value={formData[props.passKeyQty]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder={props.form[props.passKeyQty]}
                />
              </div>
            )}
            {props.input && (
              <div>
                <label htmlFor={props.passKeyInput} className="sr-only">
                  {props.input}
                </label>
                <input
                  type="text"
                  id={props.passKeyInput}
                  name={props.passKeyInput}
                  value={formData[props.passKeyInput]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder={props.form[props.passKeyInput]}
                />
              </div>
            )}

            {props.description && (
              <div>
                <label htmlFor={props.passKeyDesc} className="sr-only">
                  {props.description}
                </label>
                <textarea
                  id={props.passKeyDesc}
                  name={props.passKeyDesc}
                  value={formData[props.passKeyDesc]}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder={props.form[props.passKeyDesc]}
                />
              </div>
            )}

            {props.button && (
              <button
                type="submit"
                className="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
              >
                {props.button}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
