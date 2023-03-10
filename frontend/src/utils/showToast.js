import { toast } from 'react-toastify';

export function showToast(text, type) {
  toast(text, {
    position: 'top-right',
    type: type,
  });
}
