import {HiOutlineViewGrid,HiOutlineDocumentText,HiOutlineCog,HiOutlineQuestionMarkCircle} from 'react-icons/hi'
import { MdLocalLibrary, MdRememberMe, MdOutlineManageSearch } from "react-icons/md";
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
      label: "Manage Books",
      path: "/dashboard/catalog",
      icon: <MdOutlineManageSearch />,
    },
    {
      key: "books_instance",
      label: "Books Instance",
      path: "/catalog/books_instance",
      icon: <MdLocalLibrary />,
    },
    {
      key: "author",
      label: "Author",
      path: "/catalog/author",
      icon: <MdLocalLibrary />,
    },
    {
      key: "genre",
      label: "Genre",
      path: "/catalog/genre",
      icon: <MdLocalLibrary />,
    },
    {
      key: "shelf",
      label: "Shelf",
      path: "/catalog/shelf",
      icon: <MdLocalLibrary />,
    },
  ];