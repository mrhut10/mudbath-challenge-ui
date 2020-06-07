import React from 'react'

interface selectableProps {
  checked: boolean
  onClick?: (e: any)=> any
}

const Selectable = ({checked, onClick}:selectableProps) => {
  return (
    <div
      className="relative inline-block align-middle"
      onClick={onClick}
    >
      {/*
        make visually hidden but not to screenreader
        see https://tailwindcss.com/docs/screen-readers/#app
      */}
      <input type="checkbox" checked={checked} className="absolute sr-only" readOnly/>
      {/* styled checkbox */}
      <div className={`absolute inline-block w-full origin-top-right transform -rotate-45 mx-5 my-10 text-red-500 font-bold`}>
        {checked ? 'SELECTED': undefined}
      </div>
    </div>
  )
}

export default Selectable;
