const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', (req, res) => {
   Post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
         {
            model: Comment,
            attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
            include: {
               model: User,
               attributes: ['username']
            }
         },
         {
            model: User,
            attributes: ['username']
         }
      ]
   })
   .then(dbPostData => res.json(dbPostData))
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// GET an individual post by id
router.get('/:id', (req, res) => {
   Post.findOne({
      where: {
         id: req.params.id
      },
      attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
      include: [
         {
            model: Comment,
            attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
            include: {
               model: User,
               attributes: ['username']
            }
         },
         {
            model: User,
            attributes: ['username']
         }
      ]
   })
   .then(dbPostData => {
      if (!dbPostData) {
         res.status(404).json({ message: 'No post found with this id!' });
         return;
      }
      res.json(dbPostData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// POST (create) a new blog post
router.post('/', withAuth, (req, res) => {
   Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
   })
   .then(dbPostData => res.json(dbPostData))
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// PUT (update) an existing blog post by id
router.put('/:id', withAuth, (req, res) => {
   Post.update(req.body, {
      where: {
         id: req.params.id
      }
   })
   .then(dbPostData => {
      if (!dbPostData) {
         res.status(404).json({ message: 'No post found with this id!' });
         return;
      }
      res.json(dbPostData);
   })
   .catch(err => {
      console.log(err);
      res.json(500).json(err);
   });
});

// DELETE an existing blog post by id
router.delete('/:id', withAuth, (req, res) => {
   Post.destroy({
      where: {
         id: req.params.id
      }
   })
   .then(dbPostData => {
      if (!dbPostData) {
         res.status(404).json({ message: 'No post found with this id!' });
         return;
      }
      res.json(dbPostData);
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

module.exports = router;