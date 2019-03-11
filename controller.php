 	<?php
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: *');
    header('Content-Type: application/json');
	ini_set('display_errors',0);
    include_once("config.php");
    $db = mysqli_connect($host, $user, $password, $database) or die("In connect " . mysqli_connect_error($db));
    init($db);

    switch ($_SERVER['REQUEST_METHOD']) {
    	case 'POST':
    		postHandler($db, file_get_contents('php://input'));
    		break;
    	case 'PUT':
    		putHandler($db, file_get_contents('php://input'));
    		break;
    	case 'DELETE':
    		deleteHandler($db, file_get_contents('php://input'));
    		break;	
        case 'GET':
            getHandler($db);
            break;
    }
	mysqli_close($db);
	function init($data_base){
		$query ="CREATE TABLE IF NOT EXISTS USERS (ID INT KEY AUTO_INCREMENT NOT NULL, FIRST_NAME CHAR(50) , LAST_NAME CHAR(50), FACULTY CHAR(50) NOT NULL, COURSE INT UNSIGNED NOT NULL)";
		$query_tasks ="CREATE TABLE IF NOT EXISTS TASKS (ID INT KEY AUTO_INCREMENT NOT NULL, USER_ID INT NOT NULL, NAME CHAR(50) , DESCRIPTION BLOB, HARDNESS INT NOT NULL)";
		$result = mysqli_query($data_base, $query) or die("In user query" . mysqli_error($data_base)); 
		$result = mysqli_query($data_base, $query_tasks) or die("In task query" . mysqli_error($data_base)); 
	}
 
?>