export type TaskType = {
	id: string;
	content: string;
};

export type ColumnType = {
	id: string;
	title: string;
	taskIds: string[];
};

export type InitialDataType = {
	tasks: TaskType[];
	columns: ColumnType[];
};
