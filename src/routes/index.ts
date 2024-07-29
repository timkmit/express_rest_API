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


/**
 * @openapi
 * /boards/get:
 *   get:
 *     tags:
 *       - Boards
 *     summary: Retrieve all boards
 *     responses:
 *       200:
 *         description: List of all boards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66a7650a28a3b59db35bdc6a"
 *                     title:
 *                       type: string
 *                       example: "Project Management Board111"
 *                     description:
 *                       type: string
 *                       example: "A board to manage project tasks and milestones."
 *                     columns:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "66a7650a28a3b59db35bdc6c"
 *                           name:
 *                             type: string
 *                             example: "Backlog"
 *                           tasks:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   example: "66a7703649329bdedd221387"
 *                                 title:
 *                                   type: string
 *                                   example: "Task 1"
 *                                 description:
 *                                   type: string
 *                                   example: "Description for task 1"
 *                                 subtasks:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                   example: ["Subtask 1.1", "Subtask 1.2"]
 *                                 status:
 *                                   type: string
 *                                   example: "Not Started"
 *                                 __v:
 *                                   type: integer
 *                                   example: 0
 *                           __v:
 *                             type: integer
 *                             example: 0
 *                     __v:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: Internal server error
 */

router.get('/boards/get', boardController.getAllBoards)

/**
 * @openapi
 * /boards/{id}/get:
 *   get:
 *     tags:
 *       - Boards
 *     summary: Retrieve a single board by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the board to retrieve
 *         schema:
 *           type: string
 *           example: "66a7650a28a3b59db35bdc6a"
 *     responses:
 *       200:
 *         description: Details of a single board
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66a7650a28a3b59db35bdc6a"
 *                     title:
 *                       type: string
 *                       example: "Project Management Board111"
 *                     description:
 *                       type: string
 *                       example: "A board to manage project tasks and milestones."
 *                     columns:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "66a7650a28a3b59db35bdc6c"
 *                           name:
 *                             type: string
 *                             example: "Backlog"
 *                           tasks:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   example: "66a7703649329bdedd221387"
 *                                 title:
 *                                   type: string
 *                                   example: "Task 1"
 *                                 description:
 *                                   type: string
 *                                   example: "Description for task 1"
 *                                 subtasks:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                   example: ["Subtask 1.1", "Subtask 1.2"]
 *                                 status:
 *                                   type: string
 *                                   example: "Not Started"
 *                                 __v:
 *                                   type: integer
 *                                   example: 0
 *                           __v:
 *                             type: integer
 *                             example: 0
 *                     __v:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Board not found
 *       500:
 *         description: Internal server error
 */

router.get('/boards/:id/get', boardController.getBoard)
// router.post('/boards/create', boardController.createBoard)

/**
 * @openapi
 * /boards/create:
 *   post:
 *     tags:
 *       - Boards
 *     summary: Create a board with columns
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardData:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Project Management Board"
 *                   description:
 *                     type: string
 *                     example: "A board to manage project tasks and milestones."
 *               columns:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Backlog"
  *     responses:
 *       201:
 *         description: Board with columns created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     columns:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           tasks:
 *                             type: array
 *                             items:
 *                               type: string
 *                           __v:
 *                             type: integer
 *                     __v:
 *                       type: integer
 *             example:
 *               data: {
 *                 "_id": "66a7650a28a3b59db35bdc6a",
 *                 "title": "Project Management Board",
 *                 "description": "A board to manage project tasks and milestones.",
 *                 "columns": [
 *                   {
 *                     "_id": "66a7650a28a3b59db35bdc6c",
 *                     "name": "Backlog",
 *                     "tasks": [],
 *                     "__v": 0
 *                   }
 *                 ],
 *                 "__v": 1
 *               }
 *       400:
 *         description: Bad request
 */

router.post('/boards/create', boardController.createBoardWithCol)

/**
 * @openapi
 * /boards/{id}/update:
 *   put:
 *     tags:
 *       - Boards
 *     summary: Update a board
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the board to update
 *         schema:
 *           type: string
 *           example: "66a7469e200d4afc8fdb80a5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardData:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Project Management Board"
 *                   description:
 *                     type: string
 *                     example: "A board to manage project tasks and milestones."
 *               columns:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Backlog"
 *             example:
 *               boardData:
 *                 title: "Project Management Board"
 *                 description: "A board to manage project tasks and milestones."
 *               columns:
 *                 - name: "Backlog"
 *                 - name: "In Progress"
 *                 - name: "Completed"
 *     responses:
 *       200:
 *         description: Board updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "66a7469e200d4afc8fdb80a5"
 *                 title:
 *                   type: string
 *                   example: "Project Management Board"
 *                 description:
 *                   type: string
 *                   example: "A board to manage project tasks and milestones."
 *                 columns:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66a7469e200d4afc8fdb80a7"
 *                       name:
 *                         type: string
 *                         example: "Backlog"
 *                       tasks:
 *                         type: array
 *                         items:
 *                           type: string
 *                       __v:
 *                         type: integer
 *                         example: 0
 *                 __v:
 *                   type: integer
 *                   example: 1
 *             example:
 *               _id: "66a7469e200d4afc8fdb80a5"
 *               title: "Project Management Board"
 *               description: "A board to manage project tasks and milestones."
 *               columns:
 *                 - _id: "66a7469e200d4afc8fdb80a7"
 *                   name: "Backlog"
 *                   tasks: []
 *                   __v: 0
 *                 - _id: "66a7469e200d4afc8fdb80a9"
 *                   name: "In Progress"
 *                   tasks: []
 *                   __v: 0
 *                 - _id: "66a7469e200d4afc8fdb80ab"
 *                   name: "Completed"
 *                   tasks: []
 *                   __v: 0
 *               __v: 1
 *       404:
 *         description: Board not found
 *       400:
 *         description: Bad request
 */

router.put('/boards/:id/update', boardController.updateBoard)

/**
 * @openapi
 * /boards/{id}/delete:
 *   delete:
 *     tags:
 *       - Boards
 *     summary: Delete a board
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the board to delete
 *         schema:
 *           type: string
 *           example: "66a7469e200d4afc8fdb80a5"
 *     responses:
 *       204:
 *         description: Board deleted
 *       404:
 *         description: Board not found
 *       400:
 *         description: Bad request
 */
router.delete('/boards/:id/delete', boardController.deleteBoard)

router.post('/tasks', tasksController.createTask)
router.put('/tasks/:id', tasksController.updateTask)
router.delete('/tasks/:id', tasksController.deleteTask)

router.post('/columns', columnController.createColumn);
router.put('/columns/:id', columnController.updateColumn);
router.delete('/columns/:id', columnController.deleteColumn);



export default router