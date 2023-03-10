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
        $sql = "SELECT files.id, files.fileName, files.visibility, files.createdBy, files.createdAt, users.id, users.email FROM files
            INNER JOIN users ON files.createdBy = users.id";
        $sqlParams = [];

        $this->setSQL($sql);
        $this->setSQLParams($sqlParams);
    }
}
