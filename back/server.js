const app = require('./index')
const port = 8000

app.listen(8000, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
	}
	console.log(`Server is listening on ${port}`);
});