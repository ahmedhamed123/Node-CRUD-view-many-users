const express = require('express');
const app = express();

const port = process.env.port || 3000

//************************* */

require("./db/mongoose")


app.use(express.urlencoded({extended:true}))

//----------------------------------
const methodOverride = require('method-override')


app.use(methodOverride('_method'))
//-----------------------------

app.use(express.json())

const userRouter= require('./routers/user')

app.use(userRouter)


//-----------------------
const path = require('path');
const projectPath = path.join(__dirname,'./public')
app.use(express.static(projectPath))

//---------------------------------
const hbs =require("hbs")
const moment = require('moment')

hbs.registerHelper('formatDate', function(datetime, format) {
  return moment(datetime).format(format);
});
//////
hbs.registerHelper('addOne', function(value) {
  return value + 1;
});

hbs.registerHelper('isSelected',(currentValue,expectedValue) =>{
  return currentValue === expectedValue ? "selected": null ;
})

//-----
app.set('view engine','hbs')
app.set('views', path.join(__dirname, 'views'));




//--------------------------------------------















//------------------------------------

app.listen(port,()=>{console.log(`All Done On PORT ${port}`)})









