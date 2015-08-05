var loggly = require('loggly');

module.exports = function(tag) {
  return loggly.createClient({
    token: process.env.LOGGLY_TOKEN,
    subdomain: "noahyarian",
    tags: ["NodeJS", tag],
    json:true
  });
}
