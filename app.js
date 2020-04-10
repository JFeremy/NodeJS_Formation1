const express = require('express')

const app = express()

// Permet d'utiliser PUG pour la génération du HTML
// Va faire le lien directement avec le dossier view
app.set('view engine', 'pug')

// Avec cette ligne on peut donc naviguer dans nos dossiers (à partir du public) depuis le naigateur
// exemple: http://localhost:3003/css/sanitize.css
app.use(express.static('public'))

app.get('/', (_, res) => {
  // res.send('Hello World !!')
  res.render('contact', { title: 'Contact' })
})

app.listen(3003, () => console.log('server ON'))
