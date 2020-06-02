import React from 'react'

const Title = ({children}) => (
  <div className="w-full">
    <div className="bg-white rounded-lg shadow hover:shadow-lg text-center">
      {children}
    </div>
  </div>
)

export default Title;