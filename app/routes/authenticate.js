

module.exports=function(app, express, db, bcrypt){


    var authRouter = express.Router();


    authRouter.post('/', function(req,res){


        console.log(req.body.credentials);

        db.collection('users').find({
            username:req.body.credentials.username
        }).toArray(function(err, rows){

            if (rows.length==0)  res.json({ status: 'not ok', description:'Username doesnt exist' }); else {

                var validPass = bcrypt.compareSync(req.body.credentials.password, rows[0].password);

                if (!err) {

                    if (rows.length > 0 && validPass) {

                        res.json({
                            status: 'ok',
                            user: {username: rows[0].username, email: rows[0].email, name: rows[0].name}
                        });

                    } else {

                        res.json({status: 'not ok', description: 'Wrong password'});

                    }


                }

                else

                    res.json({status: 'not ok', description: 'Database error'});


            }

        });









    });


    return authRouter;

};