//Jquery

//Efecto Hover usando Jquery, para el nav de la pestaña 'Personas'
$(document).ready(function(){
    $('header').hover(function(){
      $(this).css("background-color", '#6209DB');
      $(this).css("color", 'white');

      }, function(){
      $(this).css("background-color", '#f1e8e8');
      $(this).css("color", 'black');

    });
  });


  //Boton Scroll top usando Jquery, para la pestaña principal 

  $(document).ready(function() {

    $(window).scroll(function() {
      //El boton scroll top aparece solo cuando se baja la pantalla mas de 100px
      if($(this).scrollTop() > 100) {
        console.log('deberia estar funcionando');

        $('#topBtn').fadeIn();
      } else {
        $('#topBtn').fadeOut();
      }
    });

    $('#topBtn').click(function() {
        $(window).scrollTop(0);
        console.log('deberia estar funcionando');
    });
  });
