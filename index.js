const habitListElement = document.querySelector('.habits-list');
const habitElements = document.querySelectorAll('[data-habit]');
const habitToolbarElement = document.querySelector('[data-habit-toolbar]');
const addHabitElement = document.querySelector('.add-habit-button');
const toolBarIconElements = document.querySelectorAll('[data-toolbar-icon]');
const deleteHabitElement = document.querySelector('[data-toolbar-delete]');
const moveUpHabitElement = document.querySelector('[data-toolbar-up]');
const moveDownHabitElement = document.querySelector('[data-toolbar-down]');
const habitImpactButtonElement = document.querySelectorAll('[data-habit-impact]');

let selectedHabit = habitElements[0];
SelectHabit(selectedHabit);

habitElements.forEach(habit =>{

    habit.addEventListener('click', () =>{
        SelectHabit(habit);
    })
})

addHabitElement.addEventListener('click', () =>{
    habitListElement.parentElement.appendChild(habitToolbarElement);
    let newHabit = habitElements[0].parentNode.cloneNode(true);
    habitListElement.appendChild(newHabit);

    newHabit.querySelector('[data-habit-text]').value = '';


    var child = newHabit.childNodes[1];
    SelectHabit(child);

    var childImpactButton = child.querySelector('[data-habit-impact]');

    childImpactButton.innerText = '/';
    childImpactButton.style.background = "#FFD666";


    childImpactButton.addEventListener('click', () =>{
        toggleHabitImpact(childImpactButton);
    })

    child.addEventListener('click', () =>{
        SelectHabit(child);
    })
})

function SelectHabit(newHabit){

    if (selectedHabit !== undefined) {
        selectedHabit.classList.remove('selected');
    }

    selectedHabit = newHabit;
    selectedHabit.classList.add('selected');
    selectedHabit.parentNode.appendChild(habitToolbarElement);
    habitToolbarElement.classList.add('grow');
}

function changeHabitOrder(up){
  
    if (up){
        toHabit = selectedHabit.parentNode.previousElementSibling;
    }

    else{
         if (selectedHabit.parentNode.nextElementSibling == undefined){
         habitListElement.insertBefore(selectedHabit.parentNode, habitListElement.children[0]);   
          return;
          }

          if (selectedHabit.parentNode.nextElementSibling.nextElementSibling == undefined){
            habitListElement.append(selectedHabit.parentNode);
           return;
          }
           toHabit = selectedHabit.parentNode.nextElementSibling;
    }

    var toHabit = up ? selectedHabit.parentNode.previousElementSibling : selectedHabit.parentNode.nextElementSibling.nextElementSibling;

    
    for (var i = 0; i < habitListElement.children.length; i++){
        
        if (habitListElement.children[i] === selectedHabit.parentNode){

            habitListElement.insertBefore(selectedHabit.parentNode, toHabit);                   
        }
    }
}

function toggleHabitImpact(habit){

    switch(habit.innerText){
        case '+':
            habit.innerText = '-';
            habit.style.background = "#FC3535"
            break;

        case '-':
            habit.innerText = '/';
            habit.style.background = "#FFD666"
            break;

        case '/':
            habit.innerText = '+';
            habit.style.background = "#75FF62"
            break;
    }
}

deleteHabitElement.addEventListener('click', () =>{
    if (selectedHabit !== undefined){
        selectedHabit.parentNode.remove();
    }
})

moveUpHabitElement.addEventListener('click', () => {
    changeHabitOrder(true);
})

moveDownHabitElement.addEventListener('click', () => {
    changeHabitOrder(false);
})

habitImpactButtonElement.forEach(habit => {
    habit.addEventListener('click', () =>{
        toggleHabitImpact(habit);
    })
})

