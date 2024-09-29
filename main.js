(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 800,  // Set a fixed width for portrait orientation
    height = 278, // Set a fixed height for portrait orientation
    player = {
        x: 20,
        y: 70,
        width: 25,
        height: 25,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        color: '#252525'
    },
    lastCheckpoint = {x:20,y:70};
    keys = [],
    player.keys = 0;
    friction = 0.8,
    gravity = 0.3,  // Increased gravity
    boxes = [],
    isFace = true;
    isCheck = false;
    player.isPushRight = false;
    player.isPushLeft = false;
var fadeOpacity = 0;  // Opacity value for fade effect
var isFading = false; // Flag to indicate fading status
var fadingOut = false; // Direction of fade (out or in)
var backgroundBImage = new Image();
backgroundBImage.src = 'black.jpg';
var background1Image = new Image();
background1Image.src = 'background1.jpg';
var background2Image = new Image();
background2Image.src = 'background2.jpg';
var background3Image = new Image();
background3Image.src = 'background3.jpg';
var background4Image = new Image();
background4Image.src = 'background4.jpg';
var background5Image = new Image();
background5Image.src = 'background5.jpg';
var background6Image = new Image();
background6Image.src = 'background6.jpg';
var background7Image = new Image();
background7Image.src = 'background7.jpg';
var background8Image = new Image();
background8Image.src = 'background8.jpg';
var background9Image = new Image();
background9Image.src = 'background9.jpg';
var background10Image = new Image();
background10Image.src = 'background10.jpg';
var background11Image = new Image();
background11Image.src = 'background11.jpg';
var background12Image = new Image();
background12Image.src = 'background12.jpg';
var background13Image = new Image();
background13Image.src = 'background13.jpg';
var background14Image = new Image();
background14Image.src = 'background14.jpg';
var background15Image = new Image();
background15Image.src = 'background15.jpg';
var background16Image = new Image();
background16Image.src = 'background16.jpg';
var background17Image = new Image();
background17Image.src = 'background17.jpg';
var background18Image = new Image();
background18Image.src = 'background18.jpg';
var background19Image = new Image();
background19Image.src = 'background19.jpg';
var background20Image = new Image();
background20Image.src = 'background20.jpg';
var background21Image = new Image();
background21Image.src = 'background21.jpg';
var background22Image = new Image();
background22Image.src = 'background22.jpg';

var playerImage = new Image();
playerImage.src = 'player.png';

// Load last checkpoint from localStorage if available
if (localStorage.getItem("lastCheckpoint")) {
    lastCheckpoint = JSON.parse(localStorage.getItem("lastCheckpoint"));
    player.x = lastCheckpoint.x;
    player.y = lastCheckpoint.y;
}

// Populate boxes
// wall
boxes.push({ x: -400, y: -700, width: 400, height: 1000, color: 'black' });
boxes.push({ x: 35800, y: -700, width: 400, height: 1000, color: 'black', isFinish:true });
// ground
boxes.push({ x: 0, y: height - 155, width: 35800, height: 550, color: 'black' });

// platform 1
boxes.push({ x: -10, y: 80, width: 80, height: 50, color: 'black' });
boxes.push({ x: 140, y: 40, width: 80, height: 100, color: 'black' });
boxes.push({ x: 270, y: 0, width: 80, height: 180, color: 'black' });
boxes.push({ x: 450, y: -20, width: 130, height: 260, color: 'black' });
boxes.push({ x: 700, y: 20, width: 40, height: 180, color: 'black' });
boxes.push({ x: 800, y: 10, width: 40, height: 160, color: 'black' });
boxes.push({ x: 900, y: 20, width: 40, height: 140, color: 'black' });
boxes.push({ x: 1040, y: 30, width: 30, height: 130, color: 'black' });
boxes.push({ x: 1300, y: 90, width: 50, height: 40, color: 'black' });
boxes.push({ x: 1400, y: 40, width: 40, height: 10, color: 'black' });
boxes.push({ x: 1500, y: 20, width: 40, height: 10, color: 'black' });
boxes.push({ x: 1640, y: 20, width: 40, height: 10, color: 'black' });
// platform 2
boxes.push({ x: 3000, y: 70, width: 40, height: 60, color: 'black' });
boxes.push({ x: 3150, y: 70, width: 40, height: 60, color: 'black' });
boxes.push({ x: 3550, y: 70, width: 40, height: 10, color: 'black' });
boxes.push({ x: 3550, y: -20, width: 40, height: 10, color: 'skyblue' });
boxes.push({ x: 3650, y: 70, width: 40, height: 10, color: 'black' });
boxes.push({ x: 3750, y: 70, width: 40, height: 10, color: 'black' });
boxes.push({ x: 3850, y: 70, width: 40, height: 10, color: 'black' });
boxes.push({ x: 3950, y: 70, width: 40, height: 10, color: 'black' });
boxes.push({ x: 4050, y: 70, width: 40, height: 10, color: 'black' });
boxes.push({ x: 4150, y: 70, width: 40, height: 10, color: 'black' });
//platform 3
boxes.push({ x: 5600, y: 70, width: 40, height: 60, color: 'black' });
boxes.push({ x: 5640, y: 30, width: 300, height: 100, color: 'black' });
boxes.push({ x: 6040, y: 30, width: 20, height: 10, color: 'black' });
boxes.push({ x: 6120, y: 30, width: 20, height: 10, color: 'black' });
boxes.push({ x: 6260, y: 30, width: 300, height: 100, color: 'black' });
// platform 4
boxes.push({ x: 8100, y: 90, width: 20, height: 10, color: 'black' });
boxes.push({ x: 8200, y: 60, width: 20, height: 10, color: 'black' });
boxes.push({ x: 8100, y: 10, width: 20, height: 10, color: 'black' });
boxes.push({ x: 8400, y: 20, width: 20, height: 10, color: 'black' });
boxes.push({ x: 8600, y: 100, width: 20, height: 10, color: 'black' });
boxes.push({ x: 8700, y: 60, width: 20, height: 10, color: 'black' });
boxes.push({ x: 8900, y: 100, width: 20, height: 10, color: 'black' });
boxes.push({ x: 9000, y: 70, width: 20, height: 10, color: 'black' });
boxes.push({ x: 9100, y: 100, width: 20, height: 10, color: 'black' });
boxes.push({ x: 9200, y: 70, width: 20, height: 10, color: 'black' });
//platform 5
boxes.push({ x: 12060, y: 90, width: 30, height: 10, color: 'black' });
boxes.push({ x: 12170, y: 90, width: 30, height: 10, color: 'black' });
//platform 6
boxes.push({ x: 13270, y: 70, width: 1400, height: 10, color: 'black' });
boxes.push({ x: 13270, y: -130, width: 10, height: 170, color: 'black' });
boxes.push({ x: 13530, y: 30, width: 100, height: 10, color: 'black' });
boxes.push({ x: 13890, y: -130, width: 10, height: 170, color: 'black' });
boxes.push({ x: 13280, y: 0, width: 25, height: 10, color: 'black' });
boxes.push({ x: 13420, y: 0, width: 20, height: 10, color: 'black' });
boxes.push({ x: 13510, y: -50, width: 20, height: 10, color: 'black' });
boxes.push({ x: 13730, y: 0, width: 20, height: 10, color: 'black' });
boxes.push({ x: 13870, y: 0, width: 25, height: 10, color: 'black' });
boxes.push({ x: 14100, y: 20, width: 25, height: 10, color: 'black' });
boxes.push({ x: 14200, y: 20, width: 25, height: 10, color: 'black' });
boxes.push({ x: 14300, y: 20, width: 25, height: 10, color: 'black' });
boxes.push({ x: 14400, y: 20, width: 25, height: 10, color: 'black' });
//platform 7 traping
boxes.push({ x: 15900, y: 80, width: 30, height: 10, color: 'black', isTrap1:true});
boxes.push({ x: 16400, y: 60, width: 30, height: 10, color: 'black', isTrap2:true});
boxes.push({ x: 16700, y: 90, width: 30, height: 10, color: 'transparent', isGayab:true});
boxes.push({ x: 16800, y: 90, width: 30, height: 10, color: 'transparent', isGayab:true});
boxes.push({ x: 16900, y: 90, width: 30, height: 10, color: 'transparent', isGayab:true});
boxes.push({ x: 17000, y: 90, width: 30, height: 10, color: 'transparent', isGayab:true});
//platform 7 normal
boxes.push({ x: 17200, y: 100, width: 20, height: 30, color: 'black' });
boxes.push({ x: 17380, y: 100, width: 20, height: 30, color: 'black' });
//platform 8 normal
boxes.push({ x: 18300, y: 80, width: 30, height: 10, color: '#505050' });
boxes.push({ x: 18400, y: 60, width: 30, height: 10, color: 'black' });
boxes.push({ x: 18500, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 18600, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 18700, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 18800, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 18900, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19000, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19100, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19200, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19300, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19400, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19500, y: 40, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19600, y: 30, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19700, y: 30, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19800, y: 30, width: 30, height: 10, color: 'black' });
boxes.push({ x: 19900, y: 30, width: 30, height: 10, color: 'black' });
boxes.push({ x: 20000, y: 30, width: 30, height: 10, color: 'black' });
// platform 9 normal
boxes.push({ x: 21200, y: 43, width: 30, height: 80, color: '#0F0F0F' });

//trap platform
boxes.push({x: 3370, y: 80, width: 40, height: 60, color: 'black', open: true});
boxes.push({ x: 18100, y: 123, width: 140, height: 1, color: 'transparent', enemyRise:true});

// enemy
boxes.push({ x: 70, y: 120, width: 70, height: 8, color: 'red', isEnemy: true });
boxes.push({ x: 220, y: 120, width: 50, height: 8, color: 'red', isEnemy: true });
boxes.push({ x: 350, y: 120, width: 100, height: 8, color: 'red', isEnemy: true });
boxes.push({ x: 580, y: 120, width: 120, height: 8, color: 'red', isEnemy: true });
boxes.push({ x: 740, y: 120, width: 60, height: 8, color: 'red', isEnemy: true });
boxes.push({ x: 840, y: 120, width: 60, height: 8, color: 'red', isEnemy: true });
boxes.push({ x: 940, y: 120, width: 100, height: 8, color: 'red', isEnemy: true });
boxes.push({ x: 1450, y: 40, width: 400, height: 10, color: 'red', isEnemy: true });
//enemy 2
boxes.push({ x: 3040, y: 114, width: 110, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 3550, y: 114, width: 500, height: 10, color: 'red', isEnemy: true });
// enemy 3
boxes.push({ x: 5940, y: 98, width: 320, height: 30, color: 'red', isEnemy: true });
boxes.push({ x: 6600, y: 114, width: 40, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 6700, y: 114, width: 40, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 6800, y: 114, width: 40, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 6900, y: 114, width: 40, height: 10, color: 'red', isEnemy: true });
//enemy 4
boxes.push({ x: 8200, y: 114, width: 200, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 8500, y: 100, width: 20, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 8510, y: 30, width: 20, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 8630, y: 100, width: 20, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 8670, y: 70, width: 20, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 8730, y: 0, width: 60, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 8700, y: 114, width: 60, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 8820, y: 114, width: 400, height: 10, color: 'red', isEnemy: true });
//enemy 5
boxes.push({ x: 10900, y: 110, width: 20, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 11100, y: 110, width: 20, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 11300, y: 114, width: 30, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 11900, y: 114, width: 400, height: 10, color: 'red', isEnemy: true });
//enemy 6
boxes.push({ x: 14650, y: -130, width: 20, height: 200, color: 'red', isEnemy: true });
boxes.push({ x: 13280, y: 30, width: 200, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 13690, y: 30, width: 200, height: 10, color: 'red', isEnemy: true });
// enemy 7
boxes.push({ x: 15900, y: 114, width: 500, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 16450, y: -10, width: 10, height: 132, color: 'red', isEnemy: true });
boxes.push({ x: 16710, y: 114, width: 400, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 16445, y: -85, width: 20, height: 10, color: 'red', isEnemy: true });
boxes.push({ x: 17200, y: 40, width: 200, height: 10, color: 'red', isEnemy: true });
//enemy 8
boxes.push({ x: 18300, y: 114, width: 1800, height: 10, color: 'red', isEnemy: true, isRise:false, isAffected:true});

//2 password platform 
boxes.push({ x: 3190, y: 80, width: 10, height: 45, color: 'yellow', isCode1:true });
//3 password platform 
boxes.push({ x: 6040, y: -60, width: 20, height: 10, color: 'yellow', isCode2:true });
boxes.push({ x: 6120, y: -60, width: 20, height: 10, color: 'yellow', isCode3:true });
//4 password platform 
boxes.push({ x: 8100, y: -80, width: 20, height: 10, color: 'yellow', isCode4:true });
boxes.push({ x: 8400, y: -70, width: 20, height: 10, color: 'yellow', isCode5:true });
boxes.push({ x: 8700, y: 0, width: 20, height: 10, color: 'yellow', isCode6:true });
//6 password platform
boxes.push({ x: 13280, y: -60, width: 20, height: 10, color: 'yellow', isCode7:true });
boxes.push({ x: 13530, y: -70, width: 20, height: 10, color: 'yellow', isCode8:true });
boxes.push({ x: 13870, y: -60, width: 20, height: 10, color: 'yellow', isCode9:true });
// Door object with password
boxes.push({x: 4200, y: -125, width: 100, height: 250, color: 'black', isDoorOpen: true, password: '3042'
});
boxes.push({x: 7000, y: -125, width: 100, height: 250, color: 'black', isDoorOpen: true, password: '2954'
});
boxes.push({x: 9600, y: -125, width: 100, height: 250, color: 'black', isDoorOpen: true, password: '17235'
});
boxes.push({x: 14820, y: -125, width: 50, height: 250, color: 'black', isDoorOpen: true, password: 'Dr. ZEESHAN'
});

// checkpoints (added)
boxes.push({ x: 1070, y:123, width: 80, height: 1, color: 'green', isCheckpoint1: true, text:true});
boxes.push({ x: 2600, y:123, width: 80, height: 1, color: 'green', isCheckpoint2: true, text:true});
boxes.push({ x: 5200, y:123, width: 80, height: 1, color: 'green', isCheckpoint3: true, text:true});
boxes.push({ x: 7600, y:123, width: 80, height: 1, color: 'green', isCheckpoint4: true, text:true});
boxes.push({ x: 10200, y:123, width: 80, height: 1, color: 'green', isCheckpoint4: true, text:true});
boxes.push({ x: 12850, y:123, width: 80, height: 1, color: 'green', isCheckpoint4: true, text:true});
boxes.push({ x: 15400, y:123, width: 80, height: 1, color: 'green', isCheckpoint5: true, text:true});
boxes.push({ x: 17900, y:123, width: 80, height: 1, color: 'green', isCheckpoint5: true, text:true});
boxes.push({ x: 20800, y:123, width: 80, height: 1, color: 'green', isCheckpoint5: true, text:true});

//3 moving platform horizontal 
boxes.push({ id: 'movingPlatform', x: 3190, y: 70, width: 250, height: 10, color: 'blue', isMoving: true, direction: 'horizontal', speed: 2, range: 100, originalX: 1200 });
//4 moving platform horizontal 
boxes.push({ id: 'movingPlatform', x: 8300, y: 40, width: 20, height: 10, color: 'blue', isMoving: true, direction: 'horizontal', speed: 5, range: 100, originalX: 1200 });
//5 moving platform horizontal 
boxes.push({ id: 'movingPlatform', x: 10800, y: 114, width: 400, height: 10, color: 'blue', isMoving: true, direction: 'horizontal', speed: 1, range: 100, originalX: 1200 });
boxes.push({ id: 'movingPlatform', x: 11950, y: 90, width: 30, height: 10, color: 'blue', isMoving: true, direction: 'horizontal', speed: 5, range: 100, originalX: 1200 });
boxes.push({ id: 'movingPlatform', x: 12280, y: 90, width: 30, height: 10, color: 'blue', isMoving: true, direction: 'horizontal', speed: 5, range: 100, originalX: 1200 });
//7 moving platform 
boxes.push({ id: 'movingPlatform', x: 17200, y: 90, width: 200, height: 10, color: 'blue', isOpMoving: true, direction: 'horizontal', speed: 2, range: 100, originalX: 1200 });
// Add a switch (trigger)
boxes.push({ x: 1790, y: 20, width: 40, height: 10, color: 'skyblue', isSwitch: true });

// Add a door switch
var door = { x: 2150, y: -110, width: 30, height: 235, color: 'red', isDoor: true, isOpen: false };



var playerProgress = 0; // 0 to totalWidth range
var totalWidth = 22500; // Aapke game ka total width

canvas.width = width;
canvas.height = height;
// Camera object
var camera = {
    x: 0,
    y: 0
};


function update() {
    

    // Jump logic
    if (keys[38] || keys[32] || keys[87]) {
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2; // Increase jump height
        }
    }

    // Horizontal movement
    if (keys[39] || keys[68]) { // Right
        if (player.velX < player.speed) {
            player.velX++;
            isFace = true;
        }
    }
    if (keys[37] || keys[65]) { // Left
        if (player.velX > -player.speed) {
            player.velX--;
            isFace = false;
        }
    }

    player.velX *= friction;
    player.velY += gravity; // Gravity applied here

    player.grounded = false;

    // Collision detection for boxes
    for (var i = 0; i < boxes.length; i++) {
        ctx.fillStyle = boxes[i].color;
        ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        
        var dir = colCheck(player, boxes[i]);
        if (boxes[i].isEnemy && dir && !isFading) { // If collision with enemy
            // Reset player position upon collision with an enemy
            location.reload();
            player.velX = 0;
            player.velY = 0;
            isFading = true;
            fadingOut = true; // Start fading out
      
        }  
       
        else if(boxes[i].isCheckpoint1 && dir){
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "Checkpoint";
          // Update the last checkpoint to the current checkpoint's position
            lastCheckpoint = { x: boxes[i].x + 100, y: boxes[i].y - player.height };
            localStorage.setItem("lastCheckpoint", JSON.stringify(lastCheckpoint));
        }
        else if(boxes[i].isCheckpoint2 && dir){
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "Checkpoint";
          isCheckpoint1 = false;
          // Update the last checkpoint to the current checkpoint's position
            lastCheckpoint = { x: boxes[i].x + 100, y: boxes[i].y - player.height };
            // Save the checkpoint in localStorage
            localStorage.setItem("lastCheckpoint", JSON.stringify(lastCheckpoint));
        }
        else if(boxes[i].isCheckpoint3 && dir){
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "Checkpoint";
          isCheckpoint2 = false;
          // Update the last checkpoint to the current checkpoint's position
            lastCheckpoint = { x: boxes[i].x + 100, y: boxes[i].y - player.height };
            // Save the checkpoint in localStorage
            localStorage.setItem("lastCheckpoint", JSON.stringify(lastCheckpoint));
        }
        else if(boxes[i].isCheckpoint4 && dir){
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "Checkpoint";
          isCheckpoint3 = false;
          // Update the last checkpoint to the current checkpoint's position
            lastCheckpoint = { x: boxes[i].x + 100, y: boxes[i].y - player.height };
            // Save the checkpoint in localStorage
            localStorage.setItem("lastCheckpoint", JSON.stringify(lastCheckpoint));
        }
        else if(boxes[i].isCheckpoint5 && dir){
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "Checkpoint";
          isCheckpoint4 = false;
          // Update the last checkpoint to the current checkpoint's position
            lastCheckpoint = { x: boxes[i].x + 100, y: boxes[i].y - player.height };
            // Save the checkpoint in localStorage
            localStorage.setItem("lastCheckpoint", JSON.stringify(lastCheckpoint));
        }
        
        else if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = true;
        } else if (dir === "b") { // Player lands on a platform
            player.grounded = true;
            player.jumping = false;
            document.getElementById('check').style.display = "none";
        } else if (dir === "t") { // Player hits the bottom of a platform
        document.getElementById('check').style.display = "none";
            player.velY *= 0;
        }
        
        if(boxes[i].isCode1 && dir){
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "3042";
        }
        if(boxes[i].isCode2 && dir){
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "2_5_";
        }
        if (boxes[i].isCode3 && dir) {
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "_9_4";
        }
        if (boxes[i].isCode4 && dir) {
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "_7_ _ _";
        }
        if (boxes[i].isCode5 && dir) {
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "1 _ _ 3 _";
        }
        if (boxes[i].isCode6 && dir) {
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "_ _ 2 _ 5";
        }
        if (boxes[i].isCode7 && dir) {
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "Who is - - -";
        }
        if (boxes[i].isCode8 && dir) {
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "- - our - -";
        }
        if (boxes[i].isCode9 && dir) {
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent = "- - - first supporter";
        }
        
        if(boxes[i].isTrap1 && dir ==="b"){
          if(boxes[i].x <16300){
          boxes[i].x +=3;
          }
          else{ }
        }
        if(boxes[i].isTrap2 && dir ==="b"){
          if(boxes[i].y > 10){
          boxes[i].y += -1;
          }
          else{ }
        }

         if(boxes[i].isGayab && dir){
      boxes[i].color = 'black';
    }
    
    if (boxes[i].enemyRise && dir){
      boxes[i].isRise = true;
    }
     for (let j = 0; j < boxes.length; j++) {
        // Check for the box that needs to be affected (example: if the affected box has a specific property or index)
        if (boxes[j].isAffected && boxes[i].isRise) {
            // Change the y and height of the different box (boxes[j]) based on some condition
            if (boxes[j].y > 20 || boxes[j].height < 103) {
                boxes[j].y -= 0.1;    // Move the box upwards
                boxes[j].height += 0.1; // Increase the height
            }
        }
    }
            
        if (boxes[i].isFinish && dir) {
          document.getElementById('check').style.display = "block";
          document.getElementById('check').textContent ="Coming soon with new levels!";
        }
        if (boxes[i].isSwitch && dir) { // Activate switch
            door.isOpen = true; // Open door
            localStorage.setItem('doorState', JSON.stringify(door.isOpen)); // Save state
        }
        if (boxes[i].isMoving && dir === "b") { // Player lands on the moving platform
        player.grounded = true;
        player.jumping = false;
        player.velY = 0; // Reset vertical velocity
        player.x += boxes[i].speed; // Move player with platform
    }
    if (boxes[i].isOpMoving && dir === "b") { // Player lands on the moving platform
        player.grounded = true;
        player.jumping = false;
        player.velY = 0; // Reset vertical velocity
        player.x += -boxes[i].speed; // Move player with platform
    }
    if(boxes[i].open && dir){
      boxes[i].open = true;
      boxes[i].height = 10;
    }
    if(boxes[i].isDoorOpen && dir){
      document.getElementById('pass').style.display = "block";
    }
  
    
    
    boxes.forEach(box => {
        if (boxes.isMoving) {
            if (boxes.direction === 'horizontal') {
                boxes.x += boxes.speed;
                if (boxes.x > boxes.originalX + boxes.range || boxes.x < boxes.originalX) {
                    boxes.speed *= -1; // Reverse direction
                }
            }
            // Add vertical movement if needed
            // else if (box.direction === 'vertical') { ... }
        }
    });
    boxes.forEach(box => {
        if (boxes.isOpMoving) {
            if (boxes.direction === 'horizontal') {
                boxes.x += boxes.speed;
                if (boxes.x > boxes.originalX + boxes.range || boxes.x < boxes.originalX) {
                    boxes.speed *= -1; // Reverse direction
                }
            }
            // Add vertical movement if needed
            // else if (box.direction === 'vertical') { ... }
        }
    });
    }
    // Update player progress
    playerProgress = player.x; // Player ki horizontal position

    // Update progress display
    document.getElementById('progress').innerText = 'Progress: ' + Math.round((playerProgress / totalWidth) * 100) + '%';
    
