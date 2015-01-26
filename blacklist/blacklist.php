<?php 

	if (!isset($_POST)) {
		throw new \InvalidArgumentException("Error Processing Request", 1);
	}

	$postData = $_POST;

	foreach ($postData as $key => $checkBoxStatus) {
	
		$blackList[] = array(
			'id' => $key
		);

	}

	$allCheckBoxes = json_encode($blackList);

	file_put_contents('blacklist.json', $allCheckBoxes);

	header('Location: ' . $_SERVER['HTTP_REFERER']);
?>