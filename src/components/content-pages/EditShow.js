import React, { Component } from 'react';
import axios from "axios";

class EditShow extends Component {
    constructor(props){
        super(props);
        // console.log(this.props.theShow)
        const { name, date, location, price } = this.props.theShow;
        this.state = {
            name,
            date,
            location,
            price
        };
    }


     // for all fields except images and specs
     genericSync(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

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
        axios.put(
          process.env.REACT_APP_SERVER_URL + `/api/shows/${this.props.theShow._id}`,
          this.state,
          { withCredentials: true } // FORCE axios to send cookies across domains
        )
          .then(response => {
            //   instead of using <Redirect /> we use this.props.history.push()
            this.props.history.push('/show-list'); 
          })
          .catch(err => {
            console.log("Update Show ERROR", err);
            alert("Sorry! Something went wrong.");
          });
      }

    render(){
        const { name, date, location, price } = this.state;
        return (
            <section>
                <h2>Edit { name }  </h2>

                <form onSubmit={event => this.handleSubmit(event)}>
                    <label> Name: </label>
                    <input 
                        value={ name }
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="name" 
                    />

                    <label> Date: </label>
                    <input 
                        value={ date }
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="date" 
                    />

                    <label> Location: </label>
                    <input 
                        value={ location }
                        onChange={event => this.genericSync(event)}
                        type="number" 
                        name="location" 
                    />

                    <label> Price: </label>
                    <input 
                        value={ price }
                        onChange={event => this.genericSync(event)}
                        type="number" 
                        name="price" 
                    />
                    <button> Save </button>
                </form>
            </section>
        )
    }
}

export default EditShow;