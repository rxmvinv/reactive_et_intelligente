import { authenticate, 
  saveUsers, updateUsers, removeUsers, addUsers } from './state-management';
import {
  postOptions,
  putOptions,
  deleteOptions
} from './api-options';

const api = 'https://reqres.in/api';

const dataFetch = async (url, options) => {
  const response = await fetch(url, options || {});
  const extracted = await response.json();
  console.log(extracted);

  return extracted;
}

const signIn = credentials => {
  dataFetch(`${api}/login`, postOptions({
    ...credentials
  })).then(res => {
    authenticate(res);
  }).catch(e => console.log(e))
}

const getUsers = () => {
  dataFetch(`${api}/users`).then(res => {
    saveUsers(res?.data);
  }).catch(e => console.log(e));
}

const createUser = user => {
  dataFetch(`${api}/users`, postOptions({
    ...user
  })).then(res => {
    addUsers(res)
  }).catch(e => console.log(e))
}

const editUser = user => {
  dataFetch(`${api}/users/${user.id}`,
    putOptions(user)
  ).then(updatedUser => {
    updateUsers({
      ...updatedUser,
      id: user.id
    })
  }).catch(e => console.log(e))
}

const removeUser = id => {
  fetch(
    `${api}/users/${id}`, deleteOptions()
  ).then(() => {
    removeUsers(id);
  }).catch(e => console.log(e))
}

export {
  signIn,
  getUsers,
  createUser,
  editUser,
  removeUser
}