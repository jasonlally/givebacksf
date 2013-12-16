$(function() {
  $("#orgs div").click(function(){
    $(".overlay-container").fadeIn("fast");
  });
  $("#cancel").click(function(){
    $(".overlay-container").fadeOut("fast");
  });
  $(".btn-donate").click(function(){
    console.log($(this).data('amount'));
    var amount = $(this).data('amount');
    var body = "This is a donation from a website sent via Square Cash \n\n Hello testing";
    //insert jquery call to api to insert donation amount
    window.location.href = "mailto:jason.lally@gmail.com?cc=cash@square.com&subject=$" + amount + "&body=" + encodeURIComponent(body);
  })
});