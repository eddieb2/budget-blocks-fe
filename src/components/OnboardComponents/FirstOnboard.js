import React,{useEffect,useState} from "react"
import Balance from "../Balance_Components/Balance"
import {loginUser} from "../../redux/actions/LoginActions"
import "./onboard.css"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner'

const FirstOnboard = props => {
    useEffect(() => {
props.loginUser({email:localStorage.getItem("user_email"),password:localStorage.getItem("user_password")})
    },[])
    console.log(props.error)
    return (
        
       <div>
            {!props.isFetching && !props.linkedAccount && props.error === null
            ?
            <div className="main">
        <div className="manualBudgetButton"> <Link to="/onboard/budget">Manually set your budget goals here</Link></div>
        <Balance /> 
        </div>
        :
      props.isFetching 
      ?
      <div><Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100} //3 secs

   /></div>
      :
      props.linkedAccount === true
      ?
      props.history.push("/dashboard")
      :
      <div className="main">
      <p className="error">Sorry Please Try Again</p>
  <div className="manualBudgetButton"> <Link to="/onboard/budget">Manually set your budget goals here</Link></div>
  <Balance /> 
  </div>

            }

        </div>
    )
}
function mapStateToProps(state) {
    return {
      isFetching: state.plaidReducer.isFetching,
      error: state.plaidReducer.error,
        linkedAccount: state.loginReducer.user.LinkedAccount
    };
  }
  
  export default connect(mapStateToProps, { loginUser })(FirstOnboard);