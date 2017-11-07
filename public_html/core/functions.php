<?php

function qwe($r)
{
    echo "<pre>";
    var_dump($r);
    echo "</pre>";
}


function loadView($view, $data)
{

    if (@count($data) > 0) {
        extract($data, EXTR_OVERWRITE);
    }

    ob_start();

    include_once(APP_PATH . '/views/' . $view);

    $content = ob_get_contents();

    ob_end_clean();

    echo $content;
}

?>