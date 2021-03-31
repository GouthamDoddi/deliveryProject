/* now lets create all tables */

CREATE TABLE "SUT".customer
(
    customer_id SERIAL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    mobile_num numeric(12,0) NOT NULL,
    email character varying,
    is_kyc_enabled boolean,
    aadhar_no numeric(12,0),
    pan_no character varying(10),
    addressline1 character varying(100),
    addressline2 character varying(100),
    city character varying(50),
    state character varying(50),
    password character varying,
    CONSTRAINT customer_pkey PRIMARY KEY (customer_id),
    CONSTRAINT customer_adhar_no_key UNIQUE (aadhar_no),
    CONSTRAINT customer_email_key UNIQUE (email),
    CONSTRAINT customer_mobile_num_key UNIQUE (mobile_num),
    CONSTRAINT customer_pan_no_key UNIQUE (pan_no)
);

CREATE TABLE "SUT".package_details
(
    package_id SERIAL,
    pickup_point VARCHAR NOT NULL,
    drop_point VARCHAR NOT NULL,
    pickup_date TIMESTAMP NOT NULL,
    reach_date TIMESTAMP,
    status character varying(20),
    package_name character varying(50),
    package_type character varying,
    package_weight integer NOT NULL,
    package_space integer NOT NULL,
    booked_entire_truck BOOLEAN NOT NULL,
    package_receiving_person VARCHAR,
    receiving_person_mobile_no numeric(12,0),
    package_value integer,
    customer_mobile_num numeric,
    customer_name character varying(50),
    CONSTRAINT package_details_pkey PRIMARY KEY (package_id)
);

CREATE TABLE "SUT".trip_details
(
    trip_id SERIAL,
    truck_no character varying NOT NULL,
    truck_model varchar,
    source character varying,
    destination character varying NOT NULL,
    start_date TIMESTAMP NOT NULL,
    reach_date TIMESTAMP,
    total_packages NUMERIC DEFAULT 0,
    delivered_packages INTEGER DEFAULT 0,
    trip_duration_in_hours character varying,
    truck_driver_num numeric,
    truck_driver varchar,
    CONSTRAINT trip_details_pkey PRIMARY KEY (trip_id)
);

CREATE TABLE "SUT".truck_owner
(
    owner_id SERIAL,
    full_name VARCHAR NOT NULL,
    mobile_num numeric(12,0) NOT NULL,
    email character varying,
    is_kyc_enabled boolean,
    aadhar_no numeric(12,0),
    pan_no character varying(10),
    addressline1 character varying(100),
    addressline2 character varying(100),
    city character varying(50),
    state character varying(50),
    password character varying,
    CONSTRAINT truck_owner_pkey PRIMARY KEY (owner_id),
    CONSTRAINT truck_owner_aadhar_no_key UNIQUE (aadhar_no),
    CONSTRAINT truck_owner_email_key UNIQUE (email),
    CONSTRAINT truck_owner_mobile_num_key UNIQUE (mobile_num),
    CONSTRAINT truck_owner_pan_no_key UNIQUE (pan_no)
);

CREATE TABLE "SUT".truck_package_mapping
(
    mapping_id SERIAL,
    truck_no character varying NOT NULL,
    package_id integer NOT NULL,
    trip_id integer NOT NULL,
    delivered BOOLEAN DEFAULT FALSE,
    status VARCHAR(20),
    date date NOT NULL,
    CONSTRAINT truck_package_maping_pkey PRIMARY KEY (mapping_id)
);

CREATE TABLE "SUT".truckdetails
(
    truck_id SERIAL,
    truck_name character varying(50),
    truck_no character varying(10) NOT NULL,
    truck_model character varying(30),
    chasis_no character varying(20),
    transport_company_name VARCHAR,
    driver_name VARCHAR,
    rc BYTEA,
    license BYTEA,
    capacity_inkgs integer,
    capacity_inspace integer,
    booked_weight integer,
    booked_space integer,
    owned_by_transport_company BOOLEAN,
    truckowner_mobile_num numeric,
    transport_company_mobile_num numeric,
    truck_mobile_num numeric,
    CONSTRAINT truckdetails_pkey PRIMARY KEY (truck_id),
    CONSTRAINT truckdetails_chasis_no_key UNIQUE (chasis_no),
    CONSTRAINT truckdetails_truck_no_key UNIQUE (truck_no)
);

