export const GETRequest = (GET_URL) => {
  return fetch(GET_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => error);
};

export const POSTRequest = (POST_URL, data, isForm = false, UserId) => {
  let reqBody = {};
  if (isForm) {
    reqBody = new FormData();
    reqBody.append('content', JSON.stringify({ textarea: data.textarea, UserId }));
    reqBody.append('image', data.picture[0]);
  } else {
    reqBody = JSON.stringify({
      content: data,
      UserId,
    });
  }

  return fetch(POST_URL, {
    method: 'POST',
    body: reqBody,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const PUTRequest = (PUT_URL, data, UserId) => {
  const reqBody = new FormData();
  reqBody.append('content', JSON.stringify({ textarea: data.textarea, UserId }));
  if (data.picture && data.picture.length > 0) {
    reqBody.append('image', data.picture[0]);
  }
  return fetch(PUT_URL, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: reqBody,
  })
    .then((res) => res.json())
    .catch((error) => error);
};

export const DELETERequest = (DELETE_URL, body, UserId) => {
  const reqBody = body.password
    ? {
        content: body,
        UserId,
      }
    : { UserId };

  return fetch(DELETE_URL, {
    method: 'DELETE',
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => error);
};
