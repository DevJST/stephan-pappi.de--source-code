$( document ).ready(function() {
    
  $( "#welcome-site-services" ).on( "click", ".welcome-site-service", function() {
     
    $( '.welcome-site-service' ).each(function() {
            
      $(this).removeClass( 'is-checked-main-site-service' );
    });
        
      $(this).addClass( 'is-checked-main-site-service' );
  });
  
  var indexOfCheckedService;
  
  $( "#welcome-site-services" ).on( "click", ".is-checked-main-site-service", function() {
   
    $( this ).css( "cursor", "progress" );
    $( "body" ).css( "cursor", "progress" );
    
    var clickedElementNode = $( this );
    
    var requestParameters = {
      
      operation: "set", 
      serviceLoad: 1
    };
    
    indexOfCheckedService = $(this).parent().index();
    
    if( indexOfCheckedService > 1 ) --indexOfCheckedService;
    if( indexOfCheckedService > 2 ) --indexOfCheckedService;
    if( indexOfCheckedService > 3 ) --indexOfCheckedService;
    
    requestParameters.serviceIndex = indexOfCheckedService;
    
    $.ajax({
      
      type: "POST",
      dataType: "json",
      url: "scripts/load-service.php",
      data: requestParameters,
      success: function (data) {

        if (data['response'] === true) {
          
          window.location.href = 'leistungen.html';
        }
        
        else {
          
          clickedElementNode.css( "cursor", "auto" );
          $( "body" ).css( "cursor", "auto" );
        }
      },
      error: function() {
 
        clickedElementNode.css( "cursor", "auto" );
        $( "body" ).css( "cursor", "auto" );
      }    
    }); 
  });
  
  $( "#services-list" ).on( "click", ".services-box", function() {
     
    $( '.services-box' ).each(function() {
            
      $(this).removeClass( 'is-services-box-checked' );
    });
    
    // t: try fade in
    
    $(this).addClass( 'is-services-box-checked' );
        
  });
  
    $( ".main-section-menu" ).on( "click", ".dropdown-toggle", function(event) {
     
        event.preventDefault();
        $(this).next().toggleClass( "is-dropdown-menu-open" );
    });
});