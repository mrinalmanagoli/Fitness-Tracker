/**********************************
*
* TODO:
*
* add functionality for adding a new days data
* link chart with today/calendar feature once coded
*
*
***********************************/

const labelWeekly = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const labelMonthly =["Nov 1st", "Nov 2nd", "Nov 3rd", "Nov 4th", "Nov 5th", "Nov 6th", "Nov 7th", 
                     "Nov 8th", "Nov 9th", "Nov 10th", "Nov 11th", "Nov 12th", "Nov 13th", "Nov 14th",
					 "Nov 15th", "Nov 16th", "Nov 17th", "Nov 18th", "Nov 19th", "Nov 20th", "Nov 21st",
					 "Nov 22nd", "Nov 23rd", "Nov 24th", "Nov 25th", "Nov 26th", "Nov 27th", "Nov 28th",
					 "Nov 29th", "Nov 30th"];
					  
const weeklyCalVals = [2020, 1589, 1348, 1066, 1666, 1867, 0];//2021];
const monthlyCalVals =[2198, 1764, 1901, 2023, 1789, 1888, 1190,
					   1920, 2012, 3001, 2178, 1981, 1798, 2000,
					   1764, 1922, 1904, 2898, 2112, 1897, 1701,
					   1870, 1999, 2020, 1589, 1348, 1066, 1666,
					   1867, 0];//2021];
					  

const weeklyWeightVals = [175, 174, 174, 176, 175, 173, 0];
const monthlyWeightVals =[193, 192, 191, 190, 190, 188, 188,
                          187, 187, 186, 185, 184, 183, 182,
                          182, 181, 181, 180, 179, 178, 177,
					      176, 176, 175, 174, 176, 175, 174,
						  173, 0]; //today nothing logged, yet

//when the weekly or monthly button is selected, change colour
const selectedColour="rgb(0,100,0)";
const notSelectedColour="rgb(0,255,0)";


const chartTypes = {//types of charts that can be shown
	CALS: "calories",
	WEIGHT: "weight",
	//BOTH: "both",
}//end enum chartTypes

//keep track of the current chart type to be shown
var chartType = chartTypes.CALS; //init

var currentChart; //current chart being displayed

var showWeekly=true; //showing weekly data or monthly

const weeklyCalData = {
		labels: labelWeekly,
		datasets: 
		[{
			backgroundColor: "rgba(0,0,0,0)", //0 alpha, fully transparent no background
			borderColor: "rgb(0,255,0)",
			data: weeklyCalVals
		}] //end datasets
	};
	
const weeklyCalOptions = {
		legend: {display:false},
		title: {
			display: true,
			text: "Weekly Calories",
			fontSize: 16
		}
    };
	
	
const monthlyCalData = {
		labels: labelMonthly,
		datasets: 
		[{
			backgroundColor: "rgba(0,0,0,0)", //0 alpha, fully transparent no background
			borderColor: "rgb(0,255,0)",
			data: monthlyCalVals
		}] //end datasets
	};
	
const monthlyCalOptions = {
		legend: {display:false},
		title: {
			display: true,
			text: "Monthly Calories",
			fontSize: 16
		}
    };

const weeklyWeightData = {
		labels: labelWeekly,
		datasets: 
		[{
			backgroundColor: "rgba(0,0,0,0)", //0 alpha, fully transparent no background
			borderColor: "rgb(0,0,255)",
			data: weeklyWeightVals
		}] //end datasets
	};
	
const weeklyWeightOptions = {
		legend: {display:false},
		title: {
			display: true,
			text: "Weekly Weight (lbs)",
			fontSize: 16
		}
    };
	
const monthlyWeightData = {
		labels: labelMonthly,
		datasets:
		[{
			backgroundColor: "rgba(0,0,0,0)", //0 alpha, fully transparent no background
			borderColor: "rgb(0,0,255)",
			data: monthlyWeightVals
		}] //end datasets
	};
	
const monthlyWeightOptions = {
		legend: {display:false},
		title: {
			display: true,
			text: "Monthly Weight (lbs)",
			fontSize: 16
		}
    };

function createChart(data, options){
	
	if(options == undefined)  //if options never passed
		options = {legend: {display: false}}; //set it to default no legend
	
	currentChart = new Chart('exChart', {
		type: "line",
		data: data,
		options: options
	});//end chart

}//end createChart

/////////////////////////////////////////////////////////////
//////////HOME PAGE GRAPH CANVAS SETTING/////////////////////
/////////////////////////////////////////////////////////////
//will generate a chart at the given canvas id, could be used for the home page

function chartCalsMonthly(canvasId){

	currentChart = new Chart(canvasId, {
		type: "line",
		data: monthlyCalData,
		options: monthlyCalOptions
	});//end chart
	
}//end getCalsMonthly

function chartWeightMonthly(canvasId){

	currentChart = new Chart(canvasId, {
		type: "line",
		data: monthlyWeightOptions,
		options: monthlyWeightData
	});//end chart
	
}//end getWeightMonthly

function chartCalsWeekly(canvasId){

	currentChart = new Chart(canvasId, {
		type: "line",
		data: weeklyCalData,
		options: weeklyCalOptions
	});//end chart
	
}//end getCalsWeekly

