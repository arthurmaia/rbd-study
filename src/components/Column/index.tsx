import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";

import { ColumnType, TaskType } from "../../types";
import Task from "../Task";

import { Container, Title, TaskList } from "./styles";

interface Props {
	column: ColumnType;
	tasks: TaskType[];
}

const Column: React.FC<Props> = (props) => {
	const { column, tasks } = props;

	return (
		<Container>
			<Title>{column.title}</Title>
			<Droppable droppableId={column.id}>
				{(provided: DroppableProvided) => (
					<TaskList ref={provided.innerRef} {...provided.droppableProps}>
						{tasks.map((task, index) => (
							<Task key={task.id} task={task} index={index} />
						))}
						{provided.placeholder}
					</TaskList>
				)}
			</Droppable>
		</Container>
	);
};

export default Column;
