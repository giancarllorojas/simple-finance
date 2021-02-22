import React from "react"
import { useHistory } from "react-router-dom";
import Btn from "../components/UI/Btn"
import TextInput from "../components/UI/TextInput"

const AddTranscation = () => {
  let history = useHistory();
  
  return (
    <>
      <h1>Adding a new Transaction</h1>
      <div className="mt-4">
        <TextInput label="Name" placeholder="My transaction"></TextInput>
        <TextInput type="number" label="Value" placeholder="0"></TextInput>
        <div className="flex justify-end mt-4">
          <Btn onClick={() => history.goBack()} color="gray-400" className="mr-2">
            Back
          </Btn>
          <Btn>
            Add transaction
          </Btn>
        </div>
      </div>
    </>
  )
}

export default AddTranscation