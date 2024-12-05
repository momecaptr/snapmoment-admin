"use client"
import s from './DeleteUserModal.module.scss';
import {Button, Modal, Typography} from "@momecap/ui-kit-snapmoment";
import {useRemoveUserMutation} from "@/graphql/mutations/removeUser.generated";
import {useCustomToast, useQueryParams} from "@/shared/lib";
import {GET_ALL_USERS} from "@/graphql/queries/userData/getAllUsersData";

type Props = {
  userId: number|undefined;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  pickedUserName: string | null | undefined
};
export const DeleteUserModal = (props: Props) => {
  const { userId, isOpen, setOpen, pickedUserName } = props;
  const { showToast } = useCustomToast()
  const { pageSize, pageNumber, newSortDirection, newSortBy, banFilter, searchTerm } = useQueryParams()

  // Remove User
  const [removeUser, { loading: isRemoveLoading, error: errorWhileRemove }] = useRemoveUserMutation()

  const removeUserHandler = async () => {
    await removeUser({
      context: { base64UsernamePassword: localStorage.getItem('accessKey') },
      variables: {
        userId: userId ?? 0
      },
      refetchQueries: [{
        context: { base64UsernamePassword: localStorage.getItem('accessKey') },
        query: GET_ALL_USERS,
        variables: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          sortBy: newSortBy,
          sortDirection: newSortDirection,
          searchTerm: searchTerm,
          statusFilter: banFilter
        }
      }]
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
    <Modal className={s.card} onOpenChange={() => setOpen(false)} open={isOpen} title={'Delete user'}>
      {isRemoveLoading ? <p>...Loading</p> :
        (
          <>
            <div className={s.text}>
              <Typography variant={'regular_text_16'}>Are you sure you want to delete user {pickedUserName}?</Typography>
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
