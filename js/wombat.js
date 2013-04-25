var canvas = document.getElementById('wombat'),
    ctx = canvas.getContext('2d');

var WOMBAT_LEFT_URL = "img/wombat_left.png",
    WOMBAT_RIGHT_URL = "img/wombat_right.png";

var wombatReady = false;
var wombatImage = new Image();
wombatImage.onload = function() {
  wombatReady = true;
};
wombatImage.src = WOMBAT_RIGHT_URL;

var wombat = {
  speed: 256,
  x: 0,
  y: 0
}

var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

var update = function(delta) {
  if(38 in keysDown) {  // Player holding up
    wombat.y -= wombat.speed * delta;
  }

  if(40 in keysDown) {  // Player holding down
    wombat.y += wombat.speed * delta;
  }

  if(37 in keysDown) {  // Player holding left
    wombat.x -= wombat.speed * delta;

    if(wombatImage.src != WOMBAT_LEFT_URL) {
      wombatImage.src = WOMBAT_LEFT_URL;
    }
  }

  if(39 in keysDown) {  // Player holding right
    wombat.x += wombat.speed * delta;

    if(wombatImage.src != WOMBAT_RIGHT_URL) {
      wombatImage.src = WOMBAT_RIGHT_URL;
    }
  }
};

var render = function() {
  clear();

  if(wombatReady) {
    ctx.drawImage(wombatImage, wombat.x, wombat.y);
  }
};

function clear() {
  // Store the current transformation matrix
  ctx.save();

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  ctx.restore();
}

// main wombat loop
var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;
};


// let's set off the little wombat on his/her perilous journey of
// self-discovery
var then = Date.now();
setInterval(main, 1);
