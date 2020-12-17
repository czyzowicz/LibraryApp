const express = require('express');
const app = express();

app.use(express.static('./dist/library-app'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/library-app/'}
);
});
app.listen(process.env.PORT || 8080);