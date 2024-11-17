import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCustomToast } from '@/shared/lib';
import { SignInSchemaType, signInSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {useRouter} from "next/navigation";
import {useLoginAdminMutation} from "@/graphql/queries/loginAdmin.generated";

export const useSignInForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignInSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema)
  });

  const router = useRouter()
  // const [loading, setLoading] = useState(false);
  const [login, { error, loading }] = useLoginAdminMutation();
  const { showToast } = useCustomToast();

  const onSubmit = async (data: SignInSchemaType) => {
    // try {
      // REFETCH QUERIES НАДО??? -- позволяет выполнить другие запросы сразу после выполнения этого запроса; также позволяет создать параметры для context-а -- а мы помним, что нужно указывать authorization
      const res = await login(
        {
          variables: {
            email: data.email, password: data.password
          },
          onCompleted: (res) => {
            // СЮДА ТО Я ПОПАДАЮ, ЗНАЧИТ ЗАПРОС РАЗРЕШАЕТСЯ УСПЕШНО. Но почему Logged = false?
            console.log({oncomplete: res})
            showToast({ message: 'Success login', type: 'success' });
          },
          onError: (e) => {
            console.log(e)
            showToast({ message: `Error during login or fetching user data, ${error}}`, type: 'error' });
          },
          // refetchQueries: [
          //   {
          //     context: {base64UsernamePassword: btoa(`${data.email}:${data.password}`)},
          //     query: 'GET USERS'
          //   }
          // ]
        })
    //   if(res.data?.loginAdmin.logged === true) {
    //     // СОХРАНЯТЬ В LOCALSTORAGE email и password НАДО???
    //     void router.push('/users-list')
    //     showToast({ message: 'Success login', type: 'success' });
    //   } else {
    //     console.log('response got but logged = false')
    //     console.log(res)
    //   }
    // } catch (e) {
    //   showToast({ message: `Error during login or fetching user data, ${error}}`, type: 'error' });
    // }
  };

  return {
    control,
    errors,
    handleSubmit,
    isLoading: loading,
    isValid,
    onSubmit
  };
};
