const app = document.querySelector('.weather-app')
const temp = document.querySelector('.temp')
const conditionOutput = document.querySelector('.condition')
const nameOutput = document.querySelector('.name')
const visibility = document.querySelector('.Visibility')
const humidityOutput = document.querySelector('.humidity')
const windOutput = document.querySelector('.wind')
const form = document.querySelector('.locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const icon = document.querySelector('.icon')
const cities = document.querySelectorAll('.city')


let cityInput = 'Kathmandu'
fetchWeatherData()

cities.forEach((city) => {
    city.addEventListener('click', (e) => {

        cityInput = e.target.innerHTML;

        fetchWeatherData()
    })
})

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in city name')
    } else {
        cityInput = search.value
        fetchWeatherData()
        search.value = ""
    }

    e.preventDefault()
})


function fetchWeatherData() {
    fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=3265874a2c77ae4a04bb96236a642d2f&units=metric`).then(response => response.json()).then(data => {

        temp.innerHTML = data.main.temp + "&#176;"

        conditionOutput.innerHTML = data.weather[0].description
        nameOutput.innerHTML = data.name
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        humidityOutput.innerHTML = data.main.humidity + '%'
        windOutput.innerHTML = data.wind.speed + 'm/s'
        visibility.innerHTML = data.visibility / 1000 + 'km'
        app.style.backgroundImage = `url('images/day/${data.weather[0].main}.jpg')`
    })
}
