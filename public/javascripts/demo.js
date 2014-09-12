
function setToken(token){
  sessionStorage.setItem('auth', token);
}

function getToken(){
  return sessionStorage.getItem('auth');
}


$(function(){

  $('.signin').on('click', function(e){
    e.preventDefault();

      var username = 'nico';
      var password = '123456';

    $.ajax({
      type: "GET",
      cache: false,
      dataType: "json",
      url: "/api/auth",
      headers: {username:username, password:password},
      success: function(data){
        setToken(data.token);
        getUser();
      }
    });
  })


});

function islogin(){
  if (getToken()){
    getUser();
  }
}


function getUser(){

  var token = getToken();
  console.log(token);
  $.ajax({
    type: "GET",
    cache: false,
    dataType: "json",
    url: "/api/user",
    headers: { token: token },
    success: function(data){
      $('#login').hide();
      $('#name').html(data.name)
      $('#vista').show();
    }
  });
}






