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
  
    // UPLOAD IMAGE

    uploadImage(event) {
      const { files } = event.target;
      // console.log("File SELECTED", files[0]);
  
      // the "FormData" class will format the files for sending to our API
      const uploadData = new FormData();
      // the name "fileSubmission" is the one your backend route defined.
      uploadData.append("fileSubmission", files[0]);
  
      axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/upload-file",
        uploadData,
        { withCredentials: true }
      )
      .then(response => {
      //   console.log("Upload Image", response.data);
        this.setState({ image: response.data.fileUrl });
      })
      .catch(err => {
        console.log("Upload Image ERROR", err);
        alert("Sorry! Something went wrong.");
      });
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

    handleSubmit(event) {
      // stop the page refresh
      event.preventDefault();
  
      // PUT and POST requests receive a 2nd argument: the info to submit
      // (we are submitting the state we've gathered from the form)
      axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/gallery",
        this.state,
        { withCredentials: true } // FORCE axios to send cookies across domains
      )
        .then(response => {
          // console.log("Add Image", response.data);
          this.setState({ isSubmitSuccessful: true });
        })
        .catch(err => {
          console.log("Add image ERROR", err);
          alert("Sorry! Something went wrong.");
        });
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
                  <input 
                     value = { this.state.description }
                     onChange={ e => this.genericSync(e) }
                     type = "text"
                     name = "description"
                     placeholder = "description of image"
                  
                  />
                  <button> Save </button>

             </form>
         </section>
     )
  }
}

export default AddImage;