var $ = require('jquery');

module.exports = {
  filterUsers: function (users) {
    var filteredUsers = users;

    filteredUsers.sort((a, b) => {
      if(a.createdAt >= b.createdAt) {
        return 1;
      } else {
        return -1;
      }
    });

    return filteredUsers;
  },
};
