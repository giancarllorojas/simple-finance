import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from "./components/Navbar";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";
import AddTranscation from "./pages/AddTransaction";
import PrivateRoute from "./components/PrivateRoute";
import { RootState } from "./store";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const AppNav: React.FC<{show: boolean}> = ({show}) => {
  if(show){
    return <NavBar/>
  }

  return <React.Fragment/>
}

export default function App() {
  const authState = useSelector<RootState, RootState["auth"]>(state => state.auth)

  return (
    <Router>
        <AppNav show={authState.loggedIn}/>
        <div className="container max-w-screen-md mt-5">
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute exact path="/transactions" component={Transactions}/>
            <PrivateRoute path="/transactions/new" component={AddTranscation}/>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
          </Switch>
        </div>
    </Router>
  );
}