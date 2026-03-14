const axios = require("axios");
const fs = require("fs");

const buses = require("../data/buses.json");

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

async function fetchStop(name){

 const query = `
 [out:json][timeout:25];
 (
   node["highway"="bus_stop"]["name"="${name}"];
 );
 out body;
 `;

 try{

  const res = await axios.post(OVERPASS_URL, query, {
   headers: { "Content-Type": "text/plain" }
  });

  if(res.data.elements.length === 0){
   console.log("Stop not found:", name);
   return null;
  }

  const node = res.data.elements[0];

  return [node.lat, node.lon];

 }
 catch(err){

  console.log("Error fetching:", name);
  return null;

 }

}

async function buildStops(){

 const stops = {};

 const stopNames = new Set();

 buses.forEach(bus=>{
  bus.stops.forEach(s=>stopNames.add(s));
 });

 for(const name of stopNames){

  const coord = await fetchStop(name);

  if(coord){
   stops[name] = coord;
   console.log("Found:", name);
  }

 }

 fs.writeFileSync(
  "./data/stops.json",
  JSON.stringify(stops,null,2)
 );

 console.log("stops.json generated!");

}

buildStops();