let messageOne = document.getElementById("messageOne");
let messageTwo = document.getElementById("messageTwo");

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchLoc = document.querySelector('input').value;
    messageOne.innerText = "Loading";
    messageTwo.innerText = "";
    const apiUrl = `/weather?address=${searchLoc}`;
    fetch(apiUrl).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.innerText = data.error;
            }else{
                messageOne.innerText = data.location;
                messageTwo.innerText = data.forcastData;
            }
        });
    }).catch(()=>{
        console.log("Something went wrong");
    })
});