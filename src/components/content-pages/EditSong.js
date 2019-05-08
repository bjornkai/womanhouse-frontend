import React, { Component } from 'react';
import axios from "axios";

class EditSong extends Component {
    constructor(props){
        super(props);
        // console.log(this.props.theSong)
        const { title, author, lyrics } = this.props.theSong;
        this.state = {
            title,
            author,
            lyrics
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
          process.env.REACT_APP_SERVER_URL + `/api/songs/${this.props.theSong._id}`,
          this.state,
          { withCredentials: true } // FORCE axios to send cookies across domains
        )
          .then(response => {
            //   instead of using <Redirect /> we use this.props.history.push()
            this.props.history.push('/song-list'); 
          })
          .catch(err => {
            console.log("Update Song ERROR", err);
            alert("Sorry! Something went wrong.");
          });
      }

    render(){
        const { title, author, lyrics } = this.state;
        return (
            <section>
                <h2>Edit { title } by { author } </h2>

                <form onSubmit={event => this.handleSubmit(event)}>
                    <label> Title: </label>
                    <input 
                        value={ title }
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="title" 
                    />

                    <label> Author: </label>
                    <input 
                        value={ author }
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="author" 
                    />

                    <label> Lyrics: </label>
                    <input 
                        value={ lyrics }
                        onChange={event => this.genericSync(event)}
                        type="number" 
                        name="lyrics" 
                    />
                    <button> Save </button>
                </form>
            </section>
        )
    }
}

export default EditSong;