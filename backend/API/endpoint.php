<?php

require_once 'firebasejwt/key.php';
require_once 'firebasejwt/signatureinvalidexception.php';

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/**
 * A general class for endpoints
 * 
 * This class will be a parent for all endpoints
 * providing common methods. It has been declared as an abstract class
 * which means it is not possible to make an instance of this class itself.
 * 
 * @author Nikitas Kaouslidis (W20006928)
 * @author Daniel Rachfal
 */
abstract class Endpoint
{
    private $data;
    private $sql;
    private $sqlParams;

    /**
     * Query the database and save the result 
     */
    public function __construct()
    {
        //Initialising the relative path of db
        $db = new Database("DB/development.sqlite");

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

    protected function setSQL($sql)
    {
        $this->sql = $sql;
    }

    protected function getSQL()
    {
        return $this->sql;
    }

    protected function setSQLParams($params)
    {
        $this->sqlParams = $params;
    }

    protected function getSQLParams()
    {
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
    protected function initialiseSQL()
    {
        $sql = "";
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }

    protected function setData($data)
    {
        $this->data = $data;
    }

    public function getData()
    {
        return $this->data;
    }

    /**
     * Used for validating request method by child classes
     */
    protected function validateRequestMethod($method)
    {
        if ($_SERVER['REQUEST_METHOD'] != $method) {
            throw new ClientErrorException("Invalid request method", 405);
        }
    }

    /**
     * Validate a JWT
     * 
     * @throws ClientErrorException
     * @author Daniel Rachfal
     */
    protected function validateJWT()
    {
        $jwt = $this->getJWT();

        // Check if JWT is valid
        try {
            $decoded = JWT::decode($jwt, new Key(SECRET, 'HS256'));
        } catch (Exception $e) {
            throw new ClientErrorException($e->getMessage(), 401);
        }

        // Check if JWT is expired
        if ($decoded->exp < time()) {
            throw new ClientErrorException("JWT expired", 401);
        }

        //! Check that the issuer is our server
        // if ($decoded->iss != $_SERVER['HTTP_HOST']) {
        //     throw new ClientErrorException("JWT issuer invalid", 401);
        // }
    }

    /**
     * Get the JWT from the Authorization header
     * 
     * @return string JWT
     * @author Daniel Rachfal
     */
    private function getJWT()
    {
        $headers = getallheaders();
        $authHeader = "";

        // Check if authorization header is set
        if (array_key_exists('Authorization', $headers)) {
            $authHeader = $headers['Authorization'];
        } elseif (array_key_exists('authorization', $headers)) {
            $authHeader = $headers['authorization'];
        } else {
            throw new ClientErrorException("Authorization header not set", 401);
        }

        $jwt = str_replace("Bearer ", "", $authHeader);

        return $jwt;
    }
}
