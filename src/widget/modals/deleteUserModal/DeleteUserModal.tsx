"use client"
import s from './DeleteUserModal.module.scss';
import {Button, Modal, Typography} from "@momecap/ui-kit-snapmoment";
import {clsx} from "clsx";

type Props = {
  deleteUser: (id: number) => void;
  userId: any;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};
export const DeleteUserModal = (props: Props) => {
  const { deleteUser, userId, isOpen, setOpen } = props;

  const yesHandler = () => {
    // deleteUser();
    setOpen(false);
  };
  const noHandler = () => {
    setOpen(false);
  };

  return (
    <Modal className={clsx(s.card)} onOpenChange={() => setOpen(false)} open={isOpen} title={'Delete Post'}>
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
    </Modal>
  );
};
