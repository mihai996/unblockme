$(document).ready(function () {
    var pixel_diff = 30;
    var isDown = false;
    var mouseMovePosition = {x: '', y: ''};
    var mouseDownPosition = {x: '', y: ''};
    var diff_position = {x: '', y: ''};
    var rel_position_init = {x: '', y: ''};
    var rel_position_curr = {x: '', y: ''};
    var clickedBlock = {id: '', elem: ''};
    var block_id_int = '';
    var block_type = '';

    var map = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];


    var blocks;
    var response;
    var init_map;
    var init_blocks;

    response = $('#blocks').val();
    var map_id = parseInt($('#map_id').val());

    blocks = JSON.parse(response);
    init_map = JSON.parse(JSON.stringify(map));
    init_blocks = JSON.parse(JSON.stringify(blocks));

    drawMap();


    function eMouseDown(e) {
        var id_patt = /^block../;
        if (id_patt.test($(this).attr('id'))) {
            isDown = true;

            clickedBlock.elem = $(this);
            clickedBlock.id = clickedBlock.elem.attr('id');
            if (e.type == 'touchstart') {
                mouseDownPosition.x = e.touches[0].clientX;
                mouseDownPosition.y = e.touches[0].clientY;
                mouseMovePosition.x = e.touches[0].clientX;
                mouseMovePosition.y = e.touches[0].clientY;
            } else {
                mouseDownPosition.x = e.clientX;
                mouseDownPosition.y = e.clientY;
                mouseMovePosition.x = e.clientX;
                mouseMovePosition.y = e.clientY;
            }
            rel_position_init.x = clickedBlock.elem.position().left;
            rel_position_init.y = clickedBlock.elem.position().top;

            block_id_int = parseInt(clickedBlock.id.substr(5, 2));
            block_type = blocks[parseInt(clickedBlock.id.substr(5, 2))].type;

            rel_position_curr.x = clickedBlock.elem.position().left;
            rel_position_curr.y = clickedBlock.elem.position().top;
        } else {
            isDown = false;
        }
    }

    function eMouseUp() {

        emptyVars();
        isDown = false;
        if (blocks[0].x == 4) {
            $.ajax({
                url: '/save_game',
                type: 'POST',
                data: {save_game: 1 + map_id}
            });
            alert('Congratulation!');
            window.location = '/game/' + (1 + map_id);
        }
    }

    function eMouseMove(e) {
        //e.stopPropagation();
        //e.preventDefault();
        debug();

        if (isDown) {

            if (e.type == 'touchmove') {
                mouseMovePosition.x = e.touches[0].clientX;
                mouseMovePosition.y = e.touches[0].clientY;
            } else {
                mouseMovePosition.x = e.clientX;
                mouseMovePosition.y = e.clientY;
            }

            rel_position_curr.x = clickedBlock.elem.position().left;
            rel_position_curr.y = clickedBlock.elem.position().top;

            diff_position.x = mouseMovePosition.x - mouseDownPosition.x;
            diff_position.y = mouseMovePosition.y - mouseDownPosition.y;


            if (block_type == 'horizontal') {
                moveHBlock();

            } else if (block_type == 'vertical') {
                moveVBlock();
            }
        }
    }

    $(document).on('mousedown', '.block', eMouseDown);
    $(document).on('touchstart', '.block', eMouseDown);
    document.addEventListener('mouseup', eMouseUp);
    document.addEventListener('touchend', eMouseUp);
    document.addEventListener('mousemove', eMouseMove);
    document.addEventListener('touchmove', eMouseMove);


    function checkMap(type) {
        debug();
        if (type == 'H') {
            if (diff_position.x > 0) { // to right
                var next_cell = blocks[block_id_int].x + blocks[block_id_int].len;
                if (next_cell <= 5
                    && map[blocks[block_id_int].y][next_cell] == 0
                ) {
                    return true;
                } else {
                    return false;
                }
            } else if (diff_position.x < 0) { // to left
                var next_cell = blocks[block_id_int].x - 1;
                if (next_cell >= 0
                    && map[blocks[block_id_int].y][next_cell] == 0
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        } else if (type == 'V') {
            if (diff_position.y > 0) { // down
                var next_cell = blocks[block_id_int].y + blocks[block_id_int].len;
                if (next_cell <= 5
                    && map[next_cell][blocks[block_id_int].x] == 0
                ) {
                    return true;
                } else {
                    return false;
                }
            } else if (diff_position.y < 0) { // up
                var next_cell = blocks[block_id_int].y - 1;
                if (next_cell >= 0
                    && map[next_cell][blocks[block_id_int].x] == 0
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    function moveHBlock() {
        debug();
        if (checkMap('H')) {
            var refresh = false;
            if (diff_position.x >= pixel_diff) { // to right
                map[blocks[block_id_int].y][blocks[block_id_int].x] = 0;
                map[blocks[block_id_int].y][blocks[block_id_int].x + blocks[block_id_int].len] = 1;
                blocks[block_id_int].x += 1;
                refresh = true;

            } else if (diff_position.x <= -1 * pixel_diff) { // to left
                map[blocks[block_id_int].y][blocks[block_id_int].x + blocks[block_id_int].len - 1] = 0;
                map[blocks[block_id_int].y][blocks[block_id_int].x - 1] = 1;
                blocks[block_id_int].x -= 1;
                refresh = true;
            }

            if (refresh) {
                mouseDownPosition.x = mouseMovePosition.x;
                mouseDownPosition.y = mouseMovePosition.y;
                refreshBlock();
            }

            //clickedBlock.elem.css('left', rel_position_init.x + diff_position.x);
            //clickedBlock.elem.css('left', rel_position_init.x + Math.floor(diff_position.x/10.0)*10 + 'px');
        }
    }

    function moveVBlock() {
        debug();
        if (checkMap('V')) {
            var refresh = false;
            if (diff_position.y >= pixel_diff) { // down
                map[blocks[block_id_int].y][blocks[block_id_int].x] = 0;
                map[blocks[block_id_int].y + blocks[block_id_int].len][blocks[block_id_int].x] = 1;
                blocks[block_id_int].y += 1;
                refresh = true;

            } else if (diff_position.y <= -1 * pixel_diff) { // up
                map[blocks[block_id_int].y + blocks[block_id_int].len - 1][blocks[block_id_int].x] = 0;
                map[blocks[block_id_int].y - 1][blocks[block_id_int].x] = 1;
                blocks[block_id_int].y -= 1;
                refresh = true;
            }

            if (refresh) {
                mouseDownPosition.x = mouseMovePosition.x;
                mouseDownPosition.y = mouseMovePosition.y;
                refreshBlock();
            }

            //clickedBlock.elem.css('top', rel_position_init.y + diff_position.y);
            //clickedBlock.elem.css('top', rel_position_init.y + (diff_position.y > 0 ? '70' : '-70') + 'px');
        }
    }

    function refreshBlock() {
        debug();

        if (blocks[block_id_int].type_short == 'h') {
            $('#' + clickedBlock.id).attr('class', 'block ' + blocks[block_id_int].type + ' ' + blocks[block_id_int].type_short + blocks[block_id_int].len + ' x' + blocks[block_id_int].x + ' y' + blocks[block_id_int].y);

        } else if (blocks[block_id_int].type_short == 'v') {
            $('#' + clickedBlock.id).attr('class', 'block ' + blocks[block_id_int].type + ' ' + blocks[block_id_int].type_short + blocks[block_id_int].len + ' x' + blocks[block_id_int].x + ' y' + blocks[block_id_int].y);
        }
    }


    function drawMap() {
        $('.game').html('<div class="destination"></div>');
        for (var i = 0; i < blocks.length; i++) {
            var blockClass = ' ' + blocks[i].type + ' ' + blocks[i].type_short + blocks[i].len + ' x' + blocks[i].x + ' y' + blocks[i].y;
            $('.game').append('<div id="' + blocks[i].id + '" class="block ' + blockClass + ' "> </div>');

            if (blocks[i].type_short == 'h') {
                for (var j = blocks[i].x; j < blocks[i].x + blocks[i].len; j++) {
                    map[blocks[i].y][j] = 1;
                }
            } else {
                for (var j = blocks[i].y; j < blocks[i].y + blocks[i].len; j++) {
                    map[j][blocks[i].x] = 1;
                }
            }
        }
        debug();
    }

    function refreshGame() {
        map = [];
        map = JSON.parse(JSON.stringify(init_map));
        blocks = [];
        blocks = JSON.parse(JSON.stringify(init_blocks));
        emptyVars();
        $('.game').html('<div class="destination"></div>');
        debug();
        drawMap();
    }

    $(document).on('click', '#refreshGame', function () {
        refreshGame();
    });

    function emptyVars() {
        isDown = false;
        mouseMovePosition = {x: '', y: ''};
        mouseDownPosition = {x: '', y: ''};
        diff_position = {x: '', y: ''};
        rel_position_init = {x: '', y: ''};
        rel_position_curr = {x: '', y: ''};
        clickedBlock = {id: '', elem: ''};
        block_id_int = '';
        block_type = '';
    }

    function debug() {
        // --for debug:
        return;
        var a = '';
        for (var i = 0; i < map.length; i++) {
            a += map[i] + "\r\n";
        }
        a += "\r\n\r\n";
        for (var i = 0; i < blocks.length; i++) {
            a += '' + 'id: ' + blocks[i].id + '  type_short: ' + blocks[i].type_short + '  len: ' + blocks[i].len + '  x: ' + blocks[i].x + '  y: ' + blocks[i].y + "\r\n";
        }
        a += "\r\n\r\nisDown: " + isDown;
        a += "\r\n\r\nblock: " + block_id_int;

        $('#debug').text(a);
        // --end
    }

});