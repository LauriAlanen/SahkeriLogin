<?php
    $username = $_POST['username']; 
    $conn = new mysqli('hidden', 'hidden', 'hidden', 'hidden');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else{
        $query = sprintf("SELECT * FROM users WHERE username = '%s'", $username);
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();

        $resp = $stmt->get_result();    
        $result = $resp->fetch_all(MYSQLI_ASSOC);

        echo(json_encode($result));
        
        $stmt->close();
        $conn->close();
    }
?>