//User settable parameters, just the three below

//Recommended amount of daily water, in glasses
const DAILY_RECOMMENDED_WATER = 20;

// This percent of the glass will be until where the glass will fill. If any padding/border values of the glass change, this will have to be re-adjusted
const TOP_MARKING = 80; //Percent

const NUMBER_OF_MEASUREMENTS = 10; //Number of "readings" along the side of the glass

//******************************************************************************************************************************************/

//Variable for tracking how much the glass is full, in percent
var current_percent = 0; 

//Depending on DAILY_RECOMMENDED_WATER and NUMBER_OF_MEASUREMENTS, this is a measurement value displayed by the side of the glass
var ADJUSTED_STEP_VALUE_MEASUREMENT = Math.ceil((DAILY_RECOMMENDED_WATER * 1.0) / NUMBER_OF_MEASUREMENTS);

//This is the highest measurement value displayed by the side of the glass
var ADJUSTED_MAX_VALUE_MEASUREMENT = ADJUSTED_STEP_VALUE_MEASUREMENT * NUMBER_OF_MEASUREMENTS;

//Variable tracking if the initialization of the water page has been complete, initially set to false
var water_init_complete = false;

//Variable tracking if a weekly display of the water chart is shown or not. Initially, there is a weekly display
var weekly_display = true;

//Hard-coded values for water consumed. Key is in yyyy-mm-dd format. Essentially a hard-coded database
const water_database = 
{
	"2021-11-16": 18,
	"2021-11-17": 20,
	"2021-11-18": 19,
	"2021-11-19": 6
};

/*
Purpose: Initializes the water page
Parameters: None
Return: None
*/
function init_water_page()
{
    water_init_complete = false

	//Display the line at which the recommended amount is
	set_recommended_line();

	//Initialize the glass and quantity
	init_glass(current_date, false);

	//Initialize measurements on the side of the glass
	if (!water_init_complete)
	{
		init_measurements();
	}

	//Set the display max to the calculated max
	document.getElementById("quantity_display_number").max = ADJUSTED_MAX_VALUE_MEASUREMENT;

    //Initialize the togglebutton for the weekly/monthly display of the water chart
	toggle_water_chart_init();

	water_init_complete = true;
}

/*
Purpose: Initializes the togglebuttons for weekly/monthly display of the water chart.
Parameters: None
Return: None
*/
function toggle_water_chart_init()
{
    var instance = new ButtonStrip({
		id: 'buttonStrip-demo',
	});

	instance.addButton('Last Week', true, 'click', function()
	{
		weekly_display = true;
		draw_water_chart();
	});

	instance.addButton('Last month', false, 'click', function()
	{
		weekly_display = false;
		draw_water_chart();
	});

	instance.append('#content');
}

/*
Purpose: To retrieve the amount of water consumed for the selected date and set the glass's level and display accordingly
Parameters: date (The selected date)
Return: None
*/
function init_glass(date, called_by_change_date)
{
	if (called_by_change_date)
	{
		showLoadingScreen();
	}

    //Retrieve amount from database
	var amount = get_value_from_database(date);

    //If the value for the selected data doesn't exist within the database, it is zero
	if (amount === undefined)
	{
		amount = 0;
	}

    //Set the display
	document.getElementById("quantity_display_number").value = "" + amount;

    //Actually set the level of water within the glass
	handleLevelChange(amount, called_by_change_date);
}

/*
Purpose: To retrieve amount of water consumed for a particular date from the database
Parameters: date (Date object)
Return: The amount of water consumed for a particular date. If no entry exists, "undefined" is returned
*/
function get_value_from_database(date)
{
	key = moment(date).format("YYYY-MM-DD");
	return water_database[key];
}

/*
Purpose: To set the amount of water consumed for a particular in the database
Parameters: date (Date object) (The date to which the amount corresponds to)
            value (numeric) (Amount of water consumed)
Return: None
*/
function set_value_in_database(date, value)
{
    
	key = moment(date).format("YYYY-MM-DD");
	water_database[key] = value;

	//Whenever database value updates, update graph as well
	draw_water_chart();
}

/*
Purpose: To initialize the measurement values on the side of the glass
Parameters: None
Return: None
*/
function init_measurements()
{
	for (let i = 1 ; i <= NUMBER_OF_MEASUREMENTS ; i++)
	{
		// Initialize the marking
		var marking= document.createElement("water_marking_" + i);
		marking.id = ("water_marking_" + i);

		// Set the marking parameters
		marking.style.position = 'absolute';
		marking.style.fontSize = '20px';
		marking.style.fontWeight = "bold";
		marking.style.zIndex = 1;
		marking.style.right = "0%";
		marking.style.bottom = (TOP_MARKING * 1.0 * i / NUMBER_OF_MEASUREMENTS) + "%";
		marking.style.transform = "translate(105%,0)";
		marking.style.userSelect = "none";
		marking.style.backgroundColor = 'rgba(255, 0, 0, 0)';
		marking.textContent = (i * ADJUSTED_STEP_VALUE_MEASUREMENT) + " glasses";
		marking.style.fontFamily = "Calibri, sans-serif";

		//Add to display
		glass.appendChild(marking);
	}
}

