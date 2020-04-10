const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config({ path: 'variables.env' })

const app = express()
const { PORT, MAIL, MAIL_PASS } = process.env

// Permet d'utiliser PUG pour la génération du HTML
// Va faire le lien directement avec le dossier view
app.set('view engine', 'pug')

// On modifie la valeur par défaut de Body Parser extended
// Pour ne pas pouvoir avoir des objets dans des objets (ex {obj1: {obj2: }})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Avec cette ligne on peut donc naviguer dans nos dossiers (à partir du public) depuis le naigateur
// exemple: http://localhost:3003/css/sanitize.css
app.use(express.static('public'))

app.get('/', (_, res) => {
  // res.send('Hello World !!')
  res.render('contact', { title: 'Contact' })
})

app.post('/', (req, res) => {
  // C'est grâce à bodyParser qu'on peut atteindre le body
  // console.log(req.body)
  const { name, email, message } = req.body
  const html = `
    <h2>Nouveau Message :</h2>
    <p>Prénom : ${name}</p>
    <p>Email : ${email}</p>
    <p>Message : ${message}</p>
  `

  const text = `
    Nouveau Message :
    Prénom : ${name}
    Email : ${email}
    Message : ${message}
  `

  const transporter = nodemailer.createTransport({
    host: 'host.domaine.com',
    port: 993,
    secure: false,
    auth: {
      user: MAIL,
      pass: MAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailOption = {
    from: `'Server FORMATION NODEJS' <${MAIL}>`,
    to: MAIL,
    subject: 'Nouveau message sur le site',
    text,
    html
  }

  transporter.sendMail(mailOption, (error) => {
    if (error) {
      return console.error(error)
    }

    res.render('contact', { flash: 'Le message a bien été envoyé !' })
  })
})

app.listen(PORT, () => console.log('server ON'))
