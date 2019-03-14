<?php
	function getHandler($data_base){
		try {
			$stmt =$data_base->query("SELECT * FROM USERS");
			$arr = $stmt->fetchAll();

    	echo '{"users": '.json_encode($arr).'}';
    		} catch (PDOException $e) {
    			throw $e;
		}
	}

	function postHandler($data_base, $json){
		try{
			$user = json_decode($json);
			$data = array($user->FIRST_NAME, $user->LAST_NAME, $user->FACULTY, $user->COURSE);
			$stmt = $data_base->prepare("INSERT INTO USERS (FIRST_NAME, LAST_NAME, FACULTY, COURSE)
			VALUES (:firstName, :lastName, :faculty, :course)");
			$stmt->execute($data);
		} catch (PDOException $e) {
    		throw $e;
		}
	}

	function putHandler($data_base, $json){
		try {
			$user = json_decode($json);
			$data = array($user->FIRST_NAME, $user->LAST_NAME, $user->FACULTY, $user->COURSE, $id = $user->ID);
			$stmt = $data_base->prepare("UPDATE USERS SET FIRST_NAME= :firstName, LAST_NAME= :lastName, FACULTY=:faculty, COURSE=:course WHERE ID=:id");
			$stmt->execute($data);
		} catch (PDOException $e) {
    		throw $e;
		}

	} 

	function deleteHandler($data_base, $json){
		try {
			$user = json_decode($json);
			$data = array($user->ID);
			$stmt =$data_base->prepare("DELETE FROM USERS WHERE ID=:id");
			$stmt->execute($data);
		} catch (PDOException $e) {
    		throw $e;
		}
	}

?>