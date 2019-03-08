<?php
	function getHandler($data_base){
		$query ="SELECT * FROM USERS";
		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));
    	$arr = $result->fetch_all(MYSQLI_ASSOC);
    	echo '{"users": '.json_encode($arr).'}';
    	$result->close();
	}

	function postHandler($data_base, $json){
		$user = json_decode($json);
		$query ="INSERT INTO USERS (FIRST_NAME, LAST_NAME, FACULTY, COURSE)
		VALUES ('".$user->FIRST_NAME."', '".$user->LAST_NAME."', '".$user->FACULTY."', ".$user->COURSE.")";
		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));
	}

	function putHandler($data_base, $json){
		$user = json_decode($json);
		$query ="UPDATE USERS SET FIRST_NAME='".$user->FIRST_NAME."', LAST_NAME='".$user->LAST_NAME."', FACULTY='".$user->FACULTY."', COURSE=".$user->COURSE." WHERE ID=".$user->ID."";
		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));	} 

	function deleteHandler($data_base, $json){
		$user = json_decode($json);
		$query ="DELETE FROM USERS WHERE ID=".$user->ID."";
		$result = mysqli_query($data_base, $query) or die("Ошибка " . mysqli_error($data_base));
	}

?>