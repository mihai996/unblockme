<!DOCTYPE html>
<html>
<head>
	<title>Unblock me!</title>
	<meta name="viewport" content="width=500, initial-scale=0.7, maximum-scale=0.7">
	<link rel="stylesheet" type="text/css" href="/css/style.css">
	<script src="/js/jquery-3.2.0.min.js"></script>
	<script src="/js/index.js"></script>
</head>
<body>
	<div class="body">
		<div class="main">
			<a href="/"><div class="title"><i>Unblock me!</i></div></a>
			<div class="text error"><?php echo !empty($error) ? $error : ''; ?></div>
			<div class="menu">
				<?php $maps_count = maps(); ?>
				<?php if (!empty($_SESSION['last_game']) && $_SESSION['last_game'] < $maps_count && $_SESSION['last_game'] > 1) { ?>
					<a href="/game/<?php echo $_SESSION['last_game'] ?>">
						<div class="item">Continue</div>
					</a>
				<?php } ?>
				<a href="/game/1?game=new"><div class="item">New Game</div></a>
				<div id="all_maps_btn" class="item">Maps</div>
			</div>
			<div class="all_maps" style="display: none;">
				<ul>
					<?php for ($i = 1; $i < $maps_count; $i++) {
						if (!empty($_SESSION['last_game']) && $_SESSION['last_game'] >= $i) {
							echo '<a href="/game/' . $i . '"><li style=" background-image: url(/img/map' . (1000 + $i) . '.png)"></li></a>';
						} else {
							echo '<li style="opacity: 0.5; background-image: url(/img/map' . (1000 + $i) . '.png)"></li>';
						}
					} ?>
				</ul>
			</div>
		</div>
	</div>
</body>
</html>