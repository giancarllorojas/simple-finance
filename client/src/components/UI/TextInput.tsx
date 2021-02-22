interface TextInputProps {
  type?: string,
  label: string
}

const TextInput: React.FC<TextInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({label, type = 'text', ...props}) => {
  const baseClasses = 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <div className="mb-2">
      <label className="font-bold mb-1">
        {label}
      </label>
      <input type={type} className={baseClasses} {...props}></input>
    </div>
  )
}

export default TextInput