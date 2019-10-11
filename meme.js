// Function that adds text to a picture
function textChangeListener (e) {
      var id = e.target.id;
      var text = e.target.value;
      if (id == "topLineText") {
        window.topLineText = text;
      } else {
        window.bottomLineText = text;
      }
      // Draws out a templet of the meme 
      redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
    }
    function redrawMeme(image, topLine, bottomLine) {
      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext("2d");
      if (image != null)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
       // Clears previous meme
      ctx.clearRect (0, 0,  canvas.width, canvas.height);

      if (image != null)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      // Adds attributes to text
      ctx.font = '30pt Impact';
      ctx.textAlign = 'center';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.fillStyle = 'white';
      // Positions text for the top of the meme
      if (topLine != null) {
        ctx.fillText(topLine, canvas.width / 2, 40);
        ctx.strokeText(topLine, canvas.width / 2, 40);
      }
      // Positions text for the bottom of the meme
      if (bottomLine != null) {
        ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
      }
    }
    // 
    function saveFile() {
      window.open(document.querySelector('canvas').toDataURL());
    }
    //--------

    function handleFileSelect(e) {
      //Makes the canvas for the meme
      var canvasWidth = 500;
      var canvasHeight = 500;
      var file = e.target.files[0];
      
      //image upload
      var reader = new FileReader();
      reader.onload = function(fileObject) {
        var data = fileObject.target.result;
        
        // Create an image object
        var image = new Image();
        image.onload = function() {
          
          window.imageSrc = this;
          redrawMeme(window.imageSrc, null, null);
        }
        // Set image data to background image.
        image.src = data;
        console.log(fileObject.target.result);
      };
      reader.readAsDataURL(file)
    }
    // Intialises the attributes of the meme
    window.imageSRC = null;
    window.topLineText = "";
    window.bottomLineText = "";
    window.imageSRC = null;
    window.topLineText = null;
    window.bottomLineText = null;

    var file = document.querySelector("#file");
    file.onchange = handleFileSelect;
    // Adds text to the meme
    var input1 = document.getElementById('topLineText');
    var input2 = document.getElementById('bottomLineText');
    input1.oninput = textChangeListener;
    input2.oninput = textChangeListener;
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.querySelector('button').addEventListener('click', saveFile, false);