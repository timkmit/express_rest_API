import express from 'express';
import columnService from '../services/column.service';

class ColumnController {
    async createColumn(req: express.Request, res: express.Response) {
        try {
            const { boardId, name } = req.body;
            const newColumn = await columnService.createColumn(boardId, { name });
            return res.status(201).json(newColumn);
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    async updateColumn(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params;
            const { name, tasks } = req.body;
            const updatedColumn = await columnService.updateColumn(id, { name, tasks });
            if (!updatedColumn) return res.sendStatus(404);
            return res.status(200).json(updatedColumn);
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    async deleteColumn(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params;
            const deletedColumn = await columnService.deleteColumn(id);
            if (!deletedColumn) return res.sendStatus(404);
            return res.sendStatus(204);
        } catch (e) {
            return res.sendStatus(400);
        }
    }
}

export default new ColumnController();