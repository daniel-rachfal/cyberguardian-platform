<?php
 
/**
 * A general class for endpoints
 * 
 * This class will be a parent for all endpoints
 * providing common methods. It has been declared as an abstract class
 * which means it is not possible to make an instance of this class itself.
 * 
 * @author Nikitas Kaouslidis (W20006928)
 */
abstract class Endpoint 
{
    private $data;
    private $sql;
    private $sqlParams;
 
    /**
     * Query the database and save the result 
     */
    public function __construct() {
        //Initialising the relative path of db
        $db = new Database("../DB/development.sqlite");
 
        // The initialiseSQL method can be overridden by
        // child classes to set the SQL as appropriate for
        // each endpoint
        $this->initialiseSQL();
        
        $data = $db->executeSQL($this->sql, $this->sqlParams);
 
        // We are following the pattern from the first
        // answer by providing the length of the data array 
        
        $this->setData(array(
            "data" => $data,
            "length" => count($data),
            "message" => "Success"
        ));
    }
 
    protected function setSQL($sql) {
        $this->sql = $sql;
    }

    protected function getSQL() {
        return $this->sql;
    }
 
    protected function setSQLParams($params) {
        $this->sqlParams = $params;
    }

    protected function getSQLParams() {
        return $this->sqlParams;
    }
 
    /**
     * Define SQL and params for the endpoint
     * 
     * This method can be overridden by child classes
     * with to set the SQL query needed for the specific
     * endpoint. It is just blank here because this is an
     * abstract endpoint.
     */
    protected function initialiseSQL() {
        $sql = "";
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
 
 
    protected function setData($data) {
        $this->data = $data;
    }
 
    public function getData() {
        return $this->data;
    }
    
}