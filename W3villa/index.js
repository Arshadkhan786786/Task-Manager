const mongoose = require("mongoose")
const express = require("express");
const path = require('path');
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/table').then(console.log("Connected Successfully")).catch((err) => {
    console.log(err)
})

const sch = new mongoose.Schema({ name: String, email: String, pass: String });
const col = new mongoose.model('user', sch);

async function insert(val) {
    await col.insertMany(val).then("Inserted data")
}

async function check(val) {
    const x = await col.find(val);
    return x;
}

staticpath = path.join(__dirname, 'public')
app.use(express.static(staticpath))

app.get('/formlog', async (req, res) => {
    const x = await check(req.query)
    if (!x.length) {
        res.redirect('index.html')
    }
    else {
        res.redirect('task.html');
    }
})

app.get('/formreg', (req, res) => {
    insert(req.query)
    res.redirect('task.html')
})

app.listen(3001)