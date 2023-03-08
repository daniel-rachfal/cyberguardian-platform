<?php
/**
* Registration of users
*
* This class will create new users when they complete
* the sign up form and then insert and store their infromation
* in the SQLite database.
* @author Nikitas Kaouslidis w20006928
*/
class Registration extends Endpoint
{
    public function __construct() {
        $db = new Database("../DB/development.sqlite");
        $this->validateRequestMethod("POST");
        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());
        
        $data = "test";
        http_response_code(503);
 
        $this->setData( array(
          "length" => 0, 
          "message" => "success",
          "data" => $data
        ));
    }
 
    private function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method){
            throw new ClientErrorException("invalid request method", 405);
        }
    }

    protected function userExists($email) {
        $sql = "SELECT * FROM users WHERE email='$email'";
        $this->setSQL($sql);
        if($this > 0) {
            throw new ClientErrorException("Email already exists", 401);
        }
      }

}
?>