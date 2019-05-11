import React, { Component } from "react";
import axios from "axios";



class SongList extends Component {
    constructor(props){
        super(props);
        this.state = {
            // the array stays empty until the response from server doesn't fill it
            songsArray: [],
        };
    }

  
   // React will call "componentDidMount()" automatically when ShowList loads
   componentDidMount() {
    // retrieve the info from the API as soon as the component loads
    axios.get(
    process.env.REACT_APP_SERVER_URL + "/api/songs",
    { withCredentials: true } // FORCE axios to send cookies across domains
    )
    .then(response => {
        console.log("Song List", response.data);
        // update our state array with the data from the API
        this.setState({ songsArray: response.data });
    })
    .catch(err => {
        console.log("Song List ERROR", err);
        alert("Sorry! Something went wrong.");
    });
}


    render(){
        // console.log('array of songs: ', this.state.songsArray);
        const { songsArray } = this.state;
        return (
            <section>
              <h1 id="header"> Songs </h1>
              {songsArray.map(oneSong => {
                return (
                  <li key={ oneSong._id }>
                            { oneSong.title } lyrics written by { oneSong.author }
                            <p id="song-display"> { oneSong.lyrics } </p>
              
                        </li>
                )
              })}
            </section>
        )
    }
}

export default SongList;