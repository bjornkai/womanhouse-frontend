import React, { Component } from "react";
import axios from "axios";


class ShowList extends Component {
    constructor(props){
        super(props);
        this.state = {
            // the array stays empty until the response from server doesn't fill it
            showsArray: [],
        };
    }

    componentDidMount(){
        axios.get(
            "http://localhost:5000/api/shows",
            { withCredentials: true }
        )
        .then( responseFromAPI => this.setState({ showsArray: responseFromAPI.data }) )
        .catch( err => console.log(err) );
    }

    render(){
        // console.log('array of shows: ', this.state.showsArray);
        const { showsArray } = this.state;
        return (
            <section>
              <h1> Shows </h1>
              {showsArray.map(oneShow => {
                return (
                  <li key={ oneShow._id }>
                            { oneShow.name } at { oneShow.location }
                            <p> { oneShow.price } </p>
              
                        </li>
                )
              })}
            </section>
        )
    }
}

export default ShowList;