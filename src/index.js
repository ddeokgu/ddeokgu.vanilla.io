// 변수 선언
const btnBg = document.querySelector("#btnGo");
const dDay = document.querySelector("#date");
const body = document.querySelector("body");
const toDoForm = document.getElementById("todoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todoList");
const loginForm = document.getElementById("loginForm");
const loginInput = loginForm.querySelector("input");
const txtLogin = document.getElementById("txtLogin");
const TODOS_KEY = "todos";
const HIDDEN_CALSSNAME = "hidden";
const ID_KEY = "ID";

// 시계 기능
function nowDate() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
 
  const dDayInfo =
    month + "월" + day + "일" + "\n" +" " + hour + ":" + minute + ":" + second;

    dDay.innerText = dDayInfo;
}

// 배경화면 기능
function bgChange() {
  let no = Math.floor(Math.random() * 10) + 1;
  body.style.backgroundImage = `url(src/resources/images/img_bg_${no}.jpeg)`;
}
btnBg.addEventListener("click", bgChange);

// todo List
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(e) {
  const li = e.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}
function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  li.appendChild(span).innerText = newTodo.text;

  const button = document.createElement("button");
  button.innerText = "x";
  button.addEventListener("click", deleteTodo);

  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintTodo);
}

function sezyFilter() {}
[1, 2, 3, 4].fill(sezyFilter);

// login
function login(event) {
  event.preventDefault();

  const ID = loginInput.value;
  if(ID === "") {
    alert("Please write yout nickname!");
  }
  loginForm.classList.add(HIDDEN_CALSSNAME);
  localStorage.setItem(ID_KEY, ID);
  paintGreeting(ID);
}

function paintGreeting(savedId) {
  txtLogin.innerText = `Welcome ${savedId}!`;
  txtLogin.classList.remove(HIDDEN_CALSSNAME);
}

const savedId = localStorage.getItem(ID_KEY);
if(savedId === null) {
  loginForm.classList.remove(HIDDEN_CALSSNAME);
  loginForm.addEventListener("submit", login);
} else {
  paintGreeting(savedId);
}



// weather, location
const weather = document.querySelector(".weather");
const API_KEY = "24bddf0e834447297f37396265259d10";
const COORDS = "coords";

// 여기서 fetch 함수는 requests 함수와 같은 역할.
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperature = Math.floor(json.main.temp);
            const place = json.name;
            weather.innerText = `${temperature}°C ${place}`;
        })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치정보 획득에 성공하면 실행하는 함수
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}


// 위치정보 획득에 실패하면 실행하는 함수.
function handleGeoError(){
  console.log("location error");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); 
}

// 로컬 스토리지에 정보가 없으면 요청.
function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
      askForCoords();
  } else {
      const parsedCoords = JSON.parse(loadedCoords);
      getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  nowDate();
  setInterval(nowDate, 1000);
  loadCoords();
}
init();
