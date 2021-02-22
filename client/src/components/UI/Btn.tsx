interface BtnProps {
  color?: string
}

const Btn: React.FC<BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({color = 'green-600', children, ...props}) => {
  const baseClasses = [
    props.className,
    'font-medium hover:opacity-75 hover:shadow-lg px-4 py-2 relative rounded shadow-md text-sm text-white uppercase transition-all ease-in-out duration-200',
    `bg-${color}`
  ].join(' ')

  return (
    <button {...props} className={baseClasses}>
      {children}
    </button>
  )
}

export default Btn