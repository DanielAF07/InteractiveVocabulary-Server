const express = require('express')
const router = express.Router()
const wordController = require('../controllers/wordController')
const multer = require('multer')
const upload = multer()

// Create word
router.post('/',
  upload.single('image'),
  wordController.createWord
)

router.delete('/:id',
  wordController.deleteWord
)

router.delete('/grade/:grade',
  wordController.deleteWords
)

router.put('/',
  wordController.editWord
)

router.get('/grade/:grade',
  wordController.getWordsGrade
)

router.get('/',
  wordController.getWords
)

module.exports = router