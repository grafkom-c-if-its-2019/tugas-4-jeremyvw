precision mediump float;

varying vec2 fTexCoord;
varying vec3 fColor;
varying vec3 fNormal;
varying vec3 fPosition;

uniform vec3 diffuseColor;
uniform vec3 diffusePosition;
uniform vec3 ambientColor;
uniform int fFlag;


void main() {
  gl_FragColor = vec4(fColor, 1.0);
}

