
import { Task, TASKS_KEY } from "../models/tasks";
import useLocalStorageState from "use-local-storage-state";

export default function useTasks() {
    const[tasks] = useLocalStorageState<Task[]>(TASKS_KEY, {defaultValue:[]})

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
        tasksCount: tasks.length,
        concludedTaskCount: tasks.filter((task) => task.concluded).length
    }
}