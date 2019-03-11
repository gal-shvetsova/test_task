<?php

	function getHandler($data_base){
    	$data = array($_GET['USER_ID']);
    	$stmt =$data_base->prepare("SELECT * FROM TASKS WHERE USER_ID = :userID");
    	$stmt->execute($data);
		$arr = $stmt->fetchAll();
    	echo '{"tasks": '.json_encode($arr).'}';
	}

	function postHandler($data_base, $json){
		$task = json_decode($json);
		$data = array($task->USER_ID, $task->NAME, $task->DESCRIPTION, $task->HARDNESS);
		$stmt =$data_base->prepare("INSERT INTO TASKS (USER_ID, NAME, DESCRIPTION, HARDNESS)
		VALUES (:USER_ID, :NAME, :DESCRIPTION, :HARDNESS)");
		$stmt->execute($data);
	}

	function putHandler($data_base, $json){
		$task = json_decode($json);
		$data = array($task->NAME, $task->DESCRIPTION, $task->HARDNESS, $task->ID);
		$stmt = $data_base->prepare("UPDATE TASKS SET NAME= :NAME, DESCRIPTION=:DESCRIPTION, HARDNESS=:HARDNESS WHERE ID=:ID");
		$stmt->execute($data);
	} 

	function deleteHandler($data_base, $json){
		$task = json_decode($json);
		$data = array($task->ID);
		$stmt =$data_base->prepare("DELETE FROM TASKS WHERE ID=:id");
		$stmt->execute($data);
	}

?>