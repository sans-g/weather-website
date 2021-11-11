
const request=require('request')

const geoCode=(address,callback)=>{
    const geoCodeUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?limit=2&access_token=pk.eyJ1Ijoic2Fuc2thcm9zaG8iLCJhIjoiY2t2c2Nnd2NpMGdrazJvbHlzNmNldW9tcSJ9.lLSP-Vq6Siz1rdFvcY9JoQ"

   request({url:geoCodeUrl,json:true},(error,response)=>{
       if(error){
           callback("Unable to connect to location services!",undefined)
       }
       else if(response.body.features.length===0){
                 callback("Unable to find location,Try another search.",undefined)
       }
       else{
           callback(undefined,{
               latitude:response.body.features[0].center[0],
               longitude:response.body.features[0].center[1],
               location:response.body.features[0].place_name
           })
       }
   })
}

module.exports=geoCode