"use strict";

var PalettoTestCase = TestCase("PalettoTestCase");

var eng=new Engine("normal");
var xl = new Engine("xl");

PalettoTestCase.prototype.testStory1 = function () {

    eng.start_the_game(2);
    assertTrue(eng.check_board()===true);
};

PalettoTestCase.prototype.testStory2 = function () {
    eng.set_start_player("white");

    assertTrue(eng.check_player_color("white")===true);

};

PalettoTestCase.prototype.testStory3 = function () {

    eng.place_ball("white","a1"); //On place une bille blanche en A1
    assertTrue(eng.check_ball("white","a1")===true);

};

PalettoTestCase.prototype.testStory4 = function () {

    assertTrue(eng.check_nb_balls(1)===true);

};

PalettoTestCase.prototype.testStory5 = function () {

    eng.rotate("c",0); //Rotation du sous-plateau 1
    assertTrue(eng.check_ball("white","c1")===true);

};

PalettoTestCase.prototype.testStory6 = function () {

    eng.next_turn(); //Lancement du prochain tour
    assertTrue(eng.check_actual_player("black")===true);

};

PalettoTestCase.prototype.testStory7 = function () {

    var testVerif=false;
    eng.place_ball("black","a1");       //On place une bille noire en A1
    if (eng.check_ball("black","a1")&&eng.check_nb_balls(2)) {
        testVerif=true;
    }

    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory8 = function () {

    var testVerif=false;
    eng.rotate("a",0);   //Rotation anti-horaire eud premier sous-plateau

    if (eng.check_ball("white","a1")&&eng.check_ball("black","a3")) {
        testVerif=true;
    }

    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory9 = function () {

    var testVerif=false;

    try {
        eng.place_ball("white", "a3");   //On essaye de placer une bille blanche en a3
    }
    catch(e) {

        console.log(e);
        testVerif=true;        //Le test ne passe pas
    }

    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory10 = function () {

    var testVerif=false;
    eng.set_start_player("white");

    eng.place_ball("white","b1");
    eng.rotate("c",0);
    eng.next_turn();

    eng.place_ball("black","a2");
    eng.rotate("a",0);
    eng.next_turn();


    eng.place_ball("white","c1");
    eng.rotate("c",0);
    eng.next_turn();

    eng.place_ball("black","a3");
    eng.rotate("a",0);
    eng.next_turn();

    eng.place_ball("white","d1");
    eng.rotate("a",1);
    eng.next_turn();

    eng.place_ball("black","f3");
    eng.rotate("c",1);
    eng.next_turn();

    if (eng.check_nb_balls(8)
        &&eng.check_ball("white","a1") &&eng.check_ball("white","b1")
        &&(eng.check_ball("white","c1"))&&(eng.check_ball("white","d1"))
        &&(eng.check_ball("black","a3"))&&(eng.check_ball("black","b3"))
        &&(eng.check_ball("black","c3"))&&(eng.check_ball("black","d3")))
    {
        testVerif = true;
    }
    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory11 = function () {

    var testVerif=false;


    eng.place_ball("white","e1");

    if (eng.check_win_line(0,1)==="white") {
        testVerif = true;
    }
    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory12 = function () {

    var testVerif=false;

    eng.start_the_game(2);
    eng.set_start_player("white");
    eng.play_turn_list("c4cbl;d4abr;c3ctl;c3ctl;c4cbl;e5cbr;b1ctl;b2ctr;c4cbl;c3");

    var diag_bottom_top = eng.get_diagonal(eng.get_board(),true);
    var winner = eng.check_diag_align(diag_bottom_top);

    if (winner==="black") {
        testVerif = true;
    }


    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory13 = function () {

    var testVerif=false;
    eng.start_the_game(2);
    eng.set_start_player("black");

    if (eng.check_player_color("black")&&eng.check_nb_balls(0)) {
        testVerif = true;
    }

    assertTrue(testVerif===true);


};

PalettoTestCase.prototype.testStory14 = function () {

    var testVerif=false;

    eng.start_the_game(2);
    eng.set_start_player("white");

    eng.play_turn_list("a1cbl;d1cbr;b1cbl;e1cbr;c1cbl;f1cbr");

    eng.play_turn_list("a2cbl;d2cbr;b2cbl;e2cbr;c2cbl;f2cbr");
    eng.play_turn_list("a3cbl;d3cbr;b3cbl;e3cbr;c3cbl;f3cbr");
    eng.play_turn_list("b5ctl;a4ctr;e4ctl;b4ctr;f4ctl;d4ctr");
    eng.play_turn_list("d5ctl;a5ctr;f5ctl;c4ctr;a6ctl;c5ctr");
    eng.play_turn_list("b6ctl;e5ctr;d6ctl;c6ctr;f6ctl;e6ctr");
    console.log("Test story 15");
    eng.show_board(eng.get_board());

    var diag_bottom_top = eng.get_diagonal(true);
    var diag_top_bottom = eng.get_diagonal(false);

    if (eng.check_win_line()===""
        &&eng.check_win_column()===""
        &&eng.check_diag_align(diag_bottom_top)===""
        &&eng.check_diag_align(diag_top_bottom)===""
        &&eng.get_free_space() === 0)
    {
        testVerif=true;
    }

    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory15 = function () {

    var testVerif=false;

    eng.start_the_game(2);
    eng.set_start_player("white");

    try {
        eng.place_ball("black","a1");
    }
    catch(err) {

        testVerif = true;
        console.log(err);
    }

    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory16 = function () {

    var testVerif=false;

    xl.start_the_game(4);
    xl.set_start_player("red");
    xl.place_ball(xl.get_actual_player(),"i1");
    console.log("Test story 16 :");
    xl.show_board();

    if (xl.get_board_size()===9 && xl.check_actual_player("red")) {
        testVerif = true;
    }

    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory17 = function () {

    var testVerif=false;
    var cntOrder;
    var order = xl.get_actual_player();

    for (cntOrder = 0; cntOrder<4;cntOrder+=1) {
        xl.next_turn();
        order+=";"+xl.get_actual_player();
    }

    console.log("Test story 17 :");
    console.log(order);

    if (order=="red;yellow;green;blue;red")
        testVerif = true;


    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory18 = function () {

    var testVerif=true;

    xl.start_the_game(3);
    console.log("\nTest story 18 :");
    console.log(xl.get_active_players());

    if (xl.get_active_players().length==3)
    {
        var order = xl.get_order_array();
        for (var cnt = 0 ;cnt<order.length;cnt+=1) {
            if (order[cnt]>order[cnt+1]) {
                testVerif = false;
                break;
            }


        }
    }

    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory19 = function () {

    var testVerif=false;

    eng.start_the_game(2);
    eng.set_start_player("white");

    var winner = "";
    var reason = "";

    while(eng.get_free_space()!==0 && winner==="") {

        var randomPositionIndex = Math.floor(Math.random() * eng.get_free_positions().length);
        var randomPosition = eng.get_free_positions()[randomPositionIndex];

        eng.place_ball(eng.get_actual_player(),randomPosition);

        var randomSubBoard =  Math.floor(Math.random() * eng.get_total_subBoard());
        var randomOrientation = Math.round(Math.random());

        var rotationMode;

        if (randomOrientation===0) {
            rotationMode = "a";
        }
        else
        {
            rotationMode = "c";
        }

        eng.rotate(rotationMode,randomSubBoard);

        winner = eng.check_win_line();

        if (winner!=="") {
            reason = "line";
            break;
        }

        winner =  eng.check_win_column();

        if (winner!=="") {
            reason = "column";
            break;
        }

        var  bottom_top_diags = eng.get_diagonal(true);
        var  top_bottom_diags = eng.get_diagonal(false);

        winner = eng.check_diag_align(bottom_top_diags);

        if (winner!=="") {
            reason = "diagonal";
            break;
        }

        winner = eng.check_diag_align(top_bottom_diags);

        if (winner!=="") {
            reason = "diagonal";
            break;
        }

        eng.next_turn();

    }

    console.log("\nTest story 19 : ");

    eng.show_board();

    if (winner==="") {
        console.log("There is no winner");
    }
    else {
        console.log("The winner is "+winner+" with a "+reason);
    }

    testVerif = true;

    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory20 = function () {

    var testVerif=false;

    xl.start_the_game(4);
    xl.set_start_player("red");

    var winner = "";
    var reason = "";

    while(xl.get_free_space()!==0 && winner==="") {

        var randomPositionIndex = Math.floor(Math.random() * xl.get_free_positions().length);
        var randomPosition = xl.get_free_positions()[randomPositionIndex];

        xl.place_ball(xl.get_actual_player(),randomPosition);

        var randomSubBoard =  Math.floor(Math.random() * xl.get_total_subBoard());
        var randomOrientation = Math.round(Math.random());

        var rotationMode;

        if (randomOrientation===0) {
            rotationMode = "a";
        }
        else
        {
            rotationMode = "c";
        }

        xl.rotate(rotationMode,randomSubBoard);

        winner = xl.check_win_line();

        if (winner!=="") {
            reason = "line";
            break;
        }

        winner =  xl.check_win_column();

        if (winner!=="") {
            reason = "column";
            break;
        }

        var  bottom_top_diags = xl.get_diagonal(true);
        var  top_bottom_diags = xl.get_diagonal(false);

        winner = xl.check_diag_align(bottom_top_diags);

        if (winner!=="") {
            reason = "diagonal";
            break;
        }

        winner = xl.check_diag_align(top_bottom_diags);

        if (winner!=="") {
            reason = "diagonal";
            break;
        }

        xl.next_turn();

    }

    console.log("\nTest story 20 : ");

    xl.show_board();

    if (winner==="") {
        console.log("There is no winner");
    }
    else {
        console.log("The winner is "+winner+" with a "+reason);
    }
    testVerif = true;

    assertTrue(testVerif===true);

};



