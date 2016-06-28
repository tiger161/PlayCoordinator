var stage;
var bg; 			// Background
var imgqueue;		// Queue for all images
var musicqueue;		// Queue for all sounds
var container, bmp;	// Container object, image object
var roles = []; // role buttons
var people = [
  {name:"Alice",role:-1},
	{name:"Bob",role:-1},
	{name:"Charley",role:-1},
	{name:"David",role:-1},
	{name:"Eric",role:-1},
	{name:"Florence",role:-1},
	{name:"Gabriela",role:-1},
	{name:"Henry",role:-1}
]; // list of people, needs to be dynamic
var results = []; // for displaying people and roles chosen
var checkarrow,checkshape; // checkmark to confirm selection

var title; // text which indicates who needs to pick

var musicPath = "Story_Audio/";
var imgPath = "Story_Images_3/";
var IMAGE_WIDTH = 2200;
var IMAGE_HEIGHT = 1238;

var NUM_ROLES=12; // number of roles to chose from

var slide=0; //variables for current slide,music playing, person picking role
var song=0;
var person=0;

var current_role = -1;

// Sound Variables
var src;            // the audio src we are trying to play
var soundInstance;  // the soundInstance returned by Sound when we create or play a src
var canvas;  		// the canvas we draw to

// Resize event listener
window.addEventListener('resize', resize);

