import express from 'express';
import taskService from '../services/task.service';

class TaskController {
    async createTask(req: express.Request, res: express.Response) {
        try {
            const { columnId, title, description, subtasks, status } = req.body;
            const newTask = await taskService.createTask(columnId, { title, description, subtasks, status });
            return res.status(201).json(newTask);
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    async updateTask(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params;
            const { title, description, subtasks, status } = req.body;
            const updatedTask = await taskService.updateTask(id, { title, description, subtasks, status });
            if (!updatedTask) return res.sendStatus(404);
            return res.status(200).json(updatedTask);
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    async deleteTask(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params;
            const deletedTask = await taskService.deleteTask(id);
            if (!deletedTask) return res.sendStatus(404);
            return res.sendStatus(204);
        } catch (e) {
            return res.sendStatus(400);
        }
    }
}

export default new TaskController();