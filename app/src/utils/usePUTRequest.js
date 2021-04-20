import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export function usePUTRequest(PUT_URL) {
  // Global states
  const { user } = useContext(UserContext);

  // Hooks
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function hadleOnSubmit(bodyData) {
    // request body
    const formData = new FormData();
    formData.append('content', JSON.stringify({ textarea: bodyData.textarea, UserId: user.Id }));
    if (bodyData.picture && bodyData.picture.length > 0) {
      formData.append('image', bodyData.picture[0]);
    }

    setIsLoading(true);

    fetch(PUT_URL, {
      method: 'PUT',
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

  return { data, error, isLoading, hadleOnSubmit };
}
