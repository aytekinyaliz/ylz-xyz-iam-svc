const firestore = require('../services/firestore');

class TokenRepository {
  constructor() {
    this.collectionName = 'Tokens';
    this.tokensCollection = firestore.collection(this.collectionName);
  }

  async getByEmail({ email }) {
    const users = await this.tokensCollection.where('email', '==', email).get();

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

  async createOrUpdate({ userId, token }) {
    await this.tokensCollection.doc(userId).set({
      // id: userId, 
      token,
      createdAt: new Date()
    });
  }

  async remove({ userId }) {
    await this.tokensCollection.doc(userId).delete();
  }
}

module.exports = new TokenRepository();
