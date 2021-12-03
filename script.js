app = Vue.createApp({
  data() {
    return {
      dataPays: [],
      paysFiltreRecherche: [],
      listTotaleNomPays: [],
      paysSelectionne: "",
      affichageBoutonPlus: false,
      paysAAffiches: [],
    };
  },
  created(){
// Récupération des data de l'API par une requête unique
const url = "https://restcountries.com/v3.1/all";
let requete = new XMLHttpRequest();
requete.open("GET", url);
requete.responseType = "json";
requete.send();
requete.onload = function () {
  if (requete.readyState === XMLHttpRequest.DONE) {
    if (requete.status === 200) {
      let reponse = requete.response;
      // Construction du dictionnaire de pays avec des data réduites
      for (let element of reponse) {
        vm.dataPays.push({
          nom: element["translations"]["fra"]["common"],
          population: element["population"],
          continentEn: element["continents"],
          superficie: element["area"],
          lienDrapeau: element["flags"]["png"],
          lienMaps: element["maps"]["googleMaps"],
        });
      }
      // Construction de la liste des noms de pays
      for (let pays of vm.dataPays) {
        vm.listTotaleNomPays.push(pays.nom);
      }
    }
  }
};
  },
  methods: {
    // Recherche les pays commençant par l'input text
    recherchePays(env) {
      this.paysFiltreRecherche = [];
      for (let pays of this.listTotaleNomPays) {
        if (pays.toUpperCase() == env.target.value.toUpperCase()) {
          this.paysFiltreRecherche = [];
          this.affichageBoutonPlus = true;
        } else if (
          pays.toUpperCase().startsWith(env.target.value.toUpperCase()) &&
          env.target.value.toUpperCase() != ""
        ) {
          this.paysFiltreRecherche.push(pays);
          this.affichageBoutonPlus = false;
        }
      }
    },
    // Remplit le champs de selection avec le nom du pays complet
    remplirPays(env) {
      this.paysSelectionne = env.target.innerHTML;
      this.recherchePays({
        key: "",
        target: {
          value: env.target.innerHTML,
        },
      });
    },
    // Ajoute la tuile du pays
    ajouterPays() {
        if (
          !(
            this.paysAAffiches.find(
              (item) => item.nom === this.paysSelectionne
            ) ===
            this.dataPays.find((item) => item.nom === this.paysSelectionne)
          )
        ) {
          this.paysAAffiches.unshift(
            this.dataPays.find((item) => item.nom === this.paysSelectionne)
          );
        }
        this.paysSelectionne = "";
        this.affichageBoutonPlus = false;
        console.log(this.paysAAffiches);
    },
    // Supprime la tuile du pays
    supprimerPays(pays) {
      this.paysAAffiches.splice(
        this.paysAAffiches.findIndex((item) => item.nom === pays),
        1
      );
    },
  },
});
const vm = app.mount("#app");
