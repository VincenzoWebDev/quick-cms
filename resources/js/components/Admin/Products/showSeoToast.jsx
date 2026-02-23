import axios from 'axios';
import { toast } from 'react-toastify';

export default function showSeoToast(productId) {
  // Mostra subito “SEO in generazione…”
  const toastId = toast.info('SEO in generazione…', { autoClose: false });

  const checkStatus = async () => {
    try {
      const res = await axios.get(`/api/products/${productId}/seo-status`);
      if (res.data.status === 'completed') {
        toast.update(toastId, {
          render: 'SEO completata!',
          type: 'success',
          autoClose: 3000,
        });
      } else if (res.data.status === 'error') {
        toast.update(toastId, {
          render: 'Errore nella generazione SEO',
          type: 'error',
          autoClose: 3000,
        });
      } else {
        setTimeout(checkStatus, 3000);
      }
    } catch (err) {
      toast.update(toastId, {
        render: 'Errore nella generazione SEO',
        type: 'error',
        autoClose: 3000,
      });
    }
  };

  checkStatus();
}