var savedDoorState = localStorage.getItem('doorState');
if (savedDoorState) {
    door.isOpen = JSON.parse(savedDoorState); // Load door state
}
    // Door logic
    if (!door.isOpen) {
        var doorCollision = colCheck(player, door);
        if (doorCollision === "l" || doorCollision === "r") {
            player.velX = 0; // Stop horizontal movement
        } else if (doorCollision === "b") {
            player.grounded = true; // Land on the door
            player.jumping = false;
        } else if (doorCollision === "t") {
            player.velY = 0; // Hit the bottom of the door
        }
    }
    
    


    
    ctx.clearRect(0, 0, width, height); // Clear canvas at the beginning
    ctx.drawImage(background1Image,-camera.x,-130 -camera.y,2000,260);
    ctx.drawImage(backgroundBImage,-camera.x +2000,-130 -camera.y,600,260);
    ctx.drawImage(background2Image,-camera.x + 2600,-130 -camera.y,2000,260);
    ctx.drawImage(backgroundBImage,-camera.x + 4600,-130 -camera.y,600,260);
    ctx.drawImage(background3Image,-camera.x + 5200,-130 -camera.y,2000,260);
    ctx.drawImage(backgroundBImage,-camera.x + 7200,-130 -camera.y,600,260);
    ctx.drawImage(background4Image,-camera.x + 7800,-130 -camera.y,2000,260);
    ctx.drawImage(backgroundBImage,-camera.x + 9800,-130 -camera.y,600,260);
    ctx.drawImage(background5Image,-camera.x + 10400,-130 -camera.y,2000,260);
    ctx.drawImage(backgroundBImage,-camera.x + 12400,-130 -camera.y,600,260);
    ctx.drawImage(background6Image,-camera.x + 13000,-130 -camera.y,2000,260);
    ctx.drawImage(backgroundBImage,-camera.x + 15000,-130 -camera.y,600,260);
    ctx.drawImage(background7Image, -camera.x + 15600, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 17600, -130 - camera.y, 600, 260);
    ctx.drawImage(background8Image, -camera.x + 18200, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 20200, -130 - camera.y, 600, 260);
    ctx.drawImage(background9Image, -camera.x + 20800, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 22800, -130 - camera.y, 600, 260);
    ctx.drawImage(background10Image, -camera.x + 23400, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 25400, -130 - camera.y, 600, 260);
    ctx.drawImage(background11Image, -camera.x + 26000, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 28000, -130 - camera.y, 600, 260);
    ctx.drawImage(background12Image, -camera.x + 28600, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 30600, -130 - camera.y, 600, 260);
    ctx.drawImage(background13Image, -camera.x + 31200, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 33200, -130 - camera.y, 600, 260);
    ctx.drawImage(background14Image, -camera.x + 33800, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 35800, -130 - camera.y, 600, 260);
    ctx.drawImage(background15Image, -camera.x + 36400, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 38400, -130 - camera.y, 600, 260);
    ctx.drawImage(background16Image, -camera.x + 39000, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 41000, -130 - camera.y, 600, 260);
    ctx.drawImage(background17Image, -camera.x + 41600, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 43600, -130 - camera.y, 600, 260);
    ctx.drawImage(background18Image, -camera.x + 44200, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 46200, -130 - camera.y, 600, 260);
    ctx.drawImage(background19Image, -camera.x + 46800, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 48800, -130 - camera.y, 600, 260);
    ctx.drawImage(background20Image, -camera.x + 49400, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 51400, -130 - camera.y, 600, 260);
    ctx.drawImage(background21Image, -camera.x + 52000, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 54000, -130 - camera.y, 600, 260);
    ctx.drawImage(background22Image, -camera.x + 54600, -130 - camera.y, 2000, 260);
    ctx.drawImage(backgroundBImage, -camera.x + 56600, -130 - camera.y, 600, 260);
    
    if (player.grounded) {
        player.velY = 0;
    }

    player.x += player.velX;
    player.y += player.velY;
    // Update camera position to follow player
    camera.x = player.x - width/2;
    camera.y = -110;
    
    
    
    
