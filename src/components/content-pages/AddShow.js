import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddShow extends Component {
       constructor(props){
           super(props);
           this.state = {
               name: "",
               date: "",
               location: "",
               price: "",
               isSubmitSuccessful: false,
           };
       } 

       // for all fields 
        genericSync(event) {
            const { name, value } = event.target;
            this.setState({ [name]: value });
        }

        syncSpec(event, index){
            const { specs } = this.state;
            // update the spec with whatever user typed in 
            // which means replace empty string with the value user typed in, on index 0, then 1, then 2, ...
            specs[index] = event.target.value;
            // update the state with the updated specs array
            this.setState({ specs });
        }

        handleSubmit(event){
            event.preventDefault();

            axios.post(
                "http://localhost:5000/api/shows",
                this.state,
                { withCredentials: true }
            )
            .then( response => {
                console.log("new show: ", response.data);
                this.setState({ isSubmitSuccessful: true })
            } )
            .catch( err => console.log(err) );
        }


       render(){
            if(!this.props.currentUser){
                return <Redirect to="/login-page" />
            }

           if(this.state.isSubmitSuccessful){
               return <Redirect to="/show-list" />
           }
           return(
               <section>
                   <h2> Add a show </h2>
                   <form onSubmit={ e => this.handleSubmit(e) } >
                       <label> Name: </label>
                       <input 
                            value = { this.state.model }
                            onChange={ e => this.genericSync(e) }
                            type = "text"
                            name = "name"
                            placeholder = "name of show"
                        />

                        <label> Date: </label>
                        <input 
                            value = { this.state.date }
                            onChange={ e => this.genericSync(e) }
                            type = "text"
                            name = "date"
                            placeholder = "date of show"
                        />

                        <label> Location: </label>
                        <input 
                            value = { this.state.location }
                            onChange={ e => this.genericSync(e) }
                            type = "text"
                            name = "location"
                            placeholder = "address of the show"
                        />

                        <label> Price: </label>
                        <input 
                            value = { this.state.price }
                            onChange={ e => this.genericSync(e) }
                            type = "text"
                            name = "price"
                            placeholder = "ticket price"
                        />

                        <button> Save </button>

                   </form>
               </section>
           )
       }
}


export default AddShow;