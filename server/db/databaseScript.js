const dropAndCreateTablesScript = `
DROP TABLE IF EXISTS account CASCADE; CREATE TABLE IF NOT EXISTS account (
   id SERIAL,
   accountno varchar(200),
   accountname varchar(200),
   bvn varchar(200),
   accountbalance varchar(200),
   averageinflow varchar(200),
   averageoutflow varchar(200),
   PRIMARY KEY (id),
   UNIQUE (id,bvn)
  );
  DROP TABLE IF EXISTS manufacturer CASCADE; CREATE TABLE IF NOT EXISTS manufacturer (
   id SERIAL,
   name varchar(200),
   email character varying(100) NOT NULL,
   phoneNumber character varying(70) NOT NULL,
  accountid INTEGER NOT NULL,
   dateadded timestamp without time zone NOT NULL DEFAULT now(),
   password character varying(200) NOT NULL,
   wallet varchar(200),
   FOREIGN KEY (accountid) REFERENCES account (id),
   PRIMARY KEY (id),
   UNIQUE (id, email)
  );
  DROP TABLE IF EXISTS bank CASCADE; CREATE TABLE IF NOT EXISTS bank (
   id SERIAL,
   adminid varchar(100) NOT NULL,
   password character varying(200) NOT NULL
  );
  DROP TABLE IF EXISTS paymentoption CASCADE; CREATE TABLE IF NOT EXISTS paymentoption (
   id SERIAL,
   name varchar(100) NOT NULL,
   PRIMARY KEY (id),
   UNIQUE (id)
  );
  DROP TABLE IF EXISTS distributors CASCADE; CREATE TABLE IF NOT EXISTS distributors (
   id SERIAL,
   name varchar(100) NOT NULL,
   logourl varchar(900),
   phoneNumber varchar(900),
   userid varchar(100) NOT NULL,
   accountid INTEGER NOT NULL,
   location character varying(400) NOT NULL,
   password character varying(200) NOT NULL,
   email character varying(100) NOT NULL,
   dateadded timestamp without time zone NOT NULL DEFAULT now(),
   FOREIGN KEY (accountid) REFERENCES account (id),
   PRIMARY KEY (id),
   UNIQUE (id, userid)
  );
  
  DROP TABLE IF EXISTS product CASCADE; CREATE TABLE IF NOT EXISTS product (
   id SERIAL,
   manufacturerid INTEGER NOT NULL,
   name character varying(70) NOT NULL,
   quantity INTEGER NOT NULL,
   price INTEGER NOT NULL,
   dateadded timestamp without time zone NOT NULL DEFAULT now(),
   FOREIGN KEY (manufacturerid) REFERENCES manufacturer (id),
   PRIMARY KEY (id),
   UNIQUE (id)
  );
  DROP TYPE IF EXISTS anapproval CASCADE; 
   CREATE TYPE anapproval AS ENUM ('pending','approved','declined','ready'); 
  DROP TYPE IF EXISTS paymentoptions CASCADE; 
   CREATE TYPE paymentoptions AS ENUM ('preorder','paynow'); 

  DROP TABLE IF EXISTS transaction CASCADE; CREATE TABLE IF NOT EXISTS transaction (
   id SERIAL,
   quantity INTEGER NOT NULL,
   productid INTEGER NOT NULL,
   distributorid INTEGER NOT NULL,
   total INTEGER NOT NULL,
   payoptionid INTEGER NOT NULL,
   status anapproval default 'pending',
   dateadded timestamp without time zone NOT NULL DEFAULT now(),
   FOREIGN KEY (productid) REFERENCES product (id),
   FOREIGN KEY (distributorid) REFERENCES distributors (id),
   FOREIGN KEY (payoptionid) REFERENCES paymentoption (id),
   PRIMARY KEY (id),
   UNIQUE (id)
  );`;

export default dropAndCreateTablesScript;
