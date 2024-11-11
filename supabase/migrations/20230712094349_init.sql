create table finance_leads (
    company_name text,
    contact_first_name text,
    contact_last_name text,
    contact_email text,
    contact_phone text,
    contact_message text,
    created_at timestamp with time zone default now(),
    business_address text,
    business_city text,
    business_state text,
    business_zip text,
    revenue_pm text,
    amount_requested text,
    fico text,
    date_business_established date
);

create table home_moving_leads (
    shipping_from text,
    shipping_to text,
    moving_date date,
    contact_first_name text,
    contact_last_name text,
    room_count text,
    contact_email text,
    contact_phone text
);