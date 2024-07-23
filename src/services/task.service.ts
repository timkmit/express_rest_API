import { ColumnModel } from "../db/column.model";
import { TaskModel } from '../db/task.model';

class TaskService {
    async createTask(columnId: string, taskData: any) {
        const newTask = new TaskModel(taskData);
        await newTask.save();

        await ColumnModel.findByIdAndUpdate(columnId, {
            $push: { tasks: newTask._id }
        });

        return newTask;
    }

    async updateTask(id: string, updateData: any) {
        return await TaskModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteTask(id: string) {
        const task = await TaskModel.findByIdAndDelete(id);
        if (task) {
            await ColumnModel.updateMany({}, { $pull: { tasks: id } });
        }
        return task;
    }
}

export default new TaskService();