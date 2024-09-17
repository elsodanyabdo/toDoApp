let input = document.querySelector(".input");
let btn = document.querySelector(".add");
let tasks = document.querySelector(".tasks");


//empty array to store the tasks
let arrayOfTasks =[];


if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage(); 
//add task
// makeDeleteBtn(); 
btn.onclick = function () {
    if (input.value != "") {
        addTaskToArray(input.value); //add to array of tasks
        input.value = ""; //empty input field
    }
}



//click on task element
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove()
    deleteElement(e.target.parentElement.getAttribute("data-id"));
  } 
  //function to make update to states
  if (e.target.classList.contains("task")) {
    updateStates(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
})

function addTaskToArray(taskText) {
    // task data 
    const task = {
      id: Date.now(),
        title: taskText,
        completed: false
    };
    //push task to array of tasks 
    arrayOfTasks.push(task);
    // add array of tasks to html
    addElementsToPageFromArray(arrayOfTasks);
    //add tasks to local storage
    addDateToLocalStorageFromArrayOfTAsks(arrayOfTasks);
}
function addElementsToPageFromArray(arrayOfTasks) {
    // empty the tasks div to no need to repeat the elements
    tasks.innerHTML = "";
    //looping of array of tasks
    arrayOfTasks.forEach((task) => {
        // create main div 
      let div = document.createElement("div");
        div.className = "task";
        //check if task is done 
        if (task.completed) {
        div.className = "task done";
            
        }
      div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //create btn to delete
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("delete"));
      div.appendChild(span);
      
        //append the main div to tasks to show it in your page
      tasks.appendChild(div)
    });
}

function addDateToLocalStorageFromArrayOfTAsks(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data)
    addElementsToPageFromArray(tasks);
  }
}

function deleteElement(taskId) {
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   if (arrayOfTasks[i].id === taskId) {
  //     arrayOfTasks.splice(i, 1);
  //   }
  //   console.log(`${arrayOfTasks[i].id} ==== ${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDateToLocalStorageFromArrayOfTAsks(arrayOfTasks);
}

function updateStates(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
      }
  }
    addDateToLocalStorageFromArrayOfTAsks(arrayOfTasks);
}
// function makeDeleteBtn() {
//   let btnDel = document.createElement("button");
//   btnDel.className = "delAll";
//   btnDel.appendChild(document.createTextNode("delete all"))
//   tasks.appendChild(btnDel)
//   btnDel.onclick(deleteAll());

// }

// function deleteAll() {
//   tasks.innerHTML = "";
//   localStorage.clear();
//         addDateToLocalStorageFromArrayOfTAsks(arrayOfTasks);
// }