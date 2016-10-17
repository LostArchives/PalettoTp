"use strict";

var Engine = function(type) {

// private attributes and methods
    var _game_board;
    var _total_balls;
    var _actual_player;
    var _board_size;
    var _sub_board_size;
    var _sub_board_per_line;
    var _total_subBoard;
    var _free_space;
    var _free_positions;
    var _player_colors;
    var _active_players;
    var nb_players;


    function get_column_ascii  (column_position) {
        return column_position.charCodeAt(0) - 97;
    }


     function get_line_ascii (line_position) {
        return line_position.charCodeAt(1) - 49;
    }

    function add_sub_boards() {

        var curr_line;
        var curr_column;

        for (curr_line =0;curr_line<_board_size;curr_line+=1) {
            _game_board[curr_line] = [];
            for (curr_column = 0;curr_column<_board_size;curr_column+=1) {
                _game_board[curr_line][curr_column]="empty";
            }
        }

    }

    function create_sub_board(nb_line) {

        var curr_line;
        var curr_column;
        var tmp_board = [];
        for (curr_line =0;curr_line<nb_line;curr_line+=1) {
            tmp_board[curr_line] = [];
            for (curr_column = 0;curr_column<nb_line;curr_column+=1) {
                tmp_board[curr_line][curr_column]="empty";
            }
        }

        return tmp_board;
    }


    function get_sub_board (num_sub_board) {

        var start_line = Math.floor(num_sub_board / _sub_board_per_line)*_sub_board_size;
        var start_column = (num_sub_board % _sub_board_per_line)*_sub_board_size;
        var curr_line; var curr_column;
        var curr_tmp_line = 0;  var curr_tmp_column = 0;
        var tmp_board = create_sub_board(3);
        for (curr_line = start_line; curr_line < start_line + 3; curr_line+=1) {
            for (curr_column = start_column; curr_column < start_column + 3; curr_column+=1) {
                tmp_board[curr_tmp_line][curr_tmp_column] = _game_board[curr_line][curr_column];
                curr_tmp_column+=1;
            }
            curr_tmp_line+=1;
            curr_tmp_column=0;
        }
        return tmp_board;
    }

    function copy_tmp_board(num_sub_board, tmp_board) {

        var start_line = Math.floor(num_sub_board / _sub_board_per_line)*_sub_board_size;
        var start_column = (num_sub_board % _sub_board_per_line)*_sub_board_size;
        var curr_line; var curr_column;
        var curr_sb_line = 0; var curr_sb_column = 0;

        for (curr_line = start_line; curr_line < start_line + 3; curr_line += 1) {
            for (curr_column = start_column; curr_column < start_column + 3; curr_column += 1) {
                _game_board[curr_line][curr_column] = tmp_board[curr_sb_line][curr_sb_column];
                curr_sb_column+=1;
        }
                curr_sb_line+=1;
                curr_sb_column = 0;
        }

    }

    function get_subboard_w_action_code(action_code) {
        var num = -1;
        switch(action_code) {

            case "tl":
                num = 0;
                break;
            case "tr":
                num = 1;
                break;
            case "bl":
                num = 2;
                break;
            case "br":
                num = 3;
                break;
        }
        return num;
    }

    function init_all_size() {
        switch(type) {

            case "normal":
                _sub_board_per_line = 2;
                _board_size = 6;
                _total_subBoard = 4;
                break;
            case "xl":
                _sub_board_per_line = 3;
                _board_size = 9;
                _total_subBoard = 9;
                break;

        }
        _sub_board_size = 3;

    }

    function init_players_colors() {
        switch(type) {
            case "normal":
            _player_colors = ["black","white"];
                break;
            case "xl":
                _player_colors = ["red","yellow","green","blue"];
                break;
        }

    }

    function get_player_index(color) {

        var cntPlayer;
        for (cntPlayer = 0 ; cntPlayer < _active_players.length;cntPlayer+=1) {
            if (color==_active_players[cntPlayer]) {
                return cntPlayer;
            }
        }

        return  -1;
    }

    function init_active_players() {

        if (type=="xl")
        {
            if (nb_players==3) {

            _active_players = new Array();
            random_player_color();
            }
            else
            {
                _active_players = _player_colors;
            }
        }
        else
        {
            _active_players = _player_colors;
        }
    }

    function random_player_color() {

        var cntPlayer;
        var color;
        var index;
        for (cntPlayer = 0; cntPlayer < 3; cntPlayer += 1) {

                do {
                    color = Math.floor(Math.random() * _player_colors.length);
                    index = _active_players.indexOf(_player_colors[color]);

                } while (index!=-1)

            _active_players[cntPlayer] = _player_colors[color];

        }
        reorder_player();
    }


    function reorder_player() {
        var todelete = -1;
        var cntcolor;
        for (cntcolor = 0 ;cntcolor< 3;cntcolor+=1) {
            var index =  _active_players.indexOf(_player_colors[cntcolor]);
            if (index==-1) {
                todelete = cntcolor;
                break;
            }

        }
        delete_color_not_in(todelete);

    }

    function copy_color() {
        var arr = new Array();
        var cnt_color
        for (cnt_color=0;cnt_color<_player_colors.length;cnt_color++) {
            arr[cnt_color]=_player_colors[cnt_color];
        }
        return arr;
    }

    function delete_color_not_in(index) {
        var temp = copy_color();
        _player_colors.splice(index,1);
        _active_players = _player_colors;
        _player_colors = temp;
    }



    function update_free_positions() {
        var cnt_line;
        var cnt_column;
        var global_cnt = 0;

        _free_positions = new Array();
        for (cnt_line = 0 ;cnt_line < _board_size ; cnt_line+=1) {
            for (cnt_column = 0 ; cnt_column < _board_size ; cnt_column+=1) {
                if (_game_board[cnt_line][cnt_column]=="empty") {
                    var letter = String.fromCharCode(97+cnt_column);
                    _free_positions[global_cnt] = letter+(cnt_line+1);
                    global_cnt++;
                }
            }

        }
    }



// public methods

    this.get_board = function() {
        return _game_board;
    }

    this.get_free_space = function() {
        return _free_space;
    }

    this.get_actual_player = function() {
        return _actual_player;
    }

    this.get_active_players = function() {
        return _active_players;
    }

    this.get_free_positions = function() {
        return _free_positions;
    }

    this.get_total_subBoard = function() {
        return _total_subBoard;
    }

    this.start_the_game = function(nbPlayer) {
        _game_board = [];
        _actual_player = "";
        _total_balls = 0;
        init_all_size();
        _free_space = _board_size*_board_size;
        nb_players = nbPlayer;
        init_players_colors();
        init_active_players();
        add_sub_boards();
        update_free_positions();
    }

    this.show_board = function() {

        var curr_line;
        var curr_column;
        var display = "\n";

        for (curr_line = 0;curr_line<_board_size;curr_line+=1) {
                for (curr_column = 0;curr_column<_board_size;curr_column+=1) {
                    display +=_game_board[curr_line][curr_column]+" ";
                }
                display+="\n";
        }

        console.log(display);
    }

    this.get_board_size = function() {
        return _board_size;
    }


    this.set_start_player = function (start_player_color) {

        if (get_player_index(start_player_color)!=-1) {
            _actual_player = start_player_color;
        }
        else {
            throw "Ce joueur n'existe pas";
        }

    }

    this.check_board = function () {

        var curr_line;
        var curr_column;

        for (curr_line = 0; curr_line < _board_size; curr_line+=1) {
            for (curr_column = 0; curr_column < _board_size; curr_column+=1) {
                if (_game_board[curr_line][curr_column] !== "empty") {
                    return false;
                }
            }
        }

        return true;

    }

    this.check_player_color = function (player_color) {

        if (_actual_player === player_color) {
            return true;
        }
        else {
            return false;
        }

    }

    this.place_ball = function (color, position) {

        var line_pos = get_line_ascii(position);
        var column_pos = get_column_ascii(position);

        if (_game_board[line_pos][column_pos] != "empty") {
            throw "Emplacement déjà occupé par "+_game_board[line_pos][column_pos]+" en "+position;
        }

        if (color!=_actual_player) {
            throw "Impossible de placer une bille différente de la couleur du joueur";
        }

        _game_board[line_pos][column_pos] = color;
        _total_balls++;
        _free_space--;
        update_free_positions();

    }



    this.check_ball = function (color, position) {

        var column = get_column_ascii(position);
        var line = get_line_ascii(position);

        if (_game_board[line][column] === color) {
            return true;
        }
        else {
            return false;
        }


    }


    this.check_nb_balls = function (nb_balls) {

        if (_total_balls === nb_balls) {
            return true;
        }
        else {
            return false;
        }
    }


    this.check_actual_player = function (player) {

        if (_actual_player === player) {
            return true;
        }
        else {
            return false;
        }


    }


    this.rotate = function (mode, num_sub_board) {
        if (mode!=="") {
            var cur_line; var cur_column;
            var tmp_board = create_sub_board(3);
            var sub_board = get_sub_board(num_sub_board);
            for (cur_line = 0; cur_line < 3; cur_line+=1) {
                for (cur_column = 0; cur_column < 3; cur_column+=1) {
                    if (mode==="c") {
                        tmp_board[cur_line][cur_column] = sub_board[3 - cur_column - 1][cur_line];
                    }
                    else if (mode==="a") {
                        tmp_board[cur_line][cur_column] = sub_board[cur_column][3 - cur_line - 1];
                    }
                }
            }
            copy_tmp_board(num_sub_board, tmp_board);
        }
        update_free_positions();
    }


   this.next_turn = function () {

       var nextIndex = get_player_index(_actual_player)+1;
       if (nextIndex>_active_players.length-1) {
           nextIndex = 0;
       }

       _actual_player = _active_players[nextIndex];

    }

    this.check_win_line = function () {
        var nb_align; var cur_line; var cur_column;

        for (cur_line = 0;cur_line<_board_size;cur_line+=1) {
            nb_align=1;
            for (cur_column = 0;cur_column <_board_size-1;cur_column+=1) {
                if (_game_board[cur_line][cur_column]!="empty")
                if (_game_board[cur_line][cur_column] ===_game_board[cur_line][cur_column+1]) {

                    nb_align+=1;
                    if (nb_align===5) {
                        return _game_board[cur_line][cur_column];
                    }
                }
                else {
                    nb_align=1;
                }
            }
        }
        return "";
    }

    this.check_win_column = function () {
        var nb_align; var curr_line; var curr_column;
        for (curr_column = 0;curr_column<6;curr_column+=1) {
            nb_align=1;
            for (curr_line = 0;curr_line <_board_size-1;curr_line+=1) {
                if (_game_board[curr_line][curr_column]!="empty")
                if (_game_board[curr_line][curr_column]===_game_board[curr_line+1][curr_column]) {
                    nb_align+=1;
                    if (nb_align===5) {
                        return _game_board[curr_line][curr_column];
                    }
                }
                else {
                    nb_align=1;
                }

            }
        }
        return "";
    }

    this.get_diagonal = function(bottomToTop) {
        var line_length = _game_board.length;
        var column_length = _game_board[0].length;
        var max_length = Math.max(column_length, line_length);
        var temp_array = new Array();
        var diag_array = new Array();
        for (var diag_cnt = 0; diag_cnt <= 2 * (max_length - 1); diag_cnt++) {
            temp_array = new Array();
            for (var diag_line = line_length - 1; diag_line >= 0; diag_line--) {
                var diag_column = diag_cnt - (bottomToTop ? line_length - diag_line : diag_line);
                if (diag_column >= 0 && diag_column < column_length) {
                    var toPush = _game_board[diag_line][diag_column];

                    if (bottomToTop && diag_column!=0 && diag_line!=0) {
                        toPush+=";";
                    }
                    if (!bottomToTop && diag_line!=0 && diag_column!=column_length-1) {
                        toPush+=";";
                    }

                    temp_array.push(toPush);
                }
            }
            if(temp_array.length > 0) {
                diag_array.push(temp_array.join(''));
            }
        }
        return diag_array;
    }

    this.check_diag_align = function(arr) {

        var cnt_diag;

        for (cnt_diag = 0 ;cnt_diag<arr.length;cnt_diag++) {

            var diag = arr[cnt_diag].split(";");
            var cnt_color;
            var nb_align = 1;
            if (diag.length>=5) {

                for (cnt_color = 0 ; cnt_color<diag.length-1;cnt_color++) {
                    if (diag[cnt_color]!="empty") {
                        if (diag[cnt_color]==diag[cnt_color+1])
                            nb_align++;
                        else
                            nb_align = 1;

                        if (nb_align==5)
                            return diag[cnt_color];
                    }

                }

            }


        }
        return "";
    }


    this.play_turn_list = function (action_text) {

        var action_list = action_text.split(";");
        var action_count; var ball_position; var rotate_mode; var num_sub_board_code;

        for (action_count =0;action_count<action_list.length;action_count+=1) {
            ball_position = action_list[action_count].substring(0,2);
            rotate_mode = action_list[action_count].substring(2,3);
            num_sub_board_code = action_list[action_count].substring(3,5);
            this.place_ball(_actual_player,ball_position);
            this.rotate(rotate_mode,get_subboard_w_action_code(num_sub_board_code));
            this.next_turn();
        }
    };

    this.get_order_array = function() {
        var order_arr = new Array();

        for (var cnt = 0 ;cnt<3;cnt+=1) {
            order_arr[cnt]= _player_colors.indexOf(_active_players[cnt]);
        }

        return order_arr;
    }

}
