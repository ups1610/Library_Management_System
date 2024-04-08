import { PiBooks } from "react-icons/pi";
import { IoPrintOutline } from "react-icons/io5";
import { MdDriveFolderUpload, MdOutlineContactSupport, MdMoreHoriz } from "react-icons/md";
import { FaAffiliatetheme, FaRegEdit } from "react-icons/fa";
export const options = [
  { icon: <MdDriveFolderUpload />, label: "Upload Book Image", field1:"Url", button:"Upload", state: true},
  { icon: <FaRegEdit />, label: "Update Book Details", field1:"Imprint", field2:"Status", state:false},
  { icon: <PiBooks />, label: "Add Instance", field1:"Imprint", button:"Add Instance", state:true},
  { icon: <IoPrintOutline />, label: "Print Book Detail", field1:"Imprint", field2:"Status", state:false },
];

export const settings = [
  { icon: <FaAffiliatetheme />, label: "Change Theme" },
  { icon: <MdOutlineContactSupport />, label: "Support" },
  { icon: <MdMoreHoriz />, label: "More Details" },
];

export const personDetail = [
    {label: "Name :", info: "Upendra"},
    {label: "DOB :", info:"16-7-2222"},
    {label: "About :", info:"ndjnwk kndkwndk dnwdkn kdnqwknd dkqwnlqw ndwndw dnqlwndl bdb bhb didln dqwnkqbd bdehbc kek"}
]
