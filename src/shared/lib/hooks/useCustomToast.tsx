import { useCallback } from 'react';

import { CustomToast } from '@/shared/ui';
import { toast } from 'sonner';

export const useCustomToast = () => {
  const showToast = useCallback(({ message, type }: { message: string; type: 'error' | 'loading' | 'success' }) => {
    const toastId = toast.custom(
      (
        close: any // Передаем close в CustomToast
      ) => (
        <CustomToast message={message} type={type} /> // Привязываем обработчик закрытия
      )
    );

    return toastId;
  }, []);

  const showPromiseToast = useCallback(
    (
      promise: (() => Promise<unknown>) | Promise<unknown>,
      messages: { error: string; loading: string; success: string }
    ) => {
      toast.promise(promise, {
        error: <CustomToast message={messages.error} type={'error'} />,
        loading: <CustomToast message={messages.loading} type={'loading'} />,
        success: <CustomToast message={messages.success} type={'success'} />
      });
    },
    []
  );

  return { showPromiseToast, showToast };
};
