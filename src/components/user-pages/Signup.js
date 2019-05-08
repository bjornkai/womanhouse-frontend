import React, { Component } from 'react';
import axios from "axios";


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            // these are req.body.name of each input field in the form
            fullName: "",
            email: "",
            originalPassword:"",
            message: null,
        }
    }
// 🎯 you can reuse this for every React form
genericSync(event){
    const { name, value } = event.target;
    this.setState({ [name]:value });
}

handleSubmit(event){
    event.preventDefault();

    axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/signup",
        this.state,
        { withCredentials: true } // FORCE axios to send cookies across domains
      )
        .then(response => {
          // console.log("Signup Page", response.data);
          const { userDoc } = response.data;
          // send "userDoc" to the App.js function that changes "currentUser"
          this.props.onUserChange(userDoc);
        })
        .catch(err => {
          if (err.response && err.response.data) {
            console.error("API response", err.response.data)
             this.setState({ message: err.response.data}) 
          }
        });
    }



render(){
    if(this.props.currentUser){
        return(
            <section>
                <h2> You are signed up! </h2>
                <p> Welcome, { this.props.currentUser.fullName }! 
                    Your email is: <b> { this.props.currentUser.email } </b>
                </p>
            </section>
        )
    }

    return (
         <section>
            <h2> Sign Up </h2>
            
            <form onSubmit={ event => this.handleSubmit(event) } >
                <label> Full Name </label>
                <input
                    value = { this.state.fullName }
                    onChange={ event => this.genericSync(event) }
                    type="text"
                    name="fullName"
                    placeholder="Tony Stark"
                />
               <label> Email </label>
                <input
                    value = { this.state.email }
                    onChange={ event => this.genericSync(event) }
                    type="email"
                    name="email"
                    placeholder="womanhouse@gmail.com"
                />
               <label> Password </label>
                <input
                    value = { this.state.originalPassword }
                    onChange={ event => this.genericSync(event) }
                    type="password"
                    name="originalPassword"
                    placeholder="*******"
                />
                <button> Sign Up </button>
            </form>
            {/* if the message is not NULL then show the message */}
            { this.state.message && <div> { this.state.message } </div> }
        </section>
    )
  }
}

export default Signup;