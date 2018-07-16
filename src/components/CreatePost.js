import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Note from "./Note.js";

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      synthType: "synth",
      notes: [],
      title: ""
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    console.log(this.state);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onClick(e) {
    if(this.state.notes.length < 8) {
      let newArr = this.state.notes;
      newArr.push(e.target.id);
      this.setState({notes: newArr});
      console.log(this.state.notes);
    }
  }

  handleSubmit() {
    let post = {
      title: this.state.title,
      notes: this.state.notes,
      synth: this.state.synthType
    }

    // POST TO DATABASE LOGIC GOES HERE
    console.log(`TITLE: ${post.title}
      \nSYNTHTYPE: ${post.synth}
      \nNOTES: ${post.notes}`);
  }

  removeNote() {
    let newArr = this.state.notes;
    newArr.pop();
    this.setState({notes: newArr});
  }

  render() {
    const arr = this.state.notes;
    return (
      <div className="createPost">
        <h1>Create Post</h1>
        <div className="container">
          <h2 className="selectionLabel">Sound Type:</h2>
          <select className="dropdown" name="synthType" onChange={this.onChange}>
            <option value="synth">Synth</option>
            <option value="mono">MonoSynth</option>
            <option value="poly">PolySynth</option>
          </select>
        </div>
        <div className="noteSelector">
          <h2 className="selectionLabel">Select Notes:</h2>
          <div className="noteButtons">
            <div className="noteIcon" id="A" onClick={this.onClick}>A</div>
            <div className="noteIcon" id="A#" onClick={this.onClick}>A#</div>
            <div className="noteIcon" id="B" onClick={this.onClick}>B</div>
            <div className="noteIcon" id="C" onClick={this.onClick}>C</div>
            <div className="noteIcon" id="C" onClick={this.onClick}>C#</div>
            <div className="noteIcon" id="D" onClick={this.onClick}>D</div>
            <div className="noteIcon" id="D#" onClick={this.onClick}>D#</div>
            <div className="noteIcon" id="E" onClick={this.onClick}>E</div>
            <div className="noteIcon" id="F" onClick={this.onClick}>F</div>
            <div className="noteIcon" id="F#" onClick={this.onClick}>F#</div>
            <div className="noteIcon" id="G" onClick={this.onClick}>G</div>
            <div className="noteIcon" id="G#" onClick={this.onClick}>G#</div>
          </div>
          <div className="removeNote" onClick={this.removeNote}>
            <i className="fas fa-arrow-left fa-2x"></i>
          </div>
        </div>
        <div className="notesContainer">
          {arr.map(item => <Note note={item} />)}
        </div>
        <div className="container title">
          <h2 className="selectionLabel">Title:</h2>
          <input className="dropdown" type="text" name="title" onChange={this.onChange}></input>
        </div>
        <div className="container">
          <div className="submit" onClick={this.handleSubmit}>SUBMIT</div>
        </div>
      </div>
    );
  }
}

export default CreatePost;