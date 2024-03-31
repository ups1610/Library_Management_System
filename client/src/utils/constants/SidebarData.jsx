import {HiOutlineViewGrid,HiOutlineDocumentText,HiOutlineCog,HiOutlineQuestionMarkCircle} from 'react-icons/hi'
import { MdLocalLibrary, MdRememberMe } from "react-icons/md";
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
		path: '/member',
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