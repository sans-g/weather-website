const request=require('request')

const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=da832134fc7df7ec7e9152053ad0170e&query='+longitude+','+latitude+'&unit=f'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to Weather services!",undefined)  
        }
        else if(response.body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,
                response.body.current.weather_descriptions[0]+" . It is Currently "+response.body.current.temperature+ " degrees out.There is a "+response.body.current.feelslike+"% chance of rain."
            )
        }
    })
}
module.exports=forecast