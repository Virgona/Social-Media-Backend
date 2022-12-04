const router = require('express').Router();
const { User, Thoughts } = require('../../models');

// getting thoughts
router.get('/thoughts', (req, res) => {
    Thoughts.find()
    .then(async (thoughts) => {
      return res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

// getting a single thought
router.get('/thoughts/:id', (req, res) => {
    console.log(req.params.id)
User.findOne({ _id: req.params.id })
    .select('-__v')
    .then(async (thought) =>
    !thought
        ? res.status(404).json({ message: `No thought with ID ${req.params.id}` })
        : res.json({ thought })
    )
    .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
    });
});

// creating new thought
router.post('/thoughts', (req, res) => {
    Thoughts.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    });