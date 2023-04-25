import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTodoStore } from '../store/todo'
import http from '../service'

const endpoint = '/todo-items'

export function useGetTodo(id: number) {
    return useQuery({
        queryKey: [id],
        queryFn: () => {
            return http
                .get(`/activity-groups/${id}`)
                .then(({ data }) => data.todo_items)
        },
    })
}

export function usePostTodo(todoId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: TPostTodo) => {
            return http.post(endpoint, data).then(({ data }) => data)
        },
        onMutate: async (variables) => {
            const id = Date.now()
            await queryClient.cancelQueries([todoId])
            const prevTodo = queryClient.getQueryData([todoId]) as TTodo[]
            const newTodo = { ...variables, id, is_active: 1 }
            queryClient.setQueryData([todoId], [newTodo, ...prevTodo])
            return {
                id,
                rollback: () => queryClient.setQueryData([todoId], prevTodo),
            }
        },
        onSuccess: (response, variables, context) => {
            const id = context?.id
            const todos = queryClient.getQueryData([todoId]) as TTodo[]
            queryClient.setQueryData(
                [todoId],
                todos.map((todo) => {
                    if (todo.id === id) {
                        todo = response
                    }
                    return todo
                })
            )
        },
        onError: (err, variables, context) => {
            if (context) {
                context.rollback()
            }
        },
    })
}

export function useDeleteTodo(todoId: string, onClose: () => void) {
    const queryClient = useQueryClient()
    const setIsDeletedSuccess = useTodoStore(
        (state) => state.setIsDeletedSuccess
    )

    const id = parseInt(todoId)

    return useMutation({
        mutationFn: (id: number) => {
            return http.delete(`${endpoint}/${id}`)
        },
        onMutate: async (variables) => {
            await queryClient.cancelQueries([id])
            const prevTodo: TTodo[] = queryClient.getQueryData([id]) || []
            const deletedTodo = prevTodo?.filter(
                (todo) => todo.id !== variables
            )
            queryClient.setQueryData([id], deletedTodo)
            return () => queryClient.setQueryData([id], prevTodo)
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

export function useUpdateTodo({
    todoId,
    onClose,
}: {
    todoId: number
    onClose: () => void
}) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, todo, priority }: TUpdateTodo) => {
            return http.patch(`${endpoint}/${id}`, { title: todo, priority })
        },
        onMutate: async (variables) => {
            await queryClient.cancelQueries([todoId])
            const prevTodo: TTodo[] = queryClient.getQueryData([todoId]) || []
            const updated = prevTodo?.map((todo) => {
                if (todo.id === variables.id) {
                    todo = {
                        ...todo,
                        title: variables.todo,
                        priority: variables.priority,
                    }
                }
                return todo
            })
            queryClient.setQueryData([todoId], updated)
            return () => queryClient.setQueryData([todoId], prevTodo)
        },
        onError: (err, variables, rollback) => {
            if (rollback) {
                rollback()
            }
        },
        onSuccess: () => {
            onClose()
        },
    })
}

export function useChangeActive(todoId: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, active }: TChangeActive) => {
            return http.patch(`${endpoint}/${id}`, { is_active: active })
        },
        onMutate: async (variables) => {
            await queryClient.cancelQueries([todoId])
            const prevTodo: TTodo[] = queryClient.getQueryData([todoId]) || []
            const updatedTodo = prevTodo?.map((todo) => {
                if (todo.id === variables.id) {
                    todo = {
                        ...todo,
                        is_active: variables.active,
                    }
                }
                return todo
            })
            queryClient.setQueryData([todoId], updatedTodo)
            return () => queryClient.setQueryData([todoId], prevTodo)
        },
        onError: (err, variables, rollback) => {
            if (rollback) {
                rollback()
            }
        },
    })
}
