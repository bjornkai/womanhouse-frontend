import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddSong extends Component {
       constructor(props){
           super(props);
           this.state = {
               title: "",
               author: "",
               lyrics: "",
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
                "http://localhost:5000/api/songs",
                this.state,
                { withCredentials: true }
            )
            .then( response => {
                // console.log("new song: ", response.data);
                this.setState({ isSubmitSuccessful: true })
            } )
            .catch( err => console.log(err) );
        }


       render(){
            if(!this.props.currentUser){
                return <Redirect to="/login-page" />
            }

           if(this.state.isSubmitSuccessful){
               return <Redirect to="/song-list" />
           }
           return(
               <section>
                   <h2> Add a song </h2>
                   <form onSubmit={ e => this.handleSubmit(e) } >
                       <label> Name: </label>
                       <input 
                            value = { this.state.model }
                            onChange={ e => this.genericSync(e) }
                            type = "text"
                            name = "title"
                            placeholder = "name of song"
                        />

                        <label> Author: </label>
                        <input 
                            value = { this.state.date }
                            onChange={ e => this.genericSync(e) }
                            type = "text"
                            name = "author"
                            placeholder = "author of the song"
                        />

                        <label> Lyrics: </label>
                        <input 
                            value = { this.state.location }
                            onChange={ e => this.genericSync(e) }
                            type = "text"
                            name = "lyrics"
                            placeholder = "lyrics of the song"
                        />
                    
                        <button> Save </button>

                   </form>
               </section>
           )
       }
}


export default AddSong;