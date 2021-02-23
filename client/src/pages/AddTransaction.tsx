import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import Btn from "../components/UI/Btn"
import TextInput from "../components/UI/TextInput"

const ADD_TRANSACTION = gql`
  mutation createTransaction($name: String!, $value: Float!){
    createTransaction(options: {
      name: $name,
      value: $value
    })
  }
`

const AddTranscation = () => {
  let history = useHistory();

  const [name, setName] = useState('')
  const [value, setValue] = useState('')

  const [createTransaction, {loading}] = useMutation(ADD_TRANSACTION)

  const saveTransaction = async () => {
    try{
      await createTransaction({
        variables: {
          name: name,
          value: parseFloat(value)
        }
      })

      history.push('/transactions')
    }catch(e){
      console.log('e', e)
    }
  }
  
  return (
    <>
      <h1>Adding a new Transaction</h1>
      <div className="mt-4">
        <TextInput onChange={e => setName(e.target.value)} value={name} label="Name" placeholder="My transaction"></TextInput>
        <TextInput onChange={e => setValue(e.target.value)} value={value} type="number" label="Value" placeholder="0"></TextInput>
        <div className="flex justify-end mt-4">
          <Btn onClick={() => history.goBack()} color="gray-400" className="mr-2">
            Back
          </Btn>
          <Btn loading={loading} onClick={saveTransaction}>
            Save
          </Btn>
        </div>
      </div>
    </>
  )
}

export default AddTranscation