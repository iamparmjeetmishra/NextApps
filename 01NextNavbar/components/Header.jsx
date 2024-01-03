'use client'
import Nav from './Nav'
import { useState } from 'react';

import { CgMenuRightAlt } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";

import { useAutoAnimate } from '@formkit/auto-animate/react';



export default function Header ()  {
  const [animationParent] = useAutoAnimate()
  const [toggleMenu, setToggleMenu] = useState(false)

  function openSideMenu() {
    setToggleMenu(true)
  }
  function closeSideMenu() {
    setToggleMenu(false)
  }

  return (
    <>
      <header className="flex items-center  mx-auto w-full max-w-7xl justify-between px-4 py-5 text-sm">
        {/* Left Side */}
        <div ref={animationParent} className="flex items-center gap-10">
          {/* Logo */}
          <h2 className="font-extrabold text-2xl">parm</h2>
          {/* Mobile */}
          {toggleMenu && 
          <MobileNav closeSideMenu={closeSideMenu} />
          }
          {/* NavItems */}
          <Nav className='hidden md:flex' />
        </div>
        {/* right Side */}
        <div className="hidden md:flex items-center gap-8">
          <button className="h-fit text-neutral-600 transition-all hover:text-black/90">
            Login
          </button>
          <button className="h-fit rounded-xl border-2 border-neutral-600 px-4 py-2  text-neutral-600 transition-all hover:border-black hover:text-black/90">
            Register
          </button>
        </div>
        <CgMenuRightAlt onClick={openSideMenu} className='text-3xl md:hidden' />
      </header>
    </>
  );
};


function MobileNav({closeSideMenu}) {
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className="h-full w-[65%] bg-white p-4">
        <div className="flex justify-end">
          <AiOutlineClose className="cursor-pointer text-4xl" onClick={closeSideMenu} />
        </div>
          <Nav className='' />
      </div>
    </div>
  )
}


