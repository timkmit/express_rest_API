import express from 'express';
import boardService from '../services/board.service';
import columnService from '../services/column.service';

class BoardController {
    async getAllBoards(req: express.Request, res: express.Response) {
        try {
            const boards = await boardService.getAllBoards();
            return res.status(200).json({ data: boards });
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    async getBoard(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params;
            const board = await boardService.getBoardById(id);
            if (!board) return res.sendStatus(404);
            return res.status(200).json({ data: board });
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    async createBoard(req: express.Request, res: express.Response) {
        try {
            const boardData = req.body;
            const newBoard = await boardService.createBoard(boardData);
            return res.status(201).json(newBoard);
        } catch (e) {
            return res.sendStatus(400);
        }
    }

    async createBoardWithCol(req: express.Request, res: express.Response) {
        try {
            const { boardData, columns } = req.body;
            const newBoard = await boardService.createBoardWithColumns(boardData, columns);
            return res.status(201).json({ data: newBoard });
        } catch (e) {
            console.error(e);
            return res.status(400).json({ error: e });
        }
    }

    async updateBoard(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedBoard = await boardService.updateBoard(id, updateData);
            console.log(updateData)

            if (!updatedBoard) return res.sendStatus(404);
            return res.status(200).json(updatedBoard);
        } catch (e) {
            console.error(e);
            return res.sendStatus(400);
        }
    }

    async deleteBoard(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params;
            const deletedBoard = await boardService.deleteBoard(id);
            if (!deletedBoard) return res.sendStatus(404);
            return res.sendStatus(204);
        } catch (e) {
            return res.sendStatus(400);
        }
    }
}

export default new BoardController();