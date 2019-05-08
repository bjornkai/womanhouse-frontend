import React, { Component } from "react";
import axios from "axios";


class Gallery extends Component {
    constructor(props){
        super(props);
        this.state = {
            // the array stays empty until the response from server doesn't fill it
            galleryArray: [],
        };
    }

    componentDidMount(){
        axios.get(
          process.env.REACT_APP_SERVER_URL + "/api/gallery",
            { withCredentials: true }
        )
        .then( responseFromAPI => this.setState({ galleryArray: responseFromAPI.data }) )
        .catch( err => console.log(err) );
    }

    render(){
        // console.log('array of images: ', this.state.galleryArray);
        const { galleryArray } = this.state;
        return (
            <section>
              <h1> Gallery </h1>
              {galleryArray.map(oneImage => {
                return (
                  <li key={ oneImage._id }>
                            { oneImage.image }
                            {/* <p> { oneImage.description } </p> */}
                            <img  width="100" src={ oneImage.image } alt={ oneImage.description }/>
                        </li>
                )
              })}
            </section>
        )
    }
}

export default Gallery;