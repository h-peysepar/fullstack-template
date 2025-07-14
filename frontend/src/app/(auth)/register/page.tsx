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

const signupSchema = z
  .object({
    phone: z.string().min(10, 'Phone is too short'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignupData = z.infer<typeof signupSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: SignupData) =>
      axios.post('/api/auth/register', {
        phone: data.phone,
        password: data.password,
      }),
    onError: (error: any) => {
      if (error.response?.data?.errors) {
        for (const [field, message] of Object.entries(error.response.data.errors)) {
          setError(field as keyof SignupData, {
            type: 'server',
            message: message as string,
          })
        }
      }
    },
    onSuccess: (data) => {
      console.log('Signup success', data)
    },
  })

  const onSubmit = (data: SignupData) => mutation.mutate(data)

  return (
    <Card className="w-full max-w-sm mx-auto mt-10">
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
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
