interface ITask {
    _id: string;
    title: string;
    description: string;
    subtasks: string[];
    status: string;
}

interface IColumn {
    _id: string;
    name: string;
    tasks: ITask[];
}

interface IBoard {
    _id: string;
    title: string;
    description: string;
    columns: IColumn[];
    __v?: number;
}

interface IUpdateColumnData {
    _id?: string;
    name: string;
}

interface IUpdateBoardData {
    boardData?: {
        title?: string;
        description?: string;
    };
    columns: IUpdateColumnData[];
}

export { ITask, IColumn, IBoard, IUpdateColumnData, IUpdateBoardData };