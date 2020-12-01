/* now lets create all tables */

CREATE TABLE "SUT".customer (
    customer_id serial PRIMARY KEY,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    mobile_num INTEGER (12) UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    is_kyc_enabled BOOLEAN,
    adhar_no INTEGER (12) UNIQUE,
    pan_no VARCHAR (10) UNIQUE,
    addressline1 VARCHAR (100),
    addressline2 VARCHAR (100),
    city VARCHAR (50),
    "state" VARCHAR (50)
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

CREATE TABLE "SUT".package_details (
    package_id serial PRIMARY KEY,
    package_name VARCHAR (50) NOT NULL,
    CONSTRAINT customer_id
        FOREIGN KEY(customer_id)
            REFERENCES "SUT".customer(customer_id)
            ON DELETE CASCADE,
    package_type VARCHAR NOT NULL,
    package_weight INTEGER NOT NULL,
    package_space INTEGER NOT NULL,
    package_value INTEGER NOT NULL
)

CREATE TABLE "SUT".trip_details (
    trip_id SERIAL PRIMARY KEY,
    truck_no INTEGER NOT NULL,
    source VARCHAR,
    destination VARCHAR NOT NULL,
    "start_date" DATE NOT NULL,
    reach_date DATE,
    trip_duration_in_hours VARCHAR
)

CREATE TABLE "SUT".truck_package_maping (
    mapping_id SERIAL PRIMARY KEY,
    truck_no INTEGER NOT NULL 
        REFERENCES "SUT".truck_details(truck_no),
    package_id INTEGER NOT NULL
        REFERENCES "SUT".package_details(package_id),
    "date" DATE NOT NULL,
)