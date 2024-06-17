const express = require('express')
const router = express.Router()

router.get('/posts/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../public/images/data', fileName);

    res.sendFile(filePath);
});


router.get('/profile/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../public/images/data', fileName);

    res.sendFile(filePath);
});


router.get('/banner/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../public/images/data', fileName);

    res.sendFile(filePath);
});



router.get('/video/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../public/images/data', fileName);

    res.sendFile(filePath);
});

