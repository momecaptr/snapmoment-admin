"use client"
import s from './UnbanUserModal.module.scss';
import {Button, Modal, Typography} from "@momecap/ui-kit-snapmoment";
import {useCustomToast, useQueryParams} from "@/shared/lib";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";
import {useUnBanUserMutation} from "@/graphql/mutations/unBanUser.generated";
import {Post} from "@/graphql/types";
import {GET_ONE_USER} from "@/graphql/queries/userData/getOneUserData";

type Props = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  pickedUserIdAndName: {userId: number | undefined; userName: string | undefined}
};
export const UnbanUserModal = (props: Props) => {
  const { isOpen, setOpen, pickedUserIdAndName } = props;
  const accessKey = useGetAccessKeyFromStorage()

  const { showToast } = useCustomToast()

  // Unban User
  const [unBanUser, {loading: unBanUserLoading, error: unBanUserError}] = useUnBanUserMutation()

  const unbanUserHandler = async () => {
    await unBanUser(
      {
        context: {base64UsernamePassword: accessKey},
        variables: {userId : pickedUserIdAndName.userId!},
        // ОБНОВЛЯЕМ ДАННЫЕ ЭТОГО ПОЛЬЗОВАТЕЛЯ, ЧТОБЫ УВИДИТЬ ИЗМЕНЕНИЯ БЕЗ ОБНОЛВЕНИЯ СТРАНИЦЫ
        refetchQueries: [
          {
            context: { base64UsernamePassword: accessKey },
            query: GET_ONE_USER,
            variables: {
              userId: pickedUserIdAndName.userId,
            },
          },
        ],
      }
    )
  }

  const yesHandler = async() => {
    // deleteUser();
    try {
      await unbanUserHandler();
      showToast({message: 'User unbanned', type: 'success' })
      setOpen(false);
    } catch(e) {
      showToast({message: `Something bad happened, ${e}, ${unBanUserError}}. Try again later`, type: 'error' })
    }
  };
  const noHandler = () => {
    setOpen(false);
  };

  return (
    <Modal className={s.card} onOpenChange={() => setOpen(false)} open={isOpen} title={'Unban user'}>
      {unBanUserLoading ? <p>...Loading</p> :
        (
          <>
            <div className={s.text}>
              <Typography variant={'regular_text_16'}>Are you sure you want to unban user {pickedUserIdAndName.userName}?</Typography>
            </div>
            <div className={s.buttonsWrapper}>
              <Button onClick={noHandler} variant={'outlined'}>
                <Typography variant={'h3'}>No</Typography>
              </Button>
              <Button onClick={yesHandler} >
                <Typography variant={'h3'}>
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
