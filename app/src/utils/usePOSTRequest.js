import { useState } from 'react';
import { useUser } from '../contexts/UserContext';

export function usePOSTRequest(POST_URL) {
  // Global states
  const { user } = useUser(useUser);

  // Hooks
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function hadleSubmit(bodyData) {
    // request body
    const reqBody = {
      content: bodyData,
      UserId: user.Id,
    };

    setIsLoading(true);

    fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(reqBody),
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
