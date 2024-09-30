import React, { useEffect, useRef, useState } from 'react'
import { GiReceiveMoney } from 'react-icons/gi'
import { PiHandDeposit } from 'react-icons/pi'

type Props = {
  title: string
  icon: React.ReactNode
  position: string
  handleClick?: () => void
  otherClasses?: string
}
export const ShimmerButton = ({
  title, icon, position, handleClick, otherClasses
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className='relative inline-block text-center'>
      <div>
        <button
          className={`inline-flex h-10 w-full animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 gap-3 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400  ${otherClasses}`}
          onClick={()=>{
            if(title == 'Connect'){
              console.log('Hello');
              toggleDropdown()
            }
          }}
        >
          {position === 'left' && icon}
          {title}
          {position === 'right' && icon}
        </button>
      </div>

      {title === 'Connect' && isOpen && (
        <div className={`origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 gap-0`}>
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className={`inline-flex h-10 w-full animate-shimmer items-center justify-around rounded-t-md border-x border-t border-slate-800 bg-black  px-6 gap-3 font-light text-sm text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400  ${otherClasses}`}
              onClick={() => {
                
              }}
            >
              <PiHandDeposit  />
              Employeer Login
            </button>
            <button
              className={`inline-flex h-10 w-full animate-shimmer items-center justify-around rounded-b-md border-x border-b border-slate-800 bg-black px-6 gap-3 font-light text-sm text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400  ${otherClasses}`}
              onClick={() => {
                
              }}
            >
              <GiReceiveMoney />
              Employee Login
            </button>
          </div>
        </div>
      )}
    </div>

  )
}
