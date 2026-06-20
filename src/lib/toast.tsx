import { AccessibleToastContent } from '@/components/parts/AccessibleToastContent';
import { toastMessages } from '@/constants/toastMessages';
import { Id, toast } from 'react-toastify';

export const successToastify = (message = toastMessages.success.general) =>
  toast.success(
    <AccessibleToastContent type="success">{message}</AccessibleToastContent>,
    {
      autoClose: 6000,
      closeOnClick: true,
    }
  );

export const errorToastify = (message = toastMessages.error.general) =>
  toast.error(
    <AccessibleToastContent type="error">{message}</AccessibleToastContent>,
    {
      autoClose: false, // Do not automatically close
      closeOnClick: false,
    }
  );

export const infoToastify = (message: string) =>
  toast.info(
    <AccessibleToastContent type="info">{message}</AccessibleToastContent>,
    {
      autoClose: 6000,
      closeOnClick: true,
    }
  );

export const loadingToastify = () =>
  toast.loading(
    <AccessibleToastContent type="loading">
      Please wait...
    </AccessibleToastContent>,
    {
      autoClose: false,
    }
  );

export const updateToastify = (
  id: Id,
  type: 'success' | 'error',
  msg?: string
) => {
  const icon = type === 'success' ? '✅' : '❌';
  return toast.update(id, {
    render: (
      <AccessibleToastContent type={type}>
        <span aria-hidden="true" role="presentation">
          {icon}
        </span>{' '}
        {msg || toastMessages[type].general}
      </AccessibleToastContent>
    ),
    type,
    isLoading: false,
    autoClose: 4000,
    closeOnClick: true,
  });
};
