
//Part 2
const Listemot = ["Bonjour","MaMa","Paapaff","taatfgrgg", "Haha", "Wirtz"]
const phrase=["Bonjour monsieur","Haha le batard","Tu m'etonne mec","chien de mer"]

let question=0
function afficheResultat(resultat,nbMot)
{
 //Je recupère l'element parent span qui se trouve dans un bloc de classe zoneScore avec la methode querySelector
 let conteneur= document.querySelector(".zoneScore span")

 //J'utilise une interpolation pour generer du HTML
 let message = `

       <h4>${resultat}/${nbMot}</h4>`

//J'ajoute le message generer dans l'objet recupérer grâce a innerHTML
conteneur.innerHTML=message;

}

//Variable global
let nbCorr=0

function lancerBoucleDeJeu (tab)
{

    for(let i=0;i<tab.length;++i)
    {
        //Je recupère l'element HTML a partir de son id
        let motElement=document.getElementById("inputEcriture")

        //J'affecte son contenue (value) car c'est une balse input a une variable JS
        let  mot=motElement.value
        //Je test si le mot saisi est egale a celui afficher
        if(mot===tab[i])
           nbCorr++  //J'incremente le nombre de mot correct a 1
    }
    document.getElementById("inputEcriture").value=""
    return nbCorr
}

//cette fonction gere l'affichage du mot proposé
function afficheProposition(mot)
{
    //Je recupère l'element HTML avec querySelector
  let zone = document.querySelector(".zoneProposition")

  //J'utilise l'interpolation pour generer un message 'le mot'
  let mess = `
       ${mot}

       `
    //J'ajoute ce message au code HTML avec l'attribut innertText
  zone.innerText=mess
}
function valideNom(nom){
  //J'enlève les espace de debut avec la methode trim
  let noSpace=nom.trim()
  if(noSpace.length<2)
    return false
  return true
}

function valideEmail(email){
  //Je construit l'expression regulière au format d'une adresse email
  let formatEmail = new RegExp("[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z0-9.-_]+")
  return formatEmail.test(email)
}

//Utilisation d'une API emailJS
function sendEmail(nom, subject, corps, email) {
    let btnSend = document.getElementById("btnEnvoyerMail");

    // Définir un tableau de valeurs pour l'animation
    let animationValues = ["partage.", "partage..", "partage...", "partage...."];
    let currentIndex = 0;

    // je mets à jour la valeur du bouton chaque deux secondes
    let animationInterval = setInterval(function() {
        btnSend.value = animationValues[currentIndex];
        currentIndex = (currentIndex + 1) % animationValues.length; // Passons à la prochaine valeur
    }, 2000);

    // Envoie de l'e-mail après  8 secondes, pour bien faire l'effet animation
    setTimeout(function() {
        clearInterval(animationInterval); // j'arrête l'animation
        btnSend.value = "Envoyer"; // Je remet la valeur initiale
        emailjs.send("service_ttnsqiv","template_l7baqas",{
            from_name: nom,
            email: email,
            message: corps,
            from_subject: subject,
            from_page_url: "https://bahali21.github.io/AzerType-Project-JS/",
        }).then(function (res) {
            alert("Message envoyé avec succès, Merci d'avoir essayé notre site");
        }).catch(function(error) {
            alert("Une erreur est survenue lors de l'envoi du message : " + error);
        });
    }, 8000); // 8 secondes de délai avant l'envoi de l'e-mail
}




function traitePartage()
{
  //Je recupère le bouton btnEnvoyerMail
  let boutonSubmit=document.querySelector('form')

  //J'ecoute l'evenement du bouton avec addEventListener
  boutonSubmit.addEventListener("submit",(event)=>{
    //J'empêche la page de se recharger
    event.preventDefault()
    let nom=document.getElementById('nom').value
    let email=document.getElementById('email').value
    console.log(nom)
    console.log(email)
     if(!valideNom(nom) || !valideEmail(email) )
     {
       if(!valideNom(nom))
         document.getElementById('nom').classList.add("error")
       else
         document.getElementById('email').classList.add("error")
     }
     else {
       document.getElementById('nom').classList.remove("error")
       document.getElementById('email').classList.remove("error")
       let sujet = "Je partage mon score"
       let message = `Bonjour je m'appel ${nom} J'ai jouer au jeu AzerType en ligne et mon score est ${lancerBoucleDeJeu(tab)}/${question} veut tu me defier ?`
       sendEmail(nom,sujet,message,email)
     }

  })

}
let tab=Listemot
traitePartage()

function lancerJeu()
{

    //un compteur i
    let i=0
    //Je recupere 2 objets HTML
    let valider = document.getElementById("btnValiderMot")
    let inputEcr = document.getElementById("inputEcriture")
     //Je recupère tous les boutons radios qui ont un name="optionSource"
     let baliseRadio = document.querySelectorAll('input[name="optionSource"]')




    //J'ecoute l'action de l'utilisateur sur le bouton validé
        afficheProposition(tab[i])
       valider.addEventListener("click",(event) =>{


        //event.target recupère l'objet HTML
         monBoutonValider=event.target
         console.log(`J'ai cliquer sur : ${monBoutonValider.id}`)

         console.log(inputEcr.value)

         //si la valeur dans la case i est pas vide
         i++
        if(tab[i]!==undefined)
        {
            question++

            let score = lancerBoucleDeJeu(tab)
            afficheResultat(score,question)
            afficheProposition(tab[i])

        }
        else
        {

            let score = lancerBoucleDeJeu(tab)
            afficheResultat(score,tab.length)
            afficheProposition("Le jeu est fini")
        }

    })

      for(let index=0;index<baliseRadio.length;++index)
      {
          baliseRadio[index].addEventListener("change",(event)=>{
          if(event.target.value==="1")
          {
              tab=Listemot
          }
          else{
              tab=phrase
          }
          afficheProposition(tab[i])
          })

      }

}

lancerJeu()
