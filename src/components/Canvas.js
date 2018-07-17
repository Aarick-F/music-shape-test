import React, { Component } from "react";
import Tone from "tone";


const synth = new Tone.Synth();
synth.toMaster();

const notes = [
  "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"
];

let circles = [];
const colors = [
  "#3B9994", "#8BCCC9", "#C8FFDD",
  "#FF88AE", "#CC6CBB", "#F20574",
  "#2A1673", "#81006E", "#F2F0C9",
  "#F25C5C"
];

let step = 0;
const getNote = () => {
  let note = notes[step];
  step++;
  if(step >= notes.length) {
    step = 0;
  }
  return note;
}

class Circle {
  constructor(coords, radius, dx, dy) {
    this.x = coords.x;
    this.y = coords.y;
    this.radius = radius;
    this.dx = this.getVelocity();
    this.dy = this.getVelocity();;
    this.color = this.getColor();
  }

  draw(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update(canvas) {
    // console.log(this.y);
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      // LOGIC TO PLAY SOUND GOES HERE
      synth.triggerAttackRelease(getNote(), "32n");
    }
    this.x += this.dx;
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
      // LOGIC TO PLAY SOUND GOES HERE
      synth.triggerAttackRelease(getNote(), "32n");
    }
    this.y += this.dy;
  }

  getVelocity() {
    let velocity = ((Math.random() * 0.5) * 2) + 1;
    let coinflip = Math.floor(Math.random() * 2);
    return coinflip === 0 ? velocity : -velocity;
  }

  getColor() {
    let picker = Math.floor(Math.random() * colors.length);
    return colors[picker];
  }
}

class Canvas extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.animate = this.animate.bind(this);
    this.runCanvas = true;
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      circles = [];
      this.myCanvas.height = this.boxSize.clientHeight;
      this.myCanvas.width = this.boxSize.clientWidth;
    });
    this.myCanvas.height = this.boxSize.clientHeight;
    this.myCanvas.width = this.boxSize.clientWidth;
    this.animate();
  }

  componentWillUnmount() {
    console.log("Unmounting!");
    this.runCanvas = false;
    circles = [];
  }

  handleClick(e) {
    e.preventDefault();
    let location = {
      x: this.myCanvas.width / 2,
      y: window.innerHeight - this.myCanvas.height
    }
    let newCircle = new Circle(location, this.getRadius());
    circles.push(newCircle);
  }

  getRadius() {
    return Math.floor(Math.random() * 30) + 10;
  }

  animate() {
    if(!this.runCanvas) {
      return;
    }
    requestAnimationFrame(this.animate);
    let c = this.myCanvas.getContext("2d");
    c.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    circles.forEach(circle => {
      circle.draw(this.myCanvas);
      circle.update(this.myCanvas);
    });
  }

  render() {
    return (
      <div className="postWrapper">
        <div className="post">
          <div className="cycle">
            <i className="fas fa-arrow-left fa-2x"></i>
          </div>
          <div className="postInfo">
            <h1>TestUser - "C Major Scale"</h1>
          </div>
          <div className="cycle">
            <i className="fas fa-arrow-right fa-2x"></i>
          </div>
        </div>
        <div className="canvasWrapper" ref={boxSize => this.boxSize = boxSize}>
          <canvas ref={myCanvas => this.myCanvas = myCanvas} onClick={this.handleClick}></canvas>
        </div>
      </div>
    );
  }
}

export default Canvas;