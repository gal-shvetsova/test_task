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
    try {
    $db = new PDO($dsn, $user, $password, $opt);
        init($db);
    } catch (PDOException $e) {
       $arr =array(
        "error" => "Can not connect with database",
        "code" => 512
       );
        http_response_code(512);
       echo json_encode($arr);
       logger($e->getMessage(), "error");
       exit();
    }

    try {
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
    } catch (PDOException $e) {
        $arr =array(
            "error" => "Can not ".$_SERVER['REQUEST_METHOD'],
            "code" => 513
        );
        http_response_code(513);
        echo json_encode($arr);
        logger($e->getMessage(), "warning");
        exit();
    }
    
	function init($data_base){
        $data_base->exec("CREATE TABLE IF NOT EXISTS USERS (ID INT KEY AUTO_INCREMENT NOT NULL, FIRST_NAME CHAR(50) , LAST_NAME CHAR(50), FACULTY CHAR(50) NOT NULL, COURSE INT UNSIGNED NOT NULL)");
        
        $data_base->exec("CREATE TABLE IF NOT EXISTS TASKS (ID INT KEY AUTO_INCREMENT NOT NULL, USER_ID INT NOT NULL, NAME CHAR(50) , DESCRIPTION BLOB, HARDNESS INT NOT NULL)");
	}

    function logger($message, $level) {
        $date = date("Y-m-d h:m:s");
        $message = "[{$date}] [{$file}] [{$level}]".$message.PHP_EOL;
        error_log($message, 3, __DIR__ ."/error.log");
    }
?>