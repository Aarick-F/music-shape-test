import React, { Component } from "react";

let circles = [];

class Circle {
  constructor(coords, radius, dx, dy) {
    this.x = coords.x;
    this.y = coords.y;
    this.radius = radius;
    this.dx = this.getVelocity();
    this.dy = this.getVelocity();;
    this.color = this.getColor();
    this.shadow = this.getGlow(this.color);
  }

  draw(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y - 80, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.shadowColor = "rgba(255,255,255,1)";
    ctx.shadowBlur = 15;
    ctx.stroke();
  }

  update(canvas) {
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      // LOGIC TO PLAY SOUND GOES HERE
    }
    this.x += this.dx;
    if(this.y - this.radius > canvas.height || this.y - (this.radius + (this.radius * 1.75)) < 0) {
      this.dy = -this.dy;
      // LOGIC TO PLAY SOUND GOES HERE
    }
    this.y += this.dy;
  }

  getVelocity() {
    let velocity = ((Math.random() * 0.5) * 2) + 1;
    let coinflip = Math.floor(Math.random() * 2);
    return coinflip === 0 ? velocity : -velocity;
  }

  getColor() {
    let colors = [];
    for(let i = 0; i < 3; i++) {
      let rand = Math.floor(Math.random() * 256);
      colors.push(rand);
    }
    return `rgb(${colors[0]},${colors[1]},${colors[2]})`;
  }

  getGlow(color) {
    let glow = color.split("");
    glow.splice(3, 0, "a");
    glow.splice(15, 0, ",0.9");
    return glow.join("");
  }
}

class Canvas extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.myCanvas.height = this.boxSize.clientHeight;
    this.myCanvas.width = this.boxSize.clientWidth;
    this.animate();
  }

  handleClick(e) {
    let location = {
      x: e.clientX,
      y: e.clientY
    }
    let newCircle = new Circle(location, 40);
    circles.push(newCircle);
  }

  animate() {
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
      <div className="canvasWrapper" ref={boxSize => this.boxSize = boxSize}>
        <canvas ref={myCanvas => this.myCanvas = myCanvas} onClick={this.handleClick}></canvas>
      </div>
    );
  }
}

export default Canvas;