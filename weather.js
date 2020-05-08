const weather = document.querySelector(".js-weather");

const API_KEY = "9104acc964770c700b7e7f33782d7145";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    // 데이터를 얻는 방법 fetch()안에는 가져올 데이터를 입력, 앞에 https:// 입력 ※ 따옴표가 아닌 BACKTICK(`)을 사용
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      // then을 사용하지 않을 경우 fetch를 기다리지 않고 다음작업을 지시하면, 다음 작업은 fetch가 완료되길 기다리지 않음(정상적으로 완료 불가)
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${parseInt(temperature)}℃ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geolocation");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