/*
Purpose: To change the amount of water within the glass
Parameters: value (numeric) (The amount (in glasses) to which the level must be set)
Return: None
*/
function handleLevelChange(value, called_by_change_date)
{
	//Set the glass level
	setLevel(value * 100.00 / ADJUSTED_MAX_VALUE_MEASUREMENT, false, called_by_change_date);
}

/*
Purpose: To change the measurement values on the side of the glass. Call this when the glass gets too full or too empty
Parameters: increase_capacity (boolean) (True if the glass capacity must be increased. False otherwise)
Return: None
*/
function change_measurements(increase_capacity)
{
	showLoadingScreen();

    //Establish a basis upon which the new measurement values will be based on
	var basis = ADJUSTED_MAX_VALUE_MEASUREMENT;

	if (!increase_capacity)
	{
		basis = ADJUSTED_STEP_VALUE_MEASUREMENT;
	}

	//Determine what the current number of glasses consumed are
	var current_value = (current_percent / 100.0 ) * ADJUSTED_MAX_VALUE_MEASUREMENT;

	//Re-determine the step and max value measurements
	ADJUSTED_STEP_VALUE_MEASUREMENT = Math.round(2.0 * basis / NUMBER_OF_MEASUREMENTS);

	if (ADJUSTED_STEP_VALUE_MEASUREMENT < Math.ceil((DAILY_RECOMMENDED_WATER * 1.0) / NUMBER_OF_MEASUREMENTS))
	{
		ADJUSTED_STEP_VALUE_MEASUREMENT = Math.ceil((DAILY_RECOMMENDED_WATER * 1.0) / NUMBER_OF_MEASUREMENTS);
	}
	ADJUSTED_MAX_VALUE_MEASUREMENT = NUMBER_OF_MEASUREMENTS * ADJUSTED_STEP_VALUE_MEASUREMENT;

	//Re-populate the measurements
	for (let i = 1 ; i <= NUMBER_OF_MEASUREMENTS ; i++)
	{
		var element = document.getElementById("water_marking_" + i);
		element.textContent = (i * ADJUSTED_STEP_VALUE_MEASUREMENT) + " glasses";
	}

    //Set the display max to the new value that was just determined
	document.getElementById("quantity_display_number").max = ADJUSTED_MAX_VALUE_MEASUREMENT;

	//Set the water level accordingly as the measurement values are now different
	setLevel(current_value * 100.0 /ADJUSTED_MAX_VALUE_MEASUREMENT, true, false);
}

/*
Purpose: To change the amount of water within the glass
Parameters: target_percent (numeric) (Percentage to which the level must be set)
            called_by_change_measurements (boolean) (True if this function was called by change_measurements(). False otherwise)
Return: None
*/
function setLevel(target_percent, called_by_change_measurements, called_by_change_date)
{
    //Check that a valid percentage has been indicated
	if (0 <= target_percent <= 100)
	{
        //Disable the display
		document.getElementById("quantity_display_number").disabled = true;

        //The liquid will not be "hidden" if the percent level is > 0%
		if (current_percent < target_percent && target_percent > 0)
		{
			liquid.classList.remove('liquid--hidden');
		}

		setTimeout(() => {

			const interval = setInterval(() => 
			{
                //Determine whether the water level will go up or down. True if it will go up, false otherwise
				var increase_level = target_percent > current_percent;

                //The level gets to within 0.5%
				if (Math.abs(target_percent - current_percent) < 0.5)
				{	//stop criteria

					clearInterval(interval);

					if (!called_by_change_measurements)
					{
                        //Update value within the database about the new value
						set_value_in_database(current_date, target_percent * ADJUSTED_MAX_VALUE_MEASUREMENT / 100.0);
                        //Check if the water level is too full/to empty and re-level accordingly
                        if (current_percent >= 90)
						{
							change_measurements(true);
						}
						else if (current_percent <= 10 && ADJUSTED_MAX_VALUE_MEASUREMENT > DAILY_RECOMMENDED_WATER)
						{
							change_measurements(false);
						}	
					}

                    //If the water level gets to 0%, "hide" the water 
					if (current_percent <= 0)
					{ 
						liquid.classList.add('liquid--hidden');
					}

                    //Enable the display once everything is done
					document.getElementById("quantity_display_number").disabled = false;

                    //Re-set the recommended line if the measurements end up changing
					if (called_by_change_measurements || called_by_change_date)
					{
						set_recommended_line();
						unshowLoadingScreen();
					}
				}

                //This is the "animation" part. Slowly increase/decrease the water level to simulate animation
				if (increase_level && target_percent > current_percent)
				{
					if (current_percent < 100)
					{
						current_percent += 0.5;
					}
				}
				else
				{
					if (current_percent > 0)
					{
						current_percent -= 0.5;
					}
				}
				liquid.style.transform = `translate(0, +${(100 - current_percent)}%)`;

			}, 20);
		}, 50);
	}
}

