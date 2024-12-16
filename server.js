const express=require('express')
const path=require('path')
const routerbook = require('./routers/book')
const app=express()
const routerregister = require('./routers/register')
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const routerHome=require('./routers/home')
const routermybook = require('./routers/mybook')
const routerabout = require('./routers/about')
const routercontcat = require('./routers/contact')




app.use(flash())
app.use(express.static(path.join(__dirname,'assets')))

app.set('view engine','ejs')
app.set('views','views')
 
var Store=new MongoDbStore({
    uri:'mongodb://localhost:27017/library',
    collection:'session'
})

app.use(session({
    secret: "secret-key",
    store:Store, // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // Session expiration time (optional)
}));


app.use('/mybooks',routermybook)
app.use('/',routerabout)
app.use('/',routercontcat)
app.use('/', routerHome)
app.use('/', routerregister)
app.use('/', routerbook);
app.use('/:id',routerbook)






app.listen(8000,()=>console.log('server run in port 3000'))