ctx.save();
// Draw the player
if(isFace){
    ctx.drawImage(playerImage, player.x - camera.x, player.y - camera.y, player.width, player.height);
}else {
  // Flip the player image horizontally for left
        ctx.translate(player.x - camera.x + player.width, player.y - camera.y);
        ctx.scale(-1, 1);  // Flip horizontally
        ctx.drawImage(playerImage, 0, 0, player.width, player.height);
}
ctx.restore();
// Draw boxes (or platforms) after translation
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        ctx.fillStyle = box.color;
        ctx.fillRect(box.x - camera.x, box.y - camera.y, box.width, box.height);
    }
// Draw the door with color indication
    ctx.fillStyle = door.isOpen ? 'transparent' : door.color;
    ctx.fillRect(door.x - camera.x, door.y - camera.y, door.width, door.height);



// Apply fade effect when colliding with enemy
    if (isFading) {
        applyFadeEffect();
    }
    // Request the next frame
    requestAnimationFrame(update);
}
// Function to check password
function checkPassword() {
    var enteredPassword = document.getElementById('passwordInput').value;
    
    boxes.forEach(function(box) {
        // If it's the door with a password
        if (box.password) {
            if (enteredPassword === box.password) {
                box.isDoorOpen = true;
                box.color = 'green'; // Change color when door opens
                box.height += -60;
                document.getElementById('pass').style.display = "none"; 
            document.getElementById('passwordInput').style.borderColor = "green";    
            } else {
                document.getElementById('passwordInput').style.borderColor = "red";
            }
        }
    });
}

