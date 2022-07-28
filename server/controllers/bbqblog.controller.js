const BbqBlog = require('../models/bbqblog.model');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


module.exports = {

    findAllBlogs: (req, res) => {
        BbqBlog.find()
            .then((allBbqblogs) => {
                console.log(allBbqblogs);
                res.json(allBbqblogs);
            })
            .catch((err) => {
                console.log('findAllBbqblogs failed');
                res.json({ 
                    message: 'findAllBbqblog error', 
                    error: err})
            })
    }, 

    createNewBbqblog: (req, res) => {
        const newBbqblogObject = new BbqBlog(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        })

        newBbqblogObject.uploadedBy = decodedJWT.payload.id;

        newBbqblogObject.save()
            .then((newBbqblog) => {
                console.log(newBbqblog);
                res.json(newBbqblog);
            })
            .catch((err) => {
                console.log('Error uploading new Bbq Blog');
                res.status(400).json(err);
            })
    },

    findOneBbqblog: (req, res) => {
        BbqBlog.findOne({ _id: req.params.id })
            .populate('uploadedBy', 'username')
            .then((oneBbqblog) => {
                console.log(oneBbqblog);
                res.json(oneBbqblog);
            })
            .catch((err) => {
                console.log('Error finding one Bbq Blog');
                res.json({ message: 'Fine one Bbq Blog Failed', error: err});
            })
    }, 

    deleteOneBbqblog: (req, res) => {
        BbqBlog.deleteOne({ _id: req.params.id })
            .then((deletedBbqblog) => {
                console.log(deletedBbqblog);
                res.json(deletedBbqblog);
            })
            .catch((err) => {
                console.log('Error deleting Bbq Blog');
                res.json({ message: 'Delete Bbq Blog Failed'});
            })
    }, 

    updateBbqblog: (req, res) => {
        BbqBlog.findOneAndUpdate({ _id: req.params.id }, 
            req.body, 
            { new: true, runValidators: true})
            .then((updatedBbqblog) => {
                console.log(updatedBbqblog);
                res.json(updatedBbqblog);
            })
            .catch((err) => {
                console.log('Error updating Bbq Blog');
                res.status(400).json(err);
            })
    },

    findAllBbqblogsByUser: (req, res) => {
        if(req.jwtpayload.username !== req.params.username) {
            console.log('User is not valid');

            User.findOne({ username: req.params.username })
                .then((userNotLoggedIn) => {
                    BbqBlog.find({ uploadedBy: userNotLoggedIn._id })
                    .then((allBbqblogsFromUser) => {
                        console.log(allBbqblogsFromUser);
                        res.json(allBbqblogsFromUser);
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }
        else {
            console.log('current user');
            console.log('req.jwtpayload.id:', req.jwtpayload.id);
            BbqBlog.find({ uploadedBy: req.jwtpayload.id })
                .then((allBbqblogsFromLoggedInUser) => {
                    console.log(allBbqblogsFromLoggedInUser);
                    res.json(allBbqblogsFromLoggedInUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }
    }


}
