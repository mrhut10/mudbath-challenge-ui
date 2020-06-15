import React, { ButtonHTMLAttributes, InputHTMLAttributes, ChangeEvent, LegacyRef } from 'react'

interface InputProps {
  id: string,
  type: InputHTMLAttributes<HTMLInputElement>["type"]
  validatorResult: [boolean, string] | boolean
  className?: string
  onChange: (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  // remainding options
  [key:string]: any,
}
const Input = React.forwardRef(
  (props:InputProps, ref) => {
    const {id, type, validatorResult, onChange, className:CN, options, ...extraProps} = props
  // if textArea
  if (type === 'textArea'){
    return (
      <textarea
        id={id}
        name={id}
        onChange={onChange}
        className={
          (validatorResult[0] ? 'bg-white' : 'bg-red-200') 
          + ' rounded-lg p-2 '
          + CN
        }
        ref={ref as LegacyRef<HTMLTextAreaElement>}
        {...extraProps}
      />
    )
  }

  if (type === 'select'){
    return (
      <select 
        id={id}
        name={id}
        ref={ref as LegacyRef<HTMLSelectElement>}
        className={
          (validatorResult[0] ? 'bg-buttonbg' : 'bg-red-200') 
          + ' rounded-l-lg -p-2 appearance-none -m-2'
          + CN
        }
        onChange={onChange}
        {...extraProps}>
        {
          Array.isArray(options) && options.map(item => <option key={item} value={item}>{item}</option>)
        }
        <option value='invalid'>invalid</option>
      </select>
    )
  }
  
  // default input
  return (
    <input
      id={id}
      name={id}
      ref={ref as LegacyRef<HTMLInputElement>}
      type={type}
      onChange={onChange}
      className={
        (validatorResult[0] ? 'bg-white' : 'bg-red-200') 
        + ' rounded-lg p-2 '
        + CN
      }
      {...extraProps}
    />
  )

})


export default Input