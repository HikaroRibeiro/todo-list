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

interface TaskItemProps {
    task: Task
}

export default function TaskItem({task}: TaskItemProps){
    const[isEditing, setIsEditing] = React.useState(task?.state === TaskState.Creating);

    const [taskTitle, setTaskTitle] = React.useState(task.title ||"");
    const {updateTask} = useTask();

    function handleEditing(){
        setIsEditing(true)
    }

    function handleExitEditing(){
        setIsEditing(false)
    }

    function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.target.value || "")
    }

    function handleSaveTask(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        updateTask(task.id, {title: taskTitle});
        setIsEditing(false);
    }

    return (
        <Card size="md">
            {!isEditing ? (
                <div className="flex items-center gap-4">
                    <>
                        <InputCheckbox value={task?.concluded?.toString()} checked={task?.concluded} />
                        <Text className={cx("flex-1",{'line-through': task?.concluded})}>{task?.title}</Text>
                        <div className="flex gap-1">
                            <ButtonIcon icon={TrashIcon} variant="tertiary" />
                            <ButtonIcon icon={PencilIcon} variant="tertiary" onClick={handleEditing}/>
                        </div>

                    </>
                </div>
                    ) : (
                        <form onSubmit={handleSaveTask} className="flex items-center gap-4">
                            <InputText value={taskTitle} className="flex-1" onChange={handleChangeTaskTitle} required autoFocus />
                            <div>
                                <ButtonIcon type="button" icon={XIcon} variant="secondary" onClick={handleExitEditing} />
                                <ButtonIcon type="submit" icon={CheckIcon} variant="primary" />
                            </div>
                        </form>
                    )
            }

        </Card>
    )
}