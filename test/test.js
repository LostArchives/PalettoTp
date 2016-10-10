"use strict";

var PalettoTestCase = TestCase("PalettoTestCase");

var eng=new Engine();

PalettoTestCase.prototype.testStory1 = function () {

    eng.start_the_game();
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

    eng.rotate_clockwise(1); //Rotation du sous-plateau 1

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
    eng.rotate_anticlockwise(1);   //Rotation anti-horaire eud premier sous-plateau

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

    eng.place_ball("white","b1");
    eng.rotate_clockwise(1);

    eng.place_ball("black","a2");
    eng.rotate_anticlockwise(1);


    eng.place_ball("white","c1");
    eng.rotate_clockwise(1);

    eng.place_ball("black","a3");
    eng.rotate_anticlockwise(1);

    eng.place_ball("white","d1");
    eng.rotate_anticlockwise(2);

    eng.place_ball("black","f3");
    eng.rotate_clockwise(2);



    if (
        eng.check_nb_balls(8)
        &&eng.check_ball("white","a1") &&eng.check_ball("white","b1")
        &&(eng.check_ball("white","c1"))&&(eng.check_ball("white","d1"))
        &&(eng.check_ball("black","a3"))&&(eng.check_ball("black","b3"))
        &&(eng.check_ball("black","c3"))&&(eng.check_ball("black","d3"))
    )
    {
        testVerif = true;
    }
    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory11 = function () {

    var testVerif=false;
    eng.place_ball("white","e1");

    if (eng.check_win_line()==="white")
    {
        testVerif = true;
    }
    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory12 = function () {

    var testVerif=false;
    eng.start_the_game();
    eng.set_start_player("black");
    eng.play_turn_list("c4cbl;d4abr;c3ctl;c3ctl;c4cbl;e5cbr;b1ctl;b2ctr;c4cbl;c3");
    eng.show_board();
    if (eng.check_win_diag("left")=="black")
        testVerif=true;

    assertTrue(testVerif===true);


};

PalettoTestCase.prototype.testStory13 = function () {

    var testVerif=false;
    eng.start_the_game();
    eng.set_start_player("black");

    if (eng.check_player_color("black")&&eng.check_nb_balls(0))
        testVerif = true;

    assertTrue(testVerif===true);


};
