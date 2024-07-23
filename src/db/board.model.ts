import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    columns: [{
        name: {
            type: String,
            required: true
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }]
    }]
});

export const BoardModel = mongoose.model('Board', BoardSchema)