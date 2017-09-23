var crypto = require('crypto');

var password = 'qwer1234@@'
var password2 = 'qwer1234@@@'
var shasum = crypto.createHash('sha256');
shasum.update(password);

var output = shasum.digest('hex');

console.log ('password='+ password);
console.log ('hash='+ output);


var shasum2 = crypto.createHash('sha256'); 
shasum2.update(password2);

var output2 = shasum2.digest('hex');

console.log ('password='+ password2);
console.log ('hash='+ output2);


var my_key='dkfdkfdjldsjflsjdjfldjfdlsjlfdjfkdfjkldfjldjfld'
var password3='qwer1234@@'

// encryption
var cipher = crypto.createCipher('aes192',my_key);
cipher.update (password3, 'utf8', 'base64')
var cipheredOutput = cipher.final('base64');

// decryption
var decipher = crypto.createDecipher('aes192', my_key);
decipher.update(cipheredOutput,'base64','utf8');
var decipheredOutput = decipher.final('utf8');

console.log('orginal :' , password3)
console.log('cipheredOutput:', cipheredOutput)
console.log('decipheredOutput:', decipheredOutput)

var fs = require('fs');
var data = {password:password , output:output, cipheredOutput:cipheredOutput}

fs.writeFile('password.txt'
	        , JSON.stringify(data)
	        , 'utf8'
	        , function(error) {
	        	if(error) { 
	        		console.log(error)
	        	}
	        	else {
	        		console.log('write completed...')

	        		// write --> read ( call back tail ...)
					fs.readFile('password.txt', 'utf8', function(error,data){
						if(error) {
							console.log(error);
						} else {
							console.log('data:' , data);
						}
					});
	        	}
	        });

