const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://iddmmtntvupxgpfrclvm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkZG1tdG50dnVweGdwZnJjbHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2OTcwNTgsImV4cCI6MjAxNjI3MzA1OH0.URIQVgsj7Bf45fjZCo6MS9SyvoK-vJ9GFFjCzyQPzW8';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/INST377-Week10-PPT.html', { root: __dirname });
});

app.get('/customers', async (req, res) => {
    console.log('Getting Customers');

    try {
        const { data, error } = await supabase
            .from('Customer')
            .select();

        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/customer', async (req, res) => {
    console.log('Adding Customer');

    try {
        const { firstName, lastName, state } = req.body;

        const { data, error } = await supabase
            .from('Customer')
            .insert([
                { 'cust_first_name': firstName, 'cust_last_name': lastName, 'cust_state': state }
            ])
            .select();

        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json(data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log('APP IS ALIVEEEEEE');
});
