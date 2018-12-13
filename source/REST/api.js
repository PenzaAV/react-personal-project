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

        console.log(tasks);

        return tasks;
    },

    createTask: async (value) => {
        console.log(typeof value);
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
    updateTask: async (...task) => {
        const response = await fetch(MAIN_URL, {
            ...task,
            method:  "PUT",
            headers: {
                "content-type": "application/json",
                Authorization:  TOKEN,
            },
            message: "string",
        });

        const { data: updatedTask } = await response.json();

        return updatedTask;
    },
    removeTask: async (task_id) => {
        const response = await fetch(MAIN_URL, {
            POST_ID: task_id,
            method:  "DELETE",
            headers: {
                Authorization: TOKEN,
            },
            message: "string",
        });
    },

    completeAllTasks: async (tasks) => {
        const completed = [];

        for (const task in tasks) {
            completed.push(this.removeTask(task.id));
        }

        return Promise.all(completed);
    },
};
