// Personal API Key for OpenWeatherMap API
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = '3b7b52992064000acd5df9fd758bf690';

/* Function to GET Web API Data*/
const fetchdata = async (zipCode) => {   
    const myURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`  
    const datafetched = await fetch(myURL);
    console.log(datafetched)
    const readable = await datafetched.json();
    console.log(readable.message)
    const temp = readable.main.temp;
    return temp;
}

// Event listener to add function to existing HTML DOM element
const generate = document.querySelector('#generate');
/* Function called by event listener */


generate.addEventListener('click', async ()=>{              /* Function called by event listener */
    const zipCode = document.querySelector('#zip').value;   //zip code from the user
    const myURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
    const datafetched = await fetch(myURL);
    console.log(datafetched)
    const readable = await datafetched.json();
    console.log(readable)

    
    fetchdata(zipCode)
            .then(function(data){
                url = '/postWeather'
                const feelings = document.querySelector('#feelings').value;    //Feelings from the user
                console.log(feelings)
                dataposted(url,data, feelings)
                })
                .then(()=>{
                    if(feelings.value === ''){
                        return alert("Please enter your feelings!");
                    }
                    if( readable.cod !== '404' && readable.cod !== '400'){
                        console.log("sa7")
                        updateUI();
                    }
    
       
    
    })

})

/* Function to POST data */
async function dataposted(url,temp, feelings){       /* Function to POST data */
    let fetchedData = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
       // Body data type must match "Content-Type" header
        
        body: JSON.stringify({
            date:newDate,
            temp:temp,
            feelings:feelings
        })
      })
}
/* Function to GET Project Data */
async function updateUI(){
    const fetchedData = await fetch('/Temp');
    const jsData = await fetchedData.json()
    document.querySelector('#date').innerHTML = "Date: " + newDate ;
    document.querySelector('#temp').innerHTML = "Temperature: " + jsData.temp;
    console.log(feelings+"sss")
    document.querySelector('#content').innerHTML = "Feelings: " + jsData.feelings;
   
}