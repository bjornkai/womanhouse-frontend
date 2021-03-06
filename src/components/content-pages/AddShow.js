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

    // upload specs
    syncSpecs(event, index) {
        const { specs } = this.state;
        // update the spec value at the given index
        specs[index] = event.target.value;
        // set the state with the updated specs array
        this.setState({ specs });
    }

    handleSubmit(event) {
        // stop the page refresh
        event.preventDefault();
    
        // PUT and POST requests receive a 2nd argument: the info to submit
        // (we are submitting the state we've gathered from the form)
        axios.post(
          process.env.REACT_APP_SERVER_URL + "/api/shows",
          this.state,
          { withCredentials: true } // FORCE axios to send cookies across domains
        )
          .then(response => {
            console.log("Add show", response.data);
            this.setState({ isSubmitSuccessful: true });
          })
          .catch(err => {
            console.log("Add show ERROR", err);
            alert("Sorry! Something went wrong.");
          });
      }



    render(){
        if(!this.props.currentUser){
            return <Redirect to="/login-page" />;
        }

        if (this.state.isSubmitSuccessful) {
            // redirect back to the show list page if the form submission worked
            return <Redirect to="/show-list" />;
        }
        
        return (
            <section>
                <h2>Add a Show</h2>

                <form onSubmit={event => this.handleSubmit(event)}>
                    <label> Name: </label>
                    <input 
                        value={this.state.name}
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="name" 
                        placeholder="name of show" 
                    />

                    <label> Date: </label>
                    <input 
                        value={this.state.date}
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="date" 
                        placeholder="date of show" 
                    />

                    <label> Location: </label>
                    <input 
                        value={this.state.location}
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="location" 
                        placeholder="location of the show" 
                    />

                    <label> Price: </label>
                    <input 
                        value={this.state.price}
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="price" 
                        placeholder="price of the tickets" 
                    />
                    
                    <button> Save </button>
                    
                </form>
            </section>
        )
    }



}

export default AddShow;