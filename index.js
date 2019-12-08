(function(global) {

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    var thetaSpeed, mmLoc, mm, vmLoc, vm, pmLoc, pm, camera;
      var dcLoc, dc, ddLoc, dd, acLoc, ac, nmLoc;
      var vPosition, vColor, vNormal, vTexCoord;
      var flag, flagUniformLocation, fFlagUniformLocation;
  
      var canvas = document.getElementById("glcanvas");
      var gl = glUtils.checkWebGL(canvas);
  
      var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
      var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
      gl.useProgram(program);
      
      var transLoc = gl.getUniformLocation(program, 'trans');
      var trans = [0, 0, 0]; 
      var X = 1.0;
      var Y = 1.0;
      var Z = 1.0;
      var melebar = 1.0

      var Kubus = [];
      var cubePoints = [
        [ -0.8, -0.8,  0.8 ],
        [ -0.8,  0.8,  0.8 ],
        [  0.8,  0.8,  0.8 ],
        [  0.8, -0.8,  0.8 ],
        [ -0.8, -0.8, -0.8 ],
        [ -0.8,  0.8, -0.8 ],
        [  0.8,  0.8, -0.8 ],
        [  0.8, -0.8, -0.8 ]
      ];
      var cubeColors = [
        [],
        [1.0, 0.0, 0.0], // merah
        [0.0, 1.0, 0.0], // hijau
        [0.0, 0.0, 1.0], // biru
        [1.0, 1.0, 1.0], // putih
        [1.0, 0.5, 0.0], // oranye
        [1.0, 1.0, 0.0], // kuning
        []
      ];
      var cubeNormals = [
        [],
        [  0.0,  0.0,  1.0 ], // depan
        [  1.0,  0.0,  0.0 ], // kanan
        [  0.0, -1.0,  0.0 ], // bawah
        [  0.0,  0.0, -1.0 ], // belakang
        [ -1.0,  0.0,  0.0 ], // kiri
        [  0.0,  1.0,  0.0 ], // atas
        []
      ];

      function quad(a, b, c, d) {
        var indices = [a, b, c, a, c, d];
        for (var i=0; i < indices.length; i++) {
          for (var j=0; j < 3; j++) {
            Kubus.push(cubePoints[indices[i]][j]);
          }
          for (var j=0; j < 3; j++) {
            Kubus.push(cubeColors[a][j]);
          }
          for (var j=0; j < 3; j++) {
            Kubus.push(-1*cubeNormals[a][j]);
          }
          switch (indices[i]) {
            case a:
              Kubus.push((a-2)*0.125);
              Kubus.push(0.0);
              break;
            case b:
              Kubus.push((a-2)*0.125);
              Kubus.push(1.0);
              break;
            case c:
              Kubus.push((a-1)*0.125);
              Kubus.push(1.0);
              break;
            case d:
              Kubus.push((a-1)*0.125);
              Kubus.push(0.0);
              break;
          
            default:
              break;
          }
        }
      }
  
      // quad(1, 0, 3, 2);
      quad(2, 3, 7, 6);
      quad(3, 0, 4, 7);
      quad(4, 5, 6, 7);
      quad(5, 4, 0, 1);
      quad(6, 5, 1, 2);
  
      //Mouse Control
      var dragging, lastx, lasty;
      function onMouseDown(event) {
        var x = event.clientX;
        var y = event.clientY;
        var rect = event.target.getBoundingClientRect();
        // Saat mouse diklik di area aktif browser,
        //  maka flag dragging akan diaktifkan
        if (
          rect.left <= x &&
          rect.right > x &&
          rect.top <= y &&
          rect.bottom > y
        ) {
          dragging = true;
          lastx = x;
          lasty = y;
        }
      }
      function onMouseUp(event) {
        // Ketika klik kiri mouse dilepas
        dragging = false;
      }
      function onMouseMove(event) {
        var x = event.clientX;
        var y = event.clientY;
        if (dragging) {
          factor = 10 / canvas.height;
          var dx = factor * (x - lastx);
          var dy = factor * (y - lasty);
          // Menggunakan dx dan dy untuk memutar kubus
          glMatrix.mat4.rotateY(mm, mm, dx);
          glMatrix.mat4.rotateX(mm, mm, dy);
        }
        lastx = x;
        lasty = y;
      }
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);


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

  function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Perhitungan modelMatrix untuk vektor normal
    var nm = glMatrix.mat3.create();
    glMatrix.mat3.normalFromMat4(nm, mm);
    gl.uniformMatrix3fv(nmLoc, false, nm);

    glMatrix.mat4.lookAt(vm,
      [camera.x, camera.y, camera.z], // di mana posisi kamera (posisi)
      [0.0, 0.0, -2.0], // ke mana kamera menghadap (vektor)
      [0.0, 1.0, 0.0]  // ke mana arah atas kamera (vektor)
    );
    gl.uniformMatrix4fv(vmLoc, false, vm);

        
    gl.uniformMatrix4fv(mmLoc, false, mm);

    if (trans[0] >= (0.7 - Math.abs(0.2 * 0.7 * scaleM))) X = -1.0;
    else if (trans[0] <= (-0.7 + Math.abs(0.2 * 0.7 * scaleM))) X = 1.0;
    trans[0] += 0.009 * X;

    if (trans[1] >= (0.5 - (0.3 * 0.7))) Y = -1.0;
    else if (trans[1] <= (-0.7 + (0.3 * 0.7))) Y = 1.0;
    trans[1] += 0.010 * Y;

    if (trans[2] >= (0.7 - Math.abs(0.2 * 0.7 * scaleM))) Z = -1.0;
    else if (trans[2] <= (-0.7 + Math.abs(0.2 * 0.7 * scaleM))) Z = 1.0;
    trans[2] += 0.011 * Z;

    flag = 0;
    gl.uniform1i(flagUniformLocation, flag);
    gl.uniform1i(fFlagUniformLocation, flag);
    drawCube(gl.TRIANGLES, Kubus, 30)

    gl.disableVertexAttribArray(vNormal);
    gl.disableVertexAttribArray(vTexCoord);

    //animasi refleksi
    if (scaleM >= 1.0) melebar = -1.0;
    else if (scaleM <= -1.0) melebar = 1.0;
    
    scaleM += 0.0186 * melebar;
    gl.uniform1f(scaleMLoc, scaleM);

    // arah cahaya berdasarkan koordinat huruf
    dd = glMatrix.vec3.fromValues(trans[0], trans[1], trans[2]);  // xyz
    gl.uniform3fv(ddLoc, dd);

    flag = 1;
    gl.uniform1i(flagUniformLocation, flag);
    gl.uniform1i(fFlagUniformLocation, flag);
    // drawShapes(gl.TRIANGLE_STRIP, verticesBatang,6);
    // drawShapes(gl.TRIANGLE_STRIP, verticesR,362);
    // drawShapes(gl.TRIANGLE_STRIP, verticesMiring,4);

    drawShapes(gl.TRIANGLE_STRIP, line1, 3);
    drawShapes(gl.TRIANGLE_STRIP, line2, 3);
    // drawShapes(gl.TRIANGLE_STRIP, circleVertices, 360);
    drawShapes(gl.TRIANGLE_STRIP, circleVertices2, 360);

    gl.disableVertexAttribArray(vColor);
    gl.enable(gl.DEPTH_TEST);
    requestAnimationFrame(render);
  }
   
  function drawShapes(type, vertices, n) {
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition, //variabel pemegang posisi atribut di shader
      3,          // jumlah elemen per atribut
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
      0
    );
    gl.vertexAttribPointer(
      vColor,
      3,
      gl.FLOAT,
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT,
      3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.uniform3fv(transLoc, trans);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
    gl.drawArrays(type, 0, n);
  }  

    
    var thetaLoc1 = gl.getUniformLocation(program2, 'theta1'); 
    var transLoc1 = gl.getUniformLocation(program2, 'trans1');
    var thetaA1 = [10, 20, 0];
    var trans1 = [0, 0, 0]; 
    var X1 = 0.0080;
    var Y1 = 0.0090;
    var Z1 = 0.0130;
      

  function render2(){
    gl.useProgram(program2);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    if(trans1[0] >= 0.4*0.8 || trans1[0] <= -0.3*0.8 ){
      X1 *= -1;
    }
    trans1[0] += X1;

    if(trans1[1] >= 0.6*0.8 || trans1[1] <= -0.8*0.8 ){
      Y1 *= -1;
    }
    trans1[1] += Y1;

    if(trans1[2] >= 0.7*0.8 || trans1[2] <= -0.6*0.8){
      Z1 *= -1;
    }
    trans1[2] += Z1;

    gl.uniform3fv(transLoc1, trans1);
    thetaA1[1] += 0.062;
    gl.uniform3fv(thetaLoc1, thetaA1);  
  // gl.uniform1f(scaleYLocation, scaleY);

    //huruf b dengan isian
    drawShapes(gl.TRIANGLE_STRIP, line1, 3);
    drawShapes(gl.TRIANGLE_STRIP, line2, 3);
    drawShapes(gl.TRIANGLE_STRIP, circleVertices2, 360);

    requestAnimationFrame(render2);
  } 
  render2();

function drawShapes3(type,vertices,n) {
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);

    var vPosition = gl.getAttribLocation(program3, 'vPosition');
    var vColor = gl.getAttribLocation(program3, 'vColor');

    gl.vertexAttribPointer(
      vPosition, //variabel pemegang posisi atribut di shader
      3,          // jumlah elemen per atribut
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,   
      6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
      0
    );

    gl.vertexAttribPointer(
      vColor, 
      3, 
      gl.FLOAT, 
      gl.FALSE, 
      6 * Float32Array.BYTES_PER_ELEMENT, 
      3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    var vPosition = gl.getAttribLocation(program3, 'vPosition');
    var vColor = gl.getAttribLocation(program3, 'vColor');
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(type, 0, n);
  }
  
  var thetaLocCube = gl.getUniformLocation(program3, 'theta');
  
  function render3()
  {
    gl.useProgram(program3);
    var thetaCube = [10, 10, 0];
    gl.uniform3fv(thetaLocCube, thetaCube);
    drawShapes3(gl.LINES, cube , 24);

    requestAnimationFrame(render3);
  }
  // render();
  render2();
  render3();

}
function resizer() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}


})(window || this);