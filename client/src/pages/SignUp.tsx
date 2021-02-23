import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import Btn from "../components/UI/Btn"
import TextInput from "../components/UI/TextInput"
import { signIn } from "../store/auth/actions"

const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $fullname: String!){
    createUser(options: {
      email: $email,
      password: $password,
      fullname: $fullname
    }){
      token
    }
  }
`

const Login = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [createUser, { loading }] = useMutation(CREATE_USER);

  const history = useHistory();
  const dispatch = useDispatch()

  const onSignUp = async () => {
    try{
      const { data } = await createUser({ 
        variables: { 
          email: email,
          password: password,
          fullname: name
        } 
      })

      dispatch(signIn(data.createUser.token, {
        email: email,
        name: name
      }))
      history.push('/')
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1>Create your account</h1>
      <div className="bg-white shadow-xs border-gray-100 p-4 rounded-sm mt-4">
        <TextInput onChange={(e) => setName(e.target.value)} value={name} label="E-mail" placeholder="John Doe"/>
        <TextInput onChange={(e) => setEmail(e.target.value)} value={email} label="E-mail" placeholder="youremail@provider.com"/>
        <TextInput onChange={(e) => setPassword(e.target.value)} value={password} type="password" label="Password" placeholder="*******"/>

        <div className="flex justify-end pt-2">
          <Btn loading={loading} onClick={onSignUp}>
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