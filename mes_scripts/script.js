
//Part 2
const Listemot = ["Bonjour","MaMa","Paapaff","taatfgrgg"]
const phrase=["Bonjour monsieur","Haha le batard","Tu m'etonne mec","chien de mer"]

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

function phraseOuMot()
{
    

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


function lancerJeu()
{
    let tab=Listemot
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
        if(tab[i]!==undefined)
        {
            i++
            let score = lancerBoucleDeJeu(tab)  
            afficheResultat(score,tab.length)  
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

