const expect =  require('expect')

const {Users} = require('./users')

describe('Users', ()=> {
  var users;

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: 1,
      name: 'Nepali keto',
      room: 'Sagarmatha'
    },
    {
      id: 2,
      name: 'Nepali thito',
      room: 'Machhapuchre'
    },
    {
      id: 3,
      name: 'Nepali lathe',
      room: 'Sagarmatha'
    },
  ]
  })

  
  it('should add new user', ()=> {
    let users = new Users()

    let user = {
      id:'123', 
      name:'Paurakh', 
      room:'kotha'
    }
    users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })
  

  it('should return name of users in Sagarmatha room', ()=> {
    let usersList = users.getUsersList('Sagarmatha')

    expect(usersList).toEqual(['Nepali keto', 'Nepali lathe'])
  })

  it('should return name of user of id: 2', ()=> {
    let user = users.getUser(2);

    expect(user).toEqual({'id': 2, 'name': 'Nepali thito', 'room': 'Machhapuchre'})
  })

  it('should not return name of user of id: 4', ()=> {
    let userName = users.getUser(4);

    expect(userName).toEqual(undefined)
  })

  it('should remove a user', ()=> {
    let removedUser = users.removeUser(1)

    expect(removedUser.id).toEqual(1)
    expect(users.users.length).toEqual(2)
  })

  it('should not remove a user', ()=> {
    let removedUser = users.removeUser(25)

    expect(removedUser).toEqual(undefined)
    expect(users.users.length).toEqual(3)
  })

})