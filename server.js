const express = require('express');
const mongoose = require('mongoose');
const devuser = require('./devusermodel');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const reviewmodel = require('./reviewmodel');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;

const path = require('path')


mongoose.connect('mongodb+srv://shiva:shiva@cluster0.c5sbebr.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log('DB Connected..')
)


app.use(express.json());
// app.use(cors({origin:"*"}));

app.use(express.static(path.resolve(__dirname, "build")));

// app.use("/api", indexRouter);
app.use(cors({
    origin: 'https://devhubmern.onrender.com/login/', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://devhubmern.onrender.com/login/"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});








// app.get('/', (req,res) => {
//     return res.send('Hello World !')
// })



app.post('/register', async (req, res) => {
    try{
        const {fullname,email,mobile,skill,password,confirmpassword} = req.body;
        const exist = await devuser.findOne({email});
        if(exist){
            return res.status(400).send('User Already Registered');
        }
        if(password != confirmpassword){
            return res.status(403).send('Password Invalid');
        }
        let newUser = new devuser({
            fullname,email,mobile,skill,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User Registered');
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.post('/login', async (req,res) => {
    try{
        const {email,password} = req.body;
        const exist = await devuser.findOne({email});
        if(!exist){
            return res.status(400).send('User Not Exists');
        }
        if(exist.password != password){
            return res.status(400).send('Password Invalid');
        }
        let payload = {
            user :{
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token) => {
            if(err) throw err
            return res.json({token});
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.get('/allprofiles',middleware, async (req,res) => {
    try{
        let allprofiles = await devuser.find();
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/myprofile',middleware,async(req,res) => {
    try{
        let user = await devuser.findById(req.user.id);
        return res.json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.post('/addreview',middleware,async(req,res) => {
    try{
        const {taskworker,rating} = req.body;
        const exist = await devuser.findById(req.user.id);
        const newReview = new reviewmodel({
            taskprovider:exist.fullname,
            taskworker,rating
        })
        newReview.save();
        return res.status(200).send('Review updated sucessfully');
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/myreview',middleware,async(req,res) => {
    try{
        let allreviews = await reviewmodel.find();
        let myreviews = allreviews.filter(review => review.taskworker.toString() === req.user.id.toString());
        return res.status(200).json(myreviews);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.listen(port, ()=> console.log(`App listening on port ${port}`))