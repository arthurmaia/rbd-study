import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

import { TaskType } from "../../types";

import { Container } from "./styles";

interface Props {
	task: TaskType;
	index: number;
}

const Task: React.FC<Props> = (props) => {
	const { task, index } = props;

	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided: DraggableProvided) => (
				<Container
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					{task.content}
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
