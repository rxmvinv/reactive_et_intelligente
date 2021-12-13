const postOptions = (data) => {
  return {
    method: 'POST', 
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }
}

const putOptions = (data) => {
  return {
    method: 'PUT',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }
}

const deleteOptions = () => {
  return {
    method: 'DELETE',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer'
  }
}

export {
  postOptions,
  putOptions,
  deleteOptions
}