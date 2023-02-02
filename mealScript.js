
function showBreakfast(){
	hideCurrentDiv();
	
	displayedDiv = document.getElementById("breakfast");
	
	showCurrentDiv();
}//end showBreakfast

function showLunch(){
	hideCurrentDiv();
	
	displayedDiv = document.getElementById("lunch");
	
	showCurrentDiv();
}//end showLunch

function showDinner(){
	hideCurrentDiv();
	
	displayedDiv = document.getElementById("dinner");
	
	showCurrentDiv();
}//end showDinner

function showSnack(){
	hideCurrentDiv();
	
	displayedDiv = document.getElementById("snack");
	
	showCurrentDiv();
}//end showSnack

class Meal{

	#_name;
	#_serving;
	#_cals;

	constructor(n, s, c){
		if(constructor === Meal){ 
		  throw new Error("not allowed instances of abstract class: Meal");
		}//end if
		else{ //if not, initialize as usual
		    this.#_name=n;
	    	this.#_serving=s;
			this.#_cals=c;
		}//end else
	}//end constructor

	get name(){
		return (this.#_name);
	}//end get name
	
	get serving(){
		return (this.#_serving);
	}//end get sets
	
	get cals(){
		return (this.#_cals);
	}//end get calsBurned
	
	set serving(s){
		this.#_serving=s;
	}//end set sets
	
	set cals(c){
		this.#_cals=c;
	}//end set calsBurned
}


class MealDatabase{
	
	#_NAME_INDX = 0; //important: this index is where the name of your food is. For me this is where the exercise name is
	#_SERVING = 1;
	#_CALS = 2;

	//3d array
	#_table=
	[
	 [ ["avocado toast", 'serving', 50] , ["aphabet soup", 'serving', 100]],
	 [ ["burger",'serving',100] ],
	 [ ["corn", 'serving', 40], ["curry", 'serving', 150], ["crepe", 'serving', 100] ],
	 [ ["danish", 'serving', 50] ],
	 [ ["egg", 'serving' , 50], ["egg roll", 'serving' , 50], ["english muffin", 'serving' , 200], ["egg salad", 'serving' , 100]],
	 [ ["falafel", 'serving', 100], ["french onion soup", 'serving', 150], ["french toast", 'serving', 200], ["flatbread", 'serving', 100] ],
	 [ ["gingerbread", 'serving', 100], ["green pea", 'serving', 50], ["greek yogurt", 'serving', 50], ["gyros", 'serving', 70] ],
	 [ ["hazelnut", 'serving', 40], ["hamburger", 'serving', 500], ["hamburger pie", 'serving', 40] ],
	 [ ["iced cream", 'serving', 50], ["iced tea", 'serving', 70], ["iced coffee", "serving", 50], ["iced pops", 'serving', 50], ["iceberg lettuce", 'serving', 50] ],
	 [ ["jam", 'serving', 60],  ["jackfruit", 'serving', 50], ["jambon", 'serving', 70],  ["jaffa cake", 'serving', 60], ["jelly bean", 'serving', 80],  ["jello", 'serving', 40] ],
	 [ ["kedgeree", 'serving', 150], ["kiwi fruit", 'serving', 50], ["kimchi", 'serving', 150], ["kahlua", 'serving', 150], ],
	 [ ["lentils", 'serving', 30], ["lobster", 'serving', 100], ["lychee", 'serving', 50], ["latte", 'serving', 70], ["linguini", 'serving', 150] ],
	 [ ["macaroni and cheese", 'serving', 200], ["macaroni salad", 'serving', 150], ["muffin", 'serving', 250], ["mcmuffin", 'serving', 250], ["mcgriddle", 'serving', 200], ["muesli", 'serving', 100] ],
	 [ ["nuggets", 'serving', 50], ["nacho cheese", 'serving', 150], ["nashi pear", 'serving', 50], ["nasi goreng", '', 200], ["navel oranges", '', 50]  ],
	 [ ["oatmeal", 'serving', 50], ["omelette", 'serving', 100], ["orange", 'serving', 50], ["oatcake", 'serving', 170], ["oat milk", 'serving', 50], ["oats", 'serving', 30], ["octopus", 'serving', 150], ["omurice", 'serving', 250] ], 
	 [ ["pizza", 'serving', 300], ["poached eggs", 'serving', 150], ["pancake", 'serving', 100], ["pasta", 'serving', 200], ["peaches", 'serving', 50], ["peanuts", 'serving', 50], ["popcorn", 'serving', 100], ["pie", 'serving', 80], ["polenta", 'serving', 250] ],
	 [ ["quinoa", 'serving', 80], ["quesadilla", 'serving', 90], ["quail", 'serving', 150], ["quahog", 'serving', 120], ["quiche", 'serving', 100] ],
	 [ ["red cabbage", 'serving', 30], ["ramen", 'serving', 450], ["rigatoni", 'serving', 60], ["red potatoes", 'serving', 50], ["raspberries", 'serving', 40], ["red grapes", 'serving', 60], ["red pepper", 'serving', 20], ["romaine lettuce", 'serving', 30]  ],
	 [ ["sausage", 'serving', 30],["shrimp", 'serving', 20], ["salmon", 'serving', 50], ["sushi", 'serving', 10], ["spaghetti", 'serving', 80], ["samosas", 'serving', 100], ["shashimi", 'serving', 150], ["hummus", 'serving', 200]  ],
	 [ ["taco", 'serving', 300], ["taco dip", 'serving', 50], ["taco salad", 'serving', 100], ["tarts", 'serving', 100], ["turkeys", 'serving', 350], ["tomatoes", 'serving', 50], ["tangerine", 'serving', 180] ],
	 [ ["udon", 'serving', 300], ["ugli fruit", 'serving', 80], ["umble pie", 'serving', 90], ["ukranian rolls", 'serving', 70], ["udon", 'serving', 300], ["upside down cake", 'serving', 220], ["umbricelli pasta", 'serving', 340] ],
	 [ ["veggie chips", 'serving', 130], ["veggie chips", 'serving', 130], ["velvet beans", 'serving', 50], ["vegetable", 'serving', 80], ["vanilla icecream", 'serving', 140], ["vinegar chips", 'serving', 80], ["valencia orange", 'serving', 50] ],
	 [ ["waffles", 'serving', 140],  ["watermelon", 'serving', 50], ["walking tacos", 'serving', 240], ["wakame", 'serving', 40], ["walnuts", 'serving', 30], ["walleye fish", 'serving', 170], ["wasabi", 'serving', 20], ["water chestnuts", 'serving', 40], ["water spinach", 'serving', 160] ],
	 [ ["xavier soup", 'serving', 300], ["xavier steak", 'serving', 380], ["xinomavro grapes", 'serving', 60], ["xanthia", 'serving', 80], ["xoconostle", 'serving', 120], ["xingren tofu", 'serving', 90], ["xylocarp cupcakes", 'serving', 110] ],
	 [ ["yogurt", 'serving', 40], ["yellow beans", 'serving', 50], ["yakhni pulao", 'serving', 140], ["yali pear", 'serving', 50], ["yam bean", 'serving', 70], ["yorkshire pudding", 'serving', 80], ["yellow passion fruit", 'serving', 70], ["yellow apple", 'serving', 65]  ],
	 [ ["zebra cakes", 'serving', 80], ["zoodles", 'serving', 220], ["zucchini", 'serving', 60], ["zuppa toscana", 'serving', 180], ["zuccotto", 'serving', 210], ["ziti", 'serving', 240], ["zeppole", 'serving', 50], ["zucchini fritters", 'serving', 40]  ]
	]; //end table
	
	
	databaseSearch(strin){ //gets an array of 'objects' that start with a given sub-string. input string passed and turned lowercase
		let CHR_DIFF = 97; //lowercase chars start at ascii97 which is 'a'
		
		let sub = strin.toLowerCase(); //no capitals for the sub string	
		let row = sub.charCodeAt(0) - CHR_DIFF; //since rows are ascending alphabetical, it's just a "conversion" from ascii [97..122] space to [0..25] space

		let ret=[]; //return this
		
		for(let i=0; this.#_table[row]!=undefined && i < this.#_table[row].length; i++) //iterate through the items of the given row in the table
			if(this.#_table[row][i][this.#_NAME_INDX].startsWith(sub)) //if this name starts with the substring
				ret.push(this.#_table[row][i]); //add the 'object' to the returning array			
		
		return ret;
	}//end getExNames

	get nameIndx(){
		return this.#_NAME_INDX;
	}//end get nameIndx

	get serving(){
		return this.#_SERVING;
	}
	
	get cals(){
		return this.#_CALS;
	}
	
}//end class MealDatabase

class MealFeature extends Feature{
	
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

class mealTracking extends MealFeature{

	//text fields
	#_nameField;
	#_servingField;

	//confirmation button
	#_confirmButton;


	#_dropList;

	#_db;

	constructor(div, m){

		super(div, m);

		this.#_db = new MealDatabase();

		this.#_nameField = document.getElementById("mealNameField");
		this.#_servingField = document.getElementById("servingField");

		this.#_confirmButton = document.getElementById("confirmTrackingMealBtn");
		this.#_dropList = document.getElementById("mealDropList");

		document.getElementById("mealFields").style.display = "none";
		

	}// end constructor
	
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
		return this.#_db.databaseSearch(s);
	}//end databaseSearch
	
	hideDataEntry(){
		document.getElementById("mealFields").style.display = "none";
		//document.getElementById("routineTrackBtn").style.display = "none";
		
		this.hideHTMLElement(this.#_servingField);
		this.hideHTMLElement(this.#_confirmButton);
		
		document.getElementById("servingLabel").style.display = "none";
		
		this.clearTextField(this.#_servingField);
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
		document.getElementById("mealFields").style.display = "initial";		
		
		document.getElementById("servingLabel").style.display = "initial";
		this.showHTMLElement(this.#_servingField);
		
	}//end showDataEntry

	MealNameFieldTyped(self){
		let input = this.#_nameField.value;
		//let input = self.nameFieldValue;
		console.log(input)

		let content = self.databaseSearch(input);
		console.log(content)

		let names = []; //contains meal names
	
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
				document.getElementById("mealDropList").appendChild(option); //append it
			
				}//end nested if
		  
				else{//full name in list, get exercise type and setup div to take input from user correctly
		  
					this.showHTMLElement(this.#_servingField);
					this.setOnClick(this.#_confirmButton, function(){self.mealAdded(content[i][2])});
					//show the add button
					this.showHTMLElement(this.#_confirmButton);
					break; //get out of here

				}//end nested else
			  
			}//end for
			
		}//end if
		
	}//end mealNameFieldTyped
	
	
}//end tracking meal class

class mealManager{
	
	#_mealTracking;
	
	#_prevDiv; //previous div displayed
	
	constructor(){
		this.#_mealTracking = new mealTracking(document.getElementById("mealTracker"), this);
	}//end constructor
	
	get previousDiv(){
		return this.#_prevDiv;
	}//end get previous div
	
	set previousDiv(d){
		this.#_prevDiv = d;
	}//end set previousDiv
	
	get mealTracking(){
		return this.#_mealTracking;
	}//end get mealtracking
	
	mealAdded(e){
		//console.log(e);

		this.#_mealTracking.hideDiv();
		document.getElementById("mealAdded").style.display = "initial";

	}//emnd exerciseAdded
	
}//end class ExerciseSystemManager 
