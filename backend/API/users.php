<?php

/**
 * This class endpoint is responsible for user management used in Admin functionality
 * 
 * @author Daniel Rachfal
 */
class Users extends Endpoint
{
    private $db;

    public function __construct()
    {
        $this->db = new Database("DB/development.sqlite");
    }

    public function getUsers()
    {
        $this->validateRequestMethod("GET");
        $this->validateJWT();

        $sql = "SELECT id, username, email, createdAt, is_admin FROM users";

        $data = $this->db->executeSQL($sql);

        $this->setData(array(
            "data" => $data,
            "length" => count($data),
            "message" => "Success",
        ));
    }
}
