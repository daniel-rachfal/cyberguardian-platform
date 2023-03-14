<?php
 
/**
 * Base endpoint
 * The homepage of the API which will show student name, student ID
 * 
 * @author Nikitas Kaouslidis (W20006928)
 */
class Base extends Endpoint
{
    /**
     * Override the constructor because we do
     * not need to query the database for this 
     * endpoint.
     */
    public function __construct() {
        $name = array(
            "first_name" => "Nikitas", 
            "last_name" => "Kaouslidis"
        );
        $data = array(
            "name" => $name,
            "stud_id" => "w20006928"
        );
 
        // We are following the same pattern for all endpoints
        $this->setData( array(
            "data" => $data,
            "length" => count($data),
            "message" => "Success"
        ));
    }
}