import Text from "./components/text"
import Icon from "./components/icon"
import TrashIcon from "./assets/icons/trash.svg?react"
import CheckIcon from "./assets/icons/check.svg?react"
import PlusIcon from "./assets/icons/plus.svg?react"
import PencilIcon from "./assets/icons/pencil.svg?react"
import SpinnerIcon from "./assets/icons/spinner.svg?react"
import XIcon from "./assets/icons/x.svg?react"
import Badge from "./components/badge"
import Button from "./components/button"
import ButtonIcon from "./components/button-icon"
import InputCheckbox from "./components/input-checkbox"
import InputText from "./components/input-text"
import Card from "./components/card"
import Skeleton from "./components/skeleton"

function App() {
  
  return (
    <div className="grid gap-3">
      <div className="flex flex-col gap-1">
        <Text variant="body-md">Item 1</Text>
        <Text variant="body-md-bold"className="text-pink-base">Item 2</Text>
        <Text variant="body-sm-bold" className="text-pink-dark">Item 3</Text>
        <Text className="text-green-dark">Item para meu texto.</Text>
      </div>

      <div className="flex gap-1">
          <Icon svg={TrashIcon} className="fill-green-base"></Icon>
          <Icon svg={CheckIcon} />
          <Icon svg={PlusIcon} />
          <Icon svg={PencilIcon} />
          <Icon svg={SpinnerIcon} animate />
          <Icon svg={XIcon} />
      </div>

      <div className="flex gap-1">
        <Badge variant="secondary"> 5 </Badge>
        <Badge variant="primary">2 de 5</Badge>
        <Badge loading></Badge>
      </div>

      <div>
        <Button icon={PlusIcon} disabled> Nova Tarefa

        </Button>
      </div>

      <div className="flex gap-1">
        <ButtonIcon icon={TrashIcon} variant="primary" />
        <ButtonIcon icon={TrashIcon} variant="secondary" />
        <ButtonIcon icon={TrashIcon} variant="tertiary" />
        <ButtonIcon icon={TrashIcon} loading />
      </div>

      <div>
        <InputText />
      </div>

      <div>
        <InputCheckbox />
        <InputCheckbox loading/>
      </div>

      <div>
        <Card size={"md"}>Olá mundo!</Card>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5"/>
        <Skeleton className="h-5"/>
        <Skeleton className="h-5 w-96"/>

      </div>
    </div>

  )
}

export default App
