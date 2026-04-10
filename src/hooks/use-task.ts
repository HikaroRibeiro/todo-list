import useLocalStorageState from "use-local-storage-state"
import { Task, TASKS_KEY, TaskState } from "../models/tasks"
import { delay } from "../helpers/utils";
import React from "react";

export default function useTask(){
    const [tasks,setTasks] = useLocalStorageState<Task[]>(TASKS_KEY, {defaultValue:[]});
    const [isUpdatingTasks, setIsUpdatingTasks] = React.useState(false);
    const [isDeletingTask, setIsDeletingTask] = React.useState(false);

    function prepareTask(){
        setTasks([...tasks, {
            id: Math.random().toString(36).substring(2,12),
            title: "",
            state: TaskState.Creating
        }])
    }

    async function updateTask(id: string, payload: {title: Task['title']}) {
        setIsUpdatingTasks(true);
        await delay(1000);
        setTasks(tasks.map((task) => task.id === id ? 
        {...task, state: TaskState.Created, ...payload} : 
        task))
        setIsUpdatingTasks(false);
    }

    function updateTaskStatus(id: string, concluded: boolean){
        setTasks(
            tasks.map((task) => task.id === id ? {...task, concluded} : task)
        )
    }

    async function deleteTask(id: string){
        setIsDeletingTask(true);
        await delay(1000);
        setTasks(tasks.filter((task) => task.id !== id))
        setIsDeletingTask(false);
    }

    return {prepareTask, updateTask, updateTaskStatus, deleteTask, isUpdatingTasks, isDeletingTask}
}