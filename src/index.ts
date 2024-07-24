import express from "express"
import mongoose from "mongoose"
import router from "./routes"

const app = express()
app.use(express.json())

const MONGO_URL = 'mongodb+srv://timkmitdb:65876587@atlascluster.bxtjbj0.mongodb.net/'
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