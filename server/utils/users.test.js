const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Anna',
            room: 'NodeJS course'
        }, {
            id: 2,
            name: 'Hannah',
            room: 'ReactJS course'
        }, {
            id: 3,
            name: 'Glasses',
            room: 'NodeJS course'
        }];
    });
    
    describe('addUser', () => {
        it('should add new user', () => {
            var users = new Users();
            var user = {
                id: 123,
                name: 'Anna',
                room: 'room'
            };
            var result = users.addUser(user.id, user.name, user.room);
    
            expect(users.users).toEqual([user]);
        });
    });
    
    describe('getUserList', () => {
        it('should return all users in the NodeJS course room', () => {
            var userList = users.getUserList('NodeJS course');
            expect(userList).toEqual(['Anna', 'Glasses']);
        });
        
        it('should return one user in the ReactJS course room', () => {
            var userList = users.getUserList('ReactJS course');
            expect(userList).toEqual(['Hannah']);
        });
    });
    
    describe('removeUser', () => {
        it('should remove user with valid id', () => {
            var userId = 3;
            var user = users.removeUser(userId);
            expect(user.id).toBe(userId);
            expect(users.users.length).toBe(2);
        });
        
        it('should not remove user with invalid id', () => {
            expect(users.removeUser(0)).toBeFalsy();
        });
    });

    describe('getUser', () => {
        it('should return user with valid id', () => {
            var userId = 3;
            var user = users.getUser(userId);
            expect(user.id).toBe(userId);
        });
        
        it('should not return user with invalid id', () => {
            expect(users.getUser(0)).toBeFalsy();
        });
    });
});