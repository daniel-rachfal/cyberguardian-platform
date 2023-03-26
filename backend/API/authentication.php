<?php 
define('SECRET', "R7Cgb9ruh:a3~+Y;H1XC8?`Im^BA]`");
use FirebaseJWT\JWT;

header("Access-Control-Allow-Headers: Authorization");
/**
 * Authenticate username and password
 *
 * This class will check a username and password again those held in the 
 * database. Where authentication is successful it will return a JWT.
 *
 * @author Nikitas Kaouslidis w20006928
 */
class Authenticate extends Endpoint
{
 
    public function __construct() {
        $db = new Database("DB/development.sqlite");
        $this->validateRequestMethod("POST");
        $this->validateAuthParameters();
        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());
        $this->validateUsername($queryResult); 
        $this->validatePassword($queryResult);
        
        $data['token'] = $this->createJWT($queryResult);
 
        http_response_code(201);
 
        $this->setData( array(
          "length" => 0, 
          "message" => "success",
          "data" => $data
        ));
    }
 
 
    protected function initialiseSQL() {
        $sql = "SELECT id, username AS username, password FROM users WHERE username = :username";
        $this->setSQL($sql);
        $this->setSQLParams(['username'=>$_SERVER['PHP_AUTH_USER']]);
    }
 
 
    private function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method){
            throw new ClientErrorException("invalid request method", 405);
        }
    }
 
 
    private function validateAuthParameters() {
        if ( !isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW']) ) {
            throw new ClientErrorException("username and password required", 401);
        }
    }
 
 
    private function validateUsername($data) {
        if (count($data)<1) {
            throw new ClientErrorException("invalid credentials", 401);
        } 
    }
 
 
    private function validatePassword($data) {
        if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) {
            throw new ClientErrorException("invalid credentials", 401);
        } 
    }

    private function createJWT($queryResult) {
 
        $secretKey = SECRET;

        $time = time();

        $tokenPayload = [
          'iat' => $time,
          'exp' => strtotime('+1 day', $time),
          'iss' => $_SERVER['HTTP_HOST'],
          'id' => $queryResult[0]['id'],
          'username' => $queryResult[0]['username'],
        ];
             
        $jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');
        
        return $jwt;
      }
}
?>