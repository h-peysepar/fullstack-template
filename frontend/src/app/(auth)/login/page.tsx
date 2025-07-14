'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useMutation } from '@tanstack/react-query'
import { axios } from '@/api/axios'
// import axios from 'axios'

const loginSchema = z.object({
  phone: z.string().min(10, 'Phone is too short'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: LoginData) => axios.post('/api/auth/login', data),
    onError: (error: any) => {
      if (error.response?.data?.errors) {
        for (const [field, message] of Object.entries(error.response.data.errors)) {
          setError(field as keyof LoginData, {
            type: 'server',
            message: message as string,
          })
        }
      }
    },
    onSuccess: (data) => {
      // Redirect or show success
      console.log('Login successful', data)
    },
  })

  const onSubmit = (data: LoginData) => mutation.mutate(data)

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="space-y-4 pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register('phone')} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
