import React, { Component } from 'react';

// Custom CSS
import './App.css';

// Component Import
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Canvas from "./components/Canvas";

class App extends Component {
  render() {
    return (
      <div className="main">
        <Header />
        <Canvas />
        <Footer />
      </div>
    );
  }
}

export default App;
