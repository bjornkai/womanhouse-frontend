import React, { Component } from 'react';
import './App.css';
import { Switch, NavLink, Route } from "react-router-dom";
import axios from "axios";
import Signup from './components/user-pages/Signup';
import Login from './components/user-pages/Login';
import Home from './components/Home';
import AddShow from './components/content-pages/AddShow';
import ShowList from './components/content-pages/ShowList';
import AddSong from './components/content-pages/AddSong';
import SongList from './components/content-pages/SongList';
import AddImage from './components/content-pages/AddImage';
import Gallery from './components/content-pages/Gallery';


class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount(){
    axios.get("http://localhost:5000/api/checkuser", { withCredentials:true })
    .then(responseFromBackend => {
      // console.log("Check User in APP.JS: ",responseFromBackend.data)
      const { userDoc } = responseFromBackend.data;
      this.syncCurrentUser(userDoc);
    });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(user){
    this.setState({ currentUser: user });
  }

  logout(){
    axios.delete(
      "http://localhost:5000/api/logout",
      { withCredentials: true }
    )
    .then(() => this.syncCurrentUser(null))
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App">
        <header>
         <h1> womanhouse </h1>
         <nav>
          {/* Home will be always visible to everyone */}
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/show-list"> Shows </NavLink>
            <NavLink to="/song-list"> Songs </NavLink>
            <NavLink to="/gallery"> Gallery </NavLink>

          { this.state.currentUser ? (
            // these pages will be visible only if the user exists
            <span>
              <NavLink to="/add-show"> Add a Show</NavLink>
              <NavLink to="/add-song"> Add a Song</NavLink>
              <NavLink to="/add-image"> Add to Gallery</NavLink>
              <br />
              <b> { this.state.currentUser.fullName } </b>
              <button onClick={ () => this.logout() }> Log out </button>
            </span>
          ) : (
            // these pages will be visible only if there is no user in the session // WILL HIDE LATER <------- !!!!!!!!!!!
            <span>
              <NavLink to="/signup-page"> Signup </NavLink>
              <NavLink to="/login-page"> Login </NavLink>
            </span>
          ) }
          
         </nav>
        </header>

        <Switch>
          {/* this is example how to normally do the Route: */}
          {/* <Route path="/somePage" component={ someComponentThatWillRenderWhenUSerClickThisLink }   /> */}
        <Route exact path="/" component={ Home } />


         {/* this way we use when we are passing params down to componentDidMount() {
           so we can't use component={}, but instead we have to use render ={() => <someComponent/>}
         } */}
         
          <Route path="/signup-page" render={ () => 
            <Signup currentUser={this.state.currentUser} 
            onUserChange={ userDoc => this.syncCurrentUser(userDoc) }   />
          }  />

          
          <Route path="/login-page" render={ () => 
            <Login currentUser={ this.state.currentUser } 
            onUserChange={userDoc => this.syncCurrentUser(userDoc)} /> }  />

          <Route path="/add-show" render={ () => <AddShow currentUser={ this.state.currentUser }  /> }/>
          <Route path="/show-list" component={ ShowList }/>

          <Route path="/add-song" render={ () => <AddSong currentUser={ this.state.currentUser }  /> }/>
          <Route path="/song-list" component={ SongList }/>

          <Route path="/add-image" render={ () => <AddImage currentUser={ this.state.currentUser }  /> }/>
          <Route path="/gallery" component={ Gallery }/>

        </Switch>

        <footer>
          
        </footer>
      </div>
    );
  }
}

export default App;
