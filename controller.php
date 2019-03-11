 	<?php
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: *');
    header('Content-Type: application/json');
	ini_set('display_errors',0);
    include_once('config.php');
    
    $charset = 'utf8';
    $dsn = "mysql:host=$host;dbname=$database;charset=$charset";
    $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $db = new PDO($dsn, $user, $password, $opt);
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
	function init($data_base){
        $data_base->exec("CREATE TABLE IF NOT EXISTS USERS (ID INT KEY AUTO_INCREMENT NOT NULL, FIRST_NAME CHAR(50) , LAST_NAME CHAR(50), FACULTY CHAR(50) NOT NULL, COURSE INT UNSIGNED NOT NULL)");
        
        $data_base->exec("CREATE TABLE IF NOT EXISTS TASKS (ID INT KEY AUTO_INCREMENT NOT NULL, USER_ID INT NOT NULL, NAME CHAR(50) , DESCRIPTION BLOB, HARDNESS INT NOT NULL)");
	}
?>