import dayjs from 'dayjs'
import trash from '../../../assets/delete.svg'
import emptyState from '../../../assets/activity-empty-state.svg'
import EmptyActivity from '../../common/empty-activity.component'
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { useTodoStore } from '../../../store/todo'
import { useGetAcitvity } from '../../../hooks/activity.hooks'
import Card from '../../common/card.component'

function ListActivity() {
    const navigate = useNavigate()
    const setDeleteData = useTodoStore((state) => state.setDeleteData)

    const { data, isSuccess } = useGetAcitvity()
    const activities = data || []

    const handleDetailActivity = (id: number, title: string) => {
        navigate(`/detail/${id}`, { state: { title } })
    }

    if (isSuccess && activities.length === 0) {
        return <EmptyActivity src={emptyState} section="activity" />
    }

    if (isSuccess)
        return (
            <div className="flex gap-x-[1.25rem] gap-y-[1.625rem] flex-wrap pb-[17.063rem]">
                {activities.map((activity: TActivity) => {
                    const { id, title, created_at } = activity
                    return (
                        <Card
                            key={id}
                            className="flex flex-col justify-between py-[1.375rem] px-[1.688rem] hover:cursor-pointer"
                        >
                            <div
                                onClick={() => handleDetailActivity(id, title)}
                                className="h-full"
                                data-cy="activity-item"
                            >
                                <h3
                                    className="text-lg font-bold text-generalblack"
                                    data-cy="activity-item-title"
                                >
                                    {title}
                                </h3>
                            </div>
                            <div className="flex justify-between">
                                <span
                                    className="text-generalgray font-medium text-sm"
                                    data-cy="activity-item-date"
                                >
                                    {dayjs(created_at).format('D MMMM YYYY')}
                                </span>
                                <button
                                    onClick={() => {
                                        setDeleteData({
                                            groupId: '',
                                            id,
                                            title,
                                            section: 'activity',
                                        })
                                    }}
                                    data-cy="activity-item-delete-button"
                                >
                                    <img
                                        loading="lazy"
                                        className="block w-[16px] h-[18px] hover:cursor-pointer"
                                        src={trash}
                                        alt="delete-icon"
                                    />
                                </button>
                            </div>
                        </Card>
                    )
                })}
            </div>
        )

    return null
}

export default memo(ListActivity)
