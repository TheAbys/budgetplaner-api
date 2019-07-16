module.exports = {
    initialize: function(app, databaseConnection){
        // Retrieve all users
        app.get('/users', function (req, res) {
            databaseConnection.query('select * from users', function (error, results, fields) {
                if (error) res.status(422).send();
                if (!error) return res.send({ error: false, data: results, message: '' });
            });
        });
        
        
        // Retrieve user with id 
        app.get('/users/:id', function (req, res) {
        
            let id = req.params.id;
        
            if (!id) {
                return res.status(400).send({ error: true, message: 'Please provide id' });
            }
        
            databaseConnection.query('select * from users where id = ?', id, function (error, results, fields) {
                if (error) res.status(422).send();
                return res.send({ error: false, data: results[0], message: '' });
            });
        
        });

        app.get('/users/:id/expenses', function (req, res) {

            let id = req.params.id;
        
            if (!id) {
                return res.status(400).send({ error: true, message: 'Please provide id' });
            }

            databaseConnection.query('select * from expenses where userid = ?', id, function (error, results, fields) {
                if (error) res.status(422).send();
                return res.send({ error: false, data: results, message: '' });
            });
        });
    }
};