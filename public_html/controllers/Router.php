<?php
class Router
{
    public static function getCurrentUri()
    {
        $basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
        $uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
        if (strstr($uri, '?')) {
            $uri = substr($uri, 0, strpos($uri, '?'));
        }
        $uri = '/' . trim($uri, '/');
        return $uri;
    }

    public static function getRoutesArray()
    {
        $base_url = self::getCurrentUri();
        $routes = array();
        $url_exploded = explode('/', $base_url);
        foreach ($url_exploded as $route) {
            if (trim($route) != '') {
                array_push($routes, ($route));
            }
        }
        return $routes;
    }
}
?>