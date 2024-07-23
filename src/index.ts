import express from "express"
import mongoose from "mongoose"
import router from "./routes"

const app = express()
app.use(express.json())

const MONGO_URL = 'YOUR DB URL'
mongoose.connect(MONGO_URL, {
    dbName: 'kanbanApp'
})
    .then(() => {
        console.log("DB connected")
    })
    .catch((error) => console.log(error))

app.use('/', router)

app.listen(3000, () => {
    console.log("Server sucsessfully started on 3000 port")
})