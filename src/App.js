import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Custom CSS
import './App.css';

// Component Import
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Canvas from "./components/Canvas";
import CreatePost from "./components/CreatePost";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <Header />
          <Route exact path="/" component={Canvas} />
          <Route exact path="/post" component={CreatePost} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
