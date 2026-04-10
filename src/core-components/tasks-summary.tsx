import Badge from "../components/badge"
import Text from "../components/text"
import useTasks from "../hooks/use-tasks";

export default function TasksSummary(){
    const {tasksCount, concludedTaskCount, isLoadingTask} = useTasks();
    return (
        <>
            <div className="flex items-center gap-2">
                <Text variant="body-sm-bold" className="text-gray-300!">Tarefas criadas.</Text>
                <Badge variant="secondary" loading={isLoadingTask}>
                    {tasksCount}
                </Badge>
            </div>

            <div className="flex items-center gap-2">
                <Text variant="body-sm-bold" className="text-gray-300!">Tarefas concluídas.</Text>
                <Badge variant="primary" loading={isLoadingTask}>
                    {concludedTaskCount} de {tasksCount}
                </Badge>
            </div>
        </>
    )
}