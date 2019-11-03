CREATE DATABASE MingoDB;

USE MingoDB;

CREATE TABLE Users (
  ID_Users INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  CONSTRAINT PK_ID_USers PRIMARY KEY (ID_Users),
  UNIQUE (username)
);


---

CREATE TABLE Message (
  ID_Message INT NOT NULL,
  MessageContent VARCHAR(1000) NOT NULL,
  MessageDate DATE NOT NULL,
  ID_Users INT NOT NULL,
  PRIMARY KEY (ID_Message),
  FOREIGN KEY (ID_Users) REFERENCES Users(ID_Users)
);

CREATE TABLE RoomType (
  ID_RoomType INT NOT NULL,
  RoomType CHAR(7) NOT NULL,
  PRIMARY KEY (ID_RoomType),
  UNIQUE (RoomType)
);

CREATE TABLE Contacts (
  ID_Users INT NOT NULL,
  ID_Users INT NOT NULL,
  PRIMARY KEY (ID_Users, ID_Users),
  FOREIGN KEY (ID_Users) REFERENCES Users(ID_Users),
  FOREIGN KEY (ID_Users) REFERENCES Users(ID_Users)
);

CREATE TABLE Room (
  ID_Room INT NOT NULL,
  RoomName VARCHAR(50) NOT NULL,
  ID_RoomType INT NOT NULL,
  PRIMARY KEY (ID_Room),
  FOREIGN KEY (ID_RoomType) REFERENCES RoomType(ID_RoomType),
  UNIQUE (RoomName)
);

CREATE TABLE ActiveRoom (
  CreationDate DATE NOT NULL,
  ID_Room INT NOT NULL,
  ID_Message INT NOT NULL,
  ID_Users INT NOT NULL,
  PRIMARY KEY (ID_Room, ID_Message),
  FOREIGN KEY (ID_Room) REFERENCES Room(ID_Room),
  FOREIGN KEY (ID_Message) REFERENCES Message(ID_Message),
  FOREIGN KEY (ID_Users) REFERENCES Users(ID_Users)
);