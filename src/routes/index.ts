import express from 'express'
import employeeController from '../controllers/employee.controller'
import boardController from '../controllers/board.controller'
import tasksController from '../controllers/tasks.controller'
import columnController from '../controllers/column.controller'

const router = express.Router()

router.get('/employees', employeeController.getAllEmployees)
router.get('/employees/:id', employeeController.getEmployee)
router.post('/employees', employeeController.createEmployee)
router.put('/employees/:id', employeeController.updateEmployee)
router.delete('/employees/:id', employeeController.deleteEmployee)

router.get('/boards', boardController.getAllBoards)
router.get('/boards/:id', boardController.getBoard)
router.post('/boards', boardController.createBoard)
router.put('/boards/:id', boardController.updateBoard)
router.delete('/boards/:id', boardController.deleteBoard)

router.post('/tasks', tasksController.createTask)
router.put('/tasks/:id', tasksController.updateTask)
router.delete('/tasks/:id', tasksController.deleteTask)

router.post('/columns', columnController.createColumn);
router.put('/columns/:id', columnController.updateColumn);
router.delete('/columns/:id', columnController.deleteColumn);


export default router