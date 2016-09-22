'use strict';

var Engine = function () {

// private attributes and methods
    var _plateau; //Plateau de jeu (tableau de 6*6 emplacements)
    var _nbBilles;// Nombre de billes sur le plateau
    var _joueurActuel;//Joueur actuel

    ///Fonction qui initialise le plateau
    var createPlateau = function() {
        _plateau = [
            ["","","","","",""],
            ["","","","","",""],
            ["","","","","",""],
            ["","","","","",""],
            ["","","","","",""],
            ["","","","","",""]
        ]
        _nbBilles=0;
        for (var i=0;i<6;i++)
            for (var j=0;j<6;j++)
                _plateau[i][j]=0;
    }

    ///Fonction qui permet de vérifier que le plateau est vide
    var checkPlateau = function() {
        for (var i=0;i<6;i++)
            for (var j=0;j<6;j++)
                if (_plateau[i][j]!=0)
                    return false;
        return true;
    }


    ///Fonction qui permet de vérifier que le joueur actuel est blanc
    var checkStartGame = function() {
        if (_joueurActuel=="b")
            return true;
        else
            return false;
    }


    ///Fonction qui retourne le numéro de la colonne grâce au code ascii
    var get_columnAscii=function(emplacement) {
        return emplacement.charCodeAt(0)-97;
    }

    ///Fonction qui retourne le numéro de la ligne grâce au code ascii
    var get_lineAscii= function(emplacement) {
        return emplacement.charCodeAt(1)-49;
    }

    ///Fonction qui permet de mettre à jour le nombre de billes sur le plateau
    var countPlateau=function() {
        for (var i=0;i<6;i++)
            for (var j=0;j<6;j++)
                if (_plateau[i][j]!="")
                    _nbBilles++;
    }


// public methods

    var init=function() {
        createPlateau();
    }

    init(); //Initialisation du plateau

    ///Fonction qui permet de vérifier que le plateau est vide au départ
    Engine.prototype.checkPlateau= function() {
        for (var i=0;i<6;i++)
            for (var j=0;j<6;j++)
                if (_plateau[i][j]!=0) // 0 = emplacement vide ; 1 = bille blanche ; -1 =bille noire
                    return false;
        return true;
    }


    ///Fonction qui permet d'affecter le joueur actuel à blanc
    Engine.prototype.startTheGame= function() {
        _joueurActuel="b";
    }


    ///Fonction qui permet de vérifier si le joueur actuel est blanc
    Engine.prototype.checkStartGame= function() {
        if (_joueurActuel=="b")
            return true;
        else
            return false;

    }


    ///Fonction qui permet de placer une bille d'une couleur précise à un emplacement précis
    Engine.prototype.placeBille= function(couleur,emplacement) {
        var column=get_columnAscii(emplacement);
        var line=get_lineAscii(emplacement);
        _plateau[line][column]=couleur;
        _nbBilles++;
    }


    ///Fonction qui permet de vérifier si l'emplacement passé en paramètre contient la bille de couleur passée en paramètre
    Engine.prototype.checkBille=function(couleur,emplacement) {
        var column=get_columnAscii(emplacement);
        var line=get_lineAscii(emplacement);
        if (_plateau[line][column]==couleur)
            return true;
        else
            return false;

    }

    ///Fonction qui permet de déterminer si le nombre de billes sur le plateau est égal au nombre de billes passé en paramètre
    Engine.prototype.checkNbBilles=function(number){
       if (_nbBilles==number)
           return true;
        else
            return false;
    }


    /// Fonction qui permet de vérifier si le joueur actuel est le joueur passé en paramètre
    Engine.prototype.checkJoueurActuel=function(joueur){
        if (_joueurActuel==joueur)
            return true;
        else
            return false;
    }


    /// Fonction qui permet de déterminer la colonne de départ pour un sous-plateau déterminé
    var get_startColumn = function(numPlateau) {

        switch(numPlateau) {

            case 1:
                return 0;
                break;
            case 2:
                return 3;
                break;
            case 3:
                return 0;
                break;
            case 4:
                return 3;
                break;

        }
        return -1;
    }


    /// Fonction qui permet de retourner la ligne de départ pour un sous-plateau déterminé
    var get_startLine = function(numPlateau) {

        switch(numPlateau) {

            case 1:
                return 0;
                break;
            case 2:
                return 0;
                break;
            case 3:
                return 3;
                break;
            case 4:
                return 3;
                break;

        }
        return -1;
    }


    /// Fonction qui retourne l'un des sous plateaux (numérotés horizontalement de 1 à 4 )
    var get_plateau=function(numPlateau) {
        var ligneDebut=get_startLine(numPlateau);
        var colonneDebut=get_startColumn(numPlateau);

        var tempPlateau= [
            ["","",""],
            ["","",""],
            ["","",""]
        ]

        for (var i=ligneDebut;i<ligneDebut+3;i++) {
            for (var j=colonneDebut;j<colonneDebut+3;j++) {
                tempPlateau[i][j]=_plateau[i][j];
            }
        }
        return tempPlateau;

    }


    /// Fonction qui effectue une rotation de base (90 degrés sens horaire)
    Engine.prototype.baseRotate= function(numPlateau) {
        var tempPlateau= [
            ["","",""],
            ["","",""],
            ["","",""]
        ]
        var subPlateau=get_plateau(numPlateau);
        for (var i=0;i<3;i++) {
            for (var j=0;j<3;j++) {
                tempPlateau[i][j]=subPlateau[3-j-1][i];
                //console.log(tempPlateau[i][j]);
            }
        }
        copyTempPlateau(numPlateau,tempPlateau); // On copie le sous-plateau temporaire dans le sous-plateau de destination
    }

    /// Fonction qui effectue une rotation de base (90 degrés sens anti-horaire)
    Engine.prototype.baseRotateCounter= function(numPlateau) {
        var tempPlateau= [
            ["","",""],
            ["","",""],
            ["","",""]
        ]
        var subPlateau=get_plateau(numPlateau);
        for (var i=0;i<3;i++) {
            for (var j=0;j<3;j++) {
                tempPlateau[i][j]=subPlateau[j][3-i-1];
                //console.log(tempPlateau[i][j]);
            }
        }
        copyTempPlateau(numPlateau,tempPlateau); // On copie le sous-plateau temporaire dans le sous-plateau de destination
    }


    /// Fonction qui permet de passer au joueur suivant (déterminé selon le joueur en cours)
    Engine.prototype.nextTurn=function() {
        if (_joueurActuel=="b")
            _joueurActuel="n"
        else
            _joueurActuel="b";
    }


    /// Fonction qui permet de copier un sous-plateaux temporaire dans un sous-plateau du plateau global
    var copyTempPlateau= function(numPlateau,pplateau) {
       var startColumn= get_startColumn(numPlateau);
        var startLine= get_startLine(numPlateau);

        for (var i=startLine;i<startLine + 3;i++) {
            for (var j = startColumn; j < startColumn + 3; j++) {
                _plateau[i][j] = pplateau[i][j];
                //console.log(_plateau[i][j]);
            }
        }


    }


};
