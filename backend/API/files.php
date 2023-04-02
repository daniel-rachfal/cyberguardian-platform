<?php

/**
 * This endpoint is responsible for providing all files, used in Admin functionality
 * 
 * @author Daniel Rachfal
 */
class Files extends Endpoint
{
    private $db;
    private $data;

    public function __construct()
    {
        $this->db = new Database("DB/development.sqlite");
    }

    public function getFiles()
    {
        $this->validateRequestMethod("GET");

        $sql = "SELECT files.id, files.fileName, files.visibility, files.createdAt, 
        users.id AS createdById, users.email AS createdByEmail, 
        file_visibility.name AS visibility 
            FROM files
            INNER JOIN users ON files.createdBy = users.id
            INNER JOIN file_visibility ON files.visibility = file_visibility.id";
//WHERE file_visibility.id = 1";

        $data = $this->db->executeSQL($sql);

        $this->setData(array(
            "data" => $data,
            "length" => count($data),
            "message" => "Success",
        ));
    }

    public function getFile()
    {
        $this->validateRequestMethod("GET");

        $sql = "SELECT files.id, files.fileName, files.visibility, files.createdAt, 
        users.id AS createdById, users.email AS createdByEmail, 
        file_visibility.name AS visibility 
            FROM files
            INNER JOIN users ON files.createdBy = users.id
            INNER JOIN file_visibility ON files.visibility = file_visibility.id
            WHERE files.id = :file_id AND file_visability.id = 1";
//WHERE file_visibility.id = 1";
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

    public function deleteFile()
    {
        $this->validateRequestMethod("POST");

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

    public function updateFileVisibility()
    {
        $this->validateRequestMethod("POST");

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

    protected function setData($data)
    {
        $this->data = $data;
    }

    public function getData()
    {
        return $this->data;
    }
}
