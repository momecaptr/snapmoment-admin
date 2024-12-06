"use client"
import s from './UnbanUserModal.module.scss';
import {Button, Modal, Typography} from "@momecap/ui-kit-snapmoment";
import {useCustomToast, useQueryParams} from "@/shared/lib";
import {GET_ALL_USERS} from "@/graphql/queries/userData/getAllUsersData";
import {useGetAccessKeyFromStorage} from "@/shared/lib/hooks/useGetAccessKeyFromStorage";
import {useUnBanUserMutation} from "@/graphql/mutations/unBanUser.generated";
import {Post} from "@/graphql/types";

type Props = {
  post: Post,
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};
export const UnbanUserModal = (props: Props) => {
  const { isOpen, setOpen, post } = props;
  const accessKey = useGetAccessKeyFromStorage()

  const { showToast } = useCustomToast()
  const { pageSize, pageNumber, newSortDirection, newSortBy, banFilter, searchTerm } = useQueryParams()

  // Unban User
  const [unBanUser, {loading: unBanUserLoading, error: unBanUserError}] = useUnBanUserMutation()

  const unbanUserHandler = async () => {
    await unBanUser(
      {
        variables: {userId : post.postOwner.id},
        context: {base64UsernamePassword: accessKey},
        refetchQueries: [{
          context: { base64UsernamePassword: accessKey },
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
              <Typography variant={'regular_text_16'}>Are you sure you want to unban user {post.postOwner?.userName ?? '' }?</Typography>
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
