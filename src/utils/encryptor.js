// Nodejs encryption with GCM
// Does not work with nodejs v0.10.31
// Part of https://github.com/chris-rock/node-crypto-examples

import crypto from 'crypto';
import randtoken from 'rand-token';

var encryptor = (function(){
  return {
    /**
     * encrypt
     * Handles encrypting strings
     * @see http://lollyrock.com/articles/nodejs-encryption/
     * @param {string} text
     * @return {object}
     */
    encrypt: function(text) {
      // do not use a global iv for production,
      // generate a new one for each encryption
      const word = process.env.ENCRYPT_PASSWORD;
      const algorithm = process.env.ENCRYPT_ALGORITHM;
      const love = randtoken.generate(12);
      let cipher = crypto.createCipheriv(algorithm, word, love)
      let encrypted = cipher.update(text, 'utf8', 'hex')
      encrypted += cipher.final('hex');
      let tag = cipher.getAuthTag();
      return {
        content: encrypted,
        tag: tag.toString('utf8'),
        love: love,
      };
    },

    /**
     * decrypt
     * Handles decrypting strings
     * @see http://lollyrock.com/articles/nodejs-encryption/
     * @param {object} encrypted
     * @return {string}
     */
    decrypt: function(encrypted) {
      // Error handling
      if(!encrypted.love) console.log('Unable to find an encryption iv.');
      if(!encrypted.tag) console.log('Unable to find an encryption tag.');
      if(!encrypted.content) console.log('Unable to find any encrypted content.');

      // const { StringDecoder } = require('string_decoder');
      // var decoder = new StringDecoder('utf8');

      const word = process.env.ENCRYPT_PASSWORD;
      const algorithm = process.env.ENCRYPT_ALGORITHM;
      let decipher = crypto.createDecipheriv(algorithm, word, encrypted.love)
      decipher.setAuthTag(decoder.write(encrypted.tag));
      let dec = decipher.update(encrypted.content, 'hex', 'utf8')
      dec += decipher.final('utf8');
      return dec;
    }
  }
}());

export default encryptor;
