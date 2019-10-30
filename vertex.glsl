precision mediump float;
attribute vec4 aPosition;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;

void main() {

    fColor = vColor;

  mat4 rotate = mat4(
    cos(theta), -sin(theta), 0.0, +0.5*cos(theta)-0.5,
    sin(theta), cos(theta), 0.0, +0.5*sin(theta),
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = vec4(vPosition, 0.0, 1.0) * rotate;
  }
