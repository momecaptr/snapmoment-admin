"use client"
import s from './DeleteUserModal.module.scss';
import {Button, Modal, Typography} from "@momecap/ui-kit-snapmoment";
import {useRemoveUserMutation} from "@/graphql/queries/removeUser.generated";
import {Loading} from "@/shared/ui";
import {useCustomToast} from "@/shared/lib";

type Props = {
  userId: number|undefined;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};
export const DeleteUserModal = (props: Props) => {
  const { userId, isOpen, setOpen } = props;
  const {showToast} = useCustomToast()

  // Remove User
  const [removeUser, { loading: isRemoveLoading, error: errorWhileRemove }] = useRemoveUserMutation()

  const removeUserHandler = async () => {
    await removeUser({
      variables: {
        userId: userId ?? 0
      },
      refetchQueries: ['GetUsersListTable']
    })
  }

  const yesHandler = async() => {
    // deleteUser();
    try {
      await removeUserHandler();
      showToast({message: 'User deleted', type: 'success' })
      setOpen(false);
    } catch(e) {
      showToast({message: `Something bad happened, ${e}, ${errorWhileRemove}}. Try again later`, type: 'error' })
    }
  };
  const noHandler = () => {
    setOpen(false);
  };

  return (
    <Modal className={s.card} onOpenChange={() => setOpen(false)} open={isOpen} title={'Delete Post'}>
      {isRemoveLoading ? <Loading/> :
        (
          <>
            <div className={s.text}>
              <Typography variant={'regular_text_16'}>Are you sure you want to delete this post?</Typography>
            </div>
            <div className={s.buttonsWrapper}>
              <Button onClick={yesHandler} variant={'outlined'}>
                <Typography className={s.yes} variant={'h3'}>
                  Yes
                </Typography>
              </Button>
              <Button onClick={noHandler}>
                <Typography variant={'h3'}>No</Typography>
              </Button>
            </div>
          </>
        )
      }
    </Modal>
  );
};
