import LoadingIcon from "./LoadingIcon"
import Show from "./Show"

interface BtnProps {
  color?: string,
  loading?: boolean
}

const Btn: React.FC<BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({color = 'green-600', loading, children, ...props}) => {
  color = loading ? 'gray-400' : color

  const baseClasses = [
    'flex font-medium hover:opacity-75 hover:shadow-lg px-4 py-2 relative rounded shadow-md text-sm text-white uppercase transition-all ease-in-out duration-200',
    `bg-${color}`,
    props.className,
    loading ? 'cursor-not-allowed' : '',
  ].join(' ')

  return (
    <button {...props} className={baseClasses} disabled={props.disabled || loading}>
      <Show show={loading}>
        <LoadingIcon/>
      </Show>
      {children}
    </button>
  )
}

export default Btn