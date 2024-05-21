const inp = document.getElementById("input-el");
const addbtn = document.getElementById("add-btn");
const ulEl = document.getElementById("ulel");
const deletebtn = document.getElementById("delete-all");
let mytasks = []

let gettasks = JSON.parse(localStorage.getItem("mytasks"));
if(gettasks){
    mytasks = gettasks;
    rendertasks();
}

deletebtn.addEventListener("click", function(){
    if(mytasks.length!==0){
        mytasks = []
        localStorage.clear();
        rendertasks();
    } else{
        alert("TASK LIST EMPTY!")
    }
})

addbtn.addEventListener("click", function(){
    if(inp.value === ""){
        alert("Please write something!");
    } else{
        mytasks.push({ text: inp.value, checked: false });
        inp.value = ""
        localStorage.setItem("mytasks", JSON.stringify(mytasks))
        rendertasks();
    }
    
})

function rendertasks(){
        let listitems = ""
        for(let i=0; i<mytasks.length; i++){
            const task = mytasks[i];
            listitems += 
        `<li class="${task.checked ? 'checked' : ''}" onclick="toggleCheck(${i})">
        <div class="icon"></div>
            <a target='_blank' href='${task.text}'>${task.text}</a>
            <button onclick="event.stopPropagation(); removeTask(${i})">&times;</button>
        </li>`;
            
        }
        ulEl.innerHTML = listitems
}
function removeTask(index) {
    mytasks.splice(index, 1);
    localStorage.setItem("mytasks", JSON.stringify(mytasks))
    rendertasks(); 
}

function toggleCheck(index) {
    mytasks[index].checked = !mytasks[index].checked;
    localStorage.setItem("mytasks", JSON.stringify(mytasks));
    rendertasks();
}