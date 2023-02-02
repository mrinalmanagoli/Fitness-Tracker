//Sleep variables
var sleepClicked; //when sleep time is updated

var updateSleepChart; //the circle is updated 
var dataSleep1; // 1st region in the pie chart, starts from top middle 
var dataSleep2; // 2nd region in the the pie chart
var dataSleep3; // 3rd region in the the pie chart
var data;
var configSleep;

var myChart; //the graph to show average sleep 
var time1;
var time2;
var am_or_pm1;
var am_or_pm2;
var piePercent;

var time1_select;
var time2_select;
var ampm11;
var ampm22;


///////////////////////////////////////////////////////////////////////////////////////////////
/* 
PURPOSE: The drop down list of numbers and am/pm for the clock
*/

function time1Selected(){

	var timee1= document.getElementById("hours1_slept");
	time1_select= timee1.options[timee1.selectedIndex].text;
	
	
}

function time2Selected(){

	var time_2= document.getElementById("hours2_slept");
	time2_select= time_2.options[time_2.selectedIndex].text;
	
}
function am_or_pm_1_Selected(){

	var amPm_1= document.getElementById("am_or_pm_1");
	ampm11= amPm_1.options[amPm_1.selectedIndex].text;
	
}
function am_or_pm_2_Selected(){

	var amPm_2= document.getElementById("am_or_pm_2");
	ampm22= amPm_2.options[amPm_2.selectedIndex].text;
	
}

///////////////////////////////////////////////////////////////////////////////////////////////

