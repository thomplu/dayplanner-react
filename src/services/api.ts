import { ApiError, TaskData, TaskItem } from '../types/Task.ts';

class ApiService {
    private onUnauthorizedCallback: () => void = () => {};

    public setOnUnauthorizedHandler(handler: () => void) {
        this.onUnauthorizedCallback = handler;
    }

    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 403 || response.status === 401) {
                this.onUnauthorizedCallback();
            }
            throw await ApiService.handleError(response);
        }

        if (
            response.status !== 204 &&
            response.headers.get('Content-Length') !== '0'
        ) {
            const data = await response.json();
            return data as T;
        }
        return undefined as unknown as T;
    }

    private static async handleError(res: Response): Promise<ApiError> {
        if (res.status) {
            return {
                code: res.status,
                message: res.statusText,
            };
        }
        return {
            code: null,
            message: 'An unknow error occured!',
        };
    }

    public async fetchTasks(accessToken: string): Promise<TaskItem[]> {
        return api.request<TaskItem[]>(
            'https://railway-planner-backend-production.up.railway.app/tasks',
            {
                method: 'GET',
                headers: this.getHeaders(accessToken),
            }
        );
    }

    public async login(
        data: Record<string, string>
    ): Promise<{ accessToken: string; username: string }> {
        return api.request<{
            accessToken: string;
            username: string;
        }>('https://railway-planner-backend-production.up.railway.app/login', {
            method: 'POST',
            headers: this.getHeaders(''),
            body: JSON.stringify(data),
        });
    }

    public async register(
        data: Record<string, string>
    ): Promise<{ username: string }> {
        return api.request<{ username: string }>(
            'https://railway-planner-backend-production.up.railway.app/register',
            {
                method: 'POST',
                headers: this.getHeaders(''),
                body: JSON.stringify(data),
            }
        );
    }

    public async createTask(
        accessToken: string,
        task: TaskData
    ): Promise<{ task: TaskItem }> {
        return api.request<{ task: TaskItem }>(
            'https://railway-planner-backend-production.up.railway.app/tasks',
            {
                method: 'POST',
                headers: this.getHeaders(accessToken),
                body: JSON.stringify({ task: task }),
            }
        );
    }
    public async deleteTask(
        accessToken: string,
        taskId: number
    ): Promise<void> {
        return api.request<void>(
            `https://railway-planner-backend-production.up.railway.app/tasks/${taskId}`,
            {
                method: 'DELETE',
                headers: this.getHeaders(accessToken),
            }
        );
    }

    public async editTask(
        accessToken: string,
        id: number,
        taskData: TaskData
    ): Promise<{ task: TaskItem }> {
        return api.request<{ task: TaskItem }>(
            `https://railway-planner-backend-production.up.railway.app/tasks/${id}`,
            {
                method: 'PUT',
                headers: this.getHeaders(accessToken),
                body: JSON.stringify({ task: taskData }),
            }
        );
    }

    private getHeaders(accessToken: string) {
        const headers: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        };
        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
        return headers;
    }
}

export const api = new ApiService();
