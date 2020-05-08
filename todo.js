const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"), // querySelector HTML에서 필요한 것들을 얻는다는 뜻
  toDoBtn = document.querySelector("i");

const TODOS_LS = "toDos";

let toDos = []; // 해야할 일을 생성할 때마다 'toDos'라는 array에 추가되도록 만듦 + 변수 재할당을 위해 let 사용(const는 변수 재할당이 불가능)

function deleteToDo(event) {
  /*  console.log(event.target.parentNode); console.dir을 이용하여 디렉토리들을 확인해 볼 수 있음(parentNode누가 삭제되는지 확인),
  어떤 버튼이 클릭되었는지 알기 위해 target을 사용*/
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); // li의 id가 String이므로 int형으로 변환
  }); // filter는 forEach에서 function을 실행하는것 같이 각각의 item과 같이 실행이 됨
  toDos = cleanToDos;
  saveToDos();
} // X이모지를 누를 경우 TODO리스트를 삭제 할 수 있게끔 만듦

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // 그냥 toDos라고 입력하면 Local Storage에서 value값이 Objet로 출력되므로 String으로 바꿔줘야함
  // JSON = JavaScript Objet Notation의 준말
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌"; // emoji는 윈도우키와 .키를 같이 누르면 생성
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text; // text는 submit function에서 온 값
  li.appendChild(delBtn);
  li.appendChild(span); // appendChild는 괄호 안의 값을 자식노드로 만듦, append : 덧붙이다, 첨부하다
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text, // text라는 key에 이 text가 value로 옴
    id: newId,
  };
  toDos.push(toDoObj); // toDos라는 리스트에 toDoObj를 넣음 push(저장), pop(삭제)
}

function handleSubmt(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // 입력후 텍스트가 남아 있는 것을 없애줌
  saveToDos();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // Object로 변환
    parsedToDos.forEach(function (toDo) {
      // forEach는 기본적으로 함수를 실행하는데, array에 담겨있는 것들 각 한번씩 함수를 실행시켜줌
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmt);
}

init();
// filter와 forEach을 잘 이해(기억)해야함(list에 있는 모든 item을 위한 함수를 실행시킴)
