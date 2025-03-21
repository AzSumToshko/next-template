import { toast } from 'react-hot-toast';

export const toastSuccess = (message: string) => toast.success(message);
export const toastError = (message: string) => toast.error(message);
export const toastLoading = (message: string) => toast.loading(message);
export const toastCustom = (message: string) => {
  toast(message, {
    icon: '💡',
  });
};

// For async operations
export const toastPromise = <T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string }
) =>
  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