function init() {
	// this does two things, it initializes the default plugins, and if that fails the if statement triggers and we display an error
	
	// if initializeDefaultPlugins returns false, we cannot play sound in this browser
	if (!createjs.Sound.initializeDefaultPlugins()) {return;}
		
	// create a new stage and point it at our canvas:
	canvas = document.getElementById("demoCanvas");
	stage = new createjs.Stage(canvas);
	
	// Create the background
	createBackground();		
	
	var musicManifest = [
		{id: "0", src: musicPath + "audio_00.mp3"},
		{id: "1", src: musicPath + "audio_01.mp3"},
		{id: "2", src: musicPath + "audio_02.mp3"},
		{id: "3", src: musicPath + "audio_03.mp3"},
		{id: "4", src: musicPath + "audio_04.mp3"},
		{id: "5", src: musicPath + "audio_05.mp3"},
		{id: "6", src: musicPath + "audio_06.mp3"},
		{id: "7", src: musicPath + "audio_07.mp3"},
		{id: "8", src: musicPath + "audio_08.mp3"},
		{id: "9", src: musicPath + "audio_09.mp3"},
		{id: "10", src: musicPath + "audio_10.mp3"},
		{id: "11", src: musicPath + "audio_11.mp3"},
		{id: "12", src: musicPath + "audio_12.mp3"},
		{id: "13", src: musicPath + "audio_13.mp3"},
		{id: "14", src: musicPath + "audio_14.mp3"},
		{id: "15", src: musicPath + "audio_15.mp3"},
		{id: "16", src: musicPath + "audio_16.mp3"},
		{id: "17", src: musicPath + "audio_17.mp3"},
		{id: "18", src: musicPath + "audio_18.mp3"},
		{id: "19", src: musicPath + "audio_19.mp3"},
		{id: "20", src: musicPath + "audio_20.mp3"},
		{id: "game", src: musicPath + "M-GameBG.ogg"},
		{id: "higher", src: musicPath + "bensound-goinghigher.mp3"},
		{id: "happy", src: musicPath + "bensound-happiness.mp3"},
		{id: "oops", src: musicPath + "audio_oops.mp3"},
		{id: "coin", src: musicPath + "coin.mp3"}
	];
	
	// Instantiate a music queue.
	musicqueue = new createjs.LoadQueue();
	createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
	musicqueue.installPlugin(createjs.Sound);

	musicqueue.loadManifest(musicManifest);
	
	
	// Royalty free sound clips: http://www.bigsoundbank.com/
	// Royalty free music songs: http://www.bensound.com/
	
	//canvas.innerHTML = "Waiting for load to complete.";  // letting the user know what's happening
	
	
	// Method: Display a slideshow
	imgqueue = new createjs.LoadQueue(false); // Creates a new queue (false is important)
	imgqueue.setMaxConnections(10); // Allows 10 concurrent connections for load
	
	// Need to call container creator
	imgqueue.addEventListener("complete", createContainer); // Calls handleCmplt when load is finished
	
	imgqueue.loadManifest([
			  {id:'0', src: imgPath + 'story1-newratio-00.png'},
				{id:'1', src: imgPath + 'story1-newratio-01.png'},
			  {id:'2', src: imgPath + 'story1-newratio-02.png'},
				{id:'3', src: imgPath + 'story1-newratio-03.png'},
				{id:'4', src: imgPath + 'story1-newratio-04.png'},
				{id:'5', src: imgPath + 'story1-newratio-05.png'},
				{id:'6', src: imgPath + 'story1-newratio-06.png'},
				{id:'7', src: imgPath + 'story1-newratio-07.png'},
				{id:'8', src: imgPath + 'story1-newratio-08.png'},
				{id:'9', src: imgPath + 'story1-newratio-09.png'},
				{id:'10', src: imgPath + 'story1-newratio-10.png'},
				{id:'11', src: imgPath + 'story1-newratio-11.png'},
				{id:'12', src: imgPath + 'story1-newratio-12.png'},
				{id:'13', src: imgPath + 'story1-newratio-13.png'},
				{id:'14', src: imgPath + 'story1-newratio-14.png'},
				{id:'15', src: imgPath + 'story1-newratio-15.png'},
				{id:'16', src: imgPath + 'story1-newratio-16.png'},
				{id:'17', src: imgPath + 'story1-newratio-17.png'},
				{id:'18', src: imgPath + 'story1-newratio-18.png'},
				{id:'19', src: imgPath + 'story1-newratio-19.png'},
				{id:'20', src: imgPath + 'story1-newratio-20.png'},
				{id:'role1', src: imgPath + 'role1.png'},
				{id:'role2', src: imgPath + 'role2.png'},
				{id:'role3', src: imgPath + 'role3.png'},
				{id:'role4', src: imgPath + 'role4.png'},
				{id:'role5', src: imgPath + 'role5.png'},
				{id:'role6', src: imgPath + 'role6.png'},
				{id:'role7', src: imgPath + 'role7.png'},
				{id:'role8', src: imgPath + 'role8.png'},
				{id:'role9', src: imgPath + 'role9.png'},
				{id:'role10', src: imgPath + 'role10.png'},
				{id:'role11', src: imgPath + 'role11.png'},
				{id:'role12', src: imgPath + 'role12.png'},
				{id:'right', src: imgPath + 'right_arrow.png'},
				{id:'left', src: imgPath + 'left_arrow.png'},
				{id:'check', src: imgPath + 'check_arrow.png'},
				{id:'dragright', src: imgPath + 'drag_right.png'}
	]); // Preloads all images, Images paired with number id tags
	
	resize();
}

//create and display the background (fullscreen)
function createBackground() {
	bg = new createjs.Shape();		
	stage.addChild(bg);
}

function createContainer() {
	
	console.log("CONTAINER CREATED!");
	// Obtain the current draw space
	contentWidth = document.getElementById("demoCanvas").offsetWidth;
	contentHeight = document.getElementById("demoCanvas").offsetHeight;

	container = new createjs.Container();
	stage.addChild(container);
			
	// Load the Image
	storyImg = new Image();
	storyImg.src = imgPath +"story1-newratio-00.png";
	storyImg.onload = handleImageLoad;
}

