import useTasks from "../hooks/use-tasks";
import useTask from "../hooks/use-task";
import Button from "../components/button";
import PlusIcon from "../assets/icons/plus.svg?react"
import TaskItem from "./task-item";
import { Task, TaskState } from "../models/tasks";

export default function TasksList(){
    const {tasks, isLoadingTask} = useTasks()
    const {prepareTask} = useTask()

    console.log(tasks)

    function handleNewTask() {
        prepareTask()
    }

    return(<>
        <section>
            <Button 
                icon={PlusIcon} 
                className="w-full" 
                onClick={handleNewTask} 
                disabled={tasks.some((task) => task.state === TaskState.Creating) || isLoadingTask}>Nova Tarefa</Button>
        </section>
        <section className="space-y-2">
            {!isLoadingTask && tasks.map((task) => <TaskItem key={task.id} task={task} />)}
            {isLoadingTask && 
            <>
               <TaskItem task={{} as Task} loading />
               <TaskItem task={{} as Task} loading />
               <TaskItem task={{} as Task} loading />
            </>}
        </section>
    </>)
}