import React from "react"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { signOut } from "../store/auth/actions"

const NavBar = () => {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(signOut())
  }

  return (
    <div className="flex items-center justify-between h-16 bg-green-600">
      <div className="container max-w-screen-md flex items-center">
        <div className="flex items-baseline space-x-4 w-full">
          <NavLink exact activeClassName="bg-green-900" to="/" className="hover:bg-green-900 text-white px-3 py-2 rounded-md text-sm font-medium">
            Home
          </NavLink>
          <NavLink to="/transactions" activeClassName="bg-green-900" className="hover:bg-green-900 text-white px-3 py-2 rounded-md text-sm font-medium">
            Transactions
          </NavLink>
          <div className="w-full flex justify-end">
            <NavLink onClick={onLogout} to="/login" className="hover:bg-green-900 text-white px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar