const router = require('express').Router();
const { User } = require('../models');

// getting users
router.get('/api/users', (req, res) => {
    User.find()
    .then(async (users) => {
      const userObj = {
        users,
        friendCount: await friendCount(),
      };
      return res.json(userObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

router.get('/api/users:id', (req, res) => {
User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then(async (user) =>
    !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json({
            user,
            userFriends: await friendCount(),
            userThoughts: await thoughtCount(),

        })
    )
    .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
    });
});

// creating new users

router.post('/api/users', (req, res) => {
User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

// updating existing user

router.put('/api/users:id', (req, res) => {
    User.findOneAndUpdate(
        { user: req.params.studentId },
        { $pull: { students: req.params.studentId } },
        { new: true }
    ).catch((err) => {
        console.log(err);
        return res.status(500)
    });
});

// deleting an existing user

router.delete('/api/users:id', (req, res) => {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { user: req.params.userId },
              { $pull: { user: req.params.userId } },
              { new: true }
            )
      )
      .then((userThoughts) =>
        !userThoughts
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// adding new friends to a user

router.post('/api/users:id/friends:id', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { userFriends: req.body } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});

// deleting a users friend

router.delete('/api/users:id/friends:id', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { userFriends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});