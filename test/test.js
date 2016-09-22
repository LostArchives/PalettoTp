'use strict';

var PalettoTestCase = TestCase("PalettoTestCase");

var eng=new Engine();

PalettoTestCase.prototype.testStory1 = function () {

    assertTrue(eng.checkPlateau()==true);
};

PalettoTestCase.prototype.testStory2 = function () {

    eng.startTheGame(); //On démarre le jeu
    assertTrue(eng.checkStartGame()==true);

};

PalettoTestCase.prototype.testStory3 = function () {

    eng.placeBille(-1,"a1"); //On place une bille blanche en A1
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

PalettoTestCase.prototype.testStory7 = function () {

    var testVerif=false;
    eng.placeBille(1,"a1");       //On place une bille noire en A1

    if (eng.checkBille(1,"a1")&&eng.checkNbBilles(2)) //On vérifie que la bille est en A1 et qu'il y a deux billes sur le plateau
        testVerif=true;

    assertTrue(testVerif==true);

};

PalettoTestCase.prototype.testStory8 = function () {

    var testVerif=false;
    eng.baseRotateCounter(1);   //Rotation anti-horaire eud premier sous-plateau

    if (eng.checkBille(-1,"a1")&&eng.checkBille(1,"a3"))    //Si Bille blanche en A1 et bille noire en A3
        testVerif=true;

    assertTrue(testVerif==true);

};

PalettoTestCase.prototype.testStory9 = function () {

    var testVerif=true;

    try {
        eng.placeBille(-1, "a3");   //On essaye de placer une bille blanche en a3
    }
    catch(err) {

        //alert('erreur'+err); Affichage de l'erreur (optionnel)
        testVerif=false;        //Le test ne passe pas

    }


    assertTrue(testVerif==true);

};