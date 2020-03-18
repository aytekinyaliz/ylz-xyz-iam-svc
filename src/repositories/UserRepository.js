const firestore = require('../services/firestore');

class UserRepository {
  constructor() {
    this.collectionName = 'iam-svc-users';
    this.usersCollection = firestore.collection(this.collectionName);
  }

  async getAll() {
    const usersRef = await this.usersCollection.get();

    const users = [];
    usersRef.forEach(user => {
      const { password, ...rest } = user.data();

      users.push({ id: user.id, ...rest });
    });
  
    return users;
  }

  async getByEmail({ email }) {
    const users = await this.usersCollection.where('email', '==', email).get();

    if(users.empty) {
      return null;
    }

    for (const user of users.docs) {
      return {
        id: user.id, 
        ...user.data()
      };
    }
  }

  async create({ firstName, lastName, email, password }) {
    const user = await this.usersCollection.add({
      firstName, 
      lastName, 
      email, 
      password,
      createdAt: new Date()
    });
  
    return user.id;
  }
}

module.exports = new UserRepository();
