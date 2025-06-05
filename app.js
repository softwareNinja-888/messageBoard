const express = require('express')
const app = express()
const path = require('node:path')
const router = express.Router()

app.set('views',path.join(__dirname,"views"))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}))

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];


app.get("/",(req,res)=>{
	res.render('index',{messages:messages})
})

app.get('/new',(req,res)=>{
	res.render('form')
})

app.get('/details/:id',(req,res)=>{
	let info = messages.find(mess=> messages.indexOf(mess) === Number(req.params.id))
	console.log(info)
	res.render('details',{info:info})
})

app.post('/new',(req,res)=>{
	messages.push({text:req.body.message,user:req.body.name,added:new Date()})
	console.log(req.body.name)
	res.redirect('/')
})

app.listen(3000)