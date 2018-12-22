import { MAIN_URL, TOKEN } from "./config";
export const api = {
    fetchTasks: async () => {
        const response = await fetch(MAIN_URL, {
            method:  "GET",
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: tasks } = await response.json();

        return tasks;
    },

    createTask: async (value) => {
        const response = await fetch(MAIN_URL, {
            method:  "POST",
            headers: {
                "content-type": "application/json",
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ message: value }),
        });

        const { data: task } = await response.json();

        return task;
    },
    updateTask: async (task) => {
        const response = await fetch(MAIN_URL, {
            method:  "PUT",
            headers: {
                "content-type": "application/json",
                Authorization:  TOKEN,
            },
            body: JSON.stringify([
                {
                    id:        task.id,
                    message:   task.message,
                    completed: task.completed,
                    favorite:  task.favorite,
                }
            ]),
        });

        const { data } = await response.json();

        return data;
    },
    removeTask: async (taskId) => {
        await fetch(`${MAIN_URL}/${taskId}`, {
            method:  "DELETE",
            headers: {
                Authorization: TOKEN,
            },
        });
    },

    completeAllTasks: async (tasks) => {
        const completedTasks = tasks.map(async (task) => {
            task.completed = true;
            await api.updateTask(task);
        });

        await Promise.all(completedTasks);
    },
};
