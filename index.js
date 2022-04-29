class Habit{
    constructor(description, impact){
        this.description = description;
        this.impact = impact;
    }
}

const habitListElement = document.querySelector('[data-habit-list]');
const addHabitButton = document.querySelector('[add-habit]');

const habitImpact = {
    positive: "+",
    negative: '-',
    neutral: '/'
}


const habitList = JSON.parse(localStorage.getItem('habits'));

let toolbarContainer;
let selectedHabit;
let selectedContainer;

habitList.forEach(habit => {
    displayHabit(habit);
})

function createHabit(){
    const newHabit = new Habit("", habitImpact.neutral);
    habitList.push(newHabit);
    displayHabit(newHabit);  
    saveImpactList();
}

createToolbar();

function toggleImpact(habit){

    switch (habit.impact){

        case habitImpact.positive:
            habit.impact = habitImpact.neutral;
            break;

        case habitImpact.neutral:
            habit.impact = habitImpact.negative;
            break;

        case habitImpact.negative:
            habit.impact = habitImpact.positive;
            break;     
    }
}

function displayHabit(habit){

        //List Item
        const habitListItem = document.createElement('li');
        habitListItem.classList.add("habit-list-item");

        // Div
        const habitDiv = document.createElement('div');
        habitDiv.classList.add('habit');

        habitListItem.appendChild(habitDiv);

        // Input Text
        const habitInput = document.createElement('input');
        habitInput.type = 'text';
        habitInput.placeholder = 'Enter Habit';
        habitInput.value = habit.description;

        habitDiv.appendChild(habitInput);  

        // Impact Button
        const impactButton = document.createElement('button');
        impactButton.classList.add('habit-impact');
        impactButton.innerText = habit.impact;

        updateHabitColor(habit, impactButton);

        habitDiv.appendChild(impactButton);    
        
        // Append to List
        habitListElement.appendChild(habitListItem);

        // Add Listeners
        addHabitEventListeners(habit, habitListItem, habitDiv, habitInput, impactButton);
}

function createToolbar(){
    toolbarContainer = document.createElement('div');
    toolbarContainer.classList.add('habit-toolbar');

    const toolbarMoveUp = document.createElement('i');
    toolbarMoveUp.classList.add('fa-solid');
    toolbarMoveUp.classList.add('fa-arrow-up');
    toolbarContainer.appendChild(toolbarMoveUp);

    const toolbarMoveDown = document.createElement('i');
    toolbarMoveDown.classList.add('fa-solid');
    toolbarMoveDown.classList.add('fa-down-long');
    toolbarContainer.appendChild(toolbarMoveDown);

    const toolbarDelete = document.createElement('i');
    toolbarDelete.classList.add('fa-solid');
    toolbarDelete.classList.add('fa-trash-can');
    toolbarContainer.appendChild(toolbarDelete);

    addToolbarEventListeners(toolbarMoveUp, toolbarMoveDown, toolbarDelete);
    
}

function saveImpactList(){
    localStorage.setItem('habits', JSON.stringify(habitList));
}

function selectHabit(habit, container){

    deselectHabit();

    container.classList.add('selected');

    selectedHabit = habit;
    selectedContainer = container;
}

function deselectHabit(){
    if (selectedContainer !== undefined){
        selectedContainer.classList.remove('selected')
    }
}

function moveHabit(habit, up){
    var habitIndex = habitList.indexOf(habit);
    
    var previousHabit = habitList[habitIndex - 1];
    var nextHabit = habitList[habitIndex + 1];

    if (up){
        if (previousHabit == null) return;
    habitList[habitIndex] = previousHabit;
    habitList[habitIndex - 1] = habit;

    }
    else{
        if (nextHabit == null) return;
        habitList[habitIndex] = nextHabit;
        habitList[habitIndex + 1] = habit;
    }

    saveImpactList();
    location.reload();
}

function deleteHabit(habit){
    var habitIndex = habitList.indexOf(habit);
    habitList.splice(habitIndex, 1);
    saveImpactList();
    location.reload();
}

function clearList(){
    const emptyHabitList = [];
    localStorage.setItem('habits', JSON.stringify(emptyHabitList));
}

function updateHabitColor(habit, impactButton){
            
    switch (habit.impact){
        case habitImpact.positive:
            impactButton.style.backgroundColor = '#65C876';
            break;

        case habitImpact.neutral:
                impactButton.style.backgroundColor = '#FEFF9B';
                break;  

                case habitImpact.negative:
                    impactButton.style.backgroundColor = '#D32D2D';
                    break;
    }
}

// Event Listeners
addHabitButton.addEventListener('click', () =>{
    createHabit();
});

document.addEventListener('click', (e) =>{
    if (e.target.nodeName == "MAIN" || e.target.nodeName == 'HTML'){
        deselectHabit();
        toolbarContainer.remove();
    }
})


function addHabitEventListeners(habit, habitListItem, habitContainer, inputField, impactButton){

    impactButton.addEventListener('click', () => {
        toggleImpact(habit);
        impactButton.innerText = habit.impact;
        updateHabitColor(habit, impactButton);
        saveImpactList();
    })

    inputField.addEventListener('change', () => {
        habit.description = inputField.value;
        saveImpactList();
    })    

    habitContainer.addEventListener('click', () =>{
       selectHabit(habit, habitContainer);
       habitListItem.appendChild(toolbarContainer);
    })
}

function addToolbarEventListeners(up, down, remove){
    up.addEventListener('click', () =>{
        moveHabit(selectedHabit, up);
    })

    down.addEventListener('click', () =>{
        moveHabit(selectedHabit, !up);
    })

    remove.addEventListener('click', () =>{
        deleteHabit(selectedHabit);
    })
}