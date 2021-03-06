const { libs:{constants:{HttpStatusCode}}} = require('ylz-xyz-common');

const iamDomainInstance = require('../../domains/IamDomain');

class UserController {
  async signUp(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const token = await iamDomainInstance.signUp({ firstName, lastName, email, password });

      return token
        ? res.status(HttpStatusCode.CREATED).json({ token })
        : res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Could not create the user!' });
    } catch(err) {
      if(err.code === 'duplicate') {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: err.message });
      }
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      const token = await iamDomainInstance.signIn({ email, password });

      return token
        ? res.json({ token })
        : res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Wrong email or password!' });
    } catch(err) {
      next(err);
    }
  }

  async signOut(req, res, next) {
    try {
      const { id: userId } = res.locals.user;

      await iamDomainInstance.signOut({ userId });

      return res.send();
    } catch(err) {
      next(err);
    }
  }

  async query(req, res, next) {
    try {
      const { email } = req.query;

      const user = await iamDomainInstance.query({ email });

      return res.json(user);
    } catch(err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await iamDomainInstance.getAll();

      res.json(users);
    } catch(err) {
      next(err);
    }
  }
}

module.exports = new UserController();
