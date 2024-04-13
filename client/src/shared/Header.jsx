import React, { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAuth } from "../context/Authetication";
import user from "../assets/user.png";
import { VscSignOut } from "react-icons/vsc";
export default function Header() {
const navigate = useNavigate();
const auth = useAuth();

  function logout() {
    auth.signOut();
  }

  return (
    <div className="md:w-full w-screen bg-white h-16 px-4 flex items-center border-b border-gray-200  justify-between">
      <div></div>
      <div className="flex items-center gap-2 mr-2">
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2  flex text-sm   rounded-full   ">
              <div className="flex items-center">
                <img src={user} className="mr-2 w-[30px] h-[30px]" alt="user" />
                <p className="text-left">Sagar</p>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={logout}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
					<div className="flex nowrap gap-2 items-center">
					<VscSignOut />  Sign out
					</div>
                 
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
