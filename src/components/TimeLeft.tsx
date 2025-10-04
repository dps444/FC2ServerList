import {useState,useEffect} from "react";
type Props = {
  start_time: number;
  time_limit: number;
  extends: number;
}
export default function TimeLeft(props:Props){
  const [timeLeft,setTimeLeft] = useState("null");
  function countdownTimer(){
    if(props.start_time === 0) setTimeLeft("In lobby");
    else{
      let s=Math.floor(((Date.now()-(props.start_time*1000))%60000)/1000).toString();
  		let m=Math.floor(((Date.now()-(props.start_time*1000))%3600000)/60000).toString();
  		if(s.length==1) s="0"+s;
  		if(m.length==1) m="0"+m;
      if(props.extends===0) setTimeLeft(`${m}:${s} / ${Math.floor(props.time_limit/60)}:00`);
      else setTimeLeft(`${m}:${s} / ${Math.floor((props.time_limit+(props.extends*300))/60)}:00 (${props.extends} extends)`);
    }
  }
  useEffect(()=>{
    setInterval(countdownTimer,1000);
  },[props.start_time]);
  return (
    <span>{timeLeft}</span>
  );
}
