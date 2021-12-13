let authenticated = JSON.parse(localStorage.getItem('authenticated')) || null,
    route = window.history.state,
    modal = {type: ''},
    users = JSON.parse(localStorage.getItem('users')) || [];

const navigateTo = path => {
  window.history.pushState(null, null, path);
  openModal({type: ''});

  const routeNav = new CustomEvent('route-navigation', {
    detail: {
      path
    },
    bubbles: true
  });

  localStorage.setItem('route', JSON.stringify(path));

  window.dispatchEvent(routeNav);
}

const authenticate = data => {
  authenticated = data;
  const authSuc = new CustomEvent('authentication-success', {
    detail: {
      authenticated
    },
    bubbles: true
  });

  localStorage.setItem('authenticated', JSON.stringify(authenticated));

  window.dispatchEvent(authSuc);
}

const openModal = ({type, id, email, first_name, last_name, 
  avatar, name, job}) => {

  modal = { type, id, email, first_name, 
  last_name, avatar, name, job }

  const openModal = new CustomEvent('opened-modal', {
    detail: {
      modal
    },
    bubbles: true
  });

  window.dispatchEvent(openModal);
}

const saveUsers = data => {
  users = [...data];
  const usersRes = new CustomEvent('users-success', {
    detail: {
      users
    },
    bubbles: true
  });

  localStorage.setItem('users', JSON.stringify(users));

  window.dispatchEvent(usersRes);
}

const updateUsers = entity => {
  users = [...users.map(usr => {
    return (usr.id === entity.id) ?
      {...usr, ...entity} : usr
  })];

  saveUsers(users);
}

const removeUsers = id => {
  users = [...users.filter(usr => usr.id !== id)];

  saveUsers(users);
}

const addUsers = created => {
  saveUsers([...users, created]);
}

export { 
  authenticated, route, modal, users, 
  authenticate, navigateTo, openModal , saveUsers, updateUsers, 
  removeUsers, addUsers
};