var jwt = require('jwt-simple');

var tokenSecret = 'Friday Talk JWT'

var auth = function(req, res) {
  var username = req.headers.username;
  var password = req.headers.password;

  var user = checkUser(username, password);

  if(user) {
    var token = jwt.encode(user, tokenSecret, 'HS512');
    res.json({token : token});
  } else {
    res.json({result: "AuthError"});
  }
}

var getUser =  function(req, res){
  var token = req.headers.token;
  console.log(token)
  var decoded = jwt.decode(token, tokenSecret);
  var user = validUser(decoded.username)
  if (user) {
     res.json({user: user});
  } else {
    res.json({result: "ValidError"});
  }
}

var methods = {
  getUser: getUser,
  auth: auth
}

var dataUser = [
  {
    id: 25,
    name: 'Nicolas Suarez',
    username: 'nico',
    password: '123456'
  },
  {
    id: 2,
    name: 'Juan Rodrigez',
    username: 'juan',
    password: '123456'
  }
]

var checkUser = function(username, password){
  for (var i = 0; i < dataUser.length; i++) {
    var user =  dataUser[i];
    if (user.username == username && user.password == password ) {
      data = { name: user.name, username: user.username, id: user.id }
      return data  ;
    } else {
      return null ;
    }

  };
}

var validUser =  function(username){
  for (var i = 0; i < dataUser.length; i++) {
    var user =  dataUser[i];
    if (user.username == username ) {
      data = { name: user.name, username: user.username, id: user.id }
      return data  ;
    } else {
      return null ;
    }
  };
}

module.exports = methods;


