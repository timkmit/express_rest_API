import { BoardModel } from "../db/board.model";
import { ColumnModel } from "../db/column.model";

class ColumnService {
    async createColumn(boardId: string, columnData: any) {
        const newColumn = new ColumnModel(columnData);
        await newColumn.save();

        await BoardModel.findByIdAndUpdate(boardId, {
            $push: { columns: newColumn._id }
        });

        return newColumn;
    }

    async updateColumn(id: string, updateData: any) {
        return await ColumnModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteColumn(id: string) {
        const column = await ColumnModel.findByIdAndDelete(id);
        if (column) {
            await BoardModel.updateMany({}, { $pull: { columns: id } });
        }
        return column;
    }
}

export default new ColumnService();