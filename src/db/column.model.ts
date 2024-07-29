import mongoose, { Document } from "mongoose"

interface IColumn extends Document {
    name: string;
    tasks: mongoose.Types.ObjectId[];
}

const ColumnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

const ColumnModel = mongoose.model('Column', ColumnSchema);
export { ColumnModel, ColumnSchema };
export { IColumn };