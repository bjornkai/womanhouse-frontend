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

 // React will call "componentDidMount()" automatically when ShowList loads
 componentDidMount() {
  // retrieve the info from the API as soon as the component loads
  axios.get(
  process.env.REACT_APP_SERVER_URL + "/api/shows",
  { withCredentials: true } // FORCE axios to send cookies across domains
  )
  .then(response => {
      console.log("Show List", response.data);
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