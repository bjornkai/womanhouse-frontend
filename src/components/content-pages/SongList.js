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

    componentDidMount(){
        axios.get(
            "http://localhost:5000/api/songs",
            { withCredentials: true }
        )
        .then( responseFromAPI => this.setState({ songsArray: responseFromAPI.data }) )
        .catch( err => console.log(err) );
    }

    render(){
        // console.log('array of songs: ', this.state.songsArray);
        const { songsArray } = this.state;
        return (
            <section>
              <h1> Songs </h1>
              {songsArray.map(oneSong => {
                return (
                  <li key={ oneSong._id }>
                            { oneSong.title } lyrics written by { oneSong.author }
                            <p> { oneSong.lyrics } </p>
              
                        </li>
                )
              })}
            </section>
        )
    }
}

export default SongList;