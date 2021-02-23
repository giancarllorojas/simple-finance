import { gql, useQuery } from "@apollo/client";
import React from "react"
import { Link } from "react-router-dom"
import Btn from "../components/UI/Btn"
import LoadingIcon from "../components/UI/LoadingIcon";
import Show from "../components/UI/Show";
import { Transaction } from "../store/transaction/types";

const GET_TRANSACTIONS = gql`
  query{
    getUserTransactions{
      id,
      name,
      value
    }
  }
`

const Transactions = () => {
  const { loading, data } = useQuery(GET_TRANSACTIONS, {
    fetchPolicy: "network-only"
  });

  const userTransactions = !!data ? data.getUserTransactions : []

  const tableTransactions = userTransactions.map((t: Transaction) =>
    <tr key={t.id}>
      <td>{t.id}</td>
      <td>{t.name}</td>
      <td>{t.value}</td>
    </tr>
  );

  return (
    <>
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
      <div className="w-full text-center mt-4">
        <Show show={loading}>
          <LoadingIcon/>
        </Show>
        <Show show={!loading}>
          <table className="table-fixed w-full bg-white shadow-sm rounded-sm p-10">
            <thead>
              <tr>
                <th className="w-10">ID</th>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {tableTransactions}
            </tbody>
          </table>
        </Show>
      </div>
    </>
  )
}

export default Transactions