// void main() {
  
//   gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
// }

precision mediump float;

varying vec3 fColor;

void main() {
  gl_FragColor = vec4(fColor, 1.0);
}

