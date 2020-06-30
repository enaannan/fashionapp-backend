const assert= require('assert');
const passwordUtil= require('../utils/password')

describe('password utilities test',()=>{
it('should return appropriate lenght of random string',()=>{

var rand=passwordUtil.genRand(5);
var result =rand.length;

assert.equal(result,5);
})


it('should return zero fro null input',()=>{

    var rand=passwordUtil.genRand(null);
    var result =rand.length;
    
    assert.equal(result,0);
    })


it('should return the same hash for the same password',()=>{
var result =passwordUtil.sha512('godisgreat',	
   'ff387cd2289d486a' );
    const encrypted='270628f2d3da8b81cd8340eb3d75d92f15bd8549afed1ade9fdf8d410a7039b61b1ce7c3f0f9d8f9e38eb51d2f41fda9a0b57d0df901230b7821419438bd04a4';
    assert.equal(result['passwordHash'],encrypted);

})


    


})