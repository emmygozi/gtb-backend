const dropAndCreateTablesScript = `
   DROP TABLE IF EXISTS customers CASCADE; CREATE TABLE IF NOT EXISTS customers (
    id SERIAL,
    email character varying(100) NOT NULL,
    firstname character varying(70) NOT NULL,
    lastname character varying(70) NOT NULL,
    phoneNumber character varying(70) NOT NULL,
    location character varying(400) NOT NULL,
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    password character varying(200) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (id, email)
   );
   DROP TABLE IF EXISTS distributors CASCADE; CREATE TABLE IF NOT EXISTS distributors (
    id SERIAL,
    name varchar(100) NOT NULL,
    logourl varchar(900) NOT NULL,
    userid varchar(100) NOT NULL,
    password character varying(200) NOT NULL,
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE (id, userid)
   );
   DROP TABLE IF EXISTS product CASCADE; CREATE TABLE IF NOT EXISTS product (
    id SERIAL,
    distributorid INTEGER NOT NULL,
    name character varying(70) NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    FOREIGN KEY (distributorid) REFERENCES distributors (id),
    UNIQUE (id)
   );
   DROP TYPE IF EXISTS anapproval CASCADE; 
    CREATE TYPE anapproval AS ENUM ('pending','dispatched', 'recieved'); 
    DROP TABLE IF EXISTS transaction CASCADE; CREATE TABLE IF NOT EXISTS transaction (
    id SERIAL,
    productid INTEGER NOT NULL,
    distributorid INTEGER NOT NULL,
    customerid INTEGER NOT NULL,
    total INTEGER NOT NULL,
    status anapproval default 'pending',
    dateadded timestamp without time zone NOT NULL DEFAULT now(),
    FOREIGN KEY (productid) REFERENCES product (id),
    FOREIGN KEY (distributorid) REFERENCES distributors (id),
    FOREIGN KEY (customerid) REFERENCES customers (id),
    PRIMARY KEY (id),
    UNIQUE (id)
   );`;


export default dropAndCreateTablesScript;
