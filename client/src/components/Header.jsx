import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { BiMenuAltRight } from 'react-icons/bi';
import '../styles/Header.css';
import {Link} from "react-scroll"

import LoginModel from './LoginModel';

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const[showModal,setShowModal] = useState(false)

  const toggleMenu = () => {
    setMenuOpened(prevState => !prevState);
  };
  return (
    <section className='h-wrapper'>
      <div className='flexCenter paddings innerWidth h-container'>
        <div className='app-title z-1 flex gap-1 transition-all hover:transition-transform hover:scale-105 hover:duration-300'>
          <img className='p-1' src={logo} alt='' width={60} />
          <a className='text-3xl font-medium p-1' href='/'>
            LibSphere
          </a>
        </div>
          <div
            className='flexCenter h-menu'
            style={{ right: !menuOpened && '-100%' }}
          >
            <Link to='hero' href='/' className='transition-all hover:transition-transform hover:scale-105 hover:duration-500'>
              Home
            </Link>
            <Link to='value' href='/' className='transition-all hover:transition-transform hover:scale-105 hover:duration-500'>
              Our Value
            </Link>
            <Link to='contact' href='/' className='transition-all hover:transition-transform hover:scale-105 hover:duration-500'>
              Contact Us
            </Link>
            <Link to='about' href='/' className='transition-all hover:transition-transform hover:scale-105 hover:duration-500'>
              About
            </Link>
            <button className='button' onClick={()=> setShowModal(true)}>
              Get Started
            </button>
            {showModal && <LoginModel onClose={()=> setShowModal(false)}/>}
          </div>
        <div className='h-menu-icon' onClick={toggleMenu}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
}

export default Header;
