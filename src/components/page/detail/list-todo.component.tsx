import Checked from '../../common/checked.component'
import clsx from 'clsx'
import trash from '../../../assets/delete.svg'
import pencil from '../../../assets/pencil.svg'
import emptyTodo from '../../../assets/todo-empty-state.svg'
import EmptyActivity from '../../common/empty-activity.component'
import DialogModal from '../../element/dialog.component'
import { memo, useMemo, useState } from 'react'
import { getValueTodo } from '../../../utils/getValueTodo.utils'
import { useParams } from 'react-router-dom'
import { useTodoStore } from '../../../store/todo'
import { getSort } from '../../../utils/sort.utils'
import { useGetTodo } from '../../../hooks/todo.hooks'

declare global {
    type TTodo = {
        id: number
        title: string
        activity_group_id: number
        is_active: number
        priority: string
    }
}

function ListTodo() {
    const { id: todoId } = useParams()
    const sort = useTodoStore((state) => state.sort)
    const setDeleteData = useTodoStore((state) => state.setDeleteData)

    const [updateData, setUpdateData] = useState<TUpdateData | boolean>(false)

    const { data, isSuccess } = useGetTodo(Number(todoId))
    const todos: TTodo[] = data || []

    const sortTodos = useMemo(() => {
        return getSort(sort, todos)
    }, [todos, sort])

    if (isSuccess && sortTodos.length === 0) {
        return <EmptyActivity src={emptyTodo} section="todo" />
    }

    if (isSuccess)
        return (
            <>
                <ul className="space-y-[0.625rem] pb-[14.875rem]">
                    {sortTodos.map(
                        ({
                            id,
                            title,
                            is_active,
                            activity_group_id,
                            priority,
                        }: TTodo) => {
                            return (
                                <li
                                    key={id}
                                    className={clsx([
                                        'flex items-center justify-between w-full h-[5rem]',
                                        'bg-white rounded-xl shadow-xl px-[1.75rem]',
                                    ])}
                                >
                                    <div className="flex items-center">
                                        <Checked
                                            groupId={activity_group_id}
                                            id={id}
                                            active={is_active}
                                            color={getValueTodo(
                                                'color',
                                                priority
                                            )}
                                            label={title}
                                        />
                                        <img
                                            loading="lazy"
                                            className="block cursor-pointer ml-[1.208rem]"
                                            onClick={() => {
                                                setUpdateData({
                                                    id,
                                                    todo: title,
                                                    priority,
                                                })
                                            }}
                                            src={pencil}
                                            alt="pencil-icon"
                                            data-cy="todo-item-edit-button"
                                        />
                                    </div>
                                    <img
                                        loading="lazy"
                                        className="block w-[16px] h-[18px] hover:cursor-pointer"
                                        src={trash}
                                        alt="delete-icon"
                                        onClick={() => {
                                            if (todoId) {
                                                setDeleteData({
                                                    groupId:
                                                        String(
                                                            activity_group_id
                                                        ),
                                                    id,
                                                    title,
                                                    section: 'list item',
                                                })
                                            }
                                        }}
                                        data-cy="todo-item-delete-button"
                                    />
                                </li>
                            )
                        }
                    )}
                </ul>
                <DialogModal
                    isOpen={Boolean(updateData)}
                    onClose={() => setUpdateData(false)}
                    initialValue={updateData as TUpdateData}
                />
            </>
        )

    return null
}

export default memo(ListTodo)
