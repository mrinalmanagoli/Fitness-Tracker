
//***********CONSTANTS****************

//***********VARIABLES****************
//toggle for showing the general info tab or not
var showGenInf=true; //init to true since page starts with general info tab shown
var init_complete = false; //Boolean tracking if initialization is complete
var current_date = new Date(); //This is the date that is selected from the side-menu. Changeable. Initially set to today

var displayedDiv; //div being displayed currently
var liquid;
var glass;

//**********FUNCTIONS*****************

//**once page is loaded, need to set variables now that certain elements exist**
function init(){
	init_complete = false;
	displayedDiv = document.getElementById("homeScreen"); //init to main page/home screen
	liquid = document.getElementById('liquid'); //The liquid object
	glass = document.getElementById('glass'); //The glass object
	var cal_date = document.getElementById('start');
	cal_date.value = moment(current_date).format("YYYY-MM-DD");
	cal_date.setAttribute("max", moment(current_date).format("YYYY-MM-DD"));
	init_complete = true;
	
	//exercise management init
	em = new ExerciseSystemManager();
	exRec = new ExRecommender(document.getElementById("recommendedExDiv"));
	document.getElementById("exNameField").addEventListener("input", function(){em.exerciseAdder.exNameFieldTyped(em.exerciseAdder)}); //add the listener to the field
	
}//end init

//**general info bar**

function toggleGenInf(){
	if (init_complete)
	{
		//get access to the tab and the button for manipulation
		var genInf = document.getElementById("generalInfo");
		var button = document.getElementById("genInfToggle");
		
		if(showGenInf){//if we are showing the general info tab, need to hide it now 

			//adjust section rectangle		
			genInf.style.width = "2.3%";
			
			genInf.style.left = "97.2%";
			
			//adjust button
			button.style.left = "97.5%";
					
			//currently displayed div adjustment (expand width-wise)	
			//displayedDiv.style.width = "90.25%";
			
		}//end if
		else
		{	//if the tab is hidden, need to show it now
			//adjust section rectangle		
			genInf.style.width = "21.3%";
			
			genInf.style.left = "78.2%";
			
			//adjust button
			button.style.left = "78.5%";
			
			//currently displayed div adjustment (contract width-wise)
			//displayedDiv.style.width = "71.25%";
		}
		showGenInf = !showGenInf; //invert Boolean
	}
}

//**tracker hide/show management**

//not really needed but i have a function for this just in case things change for div management
function hideCurrentDiv(){
	displayedDiv.style.display = "none"; //sets the display property of the current tracker/div being displayed to "none" to hide it
}//end hideCurrentDiv

function showCurrentDiv(){

	//if the general info bar is being displayed or hidden, must reflect with the div that when presented
	//if you switch to a different div/section while the general info is hidden, that div.style.width property remains at its "show genInf" state
	//but if you switch back to that same div and the general info is being shown, then the div.style.width property doesn't reflect that. and what is displayed is wrong
	//adjusting for that case happens here

	/*  no^^^^^not doing that 
	if(showGenInf)
	   displayedDiv.style.width = "71.25%"; //div adjustment (contract width-wise)
	else
       displayedDiv.style.width = "90.25%"; //div adjustment (expand width-wise)			
	
	*/
	
    displayedDiv.style.display = "initial"; //initial propety is to show the div	
}//end showCurrentDiv

function showHomeScreen(){
	if (init_complete)
	{
		hideCurrentDiv(); //hide the div currently being displayed
		
		displayedDiv = document.getElementById("homeScreen"); //set the current div now to home screen
		
		showCurrentDiv();//now show that div
		document.body.style.overflowY="scroll"; 
	}
}//end showHomeScreen

function showPlans(){
	if (init_complete)
	{
		hideCurrentDiv();
		
		displayedDiv = document.getElementById("plans");
		
		showCurrentDiv();
		document.body.style.overflowY="scroll"; 
	}
}//end showPlans

function showMeals(){
	if (init_complete)
	{
		hideCurrentDiv();
		
		displayedDiv = document.getElementById("meals");
		
		showCurrentDiv();
		document.body.style.overflowY="scroll"; 
	}
}//end showMeals

function showWater(){
	if (init_complete)
	{
		hideCurrentDiv();
		
		displayedDiv = document.getElementById("water");

		//Initialize elements on the water tracking sub-page
		init_water_page();

		showCurrentDiv();
		document.body.style.overflowY="scroll"; 
	}

}//end showWater

function showSleep(){
	if (init_complete)
	{
		hideCurrentDiv();
		
		displayedDiv = document.getElementById("sleep");
		
		showCurrentDiv();
		document.body.style.overflowY="scroll"; 
		
		//after click on the sleep button, the sleep page will be visible
		init_sleep_page();

	}
}//end showSleep

function showExercise(){
	if (init_complete)
	{
		hideCurrentDiv();
	
		displayedDiv = document.getElementById("exercise");
		
		//display the graph section
		initExChart();
	
		showCurrentDiv();
	
		document.body.style.overflowY="hidden"; 
	
		//update the current plan now that it could have changed
		exRec.recommendPlan(currPlan); //currPlan from plansScript.js
	}
}//end showExercise

function setDate()
{
	current_date = new Date(document.getElementById('start').value + " 00:00:00 GMT-6:00");
	init_glass(current_date, true);
}
