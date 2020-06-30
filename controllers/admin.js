

//To login administrator
var uuid = require ('uuid');

const db = require('../utils/database');
const passwordUtil  = require('../utils/password');
exports.login = (req,res,next)=>{

    var post_data = req.body;
    

    //Extract email and password from request
    var user_password = post_data.password;
    var email = post_data.email;



    db.query('SELECT * FROM administrator WHERE email = ? ',[email],
     function (err,result,fields) {
        
        db.on('error', function (err) {
            console.log('[MySQL ERROR]', err);
        });
        
        res.end(JSON.stringify(result[0]));
        
        if(result && result.length)
        {

            var salt = result[0].salt;// Get salt of result if account exists
            var encrypted_password =  result[0].encrypted_password;
            //Hash password from Login request with salt in Database
            var hashed_password = passwordUtil.checkHashedPassword(user_password,salt).passwordHash;
            if(encrypted_password == hashed_password)
                res.end(JSON.stringify(result[0]))//If password is true,return all info of user
            else
                res.end(JSON.stringify('Wrong password'));
        }
        else
        {
            res.json('User does not exist!!!!');
        }
    })
}




//To register administrator
 

exports.register= (req,res)=>{

    var post_data = req.body; // Get POST params

    var uid = uuid.v4();//Get UUID v4
    var plaint_password = post_data.password; // Get password from post pasams
    var hash_data = passwordUtil.saltHashPassword(plaint_password);
    var password = hash_data.passwordHash; //Get hash value
    var salt = hash_data.salt; // Get salt

    var name = post_data.name;
    var email = post_data.email;
    

    db.query('SELECT * FROM fashionapp_store where email = ?', [email], function (err,result,fields){
        db.on('error', function (err) {
            console.log('[MySQL ERROR]', err);
        });
        // if (err) throw err;

        if(result && result.length)
            res.json('User already exists!!!');
        else
        {
            db.query('INSERT INTO `administrator`( `unique_id`, `name`, `email`,`encrypted_password`, `salt`, `created_at`, `updated_at`)' +
                'VALUES (?,?,?,?,?,NOW(),NOW())',[uid,name,email,password,salt],function (err,result,fields){
                db.on('error', function (err) {
                    console.log('[MySQL ERROR]', err);
                    res.json('Register error');
                });
                // if (err) throw err;
                res.json('Register successful');
            })
        }
    });

    }

//delete crochet product
exports.delete = (req,res)=>{
   db.query("DELETE FROM crochet_products WHERE id="+req.params.id+"",function(err,results){
    if(err)throw err;
    res.end(JSON.stringify({"status": 200,"error": null,"response": results}));
   });
};

// update crochet product
exports.update= (req,res)=>{
    let sql = "UPDATE crochet_products SET name='"+req.body.product_name+"', price='"+req.body.product_price+"' WHERE id="+req.params.id;;
  
     db.query(sql,(err,results)=>{
        if(err)throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
};

//add new crochetproduct
exports.addcrochet= (req,res)=>{
    let data = {
        name: req.body.product_name,
        unique_id: req.body.unique_id,
        price: req.body.product_price, 
        image: req.body.product_image_path,
        quantity:req.body.product_quantity};
    
    let sql ="INSERT INTO crochet_products SET ?";
     db.query(sql,data,(err, results)=>{
        if (err)throw err;
        res.send(JSON.stringify({"status": 200, "error": null ,"response": results}));
    });
};



//get all crochet products

exports.getallcrochet= (req,res)=>{
    let sql = "SELECT * FROM crochet_products";
    db.query(sql,(err, result)=>{
        if(err)throw err;
        res.send(JSON.stringify({"status": 200, "error":null,"response": result}));
    });
    };
    




    

/*
* To upload image
*
* */
// app.post('/upload_SP',(req,res,next)=>{})


