var loggly = require('loggly');

module.exports = function(tag) {
  return loggly.createClient({
    token: "f3edb38e-5576-4d6b-9418-7744a505cef6",
    subdomain: "noahyarian",
    tags: ["NodeJS", tag],
    json:true
  });
}
