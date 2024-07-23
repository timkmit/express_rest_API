import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subtasks: [{
        type: String
    }],
    status: {
        type: String,
        required: true
    }
});

const TaskModel = mongoose.model('Task', TaskSchema);
export { TaskModel, TaskSchema };