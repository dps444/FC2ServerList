'use client';
import React,{useState,useEffect} from "react";
import ServerNameParser from "@/components/ServerNameParser";
import CountryFlag from "@/components/CountryFlag";
import TimeLeft from "@/components/TimeLeft";
import {GameMode,MapSize,DataTableProps} from "@/components/types";
const UBI_MAPS: {[key:string]:string} = {"Last Bastion":"https://i.imgur.com/xxQLezX.jpg","Dirty Work":"https://i.imgur.com/7nLe1DI.jpg","Love Shacks":"https://i.imgur.com/iFffBCr.jpg","Coup Detat":"https://i.imgur.com/cAFGgrj.jpg","Cut Bait":"https://i.imgur.com/RSvXEkO.jpg","Rumble Strip":"https://i.imgur.com/Ye60yJb.jpg","Pit Bull":"https://i.imgur.com/ZyrrAoH.jpg","Mud Maze":"https://i.imgur.com/6USV0jG.jpg","Crude Awakening":"https://i.imgur.com/snqZMAu.jpg","Sand Blasted":"https://i.imgur.com/Cn6wNqc.jpg","Riot Control":"https://i.imgur.com/vTADXde.jpg","Clear Cut":"https://i.imgur.com/NiSFkP6.jpg","Far Cry":"https://i.imgur.com/RNXwY0t.jpg","Rusty Beef":"https://i.imgur.com/Go3azL3.jpg","Cheap Labour":"https://i.imgur.com/nCQCANe.jpg","Last Resort":"https://i.imgur.com/MDAEaeF.jpg","Lake Smear":"https://i.imgur.com/HmzzYly.jpg","Fort Fury":"https://i.imgur.com/aQU1D6a.jpg","Jungle Seizure":"https://i.imgur.com/Ug23H2E.jpg"};
export default function DataTable(props:DataTableProps) {
  const [serverCount,setServerCount] = useState(0);
  const [playerCount,setPlayerCount] = useState(0);
  const [totalServ,setTotalServ] = useState(0);
  const [showEmpty,setShowEmpty] = useState(true);
  function NameParser(name:string){
    const parsedOutput =  ServerNameParser(name);
    return(
      <span dangerouslySetInnerHTML={{__html:parsedOutput}}></span>
    );
  }
  function MapImageSelector(mapname:string,mapid:string){
    if(UBI_MAPS.hasOwnProperty(mapname)) return UBI_MAPS[mapname];
    else return `https://fcx-api.longweep.net/maps/${mapid}/thumbnail`;
  }
  function SetPlayerTeam(team:string){
    switch(team){
      case "a": return "table-danger";
      case "u": return "table-warning";
      default: return "";
    }
  }
  function hideEmpty(event:React.ChangeEvent<HTMLInputElement>){
    if(event.target && event.target.checked) setShowEmpty(false);
    else setShowEmpty(true);
  }
  useEffect(()=>{
    setServerCount(0);
    setPlayerCount(0);
    setTotalServ(0);
    for(const i in props.data){
      if(props.data[i].current_players > 0){
        setServerCount(serverCount => serverCount+1);
        setPlayerCount(playerCount => playerCount+props.data[i].current_players);
      }
      setTotalServ(totalServ => totalServ+1);
    }
  },[props.data,props.data2]);
  return (
    <>
    <div className="container-fluid bg-warning text-dark p-3">
      <h5>Active servers: {serverCount} / {totalServ}</h5>
      <h5>{playerCount} total players </h5>
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" onChange={hideEmpty}/>
        <label className="form-check-label" htmlFor="mySwitch">Hide empty</label>
      </div>
    </div>
    <div className="container-flex mt-4 mx-2">
      <table className="table table-striped table-borderless table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Map</th>
            <th>Game mode</th>
            <th>Players</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(props.data).map(key=>(
              ((showEmpty==false && props.data[key].current_players>0) || (showEmpty==true)) &&
              <tr key={key} data-bs-toggle="modal" data-bs-target={`#serverInfoModal_${key}`} className={props.data[key].current_players>0 ? 'table-primary' : ''}>
                <td>
                  {NameParser(props.data[key].server_name)} {props.data[key].ranked && <span title="Ranked">🏆</span>} {props.data[key].locked && <span title="Locked">🔒</span>}
                  { props.data2.hasOwnProperty(key) && <span title="Stats collection">📈</span> }
                </td>
                <td>{NameParser(props.data[key].map_name)}</td>
                <td>{GameMode[props.data[key].gamemode]}</td>
                <td>{props.data[key].current_players} / {props.data[key].max_players}
                  <div className="modal fade" id={`serverInfoModal_${key}`} tabIndex={-1} aria-labelledby="serverInfoModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="serverInfoModalLabel">Information</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-4 p-3 border rounded bg-light text-center">
                          <h3 className="fw-bold text-primary mb-2">{NameParser(props.data[key].server_name)}</h3>
                          <p className="mb-1 fs-5">
                            <strong>Players:</strong> {props.data[key].current_players} / {props.data[key].max_players}
                          </p>
                          <p className="mb-1 fs-5">
                            <strong>Address:</strong> {props.data[key].address} : {props.data[key].port}
                            {/*<span className="align-middle ms-2 me-1">
                              <CountryFlag ip_address={props.data[key].address}/>
                            </span>*/}
                          </p>
                          <p className="mb-0 fs-5">
                            <strong>Game mode:</strong> {GameMode[props.data[key].gamemode] || "UNDEFINED"}
                          </p>
                          <p className="mb-0 fs-5">
                            { props.data2.hasOwnProperty(key) && (<span className="text-success">Stats collection ✅ </span>) }
                          </p>
                          {
                            props.data[key].ranked && (
                              <p className="mb-0 fs-5 text-warning">
                                <strong>Ranked Server</strong>
                              </p>
                            )
                          }
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item"><strong>Locked: </strong> {props.data[key].locked ? "Yes" : "No"} </li>
                              <li className="list-group-item"><strong>Created on: </strong> {new Date(props.data[key].created_timestamp*1000).toLocaleString()} </li>
                              <li className="list-group-item"><strong>Dedicated Server: </strong> {props.data[key].dedicated ? "Yes" : "No"}</li>
                              <li className="list-group-item"><strong>Friendly Fire: </strong> {props.data[key].friendly_fire ? "Enabled" : "Disabled"}</li>
                              <li className="list-group-item"><strong>Join In Progress: </strong> {props.data[key].join_in_progress ? "Yes" : "No"}</li>
                              <li className="list-group-item"><strong>Score  Limit: </strong> {props.data[key].score_limit} Points</li>
                              <li className="list-group-item"><strong>Round Time Limit: </strong> {Math.floor(props.data[key].time_limit/60)} Minutes</li>
                            </ul>
                            {
                              props.data2.hasOwnProperty(key) && (
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item text-wrap"><strong>Admins: </strong>{props.data2[key].ad.join(", ")}</li>
                                  <li className="list-group-item text-wrap"><strong>Match timer: </strong><TimeLeft start_time={props.data2[key].ms} time_limit={props.data[key].time_limit} extends={props.data2[key].e}/></li>
                                  { props.data2[key].hc===1 && <li className="list-group-item text-danger text-wrap"><strong>HARDCODE MODE</strong></li> }
                                </ul>
                              )
                            }
                          </div>
                          <div className="col-md-6 d-flex flex-column">
                            <img onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
  (e.target as HTMLImageElement).src = "https://i.imgur.com/DlsEBfo.jpg";
}} src={MapImageSelector(props.data[key].map_name,props.data[key].map_id)} alt="Map Placeholder" height="150" width="150" className="mb-3" />
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item"><strong>Map Name: </strong>{NameParser(props.data[key].map_name)}</li>
                              <li className="list-group-item"><strong>Size: </strong>{MapSize[props.data[key].map_type]}</li>
                              <li className="list-group-item"><strong>Author: </strong>{props.data[key].author_name}</li>
                            </ul>
                          </div>
                        </div>
                        <br/>
                        {
                          (props.data2.hasOwnProperty(key) && props.data[key].current_players>0) && (
                            <div className="rounded-3 overflow-hidden">
                              <table className="table table-striped table-bordered">
                                <thead>
                                  <tr className="table-info">
                                    <th scope="col">Name</th>
                                    <th scope="col">Kills</th>
                                    <th scope="col">Deaths</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {
                                  Object.keys(props.data2[key].p).map(player_key=>(
                                    <tr key={player_key} className={SetPlayerTeam(props.data2[key].p[player_key].tm)}>
                                      <td>{props.data2[key].p[player_key].n}</td>
                                      <td>{props.data2[key].p[player_key].k}</td>
                                      <td>{props.data2[key].p[player_key].d}</td>
                                    </tr>
                                  ))
                                }
                                </tbody>
                              </table>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  </div>

                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    </>
  );
}
