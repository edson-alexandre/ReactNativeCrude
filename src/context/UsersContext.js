import React, { createContext, useReducer } from 'react';

import users from '../data/users';

const initialState = { users };
const UsersContext = createContext({});

const actions = {
  deleteUser(state, action) {
    return {
      ...state,
      users: state.users.filter(user => user.id !== action.payload.id),
    };
  },
  createUser(state, action) {
    const user = action.payload;
    user.id = state.users.length + 1;

    return { ...state, users: [...state.users, user] };
  },
  updateUser(state, action) {
    const user = action.payload;
    return {
      ...state,
      users: state.users.map(u => (u.id === user.id ? user : u)),
    };
  },
};

export const UsersProvider = props => {
  const reducer = (state, action) => {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <UsersContext.Provider value={{ state, dispatch }}>{props.children}</UsersContext.Provider>;
};

export default UsersContext;
