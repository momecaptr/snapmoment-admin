"use client"

import NotFound from '@/../app/not-found';
import { useSignInForm } from '../lib/hooks/useSignInForm';
import Link from 'next/link';

import s from './SignIn.module.scss';
import {Button, Card, FormTextfield, Typography} from "@momecap/ui-kit-snapmoment";
import {useForm} from "react-hook-form";
import {signInSchema, SignInSchemaType} from "@/shared/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useLoginAdminMutation} from "@/graphql/queries/loginAdmin.generated";
import {useCustomToast} from "@/shared/lib";

export const SignIn = () => {
  // const { control, handleSubmit, isLoading, isValid, onSubmit } = useSignInForm();

  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignInSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema)
  });

  const router = useRouter()
  const [login, { error, loading }] = useLoginAdminMutation();
  // const { showToast } = useCustomToast(); // TODO: Поменять на другое??? Не работает
  // showToast({message: 'ЗДАРОВА АТЕЦ', type: 'success'});

  const onSubmit = async (data: SignInSchemaType) => {
    // REFETCH QUERIES НАДО??? -- позволяет выполнить другие запросы сразу после выполнения этого запроса; также позволяет создать параметры для context-а -- а мы помним, что нужно указывать authorization
    const res = await login(
      {
        variables: {
          email: data.email, password: data.password
        },
        onCompleted: (res) => {
          // СЮДА ТО Я ПОПАДАЮ, ЗНАЧИТ ЗАПРОС РАЗРЕШАЕТСЯ УСПЕШНО. Но почему Logged = false?
          console.log('УСПЕХ')
          console.log({oncomplete: res})
        },
        onError: (e) => {
          console.log(e)
          console.log('КОСЯК, БРАТ')
        },
        // refetchQueries: [
        //   {
        //     context: {base64UsernamePassword: btoa(`${data.email}:${data.password}`)},
        //     query: 'GET USERS'
        //   }
        // ]
      })
  };

  // if (isLoading) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={s.card}>
          <Typography as={'h1'} className={s.title} variant={'h1'}>
            Sign in
          </Typography>
          <div className={s.box_Input}>
            <FormTextfield className={s.input} control={control} label={'Email'} name={'email'} type={'email'} />
            <FormTextfield
              className={s.input}
              control={control}
              label={'Password'}
              name={'password'}
              type={'password'}
            />
          </div>
          <Button className={s.button} disabled={!isValid} type={'submit'} fullWidth>
            Sign In
          </Button>
        </Card>
      </form>
    </div>
  );
};
