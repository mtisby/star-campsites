import express, { application } from "express";

const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('./home')
})

app.listen(3000, () => {
    console.log(`listening on : ${port}`)
})