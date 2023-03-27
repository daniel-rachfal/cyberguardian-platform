<?php

/**
 * This class endpoint is responsible for user management used in Admin functionality
 * 
 * @author Daniel Rachfal
 */
class Users
{
    private $db;
    private $data;

    public function __construct()
    {
        $this->db = new Database("DB/development.sqlite");
    }

    public function getUsers()
    {
        $sql = "SELECT id, username, email, createdAt, is_admin FROM users";

        $data = $this->db->executeSQL($sql);

        $this->setData(array(
            "data" => $data,
            "length" => count($data),
            "message" => "Success",
        ));
    }

    private function setData($data)
    {
        $this->data = $data;
    }

    public function getData()
    {
        return $this->data;
    }
}
