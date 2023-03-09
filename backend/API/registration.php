<?php
/**
 * Registration of users
 *
 * This class will create new users when they complete
 * the sign up form and then insert and store their infromation
 * in the SQLite database.
 *
 * Author: Nikitas Kaouslidis w20006928
 */

class Registration extends Endpoint
{
    private $username;
    private $email;
    private $password;

    public function __construct()
    {
        $db = new Database("/DB/development.sqlite");
        if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])) {
            $this->username = trim($_POST['username']);
            $this->email = trim($_POST['email']);
            $this->password = trim($_POST['password']);
        } else {
            throw new Exception('Missing required fields');
        }
        $this->register();
    }

    protected function register()
    {
        // Check if username, email and password are valid
        if (!preg_match('/^[a-zA-Z0-9]+$/', $this->username)) {
            throw new Exception('Invalid username');
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Invalid email');
        }

        if (strlen($this->password) < 8) {
            throw new Exception('Password must be at least 8 characters');
        }

        return array('success' => true);
    }

    protected function initialiseSQL()
    {
        $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        $this->setSQL($sql);
    }

    public function executeRegistration()
    {
        $this->register();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $registration = new Registration();
    $response = $registration->executeRegistration();
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>