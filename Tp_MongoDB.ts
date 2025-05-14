

question 2

db.films.find({ genres: { $in: ['Drame'] } });


question 3

db.films.find({}, { nom: 1, duree: 1, _id: 0 });

question 4
	
	db.jeux_video.find({
		online: true,
		nombre_joueurs: { $gt: 2 }
	  })

	  db.jeux_video.find({
		$and: [
		  { online: true },
		  { nombre_joueurs: { $gt: 2 } }
		]
	  })


question 5

db.films.find({
	date: { $gt: ISODate("2016-01-01") }
  })




question 6

db.utilisateurs.find({
	"livres.titre": { $regex: /dune/i }
  })
  



question 7

db.utilisateurs.updateOne(
    { "email": "jean.dupont@example.com" }, // Critère de sélection
    {
      $push: {
        "livres": {
          "titre": "Nouveau Livre",
          "auteur": "Nouvel Auteur",
          "anne": 2023,
          "genres": ["Aventure", "Fantastique"],
          "lu": false
        }
      }
    }
  )
  

  question 8

  db.utilisateurs.updateOne(
    { nom: 'Martin' ,"livres.titre":'Dune'},
     { $set: { "livres.$.lu" : false } });

  
  db.utilisateurs.updateOne(
    {email: "test@test.com", "livres.titre" : "La POO"},
    {$set: {
              "livres.$.lu" : false
            }
    })


    question 9

    db.utilisateurs.updateOne(
        {
          nom: 'POIRIER',
          "livres.titre": "1984" // Condition pour identifier le sous-document
        },
        {
          $set: { "livres.$.personalNote": "okok" }
        }
      )



      db.utilisateurs.updateOne(
        {email: "test@test.com"},
        {$unset: {
                  "livres.$[].personnalNote" : ""
                }
        })

//pour supprier la note personnelle de tous les livres d'un utilisateur
// (en supposant que l'utilisateur a plusieurs livres)
// on utilise $[] pour cibler tous les livres de l'utilisateur
// et $unset pour supprimer le champ "personalNote" de chaque livre.
// Exemple : Suppression de la note personnelle de tous les livres d'un utilisateur
        db.utilisateurs.updateOne(
            { email: "test@test.com" },
            { $unset: { "livres.$[].personalNote": "" } }
          )
          


// question 10
// Ajouter un livre à la liste des favoris d'un utilisateur
// en utilisant un filtre d'array pour cibler un livre spécifique
// Exemple : Ajouter un livre à la liste des favoris d'un utilisateur   


          db.utilisateurs.updateOne(
            { email: "j@z.com" },
            {
              $set: {
                "livres.$[selectedBook].favori": true
              }
            },
            {
              arrayFilters: [
                { "selectedBook.auteur": "J.R.R. Tolkien" }
              ]
            }
          )
      

          //Faire une pipeline d'aggrégation qui fait la liste des realisateurs uniques dans la collection "films"
//(combien j' ai de real en tout + la liste des real) avec compass
// Exemple : Liste des réalisateurs uniques dans la collection "films"
            db.films.aggregate([
                {
                $group: {
                    _id: "$realisateur",
                    count: { $sum: 1 }
                }
                },
                {
                $project: {
                    _id: 0,
                    realisateur: "$_id",
                    count: 1
                }
                }
    
            db.films.aggregate([
                {
                $group: {
                    _id: "$realisateur",
                    count: { $sum: 1 }
                }
                },
                {
                $project: {
                    _id: 0,
                    realisateur: "$_id",
                    count: 1
                }
                }
            ])
