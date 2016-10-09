"use strict";

var PalettoTestCase = TestCase("PalettoTestCase");

var eng=new Engine();


PalettoTestCase.prototype.testStory1 = function () {

    eng.create_board();
    assertTrue(eng.check_board()===true);
};

PalettoTestCase.prototype.testStory2 = function () {
    eng.start_the_game();
    assertTrue(eng.check_start_game()===true);

};

PalettoTestCase.prototype.testStory3 = function () {

    eng.place_ball(-1,"a1"); //On place une bille blanche en A1
    assertTrue(eng.check_ball(-1,"a1")===true);

};

PalettoTestCase.prototype.testStory4 = function () {

    assertTrue(eng.check_nb_balls(1)===true);

};

PalettoTestCase.prototype.testStory5 = function () {

    eng.rotate_clockwise(1); //Rotation du sous-plateau 1
    assertTrue(eng.check_ball(-1,"c1")===true);

};

PalettoTestCase.prototype.testStory6 = function () {

    eng.next_turn(); //Lancement du prochain tour
    assertTrue(eng.check_actual_player("n")===true);

};

PalettoTestCase.prototype.testStory7 = function () {

    var testVerif=false;
    eng.place_ball(1,"a1");       //On place une bille noire en A1

    if (eng.check_ball(1,"a1")&&eng.check_nb_balls(2)) {
        testVerif=true;
    }


    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory8 = function () {

    var testVerif=false;
    eng.rotate_anticlockwise(1);   //Rotation anti-horaire eud premier sous-plateau

    if (eng.check_ball(-1,"a1")&&eng.check_ball(1,"a3")) {
        testVerif=true;
    }


    assertTrue(testVerif===true);

};

PalettoTestCase.prototype.testStory9 = function () {

    var testVerif=false;

    try {
        eng.place_ball(-1, "a3");   //On essaye de placer une bille blanche en a3
    }
    catch(e) {

        console.log(e);
        testVerif=true;        //Le test ne passe pas
    }

    assertTrue(testVerif===true);

};
