<?php
# http://myway4u.000webhostapp.com/
#01  Game name: "Unblock me"
#02  Game control: mouse (menu: click, game: drag and drop)
#03  
#
#04  Creator interface
#    	1. Create map from blocks
#05  BlockObj 
#		Attributes:
#		1. Type (R/W) (red - only one, wood - 0+) char
#		2. Length (1-3) int
#		3. Orientation (H/V) char
#		4. Positions (1-3) array, count(array) = Length
#		Actions:
#		1. Move: V - (up/down), H - (left/right)
#06  MapObj
#		1. height = width = 5 !
#		2. Exit at center of right margin
#07  Languages
#		1. Backend: php, MySQL
#		2. Static interface: HTML, CSS
#		3. Interaction: JavaScript
#08  Details:
#		1. Permissions in game: move block; restart map;
#		2. Timer; moves counter
#		3. Global events: `congrats, press here to start next map...`
#		4. Header menu: Main Menu
#09  Main menu:
#		1. Continue Game
#		2. New Game
#		3. View all maps and select one

session_start();

if (empty($_SESSION['last_game'])) {
    $_SESSION['last_game'] = 1;
}

require_once 'controllers/Router.php';
require_once 'controllers/Map.php';
require_once 'core/functions.php';

define('APP_PATH', getcwd());

$route = Router::getRoutesArray();

if (@count($route) == 0) {
    loadView('home.php', array());

} else if (@count($route) == 1) {
    if ($route[0] == 'save_game' && !empty($_POST['save_game'])) {
        $_SESSION['last_game'] = $_POST['save_game'];

    } else {
        loadView('home.php', array());
    }

} else if (@count($route) == 2) {

    if ($route[0] == 'game') {
        if ((int)$route[1] > 0 && (int)$route[1] < maps()) {
            loadView('game.php', array('map' => (int)$route[1]));
        } else {
            loadView('home.php', array('error' => 'Map ' . (int)$route[1] . ' is not created yet...'));
        }

    } else {
        loadView('home.php', array('error' => ''));
    }

} else {
    loadView('home.php', array());
}


?>
