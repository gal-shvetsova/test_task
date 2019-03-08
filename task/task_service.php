<?php
	function getHandler($data_base){
		$query ="SELECT * FROM TASKS WHERE USER_ID = '".$_GET['USER_ID']."'";
		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));
    	$arr = $result->fetch_all(MYSQLI_ASSOC);
    	echo '{"tasks": '.json_encode($arr).'}';
    	$result->close();
	}

	function postHandler($data_base, $json){
		$user = json_decode($json);
		$query ="INSERT INTO TASKS (USER_ID, NAME, DESCRIPTION, HARDNESS)
		VALUES (".$user->USER_ID.",'".$user->NAME."', '".$user->DESCRIPTION."', '".$user->HARDNESS."')";
		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));
	}

	function putHandler($data_base, $json){
		$user = json_decode($json);
		$query ="UPDATE TASKS SET NAME='".$user->NAME."', DESCRIPTION='".$user->DESCRIPTION."', HARDNESS='".$user->HARDNESS."'WHERE ID=".$user->ID."";
		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));
	} 

	function deleteHandler($data_base, $json){
		$user = json_decode($json);
		$query ="DELETE FROM TASKS WHERE ID=".$user->ID."";
		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));
	}

?>