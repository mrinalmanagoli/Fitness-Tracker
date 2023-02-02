class Exercise{
	
	#_name; 
	#_sets; //how many times exercise was repeated
	#_calsBurned; //calories burned 

	constructor(n, s, c){
		if(constructor === Exercise){ //if this is a hashable constructor, throw an error
		  throw new Error("not allowed instances of abstract class: Exercise");
		}//end if
		else{ //if not, initialize as usual
		    this.#_name=n;
	    	this.#_sets=s;
			this.#_calsBurned=c;
		}//end else
	}//end constructor
	
	get name(){
		return (this.#_name);
	}//end get name
	
	get sets(){
		return (this.#_sets);
	}//end get sets
	
	get calsBurned(){
		return (this.#_calsBurned);
	}//end get calsBurned
	
	set sets(s){
		this.#_sets=s;
	}//end set sets
	
	set calsBurned(c){
		this.#_calsBurned=c;
	}//end set calsBurned
	
}//end class Exercise

class WeightExercise extends Exercise{
	
	#_weight; //weight used
	#_reps; //repetitions
	
	constructor(n,s,c,w,r){
		super(n,s,c);
		this.#_weight=w;
		this.#_reps=r;
	}//end constructor
	
	get weight(){
		return (this.#_weight);
	}//end get weight
	
	get reps(){
		return (this.#_reps);
	}//end get reps
	
	set weight(w){
		this.#_weight=w;
	}//end set weight
	
	set reps(r){
		this.#_reps=r;
	}//end set reps
	
}//end class WeightExercise

class CardioExercise extends Exercise{
	
	#_duration; //time spent doing the activity
	
	constructor(n, s, c, d){
		super(n,s,c);
		this.#_duration=d;
	}//end constructor
	
	get duration(){
		return (this.#_duration);
	}//end get duration
	
	set duration(d){
		this.#_duration=d;
	}//end set duration
	
}//end class cardioExercise

class Routine{
	
	#_name; //name of routine
	#_activities; //list of activities for the routine
	
	#_showingActivities; //for the actual interface, keeping track if the ui is showing the activities to the user or not
	#_showingDeletion; //same for ^ but if showing the deleting options 
	
	#_firstShow; //first time showing activities, need to create some stuff
	
	
	constructor(n){
		this.#_name=n;
		this.#_activities=[]; //create empty array
		
		this.#_showingActivities = false; //init
		this.#_showingDeletion = false;
		
		this.#_firstShow=true;//it would be it's first time showing it's activities
		
	}//end constructor
	
	get name(){
		return (this.#_name);
	}//end get name
	
	set name(n){
		this.#_name=n;
	}//end set name
	
	getActivities(){//returns hard copy of the activities array
		let ret=[]; //hard copied array to return
		
		if(this.#_activities.length > 0)//(this.#_activities[0] != undefined)//if array non empty
			for(let i=0; i < this.#_activities.length; i++)
				ret.push(this.#_activities[i]);
		
		
		return ret;
	}//end getActivities
	
	get length(){//just returns length of array of exercises
		return this.#_activities.length;
	}//end get length
	
	
	addActivity(ex){
		if(ex != undefined && ex!=null) //make sure no undefined or null args passed
			this.#_activities.push(ex);//put the new routine at the back of the array
	}//end addActivity
	
	//uses arguments array
	editActivity(key, sets, calories){ //since the index in they array is unique, we can use that as a key. This is so users can have multiples of the same activity
	
		let activity; //activity to edit
		
		//for indexing args array
		const WEIGHT_INDX=3;
		const REPS_INDX=4;
		
		const DUR_INDX=WEIGHT_INDX; //same location in args array
		
		if(key < this.#_activities.length && key >= 0){ //if in bounds of array
	
			activity = this.#_activities[key]; //get activity
			
			//set parent instance variables
			activity.sets=sets;
			activity.calsBurned=calories;
			
			if(activity instanceof WeightExercise){//if weighted ex

				activity.weight = arguments[WEIGHT_INDX];
				activity.reps = arguments[REPS_INDX];
				
			}//end nested if
			
			else{//if cardio ex
				
				activity.duration = arguments[DUR_INDX];
				
			}//end nested else
	
		}//end if
		
	}//end editActivity
	
	deleteActivity(key){
		if(key < this.#_activities.length && key >= 0)
			this.#_activities.splice(key, 1); //start deleting at key, delete one element starting there (so delete key)
	}//end deleteActivity
	
	get showingActivities(){
		return this.#_showingActivities;
	}//end get showingActivities
	
	set showingActivities(b){
		this.#_showingActivities = b;
	}
	
	showToggle(){ //just toggles the bool
		this.#_showingActivities = !(this.#_showingActivities);
	}//end showToggle
	
	get firstShow(){
		return this.#_firstShow;
	}//end get firstShow
	
	doneFirstShow(){
		this.#_firstShow = false;
	}//end doneFirstShow
		
	get showingDeletion(){
		return (this.#_showingDeletion);
	}
	
	set showingDeletion(b){
		this.#_showingDeletion = b;
	}
	
	toggleDeletionShow(){
		this.#_showingDeletion = !this.showingDeletion;
	}
		
	
}//end class routine

class ExerciseDatabase{
	
	#_NAME_INDX = 0;
	#_CHR_INDX=1;
	#_CALS_INDX=2;
	
	#_WE = 'w'; //weighted exercise
	#_CE = 'c'; //cardio exercise
	
	//rows corespsond to arrays categorized by alphabet. 
	//Every element is just name plus cals burned per min / cals burned per rep. Given a baseline cals burned per rep/time unit
	//char saying if weighted or cardio.
	//tells system if a weighted exercise prompt or cardio prompt should be displayed
	//3d array
	#_exTable=
	[
	 [ ["ab rollout", this.#_CE, 4], ["archer pushups", this.#_CE, 5] ],
	 [ ["burpees", this.#_CE, 10], ["bike kicks", this.#_CE, 10], ["butt kicks", this.#_CE, 26], ["bench press", this.#_WE, 10], ["bicep curls", this.#_WE, 11] ],
	 [ ["crunches", this.#_CE, 10], ["crucifix",  this.#_CE, 10], ["crunch reach through", this.#_CE, 23], ["cross hammer curls", this.#_WE, 10] ],
	 [ ["diamond pushups" , this.#_CE, 69], ["deadlift", this.#_WE , 69], ["dumbell press", this.#_WE, 25], ["dumbell flys", this.#_WE, 12] ],
	 [ ["explosive negative pushups", this.#_CE, 10], ["elevated pushups", this.#_CE, 11], ] ,
	 [ ["fingertip pushups", this.#_CE, 69] ],
	 [ ["gymnastics", this.#_CE, 30] ],
	 [ ["half-burpees", this.#_CE, 35], ["headstand pushups", this.#_CE, 23], ["hammer curls", this.#_WE, 35] ],
	 [ ["incline pushups", this.#_CE, 10] ],
	 [ ["jumping jacks", this.#_CE, 10], ["jumping squats", this.#_CE, 76], ["jump rope", this.#_CE, 67] ],
	 [ ["knee taps", this.#_CE, 10] ],
	 [ ["l-sit", this.#_CE, 11], ["low plank to high plank", this.#_CE, 20], ["legs flutters", this.#_CE, 23], ["leg raises", this.#_CE ,23], ["lateral raises", this.#_WE, 11] ],
	 [ ["mountain climbers", this.#_CE, 12] ],
	 [ ["not doing anything", this.#_CE, 0] ],
	 [ ["overhead tricep extension", this.#_WE, 17] ], 
	 [ ["pseudo pushups", this.#_CE, 12], ["pull up", this.#_CE, 32], ["plank", this.#_CE, 23], ["plate pinch", this.#_WE, 12], ["preacher curls", this.#_WE, 13] ],
	 [ ["quitting", this.#_CE ,-420] ],
	 [ ["russian twists", this.#_CE, 42], ["reach ups", this.#_CE, 21], ["running", this.#_CE, 10] ],
	 [ ["situps", this.#_CE, 67], ["slo-mo pushups", this.#_CE, 76], ["star crunches", this.#_CE, 23], ["supinated wrist curls", this.#_WE, 67], ["squats", this.#_WE, 12],],
	 [ ["tricep dips", this.#_CE, 69], ["t-rex curls", this.#_WE, 69], ["tricep kickbacks", this.#_WE, 23], ["twisting dumbell press", this.#_WE, 25] ],
	 [ ["up ups", this.#_CE, -9999] ],
	 [ ["v-sit", this.#_CE, 80] ],
	 [ ["walking", this.#_CE, 26] ],
	 [ ["x", this.#_CE, 0] ],
	 [ ["y", this.#_CE, 0] ],
	 [ ["z", this.#_CE, 0] ]
	];
	
	
	getEx(strin){ //gets an array of exercises that start with a given sub-string. input string passed and turned lowercase
		let CHR_DIFF = 97; //lowercase chars start at ascii97 which is 'a'
		
		let sub = strin.toLowerCase(); //no capitals for the sub string	
		let row = sub.charCodeAt(0) - CHR_DIFF; //since rows are ascending alphabetical, it's just a "conversion" from ascii [97..122] space to [0..25] space

		let ret=[]; //return this
		
		for(let i=0; this.#_exTable[row]!=undefined && i < this.#_exTable[row].length; i++) //iterate through the items of the given row in the exercise table
			if(this.#_exTable[row][i][this.#_NAME_INDX].startsWith(sub)) //if this name starts with the substring
				ret.push(this.#_exTable[row][i]); //add it to the returning array			
		
		return ret;
	}//end getExNames
	
	get nameIndx(){
		return this.#_NAME_INDX;
	}//end get nameIndx
	
	get typeIndx(){
		return this.#_CHR_INDX;
	}//end get charIndx
	
	get calsIndx(){
		return this.#_CALS_INDX;
	}//end get calsIndx
	
	get weightsChar(){
		return this.#_WE;
	}//end get weightsChar
	
	get cardioChar(){
		return this.#_CE;
	}//end get cardioChar
	
}//end class ExerciseDatabase

class Feature{
	
	#_div; //div feature takes place in
	#_manager; //manager to report to
	
	constructor(d, m){
		if(constructor === Feature)
			throw new Error("not allowed instances of abstract class: Feature");
		else{
			this.#_div = d;
			this.#_manager = m;
		}//end else
	}//end constructor
	
	get div(){
		return this.#_div;
	}//end get div
	
	get manager(){
		return this.#_manager;
	}//end get manager
	
	//*********METHODS*********
	hideHTMLElement(htmlObj){
		//if(htmlObj!=null && htmlObj!=undefined)
			htmlObj.style.display = "none";
	}//end hideHTMLElement
		
	clearTextField(field){
		field.value = "";
	}//end clearTextField
	
	showHTMLElement(htmlObj){
		htmlObj.style.display = "initial";
	}//end showHTMLElement
	
	blockDisplayHTMLElement(htmlObj){
		htmlObj.style.display = "block";
	}//end blockDisplayHTMLElement
	
	getCSSHeight(htmlObj){
		return getComputedStyle(htmlObj).height;
	}//end getCSSHeight
	
	setCSSHeight(htmlObj, h){
		htmlObj.style.height = h;
	}//end setCSSHeight
	
	setOnClick(htmlObj, fn){
		htmlObj.onclick = fn;
	}//end setOnClick
	
	setLocation(element, position, width, height){
		let css = element.style;
		css.position = position;
		css.width = width;
		css.height = height;
	}//end setLocation
	
	newDiv(id, position, width, height, display){ //returns new div
		let ret = document.createElement("div");
		
		ret.setAttribute("id", id);
		this.setLocation(ret, position, width, height);

		if(display != undefined) {
			ret.style.display = display;
		    //console.log("{"+ret.style.display +", "+getComputedStyle(ret,null).display+"}" );
			//console.log(getComputedStyle(ret));
		}
		return ret;
	}//end newDiv
	
	newHeader(type, innerHTML, fontFamily, display, marginLeft, marginRight){
		let ret = document.createElement("h"+type);
		
		ret.innerHTML = innerHTML;
		
		ret.style.fontFamily = fontFamily;
		ret.style.display = display
		ret.style.marginLeft = marginLeft;
		ret.style.marginRight = marginRight;
		
		return ret;
	}//end newHeader
	
	newButton(innerHTML, display, onclick){
		let ret = document.createElement("button");
		
		ret.innerHTML = innerHTML;
		ret.style.display = display;
		this.setOnClick(ret, onclick);
		
		return ret;
	}//end newButton
	
	newParagraph(innerHTML, display){
		let ret = document.createElement("p");
		
		ret.innerHTML = innerHTML;
		ret.style.display = display;
		
		return ret;
	}//end newParagraph
	
	//id for the div, function for if yes, function for if no
	createDeletionDialogue(id, yfn, nfn){
		
		let dialogue = document.createElement("div"); //the deletion dialogue div
		
		dialogue.setAttribute("id", id);
		dialogue.appendChild(this.newHeader(5, "Are you sure?", "0%", "0%")); //header to ask user
		dialogue.append(this.newButton("Yes", "initial", function(){ yfn(); }));
		dialogue.append(this.newButton("No", "initial", function(){ nfn(); }));
		
		return dialogue;
	}//end createDeletionDialogue
	
	newField(id){
		let ret = document.createElement("input");
		
		ret.setAttribute("id", id);
		ret.setAttribute("name", id);
		ret.setAttribute("type", "text");
		
		return ret;
	}//end new field
				     //input obj , string, label obj
	setFieldProperties(fieldObj, text, label, labelContent){
		
		fieldObj.setAttribute("placeholder", text);
		label.setAttribute("for", fieldObj.getAttribute("id"));
		label.innerHTML = labelContent;
		
		fieldObj.style.width = "7%";
		
	}//end setFieldProperties
	
	          //id for field, text[], names[]
	createForm(id, textInFields, labelNames){
		let form = document.createElement("form");

		let fields =[];
		let labels =[];
		
		form.setAttribute("id",id);
		form.style.display = "inline";
		
		//assumed textInFields and labelNames are of equal length, and are the number of fields to make
		for(let i=0; i < textInFields.length; i++){
			fields[i] = this.newField(id+"field"+i); //assuming form id says "form#" or something like that
			labels[i] = document.createElement("label");
			
			this.setFieldProperties(fields[i], textInFields[i], labels[i], labelNames[i]);
			
			labels[i].style.marginLeft = "1%";
			fields[i].style.marginRight = "1%";
			
			form.appendChild(labels[i]);
			form.appendChild(fields[i]);
		}//end for
	
		form.style.marginTop = "1%";
		form.style.marginbottom = "1%";
		
		return form;
	
	}//end createForm
	
	createEditingDialogue(id, ex){
		let editingDiv = this.newDiv(id, "relative", "100%" ,"inheirt", "block");
		let exerciseProperties; //label names
		let exerciseValues; //text in the text fields
		
		if(ex instanceof WeightExercise){
			exerciseProperties = ["Sets", "Weight", "Reps"];
			exerciseValues = [ex.sets, ex.weight, ex.reps];
			
			editingDiv.appendChild(this.createForm("form"+id, exerciseValues, exerciseProperties));
		}//end if
		
		else if(ex instanceof CardioExercise){
			exerciseProperties = ["Sets", "Duration"];
			exerciseValues = [ex.sets, ex.duration];
			
			editingDiv.appendChild(this.createForm("form"+id, exerciseValues, exerciseProperties));
		}//end else
		
		return editingDiv;
		
	}//end create editing diaglouge		
	
}//abstract class for a tracking feature

//exercise adding area
class ExerciseAdder extends Feature{
		
		//text fields to use
		#_nameField;
		#_setsField;
		#_durationField;
		#_weightField;
		#_repsField;
		
		//confirmation button
		#_confirmButton;
		
		//dropdown menu list
		#_dropList;
	
	#_db; //databse of all exercises
	
	#_rtnMode; //if adding to routine instead of tracker
	#_rtnIndx; //for adding to the routine
	
	constructor(div, m){
		
		super(div, m);
		
		this.#_db = new ExerciseDatabase();
		
		this.#_nameField = document.getElementById("exNameField");
		this.#_setsField = document.getElementById("setsField");
		this.#_durationField = document.getElementById("durationField");
		this.#_weightField = document.getElementById("weightField");
		this.#_repsField = document.getElementById("repsField");
		
		this.#_confirmButton = document.getElementById("confirmAddExBtn");
		
		this.#_dropList = document.getElementById("exDropList");
		
		document.getElementById("exFields").style.display  = "none"; //don't show this at start
		
		this.#_rtnMode = false;
		this.#_rtnIndx=-1;
	}//end constructor
	
	//*************methods**************
	
	enableRtnMd(rIndex){
		
		this.#_rtnMode=true;
		this.#_rtnIndx=rIndex;
		console.log(rIndex + ", "+this.#_rtnIndx);
	}
	
	disableRtnMd(){
		this.#_rtnMode=false;
		this.#_rtnIndx=-1;
	}
	
	addWeightedToTracker(calUnit){
		let name = this.#_nameField.value;
		let	sets = this.#_setsField.value; 
		
		let weight = this.#_weightField.value;
		let reps = this.#_repsField.value;
		
		let cals = parseInt(calUnit) * parseInt(reps) * parseInt(sets);

	//	constructor(n, s, c, w, r)
	    let exerciseTracked = new WeightExercise(name, sets, cals, weight, reps);
		console.log(exerciseTracked);
		if(!this.#_rtnMode)
			super.manager.exerciseAdded(exerciseTracked);
		else
			super.manager.exerciseAddedToRoutine(exerciseTracked, this.#_rtnIndx);
	}//end addToTracker
	
	addCardioToTracker(calUnit){
		let name = this.#_nameField.value;
		let	sets = this.#_setsField.value; 
		
		let duration =  this.#_durationField.value;

		let cals = parseInt(calUnit) * parseInt(duration) * parseInt(sets);

	//	constructor(n, s, c, d)
		let exerciseTracked = new CardioExercise(name, sets, cals, duration);
		
		if(!this.#_rtnMode)
			super.manager.exerciseAdded(exerciseTracked);
		else
			super.manager.exerciseAddedToRoutine(exerciseTracked, this.#_rtnIndx);
		
	}//end addCardioToTracker
	
	get nameFieldValue(){
		return this.#_nameField.value;
	}//end get nameFieldValue
	
	get droplist(){
		return this.#_dropList;
	}
	
	clearDropList(){
		this.#_dropList.innerHTML = "";
	}//end clearDropList
	
	
	databaseSearch(s){
		return this.#_db.getEx(s);
	}//end databaseSearch
	
	hideDataEntry(){
		document.getElementById("exFields").style.display = "none";
		//document.getElementById("routineTrackBtn").style.display = "none";
		
		this.hideHTMLElement(this.#_setsField);
		this.hideHTMLElement(this.#_durationField);
		this.hideHTMLElement(this.#_weightField);
		this.hideHTMLElement(this.#_repsField);
		this.hideHTMLElement(this.#_confirmButton);
		
		document.getElementById("setsLabel").style.display = "none";
		document.getElementById("durationLabel").style.display = "none";
		document.getElementById("weightLabel").style.display = "none";
		document.getElementById("repsLabel").style.display = "none";
		
		this.clearTextField(this.#_setsField);
		this.clearTextField(this.#_durationField);
		this.clearTextField(this.#_weightField);
		this.clearTextField(this.#_repsField);
	}//end hideAllFields
	
	hideDiv(){//don't need it anymore, hide and revert
		this.hideHTMLElement(super.div);
		this.hideDataEntry();
		this.clearDropList();
		this.clearTextField(this.#_nameField); //clear name field 
	}//end hideDiv
	
	showDiv(){
		this.showHTMLElement(super.div);
		this.hideDataEntry(); //hide all, except -> (line below)
		this.showDataEntry('n'); //n for name field only, can literally be anything but w and c to show the name & routine track button
		this.showDataEntry();
			
	}//end showDiv
	
	showDataEntry(type){ //type is a char thats either w or c for weighted or cardio
		document.getElementById("exFields").style.display = "initial";	

		if(this.#_rtnMode)
			document.getElementById("routineTrackBtn").style.display = "none";
		else		
		document.getElementById("routineTrackBtn").style.display = "initial";		
		
		if(type === 'w'){
			document.getElementById("setsLabel").style.display = "initial";
			this.showHTMLElement(this.#_setsField);
			
			document.getElementById("repsLabel").style.display = "initial";
			this.showHTMLElement(this.#_repsField);
			document.getElementById("weightLabel").style.display = "initial";
			this.showHTMLElement(this.#_weightField);
		}//end if
		
		
		else if(type === 'c'){
			document.getElementById("setsLabel").style.display = "initial";
			this.showHTMLElement(this.#_setsField);
			
			document.getElementById("durationLabel").style.display = "initial";
			this.showHTMLElement(this.#_durationField);
		}//end else
		
	}//end showDataEntry
	
	exNameFieldTyped(myself){
		//let input = this.#_nameField.value;
		let input = myself.nameFieldValue;
	
		let content = myself.databaseSearch(input);
		/*function(){
			return this.#_db.getEx(input);
		}*/
		let names = []; //exercise names retrieved from content
	
		let option;
		
		//purge the datalist from last run/keystroke
	    //this.#_dropList.innerHTML ="";
		//this.droplist.innerHTML = "";
		this.clearDropList();
		
		this.hideDataEntry();
		
		if(content != undefined){//if theres content to work with 
			
			for(let i=0; i < content.length; i++)
				names.push(content[i][0]); //get names and put them in array (0 is name index)
	
			for(let i=0; i < names.length; i++){ //add names to html content
		
				if(!(input === names[i])){ //don't show a full name in the list
			
				option=document.createElement('option'); //create an option
				option.value=names[i]; //set value of option
				document.getElementById("exDropList").appendChild(option); //append it
			
				}//end nested if
		  
				else{//full name in list, get exercise type and setup div to take input from user correctly
		  
					if(content[i][1] === 'w'){//setup for weighted exercise (sorry for magic numbers/chars, didn't have time to mess with database and accessing it's private vars)
						this.showHTMLElement(this.#_setsField);
						this.showHTMLElement(this.#_weightField);
						this.showHTMLElement(this.#_repsField);
						
						this.showDataEntry('w');
						this.setOnClick(this.#_confirmButton, function(){myself.addWeightedToTracker(content[i][2])});
					}//end dnested if
			
					else{//setup for cardio exercise
						this.showHTMLElement(this.#_setsField);
						this.showHTMLElement(this.#_durationField);
						
						this.showDataEntry('c');
						this.setOnClick(this.#_confirmButton, function(){myself.addCardioToTracker(content[i][2])});
					}//end dnested else
			
					//show the add button
					this.showHTMLElement(this.#_confirmButton);
					break; //get out of here
				}//end nested else
			  
			}//end for
			
		}//end if
		
	}//end exNameFieldTyped
	
	
}//end class exercise adder

//routine management area
class RoutineManager extends Feature{
	
	//NEED:
	//routine creation area
	//routine list management
		#_rListDiv; //div with list of routines, editable
		#_rTrackDiv; //div with just list of routines to track
		
		#_rcDiv; //routine creation div
			#_rcName; //new routine created name
			#_rcActsDiv; //new rotuine activities list div
		
	#_routines; //list of routines
	
	constructor(div, m){
		super(div, m);
		this.setupTestRoutines();
		
		this.#_rListDiv = document.getElementById("routinesList"); //setup list div
		//this.setupRoutineList(this);
		
		this.#_rTrackDiv = document.getElementById("routineAdder");
		
		this.#_rcDiv = document.getElementById("routineCreator");
			this.#_rcName = document.getElementById("newRoutineNameField");
			this.#_rcActsDiv = document.getElementById("newRtnListDiv");
			
		super.div.appendChild(this.#_rListDiv);
		super.div.appendChild(this.#_rTrackDiv);
	}//end constructor
	
	//TESTING ONLY/VERT PROTOYPE USAGE	
    setupTestRoutines(){
	//	constructor(n, s, c, w, r)
	//	constructor(n, s, c, d)
	
	let r1,r2,r3,r4,r5,r6,r7,r8,r9,r10;
	r1 = new Routine("routine1");
	r1.addActivity(new WeightExercise("test press", 69, 69, 69, 69));
	r1.addActivity(new CardioExercise("test ups", 420, 420, 420));
	r1.addActivity(new CardioExercise("test ups2", 421, 421, 421));
	
	r2 = new Routine("routine2");
	r2.addActivity(new WeightExercise("test press", 69, 69, 69, 69));
	r2.addActivity(new CardioExercise("test ups", 420, 420, 420));
	
	r3 = new Routine("routine3");
	r3.addActivity(new WeightExercise("test press", 69, 69, 69, 69));
	r3.addActivity(new CardioExercise("test ups", 420, 420, 420));
	
	r4 = new Routine("routine4");
	r4.addActivity(new WeightExercise("test press", 69, 69, 69, 69));
	r4.addActivity(new CardioExercise("test ups", 420, 420, 420));
	
	r5 = new Routine("routine the 5th one");
	r5.addActivity(new WeightExercise("test press", 69, 69, 69, 69));
	r5.addActivity(new CardioExercise("test ups", 420, 420, 420));
	
	r6 = new Routine("6th routine in the list");
	r6.addActivity(new WeightExercise("test press", 69, 69, 69, 69));
	r6.addActivity(new CardioExercise("test ups", 420, 420, 420));
	
	r7 = new Routine("7_routine_7");
	r7.addActivity(new WeightExercise("test press", 69, 69, 69, 69));
	r7.addActivity(new CardioExercise("test ups", 420, 420, 420));
	
	r8 = new Routine("r8o8u8t8i8n8e");
	r8.addActivity(new WeightExercise("test press", 69, 69, 69, 69));
	r8.addActivity(new CardioExercise("test ups", 420, 420, 420));
	
	r9 = new Routine("nanoroutine");
	r9.addActivity(new WeightExercise("test press", 69, 69, 69, 69));
	r9.addActivity(new CardioExercise("test ups", 420, 420, 420));
	
	r10 = new Routine("routine out of 10");
	r10.addActivity(new WeightExercise("test press", 69, 68, 67, 66));
	r10.addActivity(new CardioExercise("test ups", 420, 421, 422));
	r10.addActivity(new CardioExercise("test downs", 420, 420, 420));
	r10.addActivity(new CardioExercise("test ups2", 420, 420, 420));
	
	this.#_routines = [r1,r2,r3,r4,r5,r6,r7,r8,r9,r10];
	}//end setupTestRoutines
	
	deleteRtnY(index){
		
		//let rtnDiv = document.getElementById(divId);
		
		this.#_routines.splice(index, 1); //take it out of there ffs
		
		this.setupRoutineList(this); //now that we've got rid of the routine, just reload the area/div
		
	}//end deletRtnY
	
	deleteRtnN(divId, index, xBtn, dialogue){
		
		let rtnDiv = document.getElementById(divId);
		
		//remove and revert
		rtnDiv.removeChild(dialogue);
		xBtn.style.visibility = "visible";
		rtnDiv.style.height = "100%";
		
		this.#_routines[index].showingDeletion = false;
		
	}//end deletRtnN
	
	deleteRtnPressed(divId, index, xBtn, myself){
		let rtnDiv = document.getElementById(divId);
		
		let deletionDialogue = super.createDeletionDialogue("delRtn"+index, 
		                                                    function(){myself.deleteRtnY(index)}, 
															function(){myself.deleteRtnN(divId, index, xBtn, deletionDialogue)});
		
		
		//purge if needed
		if(this.#_routines[index].showingActivities){
			rtnDiv.removeChild(document.getElementById("activities"+index));
			super.setCSSHeight(rtnDiv, "100%");
			
			this.#_routines[index].showingActivities = false; //not showing that anymore
		}//end if
		
		else if(!this.#_routines[index].showingDeletion){ //if we're not already showing this
			rtnDiv.style.height = "400%";
			xBtn.style.visibility="hidden";
			rtnDiv.appendChild(deletionDialogue);
		
			this.#_routines[index].showingDeletion = true;
		}//end else if
		
	}//end deletePressed
	
	disengageActEdit(rtnDiv, actDiv, dialogue, ex, btn, myself){
		actDiv.removeChild(dialogue);
		//myself.engageActEdit(rtnDiv, actDivs[i], activities[i], exNames[i], myself); 
		super.setOnClick(btn, function(){ myself.engageActEdit(rtnDiv, actDiv, ex,btn, myself ); } );
	}//end disengageActEdit
	
	confrimActEdit(rtnDiv, actDiv, dialogue, ex, btn, myself){
		let form = dialogue.getElementsByTagName("form")[0]; //crashes the program?
		//console.log(form);
		if(ex instanceof WeightExercise){//if feild not empty, set it
			if(form.getElementsByTagName("input")[0].value !== "") ex.sets = form.getElementsByTagName("input")[0].value;
			if(form.getElementsByTagName("input")[1].value !== "") ex.weight = form.getElementsByTagName("input")[1].value;
			if(form.getElementsByTagName("input")[2].value !== "") ex.reps = form.getElementsByTagName("input")[2].value;
		}//end if
		
		else if(ex instanceof CardioExercise){
			if(form.getElementsByTagName("input")[0].value !== "") ex.sets = form.getElementsByTagName("input")[0].value;
			if(form.getElementsByTagName("input")[1].value !== "") ex.duration = form.getElementsByTagName("input")[1].value;
		}//end else if

		myself.disengageActEdit(rtnDiv, actDiv, dialogue, ex, btn, myself); //don't need to edit anymore
	}//end confrimActEdit
	
	engageActEdit(rtnDiv, actDiv, ex, btn, myself){
		let dialogue = super.createEditingDialogue("edit"+actDiv.getAttribute("id"), ex);
		let newActHeight = parseFloat(actDiv.style.height) + 4 ;
		
		let confirmBtn = this.newButton("Done", "inline", function(){ myself.confrimActEdit(rtnDiv, actDiv, dialogue, ex, btn, myself); } );
		confirmBtn.style.marginLeft = "1%";
		confirmBtn.style.cursor = "pointer";
		
		dialogue.appendChild(confirmBtn);
	
		//MAKE THIS LOOK GOOD
		super.setCSSHeight(actDiv, newActHeight+"%");
		super.setCSSHeight(rtnDiv, parseFloat(rtnDiv.style.height) + newActHeight + "%");
		
		actDiv.appendChild( dialogue );
		
		super.setOnClick(btn, function(){ myself.disengageActEdit(rtnDiv, actDiv, dialogue,ex, btn, myself) } );
		
	}//end engageEditing
	
	deleteActY(rtnDiv, actDiv, actIndex, rIndex, toggleBtn){
		//delete the activity
		this.#_routines[rIndex].deleteActivity(actIndex);
		
		//RELOAD the toggle div
		toggleBtn.click();
		toggleBtn.click();

		
	}//end deleteActY
	
	deleteActN(rtnDiv, actDiv, xBtn, diaglouge){
		
		actDiv.removeChild(diaglouge);
		rtnDiv.style.height = parseFloat(rtnDiv.style.height)-250+"%";
		xBtn.style.visibility = "visible";
		
	}//end deleteActN
	
	deleteActPressed(rtnDiv, actDiv, actIndex, rIndex, xBtn, toggleBtn, myself){
		let deletionDialogue = super.createDeletionDialogue("delAct"+actIndex+"rtn"+rIndex, 
															function(){ myself.deleteActY(rtnDiv, actDiv, actIndex, rIndex, toggleBtn); },
															function(){ myself.deleteActN(rtnDiv, actDiv, xBtn, deletionDialogue); }
		);
		
		//add in code to remove the editing stuff if present in act div
		
		xBtn.style.visibility="hidden";
		rtnDiv.style.height = parseFloat(rtnDiv.style.height) + 250+"%";
		actDiv.appendChild(deletionDialogue);
	}//end deleteActPressed
	
	toggleShowActivities(index, rtnDiv, toggleBtn, myself){//when toggle is pushed, show the activities in the routine
		//purge if needed
		if(this.#_routines[index].showingDeletion){
			rtnDiv.removeChild(document.getElementById("delRtn"+index));
			super.setCSSHeight(rtnDiv, "100%");
			
			this.#_routines[index].showingDeletion = false; //not showing that anymore
		}//end if
	
		let activities = this.#_routines[index].getActivities();
		
		//let actsDivHeight = ( parseFloat(activities.length) * 10 )+"%";
		
		let actsDiv = super.newDiv("activities"+index, "relative", "100%", "inherit");//div to hold all activities in
		
		//HTML contents to be created for the div
		let actDivs = []; //individual activity div
		let exNames = [];
		let xButtons = [];
		
		let addBtnDiv = super.newDiv("addBtnRtn"+index, "relative","inheirt","inline");
		let addBtn = super.newButton("+", "inline", function(){ myself.addActivityToRoutine(index, document.getElementById("routineManager"));
																//ADD CODE IN HERE TO REFRESH AFTER NEW ROUTINE ADDED
																} );
																
		addBtnDiv.style.marginTop = "2%";		
		addBtnDiv.style.marginBottom = "2%";
		
		addBtnDiv.appendChild(addBtn);
		actsDiv.appendChild(addBtnDiv);
		
		//create and add new activity divs
		for(let i=0; i < activities.length; i++){
			actDivs[i] = super.newDiv("routine"+index+"activity"+i, "", "100%", "");
			actDivs[i].style.marginTop = "1%";
			actDivs[i].style.marginbottom = "1%";
			//some stuff to do for these, make them into edit buttons too that are highlighted when the mouse is over them
			exNames[i] = super.newParagraph(activities[i].name, "inline");
			super.setOnClick(exNames[i], function(){ myself.engageActEdit(rtnDiv, actDivs[i], activities[i], exNames[i], myself); } );
			exNames[i].addEventListener( "mouseover", function(){exNames[i].style.border = "1px solid green";} );
			exNames[i].addEventListener( "mouseout", function(){exNames[i].style.border = "";} );
			exNames[i].style.marginRight = "2%";
			exNames[i].style.cursor = "pointer";
			
			xButtons[i] = super.newButton("x", "inline", function(){ myself.deleteActPressed(rtnDiv, actDivs[i], i, index, xButtons[i], toggleBtn, myself); } );
			
			actDivs[i].appendChild(exNames[i]);
			actDivs[i].appendChild(xButtons[i]);
			
			actsDiv.appendChild(actDivs[i]);
		}//end for
		
		//set some new heights up

		super.setCSSHeight(rtnDiv, activities.length+2 + "00%"); 
		rtnDiv.appendChild(actsDiv);
		
		this.#_routines[index].showingActivities = true;
		super.setOnClick(toggleBtn, function(){ myself.toggleHideActivities(index, rtnDiv, actsDiv, toggleBtn, myself); } );//set this button to now hide the contents instead of show
		
	}//end toggleShowActivities
	
	toggleHideActivities(index, rtnDiv, actsDiv, toggleBtn, myself){//when toggle is pushed, hide the activities in the routine
		if(this.#_routines[index].showingActivities){
			
			rtnDiv.removeChild(actsDiv);
			this.#_routines[index].showingActivities = false;
		
			super.setOnClick(toggleBtn, function(){ myself.toggleShowActivities(index, rtnDiv, toggleBtn, myself); } ); //set this button to now show the contents instead of hide
		
			super.setCSSHeight(rtnDiv, "100%");
		}//end if
	}//end toggleHideActivities
	
	setupRoutineList(myself){
		
		//HTML contents to be created
		let subDivs = [];
		let rNames = [];
		let toggleActivitiesButtons = [];
		let xButtons = [];
		
		this.#_rListDiv.innerHTML = ""; //purge, things might have changed since the last press
		
		for(let i=this.#_routines.length-1; i >= 0; i--){ //newest first	
			//create elements
			subDivs[i] = super.newDiv("routine"+i, "relative", "inherit", "100%");
			
			rNames[i] = super.newHeader(5, this.#_routines[i].name, "verdana", "inline", "2%", "2%");
			
			toggleActivitiesButtons[i] = super.newButton("t", "inline", function(){ myself.toggleShowActivities(i, subDivs[i], toggleActivitiesButtons[i], myself) });
			
			xButtons[i] = super.newButton("x", "inline", function(){ myself.deleteRtnPressed("routine"+i, i, xButtons[i], myself); });
			
			//add those new elements
			subDivs[i].appendChild(document.createElement("hr"));
			subDivs[i].appendChild(toggleActivitiesButtons[i]);
			subDivs[i].appendChild(rNames[i]);
			subDivs[i].appendChild(xButtons[i]);
			
			//add the subDiv to the list
			this.#_rListDiv.appendChild(subDivs[i]);
	
		}//end for
		
	}//end setupRoutineList
	
	addRtnToTracker(index){
		super.manager.routineAdded(this.#_routines[index]);
	}//end addRtnToTracker
	
    toggleShowUneditableActivities(index, rtnDiv, toggleBtn, myself){
        let activities = this.#_routines[index].getActivities();
		
		let actDivs = [];
		let actsDiv = super.newDiv("trackRtnToggle"+index, "relative", "100%", "inherit");
		let names = [];
		
		for(let i=0; i < activities.length; i++){
			actDivs[i] = super.newDiv("act"+i+"rtnTrack"+index, "relative", "100%", "");		
			names[i] = super.newParagraph(activities[i].name, "list-item");
			
			actDivs[i].appendChild(names[i]);
			actsDiv.appendChild(actDivs[i]);
		}//end for
		
		super.setCSSHeight(rtnDiv, (activities.length+1) + "00%"); 
		rtnDiv.appendChild(actsDiv);
		
		this.#_routines[index].showingActivities = true;
		super.setOnClick(toggleBtn, function(){ myself.toggleHideUneditableActivities(index, rtnDiv, actsDiv, toggleBtn, myself); } );
    }//end toggleShowUneditableActivities

    toggleHideUneditableActivities(index, rtnDiv, actsDiv, toggleBtn, myself){
		if(this.#_routines[index].showingActivities){
			
			rtnDiv.removeChild(actsDiv);
			this.#_routines[index].showingActivities = false;
		
			super.setOnClick(toggleBtn, function(){ myself.toggleShowUneditableActivities(index, rtnDiv, toggleBtn, myself); } ); //set this button to now show the contents instead of hide
		
			super.setCSSHeight(rtnDiv, "100%");
		}//end if
    }//end toggleHideUneditableActivities

	setupRoutineTracking(myself){
		
		//HTML contents to be created
		let subDivs = [];
		let rNames = [];
		let toggleActivitiesButtons = [];
		let addButtons = [];
		
		this.#_rTrackDiv.innerHTML = ""; //purge, things might have changed since the last press
		
		for(let i=this.#_routines.length-1; i >= 0; i--){ //newest first	
			//create elements
			subDivs[i] = super.newDiv("routine"+i, "relative", "inherit", "");
			subDivs[i].style.marginLeft = "1%";
			
			rNames[i] = super.newHeader(5, this.#_routines[i].name, "verdana", "inline", "2%", "2%");
			
			toggleActivitiesButtons[i] = super.newButton("t", "inline", function(){ myself.toggleShowUneditableActivities(i, subDivs[i], toggleActivitiesButtons[i], myself) });
			
			addButtons[i] = super.newButton("+", "inline", function(){ myself.addRtnToTracker(i); } );
			
			//add those new elements
			subDivs[i].appendChild(document.createElement("hr"));
			subDivs[i].appendChild(toggleActivitiesButtons[i]);
			subDivs[i].appendChild(rNames[i]);
			subDivs[i].appendChild(addButtons[i]);
			
			//add the subDiv to the list
			this.#_rTrackDiv.appendChild(subDivs[i]);
	
		}//end for
		
	}//end setupRoutineTracking
	
	trackRoutineEngaged(){
		super.showHTMLElement(super.div);
		
		super.hideHTMLElement(this.#_rListDiv);
		super.showHTMLElement(this.#_rTrackDiv);
		
		this.setupRoutineTracking(this);
	}//end trackRoutineEngaged
	
	createRoutineEngaged(myself){
		this.hideAllDivs();
		super.showHTMLElement(this.#_rcDiv);
		let newIndx = this.#_routines.length; //no -1 since will become the latest populated index once we make a new rtn here
		let div = this.#_rcDiv;
		let listDiv = this.#_rcActsDiv;
		let rtn;
		
		this.#_routines.push(new Routine("blank"));
		rtn = this.#_routines[newIndx];
		//shouldnt be done if nothing in there
		//document.getElementById("confirmRoutineBtn").style.visibility = "hidden";
		
			//setup some onclick attributes for routine creation buttons
			super.setOnClick(document.getElementById("addExToRoutineBtn"), function(){ myself.addActivityToRoutine(newIndx, div); } ); //addExToRoutineBtn
			super.setOnClick(document.getElementById("confirmRoutineBtn"), function(){ myself.doneRoutineCreation(rtn); } ); //confirmRoutineBtn
			

	}//end createRoutineEngaged
	
	doneRoutineCreation(rtn){
		
		rtn.name = document.getElementById("newRoutineNameField").value;
		document.getElementById("newRoutineNameField").value = "";
		
		document.getElementById("confirmRoutineBtn").style.visibility = "hidden";
		
		this.#_rcActsDiv.innerHTML = "";//PURGE!!!!
		
		this.hideAllDivs();
		
		this.showDiv();
		
	}//end doneRoutineCreation
	
	addActivityToRoutine(rIndex, div){
		super.manager.previousDiv = div;
		super.hideHTMLElement(div);
		
		super.manager.exerciseAdder.enableRtnMd(rIndex);
		
		super.manager.exerciseAdder.showDiv(); //no routine tracking button needed
	}//end addActivityToRoutine
	
	addToRoutine(e, rIndex){
		console.log("addToRoutine "+e+"\n"+rIndex);
		document.getElementById("confirmRoutineBtn").style.visibility = "visible";
		//console.log(this.#_routines[rIndex]);
	/*	if(this.#_routines[rIndex] == undefined){ //make new routine if needed/nothing there
			
			this.#_routines[rIndex] = new Routine("blank");
		}//end
		*/
		this.#_routines[rIndex].addActivity(e);
		
		if(super.manager.previousDiv != undefined) 
			super.showHTMLElement(super.manager.previousDiv);
		
		
		if(this.#_routines[rIndex].name === "blank") //if its the new routine
			this.addActivityDiv(document.getElementById("newRtnListDiv"), e, this); //the new list div
		else
			this.addActivityDiv(document.getElementById("activities"+rIndex), e, this, document.getElementById("routine"+rIndex)); //actvities for given routine
			
		//console.log(this.#_routines[rIndex]);
	}//end addToRoutine
	
	addActivityDiv(actsDiv, activity, myself, rtnDiv){//, rIndex){

		//actsDiv.appendChild(super.newParagraph("hey its me let me in", "inline"));
		let newActDiv = super.newDiv("","100%","", "block");
	
		let exName;// = super.newParagraph("<b>"+activity.name+"<b>", "inline");
		let info;
		
		if(activity instanceof WeightExercise){
			info = super.newParagraph("Sets: "+activity.sets+" Weight: "+activity.weight+" Reps: "+activity.reps, "inline");
		}//end if
		else if(activity instanceof CardioExercise){
			info = super.newParagraph("Sets: "+activity.sets+" Duration: "+activity.duration, "inline");
		}//end else if
			
			info.style.marginLeft = "2%";
		
		let xButton = super.newButton("x", "inline", function(){console.log("delete from new rtn"); } );
		
			newActDiv.style.marginTop = "1%";
			newActDiv.style.marginbottom = "1%";

		if(rtnDiv!=undefined){//just cause of the way I setup routine lists in css
			rtnDiv.style.height = (parseFloat(rtnDiv.style.height) +60) + "%";
			
			exName = super.newParagraph(activity.name, "inline");
			
			super.setOnClick(exName, function(){ myself.engageActEdit(rtnDiv, newActDiv, activity, exName, myself); } );
			exName.addEventListener( "mouseover", function(){exName.style.border = "1px solid green";} );
			exName.addEventListener( "mouseout", function(){exName.style.border = "";} );
			exName.style.marginRight = "2%";
			exName.style.cursor = "pointer";
		
			newActDiv.appendChild(exName);
			newActDiv.appendChild(xButton);
			
			
		}//end if
		else{//else not contained in routine div can give it an hr and some other stuff, it's probably in the routine creator
			exName = super.newParagraph("<b>"+activity.name+"<b>", "inline");
			
			newActDiv.appendChild(document.createElement("hr"));
			newActDiv.appendChild(exName);
			newActDiv.appendChild(info);
			
		}//edne else
		
		actsDiv.appendChild(newActDiv);
		
	}//end addActivityDiv
	
	showDiv(){
		super.showHTMLElement(super.div);
		
		super.hideHTMLElement(this.#_rTrackDiv);
		super.showHTMLElement(this.#_rListDiv);
		
		this.setupRoutineList(this);
	}//end showDiv
	
	hideAllDivs(){
		super.hideHTMLElement(super.div);
		super.hideHTMLElement(this.#_rTrackDiv);
		super.hideHTMLElement(this.#_rListDiv);
		super.hideHTMLElement(this.#_rcDiv);
	}//end hideAllDivs
	
}//end class routine manager

//today tracker
class TodayTracker extends Feature{
	
	#_tracked; //routines and exercises tracked
	
	constructor(div, m){
		super(div, m);
		
		//testing
		this.#_tracked = [];//[new WeightExercise("testW",1 ,2 ,3 ,4), new CardioExercise("testC", 5, 6, 7)];
		//this.loadTrackedToday();
		
	}//end constructor
	
	removeFromTracker(index){
		this.#_tracked.splice(index, 1); //delete from array
		this.loadTrackedToday(); //refresh div with changes
	}//end removeFromTracker
	
	cancelRemovalFromTracker(sDiv, dialogue){
		sDiv.removeChild(dialogue);
	}//end cancelRemovalFromTracker
	
	setupRemovalDialogue(index, sDiv, myself){
		let dialogue = super.createDeletionDialogue("deleteTracked"+index, 
													function(){ myself.removeFromTracker(index); },
													function(){ myself.cancelRemovalFromTracker(sDiv, dialogue); }
													 );
		sDiv.appendChild(dialogue);
	}//end setupRemovalDialogue
	
	makeXBtn(index, sDiv, myself){
		return super.newButton("x" ,"inline", function(){ //myself.removeFromTracker(index) 
														  myself.setupRemovalDialogue(index, sDiv, myself);
														} );
	}//end makeXBtn
	
	setupBasicEntry(sDiv){
		sDiv.style.display = "block";
		sDiv.style.marginTop = "1%";
		sDiv.style.marginBottom = "1%";
	}//end makeBasicEntry
	
	setupExerciseEntry(sDiv, index, myself){
		let xBtn = this.makeXBtn(index, sDiv, myself);
		let name = super.newParagraph("<b>"+this.#_tracked[index].name+"</b>","inline");
		let cals = super.newParagraph("Cals burned: "+this.#_tracked[index].calsBurned, "inline");
		let sets = super.newParagraph("Sets: "+this.#_tracked[index].sets, "inline");
		
		cals.style.marginLeft = "2.5%"; 
		xBtn.style.marginLeft = "5%";
		
		sDiv.appendChild(name);
		sDiv.appendChild(cals);
		sDiv.appendChild(xBtn);
		
		sDiv.appendChild(document.createElement("br"));
		sDiv.appendChild(sets);
		
	}//end setupExerciseEntry
	
	newWeightExEntry(sDiv, index, myself){
		let weight = super.newParagraph("Weight: "+this.#_tracked[index].weight, "inline");
		let reps = super.newParagraph("Reps: "+this.#_tracked[index].reps, "inline");
		
		this.setupBasicEntry(sDiv);
		this.setupExerciseEntry(sDiv, index, myself);
		
		weight.style.marginLeft = "2%";
		reps.style.marginLeft = "2%";
		
		sDiv.appendChild(weight);
		sDiv.appendChild(reps);
		
	}//end newWeightExEntry
	
	newCardioExEntry(sDiv, index, myself){
		let duration = super.newParagraph("Duration: "+this.#_tracked[index].duration, "inline");
		
		duration.style.marginLeft = "2%";
		
		this.setupBasicEntry(sDiv);
		this.setupExerciseEntry(sDiv, index, myself);
		
		sDiv.appendChild(duration);
		
	}//end newCardioExEntry
	
	toggleShowActivities(index, rtnDiv, toggleBtn, myself){
        let actsDiv = super.newDiv("todayRtn"+index, "relative", "100%", "block"); //div holding activities
        let activities = this.#_tracked[index].getActivities();
        
        let actDivs = []; //individual activity divs
        let names = [];

        for(let i=0; i < activities.length; i++){

            actDivs[i] = super.newDiv("todayRtn"+index+"act"+i, "relative", "100%", "");
            names[i] = super.newParagraph(activities[i].name, "list-item");
            
            names[i].style.marginLeft = "4%";
            
            actDivs[i].appendChild(names[i]);
            actsDiv.appendChild(actDivs[i]);

        }//end for
		
		return actsDiv;
	}//end toggleShowActivities

	newRtnEntry(sDiv, index, myself){
		
		let toggleBtn = super.newButton("t", "inline", function(){ //quick anon function just to engage this toggling
																	myself.#_tracked[index].showingActivities = true; 
																	myself.loadTrackedToday(); //reload with changes
																	} );//function(){ myself.toggleShowActivities(index, sDiv, toggleBtn, myself); });
																	
		let rtnName = super.newParagraph("<b>"+this.#_tracked[index].name+"</b>", "inline");
		let xButton = myself.makeXBtn(index, sDiv, myself);

	
		let actsDiv;// = super.newDiv("actsRtnTracked"+index, "relative", "100%", ""); //might need this, might not
	
		toggleBtn.style.marginLeft = "2%";
		rtnName.style.marginLeft = "2%";
		xButton.style.marginLeft = "2%";
		this.setupBasicEntry(sDiv);
		
		//if showing, we gotta reload the page with these activities
		if(this.#_tracked[index].showingActivities){
			actsDiv = myself.toggleShowActivities(index, sDiv, toggleBtn, myself);
			super.setOnClick(toggleBtn, function(){ 
													myself.#_tracked[index].showingActivities = false;
													myself.loadTrackedToday(); //reload with changes
													} );
			super.setCSSHeight(sDiv, (this.#_tracked[index].length+1) + "00%");										
		}//end if
		
        sDiv.appendChild(toggleBtn);
        sDiv.appendChild(rtnName);
        sDiv.appendChild(xButton);
		
		//if we need to add the activities to show
		if(this.#_tracked[index].showingActivities)
			sDiv.appendChild(actsDiv);
		/*else
			super.setCSSHeight(sDiv, "100%"); */
		
	}//end newRtnEntry
	
	updateGraphs(){ //updates calorie loss graphs with data from the today tracker
		
		let calTotal =0;
		let j=0; //index in routines if needed
		let activities; //activities in a routine if needed
		
		//get all calories burned from everything
		for(let i=0; i < this.#_tracked.length; i++){
			if(this.#_tracked[i] instanceof WeightExercise || this.#_tracked[i] instanceof CardioExercise)
				calTotal += this.#_tracked[i].calsBurned;
			
			else if(this.#_tracked[i] instanceof Routine){
				activities = this.#_tracked[i].getActivities();
				
				for(j=0; j < activities.length; j++){
					calTotal += activities[j].calsBurned;
				}//end for
			}//end else if
				
		}//end for
		
		//global arrays
		weeklyCalVals[weeklyCalVals.length-1] =calTotal;
		monthlyCalVals[monthlyCalVals.length-1] =calTotal;
		
		refreshChart(); //global function
	}//end updateGraphs
	
	loadTrackedToday(){
		//purge
		super.div.innerHTML = "";
	
		let subDivs = []; //the subDivs to add to the main div
		
		for(let i=0; i < this.#_tracked.length; i++){
			subDivs[i] = super.newDiv("activityTracked"+i, "relative", "100%", "", "block"); //was "10%" for height
		/*	super.blockDisplayHTMLElement(subDivs[i]);
			console.log(subDivs[i].style.display + ", "+ getComputedStyle(subDivs[i]).display); //WHY COMPUTED EMPTY!@!!!!!!@!@!@111!!!
		*/	
			if(this.#_tracked[i] instanceof WeightExercise){
				this.newWeightExEntry(subDivs[i], i, this);
				
			}//end if
			
			else if(this.#_tracked[i] instanceof CardioExercise){
				this.newCardioExEntry(subDivs[i], i, this);
				
			}//end else if
			
			else{//it's a routine
				this.newRtnEntry(subDivs[i], i, this);
				
			}//end else
			
			subDivs[i].appendChild(document.createElement("hr"));
			super.div.appendChild(subDivs[i]);
		
		}//end for
		
	}//end loadTrackedToday
	
	addToTracker(activity){
		this.#_tracked.push(activity);
		
		this.updateGraphs(); //refresh graphs
		this.loadTrackedToday(); //refresh div
	}//end addToTracker
	
}//end class today tracker

//the brain, big wrapper for most managers
class ExerciseSystemManager{
	
	#_tracker; //tracker to add stuff into
	#_routineManager; //routines stored and manipulated here
	#_exerciseAdder;
	
	#_prevDiv; //previous div displayed
	
	constructor(){
		this.#_tracker = new TodayTracker(document.getElementById("exTodayTracker"), this);
		this.#_routineManager = new RoutineManager(document.getElementById("routineManager"), this);
		this.#_exerciseAdder = new ExerciseAdder(document.getElementById("exerciseAdder"), this);
	}//end constructor
	
	get previousDiv(){
		return this.#_prevDiv;
	}//end get previous div
	
	set previousDiv(d){
		this.#_prevDiv = d;
	}//end set previousDiv
	
	get tracker(){
		return this.#_tracker;
	}//end get tracker
	
	get routineManager(){
		return this.#_routineManager;
	}//end get routineManager
	
	get exerciseAdder(){
		return this.#_exerciseAdder;
	}//end get exerciseAdder
	
	exerciseAdded(e){
		//console.log(e);

		this.#_exerciseAdder.hideDiv();
		document.getElementById("exMenuDiv").style.display = "initial";
		
		this.#_tracker.addToTracker(e);

	}//emnd exerciseAdded
	
	exerciseAddedToRoutine(e, rIndex){
		this.#_exerciseAdder.hideDiv();
		
		this.#_routineManager.addToRoutine(e, rIndex);
		this.#_exerciseAdder.disableRtnMd();
	}//end exerciseAddedToRoutine
	
	routineAdded(r){
		//console.log(r);
		this.#_routineManager.hideAllDivs();
		
		document.getElementById("exMenuDiv").style.display = "initial";
		
		this.#_tracker.addToTracker(r);
	}//end routine added
	
	
	
}//end class ExerciseSystemManager

class ExRecommender extends Feature{ //recommend the user an exercise based on their plan. Doesn't need to be in the manager since it only interacts with plans script
	
	constructor(div){
		super(div, undefined);
	}//end constructor
	
	recommendPlan(p){ //when this is set, must update the div
		//purge div
		super.div.innerHTML = "";
		
		let planName = super.newParagraph("<b>"+p.getPlanName()+"</b> recommends: ");
		let info;
		
		planName.style.display = "inline";		
		
		//vert prototype so these are hardcoded, no fancy algorithm
		//these exercises are probably not accurate to the goals
		//the calories burned are not accurate at all
		if(p.getGain()){
			//gain weight
			if(p.getWeight())
				info = super.newParagraph("Bench press. 6 cals burned per rep", "block");
			//gain fat
			else if(p.getFat())
				info = super.newParagraph("Walking. 150 cals burned an hour", "block");
			//gain muscle
			else if(p.getMuscle())
				info = super.newParagraph("Push-ups. 5 cals purned per rep", "block");
			//gain definition
			else
				info = super.newParagraph("Crunches. 10 cals burned per minute", "block");
		}//end else
		
		else{//else is lose
			//lose weight
			if(p.getWeight())
				info = super.newParagraph("Running. 200 cals burned per hour", "block");
			//lose fat
			else if(p.getFat())
				info = super.newParagraph("Running. 200 cals burned per hour", "block");
			//lose muscle
			else if(p.getMuscle())
				info = super.newParagraph("Walking. 150 cals burned per hour", "block");
			//lose definition
			else
				info = super.newParagraph("Walking. 150 cals burned per hour", "block");	
		}//end else
		
		info.style.marginLeft = "2%";
		
		super.div.appendChild(planName);
		super.div.appendChild(info);
	}//end recommendPlan
	
}//end class Recommender

var em;// = new ExerciseSystemManager();
var exRec;

//direct HTML button press methods
function addExToTracker(){//clicked from menu so hide menu
	document.getElementById("exMenuDiv").style.display = "none";
	em.exerciseAdder.showDiv();
}//end addExToTracker

function trackRoutine(){
	document.getElementById("exerciseAdder").style.display = "none";
    em.routineManager.trackRoutineEngaged();
}//end trackRoutine

function openRoutineManager(){
	document.getElementById("exMenuDiv").style.display = "none";
	em.routineManager.showDiv();
	
}//end openRoutineManager

//manipulate these values to change *weight* on different "days" (days = indicies)
//not sure if it's needed for the "time travel" feature for the gen inf bar, but they're here if you need them.
//if you need to change calorie values on different days by adding exercises to a "yestarday" tracker and are having trouble
//working with my code, let me know and I'll just add that functionality for you
var exChartDateM =  monthlyWeightVals.length-1;
var exChartDateW =  weeklyWeightVals.length-1;

function trackWeightPressed(){
	//TRACKS WEIGHT FOR TODAY
	let weight = document.getElementById("weightTrackerField").value;
	
	monthlyWeightVals[exChartDateM] = weight;
	weeklyWeightVals[exChartDateW] = weight;
	
	refreshChart(); //reflects changes
}//end trackWeightPressed

function createNewRoutine(){
	em.routineManager.createRoutineEngaged(em.routineManager);
}//end createNewRoutine

function exBackBtnPressed(){
	//to be impelemented if time, not an ms2 promise
    //console.log("ex back pressed");
	
}//end exBackBtnPressed()


