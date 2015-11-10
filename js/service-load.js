$( window ).load(function() {
  
  $( "body" ).css( "cursor", "progress" );

  $.ajax({
      
      type: "POST",
      dataType: "json",
      url: "scripts/load-service.php",
      data: {
       
        operation: "get"
      },
      success: function (data) {

        if( data['serviceLoad'] == 1) {

          $('html, body').animate({
        
            scrollTop: $('#services-list').children().eq(data['serviceIndex']).offset().top
          }, 1000);
        
          $( '.services-box' ).each(function() {
            
            $(this).removeClass( 'is-services-box-checked' );
          });
        
          $('#services-list').children().eq(data['serviceIndex']).children().first().addClass( 'is-services-box-checked' );
          $( "body" ).css( "cursor", "auto" );
        
        } else {
          
          checkDefault();
        }
      },
      error: function() {
 
        checkDefault();
      }    
    });

    function checkDefault() {

      $('#services-list').children().eq(1).children().first().addClass( 'is-services-box-checked' );
      $( "body" ).css( "cursor", "auto" );
    }
});

//alert(data['serviceIndex']);