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
    const routes = [
        'GET /employees',
        'GET /employees/:id',
        'POST /employees',
        'PUT /employees/:id',
        'DELETE /employees/:id',
        'GET /boards',
        'GET /boards/:id',
        'POST /boards',
        'PUT /boards/:id',
        'DELETE /boards/:id',
        'POST /tasks',
        'PUT /tasks/:id',
        'DELETE /tasks/:id',
        'POST /columns',
        'PUT /columns/:id',
        'DELETE /columns/:id',
        'Создайте доску, потом колонки, затем добавьте таски',
        'Source code: https://github.com/timkmit/express_rest_API.git'
    ];

    res.send('<pre>Доступные маршруты:\n' + routes.join('\n') + '</pre>');
});
app.listen(3000, () => {
    console.log("Server sucsessfully started on 3000 port")
})