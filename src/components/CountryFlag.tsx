import {useState,useEffect} from "react";
type Props = {
  ip_address: string;
}
interface IpInfoType{
  ip?: string;
  hostname?: string;
  city?: string;
  region?: string;
  country: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
  readme?: string;
  anycast?: string;
}
export default function CountryFlag(props:Props){
  const [url,setUrl] = useState("null");
  async function fetchData(){
    const ipInfo: Response=await fetch(`https://ipinfo.io/${props.ip_address}/json`);
    const data: IpInfoType=await ipInfo.json();
    setUrl(`https://flagcdn.com/w20/${data.country.toLowerCase()}.png`);
  }
  useEffect(()=>{
    fetchData();
  },[props.ip_address]);
  return (
    <img src={url} alt="country_flag"/>
  );
}
