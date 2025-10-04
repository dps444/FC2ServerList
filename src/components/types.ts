interface ServerInfo {
  address: string;
  author_name: string;
  auto_balance_teams: boolean;
  auto_team_swap: boolean;
  created_timestamp: number;
  creator_name: string;
  current_players: number;
  dedicated: boolean;
  friendly_fire: boolean;
  gamemode: number;
  join_in_progress: boolean;
  last_player_activity_timestamp: number;
  last_status_change_timestamp: number;
  locked: boolean;
  map_id: string;
  map_name: string;
  map_type: number;
  matches_played: number;
  max_players: number;
  players_joined: number;
  port: number;
  punkbuster: boolean;
  ranked: boolean;
  score_limit: number;
  server_name: string;
  status: number;
  time_limit: number;
  updated_timestamp: number;
  uptime: number;
  version: number;
};
interface PlayerDetails {
  n: string;
  k: number;
  d: number;
  tm: string;
}
interface ServerInfo2 {
  ad: string[];
  cd: string;
  cn: string;
  ct: string;
  e: number;
  hc: number;
  id: string;
  ip: string;
  ji: number;
  lp: number;
  m: number;
  map: string;
  max: number;
  mid: string;
  min: number;
  ms: number;
  n: number;
  nt: string;
  o: string;
  p: { [key: string]: PlayerDetails };
  po: string;
  r: number;
  rg: string;
  rm: number;
  s: number;
  sc: number;
  sn: string;
  st: number;
  t: number;
  td: number;
  v: number;
  w: number;
  x: number;
}
export enum GameMode{
  Deathmatch = 0,
  TeamDeathmatch = 1,
  CaptureTheDiamond = 2,
  Uprising = 3
};
export enum MapSize{
  Small = 1,
  Medium = 2,
  Large = 3
};
export interface DataTableProps {
  data: {
    [key:string]: ServerInfo;
  };
  data2: {
    [key:string]: ServerInfo2;
  };
};
