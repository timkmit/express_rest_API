import express from 'express'
import employeeController from '../controllers/employee.controller'
import boardController from '../controllers/board.controller'
import tasksController from '../controllers/tasks.controller'

const router = express.Router()

router.get('/employee', employeeController.getAllEmployees)
router.get('/employee/:id', employeeController.getEmployee)
router.post('/employee', employeeController.createEmployee)
router.put('/employee/:id', employeeController.updateEmployee)
router.delete('/employee/:id', employeeController.deleteEmployee)

router.get('/boards', boardController.getAllBoards)
router.get('/board/:id', boardController.getBoard)
router.post('/board', boardController.createBoard)
router.put('/board/:id', boardController.updateBoard)
router.delete('/board/:id', boardController.deleteBoard)

router.get('/tasks', tasksController.getAllTasks)
router.get('/task/:id', tasksController.getTask)
router.post('/task', tasksController.createTask)
router.put('/task/:id', tasksController.updateTask)
router.delete('/task/:id', tasksController.deleteTask)


export default router