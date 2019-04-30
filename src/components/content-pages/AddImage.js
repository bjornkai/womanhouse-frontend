import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class AddImage extends Component {
    constructor(props){
    super(props);
    this.state = {
        image: "",
        description: "",
        isSubmitSuccessful: false,
    };
  } 

    uploadImage(event){
    // console.log("upload image: ", event.target.files);
    const { files } = event.target;    
    const uploadData = new FormData();

    uploadData.append("submittedFile", files[0]);

    axios.post(
        "http://localhost:5000/api/upload-file",
        uploadData,
        { withCredentials: true }
    )
    .then( response  => this.setState({ image:response.data.fileUrl }))
    .catch( err => console.log(err) );
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
          "http://localhost:5000/api/gallery",
          this.state,
          { withCredentials: true }
      )
      .then( response => {
          console.log("new image: ", response.data);
          this.setState({ isSubmitSuccessful: true })
      } )
      .catch( err => console.log(err) );
    }


    render(){
      if(!this.props.currentUser){
          return <Redirect to="/login-page" />
      }

     if(this.state.isSubmitSuccessful){
         return <Redirect to="/gallery" />
     }
     return(
         <section>
             <h2> Add an image </h2>
             <form onSubmit={ e => this.handleSubmit(e) } >
                  <input 
                      onChange={ e => this.uploadImage(e) }
                      type= "file"
                  />
                  <br />
                  <img width="200"  src={ this.state.image } alt=""/>
                  <input />
                  <button> Save </button>

             </form>
         </section>
     )
  }
}

export default AddImage;