import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { initialData } from "../../data/initial-data.json";
import { ColumnType, InitialDataType, TaskType } from "../../types";
import Column from "../Column";

const Kanban: React.FC = () => {
	const [initialState, setInitialState] = useState<InitialDataType>(
		initialData
	);

	function handleDragEnd(result: DropResult): void {
		const { destination, source, draggableId } = result;
		// Verify if there's no destination. Ex: Move a task to no one column!
		if (!destination) return;

		// Verify if the user is trying to move the task to the same location!
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		let column: ColumnType = { id: "", title: "", taskIds: [] };

		initialState.columns.forEach((columnItem) => {
			if (columnItem.id === source.droppableId) {
				column = { ...columnItem };
			}
		});

		const newTaskIds = [...column.taskIds];

		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);

		console.log("newTaskIds ->", newTaskIds);

		const newColumn: ColumnType = {
			...column,
			taskIds: newTaskIds,
		};

		let newState: InitialDataType = initialState;

		newState.columns = [newColumn];

		setInitialState(newState);
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			{initialState.columns.map((columnItem) => {
				let tasks: TaskType[] = [];

				initialState.tasks.forEach((taskItem) => {
					if (columnItem.taskIds.includes(taskItem.id)) {
						tasks.push(taskItem);
					}
				});

				return <Column key={columnItem.id} column={columnItem} tasks={tasks} />;
			})}
		</DragDropContext>
	);
};

export default Kanban;
