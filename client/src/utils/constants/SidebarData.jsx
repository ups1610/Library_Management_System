import {HiOutlineViewGrid,HiOutlineDocumentText,HiOutlineCog,HiOutlineQuestionMarkCircle} from 'react-icons/hi'
import { MdLocalLibrary, MdRememberMe, MdOutlineManageSearch, MdOutlinePersonOutline } from "react-icons/md";
import { BsBookshelf } from "react-icons/bs";
import { LiaBookSolid } from "react-icons/lia";
import { SiBookstack } from "react-icons/si";
import { FaRegAddressBook } from "react-icons/fa6";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'catalog',
		label: 'Catalog',
		path: '/dashboard/catalog',
		icon: <SiBookstack />
	},
	{
		key: 'member',
		label: 'Member',
		path: '/dashboard/member',
		icon: <MdRememberMe />
	},
	{
		key: 'operation',
		label: 'Operation',
		path: '/operation',
		icon: <FaRegAddressBook />
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'users',
		label: 'Users',
		path: '/users',
		icon: <MdLocalLibrary />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]

export const SUB_MENU_ITEMS = [
    {
      key: "books",
      label: "Books",
      path: "/dashboard/catalog/books",
      icon: <MdOutlineManageSearch />,
    },
    {
      key: "author",
      label: "Author",
      path: "/dashboard/catalog/author",
      icon: <MdOutlinePersonOutline />,
    },
    {
      key: "genre",
      label: "Genre",
      path: "/dashboard/catalog/genre",
      icon: <LiaBookSolid />,
    },
    {
      key: "shelf",
      label: "BookShelf",
      path: "/dashboard/catalog/bookshelf",
      icon: <BsBookshelf />,
    },
  ];