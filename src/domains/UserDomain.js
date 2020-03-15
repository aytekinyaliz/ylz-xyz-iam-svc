const { generateToken, hash, decodeToken } = require('../services/encryption');

const userRepositoryInstance = require('../repositories/UserRepository');


class UserDomain {
  async signUp({ firstName, lastName, email, password }) {
    let user = await userRepositoryInstance.getByEmail({ email });

    if(user) {
      const err = new Error('User already exists!');
      err.code = 'duplicate';

      throw err;
    }

    const id = await userRepositoryInstance.create({ firstName, lastName, email, password: hash(password) });

    return generateToken({ uid: id });
  }

  async signIn({ email, password }) {
    const user = await userRepositoryInstance.getByEmail({ email });

    return (user && user.password === hash(password))
      ? generateToken({ uid: user.id })
      : null;
  }
}

module.exports = new UserDomain();