function handleImageLoad() {
	// Create a CreateJS bitmap from the loaded image
	var bmpStoryImage = new createjs.Bitmap(storyImg);
	
	// Add the bitmap to the Container
	container.addChild(bmpStoryImage);
	
	// Set the scale value
	// It could be useful to properly handle different mobile resolutions
	container.scaleX = 0.5;
	container.scaleY = 0.5;
					
	//draw buttons for picking roles and back button
	addRoleButtons();
	addBackButton();
					
	// Set the registration point of the content Container to center
	container.regX = bmpStoryImage.image.width/2;
	container.regY = bmpStoryImage.image.height/2;
	
	//stage.update();		
	resize();
}

//create role buttons and title text and wait for clicks
function addRoleButtons(){
  for(var i = 0; i < NUM_ROLES; i++){
	  var button = new createjs.Bitmap(imgqueue.getResult("role"+(i+1)));
	  button.name = i;
    button.x = (i%4)*400+270;
    button.y = Math.floor(i/4)*320+200;
    
    button.addEventListener("click", roleClick);
    
    container.addChild(button);
    container.setChildIndex(button,1);
    
	  roles[i] = button;
    //container.setChildIndex(title,2);
	}
  title = new createjs.Text("Pass to: "+ people[person].name, "80px Comic Sans MS", "#ff7700");
  title.x = 330;
  title.y = 180;
  title.textBaseline = "alphabetic";
    
  container.addChild(title);
}

//create back button and background shape
function addBackButton(){
	prvArrow = new createjs.Bitmap(imgqueue.getResult("left"));
	prvArrow.x = 40;
	prvArrow.y = 40;
	prvArrow.addEventListener("click", prvClck);/*BUG*/	// Including this following line of code will cause the images to display
															// but will prevent all event listeners from functioning.
	container.addChild(prvArrow);
	container.setChildIndex(prvArrow, 1);
	
	prvShape = new createjs.Shape();
	prvShape.graphics.beginFill("#ffffff").drawRoundRect(0, 0, 270, IMAGE_HEIGHT - 140, 30);  // Original orange color: #ff8c00
	//prvShape.graphics.beginStroke("#000000").setStrokeStyle(3).drawRoundRect(0, 0, 270, IMAGE_HEIGHT - 140, 30);
	prvShape.x = 40;
	prvShape.y = 40;
	prvShape.alpha = 0.01;
	//prvShape.shadow = new createjs.Shadow("#000000", 5, 5, 10);
	prvShape.addEventListener("click", prvClck);
	
	container.addChild(prvShape);
	container.setChildIndex(prvShape, 1);
}

//create check button and background shape
function addCheckButton(){
	checkarrow = new createjs.Bitmap(imgqueue.getResult("check"));
	checkarrow.x = IMAGE_WIDTH-280;
	checkarrow.y = 40;
	checkarrow.addEventListener("click", nxtClck); /*BUG*/	// Including this following line of code will cause the images to display
															// but will prevent all event listeners from functioning.
	container.addChild(checkarrow);
	container.setChildIndex(checkarrow, 1);
	
  checkshape = new createjs.Shape();
	checkshape.graphics.beginFill("#ffffff").drawRoundRect(0, 0, 270, IMAGE_HEIGHT - 140, 30); // Original orange color: #ff8c00
	//nxtShape.graphics.beginStroke("#000000").setStrokeStyle(3).drawRoundRect(0, 0, 270, IMAGE_HEIGHT - 140, 30);
	checkshape.x = IMAGE_WIDTH - 310;
	checkshape.y = 40;
	checkshape.alpha = 0.01;
	//nxtShape.shadow = new createjs.Shadow("#000000", 5, 5, 10);
	checkshape.addEventListener("click", nxtClck);
	
	container.addChild(checkshape);
	container.setChildIndex(checkshape, 1);
}

function playSound(name) {
	// Play the sound using the ID created above.
	//soundInstance = createjs.Sound.play(name);
	
	//For testing
	soundInstance = createjs.Sound.play(name);
	//return createjs.Sound.play(name);
}

