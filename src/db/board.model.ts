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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
    }]
});

const BoardModel = mongoose.model('Board', BoardSchema);
export { BoardModel, BoardSchema };