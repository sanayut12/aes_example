const readline = require("readline");
// Nodejs encryption with CTR
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
   }
   
   function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
   }

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("your message : ", function(message) {

    var cipher_text = encrypt(message)
    console.log(`cipher text :${cipher_text.encryptedData}`)
    var plain_text = decrypt(cipher_text)
    console.log(`plain text : ${plain_text}`)
    rl.close();
});

rl.on("close", function() {
    process.exit(0);
});