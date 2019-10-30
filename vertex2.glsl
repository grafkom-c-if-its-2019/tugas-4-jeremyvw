precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float scaleX;
uniform float scaleY;

void main() {

    fColor = vColor;
  
  mat4 scale = mat4(
    scaleX, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0 , 1.0
  );
  gl_Position = (vec4(vPosition, 0.0, 1.0)-vec4(0.25, 0.0, 0.0, 0.0)) * scale+vec4(0.25, 0.0, 0.0, 0.0);
}
