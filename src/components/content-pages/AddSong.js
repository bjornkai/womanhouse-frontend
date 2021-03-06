import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddSong extends Component { 
    constructor(props) {
        super(props);
    
        this.state = {
          title: "",
          author: "",
          lyrics: "",
          // each empty string in "specs" will display an <input> tag
          isSubmitSuccessful: false,
        };

        console.log(this.props)
    }

    // for all fields except images and specs
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
          process.env.REACT_APP_SERVER_URL + "/api/songs",
          this.state,
          { withCredentials: true } // FORCE axios to send cookies across domains
        )
          .then(response => {
            console.log("Add song", response.data);
            this.setState({ isSubmitSuccessful: true });
          })
          .catch(err => {
            console.log("Add song ERROR", err);
            alert("Sorry! Something went wrong.");
          });
      }

    render(){
        if(!this.props.currentUser){
            return <Redirect to="/login-page" />;
        }

        if (this.state.isSubmitSuccessful) {
            // redirect back to the song list page if the form submission worked
            return <Redirect to="/song-list" />;
        }

        return (
            <section>
                <h2>Add a Song</h2>

                <form onSubmit={event => this.handleSubmit(event)}>
                    <label> Title: </label>
                    <input 
                        value={this.state.title}
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="title" 
                        placeholder="name of song" 
                    />

                    <label> Author: </label>
                    <input 
                        value={this.state.author}
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="author" 
                        placeholder="name of author" 
                    />

                    <label> Lyrics: </label>
                    <input 
                        value={this.state.lyrics}
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="lyrics" 
                        placeholder="lyrics of song" 
                    />
                    
                    <button> Save </button>
                    
                </form>
            </section>
        )
    }
}

export default AddSong;