import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowUpCircleFill, BsArrowDownCircleFill, BsPlayCircleFill, BsPauseFill } from 'react-icons/bs';
import { MdRefresh } from 'react-icons/md';
import { useState,useEffect } from 'react';

const bodyStyles = {
  fontFamily: "'Times New Roman', Times, serif",
  color:"#fff",
  backgroundColor: "#1e555c",
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  justifyContent:"center",
  alignItems: "center",
  overflow: "auto"
}

const containerStyles = {
  display:"flex",
  flexDirection:"column",
  alignItems:"center"
}

const lengthStyles = {
  display: "flex",
  flexDirection: "row"
}

const arrowIconsStyles = {
  fontSize: "1.6rem",
  fontWeight: "bolder",
  marginTop: "6px"
}

const twentyFifthLeftArrowIconStyles = {
  marginLeft: "-9px",
  fontSize: "1.6rem",
  fontWeight: "bolder",
  marginTop: "6px"
}

const buttonStyles = {
  backgroundColor: "transparent",
  border: "none",
  color: "white",
  height:"3.5rem",
  marginTop:"-12px"
}

function App() {

  const [ breakLength, setBreakLength ] = useState(5);
  const [ sessionLength, setSessionLength ] = useState(25);
  const [ timeLeft, setTimeLeft ] = useState(1500);
  const [ play, setPlay ] = useState(false);
  const [ timingType, setTimingType ] = useState("session");

  function timeOut(){
    setTimeout(() => {
    if(timeLeft && play){
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);
}

    
  function incrementBreak(){
    if(breakLength < 60){
      setBreakLength(breakLength + 1);
    }
  }

  function decrementBreak(){
    if(breakLength > 1){
      setBreakLength(breakLength - 1);
    }
  }

  function incrementSession(){
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  }

  function decrementSession(){
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  }

  const title = timingType;

  function timeFormater(){
    const minutes = Math.floor(timeLeft/60);
    const seconds = Math.floor(timeLeft - minutes * 60); // or timeLeft % 60;
    const finalMinutes = minutes < 10 ? "0" + minutes : minutes;
    const finalSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${finalMinutes}:${finalSeconds}`;
  }

  function handlePlay(){
    setPlay(true);
    clearTimeout(timeOut());
  }

  function handlePause(){
    setPlay(false);
  }

  function handleRefresh(){
    clearTimeout(timeOut());
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setTimingType("session");
    setPlay(false);
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
   }

  function resetTimer(){
    const audio = document.getElementById("beep");
    if( !timeLeft && timingType === "session" ){
      audio.play();
      setTimingType("BREAK");
      setTimeLeft(breakLength * 60);
    }

    if( !timeLeft && timingType === "BREAK"){
       setTimeLeft(sessionLength * 60);
       setTimingType("session");
       audio.pause();
       audio.currentTime = 0;
    }
  }

  
  useEffect( function clock(){
    if(play){
    timeOut();
    resetTimer();
  }
  else{
   clearTimeout(timeOut())
   }
  }, [play,timeLeft]);

  return (
    <body style={bodyStyles}>

      <div style={containerStyles} className="mt-1 w-75 h-75">
         <div><h1 style={{width:"100%"}} className="text-center display-4">25 + 5 Alarm Clock</h1></div>
         
         <div style={lengthStyles}>
            <div style={{margin:"24px 34px 1px 24px"}}> 
              <p className="mb-1 display-6">Break Length</p>
              <div className="text-center display-6 d-flex justify-content-center gap-2"> 
                
                <button style={buttonStyles} disabled={play}>
                <BsArrowUpCircleFill 
                style={arrowIconsStyles}
                onClick={incrementBreak}
                />
                </button>

                <p>{breakLength}</p>

                <button style={buttonStyles} disabled={play}>
                <BsArrowDownCircleFill 
                style={arrowIconsStyles}
                onClick={decrementBreak}
                />
                </button>
              </div>
            </div>

            <div style={{margin:"24px 24px 1px 24px"}}>
              <p className="mb-1 display-6">Session Length</p>
              <div className="text-center display-6 d-flex justify-content-center gap-2">
              
              <button style={buttonStyles} disabled={play}>
              <BsArrowUpCircleFill 
              style={twentyFifthLeftArrowIconStyles}
              onClick={incrementSession}
              />
              </button>

              <p>{sessionLength}</p>
              
              <button style={buttonStyles} disabled={play}>
              <BsArrowDownCircleFill 
              style={arrowIconsStyles}
              onClick={decrementSession}
              />
              </button>
              </div>
            </div>
         </div>

         <div className="col-lg-3 col-8 rounded-5 mt-3" style={{border: "0.5rem solid #13353a"}}>
             <p className={ timingType === "session" 
              ? ( timeLeft <= 60 ? "text-danger text-center mb-1 mt-1 fs-2" : "text-light text-center mb-1 mt-1 fs-2")
              : "break text-center mb-1 mt-1 fs-2"}>
                {title}
              </p>

             <p className={ timingType === "session"
              ? ( timeLeft <= 60 ? "text-danger display-3 text-center" : "text-light display-3 text-center") 
              : "break display-3 text-center"}>
             {timeFormater()}
             </p>
         </div>

         <div className="d-flex h-25 w-50 justify-content-center gap-3 mt-2 fs-1">
              <BsPlayCircleFill
              onClick={handlePlay}
              />
              <BsPauseFill
              onClick={handlePause}
              />
              <MdRefresh
              onClick={handleRefresh}/>      
         </div>

         <div className="mt-1 h-auto d-flex flex-column align-items-center">
          <p>Designed and Coded By</p>
          <p>Leslie Abayo</p>
         </div>
      </div>
      <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />

    </body>
  )
}

export default App;
