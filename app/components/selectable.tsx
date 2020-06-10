import React, { ReactElement } from 'react'

interface selectableProps {
  checked: boolean
}

const Selectable = ({checked}:selectableProps) => {
  return (
    <div
      className="relative w-full"
    >
      {/*
        make visually hidden but not to screenreader
        see https://tailwindcss.com/docs/screen-readers/#app
      */}
      <input type="checkbox" checked={checked} className="absolute sr-only" readOnly/>
      {/* styled checkbox */}
      <div className={`fixed w-full h-full origin-top-left transform -rotate-45 mx-5 my-10 text-red-400 font-bold`}>
        {checked ? 'SELECTED': undefined}
      </div>
    </div>
  )
}

export default Selectable;
