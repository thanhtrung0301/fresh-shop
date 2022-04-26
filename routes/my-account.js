const express = require('express');
const router = express.Router();
const myAccountController = require('../controllers/myAccountController');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage});


/* GET home page. */
router.get('/', myAccountController.myAccount);

router.get('/info', myAccountController.accountInfo);

router.post('/info', myAccountController.updateInfoUser);

router.post('/update-avatar', upload.single("avatar"), function(req, res) {
    console.log(req.file);

    myAccountController.avatarUser(req.user.username,'/images/upload/'+req.file.filename);

    res.redirect('/my-account')
});

router.get('/order', myAccountController.order);

router.get('/api/list-orders', myAccountController.listOrders);


module.exports = router;
