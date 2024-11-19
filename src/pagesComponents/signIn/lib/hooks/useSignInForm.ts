import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCustomToast } from '@/shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import {useRouter} from "next/navigation";
import {useLoginAdminMutation} from "@/graphql/queries/loginAdmin.generated";
import {signInAdminSchema, SignInAdminSchemaType} from "@/shared/schemas/authSchema/authShema";

export const useSignInForm = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm<SignInAdminSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(signInAdminSchema)
  });

  const router = useRouter()
  const [login, { error, loading }] = useLoginAdminMutation();
  const { showToast } = useCustomToast(); // TODO: Поменять на другое??? Не работает
  let temp: string;

  const onSubmit = async (data: SignInAdminSchemaType) => {
    // REFETCH QUERIES НАДО??? -- позволяет выполнить другие запросы сразу после выполнения этого запроса; также позволяет создать параметры для context-а -- а мы помним, что нужно указывать authorization
    await login(
      {
        variables: {
          email: data.email, password: data.password
        },
        onCompleted: (res) => {
          if(res.loginAdmin.logged === true) {
            temp = btoa(`${data.email}:${data.password}`)
            localStorage.setItem('accessKey', temp)
            showToast({message: 'Login success', type: 'success' })
            router.push('/users-list')
          } else {
            showToast({message: 'Wrong password or username', type: 'error' })
          }
        },
        onError: (e) => {
          console.log(e)
          showToast({message: `Something bad happened, ${e}, ${error}}. Try again later`, type: 'error' })
        },
        context: {base64UsernamePassword: temp},
      })
  };

  return {
    control,
    handleSubmit,
    isLoading: loading,
    isValid,
    onSubmit
  };
};
