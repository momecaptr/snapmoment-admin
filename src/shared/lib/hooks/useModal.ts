"use client"
// import { selectIsOpen, selectModalKey } from '@/myApp/model/appSelectors';
// import { toggleModal } from '@/myApp/model/appSlice';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import {appSliceSelectors, toggleModal} from "@/myApp/store/appSlice/appSlice";

export enum ModalKey {
  ChangePhoto = 'ChangePhoto',
  CloseEditPost = 'CloseEditPost',
  CreatePost = 'CreatePost',
  CreatePostOnBlur = 'CreatePostOnBlur',
  DeletePost = 'DeletePost',
  DeleteUser = 'DeleteUser',
  BanUser = 'BanUser',
  UnBanUser = 'UnBanUser',
  PaymentModals = 'PaymentModals',
  PaymentProceed = 'PaymentProceed',
  Success = 'Success',
  ViewLikes = 'ViewLikes',
  ViewPhoto = 'ViewPhoto'
}

export const useModal = (modalKey: ModalKey) => {
  const selectIsOpen = useAppSelector(appSliceSelectors.selectIsOpen);
  const selectModalKey = useAppSelector(appSliceSelectors.selectModalKey);
  // const isOpenModal = useAppSelector(selectIsOpen);
  // const contextModalKey = useAppSelector(selectModalKey);
  const dispatch = useAppDispatch();

  const setOpen = (open: boolean) => {
    dispatch(toggleModal({ key: modalKey, open }));
  };

  const isOpen = selectIsOpen && !!selectModalKey.find((key) => modalKey === key);

  return {
    contextModalKey: selectModalKey,
    isOpen,
    setOpen
  };
};
