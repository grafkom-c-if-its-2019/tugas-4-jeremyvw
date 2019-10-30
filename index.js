(function(global) {

  var points=[];
  var canvas, canvas2, gl, gl2, program2;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    // Register Callbacks
    window.addEventListener('resize', resizer);

    // Get canvas element and check if WebGL enabled
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);

    // Initialize the shaders and program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var vertexShader3 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);
    var program3 = glUtils.createProgram(gl, vertexShader3, fragmentShader);

    resizer();

    // Draw 
    var cube= ([
        //BAWAH
        -0.3,  -0.8,  0.7,      31, 63, 95,          
        0.4,  -0.8,  0.7,       95, 127, 159,          
        0.4,  -0.8,  0.7,       123, 142, 90,          
        0.4,  -0.8,  -0.6,      214, 146, 176,          
        0.4,  -0.8,  -0.6,      112, 95, 55,          
        -0.3,  -0.8,  -0.6,     31, 44, 122,          
        -0.3,  -0.8,  -0.6,     155, 122, 118,          
        -0.3,  -0.8,  0.7,      123, 123, 123,          
        //ATAS
        -0.3,  0.6,  0.7,       1,124, 121,          
        0.4,  0.6,  0.7,        255,255, 255,       
        0.4,  0.6,  0.7,        255,255, 255,         
        0.4,  0.6,  -0.6,      255,255, 255,          
        0.4,  0.6,  -0.6,       255,255, 255,          
        -0.3,  0.6,  -0.6,      255,255, 255,          
        -0.3,  0.6,  -0.6,      255,255, 255,          
        -0.3,  0.6,  0.7,       255,255, 255,          
        //BELAKANG
        -0.3,  -0.8,  0.7,      255,255, 255,            
        -0.3,  0.6,  0.7,       255,255, 255,           
        0.4,  -0.8,  0.7,      255,255, 255,            
        0.4,  0.6,  0.7,        255,255, 255,            
        //DEPAN
        0.4,  -0.8,  -0.6,      255,255, 255,            
        0.4,  0.6,  -0.6,       255,255, 255,           
        -0.3,  -0.8,  -0.6,     255,255, 255,            
        -0.3,  0.6,  -0.6,      255,255, 255
    ]);


    var linesVertices1 = new Float32Array([
      -0.4, 0.5,     1.0, 1.0, 0.0,
      -0.3, 0.5,     0.7, 0.0, 1.0        
    ]);

    var linesVertices2 = new Float32Array([
      -0.3, 0.5,     1.0, 1.0, 0.0,
      -0.3, -0.1,    0.7, 0.0, 1.0         
    ]);

    var circleVertices = [];
    var circleVertices1 = [];

    for (var x=90.0; x<=270; x+=1) {
      // degrees to radians
      var z = x * Math.PI / 180;
      // var z = x * Math.PI / 180;
      // X Y Z
      var vert1 = [
        -0.45 + Math.sin(z)*0.05,    
        -0.1 + Math.cos(z)*0.1,     0.7, 0.0, 1.0  
      ];
      // vertices = vertices.concat(line01);
      circleVertices = circleVertices.concat(vert1);
    }

    for (var y=90.0; y<=270; y+=1) {
      // degrees to radians
      var zz = y * Math.PI / 180;
      // var z = x * Math.PI / 180;
      // X Y Z
      var vert2 = [
        -0.45 + Math.sin(zz)*0.15,  
        -0.1 + Math.cos(zz)*0.3,    1.0, 1.0, 0.0
      ];
      // vertices = vertices.concat(line01);
      circleVertices1 = circleVertices1.concat(vert2);
    }

    var linesVertices5 = new Float32Array([
      -0.6, -0.1,     1.0, 1.0, 0.0,
      -0.5, -0.1,     0.7, 0.0, 1.0     
    ]);

    var linesVertices7 = new Float32Array([
      -0.5, -0.3,      0.0, 0.0, 0.9, 
      -0.4, -0.3,      0.4, 0.4, 0.6    
   ]);
   var linesVertices8 = new Float32Array([
      -0.4, -0.1,      1.0, 1.0, 0.0,
      -0.4, +0.5,      0.7, 0.0, 1.0    
   ]);

   var circleVertices2 = [];
   
   var line1 = new Float32Array([
    0.25, -0.1,     0.7, 0.8, 0.3,
    0.25, +0.6,     0.0, 0.0, 0.9,
    0.35, -0.1,     0.2, 0.0, 0.9
  ]);
  var line2 = new Float32Array([
    0.35, -0.1,     0.0, 0.0, 0.9,
    0.35, +0.6,     0.7, 0.8, 0.3,
    0.25, +0.6,     0.0, 0.0, 0.9
  ]);

  var circleVertices2 = [];

  for (var w=90.0; w<=270; w+=1) {
    // degrees to radians
    var zzz = w * Math.PI / 180;
    // var z = x * Math.PI / 180;
    // X Y Z
    var vert3 = [
      0.2 + Math.sin(zzz)*0.05,
      -0.1 + Math.cos(zzz)*0.15,  0.7, 0.8, 0.3
    ];
    var vert4 = [
      0.2 + Math.sin(zzz)*0.15,
      -0.1 + Math.cos(zzz)*0.3,   0.1, 0.0, 0.9
    ];
    
    // vertices = vertices.concat(line01);
    circleVertices2 = circleVertices2.concat(vert3);
    circleVertices2 = circleVertices2.concat(vert4);
  }

   
    function drawShapes(type,vertices,n){
      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  
      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
    
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        2,          // jumlah elemen per atribut
        gl.FLOAT,   // tipe data atribut
        gl.FALSE, 
        5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(
        vColor,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
      );
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);
  
      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.drawArrays(type, 0, n);
    }  

    function drawShapes2(type,vertices,n){
      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  
      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');
    
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        2,          // jumlah elemen per atribut
        gl.FLOAT,   // tipe data atribut
        gl.FALSE, 
        5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(
        vColor,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
      );
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);
  
      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      gl.drawArrays(type, 0, n);
    }  

    var translation = gl.getUniformLocation(program, 'translation');
    var translationVector = [0.0, -0.5, 0.0];
    gl.uniform3fv(translation, translationVector);
  
    var thetaLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0.0; 

  function render(){
      // Bersihkan layar jadi hitam
      gl.useProgram(program);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      
      theta += 0.0062;
      gl.uniform1f(thetaLocation, theta);
  
      drawShapes(gl.LINES, linesVertices1, 2);
      drawShapes(gl.LINES, linesVertices2, 2);
      drawShapes(gl.LINES, linesVertices5, 2);
      drawShapes(gl.LINES, circleVertices, 180);
      drawShapes(gl.LINES, circleVertices1, 180);
      drawShapes(gl.LINES, linesVertices8, 2);    
      requestAnimationFrame(render);

  }
  render();

    var melebar = 1;
    var scaleXLocation = gl.getUniformLocation(program2, 'scaleX');
    // var scaleYLocation = gl.getUniformLocation(program2, 'scaleY');
    var scaleX = 1.0;
    // var scaleY = 1.0;
      

  function render2(){
    // Bersihkan layar jadi hitam
    gl.useProgram(program2);

    if (scaleX >= 1) melebar = -1;
    else if (scaleX <= -1) melebar = 1; 
    scaleX += 0.0062 * melebar;
    gl.uniform1f(scaleXLocation, scaleX);
    // gl.uniform1f(scaleYLocation, scaleY);

    drawShapes(gl.TRIANGLE_STRIP, line1, 3);
    drawShapes(gl.TRIANGLE_STRIP, line2, 3);
    drawShapes(gl.TRIANGLE_STRIP, circleVertices2, 360);

    requestAnimationFrame(render2);

}
  render2();
}
})(window || this);