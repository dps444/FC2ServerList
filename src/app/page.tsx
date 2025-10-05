'use client';
import DataTable from '@/components/DataTable';
import {useState,useEffect} from "react";
import {_data1,_data2} from "@/components/test_data";
interface ResponseData{
  pc: {
    [key:string]: object;
  };
}
export default function Index() {
  const [data1,setData1] = useState({});
  const [data2,setData2] = useState({});
  const [lastRefresh,setLastRefresh] = useState("");
  async function getData(){
    let res: Response=await fetch("https://farcry2-online-default-rtdb.europe-west1.firebasedatabase.app/.json");
    let data: ResponseData=await res.json();
    setData1(data["pc"]["servers"]);
    res=await fetch("https://fc2servers-default-rtdb.europe-west1.firebasedatabase.app/.json");
    data=await res.json();
    setData2(data);
    const currentDate : Date= new Date();
    setLastRefresh(`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`);
    /*
    setData1(_data1.pc.servers);
    setData2(_data2);
    //used for testing purposes only
    */
  }
  useEffect(()=>{
    getData();
    setInterval(getData,10000);
  },[]);
  return(
  <>
    <div className="container-fluid p-3 pb-0 text-dark bg-warning">
      <h2>FarCry 2 Servers</h2>
      Refreshed at {lastRefresh} <span style={{color:"gray",textDecoration:"underline",cursor:"pointer"}} onClick={(e)=>{getData();}}>Refresh</span>
    </div>
    <DataTable data={data1} data2={data2}/>
  </>
  );
}
