export interface ApiError {
    message: string; // Error message to display to the user
    code: number | null; // HTTP status code or null if unavailable
}

export interface TaskItem {
    id: number,
    title: string,
    description?: string,
    prio?: number,
    duration: number,
    completed?: boolean,
    note?: string,
}

export type TaskData = Omit<TaskItem, 'id'>

export type EditTaskItem = Partial<TaskItem> & {id: number}