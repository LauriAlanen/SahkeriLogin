<?php
    $username = $_POST['username'];
    $PASSWORD = $_POST['password'];

    $conn = new mysqli('hidden', 'hidden', 'hidden', 'hidden');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else{
        $stmt = $conn->prepare("insert into users(username, PASSWORD) value(?,?)");
        $stmt->bind_param("ss", $username, $PASSWORD);
        $stmt->execute();
        echo "Registration successful";
        $stmt->close();
        $conn->close();
    }
?>
