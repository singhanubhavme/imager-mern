import { toast } from 'react-toastify';

export const showToast = (text, type) => {
  toast(text, {
    position: 'top-right',
    type: type,
  });
};
