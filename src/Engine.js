"use strict";

var Engine = function() {

// private attributes and methods
    var _game_board;
    var _total_balls;
    var _actual_player;

    function get_column_ascii  (column_position) {
        return column_position.charCodeAt(0) - 97;
    }


     function get_line_ascii (line_position) {
        return line_position.charCodeAt(1) - 49;
    }

    function add_sub_boards(nb_line) {

        var curr_line;
        var curr_column;

        for (curr_line =0;curr_line<nb_line;curr_line+=1) {
            _game_board[curr_line] = new Array();
            for (curr_column = 0;curr_column<6;curr_column+=1) {
                _game_board[curr_line][curr_column]="empty";
            }
        }

    }



    function create_sub_board(nb_line) {

        var curr_line;
        var curr_column;
        var tmp_board = new Array();
        for (curr_line =0;curr_line<nb_line;curr_line+=1) {
            tmp_board[curr_line] = new Array();
            for (curr_column = 0;curr_column<nb_line;curr_column+=1) {
                tmp_board[curr_line][curr_column]="empty";
            }
        }

        return tmp_board;
    }



    function get_start_column_sub_board (num_sub_board) {

        var start_column = -1;

        switch (num_sub_board) {

            case 1:
            case 3:
                start_column = 0;
                break;

            case 2:
            case 4:
                start_column = 3;
                break;

        }
        return start_column;

    }

    function get_start_line_sub_board(numb_sub_board) {

        var start_line = -1;

        switch (numb_sub_board) {

            case 1:
            case 2:
                start_line = 0;
                break;

            case 3:
            case 4:
                start_line = 3;
                break;

        }
        return start_line;
    }

    function get_sub_board (num_sub_board) {

        var start_line = get_start_line_sub_board(num_sub_board);
        var start_column = get_start_column_sub_board(num_sub_board);
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

    function copy_tmp_board(numPlateau, tmp_board) {

        var startColumn = get_start_column_sub_board(numPlateau);
        var startLine = get_start_line_sub_board(numPlateau);
        var curr_line; var curr_column;
        var curr_sb_line = 0; var curr_sb_column = 0;

        for (curr_line = startLine; curr_line < startLine + 3; curr_line += 1) {
            for (curr_column = startColumn; curr_column < startColumn + 3; curr_column += 1) {
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
                num = 1;
                break;
            case "tr":
                num = 2;
                break;
            case "bl":
                num = 3;
                break;
            case "br":
                num = 4;
                break;
        }
        return num;
    }

// public methods

    this.start_the_game = function() {
        _game_board = new Array();
        _total_balls = 0;
        add_sub_boards(6);
    }

    this.show_board = function() {

        var curr_line;

        for (curr_line = 0;curr_line<6;curr_line+=1) {

                console.log(_game_board[curr_line][0]+" "+_game_board[curr_line][1]+" "+
                            _game_board[curr_line][2]+" "+_game_board[curr_line][3]+" " +
                            _game_board[curr_line][4]+" "+_game_board[curr_line][5]);

        }
    }



    this.set_start_player = function (start_player_color) {
        _actual_player = start_player_color;
    };

    this.check_board = function () {

        var curr_line;
        var curr_column;

        for (curr_line = 0; curr_line < 6; curr_line+=1) {
            for (curr_column = 0; curr_column < 6; curr_column+=1) {
                if (_game_board[curr_line][curr_column] != "empty") {
                    return false;
                }
            }
        }

        return true;

    };

    this.check_player_color = function (player_color) {

        if (_actual_player === player_color) {
            return true;
        }
        else {
            return false;
        }

    };

    this.place_ball = function (color, position) {

        var line_to_place = get_line_ascii(position);
        var column_to_place = get_column_ascii(position);


        if (_game_board[line_to_place][column_to_place] != "empty") {
            throw "Emplacement déjà occupé par "+_game_board[line_to_place][column_to_place];
        }

        _game_board[line_to_place][column_to_place] = color;
        _total_balls+=1;
    };



    this.check_ball = function (color, position) {

        var column = get_column_ascii(position);
        var line = get_line_ascii(position);

        if (_game_board[line][column] === color) {
            return true;
        }
        else {
            return false;
        }


    };


    this.check_nb_balls = function (nb_balls) {

        if (_total_balls === nb_balls) {
            return true;
        }
        else {
            return false;
        }
    };


    this.check_actual_player = function (player) {

        if (_actual_player === player) {
            return true;
        }
        else {
            return false;
        }


    };


    this.rotate_clockwise = function (num_sub_board) {

        var curr_line; var curr_column;
        var tmp_board = create_sub_board(3);
        var sub_board = get_sub_board(num_sub_board);
        for (curr_line = 0; curr_line < 3; curr_line+=1) {
            for (curr_column = 0; curr_column < 3; curr_column+=1) {
                tmp_board[curr_line][curr_column] = sub_board[3 - curr_column - 1][curr_line];
            }
        }
        copy_tmp_board(num_sub_board, tmp_board);
    };


    this.rotate_anticlockwise = function (num_sub_board) {

        var curr_line;
        var curr_column;
        var tmp_board = create_sub_board(3);
        var sub_board = get_sub_board(num_sub_board);

        for (curr_line = 0; curr_line < 3; curr_line+=1) {
            for (curr_column = 0; curr_column < 3; curr_column+=1) {
                tmp_board[curr_line][curr_column] = sub_board[curr_column][3 - curr_line - 1];
            }
        }
        copy_tmp_board(num_sub_board, tmp_board);
    };



   this.next_turn = function () {
        if (_actual_player === "white") {
            _actual_player = "black";
        }
        else {
            _actual_player = "white";
        }

    };

    this.check_win_line = function () {
        var nb_align; var curr_line; var curr_column;
        for (curr_line = 0;curr_line<6;curr_line+=1) {
            nb_align=1;
            for (curr_column = 0;curr_column <6-1;curr_column+=1) {
                if (_game_board[curr_line][curr_column]===_game_board[curr_line][curr_column+1]) {
                    nb_align+=1;
                    if (nb_align===5)
                        return _game_board[curr_line][curr_column];
                }
                else
                    nb_align=0;
            }
        }
        return "";
    };

    this.check_win_diag = function (side_diagon) {
        var cur_diag; var size = 6; var nb_align = 1;
        for (cur_diag=0;cur_diag<size-1;cur_diag+=1) {
            if (side_diagon=="left") {
                if (_game_board[cur_diag][cur_diag]==_game_board[cur_diag+1][cur_diag+1]) {
                    nb_align+=1;
                    if (nb_align===5)
                        return _game_board[cur_diag][cur_diag];
                } else
                    nb_align = 0;
            } else  if (side_diagon=="right"){
                if (_game_board[cur_diag][size-cur_diag]==_game_board[cur_diag+1][size-cur_diag-1])
                    nb_align+=1;
                    if (nb_align===5)
                        return _game_board[cur_diag][cur_diag];
                else
                    nb_align =0;
            }
        }
        return "";
    }


    this.play_turn_list = function (action_text) {

        var action_list = action_text.split(";");

        for (var action_count =0;action_count<action_list.length;action_count+=1) {
            var ball_position = action_list[action_count].substring(0,2);
            var rotate_mode = action_list[action_count].substring(2,3);
            var num_sub_board_code = action_list[action_count].substring(3,5);
            this.place_ball(_actual_player,ball_position);
            if (rotate_mode=="c")
                this.rotate_clockwise(get_subboard_w_action_code(num_sub_board_code));
            else if (rotate_mode=="a")
                this.rotate_anticlockwise(get_subboard_w_action_code(num_sub_board_code));
        }
    }

}
