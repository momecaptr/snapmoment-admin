"use client"
import s from './BanUserModal.module.scss';
import {Button, Modal, SelectUI, Typography} from "@momecap/ui-kit-snapmoment";
import {selectOptionsForBanFilter, selectOptionsForBanUserAction, useCustomToast, useQueryParams} from "@/shared/lib";
import {GET_ALL_USERS} from "@/graphql/queries/userData/getAllUsersData";
import {useBanUserMutation} from "@/graphql/mutations/banUser.generated";
import * as React from "react";
import {useEffect, useState} from "react";
import {clsx} from "clsx";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";
import {GET_ALL_POSTS} from "@/graphql/queries/posts/getAllPosts";
import {GET_ONE_USER} from "@/graphql/queries/userData/getOneUserData";

type Props = {
  userId: number|undefined;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  pickedUserName: string | null | undefined
};
export const BanUserModal = (props: Props) => {
  const { userId, isOpen, setOpen, pickedUserName } = props;
  const accessKey = useGetAccessKeyFromStorage()

  const { showToast } = useCustomToast()
  const initialValueForBanReason = 'Reason for ban'
  const [banReason, setBanReason] = useState(initialValueForBanReason)

  // Ban User
  const [banUser, {loading: banUserLoading, error: banUserError}] = useBanUserMutation()

  const banUserHandler = async () => {
    await banUser({
      context: { base64UsernamePassword: accessKey },
      variables: {
        banReason: banReason,
        userId: userId ?? 0
      },
      // ОБНОВЛЯЕМ ДАННЫЕ ЭТОГО ПОЛЬЗОВАТЕЛЯ, ЧТОБЫ УВИДИТЬ ИЗМЕНЕНИЯ БЕЗ ОБНОЛВЕНИЯ СТРАНИЦЫ
      refetchQueries: [
        {
          context: { base64UsernamePassword: accessKey },
          query: GET_ONE_USER,
          variables: {
            userId: userId ?? 0,
          },
        },
      ],
    })
  }

  const yesHandler = async() => {
    try {
      await banUserHandler();
      showToast({message: 'User banned', type: 'success' })
      setOpen(false);
    } catch(e) {
      showToast({message: `Something bad happened, ${e}, ${banUserError}}. Try again later`, type: 'error' })
    }
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Modal className={s.card} onOpenChange={closeHandler} open={isOpen} title={'Ban user'}>
      {banUserLoading ? <p>...Loading</p> :
        (
          <>
            <div className={s.text}>
              <Typography variant={'regular_text_16'}>Are you sure you want to ban user {pickedUserName}?</Typography>
            </div>
            <div className={s.select}>
              <SelectUI selectOptions={selectOptionsForBanUserAction} className={s.selector} value={banReason} onValueChange={setBanReason} initialValue={initialValueForBanReason} />
            </div>
            <div className={s.buttonsWrapper}>
              <Button onClick={closeHandler}>
                <Typography variant={'h3'}>No</Typography>
              </Button>
              <Button
                onClick={yesHandler}
                variant={'outlined'}
                disabled={banReason === initialValueForBanReason}
                className={clsx(s.btn, banReason === initialValueForBanReason && s.disabled)}
              >
                <Typography className={clsx(s.yes, banReason === initialValueForBanReason && s.disabled)} variant={'h3'}>
                  Yes
                </Typography>
              </Button>
            </div>
          </>
        )
      }
    </Modal>
  );
};
