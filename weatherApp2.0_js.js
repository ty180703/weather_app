function getData(){
    const api_key = '798dbd09691b2d05d01f1ce9422aa8f7';
    const main =`https://api.openweathermap.org/data/2.5/weather?q=london&units=imperial&APPID=${api_key}`;

    let mainData = fetch(main)
        .then(res => {
            if (!res.ok){
                throw Error("error");
            }
            return res.json();})
        .then(data => {
            const acc = data["weather"][0]["main"];
        /*console.log(acc)*/});

}


getData()


/*
async function get_data(){
    const api_key = '798dbd09691b2d05d01f1ce9422aa8f7';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=london&units=imperial&APPID=${api_key}`;

    try {
        let res = await fetch(url);
        return await res.json();
        console.log(res.status);
        
    } catch (error){
        console.log('Error');
    }

};

async function weatherr(){
    let location_1 = get_data();
    console.log(location_1[["weather"][0]["main"]]);
}

console.log(get_data());
*/




let weather ={
    api_key:'798dbd09691b2d05d01f1ce9422aa8f7', 
    main:"https://api.openweathermap.org/data/2.5/weather?q= &units=imperial&APPID=",

    fetch_weather: function (city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            +city 
            +"&units=imperial&APPID=" 
            +this.api_key) /* have to use this. otherwise will return undefined */
        .then(res => {
            if (!res.ok){
                if (!res.ok){
                    throw Error("error"),
                    
                    document.querySelector(".weather").classList.remove("loading"), /**remove the original starting page */
                    document.querySelector(".card").classList.remove("clouds", "rain", "clear"), /**remove box shadow effect */
                    document.querySelector(".weather").classList.add("error")

                }

            }
            return res.json();})
       
        .then((data) => this.display_weather(data));
    },

    display_weather: function (data){
        const { name } = data;
        const { icon, description, main} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        const celcius= (temp - 32)*(5/9);
        const celcius_ = Math.trunc(celcius, 0);

        const kmh = speed;
        const mph = 0.6214 * kmh;
        const mph_ = Math.trunc(mph, 1);
        /*
        console.log(name, icon, description, celcius, speed, humidity);
        */
        /*changes text on sellected class from html  */
        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(".temp").innerText = `${celcius_}°C`;
        document.querySelector(".icon").innerText = ``;
        document.querySelector(".description").innerText = `${description}`;
        document.querySelector(".wind").innerText = `Wind Speed: ${mph_}mph`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".icon").src=("http://openweathermap.org/img/wn/" + icon +".png")

        if (main === "Rain") {
            document.querySelector(".weather").classList.remove("error"); /**removes the error class from the start  */
            document.querySelector(".card").classList.remove("clouds", "clear");
            document.querySelector(".card").classList.add("rain"); /**rember not to make it ".rain" should be "rain*/
        }else if (main === "Clouds") {
            document.querySelector(".weather").classList.remove("error"); /**removes the error class from the start  */
            document.querySelector(".card").classList.remove("rain", "clear"); /**remove existing class before add new one */
            document.querySelector(".card").classList.add("clouds");
        }else if (main === "Clear") {
            document.querySelector(".weather").classList.remove("error"); /**removes the error class from the start  */
            document.querySelector(".card").classList.remove("rain", "clouds");
            document.querySelector(".card").classList.add("clear");
        };
        
        

        /**changes the background to the cityname typed in */
        document.body.style.background = "url('https://source.unsplash.com/random/1920x1080/?wallpaper,"+ name +"')";

        document.querySelector(".weather").classList.remove("loading");
    },

    /**find city value typed in by user in searchbar and put that as the city variable in fetch weather to get it*/
    search: function () {
        let searchcity = document.querySelector(".searchbar").value;
        this.fetch_weather(searchcity)
    },
};

/**search button - when click search icon go to function search inside weather */
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})

/**query select searchbar cause only when click on searchbar to search will it work */
document.querySelector(".searchbar").addEventListener("keydown", function (Event){ 
    if (Event.which === 13){
        weather.search();
    }
    
});