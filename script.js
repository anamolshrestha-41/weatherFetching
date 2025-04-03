const inputCity = document.querySelector("input");
const button = document.querySelector("button");

const weatherDetails= async()=>{
    let yourCity = inputCity.value.trim();
    if(!yourCity){
        alert("Please Enter Your City!!");
        return;
    }
    try{
        let responsefromAPI= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${yourCity}&appid=03325d37b1b225838e4efbfa9129a11c&units=metric`);
        if(!responsefromAPI.ok){
            throw new Error("errOR IN FETCHING DATA");            
        }
        let datas = await responsefromAPI.json();
        let temperature = datas.main.temp;
        let humidity = datas.main.humidity;
        let windSpeed = datas.wind.speed;

        document.getElementById("city").innerText= yourCity;
        document.getElementById("temperature").innerText=`${temperature}°C`;
        document.getElementById("humidity").innerText=`${humidity}%`;
        document.getElementById("windSpeed").innerText=`${windSpeed}m/s`;

    }
    catch(error){
        alert(error.message);
    };
};
//after clicking button
button.addEventListener("click", ()=>{
    weatherDetails();
});
//after pressing enter
inputCity.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
        weatherDetails();
    }
});