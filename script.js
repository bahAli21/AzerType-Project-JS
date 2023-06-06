const listeMots = ["Cachalot","Pétunia","Serviette"]

function theScore(nbQuestion)
{
    let score = 0

    for(let i=0;i<nbQuestion;++i)
    {
        let motTape = prompt("Entrez le mot "+listeMots[i])
        if(motTape === listeMots[i])
            score++
    }
    return score
}

function returnMessage(sc,question)
{
    let mess = "Votre score est de "+sc+" sur "+question+" question"
    return mess
}

console.log(returnMessage(theScore(listeMots.length),listeMots.length))


//Part 2
const mot = ["Bonjour","MaMa";"Paapaff","taatfgrgg"]
const phrase=["Bonjour monsieur","Haha le batard","Tu m'etonne mec","chien de mer"]

function afficheResultat(resultat,nbMot)
{
 return "Votre resultat est de "+resultat+" sur "+nbMot+" mots."
}

function phraseOuMot()
{
    do{
        let choix=prompt("Voulez vous jouez avec des mots ou phrase ?: m pour mots et p pour phrase")

    }while(choix!=="m" || choix!=="p")

    return choix
}

function lancerBoucleDeJeu (tab)
{
    let nbCorr
    for(let i=0;i<tab.length;++i)
    {
        let mot=prompt("Entrer : "+tab[i])

        if(mot===tab[i])
           nbCorr++
    }
    return nbCorr
}

function lancerJeu()
{
    if(phraseOuMot()==="m")
    {
        let res=lancerBoucleDeJeu(mot)
        afficheResultat(res,mot.length)
    }    
    else
    {
        let res=lancerBoucleDeJeu(phrase)
        afficheResultat(res,phrase.length)
    }
}

lancerJeu()

