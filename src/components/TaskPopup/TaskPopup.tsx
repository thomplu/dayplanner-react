import './TaskPopup.scss';
import { TaskData, TaskFormData, TaskItem } from '../../types/Task';
import { useMemo, useState } from 'react';
import FormElement from '../FormElement/FormElement';
import { FormInput } from '../../types/Form';

type TaskPopupProps = {
    task: TaskItem | undefined;
    onTaskConfirm: (
        id: number | undefined,
        taskData: TaskData
    ) => Promise<void>;
    onTaskPopupClose: () => void;
};

function TaskPopup({ task, onTaskConfirm, onTaskPopupClose }: TaskPopupProps) {
    const title = useMemo(() => (task ? 'Edit task' : 'createTask'), [task]);
    const confirmBtnCaption = useMemo(
        () => (task ? 'Save task' : 'Create task'),
        [task]
    );
    const getTaskDataFromTask = (task: TaskItem | undefined): TaskFormData => ({
        title: task?.title ?? '',
        description: task?.description ?? '',
        duration: task?.duration.toString() ?? '',
        prio: task?.prio?.toString() ?? '',
        completed: task?.completed ?? false,
        note: task?.note ?? '',
        closed: task?.closed ?? false,
    });
    const [taskDataFields, setTaskDataFields] = useState<TaskFormData>(
        getTaskDataFromTask(task)
    );
    const TaskDataKeys: { [p: string]: string } = Object.keys(
        taskDataFields
    ).reduce((acc, key) => ({ ...acc, [key]: key }), {});
    const [error, setError] = useState('');

    const handleChange = (key: string, value: string | boolean | number) => {
        setTaskDataFields((prevState: TaskFormData) => {
            return { ...prevState, [key]: value };
        });
    };

    const handleChangeClosedState = (
        key: string,
        value: string | boolean | number
    ) => {
        setTaskDataFields((prevState: TaskFormData) => {
            return { ...prevState, [TaskDataKeys.completed]: true };
        });
        handleChange(key, value);
    };

    const validateInput = (): boolean => {
        if (!taskDataFields.title) {
            setError('No title');
            return false;
        }
        if (!taskDataFields.duration) {
            setError('No duration');
            return false;
        }
        if (isNaN(Number(taskDataFields.duration))) {
            setError('Duration is not a number');
            return false;
        }
        if (isNaN(Number(taskDataFields.prio))) {
            setError('Priority is not a number');
            return false;
        }
        return true;
    };

    const handleConfirm = async () => {
        if (!validateInput) return;
        const editedTaskData: TaskData = {
            title: taskDataFields.title.trim(),
            description: taskDataFields.description?.trim().length
                ? taskDataFields.description?.trim()
                : undefined,
            duration: Number(taskDataFields.duration),
            prio: Number(taskDataFields.prio),
            completed: taskDataFields.completed,
            closed: taskDataFields.closed,
            note: taskDataFields.note?.trim().length
                ? taskDataFields.note.trim()
                : undefined,
        };
        await onTaskConfirm(task?.id, editedTaskData);
    };

    return (
        <div className="popup__container">
            <div className="popup__window">
                <div className="popup__header">
                    <h2 className="popup__heading">{title}</h2>
                    <div className="popup__close">
                        <div
                            className="popup__close-btn"
                            onClick={onTaskPopupClose}
                        ></div>
                    </div>
                </div>
                <FormElement
                    id={TaskDataKeys.title}
                    label="Title"
                    value={taskDataFields?.title ?? ''}
                    onChange={handleChange}
                />
                <FormElement
                    id={TaskDataKeys.description}
                    label="Description"
                    type={FormInput.Textarea}
                    value={taskDataFields?.description ?? ''}
                    onChange={handleChange}
                />
                <FormElement
                    id={TaskDataKeys.duration}
                    label="Duration"
                    value={taskDataFields?.duration ?? ''}
                    onChange={handleChange}
                />
                <FormElement
                    id={TaskDataKeys.prio}
                    label="Priority"
                    value={taskDataFields?.prio ?? ''}
                    onChange={handleChange}
                />
                <FormElement
                    id={TaskDataKeys.closed}
                    label="Task closed"
                    type={FormInput.Checkbox}
                    value={taskDataFields?.closed ?? false}
                    onChange={handleChangeClosedState}
                />
                {taskDataFields.closed ? (
                    <div>
                        <FormElement
                            id={TaskDataKeys.completed}
                            label="Task completed"
                            type={FormInput.Checkbox}
                            value={taskDataFields?.completed ?? false}
                            onChange={handleChange}
                        />
                        <FormElement
                            id={TaskDataKeys.note}
                            label="Closure note"
                            type={FormInput.Textarea}
                            value={taskDataFields?.note ?? ''}
                            onChange={handleChange}
                        />
                    </div>
                ) : null}
                {error ? <div className="popup__errors">{error}</div> : null}
                <div className="popup__controls">
                    <button
                        className="popup__btn button"
                        type="button"
                        onClick={handleConfirm}
                    >
                        {confirmBtnCaption}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskPopup;
