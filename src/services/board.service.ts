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

    async createBoardWithColumns(boardData: any, columns: any[]) {
        const session = await BoardModel.startSession();
        session.startTransaction();

        try {
            const newBoard = new BoardModel(boardData);
            await newBoard.save({ session });

            for (let columnData of columns) {
                const newColumn = new ColumnModel(columnData);
                await newColumn.save({ session });

                newBoard.columns.push(newColumn._id);
            }

            await newBoard.save({ session });

            await session.commitTransaction();
            session.endSession();

            return await BoardModel.findById(newBoard._id).populate({
                path: 'columns',
                populate: {
                    path: 'tasks'
                }
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            throw error;
        }
    }


    async updateBoard(id: string, updateData: { boardData: any, columns: any[] }) {
        const session = await BoardModel.startSession();
        session.startTransaction();

        try {
            const board = await BoardModel.findById(id).session(session);
            if (!board) {
                await session.abortTransaction();
                session.endSession();
                return null;
            }

            if (updateData.boardData) {
                board.title = updateData.boardData.title || board.title;
                board.description = updateData.boardData.description || board.description;
            }

            const existingColumns = await ColumnModel.find({ _id: { $in: board.columns } }).exec();
            const existingColumnMap = new Map(existingColumns.map(col => [col._id.toString(), col.name]));

            const newColumnNames = new Set(updateData.columns.map((col: any) => col.name));

            const columnsToRemove = board.columns.filter(colId => {
                const colIdStr = colId.toString();
                return !newColumnNames.has(existingColumnMap.get(colIdStr));
            });

            if (columnsToRemove.length > 0) {
                await ColumnModel.deleteMany({ _id: { $in: columnsToRemove } }, { session });
                board.columns = board.columns.filter(colId => !columnsToRemove.includes(colId));
            }

            if (updateData.columns) {
                for (const columnData of updateData.columns) {
                    let column = await ColumnModel.findOne({ name: columnData.name }).exec();
                    if (!column) {
                        column = new ColumnModel(columnData);
                        await column.save({ session });
                    }
                    if (!board.columns.includes(column._id)) {
                        board.columns.push(column._id);
                    }
                }
            }

            await board.save({ session });

            await session.commitTransaction();
            session.endSession();

            return await BoardModel.findById(board._id).populate({
                path: 'columns',
                populate: {
                    path: 'tasks'
                }
            });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            throw error;
        }
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