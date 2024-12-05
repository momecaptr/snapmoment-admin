"use client"
import s from './BanUserModal.module.scss';
import {Button, Modal, SelectUI, Typography} from "@momecap/ui-kit-snapmoment";
import {selectOptionsForBanFilter, selectOptionsForBanUserAction, useCustomToast, useQueryParams} from "@/shared/lib";
import {GET_ALL_USERS} from "@/graphql/queries/userData/getAllUsersData";
import {useBanUserMutation} from "@/graphql/mutations/banUser.generated";
import * as React from "react";
import {useState} from "react";
import {clsx} from "clsx";

type Props = {
  userId: number|undefined;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  pickedUserName: string | null | undefined
};
export const BanUserModal = (props: Props) => {
  const { userId, isOpen, setOpen, pickedUserName } = props;
  const { showToast } = useCustomToast()
  const { pageSize, pageNumber, newSortDirection, newSortBy, banFilter, searchTerm } = useQueryParams()
  const initialValueForBanReason = 'Reason for ban'
  const [banReason, setBanReason] = useState(initialValueForBanReason)
  console.log({userIdFromModal: userId})

  // Ban User
  const [banUser, {loading: banUserLoading, error: banUserError}] = useBanUserMutation()

  const banUserHandler = async () => {
    await banUser({
      variables: {
        banReason: banReason,
        userId: userId ?? 0
      },
      context: {
        base64UsernamePassword: localStorage.getItem('accessKey')
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
    try {
      await banUserHandler();
      showToast({message: 'User banned', type: 'success' })
      setOpen(false);
    } catch(e) {
      showToast({message: `Something bad happened, ${e}, ${banUserError}}. Try again later`, type: 'error' })
    } finally {
      setBanReason(initialValueForBanReason)
    }
  };
  const noHandler = () => {
    setBanReason(initialValueForBanReason)
    setOpen(false);
  };

  const modalHandler = () => {
    setBanReason(initialValueForBanReason)
    setOpen(false)
  }

  return (
    <Modal className={s.card} onOpenChange={modalHandler} open={isOpen} title={'Ban user'}>
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
              <Button onClick={noHandler}>
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