/*
Purpose: To draw the graph displaying amount of water consumed by the user
Parameters: None
Return: None
*/
function draw_water_chart()
{
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(draw_water_chart_helper);
}

/*
PURPOSE: To help draw the graph displaying amount of water consumed by the user
Parameters: None
Return: None
*/
function draw_water_chart_helper()
{
	var data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Quantity');

    start_date = current_date;

    if (weekly_display)
    {
        start_date = new Date(current_date.valueOf() - (7 * 24 * 60 * 60 * 1000))
    }
    else
    {
		start_date = new Date(current_date.valueOf() - (31 * 24 * 60 * 60 * 1000));
    }

    var array_of_dates = getDates(start_date, current_date);

    for (var k in array_of_dates)
	{
        var qty = get_value_from_database(array_of_dates[k]);
        data.addRow([array_of_dates[k], qty == undefined ? 0 : qty]);
    }

    var min_v_axis = data.getColumnRange(1).min;
    var max_v_axis = data.getColumnRange(1).max;

    if (min_v_axis < 0)
    {
        min_v_axis = 0;
    }

    if (min_v_axis === 0 && min_v_axis === max_v_axis)
    {
        max_v_axis = 2;
    }

    // Create and draw the visualization.
    var chart = new google.visualization.ScatterChart(
        document.getElementById('water_chart'));
    chart.draw(data, {title: 'Weekly water consumption',
                      width: 700, height: 300,
                      vAxis: {title: "Glasses", titleTextStyle: {color: "green"}, viewWindow: {min: min_v_axis, max: max_v_axis}},
                      hAxis: {title: "Days", titleTextStyle: {color: "green"}, viewWindow: {min: start_date, max: current_date}},
                      lineWidth: 1}
              );
}

/*
Purpose: To set the height of the line indicating the recommended amount of water consumption
Parameters: None
Return: None
*/
function set_recommended_line()
{
	var line = document.getElementById("recommended_line_water");
	var label =  document.getElementById("recommended_label");

	var bottom = (DAILY_RECOMMENDED_WATER * 1.0 * TOP_MARKING / ADJUSTED_MAX_VALUE_MEASUREMENT) + "%";

	label.textContent = "Daily Recommended\n(" + DAILY_RECOMMENDED_WATER + " glasses)";
	line.style.bottom = bottom;
	label.style.bottom = bottom;
}

/*
Purpose: To get an array of date objects between two specific dates
Parameters: startDate, endDate (Date objects)
Return: An array of date objects
*/
function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) 
    {
        dateArray.push(new Date (currentDate));
        var date = new Date(currentDate.valueOf());
        date.setDate(date.getDate() + 1);
        currentDate = date;
    }
    return dateArray;
}

function showLoadingScreen()
{
	document.getElementById("water").style.opacity = 0.5;
	document.getElementById("topbar").style.opacity = 0.5;
	document.getElementById("sidebar").style.opacity = 0.5;
	document.getElementById("generalInfo").style.opacity = 0.5;
	document.getElementById("bottomBar").style.opacity = 0.5;
	document.getElementById("loader").style.visibility = "visible";
	document.getElementById("plansButton").disabled = true;
	document.getElementById("mealsButton").disabled = true;
	document.getElementById("waterButton").disabled = true;
	document.getElementById("sleepButton").disabled = true;
	document.getElementById("exerciseButton").disabled = true;
	document.getElementById("appNameButton").disabled = true;
	document.getElementById("genInfToggle").disabled = true;
	document.getElementById("start").disabled = true;
	document.getElementById("quantity_display_number").style.visibility = "hidden";

}

function unshowLoadingScreen()
	{document.getElementById("water").style.opacity = 1;
	document.getElementById("topbar").style.opacity = 1;
	document.getElementById("sidebar").style.opacity = 1;
	document.getElementById("generalInfo").style.opacity = 1;
	document.getElementById("bottomBar").style.opacity = 1;
	document.getElementById("loader").style.visibility = "hidden";
	document.getElementById("plansButton").disabled = false;
	document.getElementById("mealsButton").disabled = false;
	document.getElementById("waterButton").disabled = false;
	document.getElementById("sleepButton").disabled = false;
	document.getElementById("exerciseButton").disabled = false;
	document.getElementById("appNameButton").disabled = false;
	document.getElementById("genInfToggle").disabled = false;
	document.getElementById("start").disabled = false;
	document.getElementById("quantity_display_number").style.visibility = "visible";
}