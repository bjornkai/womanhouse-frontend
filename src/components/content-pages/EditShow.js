import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';

class EditShow extends Component {
    constructor(props){
        super(props);
        // console.log(props)
        console.log(this.props.theShow, "the props.show")
        const { _id, name, date, location, price } = this.props.theShow;
        // console.log(_id, " id in the constructor")
        
        this.state = {
            _id,
            name,
            date,
            location,
            price,
            redirect: false
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
        console.log(this.state);
        // stop the page from refreshing
        event.preventDefault();
        // PUT and POST requests receive a 2nd argument: the info to submit
        // (we are submitting the state we've gathered from the form)
        axios.put(
          process.env.REACT_APP_SERVER_URL + `/api/shows/${this.props.theShow._id}`,
          this.state,
          { withCredentials: true } // FORCE axios to send cookies across domains
        )
          .then(response => {
            this.setState({redirect: true}); 
          })
          .catch(err => {
            console.log("Update Show ERROR", err);
            alert("Sorry! Something went wrong.");
          });
      }

    render(){
        const { name, date, location, price } = this.state;
        console.log(this.state, "this is edit show component");
        if(this.state.redirect){
            return <Redirect to="/show-list"/>;
        } else {
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
                        type="text" 
                        name="location" 
                    />

                    <label> Price: </label>
                    <input 
                        value={ price }
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="price" 
                    />
                    <button> Save </button>
                </form>
            </section>
        )
        }
        
    }
}

export default EditShow;