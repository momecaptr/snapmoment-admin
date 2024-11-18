"use client"

import { useSignInForm } from '../lib/hooks/useSignInForm';

import s from './SignIn.module.scss';
import {Button, Card, FormTextfield, Typography} from "@momecap/ui-kit-snapmoment";

export const SignIn = () => {
  const { control, handleSubmit, isLoading, isValid, onSubmit } = useSignInForm();

  if (isLoading) {
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
