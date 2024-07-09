import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Search from './Search';

const Header: React.FC = () => {
  const navMenu = [
    { id: "All Movies", path: "/" },
    { id: "Popular", path: "/movies/popular" },
    { id: "Top Rated", path: "/movies/top_rated" },
    { id: "Upcoming", path: "/movies/upcoming" }
  ];

  const [activeTab, setActiveTab] = useState(navMenu[0].id);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const toggleMenu = () => {
    setNavIsOpen(!navIsOpen);
  };

  const toggleSearch = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  return (
    <div className='header bg-gray-800'>
      <div className='w-full py-2 md:py-4 flex justify-between items-center px-4 md:px-8'>
        <div className='flex items-center w-1/4 md:w-1/12'>
          <Link to='/'>
            <img src={logo} alt="Logo" className='w-24 h-12' />
          </Link>
        </div>
        <div className='hidden md:flex flex-grow justify-center items-center mx-4'>
          <div className='relative w-3/4'>
           <Search/>
          </div>
        </div>
        <div className='hidden md:flex lg:flex w-4/12 justify-between text-base text-neutral-300 font-medium cursor-pointer'>
          {navMenu.map((menu) => (
            <Link 
              to={menu.path} 
              key={menu.id} 
              onClick={() => setActiveTab(menu.id)}
              className={`${
                activeTab === menu.id ? "" : "hover:text-white/60"
              } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {activeTab === menu.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white mix-blend-difference"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {menu.id}
            </Link>
          ))}
        </div>
        <div className='md:hidden flex items-center'>
          <button onClick={toggleSearch} className='text-neutral-300 hover:text-white focus:outline-none mr-4'>
            <FontAwesomeIcon icon={faSearch} className='w-6 h-6' />
          </button>
          <button onClick={toggleMenu} className='text-neutral-300 hover:text-white focus:outline-none'>
            <FontAwesomeIcon icon={navIsOpen ? faTimes : faBars} className='w-6 h-6' />
          </button>
        </div>
      </div>
      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 transform ${navIsOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='flex justify-end p-4'>
          <button onClick={toggleMenu} className='text-neutral-300 hover:text-white focus:outline-none'>
            <FontAwesomeIcon icon={faTimes} className='w-6 h-6' />
          </button>
        </div>
        <div className='flex flex-col px-4 pb-4 space-y-2'>
          {navMenu.map((menu) => (
            <Link 
              to={menu.path} 
              key={menu.id} 
              onClick={() => { setActiveTab(menu.id); toggleMenu(); }}
              className='block text-base text-neutral-300 hover:text-white '
            >
              <motion.div
                whileHover={{
                  scale: 0.95,
                  color:"#000",
                  backgroundColor: "yellow",
                  padding: '4px',
                  borderRadius:"8px",
                  rotate:"1.5deg",
                  textAlign:"center"
                }}
                transition={{ duration: 0.125, ease: "easeInOut" }}
                className='my-1 '
              >
                {menu.id}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <div className={`fixed top-0 left-0 right-0 p-4 bg-gray-800 z-50 ${searchIsOpen ? 'flex' : 'hidden'} items-center`}>
        <button onClick={toggleSearch} className='text-neutral-300 hover:text-white focus:outline-none mr-4'>
          <FontAwesomeIcon icon={faTimes} className='w-6 h-6' />
        </button>
        <div className='relative w-full'>
          <input 
            type='text' 
            placeholder='Search...' 
            className='w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:bg-gray-600'
          />
          <FontAwesomeIcon icon={faSearch} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
        </div>
      </div>
    </div>
  );
};

export default Header;
