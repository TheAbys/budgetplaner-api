module.exports = {
    initialize: function(app, databaseConnection){
        // Retrieve all expenses
        app.get('/expenses', function (req, res) {
            databaseConnection.query('select * from expenses', function (error, results, fields) {
                if (error) res.status(422).send();
                if (!error) return res.send({ error: false, data: results, message: '' });
            });
        });
        
        
        // Retrieve expense with id 
        app.get('/expenses/:id', function (req, res) {
        
            let id = req.params.id;
        
            if (!id) {
                return res.status(400).send({ error: true, message: 'Please provide id' });
            }
        
            databaseConnection.query('select * from expenses where id = ?', id, function (error, results, fields) {
                if (error) res.status(422).send();
                return res.send({ error: false, data: results[0], message: '' });
            });
        
        });
        
        
        // Add a new expense  
        app.post('/expenses', function (req, res) {
        
            let expense = req.body.expense;

            if (!expense) {
                return res.status(400).send({ error:true, message: 'Please provide an expense' });
            }
        
            databaseConnection.query("insert into expenses set ? ", expense, function (error, results, fields) {
                if (error) res.status(422).send();
                if (!error) return res.send({ error: false, data: results, message: 'New expense has been created successfully.' });
            });
        });
        
        
        //  Update expense with id
        app.put('/expenses', function (req, res) {
        
            let id = req.body.id;
            let expense = req.body.expense;
        
            if (!id || !expense) {
                return res.status(400).send({ error: expense, message: 'Please provide expense and id' });
            }
        
            databaseConnection.query("update expenses set ? where id = ?", [expense, id], function (error, results, fields) {
                if (error) res.status(422).send();
                return res.send({ error: false, data: results, message: 'Expense has been updated successfully.' });
            });
        });
        
        
        //  Delete expense
        app.delete('/expenses', function (req, res) {
        
            let id = req.body.id;
        
            if (!id) {
                return res.status(400).send({ error: true, message: 'Please provide id' });
            }
            databaseConnection.query('delete from expenses where id = ?', [id], function (error, results, fields) {
                if (error) res.status(422).send();
                return res.send({ error: false, data: results, message: 'Expense has been updated successfully.' });
            });
        }); 
    }
};