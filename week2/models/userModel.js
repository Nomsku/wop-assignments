'use strict';
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const getUser = (userId) => {
  for(let user of users){
    if(userId === user.id){
      return user;
    }
  }
};

module.exports = {
  users,
  getUser,
};
