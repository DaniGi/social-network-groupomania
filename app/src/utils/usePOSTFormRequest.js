import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export function usePOSTFormRequest(POST_URL) {
  // Global states
  const { user } = useContext(UserContext);

  // Hooks
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function hadleSubmit(bodyData) {
    // request body
    const formData = new FormData();
    formData.append('content', JSON.stringify({ textarea: bodyData.textarea, UserId: user.Id }));
    formData.append('image', bodyData.picture[0]);

    setIsLoading(true);

    fetch(POST_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }

  return { data, error, isLoading, hadleSubmit };
}
