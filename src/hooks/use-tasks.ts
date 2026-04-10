
import React from "react";
import { Task, TASKS_KEY, TaskState } from "../models/tasks";
import useLocalStorageState from "use-local-storage-state";
import { delay } from "../helpers/utils";

export default function useTasks() {
    const[tasksData] = useLocalStorageState<Task[]>(TASKS_KEY, {defaultValue:[]});
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [isLoadingTask, setIsLoadingTask] = React.useState(true);

    async function fetchTasks() {
        if (isLoadingTask) {
            await delay(2000);
            setIsLoadingTask(false);
        }

        setTasks(tasksData);
    }
    React.useEffect(() => {
        fetchTasks();
    }, [tasksData])
    /* setTasks([
        {
            id: '1',
            title: "teste 1",
            concluded: true,
            state: TaskState.Created
        },
        {
            id: '2',
            title: "teste 2",
            concluded: false,
            state: TaskState.Creating
        }
    ]) */

    return {
        tasks,
        tasksCount: tasks.filter((task) => task.state === TaskState.Created).length,
        concludedTaskCount: tasks.filter((task) => task.concluded).length,
        isLoadingTask,
    }
}