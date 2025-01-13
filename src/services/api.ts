import { ApiError, TaskData, TaskItem } from '../types/Task.ts';
// Node's built-in EventEmitter

class ApiService {
    private onUnauthorizedCallback: () => void = () => {};

    public setOnUnauthorizedHandler(handler: () => void) {
        this.onUnauthorizedCallback = handler;
    }

    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const response = await fetch(url, options);
        console.log('request url:', url);

        if (!response.ok) {
            if (response.status === 403 || response.status === 401) {
                //Todo Adjust link to login page
                console.log('reroute to login');
                console.log(
                    'call onUnauthorizedCallback',
                    this.onUnauthorizedCallback
                );
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
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: this.getHeaders(accessToken),
            }
        );
    }

    public async login(
        data: Record<string, string>
    ): Promise<{ accessToken: string; username: string }> {
        const resData = await api.request<{
            accessToken: string;
            username: string;
        }>('https://railway-planner-backend-production.up.railway.app/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: this.getHeaders(''),
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        console.log('set access token');
        return resData;
    }

    public async register(
        data: Record<string, string>
    ): Promise<{ username: string }> {
        return api.request<{ username: string }>(
            'https://railway-planner-backend-production.up.railway.app/register',
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: this.getHeaders(''),
                body: JSON.stringify(data), // body data type must match "Content-Type" header
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
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: this.getHeaders(accessToken),
                body: JSON.stringify({ task: task }), // body data type must match "Content-Type" header
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
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