function init_sleep_page()
{
	//Draw the graph
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(show_sleep_chart);


	//clock 
	//setup block
	dataSleep1= 0;
	dataSleep2= 25;
	dataSleep3= 75;

	data= {
		    datasets: [{
			  label: 'Amount',
			  data: [dataSleep1,dataSleep2,dataSleep3],
			  backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54,162,235,0.2)',
				'rgba(255, 99, 132, 0.2)',
			  ],
			  borderColor: [
				'rgba(255,99,132,1)',
				'rgba(54,162,235,1)',
				'rgba(255, 99, 132, 0.2)',
			  ],
			  borderWidth: 0,
			  cutout: '90%'
		    }]
		};
		

		
	//configSleep block
	configSleep= { 
		type: "doughnut",
			data,
			options: {
			scales: {}
		}
	};

	// render/init block 
	myChart = new Chart(
		document.getElementById('myChart'),
		configSleep

	);

	time1= document.getElementById('time1');
	time2= document.getElementById('time2');

	am_or_pm1= document.getElementById('am_pm1');
	am_or_pm2= document.getElementById('am_pm2');

	updateSleepChart= document.getElementById('updateSleepChart');
	updateSleepChart.addEventListener('click', updateClock);



	//initial set time on the screen
	
	time1_select= 12;
	time2_select= 6;
	ampm11= "am";
    ampm22= "am";
	document.getElementById("numHours").innerHTML= "6 hr 00 min";
	


	//from water
	//sleep chrt
	//Initialize the togglebutton for the weekly/monthly display of the water chart
	
	//toggle_water_chart_init();

	//water_init_complete = true;


}
function updateClock(){
	//convert value1 to an integer from a string
	

	var time1_int=  time1_select;
	var time2_int= time2_select;



	var am_pm_string1= String(ampm11);
	var am_pm_string2= String(ampm22);

	if( am_pm_string1 == 'am'){

		myChart.data.datasets[0].backgroundColor[0]= 'rgba(255, 99, 132, 0.2)'; //orange 
		myChart.data.datasets[0].borderColor[0]= 'rgba(255, 99, 132, 0.2)';

		myChart.data.datasets[0].borderColor[1]='rgba(54,162,235,0.2)'; //second section is blue
		myChart.data.datasets[0].backgroundColor[1]='rgba(54,162,235,0.2)'; 

		myChart.data.datasets[0].backgroundColor[2]= 'rgba(255, 99, 132, 0.2)'; //orange
		myChart.data.datasets[0].borderColor[2]= 'rgba(255, 99, 132, 0.2)';


		if(time1_int == 12){
			if(time2_int== 1 && am_pm_string2== 'am'){
				time1.value= 4;
				time2.value= 85;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=1;

				document.getElementById("numHours").innerHTML="1 hr 00 min";
			}else if(time2_int== 1 && am_pm_string2== 'pm'){
				time1.value= 50;
				time2.value= 41;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=1;

				document.getElementById("numHours").innerHTML="13 hr 00 min";

			}else if (time2_int== 2 && am_pm_string2== 'am'){
				time1.value= 7;
				time2.value= 80;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;
				time1.value=12;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "2 hr 00 min";


			}else if (time2_int== 2 && am_pm_string2== 'pm'){
				time1.value= 55;
				time2.value= 40;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "14 hr 00 min";
			}else if (time2_int== 3 && am_pm_string2== 'am'){
				time1.value= 10;
				time2.value= 76;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=3;

				document.getElementById("numHours").innerHTML= "3 hr 00 min";
			}else if (time2_int== 3 && am_pm_string2== 'pm'){
				time1.value= 60;
				time2.value= 35;
				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "15 hr 00 min";
			}else if (time2_int== 4 && am_pm_string2== 'am'){
				time1.value= 15;
				time2.value= 74;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";
			}else if (time2_int== 4 && am_pm_string2== 'pm'){
				time1.value= 65;
				time2.value= 32;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "16 hr 00 min";
			}else if (time2_int== 5 && am_pm_string2== 'am'){
				time1.value= 18;
				time2.value= 68;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";
			
			}else if (time2_int== 6 && am_pm_string2== 'am'){
				time1.value= 24;
				time2.value= 70;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";
			
			}else if (time2_int== 7 && am_pm_string2== 'am'){
				time1.value= 29;
				time2.value= 70;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";
		
			
			}else if (time2_int== 8 && am_pm_string2== 'am'){
				time1.value= 29;
				time2.value= 61;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";
			

			}else if (time2_int== 9 && am_pm_string2== 'am'){
				time1.value= 34;
				time2.value= 55;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";
		
			}else if (time2_int== 10 && am_pm_string2== 'am'){
				time1.value= 35;
				time2.value= 50;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=12;
				time2.value=10;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";

			}else if (time2_int== 11 && am_pm_string2== 'am'){
				time1.value= 42;
				time2.value= 50;

				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;
				time1.value=12;
				time2.value=11;

				document.getElementById("numHours").innerHTML= "11 hr 00 min";
			}
	

		}else if (time1_int == 1){ //from 1 am to 

			if (time2_int== 2 && am_pm_string2== 'am'){
				time1.value= 7;
				time2.value= 80;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;

				time1.value=1;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "1 hr 00 min";


			}else if (time2_int== 2 && am_pm_string2== 'pm'){
				time1.value= 52;
				time2.value= 40;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-3;
				myChart.data.datasets[0].data[2]= time2.value-4;

				time1.value=1;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "13 hr 00 min";

			}else if (time2_int== 3 && am_pm_string2== 'am'){
				time1.value= 10;
				time2.value= 76;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;

				time1.value=1;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "2 hr 00 min";
			
			}else if (time2_int== 4 && am_pm_string2== 'am'){
				time1.value= 15;
				time2.value= 74;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;

				time1.value=1;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "3 hr 00 min";
			
			}else if (time2_int== 5 && am_pm_string2== 'am'){
				time1.value= 16;
				time2.value= 68;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;
				time1.value=1;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";
		
			}else if (time2_int== 6 && am_pm_string2== 'am'){
				time1.value= 22;
				time2.value= 70;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;

				time1.value=1;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";
			
			}else if (time2_int== 7 && am_pm_string2== 'am'){
				time1.value= 27;
				time2.value= 70;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;
				time1.value=1;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";
		
			}else if (time2_int== 8 && am_pm_string2== 'am'){
				time1.value= 29;
				time2.value= 61;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;

				time1.value=1;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";
			
			}else if (time2_int== 9 && am_pm_string2== 'am'){
				time1.value= 30;
				time2.value= 55;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;
				time1.value=1;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";
			
			}else if (time2_int== 10 && am_pm_string2== 'am'){
				time1.value= 35;
				time2.value= 50;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;

				time1.value=1;
				time2.value=10;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";

			
			}else if (time2_int== 11 && am_pm_string2== 'am'){
				time1.value= 39;
				time2.value= 50;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;

				time1.value=1;
				time2.value=11;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";


			}else if (time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= 47;
				time2.value= 50;

				myChart.data.datasets[0].data[0]= 4;
				myChart.data.datasets[0].data[1]= time1.value-4;
				myChart.data.datasets[0].data[2]= time2.value-4;

				time1.value=1;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "11 hr 00 min";
			}
		}else if (time1_int == 2){ //from 2 am to 
			piePercent= (100/12)/2;
			myChart.data.datasets[0].data[0]= 8.33;

	
			if (time2_int== 3 && am_pm_string2== 'am'){
				time1.value= piePercent;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "1 hr 00 min";

			}else if (time2_int== 4 && am_pm_string2== 'am'){
				time1.value=piePercent*2+1;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "2 hr 00 min";
	
			}else if (time2_int== 5 && am_pm_string2== 'am'){
				time1.value= piePercent*3+1;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "3 hr 00 min";

			}else if (time2_int== 6 && am_pm_string2== 'am'){
				time1.value= piePercent*4+1;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";
		
			}else if (time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*5+2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";

			}else if (time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*6+2;
				time2.value= 100-time1.value;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";
	

			}else if (time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*7+1;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";
			
			}else if (time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*8+1;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=10;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";
		
			}else if (time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*9+3;
				time2.value=100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=11;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";

			}else if (time2_int== 11 && am_pm_string2== 'pm'){
				time1.value= piePercent*22 +3;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=11;
				

			}else if (time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= piePercent*10 +4;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";
			}
			else if (time2_int== 1 && am_pm_string2== 'pm'){
				time1.value= piePercent*12+2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=1;
				document.getElementById("numHours").innerHTML= "11 hr 00 min";
			}
			else if (time2_int== 2 && am_pm_string2== 'pm'){
				time1.value= piePercent*13+1;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=2;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";
			}
		}else if (time1_int == 3){
			piePercent= (100/12)/2;
			myChart.data.datasets[0].data[0]= 12.6;

			if (time2_int== 2 && am_pm_string2== 'pm'){
				time1.value= piePercent*13;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=2;

				document.getElementById("numHours").innerHTML= "11 hr 00 min";
			}else if (time2_int== 3 && am_pm_string2== 'pm'){
				time1.value= piePercent*14 +1;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";
			}else if (time2_int== 4 && am_pm_string2== 'am'){
				time1.value=piePercent*2-1;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "1 hr 00 min";

			}else if (time2_int== 5 && am_pm_string2== 'am'){
				time1.value= piePercent*3-1;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "2 hr 00 min";

			}else if (time2_int== 6 && am_pm_string2== 'am'){
				time1.value= piePercent*4-1;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "3 hr 00 min";
		
			}else if (time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*5+1;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";
	
			}else if (time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*6+1;
				time2.value= 100-time1.value;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";


			}else if (time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*7+2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";
	
			}else if (time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*8+2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=10;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";


			}else if (time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*9+2;
				time2.value=100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=11;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";

			
			}else if (time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= piePercent*10 +3;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";
			}
			else if (time2_int== 1 && am_pm_string2== 'pm'){
				time1.value= piePercent*11 +3;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=3;
				time2.value=1;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";
			}
		}else if (time1_int == 4){
			piePercent= (100/12)/2;
			myChart.data.datasets[0].data[0]= 20;

			if(time2_int== 2 && am_pm_string2== 'pm'){
				time1.value= piePercent*13;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";
			}else if (time2_int== 3 && am_pm_string2== 'pm'){
				time1.value= piePercent*14 +1;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "11 hr 00 min";
			}else if (time2_int== 4 && am_pm_string2== 'pm'){
				time1.value= piePercent*15 ;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";
				
			}else if (time2_int== 5 && am_pm_string2== 'am'){
				time1.value= piePercent*2-2;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "1 hr 00 min";
	
			}else if (time2_int== 6 && am_pm_string2== 'am'){
				time1.value= piePercent*3-2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "2 hr 00 min";
	
			}else if (time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*4-2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "3 hr 00 min";
	
			}else if (time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*5;
				time2.value= 100-time1.value;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";
	

			}else if (time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*6;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";
		
			}else if (time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*7+2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=10;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";

	
			}else if (time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*9-2;
				time2.value=100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=11;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";

			}else if (time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= piePercent*10 -1;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";
			}
			else if (time2_int== 1 && am_pm_string2== 'pm'){
				time1.value= piePercent*11 ;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=4;
				time2.value=1;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";
			}
			
		}else if (time1_int == 5){
			piePercent= (100/12)/2;
			myChart.data.datasets[0].data[0]= 25;

			if(time2_int== 1 && am_pm_string2== 'pm'){
				time1.value= piePercent*11-2;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";
			}else if(time2_int== 2 && am_pm_string2== 'pm'){
				time1.value= piePercent*12-2;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";
			}else if (time2_int== 3 && am_pm_string2== 'pm'){
				time1.value= piePercent*13;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";
			}else if (time2_int== 4 && am_pm_string2== 'pm'){
				time1.value= piePercent*14 ;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "11 hr 00 min";
			}else if (time2_int== 5 && am_pm_string2== 'pm'){
				time1.value= piePercent*15+2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";
			}else if (time2_int== 6 && am_pm_string2== 'am'){
				time1.value= piePercent*2-2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "1 hr 00 min";
	
			}else if (time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*3-2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "2 hr 00 min";

			}else if (time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*4;
				time2.value= 100-time1.value;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "3 hr 00 min";
	

			}else if (time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*5;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";

			}else if (time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*6+2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=10;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";

			}else if (time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*8-2;
				time2.value=100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=11;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";

			}else if (time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= piePercent*10 -2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=5;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";
			}
			
		}else if (time1_int == 6){
			piePercent= (100/12)/2;
			myChart.data.datasets[0].data[0]= 33;

			if(time2_int== 1 && am_pm_string2== 'pm'){
				time1.value= piePercent*10;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";
			}else if(time2_int== 2 && am_pm_string2== 'pm'){
				time1.value= piePercent*11;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";
			}else if (time2_int== 3 && am_pm_string2== 'pm'){
				time1.value= piePercent*12;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";
			}else if (time2_int== 4 && am_pm_string2== 'pm'){
				time1.value= piePercent*13+2 ;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";
			}else if (time2_int== 5 && am_pm_string2== 'pm'){
				time1.value= piePercent*15;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "11 hr 00 min";
			}else if (time2_int== 6 && am_pm_string2== 'pm'){
				time1.value= piePercent*16;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";
			}else if (time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*2-2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "1 hr 00 min";
		
			}else if (time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*3;
				time2.value= 100-time1.value;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "2 hr 00 min";
		

			}else if (time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*4;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "3 hr 00 min";
			
			}else if (time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*5+2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=10;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";

			}else if (time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*7-2;
				time2.value=100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=11;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";

			}else if (time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= piePercent*9 -2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=6;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";
			}
			/*
		}else if (time1_int == 7){
			piePercent= (100/12)/2;
			myChart.data.datasets[0].data[0]= 40;

			if(time2_int== 1 && am_pm_string2== 'pm'){
				time1.value= piePercent*9;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=1;
			}else if(time2_int == 2 && am_pm_string2== 'pm'){
				time1.value= piePercent*10;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=2;
			}else if (time2_int== 3 && am_pm_string2== 'pm'){
				time1.value= piePercent*12-3;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=3;
			}else if (time2_int== 4 && am_pm_string2== 'pm'){
				time1.value= piePercent*13;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=4;
			}else if (time2_int== 5 && am_pm_string2== 'pm'){
				time1.value= piePercent*14;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=5;
			
			}else if (time2_int== 6 && am_pm_string2== 'pm'){
				time1.value= piePercent*16;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				// output to the screen
				time1.value=7;
				time2.value=6;
			
			}else if (time2_int== 7 && am_pm_string2== 'pm'){
				time1.value= piePercent*17;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=7;
			}else if (time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*2-2;
				time2.value= 100-time1.value;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=8;
			}else if (time2_int== 8 && am_pm_string2== 'pm'){
				time1.value= piePercent*18+2;
				time2.value= 100-time1.value;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=8;

			}else if (time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*3;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=9;
			}else if (time2_int== 9 && am_pm_string2== 'pm'){
				time1.value= piePercent*20;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=9;
			}else if (time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*5-1;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=10;

			}else if (time2_int== 10 && am_pm_string2== 'pm'){
				time1.value= piePercent*21;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=10;
			}else if (time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*6-1;
				time2.value=100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=11;

			}else if (time2_int== 11 && am_pm_string2== 'pm'){
				time1.value= piePercent*22;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=11;
			}else if (time2_int== 12 && am_pm_string2== 'am'){
				time1.value= piePercent*23+4;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=12;

			}else if (time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= piePercent*8-2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=7;
				time2.value=12;
			}
		}else if (time1_int == 8){
			piePercent= (100/12)/2;
			myChart.data.datasets[0].data[0]= 50;

			if(time2_int== 1 && am_pm_string2== 'pm'){
				time1.value= piePercent*8;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=1;
			}else if(time2_int == 2 && am_pm_string2== 'pm'){
				time1.value= piePercent*9;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=2;
			}else if (time2_int== 3 && am_pm_string2== 'pm'){
				time1.value= piePercent*11;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=3;
			}else if (time2_int== 4 && am_pm_string2== 'pm'){
				time1.value= piePercent*12;
				time2.value= 100-time1.value;

				
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=4;
			}else if (time2_int== 5 && am_pm_string2== 'pm'){
				time1.value= piePercent*14;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=5;
			
			}else if (time2_int== 6 && am_pm_string2== 'pm'){
				time1.value= piePercent*15;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=6;
			
			}else if (time2_int== 7 && am_pm_string2== 'pm'){
				time1.value= piePercent*16+2;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=7;
		
			}else if (time2_int== 8 && am_pm_string2== 'pm'){
				time1.value= piePercent*18;
				time2.value= 100-time1.value;
				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=8;

			}else if (time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*2-1;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=9;
			}else if (time2_int== 9 && am_pm_string2== 'pm'){
				time1.value= piePercent*19;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=9;
			}else if (time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*3;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=10;

			}else if (time2_int== 10 && am_pm_string2== 'pm'){
				time1.value= piePercent*21;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=10;
			}else if (time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*4+2;
				time2.value=100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=11;

			}else if (time2_int== 11 && am_pm_string2== 'pm'){
				time1.value= piePercent*22;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=11;
			}else if (time2_int== 12 && am_pm_string2== 'am'){
				time1.value= piePercent*23+4;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=12;

			}else if (time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= piePercent*6;
				time2.value= 100-time1.value;

				myChart.data.datasets[0].data[1]= time1.value;
				myChart.data.datasets[0].data[2]= time2.value;

				time1.value=8;
				time2.value=12;
			}
			*/
		}
	}else if( am_pm_string1 == 'pm'){
		myChart.data.datasets[0].backgroundColor[0]= 'rgba(54,162,235,0.2)'; //the first pie section is blue.
		myChart.data.datasets[0].borderColor[0]= 'rgba(54,162,235,0.2)';

		myChart.data.datasets[0].borderColor[1]='rgba(255, 99, 132, 0.2)'; //second section is orange
		myChart.data.datasets[0].backgroundColor[1]='rgba(255, 99, 132, 0.2)'; //second section is orange

		myChart.data.datasets[0].backgroundColor[2]= 'rgba(54,162,235,0.2)'; //the last/third pie section is blue.
		myChart.data.datasets[0].borderColor[2]= 'rgba(54,162,235,0.2)';

	
		if(time1_int == 11){
			piePercent= 4.3333334;
			myChart.data.datasets[0].data[2]= piePercent;//starting at 11, last piePercent 
			var timePm;

			if(time2_int== 12 && am_pm_string2== 'am'){
				time1.value= 0;
				timePm= 0;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "1 hr 00 min";

			}else if(time2_int== 1 && am_pm_string2== 'am'){
				time1.value=piePercent;
				timePm= piePercent;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=1;
				document.getElementById("numHours").innerHTML= "2 hr 00 min";

			}else if(time2_int== 2 && am_pm_string2== 'am'){
				time1.value= piePercent*2;
				timePm= piePercent*2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "3 hr 00 min";

			}else if(time2_int== 3 && am_pm_string2== 'am'){
				time1.value= piePercent*3;
				timePm= piePercent*3;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";

			}else if(time2_int== 4 && am_pm_string2== 'am'){
				time1.value= piePercent*4;
				timePm= piePercent*4;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";

			}else if(time2_int== 5 && am_pm_string2== 'am'){
				time1.value= piePercent*5;
				timePm= piePercent*5;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";

			}else if(time2_int== 6 && am_pm_string2== 'am'){
				time1.value= piePercent*6;
				timePm= piePercent*6;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";

			}else if(time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*7;
				timePm= piePercent*7;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";

			}else if(time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*8;
				timePm= piePercent*8;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";

			}else if(time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*9;
				timePm= piePercent*9;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";

			}else if(time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*10;
				timePm= piePercent*10;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=10;
				document.getElementById("numHours").innerHTML= "11 hr 00 min";

			}else if(time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*11-2;
				timePm= piePercent*11-2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=11;
				time2.value=11;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";

			}

		}else if(time1_int == 10){
			piePercent= 4.3333334;
			myChart.data.datasets[0].data[2]= piePercent*2;//starting at 10
			
			var timePm;

			if(time2_int== 12 && am_pm_string2== 'am'){
				time1.value= 0;
				timePm= 0;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "2 hr 00 min";

			}else if(time2_int== 1 && am_pm_string2== 'am'){
				time1.value=piePercent;
				timePm= piePercent;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=1;
				document.getElementById("numHours").innerHTML= "3 hr 00 min";

			}else if(time2_int== 2 && am_pm_string2== 'am'){
				time1.value= piePercent*2;
				timePm= piePercent*2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";

			}else if(time2_int== 3 && am_pm_string2== 'am'){
				time1.value= piePercent*3;
				timePm= piePercent*3;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";

			}else if(time2_int== 4 && am_pm_string2== 'am'){
				time1.value= piePercent*4;
				timePm= piePercent*4;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";

			}else if(time2_int== 5 && am_pm_string2== 'am'){
				time1.value= piePercent*5;
				timePm= piePercent*5;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";

			}else if(time2_int== 6 && am_pm_string2== 'am'){
				time1.value= piePercent*6;
				timePm= piePercent*6;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";

			}else if(time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*7;
				timePm= piePercent*7;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";

			}else if(time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*8;
				timePm= piePercent*8;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";

			}else if(time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*9;
				timePm= piePercent*9;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "11 hr 00 min";

			}else if(time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*10;
				timePm= piePercent*10;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=10;
				time2.value=10;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";
			}
		}else if(time1_int == 9){
			piePercent= 4.3333334;
			myChart.data.datasets[0].data[2]= piePercent*3+2;
	
			var timePm;


			if(time2_int== 12 && am_pm_string2== 'am'){
				time1.value= 0;
				timePm= 0;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "3 hr 00 min";

			}else if(time2_int== 1 && am_pm_string2== 'am'){
				time1.value=piePercent+2;
				timePm= piePercent+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=1;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";
			}else if(time2_int== 2 && am_pm_string2== 'am'){
				time1.value= piePercent*2+1;
				timePm= piePercent*2+1;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";

			}else if(time2_int== 3 && am_pm_string2== 'am'){
				time1.value= piePercent*3+1;
				timePm= piePercent*3+1;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";

			}else if(time2_int== 4 && am_pm_string2== 'am'){
				time1.value= piePercent*4+2;
				timePm= piePercent*4+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";

			}else if(time2_int== 5 && am_pm_string2== 'am'){
				time1.value= piePercent*5+2;
				timePm= piePercent*5+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";

			}else if(time2_int== 6 && am_pm_string2== 'am'){
				time1.value= piePercent*6+2;
				timePm= piePercent*6+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";

			}else if(time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*7+2;
				timePm= piePercent*7+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";

			}else if(time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*8+2;
				timePm= piePercent*8+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=8;

				document.getElementById("numHours").innerHTML= "11 hr 00 min";

			}else if(time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*9+2;
				timePm= piePercent*9+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=9;
				time2.value=9;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";

			}
		}else if(time1_int == 8){
			piePercent= 4.3333334;
			myChart.data.datasets[0].data[2]= piePercent*4+2;
	
			var timePm;


			if(time2_int== 12 && am_pm_string2== 'am'){
				time1.value= 0;
				timePm= 0;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "4 hr 00 min";

			}else if(time2_int== 1 && am_pm_string2== 'am'){
				time1.value=piePercent+2;
				timePm= piePercent+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=1;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";

			}else if(time2_int== 2 && am_pm_string2== 'am'){
				time1.value= piePercent*2+1;
				timePm= piePercent*2+1;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=2;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";

			}else if(time2_int== 3 && am_pm_string2== 'am'){
				time1.value= piePercent*3+1;
				timePm= piePercent*3+1;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "7 hr 00 min";

			}else if(time2_int== 4 && am_pm_string2== 'am'){
				time1.value= piePercent*4+2;
				timePm= piePercent*4+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";

			}else if(time2_int== 5 && am_pm_string2== 'am'){
				time1.value= piePercent*5+2;
				timePm= piePercent*5+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";

			}else if(time2_int== 6 && am_pm_string2== 'am'){
				time1.value= piePercent*6+3;
				timePm= piePercent*6+3;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";

			}else if(time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*8;
				timePm= piePercent*8;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "11 hr 00 min";

			}else if(time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*9;
				timePm= piePercent*9;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=8;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";

			/*
			}else if(time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*10;
				timePm= piePercent*10;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=9;

			}else if(time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*11;
				timePm= piePercent*11;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=10;

			}else if(time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*12;
				timePm= piePercent*12;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=11;

			}else if(time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= piePercent*13+1;
				timePm= piePercent*13+1;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=8;
				time2.value=12;
				*/
			}
		}else if(time1_int == 7){
			piePercent= 4.3333334;
			myChart.data.datasets[0].data[2]= piePercent*6;
	
			var timePm;


			if(time2_int== 12 && am_pm_string2== 'am'){
				time1.value= 0;
				timePm= 0;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=12;
				document.getElementById("numHours").innerHTML= "5 hr 00 min";

			}else if(time2_int== 1 && am_pm_string2== 'am'){
				time1.value=piePercent+2;
				timePm= piePercent+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=1;
				document.getElementById("numHours").innerHTML= "6 hr 00 min";

			}else if(time2_int== 2 && am_pm_string2== 'am'){
				time1.value= piePercent*2+1;
				timePm= piePercent*2+1;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=2;

				document.getElementById("numHours").innerHTML= "7 hr 00 min";
			}else if(time2_int== 3 && am_pm_string2== 'am'){
				time1.value= piePercent*3+1;
				timePm= piePercent*3+1;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=3;
				document.getElementById("numHours").innerHTML= "8 hr 00 min";

			}else if(time2_int== 4 && am_pm_string2== 'am'){
				time1.value= piePercent*4+2;
				timePm= piePercent*4+2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=4;
				document.getElementById("numHours").innerHTML= "9 hr 00 min";

			}else if(time2_int== 5 && am_pm_string2== 'am'){
				time1.value= piePercent*6;
				timePm= piePercent*6;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=5;
				document.getElementById("numHours").innerHTML= "10 hr 00 min";

			}else if(time2_int== 6 && am_pm_string2== 'am'){
				time1.value= piePercent*7;
				timePm= piePercent*7;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=6;
				document.getElementById("numHours").innerHTML= "11 hr 00 min";

			}else if(time2_int== 7 && am_pm_string2== 'am'){
				time1.value= piePercent*9-2;
				timePm= piePercent*9-2;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=7;
				document.getElementById("numHours").innerHTML= "12 hr 00 min";

				/*

			}else if(time2_int== 8 && am_pm_string2== 'am'){
				time1.value= piePercent*10-1;
				timePm= piePercent*10-1;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=8;

			}else if(time2_int== 9 && am_pm_string2== 'am'){
				time1.value= piePercent*11-1;
				timePm= piePercent*11-1;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=9;

			}else if(time2_int== 10 && am_pm_string2== 'am'){
				time1.value= piePercent*12;
				timePm= piePercent*12;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=10;

			}else if(time2_int== 11 && am_pm_string2== 'am'){
				time1.value= piePercent*13;
				timePm= piePercent*13;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=11;

			}else if(time2_int== 12 && am_pm_string2== 'pm'){
				time1.value= piePercent*14;
				timePm= piePercent*14;
				time2.value= 100- (piePercent+timePm); 


				myChart.data.datasets[0].data[0]= time1.value;
				myChart.data.datasets[0].data[1]= time2.value;

				time1.value=7;
				time2.value=12;

			*/
			}
			else {
				document.getElementById("invalid").innerHTML="* Please enter valid times.";
				//document.getElementById("numHours").innerHTML= "none";
				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= 100;
				myChart.data.datasets[0].data[2]= 0;
			}
		}
		else {
			
			document.getElementById("invalid").innerHTML="* Please enter valid times.";
				//document.getElementById("numHours").innerHTML= "none";
				myChart.data.datasets[0].data[0]= 0;
				myChart.data.datasets[0].data[1]= 100;
				myChart.data.datasets[0].data[2]= 0;
		}
	}
	
	
	//value1.value= 8; //to output on the screen 
	myChart.update();
	
}
/*
myChart.data.datasets[0].backgroundColor[0]= 'rgba(54,162,235,0.2)'; // the first section is blue alone with the second one
myChart.data.datasets[0].borderColor[0]= 'rgba(54,162,235,0.2)';
*/


function show_sleep_chart(){

	var dat = new google.visualization.DataTable();
    dat.addColumn('date', 'Date');
    dat.addColumn('number', 'Quantity');

	//Dummy data
    dat.addRow([new Date(2021, 0, 1), 5])
    dat.addRow([new Date(2021, 0, 2), 6])
	dat.addRow([new Date(2021, 0, 3), 5])
	dat.addRow([new Date(2021, 0, 4), 7])
    dat.addRow([new Date(2021, 0, 5), 7.5])
	dat.addRow([new Date(2021, 0, 6), 9])
    dat.addRow([new Date(2021, 0, 7), 4])

    // Create and draw the visualization.
    var chart = new google.visualization.ScatterChart(
        document.getElementById('sleep_chart'));
    chart.draw(dat, {title: 'Time spent sleeping',
                      width: 500, height: 200,
                      vAxis: {title: "Hours", titleTextStyle: {color: "green"}},
                      hAxis: {title: "Days", titleTextStyle: {color: "green"}},
                      lineWidth: 1}
              );



}