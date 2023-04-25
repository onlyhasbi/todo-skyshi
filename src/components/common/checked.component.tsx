import clsx from 'clsx'
import { useState } from 'react'
import { useChangeActive } from '../../hooks/todo.hooks'

type TProps = {
    id: number
    groupId: number
    active: number
    color: React.ReactElement
    label: string
}

function Checked(props: TProps) {
    const { groupId, id, active, color, label } = props
    const [isChecked, setIsChecked] = useState<boolean>(!Boolean(active))
    const { mutate: changeActive } = useChangeActive(groupId)

    const handleChangeActive = () => {
        setIsChecked(!isChecked)
        changeActive({ id, active: Number(isChecked) })
    }

    return (
        <>
            <input
                checked={isChecked}
                onChange={handleChangeActive}
                className={clsx([
                    'bg-white w-[1.5rem] h-[1.5rem] border-[#C7C7C7]',
                    'checked:bg-primary hover:checked:bg-primary focus:checked:bg-primary',
                    'focus:ring-0 checked:border-transparent appearance-none',
                ])}
                type="checkbox"
                data-cy="todo-item-checkbox"
            />
            <span
                data-cy="todo-item-priority-indicator"
                className="ml-[1.375rem] mr-4"
            >
                {color}
            </span>
            <span
                className={`${isChecked ? 'line-through' : ''}`}
                data-cy="todo-item-title"
            >
                {label}
            </span>
        </>
    )
}

export default Checked
