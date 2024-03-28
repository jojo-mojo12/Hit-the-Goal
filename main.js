// Create canvas variable
var canvas = new fabric.Canvas("myCanvas");

// Set initial positions for ball and hole images.
ball_x = 0;
ball_y = 0;
hole_x = 1030;
hole_y = 440; 

block_image_width = 5;
block_image_height = 5;

function load_img() {
    fabric.Image.fromURL("golf-h.png", function (Img) {
        hole_obj = Img;
        hole_obj.scaleToWidth(55);
        hole_obj.scaleToHeight(55);
        hole_obj.set({
            top: hole_y,
            left: hole_x
        });
        canvas.add(hole_obj);
    });
    new_image();
}

function new_image() {
    fabric.Image.fromURL("ball.png", function (Img) {
        ball_obj = Img;
        ball_obj.scaleToWidth(40);
        ball_obj.scaleToHeight(40);
        ball_obj.set({
            top: ball_y,
            left: ball_x
        });
        canvas.add(ball_obj);
    });
}

// Function to calculate Euclidean distance between two points
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Set the threshold distance
var thresholdDistance = 10; // Adjust this value as needed

// Check if the ball is close enough to the hole
function isBallCloseToHole() {
    var distance = calculateDistance(ball_x, ball_y, hole_x, hole_y);
    return distance < thresholdDistance;
}


window.addEventListener("keydown", my_keydown);

function my_keydown(e) {
    keyPressed = e.keyCode;
    console.log(keyPressed);
    /* Check the coordinates of the ball and hole images to finish the game.
    And if coordinates match, remove ball image,
    display "GAME OVER!!!"
    and make canvas border 'green'. */
    if (isBallCloseToHole()) {
		canvas.remove(ball_obj);
		fabric.Image.fromURL("ball_in_hole.png", function (Img) {
			ball_obj = Img;
			ball_obj.scaleToWidth(40);
			ball_obj.scaleToHeight(40);
			ball_obj.set({
				top: ball_y,
				left: ball_x})
	    canvas.add(ball_obj);
    });

		document.getElementById("hd4").innerHTML = "Congrats! You have hit the goal!";
		document.getElementById("myCanvas").style.borderColor = "rgba(0, 187, 59, 0.59)";
	} else {
        if (keyPressed == '38') {
            up();
            console.log("up");
        }
        if (keyPressed == '40') {
            down();
            console.log("down");
        }
        if (keyPressed == '37') {
            left();
            console.log("left");
        }
        if (keyPressed == '39') {
            right();
            console.log("right");
        }
    }

    function up() {
        if (ball_y >= 10) {
            ball_y = ball_y - block_image_height;
            console.log("block image height = " + block_image_height);
            console.log("When up arrow key is pressed, X = " + ball_x + ", Y = " + ball_y);
            canvas.remove(ball_obj);
            new_image();
        }
    }

    function down() {
        if (ball_y <= 450) {
            ball_y = ball_y + block_image_height;
            console.log("block image height = ", block_image_height);
            console.log("When down arrow key is pressed, X = " + ball_x + ", Y = " + ball_y);
            canvas.remove(ball_obj);
            new_image();
        }
    }

    function left() {
        if (ball_x > 5) {
            ball_x = ball_x - block_image_width;
			console.log("When left arrow is pressed, X = " + ball_x + "Y = " + ball_y);
			console.log("block_image width = "+ block_image_width);
			canvas.remove(ball_obj);
			new_image()
        }
    }

    function right() {
        if (ball_x <= 1050) {
            ball_x = ball_x + block_image_width;
			console.log("When right arrow is pressed, X = " + ball_x + "Y = " + ball_y);
			console.log("block_image width = "+ block_image_width);
			canvas.remove(ball_obj);
			new_image()
        }
    }
}