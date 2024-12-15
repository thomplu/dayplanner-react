import { TaskItem } from '../types/task';
import "./TaskList.scss"

type TaskListProps = {
    tasks: TaskItem[]
    onTaskSelect: (id: number) => void
    onAddTask: () => void
    title: string
}

function TaskList<TaskListProps>({ tasks, onTaskSelect, title, onAddTask }) {

    const getTaskTitle = (task: TaskItem): string => {
        return `${task.prio ? '!!! ' : ''} ${task.title}`
    }
    return (
        <div className="tasks">
            <div className="tasks__header">
                <h1 className="tasks__heading">{ title }</h1>
                <button className="tasks__add-btn" onClick={onAddTask}><span className="tasks__add-btn-icon">&nbsp;</span></button>
            </div>
            <ul className="tasks__list">
                {tasks.map((task) => (
                    <li className="tasks__item" key={task.id} onClick={() => onTaskSelect(task.id)}>
                        <div className="tasks__data">
                            <span className="tasks__title">{ getTaskTitle(task) }</span>
                            <span className="tasks__duration">{ task.duration } min</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;