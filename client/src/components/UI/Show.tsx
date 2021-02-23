import { React } from "@ungap/global-this"

interface ShowProps {
  show?: boolean
}

const Show: React.FC<ShowProps> = ({show = false, children}) => {
  return (
    <>
      {show ? children : ''}
    </>
  )
}

export default Show