//called when a role is picked. Remove role buttons and allow user to confirm selection or return
function roleClick(event){
  console.log("CLICK WORKED!",event.target.name);
  console.log("text: " + container.getChildIndex(title));
  container.removeChild(title);
  for(var i = 0; i < NUM_ROLES; i++){
    container.removeChild(roles[i]);
  }
  addCheckButton();
  
  current_role = event.target.name;
  slide = current_role + 1;
  bmp = new createjs.Bitmap(imgqueue.getResult(slide.toString())); //Convert counter to string
	// Adding to Container
	container.addChildAt(bmp,1);
	resize();
}

//called when back button is pressed. If not already on the initial screen, return and draw role buttons
function prvClck(event){
  console.log("BACK CLICK WORKED!");
  if(slide !== 0){
    slide = 0;
    container.removeChild(bmp);
    container.removeChild(checkshape);
    container.removeChild(checkarrow);
    addRoleButtons();
  }
  resize();
}

//called when check button is pressed
function nxtClck(event){
  people[person].role = current_role;
  //if there are still people to pick, return to the initial screen
  if(person < people.length-1){
    person++;
    prvClck();
  }
  //if everybody has picked, draw final carousel
  else{
    //get rid of back and check buttons
    container.removeChild(bmp);
    container.removeChild(checkshape);
    container.removeChild(checkarrow);
    container.removeChild(prvArrow);
    container.removeChild(prvShape);
    
    //create a draggable container for displaying results
    var dragger = new createjs.Container();
    dragger.x = dragger.y = 0;
    
    //draw background of draggable container
    var hit = new createjs.Shape();
		hit.graphics.beginFill("#ffcc80").drawRect(100, 250, people.length*600+100, 600);
		dragger.addChild(hit);
		dragger.hitArea = hit;
		
		//draw arrow showing that a drag is possible
		var arrow = new createjs.Bitmap(imgqueue.getResult("dragright"));
		arrow.x = 10;
		arrow.y = 485;
		dragger.addChild(arrow);
		
		//draw names of users, roles underneath names
    for(var i = 0; i < people.length; i++){
      console.log(people[i].name + ": " + people[i].role);
      var text = new createjs.Text(people[i].name, "80px Comic Sans MS", "#ff7700");
      text.x = (i*600)+300;
      text.y = 360;
      text.textBaseline = "alphabetic";
      dragger.addChild(text);
      
      var image = new createjs.Bitmap(imgqueue.getResult("role"+(people[i].role+1)));
      image.x = (i*600)+200;
      image.y = 380;
      dragger.addChild(image);

      container.addChild(dragger);
    }
    
    //when clicked, record the intial position of the click
    var offset = 0;
    dragger.on("mousedown",function(evt){
      offset = evt.stageX - evt.currentTarget.x;
    });
    
    //if drag, use change in location of click to move draggable container
    dragger.on("pressmove",function(evt) {
			evt.currentTarget.x = evt.stageX - offset;
			stage.update();
    });
  }
  resize();
}

function resize() {
	
	var w = window.innerWidth-2;
	var h = window.innerHeight-2;

	stage.canvas.width = w;
	stage.canvas.height = h;

	// Simple "fit-to-screen" scaling
	var ratio = IMAGE_WIDTH / IMAGE_HEIGHT; // Use the "default" size of the content you have.
	var windowRatio = w/h;
	
	// calculate a scale factor to keep a correct aspect ratio.			
	var scale = w/IMAGE_WIDTH;
	if (windowRatio > ratio) {
		scale = h/IMAGE_HEIGHT;
	}
	
	// Background: full screen redraw 
	bg.graphics.clear();
	bg.graphics.beginFill("#222").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
	
	// Content: centered
	container.x = stage.canvas.width / 2;
	container.y = stage.canvas.height / 2; 
	
	// Scale up to fit width or height
	container.scaleX = container.scaleY = scale;
	
	stage.update();
}
	
