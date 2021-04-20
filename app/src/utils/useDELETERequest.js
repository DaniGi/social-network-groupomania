import { useState } from 'react';

export function useDELETERequest(DELETE_URL) {
  // Hooks
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleDelete(bodyData) {
    const userId = localStorage.getItem('userId');

    // request body
    const reqBody = bodyData.password
      ? {
          content: bodyData,
          UserId: userId,
        }
      : { UserId: userId };

    setIsLoading(true);

    fetch(DELETE_URL, {
      method: 'DELETE',
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

  return { data, error, isLoading, handleDelete };
}
