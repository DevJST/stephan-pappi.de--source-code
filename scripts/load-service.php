<?php

if ( isset ( $_POST["operation"] ) ) { 
  
  $operation = $_POST["operation"];
  
  if ( $operation === "set" ) {
    
    if ( isset( $_POST["serviceLoad"] ) === true  &&  isset( $_POST["serviceIndex"] ) === true ) {
    
      $serviceLoad = $_POST["serviceLoad"];
      $serviceIndex = $_POST["serviceIndex"];
      
      $jsonFileData = array( 'serviceLoad' => $serviceLoad, 
                      'serviceIndex' => $serviceIndex );
      
      $file = fopen( "../json/load-service.json" ,'w+');
      fwrite( $file, json_encode( $jsonFileData ) );
      fclose( $file );
      
      echo json_encode( array( 'response' => true ) );
    
    } else {
     
      echo json_encode( array( 'response' => false ) );
    }
  
  } elseif ( $operation === "get" ) {
    
    $jsonFileContent = file_get_contents( "../json/load-service.json" );
    $decoded_json = json_decode( $jsonFileContent, true );
    
    $serviceLoad = $decoded_json[ 'serviceLoad' ];
    $serviceIndex = $decoded_json[ 'serviceIndex' ];
    
    $jsonOutput = array(       
                    
                    'serviceLoad' => $serviceLoad,
                    'serviceIndex' => $serviceIndex
                  );
    
    echo json_encode( $jsonOutput );
    
    $jsonFileData = array( 'serviceLoad' => 0, 
                      'serviceIndex' => 1 );
      
    $file = fopen( "../json/load-service.json" ,'w+' );
    fwrite( $file, json_encode( $jsonFileData ) );
    fclose( $file );
    
  } else {
   
    echo json_encode( array( 'response' => false ) );
  }
  
} else {
 
  echo json_encode( array( 'response' => false ) );
}