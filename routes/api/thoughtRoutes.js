const router = require('express').Router();
const { Thoughts, Reactions, User } = require('../../models');

// getting thoughts
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    Thoughts.findOne({ _id: req.params.id })
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
router.post('/', (req, res) => {
    Thoughts.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
});

// updating thought by id
router.put('/:id', (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).then((thought) => 
    !thought
    ? res.status(404).json({ message: `No thought with ID ${req.params.id}` })
    : res.json(thought)
    )
    .catch((err) => {
        console.log(err);
        return res.status(500)
    });
});

// deleting a thought by id
router.delete('/:id', (req, res) => {
    Thoughts.findOneAndDelete({ _id: req.params.id })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json({ message: 'Thought deleted!' })
    )
    .catch((err) => res.status(500).json(err));
});

// adding reactions to a thought
router.put('/:id/reactions', (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No user Thought with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
});

// delete a reaction from a thought
router.delete('/:id/reactions/:reactionId', (req, res) => {
    Thoughts.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err)
    );
})

module.exports = router;