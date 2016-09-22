'use strict';

var PalettoTestCase = TestCase("PalettoTestCase");

var eng=new Engine();

PalettoTestCase.prototype.testStory1 = function () {

    assertTrue(eng.checkPlateau()==true);
};

PalettoTestCase.prototype.testStory2 = function () {

    eng.startTheGame(); //On démarre le jeu
    assertTrue(eng.checkStartGame()==true);
    //test commit
};

PalettoTestCase.prototype.testStory3 = function () {

    eng.placeBille(-1,"a1"); //On place une bille noire en A1
    assertTrue(eng.checkBille(-1,"a1")==true);

};

PalettoTestCase.prototype.testStory4 = function () {

    assertTrue(eng.checkNbBilles(1)==true);

};

PalettoTestCase.prototype.testStory5 = function () {

    eng.baseRotate(1); //Rotation du sous-plateau 1
    assertTrue(eng.checkBille(-1,"c1")==true);

};

PalettoTestCase.prototype.testStory6 = function () {

    eng.nextTurn(); //Lancement du prochain tour
    assertTrue(eng.checkJoueurActuel("n")==true);

};