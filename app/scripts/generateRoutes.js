const axios = require("axios");
const fs = require("fs");

const buses = require("../data/buses.json");
const stops = require("../data/stops.json");

const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjcwYzNjMjBjZGI3MTQ5NjM4NjM2NjI0NjdkMGQ3ZTczIiwiaCI6Im11cm11cjY0In0=";

async function generateRoutes(){

 let routes = {};

 for(const bus of buses){

  if(!bus.stops){
   console.log("Skipping:", bus.name);
   continue;
  }

  const coords = bus.stops
   .map(stop => stops[stop])
   .filter(Boolean)
   .map(([lat,lng]) => [lng,lat]);

  if(coords.length < 2){
   console.log("Not enough stops:", bus.name);
   continue;
  }

  try{

   const res = await axios.post(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    { coordinates: coords },
    {
     headers:{
      Authorization: API_KEY,
      "Content-Type":"application/json"
     }
    }
   );

   const geometry =
    res.data.features[0].geometry.coordinates
     .map(([lng,lat]) => [lat,lng]);

   routes[bus.name] = geometry;

   console.log("Generated route:", bus.name);

  }
  catch(err){

   console.log("Failed route:", bus.name);

  }

 }

 fs.writeFileSync(
  "./data/routes.json",
  JSON.stringify(routes,null,2)
 );

 console.log("All routes saved!");

}

generateRoutes();