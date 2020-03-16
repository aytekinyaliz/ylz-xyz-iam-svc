const { generateToken, hash, decodeToken } = require('../services/encryption');

const userRepositoryInstance = require('../repositories/UserRepository');
const tokenRepositoryInstance = require('../repositories/TokenRepository');


class UserDomain {
  async signUp({ firstName, lastName, email, password }) {
    let user = await userRepositoryInstance.getByEmail({ email });

    if(user) {
      const err = new Error('User already exists!');
      err.code = 'duplicate';

      throw err;
    }

    const userId = await userRepositoryInstance.create({ firstName, lastName, email, password: hash(password) });

    const token = generateToken({ userId });

    await tokenRepositoryInstance.createOrUpdate({ userId, token });

    return token;
  }

  async signIn({ email, password }) {
    const user = await userRepositoryInstance.getByEmail({ email });

    if(!user || user.password !== hash(password)) {
      return null;
    }

    const token = generateToken({ userId: user.id });

    await tokenRepositoryInstance.createOrUpdate({ userId, token });

    return token;
  }

  async signOut({ userId }) {
    await tokenRepositoryInstance.remove({ userId });
  }

  async query({ email }) {
    let user = await userRepositoryInstance.getByEmail({ email });

    return user ? user : null;
  }
}

module.exports = new UserDomain();
