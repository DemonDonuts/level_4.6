//Declare my variables

var canvas;
var context;
var timer;
var interval;
var player;
var pushing = false; //push var


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

	player = new GameObject({x:500, y:canvas.height/2-100});

	platform0 = new GameObject();
		platform0.width = canvas.width-300;
		platform0.x = platform0.width/2;
		platform0.color = "#66ff33";
		
	
	platform1 = new GameObject();
		platform1.x = platform1.width;
		platform1.y = platform0.y- platform0.height/2 - platform1.height/2;
		platform1.color = "#66ff33";
		platform1.vx = 3;


		
	platform2 = new GameObject();
		platform2.width = canvas.width-300;
		platform2.x = platform0.width/2;
		platform2.color = "#66ff33";
		platform2.y = platform0.y- 200;
		platform2.color = "#66ff33";

		
	
	goal = new GameObject({width:24, height:50, x:platform1.x, y:platform1.y+100, color:"#00ffff"});
	

	var fX = .85;
	var fY = .97;
	
	var gravity = 1;

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	
	context.clearRect(0,0,canvas.width, canvas.height);	

	if(w && player.canJump && player.vy ==0)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
	}

	if(a)
	{
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
	}

	player.vx *= fX;
	player.vy *= fY;
	
	player.vy += gravity;
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);
	
	platform1.x += platform1.vx;


	//bottom platform
	while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}

	//top platform
	while(platform2.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}
	while(platform2.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform2.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform2.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	
	//---------Objective: Save Me!---------------------------------------------------------------------------------------------------- 
	//---------Run this program first.
	//---------Change the following condition so that the player pushes the wall-------------------------------------------------

	//makes the player push back against block
	if (platform1.hitTestPoint(player.left()) && player.vx <= 0 && pushing)
	{
		platform1.x += player.vx;
		//makes block stop
		platform1.vx = 0;

		// player.x++;
		// player.vx = 0;

		//moves the block but doesn't stop the movement
		player.x = platform1.x + platform1.width/2 + player.width/2;
	}

	//the platform statement
	while(platform1.hitTestPoint(player.left()) && player.vx <=0  && !pushing)
	{
		player.x++;
		player.vx = 0;
	}
	
	

	
	



	

	
	
	
	
	
	platform0.drawRect();
	platform2.drawRect();
	platform1.drawRect();
	player.drawRect();
	
	//Show hit points
	player.drawDebug();
	
}

