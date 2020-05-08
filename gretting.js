const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"); //querySelector은 첫번째 것만 가져오고, querySelectorAll은 모든걸 가져옴

const USER_LS = "currentUser", // lS = local Storage(정보를 유저 컴퓨터에 저장하는 방법), currentUser는 Key값의 이름
  SHOWING_CN = "showing"; // CN = Class Name

function saveName(text) {
  localStorage.setItem(USER_LS, text);
} // 새로고침 시 이름 저장

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value; // console.log(currentValue);를 입력 후 네임텍스트창에서 아무 키 입력 후 엔터하게 되면 콘솔창에서 작동함(값을 가지게 함)
  paintGreeting(currentValue); // form 안 input의 값으로 paintGreeting함수(text만 사용)를 사용
  saveName(currentValue); // form.input의 값을 저장(새로고침에도 저장)
} // 제출할 양식 칸

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit); // 제출을 한다는 의미로 submit, 마우스 클릭일 때 click과 비슷(클릭할 시, submit이므로 제출할 시)
} // 이름을 저장하기 전 묻는 텍스트파일

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello! ${text}.`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // 이름을 저장하기 전
    askForName();
  } else {
    // 이름을 저장한 후
    paintGreeting(currentUser);
  }
} // local Storage를 생성

function init() {
  loadName();
}

init();
