import React from "react";
import { X } from "lucide-react";

function PopupForm(props) {
  return (
    <div className="z-10 fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <button onClick={props.onClick}>
          <X size="24" />
        </button>
        <div className="mx-auto max-w-lg">
          {props.title && (
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              {props.title}
            </h1>
          )}

          {props.titleDesc && (
            <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
              {props.titleDesc}
            </p>
          )}

          <form
            onSubmit={props.onSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <div className="flex justify-between gap-2">
              {props.name1 && (
                <div>
                  <label
                    htmlFor={props.name1.toLowerCase()}
                    className="sr-only"
                  >
                    {props.name1}
                  </label>
                  <input
                    type="text"
                    id={props.name1.toLowerCase()}
                    name={props.name1.toLowerCase()}
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder={`Enter ${props.name1.toLowerCase()}`}
                  />
                </div>
              )}
              {props.name2 && (
                <div>
                  <label
                    htmlFor={props.name2.toLowerCase()}
                    className="sr-only"
                  >
                    {props.name2}
                  </label>
                  <input
                    type="text"
                    id={props.name2.toLowerCase()}
                    name={props.name2.toLowerCase()}
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder={`Enter ${props.name2.toLowerCase()}`}
                  />
                </div>
              )}
            </div>

            {props.date && (
              <div>
                <label htmlFor={props.date.toLowerCase()} className="sr-only">
                  {props.date}
                </label>
                <input
                  type="date"
                  id={props.date.toLowerCase()}
                  name={props.date.toLowerCase()}
                  required
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder={`Enter ${props.date.toLowerCase()}`}
                />
              </div>
            )}

            {props.quantity && (
              <div>
                <label
                  htmlFor={props.quantity.toLowerCase()}
                  className="sr-only"
                >
                  {props.quantity}
                </label>
                <input
                  type="number"
                  id={props.quantity.toLowerCase()}
                  name={props.quantity.toLowerCase()}
                  required
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder={`Enter ${props.quantity.toLowerCase()}`}
                />
              </div>
            )}
            <div>
              {props.selectName1 && (
                <div>
                  <label
                    htmlFor={props.selectName1.toLowerCase()}
                    className="sr-only"
                  >
                    {props.selectName1}
                  </label>
                  <select
                    id={props.selectName1.toLowerCase()}
                    name={props.selectName1.toLowerCase()}
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400"
                  >
                    <option value="">
                      Select {props.selectName1.toLowerCase()}
                    </option>
                    {/* Add options dynamically here */}
                    <option value="author1">Author 1</option>
                    <option value="author2">Author 2</option>
                  </select>
                </div>
              )}
              {props.selectName2 && (
                <div>
                  <label
                    htmlFor={props.selectName2.toLowerCase()}
                    className="sr-only"
                  >
                    {props.selectName2}
                  </label>
                  <select
                    id={props.selectName2.toLowerCase()}
                    name={props.selectName2.toLowerCase()}
                    required
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400"
                  >
                    <option value="">
                      Select {props.selectName2.toLowerCase()}
                    </option>
                    {/* Add options dynamically here */}
                    <option value="author1">Author 1</option>
                    <option value="author2">Author 2</option>
                  </select>
                </div>
              )}
            </div>
            {props.selectName3 && (
              <div>
                <label
                  htmlFor={props.selectName3.toLowerCase()}
                  className="sr-only"
                >
                  {props.selectName3}
                </label>
                <select
                  id={props.selectName3.toLowerCase()}
                  name={props.selectName3.toLowerCase()}
                  required
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-gray-400"
                >
                  <option value="">
                    Select {props.selectName3.toLowerCase()}
                  </option>
                  {/* Add options dynamically here */}
                  <option value="author1">Author 1</option>
                  <option value="author2">Author 2</option>
                </select>
              </div>
            )}
            {props.input && (
              <div>
                <label htmlFor={props.input.toLowerCase()} className="sr-only">
                  {props.input}
                </label>
                <input
                  type="text"
                  id={props.input.toLowerCase()}
                  name={props.input.toLowerCase()}
                  required
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder={`Enter ${props.input}`}
                />
              </div>
            )}

            {props.description && (
              <div>
                <label
                  htmlFor={props.description.toLowerCase()}
                  className="sr-only"
                >
                  {props.description}
                </label>
                <textarea
                  id={props.description.toLowerCase()}
                  name={props.description.toLowerCase()}
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
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
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
