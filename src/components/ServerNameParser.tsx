const RAW_CODES : string[] = [
    '03', '6P', '10', '16', '19', '45', '67', '79', 'AA', 'AK', 'AS', 'BA', 'BB', 'CG', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6',
    'DA', 'DE', 'DG', 'DH', 'DL', 'DP', 'DR', 'DV', 'EX', 'FG', 'FI', 'FN', 'G3', 'IE', 'IT', 'L3', 'LB', 'LP', 'LS', 'LT',
    'M2', 'MA', 'MG', 'MK', 'MM', 'MO', 'MP', 'PK', 'R3', 'RB', 'RP', 'RS', 'RT', 'SO', 'SP', 'ST', 'US', 'UZ', 'VH', 'XX',
    'YY', 'SS', 'CB'
];
const BASE_URL : string = "https://fc2mp.com/assets/hudicons/";

export default function ServerNameParser(name: string){
  RAW_CODES.forEach(element => {
    name=name.replace(`~~${element}`,`<img src="${BASE_URL}/dbl_${element}.png" style="margin-left:5px;margin-right:5px"  width="30" height="30"/>`);
    name=name.replace(`~${element}`,`<img src="${BASE_URL}/~${element}.png" style="margin-left:5px;margin-right:5px" width="30" height="30"/>`);
  });
  return name;
}
