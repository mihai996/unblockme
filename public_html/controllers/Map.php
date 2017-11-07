<?php


function getMap($n = 1)
{
    $file = APP_PATH . "/maps/map" . (1000 + $n) . ".php";
    if (file_exists($file)) {
        include $file;
    } else {
        $file = APP_PATH . "/maps/map1001.php";
        include $file;
    }
    return isset($m) ? json_encode($m) : '0';
}

function maps()
{
    $count = 1;
    $check_next = true;
    while ($check_next) {
        if (file_exists(APP_PATH . "/maps/map" . (1000 + $count) . ".php")) {
            $count++;
        } else {
            $check_next = false;
        }
    }
    return $count;
}


?>