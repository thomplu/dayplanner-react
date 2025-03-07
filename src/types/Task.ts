export interface ApiError {
    message: string;
    code: number | null;
}

export interface TaskItem {
    id: number;
    title: string;
    description?: string;
    prio?: number;
    duration: number;
    completed?: boolean;
    closed?: boolean;
    closureTime?: string;
    note?: string;
}

export type TaskData = Omit<TaskItem, 'id'>;

export interface TaskFormData {
    title: string;
    description: string;
    prio: string;
    duration: string;
    completed: boolean;
    closed: boolean;
    note: string;
}
