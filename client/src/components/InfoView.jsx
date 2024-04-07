import React, { useState } from "react";
import { options, settings } from "../utils/constants/InfoViewData";
import PopupForm from "./modals";

function InfoView(props) {
  return (
    <>
  <div className="text-[#8c8b8b]">
    <h2 className="text-xl">Detail View</h2>
  </div>

  <div className="mt-5 flex flex-col sm:flex-row w-full h-full">
    <div className="sm:w-1/4 flex flex-col gap-4">
      <div className="w-full p-2 bg-white border rounded-md shadow-md">
        <Options />
      </div>

      <div className="w-full p-2 bg-white border rounded-md shadow-md">
        <Settings />
      </div>
    </div>
    
    <div className="sm:w-3/4">
      <div className="flex flex-col gap-4 sm:pl-2">
        <div className="w-full p-2 bg-white border rounded-md mt-4 sm:mt-0">
          <InfoDetails />
        </div>

        {/* <div className="w-full p-2 bg-white border rounded-md mt-4 sm:mt-0">
          <InfoInstance />
        </div> */}
      </div>
    </div>
  </div>
</>
  );
}

export default InfoView;

const Options = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowPopup(option.state);
  };
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
              <button
                className="flex items-center p-2 rounded-lg group "
                onClick={() => handleOptionClick(option)}
              >
                <span>{option.icon}</span>
                <span className="ms-3">{option.label}</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {showPopup && selectedOption && (
        <PopupForm
          title={`Add ${selectedOption.label}`}
          onClick={() => setShowPopup(false)}
          input={selectedOption.field1}
          selectName3={selectedOption.field2}
          button={selectedOption.button}
        />
      )}
    </>
  );
};

export const Settings = (props) => {
  return(
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
  )
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
            <div className="border-2 p-2">
              <img
                alt=""
                src="https://m.media-amazon.com/images/I/411t3aQzVaL.jpg"
                className="w-full h-auto object-contain"
              />
            </div>
            <h3 className="secondaryText text-lg sm:text-xl font-bold text-gray-900 mt-4 text-center">
              Python Programming
            </h3>
          </div>

          {/* Table Div */}
          <div className="flex-grow">
            <table className="w-full table-auto">
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">ISBN :</td>
                  <td>#12345</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Name :</td>
                  <td className="font-medium">
                    Introduction to Python Programming
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Author :</td>
                  <td>Upendra</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Genre :</td>
                  <td>Programming, Data Science</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Total sets :</td>
                  <td>10</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Imprint :</td>
                  <td>xyz</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Status :</td>
                  <td>
                    <span className="bg-green-700 px-2 rounded-sm text-white">
                      Available
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="w-1/4 p-2">Description :</td>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore ducimus aspernatur ipsam, placeat dolorem odit
                    architecto quas eius mollitia. Cupiditate minus molestiae
                    magnam praesentium! Voluptatibus sequi autem illo optio rem!
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

// export const InfoInstance = (props) => {};
