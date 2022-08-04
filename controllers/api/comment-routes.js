const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', (req, res) => {
   Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST (create) new comment)
router.post('/', withAuth, (req, res) => {
   if (req.session) {
      Comment.create({
         content: req.body.content,
         user_id: req.session.user_id,
         post_id: req.body.post_id
      })
         .then(dbCommentData => res.json(dbCommentData))
         .catch(err => {
            console.log(err);
            res.status(400).json(err);
         });
   }
});

// DELETE an individual comment by id
router.delete('/:id', withAuth, (req, res) => {
   Comment.destroy({
      where: {
         id: req.params.id
      }
   })
      .then(dbCommentData => {
         if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
         }
         res.json(dbCommentData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;