--CREATE DATABASE MingoDB;
--USE MingoDB;
--edit Ayano Oct 24.19
CREATE TABLE Usuario (
  ID_Users INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  CONSTRAINT PK_ID_USers PRIMARY KEY (ID_Users),
  UNIQUE (username)
);

CREATE TABLE HistorialPrivado
(
  Mensaje varchar(n) NOT NULL,
  Id_Emisor VARCHAR(32) NOT NULL,
  Id_receptor VARCHAR(32) NOT NULL,
  Fecha DATE NOT NULL,
  Id VARCHAR(32) NOT NULL,
  PRIMARY KEY (Id_chat),
  FOREIGN KEY (Id) REFERENCES Usuario(Id)
);

CREATE TABLE Contacto
(
  Id_contacto VARCHAR(32) NOT NULL,
  Id VARCHAR(32) NOT NULL,
);

CREATE TABLE HistorialGlobal
(
  Mensaje VARCHAR(n) NOT NULL,
  Id_Emisor_ VARCHAR(32) NOT NULL,
  Id_Receptor VARCHAR(32) NOT NULL,
  Hora DATE NOT NULL,
  Fecha DATE NOT NULL,
  Id_chat VARCHAR(32) NOT NULL,
  Id VARCHAR(32) NOT NULL,
  PRIMARY KEY (Id_chat),
  FOREIGN KEY (Id) REFERENCES Usuario(Id)
);

CREATE TABLE Mensajes
(
  Id VARCHAR(32) NOT NULL,
  FOREIGN KEY (Id) REFERENCES Usuario(Id)
);


CREATE TABLE Registro
(
  Email varchar(n) NOT NULL,
  Password varchar(15) NOT NULL,
  Id VARCHAR NOT NULL,
  FOREIGN KEY (Id) REFERENCES Usuario(Id)
);

CREATE TABLE Login
(
  Password varchar(15) NOT NULL,
  Id VARCHAR NOT NULL,
  FOREIGN KEY (Id) REFERENCES Usuario(Id)
);