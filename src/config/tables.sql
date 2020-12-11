/* now lets create all tables */

CREATE TABLE "SUT".customer
(
    customer_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    mobile_num numeric(12,0) NOT NULL,
    email character varying NOT NULL,
    is_kyc_enabled boolean,
    aadhar_no numeric(12,0),
    pan_no character varying(10) ,
    addressline1 character varying(100),
    addressline2 character varying(100) ,
    city character varying(50),
    state character varying(50),
    password character varying,
    CONSTRAINT customer_pkey PRIMARY KEY (customer_id),
    CONSTRAINT customer_adhar_no_key UNIQUE (aadhar_no),
    CONSTRAINT customer_email_key UNIQUE (email),
    CONSTRAINT customer_mobile_num_key UNIQUE (mobile_num),
    CONSTRAINT customer_pan_no_key UNIQUE (pan_no)
)

CREATE TABLE "SUT".truck_details (
    truck_id serial PRIMARY KEY,
    truck_name VARCHAR (50) NOT NULL,
    truck_no VARCHAR (10) UNIQUE NOT NULL,
    truck_model VARCHAR (30) NOT NULL,
    chasis_no VARCHAR (20) UNIQUE NOT NULL,
    capacity_inkgs INTEGER,
    capacity_inspace INTEGER,
    booked_weight INTEGER,
    booked_space INTEGER,
    registerd_name VARCHAR NOT NULL
)

CREATE TABLE "SUT".package_details
(
    package_id integer NOT NULL DEFAULT nextval('"SUT".package_details_package_id_seq'::regclass),
    package_name character varying(50) NOT NULL,
    package_type character varying NOT NULL,
    package_weight integer NOT NULL,
    package_space integer NOT NULL,
    package_value integer NOT NULL,
    customer_mobile_num numeric,
    CONSTRAINT package_details_pkey PRIMARY KEY (package_id),
    CONSTRAINT customer_mobile_num FOREIGN KEY (customer_mobile_num)
        REFERENCES "SUT".customer (mobile_num) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE "SUT".trip_details
(
    trip_id integer NOT NULL,
    truck_no character varying NOT NULL,
    source character varying,
    destination character varying NOT NULL,
    start_date date NOT NULL,
    reach_date date,
    trip_duration_in_hours character varying,
    CONSTRAINT trip_details_pkey PRIMARY KEY (trip_id)
)

CREATE TABLE "SUT".truck_owner
(
    customer_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    mobile_num numeric(12,0) NOT NULL,
    email character varying NOT NULL,
    is_kyc_enabled boolean,
    aadhar_no numeric(12,0),
    pan_no character varying(10),
    addressline1 character varying(100),
    addressline2 character varying(100),
    city character varying(50),
    state character varying(50),
    password character varying,
    CONSTRAINT truck_owner_pkey PRIMARY KEY (customer_id),
    CONSTRAINT truck_owner_aadhar_no_key UNIQUE (aadhar_no),
    CONSTRAINT truck_owner_email_key UNIQUE (email),
    CONSTRAINT truck_owner_mobile_num_key UNIQUE (mobile_num),
    CONSTRAINT truck_owner_pan_no_key UNIQUE (pan_no)
)

CREATE TABLE "SUT".truck_package_maping
(
    mapping_id integer NOT NULL,
    truck_no character varying NOT NULL,
    package_id integer NOT NULL,
    date date NOT NULL,
    CONSTRAINT truck_package_maping_pkey PRIMARY KEY (mapping_id),
    CONSTRAINT truck_package_maping_package_id_fkey FOREIGN KEY (package_id)
        REFERENCES "SUT".package_details (package_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT truck_package_maping_truck_no_fkey FOREIGN KEY (truck_no)
        REFERENCES "SUT".truckdetails (truck_no) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE "SUT".truckdetails
(
    truck_id integer NOT NULL ,
    truck_name character varying(50) NOT NULL,
    truck_no character varying(10) NOT NULL,
    truck_model character varying(30) NOT NULL,
    chasis_no character varying(20) NOT NULL,
    capacity_inkgs integer,
    capacity_inspace integer,
    booked_weight integer,
    booked_space integer,
    truckowner_mobile_num numeric,
    CONSTRAINT truckdetails_pkey PRIMARY KEY (truck_id),
    CONSTRAINT truckdetails_chasis_no_key UNIQUE (chasis_no),
    CONSTRAINT truckdetails_truck_no_key UNIQUE (truck_no),
    CONSTRAINT truckdetails_truckdriver_mobile_num_fkey FOREIGN KEY (truckowner_mobile_num)
        REFERENCES "SUT".truck_owner (mobile_num) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
