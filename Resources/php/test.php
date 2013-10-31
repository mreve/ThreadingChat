<?
function send_message($host, $username, $password, $port, $server, $friend, $message) {
	require_once('php/XMPPHP/XMPP.php');  

	$conn = new \XMPPHP_XMPP($host, $port, $username, $password, 'xmpphp', $server, $printlog = true,   
		$loglevel = \XMPPHP_Log::LEVEL_INFO);  
	$conn->useEncryption(true);
	try {
		$conn->connect();
		while (true) {
			$payloads = $conn->processUntil(array('message', 'presence', 'end_stream', 'session_start'));
			foreach ($payloads as $event) {
				$payload = $event[1];
				switch ($event[0]) {
					case 'message':
						print "---------------------------------------------------------------------------------\n";
						print "Message from: {$pl['from']}\n";
						if($payload['subject']) print "Subject: {$pl['subject']}\n";
						print $payload['body'] . "\n";
						print "More details: \n";
						print_r($payload);
						print "---------------------------------------------------------------------------------\n";
						$conn->message($payload["from"], "Ty też");
						break;
					case 'presence':
						print "Presence: {$pl['from']} [{$pl['show']}] {$pl['status']}\n";
						break;
					case 'session_start':
						$conn->presence($status="Cheese!");
						break;

				}
			}
		}
	} catch(\XMPPHP_Exception $e) {  
		die($e->getMessage());  
	}

	/*try {  
		$conn->connect();  
		$conn->processUntil('session_start');  
		$conn->presence();   

		$events = $conn->processUntil('message');
		foreach($events as $current) {
			print_r($current);
 			$data = $current[1]; // [0] contains the event type, here "message"
			echo "Message - From: ".$data["from"].", Text: ".$data["body"]."\n";
			echo "Odsyłam to samo: ".$data["body"]." do: ".$data["from"]."\n";
			#$conn->message($friend, $data["body"]);  
		}

		$conn->disconnect();  
	} catch(\XMPPHP_Exception $e) {  
		die($e->getMessage());  
	}*/
}
