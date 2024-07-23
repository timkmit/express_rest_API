import express from 'express'
import { BoardModel } from '../db/board.model'
import { TaskModel } from '../db/task.model'

class BoardController{

    getAllBoards = async (req: express.Request, res: express.Response) => {
        try{
            const boards = await BoardModel.find()

            if (!boards) {
                return res.sendStatus(204)
            }

            return res.status(200).json({ data: boards })
        }catch(e){
            return res.sendStatus(400)
        }
    }

    getBoard = async (req: express.Request, res: express.Response) => {
        try{
            const { id } = req.params
            const board = await BoardModel.findById({ _id: id })
            
            return res.status(200).json({ data: board })
        }
        catch(e){
            return res.sendStatus(400)
        }
    }

    createBoard = async (req: express.Request, res: express.Response) => {
        try{
            const { title, description, columns } = req.body;

            const newBoard = new BoardModel({
                title,
                description,
                columns: []
            });

            for (const column of columns) {
                const { name, tasks } = column;
                const taskIds = [];
    
                for (const taskData of tasks) {
                    const newTask = new TaskModel(taskData);
                    await newTask.save();
                    taskIds.push(newTask._id);
                }
    
                newBoard.columns.push({
                    name,
                    tasks: taskIds
                });
            }

            await newBoard.save();

            return res.status(201).json({mes: "Board has been sucsessfully created!", data: newBoard});
        }catch(e){
            return res.sendStatus(400)
        }
    }

    updateBoard = async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
            const { title, description, columns } = req.body;

            const updatedColumns = [];

            for (const column of columns) {
                const { name, tasks } = column;
                const taskIds = [];

                for (const taskData of tasks) {
                    if (taskData._id) {
                        await TaskModel.findByIdAndUpdate(taskData._id, taskData);
                        taskIds.push(taskData._id);
                    } else {
                        const newTask = new TaskModel(taskData);
                        await newTask.save();
                        taskIds.push(newTask._id);
                    }
                }

                updatedColumns.push({
                    name,
                    tasks: taskIds
                });
            }

            const updatedBoard = await BoardModel.findByIdAndUpdate(
                id,
                { title, description, columns: updatedColumns },
                { new: true }
            );

            if (!updatedBoard) {
                return res.sendStatus(404);
            }

            return res.status(200).json({mes: "Board has been sucsessfully updated!", data: updatedBoard});
        } catch (e) {
            return res.sendStatus(400);
        }
    };

    deleteBoard = async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
            const board = await BoardModel.findByIdAndDelete(id);

            if (!board) {
                return res.sendStatus(404);
            }

            for (const column of board.columns) {
                await TaskModel.deleteMany({ _id: { $in: column.tasks } });
            }

            return res.sendStatus(204);
        } catch (e) {
            return res.sendStatus(400);
        }
    };
}

export default new BoardController()