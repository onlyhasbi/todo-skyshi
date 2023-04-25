import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import http from '../service'
import dayjs from 'dayjs'
import { useTodoStore } from '../store/todo'

const ACTIVITY = ['activity']
const endpoint = '/activity-groups'

export function useGetAcitvity() {
    return useQuery({
        queryKey: ACTIVITY,
        queryFn: () => {
            return http
                .get(`${endpoint}/?email=onlyhasbi@gmail.com`)
                .then(({ data }) => data.data)
        },
    })
}

export function usePostActivity() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: TPostActivity) =>
            http.post(endpoint, data).then(({ data }) => data),
        onMutate: async (variables) => {
            const id = Date.now()
            await queryClient.cancelQueries(ACTIVITY)
            const prevActivity = queryClient.getQueryData(
                ACTIVITY
            ) as TActivity[]
            const newActivity = { ...variables, id }
            queryClient.setQueryData(ACTIVITY, [newActivity, ...prevActivity])
            return {
                id,
                rollback: () =>
                    queryClient.setQueryData(ACTIVITY, prevActivity),
            }
        },
        onError: (err, variables, context) => {
            if (context) {
                context.rollback()
            }
        },
        onSuccess: (response, variables, context) => {
            const id = context?.id
            const activities: TActivity[] =
                queryClient.getQueryData(ACTIVITY) || []
            const updated = activities.map((activity) => {
                if (activity.id === Number(id)) {
                    activity = response
                }
                return activity
            })
            queryClient.setQueryData(ACTIVITY, [...updated])
        },
    })
}

export function useDeleteActivity(onClose: () => void) {
    const setIsDeletedSuccess = useTodoStore(
        (state) => state.setIsDeletedSuccess
    )

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => http.delete(`${endpoint}/${id}`),
        onMutate: async (variables) => {
            await queryClient.cancelQueries(ACTIVITY)
            const prevActivity = queryClient.getQueryData(
                ACTIVITY
            ) as TActivity[]
            const deletedActivity = prevActivity.filter(
                (activity) => activity.id !== variables
            )
            queryClient.setQueryData(ACTIVITY, deletedActivity)
            return () => queryClient.setQueryData(ACTIVITY, prevActivity)
        },
        onError: (err, variables, rollback) => {
            if (rollback) {
                rollback()
            }
        },
        onSuccess: () => {
            onClose()
            setIsDeletedSuccess(true)
        },
    })
}

export function useGetDetailActivity(id: string) {
    return useQuery({
        queryKey: [`DetailActivity-${id}`],
        queryFn: () => http.get(`${endpoint}/${id}`).then(({ data }) => data),
        enabled: Boolean(id),
    })
}

export function useChangeTitle() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, title }: TChangeTitle) => {
            return http.patch(`${endpoint}/${id}`, { title })
        },
        onMutate: async (variables) => {
            await queryClient.cancelQueries(ACTIVITY)
            const prevActivity = queryClient.getQueryData(
                ACTIVITY
            ) as TActivity[]
            const updatedActivity = prevActivity.map((activity) => {
                if (activity.id === Number(variables.id)) {
                    return {
                        ...activity,
                        title: variables.title,
                    }
                }
                return activity
            })
            queryClient.setQueryData(ACTIVITY, updatedActivity)
            return () => queryClient.setQueryData(ACTIVITY, prevActivity)
        },
        onError: (err, variables, rollback) => {
            if (rollback) {
                rollback()
            }
        },
    })
}
