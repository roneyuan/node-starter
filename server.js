const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { DATABASE_URL, PORT} = require('./config');
const yourRouter = require('./router/yourRouter');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Read Data from form
app.use(express.static('public'));

mongoose.Promise = global.Promise;

app.use('/router/', yourRouter);

app.get('/', (req, res) => {
	res.redirect('/index.html');
});


let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if (err) {
				reject(err);
			}

			server = app.listen(port, () => {
				resolve(server);
			}).on('error',err => {
				reject(err);
			})
		})
	})
}

function closeServer() {
	mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				server.close(err => {
					if (err) {
						reject(err);
					}

					resolve();
				})
			})
		})
}

if (require.main === module) {
	runServer()
		.catch(err => console.error(err));
}


module.exports = { app, runServer, closeServer };