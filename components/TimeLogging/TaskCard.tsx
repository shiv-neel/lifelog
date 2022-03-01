import React from 'react'
import { TaskType } from '../../utils/TimeLogUtils'

interface TaskCardProps {
	task: TaskType
}
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	return <div>{task.taskname}</div>
}

export default TaskCard
