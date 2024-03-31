import { HiShieldCheck } from "react-icons/hi";
import lib1 from "../../assets/lib-1.jpg";
import lib2 from "../../assets/lib-2.jpg";
import lib3 from "../../assets/lib-3.webp";
import lib4 from "../../assets/lib-4.jpg";
import lib5 from "../../assets/lib-5.webp";

export const DATA = [
  {
    name: "Library Sample 1",
    image: lib1,
  },
  {
    name: "Library Sample 2",
    image: lib2,
  },
  {
    name: "Library Sample 3",
    image: lib3,
  },
  {
    name: "Library Sample 4",
    image: lib4,
  },
  {
    name: "Library Sample 5",
    image: lib5,
  },
];


export const sliderSettings = {
  slidesPerView : 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1
    },
    600: {
      slidesPerView: 2
    },
    750: {
      slidesPerView: 3
    },
    1100: {
      slidesPerView: 4
    }
  }
}

export const accordian = [
  {
    icon: <HiShieldCheck/>,
    heading: "Catalogue Management",
    detail:
      "Efficiently manage books, genres, and authors with CRUD operations and search functionality.",
  },
  {
    icon: <HiShieldCheck/>,
    heading: "Library Operations",
    detail:
      "Facilitate smooth borrowing, returning, and fine management for library resources.",
  },
  {
    icon: <HiShieldCheck/>,
    heading: "User Memberships",
    detail:
      "Effectively manage user registrations, memberships, and plans.",
  },
  {
    icon: <HiShieldCheck/>,
    heading: "Secure Authentication",
    detail:
      "Ensure secure user authentication and role-based access control.",
  },
  {
    icon: <HiShieldCheck/>,
    heading: "Transaction Records",
    detail:
      "Maintain accurate records of fees and fines for transparent financial transactions.",
  }
];
