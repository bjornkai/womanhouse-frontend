import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



class ShowList extends Component {
    constructor(props){
        super(props);
        this.state = {
            // the array stays empty until the response from server doesn't fill it
            showsArray: [],
        };
    }

 // React will call "componentDidMount()" automatically when ShowList loads
 componentDidMount() {
  // retrieve the info from the API as soon as the component loads
  axios.get(
  process.env.REACT_APP_SERVER_URL + "/api/shows",
  { withCredentials: true } // FORCE axios to send cookies across domains
  )
  .then(response => {
    //   console.log("Show List", response.data);
      // update our state array with the data from the API
      this.setState({ showsArray: response.data });
  })
  .catch(err => {
      console.log("Show List ERROR", err);
      alert("Sorry! Something went wrong.");
  });
}

    render(){
        // console.log('array of shows: ', this.state.showsArray);
        const { showsArray } = this.state;
        return (
            <section id="shows-list">
              <h1 id="header"> Shows </h1>
              {showsArray.map(oneShow => {
                return (
                  <li key={ oneShow._id }>
                            { oneShow.name } at { oneShow.location }
                            <p> { oneShow.price } </p>
                    <Link to ={`show-details/${oneShow._id}`}>edit this show here </Link>
                        </li>
                )
              })}
            </section>
        )
    }
}

export default ShowList;