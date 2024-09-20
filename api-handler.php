<?php

if (isset($_POST['registrationNumber'])) {
    $registrationNumber = $_POST['registrationNumber'];

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => json_encode(array(
        'registrationNumber' => $registrationNumber
      )),
      CURLOPT_HTTPHEADER => array(
        'x-api-key: fSJ99ff9wB7AkRAC5tCiQ90nmdTKDXPM7nNTdf7i',
        'Content-Type: application/json'
      ),
    ));

    $response = curl_exec($curl);

    if (curl_errno($curl)) {
        echo 'Error:' . curl_error($curl);
    }

    curl_close($curl);
    echo $response; // Return the API response to the AJAX call
}
?>
