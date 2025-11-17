import React from 'react'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-3  0 bg-[#eeeeee]">
      <section className="p-1 px-4 sm:px-8 flex justify-between">
        <ul className="flex gap-2 sm:gap-4 text-xs font-semibold overflow-x-auto">
          <li className="cursor-pointer whitespace-nowrap">Offers</li>
          <li className="cursor-pointer whitespace-nowrap">Fanbook</li>
          <li className="flex items-center gap-1 cursor-pointer whitespace-nowrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="none"
              viewBox="0 0 16 28"
              className="font-[10px]"
              stroke="none"
            >
              <rect
                width="15.25"
                height="27.25"
                x="0.375"
                y="0.375"
                stroke="#000"
                strokeWidth="0.75"
                rx="1.625"
              ></rect>
              <circle cx="8" cy="24" r="1" fill="#000"></circle>
            </svg>
            Download App
          </li>
          <li className="cursor-pointer whitespace-nowrap">Find a store near me</li>
        </ul>

        <ul className="flex gap-2 sm:gap-4 text-xs font-semibold">
          <li className="cursor-pointer whitespace-nowrap">Contact Us</li>
          <li className="cursor-pointer whitespace-nowrap">Track Order</li>
        </ul>
      </section>
    </header>
  )
}

export default Header