function drawBoxes() {
    boxes.forEach(box => {
        ctx.fillStyle = boxes.color;
        ctx.fillRect(boxes.x, boxes.y, boxes.width, boxes.height);
    });
}

function saveGameState() {
    var gameState = {
        doorState: door.isOpen,
        switchStates: switches.map(s => s.isActivated), // Save switch states
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}
function loadGameState() {
    var savedState = localStorage.getItem('gameState');
    if (savedState) {
        var gameState = JSON.parse(savedState);

        // Loax door state, switch states, etc.
        door.isOpen = gameState.doorState;
        switches.forEach((s, index) => s.isActivated = gameState.switchStates[index]);
    }
}


// Fade-in and fade-out effect
function applyFadeEffect() {
    if (fadingOut) {
        fadeOpacity += 0.4; // Fade out
        if (fadeOpacity >= 1) {
            // When fade out completes, reset player position
            player.x = lastCheckpoint.x + 10;
            player.y = lastCheckpoint.y + 10;
            player.velX = 0;
            player.velY = 0;
            fadingOut = false; // Start fading in
        }
    } else {
        fadeOpacity -= 0.08; // Fade in
        if (fadeOpacity <= 0) {
            fadeOpacity = 0;
            isFading = false; // Stop fading
        }
    }

    // Apply fade effect using globalAlpha
    ctx.globalAlpha = fadeOpacity;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1.0; // Reset alpha after fade
}
function pass(){
  document.getElementById('pass').style.display = "none";
}


function colCheck(shapeA, shapeB) {
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.getElementById("leftBtn").addEventListener("touchstart", function () {
    keys[37] = true; // Left
   
});
document.getElementById("leftBtn").addEventListener("touchend", function () {
    keys[37] = false;
    
});

document.getElementById("rightBtn").addEventListener("touchstart", function () {
    keys[39] = true; // Right
   
});
document.getElementById("rightBtn").addEventListener("touchend", function () {
    keys[39] = false;
});

document.getElementById("jumpBtn").addEventListener("touchstart", function () {
    keys[38] = true; // Jump
});
document.getElementById("jumpBtn").addEventListener("touchend", function () {
  keys[38] = false; // Jump
});

// Existing keydown and keyup events for keyboard input
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

window.addEventListener('beforeunload', function() {
    saveGameState(); // Save on close or refresh
});
window.onload = function() { console.log("load");
    loadGameState(); // Load on game start
};
// Start the game loop when the window loads
window.addEventListener("load", function () {
    update();
});