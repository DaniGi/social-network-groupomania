export const GETRequest = (GET_URL) => {
  return (
    fetch(GET_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      // eslint-disable-next-line consistent-return
      .catch((error) => error)
  );
};

export const POSTRequest = (POST_URL, body) => {
  return (
    fetch(POST_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      // eslint-disable-next-line consistent-return
      .catch((error) => error)
  );
};

export const DELETERequest = (DELETE_URL, body) => {
  return (
    fetch(DELETE_URL, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      // eslint-disable-next-line consistent-return
      .catch((error) => error)
  );
};
