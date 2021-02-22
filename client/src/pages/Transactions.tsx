import React from "react"
import { Link } from "react-router-dom"
import Btn from "../components/UI/Btn"

const Transactions = () => {
  return (
    <div className="flex items-center w-full">
      <h1>
        My transactions
      </h1>
      <Link className="ml-auto" to="/transactions/new">
        <Btn color="green-600">
          Add transaction
        </Btn>
      </Link>
    </div>
  )
}

export default Transactions