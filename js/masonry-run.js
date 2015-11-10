$( window ).load( function() {
    
  $( '#list' ).masonry( { itemSelector: '.item' } );
     
    $( '#gallery-grid' ).masonry({
  
      itemSelector: '.gallery-list-item'
    })
});