const express = require('express')
const path=require('path')
const hbs=require('hbs')
const { query } = require('express')
const app = express()
app.set('view engine', 'hbs')
const port=process.env.PORT || 3000
const forecast=require('./utils/forecast')
const geocode=require('./utils/geoCode')

const publicDirectoryPath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
app.set('views',viewspath)

app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialpath)
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Sanskar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Sanskar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some useful text in my example',
        title:'Help',
        name:'Sanskar'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
   geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
       if(error){
           return res.send({error})
       }
      forecast(longitude,latitude,(error,forecastData)=>{
          if(error){
              return res.send({error})
          }

          res.send({
            'forecast':forecastData,
            location,
            address:req.query.address
        })
      })
   })


    
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sanskar',
        errorMessage:'Help Article Not Found'

    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sanskar',
        errorMessage:'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+port)
})