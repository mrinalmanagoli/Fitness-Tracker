
function showBuildAPlan()
{
	   hideCurrentDiv();
    
	   displayedDiv = document.getElementById("build_plan");
    
	   showCurrentDiv();       
    
}
////plans code   

function swapExercise() //refresh exercise list
{
   if(document.getElementById("ex_list_2").style.display === "none")
    {
        document.getElementById("ex_list_2").style.display = "block" 
        document.getElementById("ex_list_1").style.display = "none"
    }
    else
    {
        document.getElementById("ex_list_1").style.display = "block" 
        document.getElementById("ex_list_2").style.display = "none"
    }
    
}

function backFood() //go back a menu in food list
{
    document.getElementById("food_list_2").style.display = "none";
    document.getElementById("food_list_nutrition").style.display = "none";
    document.getElementById("food_list_1").style.display = "block";
}

function showFoodList(id)
{
    document.getElementById("food_list_2").style.display = "block";
    document.getElementById("food_list_1").style.display = "none";
}

function showNutritionFactsList(id)
{
    document.getElementById("food_list_2").style.display = "none";
    document.getElementById("food_list_1").style.display = "none";
    document.getElementById("food_list_nutrition").style.display = "block";
    
}

function highlightPlanOption(option_id) //done
{
    
    if (document.getElementById(option_id).id === "plan_options_gain"){
        document.getElementById("plan_options_lose").style.background = 'white';}
    else if (document.getElementById(option_id).id === "plan_options_lose"){
        document.getElementById("plan_options_gain").style.background = 'white';}
    if (document.getElementById(option_id).style.background !== 'yellow'){
    document.getElementById(option_id).style.background = 'yellow';}
    else{
        document.getElementById(option_id).style.background = 'white';}
}

            class plan{
            #planIdentity;
            #planName;
            #planDescription;
            #gain;
            #lose;
            #weight;
            #fat;
            #muscle;
            #definition;
            #vegan;
            #vegetarian;
            #dairyFree;
            #pescatarian;
            
            #calorieTarget
            #carbTarget
            #fatTarget
            #proteinTarget
            
            #foodlist
            #exerciselist

            setGain(){this.gain = true; this.lose = false;}
            setLose(){this.gain = false; this.lose = true;}
            setWeight(){this.weight = true; this.fat = false; this.muscle = false; this.definition = false}
            setFat(){this.weight = false; this.fat = true; this.muscle = false; this.definition = false;}
            setMuscle(){this.weight = false; this.fat = false; this.muscle = true; this.definition = false}
            setDefinition(){this.weight = false; this.fat = false; this.muscle = false; this.definition = true;}
            setVegan(){this.vegan = true; this.vegetarian = false; this.dairyFree = false; this.pescatarian = false;}
            setVegetarian(){ this.vegan = false; this.vegetarian = true; this.dairyFree = false; this.pescatarian = false;}
            setDairyFree(){this.vegan = false; this.vegetarian = false; this.dairyFree = true; this.pescatarian = false;}
            setPescatarian(){this.vegan = false; this.vegetarian = false; this.dairyFree = false; this.pescatarian = true;}


            getGain(){return this.gain;}
            getLose(){return this.lose;}
            getWeight(){return this.weight;}
            getFat(){return this.fat;}
            getMuscle(){return this.muscle;}
            getDefinition(){return this.definition;}
            getVegan(){return this.vegan;}
            getVegetarian(){return this.vegetarian;}
            getDairyFree(){return this.dairyFree;}
            getPescatarian(){return this.pescatarian;}


            
            getPlanName(){return this.planName;}
            getPlanDescription(){return this.planDescription;} 
            getPlanIdentity(){return this.planIdentity;}

            setPlanName(data){this.planName = data;}
            setPlanDescription(data){this.planDescription = data;}
            setPlanIdentity(id){ this.planIdentity = id;}

            constructor(id)
            {
                    this.planIdentity = id;
                    this.planName = "default";
                    this.planDescription =  "default";
                    
            }
                
                
            }
            
            class Node{
            #data
            #next
            #prev
                constructor(data, next, prev)
                {
                    this.data = data;
                    this.next = next;
                    this.prev = prev;
                }
                
            getData(){return this.data}
            setData(data){this.data = data;}
            getNext(){return this.next}
            getPrev(){return this.prev}
            setNext(next){this.next = next}
            setPrev(prev){this.prev = prev}
            
            }
            
            class List{
                #head
                #size
                constructor()
                {
                    this.head = new Node(undefined, null, null)
                    this.size =0;
                }
            
                insert(data)
                {

                    let curr = this.head;
                    if (curr.getData() === undefined)
                    {
                            curr.setData(data);           
                    }
                    else{
                    while(curr.getNext() !== null)
                    {
                       curr = curr.getNext();
                    }
                    curr.setNext(new Node(data, null, curr))}
                    this.size++;
                }

                search(id)
                {
                let curr = this.head;
                while (curr!== null)
                {
                        if (curr.getData().getPlanIdentity() === id)
                        {
                                return curr.getData();
                        }
                    
                        curr = curr.getNext();
                }
                    return "bad search"
                
                }  
            }
