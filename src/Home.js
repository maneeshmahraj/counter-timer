import { useEffect, useState } from "react";




const Home = () => {
   
  const [isStart,setIsStart]=useState(false);
  const [hours,setHourse]=useState(0);
  const [minutes,setMinutes]=useState(0);
  const [seconds,setSeconds]=useState(0)
  const [timerId,setTimerId]=useState(0);
const [isPused,setIsPused]=useState(false)

const handlClick=()=>{
  if(hours<0 || minutes<0 || seconds<=0)
    {
      alert("invalid selection")
      return;
    }
    else
    {
      setIsStart(true)
    }
}
  const handleInput=(e)=>{
    let id=e.target.id;
    let value=parseInt(e.target.value);
   if(id=='hours')
    {
      setHourse(value);
    }
    else if(id=='minutes')
      {
        setMinutes(value)
      }
      else{
        setSeconds(value)
      }
  }
  const timerFun=(hr,mi,sec,tid)=>
  {
             if(sec>0)
              {
                setSeconds((s)=>s-1)
              }
              else if(sec===0&&mi>0)
                {
                  setMinutes((m)=>m-1);
                  setSeconds(59);
                }
                else{
                  setHourse((h)=>h-1)
                  setMinutes(59);
                  setSeconds(59);
                }
                if(sec===0&& mi===0&&hr===0)
                  {
                     setHourse(0);
                     setMinutes(0)
                     setSeconds(0)
                     clearInterval(tid);
                     alert("timer Complete!!")
                  }
  }
  const handlePuse=()=>{
    setIsPused(true);
    clearInterval(timerId);
  }
  const handleResume=()=>{
    timerFun(hours,minutes,seconds);
    setIsPused(false)

  }
  const handleReset=()=>{
    
     setHourse(0);
     setMinutes(0);
     setSeconds(0);
     setIsStart(false);
    
 }
  useEffect(()=>{
    let tid;
    if(isStart)
      {
         tid=setInterval(()=>{
          timerFun(hours,minutes,seconds,tid)
        },1000)
      }
      setTimerId(tid);
      return ()=>{
        clearInterval(tid)
      }
  },[isStart,hours,minutes,seconds])
  return(
   <>
   <div className="container">
    <h1>! Counter Timer !</h1>
   {
    !isStart&&( <div className="counter-items">
      <div className="input-box">
        <input id="hours" onChange={handleInput} placeholder="HH"/>
        <input id="minutes" onChange={handleInput} placeholder="MM"/>
        <input id="seconds" onChange={handleInput} placeholder="SS"/>

      </div>
      <div className="btn-box">
        <button onClick={handlClick}>start</button>
      </div>

    </div>)
   }
   
   {
    isStart&&( <div className="timer-item">
      <div className="items">
        <div>{hours<10?`0${hours}`:hours}</div>
        <span>:</span>
        <div>{minutes<10?`0${minutes}`:minutes}</div>
        <span>:</span>
        <div>{seconds<10?`0${seconds}`:seconds}</div>
      </div>
      <div className="items-btn">
       {
       !isPused &&( <button onClick={handlePuse}>puse</button>)
       }
       {
        isPused&&( <button onClick={handleResume}>resume</button>)
       }
        <button onClick={handleReset}>reset</button>

      </div>
  </div>)
   }

   </div>
   </>
  )
}

export default Home;