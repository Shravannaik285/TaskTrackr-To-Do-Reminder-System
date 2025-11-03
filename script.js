const taskNameInput=document.getElementById('taskName');
const taskTimeInput=document.getElementById('taskTime');
const addTaskBtn=document.getElementById('addTask');
const taskList=document.getElementById('tasks');

const reminderPopup=document.getElementById('reminderPopup');
const reminderText=document.getElementById('reminderText');
const closePopupBtn=document.getElementById('closePopup');

let tasks=[];

addTaskBtn.addEventListener("click",()=>{
    const taskName=taskNameInput.value.trim();
    const taskTime=taskTimeInput.value;

    if(taskName===""||taskTime===""){
        alert("Please enter both task name and time!");
        return;
    }

    const task={
        name:taskName,
        time:new Date(taskTime).getTime(),
        completed:false
    };

    tasks.push(task);
    displayTask(task);
    taskNameInput.value="";
    taskTimeInput.value="";
});

function displayTask(task){
    const li=document.createElement("li");
    li.textContent=task.name;

    li.addEventListener("click",()=>{
        li.classList.toggle("completed");
        task.completed=!task.completed;
    });

    taskList.appendChild(li);
}

setInterval(()=>{
    const currentTime=new Date().getTime();
    tasks.forEach(task=>{
        if(!task.completed&&Math.abs(task.time-currentTime)<30000){
            showReminder(task.name);
            task.completed=true;
        }
    });
},30000);

function showReminder(taskName){
    reminderText.textContent=`⏰ Reminder: "${taskName}" time has come!`;
    reminderPopup.style.display="block";
}

closePopupBtn.addEventListener("click",()=>{
    reminderPopup.style.display="none";
});
