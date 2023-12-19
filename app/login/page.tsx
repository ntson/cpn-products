'use client';

import { User } from '@/app/models/user';
import { login } from '@/app/services/users/login';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function LoginRoute() {
  const form = useForm<Pick<User, 'username' | 'password'>>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Required'),
      password: isNotEmpty('Required'),
    },
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      localStorage.setItem('authToken', data.token);
      await queryClient.refetchQueries({ queryKey: ['currentUser'] });
      router.push('/');
    },
  });

  const handleSubmit = (values: Pick<User, 'username' | 'password'>) => {
    loginMutation.mutate(values);
  };

  return (
    <Flex
      mih="90vh"
      justify="center"
      align="center"
      direction="column"
      gap="md"
    >
      <Text fw={600} fz="xl">
        Login
      </Text>

      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{
          width: '95%',
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <TextInput
          withAsterisk
          label="Username"
          placeholder="Username"
          {...form.getInputProps('username')}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />

        <Button type="submit" loading={loginMutation.isPending}>
          Login
        </Button>
      </form>
    </Flex>
  );
}
