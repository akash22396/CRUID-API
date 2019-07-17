
const express = require('express')
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/task')

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
        res.header('Access-Control-Allow-Credentials', true),
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'),
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept'),
        next();
})

let api = express.Router();
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    limit: '50mb',
    extended: true
}))
app.get('/', (req, res) => {
    res.send(`
    <h3>Welcome to express js</h3>

    <a href='/users'> Users </a><br>
    <a href='/tasks'> Tasks</a>
    `);
})



/*   Users */

app.get('/users', (req, res) => {
    // console.log('get request')
    User.find({}).then((users)=> {
        res.status(200).send(users)
    }).catch((e)=>{
        res.status(500).send(e)
    })   
})
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    // console.log('get request')
    User.findById(_id).then((users)=> {
        if(!users){
            res.status(400).send('No user found!')
        }
        res.status(200).send(users)
    }).catch((e)=>{
        res.status(400).send(e)
    })   
})

app.post('/users', (req, res) => {
    // console.log(req.body)   
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        // console.log(error);
        res.send(error);
    })
})

/* End */

/*   Tasks */
app.get('/tasks', (req, res) => {
    // console.log('get request')
    Tasks.find({}).then((tasks)=> {
        res.status(200).send(tasks)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    // console.log('get request')
    Tasks.findById(_id).then((task)=> {
        if(!task){
            res.status(400).send('No task found!')
        }
        res.status(200).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })   
})

app.post('/tasks', (req, res) => {
    // console.log(req.body)   
    const task = new Tasks(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        // console.log(error);
        res.status(400).send(error);
    })
})

/* End */

app.use('/api', api);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server start on http://127.0.0.1:${port}`));

// db.connect();

/*
// Create Users Collection

const User = mongoose.model('User', ({
    user_name: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true

    },
    name: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        // lowercase: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain "Password"')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email id is not valid')
            }
        }

    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Age only a positive number')
            }
        }
    }
}))

const me = new User({
    user_name: 'akash223',
    name: 'Akash Singh',
    password: 'akash.singh',
    email: 'akash@ts.com',
    age: 23

})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log(error.message)
})
*/