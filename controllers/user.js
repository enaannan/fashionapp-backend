const db =require('../utils/database');
const passwordUtil =require('../utils/password');

var uuid = require ('uuid');
/*
 *To login user
 *
 */

exports.login=(req,res,next)=>{

    var post_data = req.body;

    //Extract email and password from request
    var user_password = post_data.password;
    var email = post_data.email;
    db.query('SELECT * FROM users where email=?',[email], function (err,result,fields) {
        db.on('error', function (err) {
            console.log('[MySQL ERROR]', err);
        });
console.log(email);
console.log(result);
        if(result && result.length)
        {

            var salt = result[0].salt;// Get salt of result if account exists
            var encrypted_password =  result[0].encrypted_password;
            //Hash password from Login request with salt in Database
            var hashed_password = passwordUtil.checkHashedPassword(user_password,salt).passwordHash;
            if(encrypted_password == hashed_password)
                res.end(JSON.stringify(result[0]))     //If password is true,return all info of user
            else
                res.end(JSON.stringify('Wrong password'));
        }
        else
        {
            res.json('User does not exist!!!!');
        }
    });
}

/*
To register a user

 */

exports.register= (req,res,next)=>{

    var post_data = req.body; // Get POST params

    var uid = uuid.v4();//Get UUID v4
    var plaint_password = post_data.password; // Get password from post pasams
    var hash_data = passwordUtil.saltHashPassword(plaint_password);
    var password = hash_data.passwordHash; //Get hash value
    var salt = hash_data.salt; // Get salt

    var name = post_data.name;
    var email = post_data.email;
    var phone = post_data.phone;

    db.query('SELECT * FROM fashionapp_store where email = ?', [email], function (err,result,fields){
        db.on('error', function (err) {
            console.log('[MySQL ERROR]', err);
        });
        // if (err) throw err;

        if(result && result.length)
            res.json('User already exists!!!');
        else
        {
            db.query('INSERT INTO `users`( `unique_id`, `name`, `email`, `encrypted_password`, `salt`, `created_at`, `updated_at`)' +
                'VALUES (?,?,?,?,?,NOW(),NOW())',[uid,name,email,password,salt],function (err,result,fields){
                db.on('error', function (err) {
                    console.log('[MySQL ERROR]', err);
                    res.json('Register error');
                });
                 //if (err) throw err;
                res.json('Register successful');
            })
        }
    });

}

exports.getallcrochet= (req,res)=>{
    let sql = "SELECT * FROM crochet_products";
    db.query(sql,(err, result)=>{
        if(err)throw err;
        res.send(JSON.stringify({"status": 200, "error":null,"response": result}));
    });
    };