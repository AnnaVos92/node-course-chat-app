const {ObjectId} = require('lodash');

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor () {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users = this.users.concat([user]);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        // get list of users in room
        // return statement implied (ES6)
        // if true, keeps user in filtered userlist
        var userList = this.users.filter((user) => user.room === room);
        var names = userList.map((user) => user.name);          // map gets contents from objects in array

        return names;
    }
}

module.exports = {Users};

// class Person {
//     constructor (name, room) {
//         this.name = name;
//         this.room = room;
//         // this.id = new ObjectId();
//     }

//     getUserDescription () {
//         return `${this.name} is in room ${this.room}`;
//     }
// }

// var me = new Person('Anna', 'something');
// var description = me.getUserDescription();
// console.log(description);