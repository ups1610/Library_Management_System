import React from 'react'
import logo from '../assets/logo.png'
import '../styles/Header.css'
function Header() {
  return (
    <section className='h-wrapper'>
        <div className='flexCenter paddings innerWidth h-container'>
            <div className='z-1 flex gap-1 transition-all hover:transition-transform hover:scale-105 hover:duration-300'>
            <img className='p-1' src={logo} alt="" srcset="" width={60} />
            <a className='text-3xl font-medium p-1' href="/">LibSphere</a>
            </div>
            <div className='flexCenter h-menu'>
                <a href="/" className='transition-all hover:transition-transform hover:scale-105 hover:duration-500'>Home</a>
                <a href="/" className='transition-all hover:transition-transform hover:scale-105 hover:duration-500'>Our Value</a>
                <a href="/" className='transition-all hover:transition-transform hover:scale-105 hover:duration-500'>Contact Us</a>
                <a href="/" className='transition-all hover:transition-transform hover:scale-105 hover:duration-500'>About</a>
                <button className='button'>
                    <a href="/">Get Started</a>
                </button>
            </div>
        </div>
    </section>
  )
}

export default Header
