import mongoose from "mongoose";
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


    async updateBoard(id: string, updateData: any) {
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            const { boardData, columns } = updateData;
    
            const updatedBoard = await BoardModel.findById(id).session(session);
    
            if (!updatedBoard) {
                await session.abortTransaction();
                session.endSession();
                return null;
            }
    
            updatedBoard.title = boardData.title || updatedBoard.title;
            updatedBoard.description = boardData.description || updatedBoard.description;
    
            const existingColumnIds = updatedBoard.columns.map(col => col.toString());
    
            const newColumnIds: mongoose.Types.ObjectId[] = [];
    
            for (const columnData of columns) {
                if (columnData._id) {
                    const column = await ColumnModel.findById(columnData._id).session(session);
    
                    if (column) {
                        column.name = columnData.name || column.name;
                        await column.save({ session });
                        newColumnIds.push(column._id);
                    }
                } else {
                    const newColumn = new ColumnModel({ name: columnData.name });
                    await newColumn.save({ session });
                    newColumnIds.push(newColumn._id);
                }
            }
    
            updatedBoard.columns = newColumnIds;
    
            await updatedBoard.save({ session });
    
            await session.commitTransaction();
            session.endSession();
    
            return await BoardModel.findById(updatedBoard._id).populate({
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