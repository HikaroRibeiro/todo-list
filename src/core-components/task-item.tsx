import React from "react";
import useTask from "../hooks/use-task";
import Card from "../components/card";
import InputCheckbox from "../components/input-checkbox";
import Text from "../components/text";
import ButtonIcon from "../components/button-icon";
import TrashIcon from "../assets/icons/trash.svg?react";
import XIcon from "../assets/icons/x.svg?react"
import PencilIcon from "../assets/icons/pencil.svg?react"
import InputText from "../components/input-text";
import CheckIcon from "../assets/icons/check.svg?react"
import { Task, TaskState } from "../models/tasks";
import { cx } from "class-variance-authority";
import Skeleton from "../components/skeleton";

interface TaskItemProps {
    task: Task;
    loading?: boolean;
}

export default function TaskItem({task, loading}: TaskItemProps){
    const[isEditing, setIsEditing] = React.useState(task?.state === TaskState.Creating);

    const [taskTitle, setTaskTitle] = React.useState(task.title ||"");
    const {updateTask, updateTaskStatus, deleteTask, isUpdatingTasks, isDeletingTask} = useTask();

    function handleEditing(){
        setIsEditing(true)
    }

    function handleExitEditing(){
        if (task.state === TaskState.Creating){
            deleteTask(task.id);
        }
    }

    function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.target.value || "")
    }

    async function handleSaveTask(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        await updateTask(task.id, {title: taskTitle});
        setIsEditing(false);
    }

    function handleChangeTaskStatus(e: React.ChangeEvent<HTMLInputElement>){
        const checked = e.target.checked;
        updateTaskStatus(task.id, checked);
    }

    async function handleDeleteTask() {
        await deleteTask(task.id);
    }

    return (
        <Card size="md">
            {!isEditing ? (
                <div className="flex items-center gap-4">
                    <>
                        <InputCheckbox checked={task?.concluded} onChange={handleChangeTaskStatus} loading={loading} />

                        {!loading ? <Text className={cx("flex-1",{'line-through': task?.concluded})}>{task?.title}</Text> : <Skeleton className="flex-1 h-6" /> }
                        

                        <div className="flex gap-1">
                            <ButtonIcon icon={TrashIcon} variant="tertiary" onClick={handleDeleteTask} loading={loading} handling={isDeletingTask} />
                            <ButtonIcon icon={PencilIcon} variant="tertiary" onClick={handleEditing} loading={loading} />
                        </div>

                    </>
                </div>
                    ) : (
                        <form onSubmit={handleSaveTask} className="flex items-center gap-4">
                            <InputText value={taskTitle} className="flex-1" onChange={handleChangeTaskTitle} required autoFocus />
                            <div>
                                <ButtonIcon type="button" icon={XIcon} variant="secondary" onClick={handleExitEditing} />
                                <ButtonIcon type="submit" icon={CheckIcon} variant="primary" handling={isUpdatingTasks} />
                            </div>
                        </form>
                    )
            }

        </Card>
    )
}