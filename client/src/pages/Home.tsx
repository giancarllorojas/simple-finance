import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux"
import LoadingIcon from "../components/UI/LoadingIcon";
import Show from "../components/UI/Show";
import { RootState } from "../store"

const GET_SUMMARY = gql`
  query{
    getUserSummary{
      income,
      expenses
    }
  }
`

const Home = () => {
  const authState = useSelector<RootState, RootState["auth"]>(state => state.auth)

  const { loading, data } = useQuery(GET_SUMMARY, {
    fetchPolicy: "network-only"
  });

  return (
    <div>
      <h1>
        Olá, {authState.user?.name}
      </h1>

      <Show show={!loading}>
        
        <div className="flex mt-4">
          <div className="w-full bg-white p-4 rounded-sm shadow-sm flex flex-col">
            <label className="text-sm">Income</label>
            <span className="font-bold text-4xl text-green-600">
              ${!!data ? data.getUserSummary.income : ''}
            </span>
          </div>
          <div className="ml-2 w-full bg-white p-4 rounded-sm shadow-sm flex flex-col">
            <label className="text-sm">Expenses</label>
            <span className="font-bold text-4xl text-red-600">
              -${!!data ? Math.abs(data.getUserSummary.expenses) : ''}
            </span>
          </div>
        </div>
      </Show>
      
      <Show show={loading}>
        <div className="flex w-full text-center">
          <LoadingIcon/>
        </div>
      </Show>
    </div>
  )
}

export default Home