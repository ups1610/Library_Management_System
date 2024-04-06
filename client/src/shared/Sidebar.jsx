import React, { useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { IoListOutline } from "react-icons/io5";
import logo from "../assets/logo.png";
import {HiOutlineChevronDown,HiOutlineChevronRight} from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  SUB_MENU_ITEMS,
} from "../utils/constants/SidebarData";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar({ activePath }) {
  const [expanded, setExpanded] = useState("hidden")
  const [isCatalogSubMenuOpen, setIsCatalogSubMenuOpen] = useState(false);

  const handleCatalogSubMenuToggle = () => {
    setIsCatalogSubMenuOpen(!isCatalogSubMenuOpen);
  };

  const handleVisible = () =>{
    if(expanded === "hidden")
      setExpanded("block")
    else
      setExpanded("hidden")
  }

  return (
    <div className="bg-neutral-900 max-w-60  p-3 flex flex-col">
      <button onClick={handleVisible}><IoListOutline className="hidden max-sm:block text-white" /></button>
      <div className={`flex items-center gap-2 px-1 py-3 max-sm:${expanded}`}>
        <img className="p-1 max-sm:w-11" src={logo} alt="" width={50} />
        <a
          className="text-2xl font-medium p-1 text-white max-md:text-xl max-sm:px-0"
          href="/"
        >
          LibSphere
        </a>
      </div>
      <div className={`py-8 flex flex-1 flex-col gap-0.5 max-sm:${expanded}`}>
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <React.Fragment key={link.key}>
            {link.key === "catalog" ? (
              <>
                <div
                  className={ classNames(linkClass, {
                    "bg-neutral-700 text-white": activePath === link.path,
                  })}
                  onClick={handleCatalogSubMenuToggle}
                >
                  <span className="text-neutral-400">{link.icon}</span>
                  <span className="text-neutral-400">{link.label}</span>
                  <span className="text-xl text-neutral-400">
                    {isCatalogSubMenuOpen ? (
                      <HiOutlineChevronDown />
                    ) : (
                      <HiOutlineChevronRight />
                    )}
                  </span>
                </div>
                
                  <div className={classNames("ml-6", {
                    "max-h-0 overflow-hidden": !isCatalogSubMenuOpen,
                    "max-h-full": isCatalogSubMenuOpen,
                  })}
                  style={{
                    transition: "max-height 0.3s ease-in-out",
                  }}>
                    {SUB_MENU_ITEMS.map((subMenuItem) => (
                      <SidebarLink
                        key={subMenuItem.key}
                        link={subMenuItem}
                        activePath={activePath}
                        isSubMenuItem={true}
                      />
                    ))}
                  </div>
                
              </>
            ) : (
              <SidebarLink key={link.key} link={link} activePath={activePath} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className={`flex flex-col gap-0.5 pt-2 border-t border-neutral-700 max-sm:${expanded}`}>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} activePath={activePath} />
        ))}
      </div>
    </div>
  );
}

function SidebarLink({ link, isSubMenuItem }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClass,
        isSubMenuItem ? "pl-2" : "",
        "md:text-base"
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
