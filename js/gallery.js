$( window ).load(function() {
  
  var galleryLargeImageListSP = []; 
  var galleryLargeImageCurrentSP = 0;
  var galleryLargeImageLastIndexSP = -1;
  
  $( ".view-large-img" ).each(function( i ) {
      
    ++galleryLargeImageLastIndexSP;
  });
  
  function loadImg(loadImgSrc) {
   
    var image = new Image();
    
    image.onload = function () {

      $( ".gallery-large-image" ).attr("src", loadImgSrc);
      $( "#large-picture-gallery" ).css( "display", "block" );
      return false;
    };
    
    image.src = loadImgSrc;

    if ( !image.complete ) {
      
      $( ".gallery-large-image" ).attr( "src", "../img/galerie/load.gif" );
      $( "#large-picture-gallery" ).css( "display", "block" );
    }
  }
    
  
  $( "#gallery-grid" ).on( "click", ".view-large-img", function(event) {
     
    event.preventDefault();
    
    $( "html" ).addClass("l-full-height");
    $( "body" ).addClass("l-full-height");
      
    var clickedElementHref = $(this).attr('href');
    
    loadImg(clickedElementHref);    
    
    $( ".view-large-img" ).each(function( i ) {
          
      var href = $(this).attr('href');
          
      galleryLargeImageListSP[i] = href;
          
      if( href === clickedElementHref) {
            
        galleryLargeImageCurrentSP = i;
      }
    });
      
    checkArrowsSP();
  });
  
  
  $( "#large-picture-gallery" ).on( "click", ".gallery-close", function() {
     
    $( "#large-picture-gallery").css( "display", "none" );
    $( ".gallery-large-image" ).attr("src", "");
  });
  
  
  $( "#large-picture-gallery" ).on( "click", ".image-preview", function() {
     
    loadImg( galleryLargeImageListSP[ --galleryLargeImageCurrentSP ] ); 
    checkArrowsSP(); 
  });
  
  
  $( "#large-picture-gallery" ).on( "click", ".image-next", function() {
     
    loadImg( galleryLargeImageListSP[ ++galleryLargeImageCurrentSP ] );
    checkArrowsSP();
  });
  
  
  function checkArrowsSP() {
     
    if(galleryLargeImageCurrentSP === 0) {
        
      $( ".image-preview" ).css( "display", "none" );
        
    } else if(galleryLargeImageCurrentSP === galleryLargeImageLastIndexSP) {
       
      $( ".image-next" ).css( "display", "none" );
      
    } else {
       
      $( ".image-preview" ).css( "display", "block" );
      $( ".image-next" ).css( "display", "block" );
    }
  }
});    

