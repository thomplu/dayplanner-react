import "./TaskPopup.scss"
import { TaskData, TaskItem } from '../types/Task';
import { useEffect, useMemo, useState } from 'react';

type TaskPopupProps = {
    task?: TaskItem
    onTaskConfirm: (id: number, taskData: TaskData) => Promise<void>
    onTaskPopupClose: () => void
}

function TaskPopup<TaskPopupProps>({ task, onTaskConfirm, onTaskPopupClose }) {

    const title = useMemo(() => task ? 'Edit task' : 'createTask', [task]); //
    const confirmBtnCaption = useMemo(() => task ? 'Save task' : 'Create task', [task]); //
    const [taskDataFields, setTaskDataFields] = useState<TaskData>({
        title: task?.title ?? '',
        description: task?.description ?? '',
        duration: task?.duration ?? '',
        prio: task?.prio ?? '',
        completed: task?.prio ?? false,
        note: task?.note ?? ''
    })
    const [error, setError] = useState('')

    useEffect(() => {
        setTaskDataFields(task); // Update local state when the prop changes
    }, [task]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        // Update only the specific property that has changed
        setTaskDataFields({
            ...taskDataFields, // Spread the existing state
            [id]: value, // Update the specific field using computed property names
        });
    };

    const validateInput = (): boolean => {
        if(!taskDataFields.title) {
            setError("No title")
            return false
        }
        if(!taskDataFields.duration) {
            setError("No duration")
            return false
        }
        if(isNaN(Number(taskDataFields.duration))){
            setError("Duration is not a number")
            return false
        }
        if(isNaN(Number(taskDataFields.prio))){
            setError("Priority is not a number")
            return false
        }
        return true;
    }

    const handleConfirm = () => {
        if (!validateInput) return
        const editedTaskData: TaskData = {
            title: taskDataFields.title,
            description: taskDataFields.description?.length ? taskDataFields.description : undefined,
            duration: Number(taskDataFields.duration),
            prio: Number(taskDataFields.prio),
            completed: taskDataFields.completed,
            note: taskDataFields.note?.length ? taskDataFields.note : undefined
        }
        onTaskConfirm(task.id, editedTaskData)
    }

    return (
        <div className="popup__container">
            <div className="popup__window">
                <div className="popup__header">
                    <h2 className="popup__heading">{ title }</h2>
                    <div className="popup__close">
                        <div className="popup__close-btn" onClick={onTaskPopupClose}></div>
                </div>
                </div>
                <div className="popup__entry">
                    <label className="popup__label label" htmlFor="title">Title</label>
                    <input id="title" type="text" value={taskDataFields?.title ?? ""} onChange={handleInputChange}/>
                </div>
                <div className="popup__entry">
                    <label className="popup__label label" htmlFor="description">Description</label>
                    <textarea id="description" value={taskDataFields?.description ?? ""} onChange={handleInputChange}/>
                </div>
                <div className="popup__entry">
                    <label className="popup__label label" htmlFor="duration">Duration</label>
                    <input id="duration" type="text" value={taskDataFields?.duration ?? ""} onChange={handleInputChange}/>
                </div>
                <div className="popup__entry">
                    <label className="popup__label label" htmlFor="priority">Priority</label>
                    <input id="prio" type="text" value={taskDataFields?.prio ?? ""} onChange={handleInputChange}/>
                </div>
                {/*<div className="popup__entry">*/}
                {/*    <CheckBox className="popup__completed" value={taskDataFields.completed}/>*/}
                {/*</div>*/}
                {/*<div v-if="taskDataFields.completed" className="popup__entry">*/}
                {/*    <label className="popup__label label" for="note">Completion note</label>*/}
                {/*    <textarea id="note" value={taskDataFields.note}/>*/}
                {/*</div>*/}
                {error ? <div className="popup__errors">{ error }</div> : null}
                <div className="popup__controls">
                    <button className="popup__btn button" type="button" onClick={handleConfirm}>{ confirmBtnCaption }</button>
                </div>
            </div>
        </div>
    );
};

export default TaskPopup;