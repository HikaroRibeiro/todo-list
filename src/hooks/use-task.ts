import useLocalStorageState from "use-local-storage-state"
import { Task, TASKS_KEY, TaskState } from "../models/tasks"

export default function useTask(){
    const [tasks,setTasks] = useLocalStorageState<Task[]>(TASKS_KEY, {defaultValue:[]});

    function prepareTask(){
        setTasks([...tasks, {
            id: Math.random().toString(36).substring(2,12),
            title: "",
            state: TaskState.Creating
        }])
    }

    function updateTask(id: string, payload: {title: Task['title']}) {
        setTasks(tasks.map((task) => task.id === id ? 
        {...task, state: TaskState.Created, ...payload} : 
        task))
    }

    return {prepareTask, updateTask}
}