let isBeingEdited = false;
const show = document.querySelector(".task-show");
      const formInput = document.getElementById("form-input");
      const formDialog = document.getElementById("form-dialog");
      const taskContainer = document.getElementById("task-container");
      const createTask = document.getElementById("create-task");
      const titleInput = document.getElementById("title-input");
      const dateInput = document.getElementById("date-input");
      const descriptionInput = document.getElementById("description-input");
      const addUpdate = document.getElementById("add-update");
      const closeBtn = document.getElementById("close-btn");
      function dotdot(str,n){ if(str.split("").length>n){ return `${str.split("").splice(0,n).join("")}...`} else{return str} }
      let taskData = JSON.parse(localStorage.getItem("data")) || [];
      let currentTask = {};
      function reset() {
        titleInput.value = "";
        dateInput.value = "";
        descriptionInput.value = "";
        addUpdate.innerHTML = "Add";
        formDialog.close();
        currentTask = {};
      }
      closeBtn.addEventListener("click", reset);
      createTask.addEventListener("click", function () {
        formDialog.style.transform="translateX(0)"
        titleInput.focus();
      });
   function closeTask(){
    formDialog.style.transform="translateX(100%)"
   }
      function container() {
        taskContainer.innerHTML = "";
        taskData.forEach(({ id, title, date, description }) => {
          taskContainer.innerHTML += `<div id="${id}" class="task">
              <span>
            <span>${dotdot(title,15)}</span>
            <p>${date===""?dotdot(description,23):date}</p>
                </span>          
<span class="action-buttons">
 <button type="button" onclick="editBtn(this)"><i class="fa-solid fa-pen fa-1x"></i></button>
        <button type="button" onclick="expand(this)" class="expand-btn"><i class="fa-solid fa-up-right-and-down-left-from-center fa-1x"></i></button>
 <button type="button" onclick="delBtn(this)" id="del-button"><i class="fa-solid fa-trash fa-1x" onmouseover="wiggle(this)" onmouseout="stopwiggle(this)"></i></button>
 
              </span> 
            </div>`;
        });
      }
     function wiggle(em){
      em.classList.toggle("fa-shake");
     }
     function stopwiggle(em){
      em.classList.toggle("fa-shake");
     }

      function add() {
        let theTask = {
          id: `${titleInput.value.split(" ").join("-")}${Date.now()}`,
          title: titleInput.value,
          date: dateInput.value,
          description: descriptionInput.value,
        };
        const arrayIndex = taskData.findIndex(
          (item) => item.id === currentTask.id
        );
        if (arrayIndex === -1) {
          taskData.unshift(theTask);
        } else {
          taskData[arrayIndex] = theTask;
        }
        localStorage.setItem("data", JSON.stringify(taskData));
        container();
        reset();
      }
      
     
      function delBtn(elem) {
        let numArray = taskData.findIndex(
          (item) => item.id === elem.parentElement.parentElement.id
        );
        taskData.splice(numArray, 1);
        elem.parentElement.parentElement.remove();
        localStorage.setItem("data", JSON.stringify(taskData));
      }
      function expand(elem){
        // document.querySelectorAll(".task").forEach(el=>el.classList.remove("expand"));
        let currentTaskDiv = elem.parentElement.parentElement;
        let numArray = taskData.findIndex(
          (item) => item.id === currentTaskDiv.id
        );
        currentTask = taskData[numArray];
        let {id,title,date,description} = currentTask;
        currentTaskDiv.classList.add("expand")
currentTaskDiv.querySelector(".action-buttons").innerHTML='<button type="button" onclick="minimize(this)" style="transform:translateX(-20px);scale:1.5"><i class="fa-solid fa-down-left-and-up-right-to-center fa-1x"></i></button>'   
      setTimeout(function(){
currentTaskDiv.children[0].innerHTML=`
        <span>${title}</span>
            <p>${date===""?`${description.length} characters`:`${date} || ${description.length} characters`}</p>
          <p class="task-description">${description}</p>
       `
       },100);
      }
      function minimize(elem){
            let currentTaskDiv = elem.parentElement.parentElement;
        currentTaskDiv.classList.remove("expand");
        setTimeout(function(){
        currentTaskDiv.querySelector(".action-buttons").innerHTML='<button type="button" onclick="editBtn(this)"><i class="fa-solid fa-pen fa-1x"></i></button> <button type="button" onclick="expand(this)" class="expand-btn"><i class="fa-solid fa-up-right-and-down-left-from-center fa-1x"></i></button> <button type="button" onclick="delBtn(this)" id="del-button"><i class="fa-solid fa-trash fa-1x" onmouseover="wiggle(this)" onmouseout="stopwiggle(this)"></i></button> '
      },100);
      let numArray = taskData.findIndex(
          (item) => item.id === currentTaskDiv.id
        );
        currentTask = taskData[numArray];
        let {id,title,date,description} = currentTask;
       currentTaskDiv.children[0].innerHTML=`
         <span>${dotdot(title,15)}</span>
            <p>${date===""?dotdot(description,23):date}</p>
       `
      }
 function editBtn(elem) {
     isBeingEdited = true;
        let numArray = taskData.findIndex(
          (item) => item.id === elem.parentElement.parentElement.id
        );
        currentTask = taskData[numArray];
        addUpdate.innerHTML = "Change";
        titleInput.value = currentTask.title;
        dateInput.value = currentTask.date;
        descriptionInput.value = currentTask.description;
         formDialog.style.transform="translateX(0)"
        titleInput.focus();
        localStorage.setItem("data", JSON.stringify(taskData));
        
      }

      document.addEventListener("DOMContentLoaded", container);
      formInput.addEventListener("submit", function(e) {
         
        e.preventDefault();
        formDialog.style.transform="translateX(100%)"
        add();
        
      });