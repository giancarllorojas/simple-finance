import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import Btn from "../components/UI/Btn"
import TextInput from "../components/UI/TextInput"
import { signIn } from "../store/auth/actions"

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory();
  const dispatch = useDispatch()

  const onSignUp = () => {
    dispatch(signIn('321321', {
      email: email,
      name: name
    }))
    history.push('/')
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1>Create your account</h1>
      <div className="bg-white shadow-xs border-gray-100 p-4 rounded-sm mt-4">
        <TextInput onChange={(e) => setName(e.target.value)} value={name} label="E-mail" placeholder="John Doe"/>
        <TextInput onChange={(e) => setEmail(e.target.value)} value={email} label="E-mail" placeholder="youremail@provider.com"/>
        <TextInput onChange={(e) => setPassword(e.target.value)} value={password} type="password" label="Password" placeholder="*******"/>

        <div className="flex justify-end pt-2">
          <Btn onClick={onSignUp}>
            Create your account
          </Btn>
        </div>
      </div>
      <div className="text-center text-sm font-bold hover:text-green-600 mt-4">
        <Link to="/login">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  )
}

export default Login