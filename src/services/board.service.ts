import { BoardModel } from "../db/board.model";
import { ColumnModel } from "../db/column.model";
import { TaskModel } from "../db/task.model";

class BoardService {
    async getAllBoards() {
        return await BoardModel.find().populate({
            path: 'columns',
            populate: {
                path: 'tasks'
            }
        });
    }

    async getBoardById(id: string) {
        return await BoardModel.findById(id).populate({
            path: 'columns',
            populate: {
                path: 'tasks'
            }
        });
    }

    async createBoard(boardData: any) {
        const newBoard = new BoardModel(boardData);
        return await newBoard.save();
    }

    async updateBoard(id: string, updateData: any) {
        return await BoardModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteBoard(id: string) {
        const board = await BoardModel.findById(id).populate({
            path: 'columns',
            populate: {
                path: 'tasks'
            }
        });

        if (!board) {
            return null;
        }

        for (const column of board.columns) {
            //@ts-ignore
            await TaskModel.deleteMany({ _id: { $in: column.tasks } });
        }

        await ColumnModel.deleteMany({ _id: { $in: board.columns } });

        return await BoardModel.findByIdAndDelete(id);
    }
}

export default new BoardService();