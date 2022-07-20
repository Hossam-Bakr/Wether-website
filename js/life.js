
var today, hour, minutes, year;

var e = new Date();
month = e.getMonth();
today = e.getUTCDay()
todayAtmonth = e.getDate();
month = e.getMonth();
year = e.getFullYear();
hour = e.getHours();
minutes = e.getMinutes();

async function search(key) {
    let pureResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${key}&days=3`);
    if (pureResponse.ok && 400 != pureResponse.status) {
        deleteOldCanvas()

        response = await pureResponse.json()
        displayData(response)
        console.log(response)
        createCanvas(response)
    }
}
search("shaban")
var inputsearch = document.getElementById("search")
inputsearch.addEventListener("keyup", function (e) {

    if (e.target.value != null) {
        search(e.target.value)
    }

});


function drawcanvasAgain() {
    var canvasOneParent = document.getElementById("canvasOneParent")
    canvasOneParent.innerHTML = ` <canvas width="200" height="200" class="cn" id="can-one"></canvas>`

    var canvasTwoParent = document.getElementById("canvasTwoParent")
    canvasTwoParent.innerHTML = ` <canvas width="200" height="200" class="cn" id="can-two"></canvas>`

    var canvasThreeParent = document.getElementById("canvasThreeParent")
    canvasThreeParent.innerHTML = ` <canvas width="200" height="200" class="cn" id="can-three"></canvas>`
}



var days = ["sunday", "monday", "Tuesday", "Wednesday", "Thursday", "friday" ,"saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var humidity = document.getElementById("humidity")
var wind_dir = document.getElementById("wind_dir")
var daily_chance_of_rain = document.getElementById("daily_chance_of_rain");
var wind_kph = document.getElementById("wind_kph");
var lat = document.getElementById("lat");
var lon = document.getElementById("lon");
var countryName = document.getElementById("title");
var time = document.getElementById("time");
var day = document.getElementById("day");
var desc = document.getElementById("desc");
var desc_2 = document.getElementById("desc_2");
var desc_3 = document.getElementById("desc_3");


var dayOne = document.getElementById("dayOne");
var dayTwo = document.getElementById("dayTwo");
var dayThree = document.getElementById("dayThree");

function displayData(r) {
    
    day.innerHTML =
        `
        ${days[today]}
        `

    var test = response.location.localtime.substring(11);
    var isAm = "am";
    if (test.substring(0,2) > 11) {
        isAm = "bm"
    }
    time.innerHTML =
        `
        
        ${test } ${isAm}
        `
    countryName.innerHTML =
        `
            ${r.location.name}
        `
    humidity.innerHTML =
        `
            <h3>Humidity</h3><br> <span>${r.current.humidity} % </span>
        `
    wind_dir.innerHTML =
        `
            <h3>Wind dir </h3><br> <span>${r.current.wind_dir} </span>
        `
    daily_chance_of_rain.innerHTML =
        `
            <h3>Chance of rain </h3><br> <span>${r.forecast.forecastday[0].day.daily_chance_of_rain} </span>
        `
    lat.innerHTML =
        `
            <h3>Latitude </h3><br> <span>${r.location.lat} </span>
        `
    lon.innerHTML =
        `
            <h3>Longitude</h3><br> <span>${r.location.lon} </span>
        `
    wind_kph.innerHTML =
        `
            <h3>Wind Speed </h3><br> <span>${r.current.wind_kph} k/h</span>
        `
    dayOne.innerHTML =
        `
        <h6> ${todayAtmonth} ${months[month]}  ${year} </h6>
        
        `
    dayTwo.innerHTML =
            `
            <h6> ${r.forecast.forecastday[1].date}</h6>
            
            `
    dayThree.innerHTML =
        `
        <h6>${r.forecast.forecastday[2].date} </h6>
        
        `
    desc.innerHTML =
        `
            <h5 class="text-light">
                ${r.forecast.forecastday[0].day.condition.text}
            </h5>
            <img src="http:${r.forecast.forecastday[0].day.condition.icon}" alt="bnszjnJ">
        `
    desc_2.innerHTML =
        `
            <h5 class="text-light">
                ${r.forecast.forecastday[1].day.condition.text}
            </h5>
            <img src="http:${r.forecast.forecastday[1].day.condition.icon}" alt="bnszjnJ">
        `
    desc_3.innerHTML =
        `
            <h5 class="text-light">
                ${r.forecast.forecastday[2].day.condition.text}
            </h5>
            <img src="http:${r.forecast.forecastday[2].day.condition.icon}" alt="bnszjnJ">
        `
}

//=================================---------------  canvas ------------------=================
function createCanvas(r) {
    drawcanvasAgain();
    let t = (r.current.temp_c / 100)
    let thecanvas = document.getElementById("can-one");
    thecontext = thecanvas.getContext("2d");
    thecircle = 2 * Math.PI;
    thecontext.lineWidth = 30;
    thecontext.arc(100, 100, 100, 0, t * thecircle)
    thecontext.strokeStyle = "rgba( 255,5,66,1)";
    thecontext.font = "55px tahoma";
    thecontext.textAlign = "center"
    thecontext.fillStyle = "#f84"
    thecontext.fillText(`${Math.round(t * 100)} C`, thecanvas.width / 2, (thecanvas.height / 2) + 10)
    thecontext.stroke();

    let t_2 = (r.current.temp_c / 100)
    let thecanvasTwo = document.getElementById("can-two");
    thecontext = thecanvasTwo.getContext("2d");
    thecircle = 2 * Math.PI;
    thecontext.lineWidth = 30;
    thecontext.arc(100, 100, 100, 0, t_2 * thecircle)
    thecontext.strokeStyle = "rgba( 48,155,66,1)";
    thecontext.font = "40px tahoma";
    thecontext.textAlign = "center"
    thecontext.fillStyle = "#fff"
    thecontext.fillText(`${Math.round(t * 100)} C`, thecanvas.width / 2, (thecanvas.height / 2) + 10)
    thecontext.stroke();

    let t_3 = (r.forecast.forecastday[2].day.avgtemp_c / 100);
    let thecanvasThree = document.getElementById("can-three");
    thecontext = thecanvasThree.getContext("2d")
    thecircle = 2 * Math.PI;
    thecontext.lineWidth = 30;
    thecontext.arc(100, 100, 100, 0, t_3 * thecircle)
    thecontext.strokeStyle = "rgba( 169,155,255,1)";
    thecontext.font = "40px tahoma";
    thecontext.textAlign = "center"
    thecontext.fillStyle = "#fff"
    thecontext.fillText(`${Math.round(t_3 * 100)} C`, thecanvas.width / 2, (thecanvas.height / 2) + 10)
    thecontext.stroke();
    //=================================--------------- end canvas ------------------=================
}
function deleteOldCanvas() {
    var canvasOneParent = document.getElementById("canvasOneParent")
    canvasOneParent.innerHTML = " "

    var canvasTwoParent = document.getElementById("canvasTwoParent")
    canvasTwoParent.innerHTML = " "

    var canvasThreeParent = document.getElementById("canvasThreeParent")
    canvasThreeParent.innerHTML = " "

    //=================================--------------- end canvas ------------------=================
}






