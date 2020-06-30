var crypto = require ('crypto');
var uuid = require ('uuid');


// random string generator
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') //to convert to hex format
        .slice(0,length);//returns fixed number is characters
}
exports.genRand = genRandomString;


var sha512 =function(password,salt){
    var hash = crypto.createHmac('sha512', salt); //Use SHA512
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};
exports.sha512 =sha512;


exports.saltHashPassword=(userPassword)=> {
    var salt = genRandomString(16);//Gen random string with 16 characters to salt
    var passwordData = sha512(userPassword,salt);
    return passwordData;
}

exports.checkHashedPassword =(userPassword,salt)=>
{
    var passwordData = sha512(userPassword,salt);
    return passwordData;

}
