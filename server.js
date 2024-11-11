// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Supabase credentials
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json());

app.post('/api/finance-leads', async (req, res) => {
    const {
        company_name, contact_first_name, contact_last_name, contact_email,
        contact_phone, contact_message, business_address, business_city,
        business_state, business_zip, revenue_pm, amount_requested, fico,
        date_business_established
    } = req.body;

    const { data, error } = await supabase
        .from('finance_leads')
        .insert([
            {
                company_name, contact_first_name, contact_last_name, contact_email,
                contact_phone, contact_message, business_address, business_city,
                business_state, business_zip, revenue_pm, amount_requested, fico,
                date_business_established
            }
        ]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ data });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});