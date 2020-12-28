const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

const TODO_LS = "toDO";
let toDo = [];

function deleteToDo(e) {
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDo = toDo.filter(toDos => {
    return toDos.id !== +(li.id);
  });
  toDo = cleanToDo;
  saveTodo();
}

function saveTodo() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDo));
}

function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDo.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener('mousedown', deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDo.push(toDoObj);
  saveTodo();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadToDo = localStorage.getItem(TODO_LS);
  if(loadToDo !== null){
    const parsedToDo = JSON.parse(loadToDo);
    parsedToDo.forEach(toDos => paintToDo(toDos.text));
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();