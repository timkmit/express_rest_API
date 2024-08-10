import express from "express"
import mongoose from "mongoose"
import cors from 'cors';
import router from "./routes"
import swaggerSetup from "./swagger/swagger"

const app = express()
app.use(express.json())
app.use(cors());

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

swaggerSetup(app);

app.use('/', router);

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});
app.listen(3000, () => {
    console.log("Server sucsessfully started on 3000 port")
})