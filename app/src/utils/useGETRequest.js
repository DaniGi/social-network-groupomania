import { useState, useEffect } from 'react';

export function useGETRequest(GET_URL) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    fetch(GET_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
          setError(err);
        }
      });
    return () => {
      abortController.abort();
    };
  }, [GET_URL]);

  return { data, error, isLoading };
}
