const express = require('express');

const router = express.Router();
const Candidate = require('../model/Candidate');

router.post('/addCandidate', (req, res) => {
  const newCandidate = new Candidate(
    req.body.candidate,
  );
  newCandidate.save()
    .then(() => {
      res.json({
        message: 'New Candidate Added!',
      });
    });
});

router.get('/candidate', async (req, res) => {
  try {
    const candidateData = await Candidate.find({});
    if (candidateData) {
      res.json(candidateData);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.put('/addvote/:id', async (req, res) => {
  try {
    const candidateData = await Candidate.findById(req.params.id);
    if (candidateData) {
      const id = candidateData._id;
      const updates = { votes: candidateData.votes + 1 };
      const options = {
        new: true,
      };

      Candidate.findByIdAndUpdate(id, {
        $set: updates,
      }, options, (err, data) => {
        if (data) {
          res.json({ message: 'Thanks for voting' });
        }
        if (err) {
          res.json({ message: err });
        }
      });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
