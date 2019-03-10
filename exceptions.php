<?php

	class SQLConnectException extends RuntimeException 
        implements Exception {
		public function __construct($error) {
		///	$this->message = "Error connecting to database: $error";
			 parent::__construct($error);
    		
  		}
  		public function __toString() {
  			return  "err"
  		}
	}
?>
