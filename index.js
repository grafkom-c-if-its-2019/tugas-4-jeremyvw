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
    
    scaleM += 0.0062 * melebar;
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

  function drawCube(type,vertices,n) {
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    vPosition = gl.getAttribLocation(program, 'vPosition');
    vNormal = gl.getAttribLocation(program, 'vNormal');
    vTexCoord = gl.getAttribLocation(program, 'vTexCoord');

    gl.vertexAttribPointer(
      vPosition,   //variable yang memegang posisis attribute di shader
      3,          // jumlah elemen per atribut vPosition
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex (overall)
      0                                    // offset dari posisi elemen di array
    );

    gl.vertexAttribPointer(
      vNormal,
      3,
      gl.FLOAT,
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT,
      6 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.vertexAttribPointer(
      vTexCoord,
      2,
      gl.FLOAT,
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT,
      9 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vNormal);
    gl.enableVertexAttribArray(vTexCoord);
    gl.drawArrays(type, 0, n);
  }

//init tekstur
      // Uniform untuk tekstur
      var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
      gl.uniform1i(sampler0Loc, 0);
  
      // Create a texture.
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
  
      // Fill the texture with a 1x1 blue pixel.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                    new Uint8Array([0, 0, 255, 255]));
  
      // Asynchronously load an image
      var image = new Image();
      image.src = "images/faces.jpg";
      image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
      });
  
      theta = 0;
      thetaSpeed = 0.0;
  
      // Definisi untuk matriks model
      mmLoc = gl.getUniformLocation(program, 'modelMatrix');
      mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
  
      // Definisi untuk matrix view dan projection
      vmLoc = gl.getUniformLocation(program, 'viewMatrix');
      vm = glMatrix.mat4.create();
      pmLoc = gl.getUniformLocation(program, 'projectionMatrix');
      pm = glMatrix.mat4.create();
  
      camera = {x: 0.0, y: 0.0, z:0.0};
      glMatrix.mat4.perspective(pm,
        glMatrix.glMatrix.toRadian(90), // fovy dalam radian
        canvas.width/canvas.height,     // aspect ratio
        0.5,  // near
        10.0, // far  
      );
      gl.uniformMatrix4fv(pmLoc, false, pm);
      
      scaleMLoc = gl.getUniformLocation(program, 'scaleM');
      scaleM = 1.0;
      gl.uniform1f(scaleMLoc, scaleM);
  
      flagUniformLocation = gl.getUniformLocation(program, 'flag');
      flag = 0;
      gl.uniform1i(flagUniformLocation, flag);
  
      fFlagUniformLocation = gl.getUniformLocation(program, 'fFlag');
      gl.uniform1i(fFlagUniformLocation, flag);
  
      // Uniform untuk pencahayaan
      dcLoc = gl.getUniformLocation(program, 'diffuseColor');
      dc = glMatrix.vec3.fromValues(1.0, 1.0, 1.0);  // rgb
      gl.uniform3fv(dcLoc, dc);
      
      ddLoc = gl.getUniformLocation(program, 'diffusePosition');
  
      acLoc = gl.getUniformLocation(program, 'ambientColor');
      ac = glMatrix.vec3.fromValues(0.17, 0.40, 0.062);
      gl.uniform3fv(acLoc, ac);
  
      // Uniform untuk modelMatrix vektor normal
      nmLoc = gl.getUniformLocation(program, 'normalMatrix');
  
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
  
      render();
    }

})(window || this);