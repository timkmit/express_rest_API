import mongoose, { Document } from "mongoose";

interface IBoard extends Document {
    title: string;
    description: string;
    columns: mongoose.Types.ObjectId[];
}

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
export { IBoard };