<?php

/**
 * This endpoint is responsible for CRUD functionality for files used in Admin pages as well as the Preview pages
 * 
 * @author Daniel Rachfal
 */
class Files extends Endpoint
{
    private $db;

    // Overriding the constructor as this file is responsible for multiple endpoints
    public function __construct()
    {
        $this->db = new Database("DB/development.sqlite");
    }

    /**
     * Method for getting all files, requires a valid token
     */
    public function getFiles()
    {
        $this->validateRequestMethod("GET");
        $this->validateJWT();

        $sql = "SELECT files.id, files.fileTitle, files.fileName, files.visibility, files.createdAt, 
        users.id AS createdById, users.email AS createdByEmail, 
        file_visibility.name AS visibility 
            FROM files
            INNER JOIN users ON files.createdBy = users.id
            INNER JOIN file_visibility ON files.visibility = file_visibility.id";

        $data = $this->db->executeSQL($sql);

        $this->setData(array(
            "data" => $data,
            "length" => count($data),
            "message" => "Success",
        ));
    }

    /**
     * Method for getting a single file, requires a valid token
     * The request should provide a file_id
     */
    public function getFile()
    {
        $this->validateRequestMethod("GET");
        $this->validateJWT();

        $sql = "SELECT files.id, files.fileTitle, files.fileName, files.visibility, files.createdAt, 
        users.id AS createdById, users.email AS createdByEmail, 
        file_visibility.name AS visibility 
            FROM files
            INNER JOIN users ON files.createdBy = users.id
            INNER JOIN file_visibility ON files.visibility = file_visibility.id
            WHERE files.id = :file_id";

        $sqlParams = ([
            ":file_id" => $_REQUEST["file_id"],
        ]);

        $data = $this->db->executeSQL($sql, $sqlParams);

        $this->setData(array(
            "data" => $data,
            "length" => count($data),
            "message" => "Success",
        ));
    }

    /**
     * Method for deleting a file, requires a valid token
     * The request should provide a file_id
     */
    public function deleteFile()
    {
        $this->validateRequestMethod("POST");
        $this->validateJWT();

        $sql = "DELETE FROM files WHERE id = :file_id";

        $sqlParams = ([
            ":file_id" => $_REQUEST["file_id"],
        ]);

        $data = $this->db->executeSQLWithRowCount($sql, $sqlParams);

        if ($data == 0) {
            $this->setData(array(
                "data" => "null",
                "length" => $data,
                "message" => "No rows were affected",
            ));
        } else {
            $this->setData(array(
                "data" => "null",
                "length" => $data,
                "message" => "Success",
            ));
        }
    }

    /**
     * Method for updating a file visibility, requires a valid token
     * The request should provide a file_id and visibility
     */
    public function updateFileVisibility()
    {
        $this->validateRequestMethod("POST");
        $this->validateJWT();

        if (!in_array($_REQUEST["visibility"], [1, 2])) {
            $this->setData(array(
                "data" => "null",
                "length" => "0",
                "message" => "Invalid Request, valid values for visibility are 1 for PUBLIC and 2 for PRIVATE",
            ));
            return;
        }

        $sql = "UPDATE files SET visibility = :visibility WHERE id = :file_id";
        $sqlParams = ([
            ":visibility" => $_REQUEST["visibility"],
            ":file_id" => $_REQUEST["file_id"],
        ]);

        $data = $this->db->executeSQLWithRowCount($sql, $sqlParams);

        if ($data == 0) {
            $this->setData(array(
                "data" => "null",
                "length" => $data,
                "message" => "No rows were affected",
            ));
        } else {
            $this->setData(array(
                "data" => "null",
                "length" => $data,
                "message" => "Success",
            ));
        }
    }
}