function chartWeightWeekly(canvasId){

	currentChart = new Chart(canvasId, {
		type: "line",
		data: weeklyWeightData,
		options: weeklyWeightOptions
	});//end chart
	
}//end getWeightWeekly


//////////////////////////////////////////////
/////////THE OTHER METHODS////////////////////
//////////////////////////////////////////////

function initExChart(){//when the chart div is loaded, need to call this to setup the first chart to show
	createChart(weeklyCalData, weeklyCalOptions); //start with weekly calorie depletion
}//end initChart

function showChart(data, options){
	currentChart.destroy();
	createChart(data, options);
}//end showChart

function refreshChart(){
	
	if(showWeekly) showWeeklyChart();
	else showMonthlyChart();
	
}//end refreshChart

function showMonthlyChart(){
	
	var data; //data to show
	var options; //options to pass for the graph
	
	switch(chartType){ //get appropriate data
		
		case chartTypes.CALS :
			data = monthlyCalData;
			options = monthlyCalOptions
			break;
		case chartTypes.WEIGHT :
			data = monthlyWeightData;
			options = monthlyWeightOptions;
			break;	
		case chartTypes.BOTH :
			data = monthlyDoubleData;
			options = monthlyDoubleOptions;
			break;
		
	}//end switch	
	
	showChart(data, options); //display it
	
	showWeekly=false;
	
	//highlight which css button was clicked (indicates what's being displayed)
	document.getElementById('monthlyButton').style.backgroundColor = selectedColour;
	document.getElementById('weeklyButton').style.backgroundColor = notSelectedColour;
	
}//end showMonthlyChart

function showWeeklyChart(){

	var data; //data to show
	var options; //options to pass for the graph

	switch(chartType){
		//give appropriate weekly data
		case chartTypes.CALS :
			data = weeklyCalData;
			options = weeklyCalOptions;
			break;
		case chartTypes.WEIGHT :
			data = weeklyWeightData;
			options = weeklyWeightOptions;
			break;	
		case chartTypes.BOTH :
			data = weeklyDoubleData;
			options = weeklyDoubleOptions;
			break;
		
	}//end switch	
	
	showChart(data, options); //display it	
	
	showWeekly=true;
	
		//highlight which css button was clicked (indicates what's being displayed)
	document.getElementById('weeklyButton').style.backgroundColor = selectedColour;
	document.getElementById('monthlyButton').style.backgroundColor = notSelectedColour;
	
}//end showWeeklyChart

function getDataForChart(){ //logic center to give functions the correct data based on the current type
 var ret; //what to return
	

 if(showWeekly){ //if weekly
	switch(chartType){
		//give appropriate weekly data
		case chartTypes.CALS :
			ret = weeklyCalData;
			break;
		case chartTypes.WEIGHT :
			ret = weeklyWeightData;
			break;	
		case chartTypes.BOTH :
			ret = weeklyDoubleData;
			break;
		
	}//end switch
 }//end if
 
 else{
	switch(chartType){
		
		case chartTypes.CALS :
			ret = monthlyCalData;
			break;
		case chartTypes.WEIGHT :
			ret = monthlyWeightData;
			break;	
		case chartTypes.BOTH :
			ret = monthlyDoubleData;
			break;
		
	}//end switch
 }//end else	 
	

	return ret;
}//end getDataForChart

function getOptionsForChart(){
 var ret; //what to return
	

 if(showWeekly){ //if weekly
	switch(chartType){
		//give appropriate weekly data
		case chartTypes.CALS :
			ret = weeklyCalOptions;
			break;
		case chartTypes.WEIGHT :
			ret = weeklyWeightOptions;
			break;	
		case chartTypes.BOTH :
			ret = weeklyDoubleOptions;
			break;
		
	}//end switch
 }//end if
 
 else{
	switch(chartType){
		
		case chartTypes.CALS :
			ret = monthlyCalOptions;
			break;
		case chartTypes.WEIGHT :
			ret = monthlyWeightOptions;
			break;	
		case chartTypes.BOTH :
			ret = monthlyDoubleOptions;
			break;
		
	}//end switch
 }//end else	 
	

	return ret;	
}//end getOptionsForChart


function chartTypeFwd(){
	//go to next one in enum (wrap around supported)
	switch(chartType){

		case chartTypes.CALS :
			chartType = chartTypes.WEIGHT;
			break;
		case chartTypes.WEIGHT :
			chartType = chartTypes.CALS;
			break;	
	}//end switch
	
	showChart(getDataForChart(), getOptionsForChart()); //show the newly requested chart with appropriate data passed 
	
}//end toggleChartType

function chartTypeBkd(){
	//go to prev one in enum (wrap around supported)
	switch(chartType){

		case chartTypes.CALS :
			chartType = chartTypes.WEIGHT;
			break;
		case chartTypes.WEIGHT :
			chartType = chartTypes.CALS;
			break;	
	}//end switch
	
	showChart(getDataForChart(), getOptionsForChart()); //show the newly requested chart with appropriate data passed 
	
}//end toggleChartType

