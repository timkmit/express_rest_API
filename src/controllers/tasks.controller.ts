import express from 'express';
import { TaskModel } from '../db/task.model';
import { BoardModel } from '../db/board.model';

class TaskController {

    getAllTasks = async (req: express.Request, res: express.Response) => {
        try {
            const tasks = await TaskModel.find();

            if (!tasks) {
                return res.sendStatus(404);
            }

            return res.status(200).json({ data: tasks });
        } catch (e) {
            return res.sendStatus(400);
        }
    };

    getTask = async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
            const task = await TaskModel.findById(id);

            if (!task) {
                return res.sendStatus(404);
            }

            return res.status(200).json({ data: task });
        } catch (e) {
            return res.sendStatus(400);
        }
    };

    createTask = async (req: express.Request, res: express.Response) => {
        try {
            const { title, description, subtasks, status, boardId, columnName } = req.body;

            const newTask = new TaskModel({
                title,
                description,
                subtasks,
                status
            });

            await newTask.save();

            const board = await BoardModel.findById(boardId);
            if (!board) {
                return res.sendStatus(404).json({error: "Can't find board"});
            }

            const column = board.columns.find(col => col.name === columnName);
            if (!column) {
                return res.sendStatus(404).json({error: "Can't find column"});
            }

            column.tasks.push(newTask._id);
            await board.save();

            return res.status(201).json({mes: "Task has been sucsessfully created!", data: newTask});
        } catch (e) {
            return res.sendStatus(400);
        }
    };

    updateTask = async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
            const { title, description, subtasks, status } = req.body;

            const updatedTask = await TaskModel.findByIdAndUpdate(
                id,
                { title, description, subtasks, status },
                { new: true }
            );

            if (!updatedTask) {
                return res.sendStatus(404);
            }

            return res.status(200).json({mes: "Task has been sucsessfully updated!", data: updatedTask});
        } catch (e) {
            return res.sendStatus(400);
        }
    };

    deleteTask = async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
            const task = await TaskModel.findByIdAndDelete(id);

            if (!task) {
                return res.sendStatus(404);
            }

            await BoardModel.updateMany(
                { 'columns.tasks': id },
                { $pull: { 'columns.$[].tasks': id } }
            );

            return res.sendStatus(204);
        } catch (e) {
            return res.sendStatus(400);
        }
    };
}

export default new TaskController();