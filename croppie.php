<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$image = $_POST['image'];
var_dump($image);
//Regex
if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
    $data = substr($image, strpos($image, ',') + 1);
    var_dump($type);
    var_dump($data);
    $type = strtolower($type[1]); // jpg, png, gif
var_dump($type);
    if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
        throw new \Exception('invalid image type');
    }
    //Görselin String Türüne Çevrilmiş hali
    $data = base64_decode($data);

    if ($data === false) {
        throw new \Exception('base64_decode failed');
    }
} else {
    throw new \Exception('did not match data URI with image data');
}

file_put_contents(__DIR__ ."/uploads/".time().".{$type}", $data);

?>