CREATE TABLE "SUT".transport_company
(
    company_id SERIAL,
    company_name VARCHAR UNIQUE NOT NULL,
    mobile_num NUMERIC NOT NULL,
    no_of_vehicles INTEGER,
    CONSTRAINT transport_company_pkey PRIMARY KEY (company_id),
    CONSTRAINT transport_company_mobile_num_key UNIQUE (mobile_num)

);

CREATE TABLE "SUT".delivery_partner_rating
(
    rating_id SERIAL,
    truck_no varchar NOT NULL,
    truck_owner_mobile_num numeric,
    company_mobile_num numeric,
    trip_id integer NOT NULL,
    receiving_person_mobile_no numeric(12,0),
    rating integer NOT NULL,
    comment character varying(100),
    customer_mobile_num numeric,
    package_id integer,
    CONSTRAINT delivery_partner_rating_pkey PRIMARY KEY (rating_id)
);


-- Alter scripts

ALTER TABLE "SUT".package_details
ADD CONSTRAINT customer_mobile_num FOREIGN KEY (customer_mobile_num)
    REFERENCES "SUT".customer (mobile_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION,
ADD CONSTRAINT receiving_person_mobile_no FOREIGN KEY (customer_mobile_num)
    REFERENCES "SUT".customer (mobile_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION;

ALTER TABLE "SUT".truck_package_mapping
ADD CONSTRAINT truck_package_mapping_package_id_fkey FOREIGN KEY (package_id)
    REFERENCES "SUT".package_details (package_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION,
ADD CONSTRAINT truck_package_mapping_truck_no_fkey FOREIGN KEY (truck_no)
    REFERENCES "SUT".truckdetails (truck_no) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION,
ADD CONSTRAINT truck_package_mapping_trip_id_fkey FOREIGN KEY (trip_id)
    REFERENCES "SUT".trip_details (trip_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION;

ALTER TABLE "SUT".truckdetails
ADD CONSTRAINT truckdetails_truckdriver_mobile_num_fkey FOREIGN KEY (truckowner_mobile_num)
    REFERENCES "SUT".truck_owner (mobile_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
ADD CONSTRAINT truckdetails_transport_company_mobile_num_fkey FOREIGN KEY (transport_company_mobile_num)
    REFERENCES "SUT".transport_company (mobile_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE "SUT".delivery_partner_rating
ADD CONSTRAINT delivery_partner_rating_truck_no_fkey FOREIGN KEY (truck_no)
    REFERENCES "SUT".truckdetails (truck_no) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION,
ADD CONSTRAINT delivery_partner_rating_truck_owner_mobile_num_fkey FOREIGN KEY (truck_owner_mobile_num)
    REFERENCES "SUT".truck_owner (mobile_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION,
ADD CONSTRAINT delivery_partner_rating_company_mobile_num_fkey FOREIGN KEY (company_mobile_num)
    REFERENCES "SUT".transport_company (mobile_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION,
ADD CONSTRAINT delivery_partner_rating_customer_mobile_num_fkey FOREIGN KEY (customer_mobile_num)
    REFERENCES "SUT".customer (mobile_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION,
ADD CONSTRAINT delivery_partner_rating_trip_id_fkey FOREIGN KEY (trip_id)
    REFERENCES "SUT".trip_details (trip_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
ADD CONSTRAINT delivery_partner_rating_package_id_fkey FOREIGN KEY (package_id)
    REFERENCES "SUT".package_details (package_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
ADD CONSTRAINT delivery_partner_rating_receiving_person_mobile_no_fkey FOREIGN KEY (receiving_person_mobile_no)
    REFERENCES "SUT".customer (mobile_num) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION;
