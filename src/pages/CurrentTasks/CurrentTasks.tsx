import { useState, useEffect, useMemo } from 'react';
import { api } from '../../services/api';
import { TaskData, TaskItem } from '../../types/Task';
import TaskList from '../../components/TaskList/TaskList';
import TaskPopup from '../../components/TaskPopup/TaskPopup';
import { useAuth } from '../../helpers/authContext';

function CurrentTasks() {
    const [showTaskPopup, setShowTaskPopup] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const { accessToken } = useAuth();
    const [selectedTask, setSelectedTask] = useState<TaskItem | undefined>(
        undefined
    );
    useEffect(() => {
        fetchTasks().then();
    }, [accessToken]);

    const unfinishedTasks = useMemo(
        () => tasks.filter((task) => !task.closed),
        [tasks]
    );
    const tasksTitle = useMemo(() => {
        const totalDurationMins = unfinishedTasks.reduce(
            (accumulator, task) => accumulator + task.duration,
            0
        );
        const hours = Math.floor(totalDurationMins / 60);
        const restMinutes = totalDurationMins % 60;
        return `${hours}h, ${restMinutes}min tasks today`;
    }, [tasks]);

    const fetchTasks = async () => {
        try {
            const data = await api.fetchTasks(accessToken);
            setTasks(data);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const handleAddTask = () => {
        setShowTaskPopup(true);
    };

    const handleTaskSelect = (id: number) => {
        setSelectedTask(tasks.find((task) => task.id === id));
        setShowTaskPopup(true);
    };

    const handleTaskConfirm = async (
        id: number | undefined,
        taskData: TaskData
    ) => {
        if (id) {
            if (taskData.closed) {
                const now = new Date();
                taskData.closureTime = now.toISOString();
            }
            await api.editTask(accessToken, id, taskData);
            await fetchTasks();
            setShowTaskPopup(false);
            return;
        }
        await api.createTask(accessToken, taskData);
        await fetchTasks();
        setShowTaskPopup(false);
    };

    const handleTaskPopupClose = () => {
        setShowTaskPopup(false);
    };

    return (
        <>
            <TaskList
                title={tasksTitle}
                tasks={unfinishedTasks}
                onTaskSelect={handleTaskSelect}
                onAddTask={handleAddTask}
            />
            {showTaskPopup ? (
                <TaskPopup
                    task={selectedTask}
                    onTaskPopupClose={handleTaskPopupClose}
                    onTaskConfirm={handleTaskConfirm}
                />
            ) : null}
        </>
    );
}

export default CurrentTasks;