let currPlan = new plan(); //used for loading the selected plan
let tempID = "plan_slot_0"; let tempName;
let plan0 = new plan("plan_slot_0");
let plan1 = new plan("plan_slot_1");
let plan2 = new plan("plan_slot_2");
let plan3 = new plan("plan_slot_3");
let planList = new List();


function populatePlans()
{
    plan0.setPlanName("The Jacked Vegan")
    plan0.setPlanDescription("This is the definition of this plan");
    plan0.setGain(); currPlan.setMuscle(); currPlan.setVegan();
    plan0.setPlanIdentity("plan_slot_0");
    plan1.setPlanName("The meat-eor"); 
    plan1.setPlanDescription("This is the definition of this plan");
    plan1.setGain(); plan1.setWeight();
    plan1.setPlanIdentity("plan_slot_1");
    plan2.setPlanName("The celery stick and water")
    plan2.setPlanDescription("This is the definition of this plan");
    plan2.setPlanIdentity("plan_slot_2");
    plan2.setLose(); plan2.setWeight(); plan2.setVegetarian();
    plan3.setPlanName("Open Plan Slot");
    plan3.setPlanIdentity("plan_slot_3");
    plan2.setPlanDescription("This is the definition of this plan");
}

function setActivePlan()  
{
        document.getElementById("name_text_box").value = currPlan.getPlanName();
        document.getElementById("description_text_box").value = currPlan.getPlanDescription();
        document.getElementById("plan_slot_0").value = currPlan.getPlanName();
        
    
}

function swapCurrTitle() {
    var des = document.getElementById("description_text_box").value;
    console.log(des);
    currPlan.setPlanDescription(des);
    
    var nam = document.getElementById("name_text_box").value
    currPlan.setPlanName(nam)
    
    
    document.getElementById(tempID).value =  planList.search("plan_slot_0").getPlanName();
    planList.search("plan_slot_0").setPlanIdentity(tempID);
    
    currPlan.setPlanIdentity("plan_slot_0");
    document.getElementById("plan_slot_0").value = currPlan.getPlanName();
    
    showPlans();
    
    
}

function setPlanSlots()
{
    document.getElementById("plan_slot_1").value = plan1.getPlanName();
    document.getElementById("plan_slot_2").value = plan2.getPlanName();
    document.getElementById("plan_slot_3").value = plan3.getPlanName();
    
}

function swapPlans(id)
{
    tempID = id
    setCurrPlan(planList.search(id));
    document.getElementById("name_text_box").value = currPlan.getPlanName();
    document.getElementById("description_text_box").value = currPlan.getPlanDescription();
    if(currPlan.getGain())
    {document.getElementById("plan_options_gain").style.background = 'yellow'
    document.getElementById("plan_options_lose").style.background = 'white'
    }
    else
    {document.getElementById("plan_options_lose").style.background = 'yellow'
    document.getElementById("plan_options_gain").style.background = 'white'}
    if(currPlan.getWeight())
        {document.getElementById("plan_options_weight").style.background = 'yellow'}
    else if(currPlan.getFat())
    {document.getElementById("plan_options_fat").style.background = 'yellow'}
    else if(currPlan.getMuscle())
         {document.getElementById("plan_options_muscle").style.background = 'yellow'}
    else if(currPlan.getDefinition())
         {document.getElementById("plan_options_definition").style.background = 'yellow'}
    if(currPlan.getVegan())
        {document.getElementById("plan_options_vegan").style.background = 'yellow'}
    else if(currPlan.getVegetarian())
    {document.getElementById("plan_options_vegetarian").style.background = 'yellow'}
    else if(currPlan.getDairyFree())
         {document.getElementById("plan_options_dairyfree").style.background = 'yellow'}
    else if(currPlan.getPescatarian())
         {document.getElementById("plan_options_pescatarian").style.background = 'yellow'}    
}

function setCurrPlan(plan)
{
    currPlan = plan;
}

function initPlan()
{
    currPlan = plan0;
    populatePlans();
    setActivePlan();
    setPlanSlots();
    planList.insert(plan0);
    planList.insert(plan1);
    planList.insert(plan2);
    planList.insert(plan3);
    backFood();
}
