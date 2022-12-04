const router = require('express').Router();
const { User, Thoughts } = require('../../models');

// getting users
router.get('/', (req, res) => {
    User.find()
    .then(async (users) => {
      return res.json(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

// getting a single user
router.get('/:id', (req, res) => {
    console.log(req.params.id)
User.findOne({ _id: req.params.id })
    .select('-__v')
    .then(async (user) =>
    !user
        ? res.status(404).json({ message: `No user with ID ${req.params.id}` })
        : res.json({ user })
    )
    .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
    });
});

// creating new users
router.post('/', (req, res) => {
User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

// updating existing user
router.put('/:id', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).then((user) => 
    !user
    ? res.status(404).json({ message: `No user with ID ${req.params.id}` })
    : res.json(user)
    )
    .catch((err) => {
        console.log(err);
        return res.status(500)
    });
});

// deleting an existing user
router.delete('/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : Thoughts.deleteMany({ _id: { $in: user.userThoughts } })
    )
    .then(() => res.json({ message: 'User and thier Thoughts deleted!' }))
    .catch((err) => res.status(500).json(err));
});

// adding new friends to a user
router.put('/:id/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { userFriends: req.params.friendId } },
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
router.delete('/:id/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { userFriends: { id: req.params.friendId } } },
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

module.exports = router;