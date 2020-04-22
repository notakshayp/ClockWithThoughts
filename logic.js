
let clock=document.getElementById("clock");
let thought=document.getElementById("thought");
let author=document.getElementById("author");
const thoughtUrl= "https://www.reddit.com/r/Showerthoughts/new/.json?count=1";
let prevMin="00";
function clockFun(){
    let time=new Date();
    let hour=(time.getHours()%12).toString();
    let minute=time.getMinutes().toString();
    let second=time.getSeconds().toString();
  
    if(hour.length < 2){
        hour='0'+`${hour}`;
    }
    if(minute.length < 2){
        minute='0'+`${minute}`;
    }
    if(second.length < 2){
        second='0'+`${second}`;
    }
    let timeVal=hour+" : "+minute+" : "+second;
    // console.log(timeVal);
    if(prevMin!=minute){
        prevMin=minute;
        fetch(thoughtUrl)
        .then((response)=>{
            return response.json();
        })
        .then((dataFetched)=>{
            let authorUpdated=dataFetched.data.children[0].data.author;
            let titleUpdated=dataFetched.data.children[0].data.title
            // console.log(authorUpdated)
            // console.log(titleUpdated);
            author.textContent=" u/"+authorUpdated;
            thought.textContent=titleUpdated;
        });
    }
    
    clock.textContent=timeVal;


    var bgcolurHex='#'+hour+minute+second;
    

    document.body.style.backgroundColor=bgcolurHex;
}

clockFun();
setInterval(clockFun,1000);