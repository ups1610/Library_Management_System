import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import Multiselect from "multiselect-react-dropdown";
import "../../styles/Forms.css";

function PopupForm(props) {
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
    imprint:"",
    status:"",
    book:"",
    bookshelf:"",
  });

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
                    placeholder={`Enter ${props.name1.toLowerCase()}`}
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
                    placeholder={`Enter ${props.name2.toLowerCase()}`}
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
                  placeholder={`Enter ${props.date.toLowerCase()}`}
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
                  placeholder={`Enter ${props.quantity.toLowerCase()}`}
                />
              </div>
            )}
            <div>
              {props.selectName1 && (
                <div>
                  <label htmlFor={props.passKeySel1} className="sr-only">
                    {props.selectName1}
                  </label>
                  <select
                    id={props.passKeySel1}
                    name={props.passKeySel1}
                    value={formData[props.passKeySel1]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400"
                  >
                    <option value="">{`Select ${props.selectName1}`}</option>
                    {props.mapData1.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item[props.optionName1]}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {props.selectName2 && (
                <div>
                  <label htmlFor={props.passKeySel2} className="sr-only">
                    {props.selectName2}
                  </label>
                  <select
                    id={props.passKeySel2}
                    name={props.passKeySel2}
                    value={formData[props.passKeySel2]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400"
                  >
                    <option value="">{`Select ${props.selectName2}`}</option>
                    {props.mapData2.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item[props.optionName3]}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {props.selectName4 && (
                <div>
                  <label htmlFor={props.passKeySel4} className="sr-only">
                    {props.selectName4}
                  </label>
                  <select
                    id={props.passKeySel4}
                    name={props.passKeySel4}
                    value={formData[props.passKeySel4]}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400"
                  >
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="N/A">Not Available</option>
                  </select>
                </div>
              )}
            </div>
            {props.selectName3 && (
              <div className="control-styles z-40">
                <label htmlFor={props.passKeySel3} className="sr-only">
                  {props.selectName3}
                </label>
                <Multiselect
                  options={props.mapData3}
                  displayValue={props.optionName2}
                  selectedValues={formData.genre.map((id) =>
                    props.mapData3.find((item) => item.id === id)
                  )}
                  onSelect={handleGenreSelect}
                  onRemove={handleGenreSelect}
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
                  placeholder={`Enter ${props.input}`}
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
                  placeholder={`Enter ${props.description.toLowerCase()}`}
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

export default PopupForm;
