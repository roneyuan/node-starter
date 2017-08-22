const express = require('express');
const router = express.Router();

router.get('/say', (req, res) => {
	res.status(200).json({"hello": "world"})
});

router.post('/yourPOST', (req, res) => {
	/* TODO */
	res.status(201);
});

router.put('yourPUT', (req, res) => {
	/* TODO */
	res.status(202);
});

router.delete('yourDELETE', (req, res) => {
	/* TODO */
	res.status(202);
})


module.exports = router;