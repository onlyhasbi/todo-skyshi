import plus from '../../../assets/plus.svg'
import { usePostActivity } from '../../../hooks/activity.hooks'
import Button from '../../common/button.component'
import Wrapper from '../../layout/wrapper.component'
import { lazy } from 'react'
const ListActivity = lazy(() => import('./list-activity.component'))

function MainActivity() {
    const { mutate: addActivity } = usePostActivity()
    const handleAddActivity = () => {
        addActivity({
            title: 'New Activity',
            email: 'onlyhasbi@gmail.com',
            _comment:
                'email digunakan untuk membedakan list data yang digunakan antar aplikasi',
        })
    }

    return (
        <Wrapper>
            <section className="flex justify-between py-[3.063rem]">
                <span
                    className="text-4xl font-bold text-generalblack"
                    data-cy="activity-title"
                >
                    Activity
                </span>
                <Button
                    className="bg-primary"
                    data-cy="activity-add-button"
                    icon={plus}
                    onClick={handleAddActivity}
                >
                    Tambah
                </Button>
            </section>
            <ListActivity />
        </Wrapper>
    )
}

export default MainActivity
