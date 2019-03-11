<?php
	function getHandler($data_base){
		$query ="SELECT ID, LAST_NAME FROM USERS";
		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));
    	$arr = $result->fetch_all(MYSQLI_ASSOC);
    	$i = 0;
    	while ($i < count($arr)) {
    		$query = "SELECT ID FROM TASKS WHERE USER_ID = '".$arr[$i]["ID"]."'";
    		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));
    		$tasks =  $result->fetch_all(MYSQLI_ASSOC);
    		$str ="";
    		foreach ($tasks as $task) {
    			$str = $str . $task["ID"].' ';
    		}
    		$users[$i]["LAST_NAME"] = $arr[$i]["LAST_NAME"];
    		$users[$i]["TASKS"] = $str;
    		$i++;
    	}
    	echo json_encode($users);
    	$result->close();
	}
?>