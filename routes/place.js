const router = require("express").Router()

const Place = require('../models/Place.model')

router.get("/new-place", (req, res) => res.render("place/new-place"))

router.post("/new-place", (req, res) => {

    const { name, type } = req.body
    console.log(req.body)
    Place
        .create({ name, type })
        .then(() => res.redirect('/place/new-place'))
        .catch(err => console.log(err))
})


router.get("/update-place/:id", (req, res, next) => res.render("place/update-place"))


router.post("../new-place/:id", (req, res) => {

    const { name, type } = req.body;
    console.log(name, type)
    const { id } = req.params;

    console.log('ID: ', id)

    Place
        .findByIdAndUpdate(id, { name, type })
        //.then(() => res.redirect('/place'))
        .then(thePlace => res.render('place/place', { thePlace }))
        .catch(err => console.log(err))
})


router.post("/delete-route/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)

    Place.findByIdAndDelete(id)
        .then(res.send('Borrado con exito'))
        .catch(err => console.log(err))
})



module.exports = router