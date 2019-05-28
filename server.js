'use strict'

const express = require('express')
const cors = require('cors')
const multer = require('multer')

const upload = multer({
  // No storage because there's no need to save the file
  // limits: {fileSize: 8000000} // Not working. Doesn't stop uploading after reaching the limit 
}).single('upfile')

const app = express()
app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js listening ...')
})


app.use(cors())

app.use('/public', express.static(process.cwd() + '/public'))


app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/fileanalyse', (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log(err)
      return res.send('Cannot upload')
    }
    
    if (req.file === undefined) {
      return res.send('I think you forgot something')
    }
    
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  })
})

app.use((req, res, next) => next({status: 404, message: 'not found'}))