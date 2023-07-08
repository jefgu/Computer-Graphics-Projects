class Pelvis {
  constructor() {
    this.type='sphere';
    //this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    //this.size = 5.0;
    this.segments = 6
    this.matrix = new Matrix4();

    this.vertices = [];
  }

  render() {
    //var xy   = this.position;
    var rgba = this.color;
    //var size = this.size;

    // Pass the position of a point to a_Position variable
    //gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // Pass the Matrix to u_ModelMatrix attribute
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    if (this.vertices.length > 0) {
      for (var i = 0; i < this.vertices.length; i++) {
        drawTriangle3D(this.vertices[i]);
      }
      return
    }

    let angleStep = 360/this.segments;
    for (var angle = 0; angle < 360; angle = angle+angleStep) {
      let angle1 = angle;
      let angle2 = angle+angleStep;
      for (var phi = 0; phi < 180; phi = phi+angleStep) {
          let phi1 = phi;
          let phi2 = phi+angleStep;

          let x1 = 1 * Math.sin(angle1*Math.PI/180) * Math.cos(phi1*Math.PI/180);
          let y1 = 1 * Math.sin(angle1*Math.PI/180) * Math.sin(phi1*Math.PI/180);
          let z1 = 1 * Math.cos(angle1*Math.PI/180)

          let x2 = 1 * Math.sin(angle2*Math.PI/180) * Math.cos(phi1*Math.PI/180);
          let y2 = 1 * Math.sin(angle2*Math.PI/180) * Math.sin(phi1*Math.PI/180);
          let z2 = 1 * Math.cos(angle2*Math.PI/180)

          let x3 = 1 * Math.sin(angle1*Math.PI/180) * Math.cos(phi2*Math.PI/180);
          let y3 = 1 * Math.sin(angle1*Math.PI/180) * Math.sin(phi2*Math.PI/180);
          let z3 = 1 * Math.cos(angle1*Math.PI/180)

          let x4 = 1 * Math.sin(angle2*Math.PI/180) * Math.cos(phi2*Math.PI/180);
          let y4 = 1 * Math.sin(angle2*Math.PI/180) * Math.sin(phi2*Math.PI/180);
          let z4 = 1 * Math.cos(angle2*Math.PI/180)
          drawTriangle3D([x1,y1,z1, x2,y2,z2, x3,y3,z3]);
          drawTriangle3D([x4,y4,z4, x2,y2,z2, x3,y3,z3]);
          this.vertices.push([x1,y1,z1, x2,y2,z2, x3,y3,z3]);
          this.vertices.push([x4,y4,z4, x2,y2,z2, x3,y3,z3]);
      }
    }
  }
}