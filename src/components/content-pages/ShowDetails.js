import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditShow from './EditShow';

class ShowDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            showEdit: false,
        };
    }

    // React will call "componentDidMount()" automatically when ShowDetails loads
    componentDidMount(){
        const { params } = this.props.match;

        axios.get(process.env.REACT_APP_SERVER_URL + `/api/shows/${params.showId}`)
        .then(responseFromApi => {
            console.log(responseFromApi.data);
            this.setState(responseFromApi.data);
        })
        .catch(err => console.log(err));
    }

    showEditForm(){
        this.setState({ showEdit: true });   
    }

    deleteShow(id){
        axios.delete(process.env.REACT_APP_SERVER_URL + `/api/shows/${id}`)
        .then(responseFromApi => {
            this.props.history.push('/show-list'); 
        })
        .catch(err => console.log(err));
    }

    render(){
        console.log('ShowDetails', this.state);
        return (
            <section>

                <EditShow theShow = {this.state}/>
              
                <Link to={"/show-list"}>Go to shows page </Link>
                
            </section>
        )
    }
}

export default ShowDetails;