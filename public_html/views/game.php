<?php
if(!empty($_GET['game']) && $_GET['game'] == 'new'){
	session_destroy();
	session_start();
}
 ?>

<!DOCTYPE html>
<html>
<head>
	<title>Map <?php echo $map ?> | Unblock me!</title>
	<meta name="viewport" content="width=500, initial-scale=0.7, maximum-scale=0.7">
	<link rel="stylesheet" type="text/css" href="/css/style.css">
	<script src="/js/jquery-3.2.0.min.js"></script>
</head>
<body>
	<div class="body">
		<div class="main">
			<input type="hidden" id="map_id" value='<?php echo $map; ?>'>
			<input type="hidden" id="blocks" value='<?php echo getMap($map); ?>'>
			<a href="/"><div class="title"><i>Unblock me!</i></div></a>
			<div class="menu">
				<a href="/"><div class="item">MENU</div></a>
			</div>

			<div class="game">
				<div class="destination"></div>
			</div>

			<div class="buttons">
				<button type='button' id="refreshGame">Start again</button>
			</div>
			<div><pre id="debug"></pre></div>
		</div>
	</div>
	<script src="/js/game.js"></script>
</body>
</html>