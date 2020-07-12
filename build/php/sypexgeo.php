<?php
$is_bot = preg_match(
    "~(Google|Yahoo|Rambler|Bot|Yandex|Spider|Snoopy|Crawler|Finder|Mail|curl)~i",
    $_SERVER['HTTP_USER_AGENT']
);
if($_SERVER['REMOTE_ADDR']) {
    $geo = !$is_bot ? json_decode(file_get_contents('https://api.sypexgeo.net/json/'.$_SERVER['REMOTE_ADDR'])) : [];
}
if($geo && $geo->city && $geo->city->name_ru != '') {
    echo $geo->city->name_ru;
} else {
    echo 'error';
}