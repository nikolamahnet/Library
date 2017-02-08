

module.exports=function(app, express, db, bcrypt){

    var ObjectId = require('mongodb').ObjectId;
    var apiRouter = express.Router();

    apiRouter.post('/users', function(req,res){


        bcrypt.hash(req.body.password, null, null, function(err, hash) {


            var user = {
                username : req.body.username,
                password : hash,
                ime : req.body.ime,
                prezime: req.body.prezime,
                mob: req.body.mob,
                email : req.body.email,
                maxBrPosudbi: req.body.maxBrosudbi,
                roleId: req.body.roleId

            };

            db.collection('user').insertOne(user, function(err, data){

                console.log(data);

                if (!err){

                    res.json({ status: 'ok', insertId:data.insertedId });

                }

                else
                    res.json({ status: 'NOT OK' });

            });


        });


    });


    apiRouter.route('/users').get(function(req,res){


        db.collection('user').find({}).toArray(function(err, rows){

            if (!err){

                res.json({ status: 'OK', users:rows });

            }

            else
                res.json({ status: 'NOT OK' });

        });



    }).put(function(req,res){
        console.log(req);

        var user = {
            level : req.body.newLevel
        };


        db.collection('user').updateOne(
            {_id : ObjectId(req.body.id)},
            { $set : user},
            function(err, data){

                if (!err){

                    res.json({ status: 'OK', changedRows:data.nModified });

                }

                else
                    res.json({ status: 'NOT OK' });

            }
        );


    });

    apiRouter.route('/users/:id')/*.get(function(req,res){

        db.collection('user').findOne({_id: ObjectId(req.params.id)}).toArray(function(err, rows) {

            if (!err) {

                res.json({status: 'OK', users: rows});

            }

            else
                res.json({status: 'NOT OK'});

        });
    })*/.delete(function(req,res){


        db.collection('user').removeOne({
            _id : ObjectId(req.params.id)
        }, function (err, data){

            if (!err){

                res.json({ status: 'OK', affectedRows :data.nModified });

            }

            else
                res.json({ status: 'NOT OK' });

        });
    });





    //apiRouter.route('/posts').get(function(req,res){
//apiRouter.route('/posts').get(function(req,res){
//apiRouter.route('/posts').get(function(req,res){
//        db.collection('posts').find({}).toArray(function(err, rows){
//        db.collection('posts').find({}).toArray(function(err, rows){
//        db.collection('posts').find({}).toArray(function(err, rows){
//            if (!err){
//            if (!err){
//                res.json({ status: 'OK', posts:rows });
//                res.json({ status: 'OK', posts:rows });
//            }
//            }
//            else
//                res.json({ status: 'NOT OK' });
//                res.json({ status: 'NOT OK' });
//                res.json({ status: 'NOT OK' });
//        });
//        });
//        });
//        });
//        });
//    }).post(function(req,res){
//    }).post(function(req,res){
//    }).post(function(req,res){
//        console.log(req.body.post);
//        console.log(req.body.post);
//        var post = {
//            username : req.body.post.username,
//            timestamp : req.body.post.timestamp,
//            comment : req.body.post.comment
//        };
//        };
//        db.collection('posts').insertOne(post, function(err, data){
//        db.collection('posts').insertOne(post, function(err, data){
//            if (!err){
//            if (!err){
//                res.json({ status: 'OK', insertId:data.insertedId });
//                res.json({ status: 'OK', insertId:data.insertedId });
//            }
//            }
//            else
//                res.json({ status: 'NOT OK' });
//                res.json({ status: 'NOT OK' });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//    });
//    });
//    apiRouter.route('/posts/:id').delete(function(req,res){
//    apiRouter.route('/posts/:id').delete(function(req,res){
//    apiRouter.route('/posts/:id').delete(function(req,res){
//    apiRouter.route('/posts/:id').delete(function(req,res){
//    apiRouter.route('/posts/:id').delete(function(req,res){
//        db.collection('posts').removeOne({
//        db.collection('posts').removeOne({
//            _id : ObjectId(req.params.id)
//            _id : ObjectId(req.params.id)
//        }, function (err, data){
//        }, function (err, data){
//        }, function (err, data){
//            if (!err){
//            if (!err){
//                res.json({ status: 'OK', affectedRows :data });
//                res.json({ status: 'OK', affectedRows :data });
//            }
//            }
//            else
//                res.json({ status: 'NOT OK' });
//                res.json({ status: 'NOT OK' });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//    }).put(function(req,res){
//    }).put(function(req,res){
//    }).put(function(req,res){
//    }).put(function(req,res){
//        var post = {
//            timestamp : req.body.post.timestamp,
//            comment : req.body.post.comment
//            comment : req.body.post.comment
//        };
//        };
//        };
//        };
//        };
//        db.collection('posts').updateOne({
//            _id : ObjectId(req.params.id)
//        },{
//            $set : post
//        }, function(err, data){
//        }, function(err, data){
//        }, function(err, data){
//            if (!err){
//            if (!err){
//                res.json({ status: 'OK', changedRows: data.nModified });
//                res.json({ status: 'OK', changedRows: data.nModified });
//            }
//            }
//            else
//                res.json({ status: 'NOT OK' });
//                res.json({ status: 'NOT OK' });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//        });
//    });
        return apiRouter;

}