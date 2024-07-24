import express from "express"
import mongoose from "mongoose"
import router from "./routes"

const app = express()
app.use(express.json())

require('dotenv').config();

const MONGO_URL = process.env.DB_URL;
if (!MONGO_URL) {
    throw new Error('DB_URL is not defined in the .env file');
}
mongoose.connect(MONGO_URL, {
    dbName: 'kanbanApp'
})
    .then(() => {
        console.log("DB connected")
    })
    .catch((error) => console.log(error))

app.use('/', router)
router.get('/', (req, res) => {
    res.send('Воспользуйтесь действующими роутами');
});
app.listen(3000, () => {
    console.log("Server sucsessfully started on 3000 port")
})