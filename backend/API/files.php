<?php

/**
 * This endpoint is responsible for providing all files, used in Admin functionality
 * 
 * @author Daniel Rachfal
 */
class Files extends Endpoint
{
    protected function initialiseSQL()
    {
        $sql = "SELECT files.id, files.fileName, files.visibility, files.createdAt, 
        users.id AS createdById, users.email AS createdByEmail, 
        file_visibility.name AS visibility 
            FROM files
            INNER JOIN users ON files.createdBy = users.id
            INNER JOIN file_visibility ON files.visibility = file_visibility.id";
        $sqlParams = [];

        $this->setSQL($sql);
        $this->setSQLParams($sqlParams);
    }
}
