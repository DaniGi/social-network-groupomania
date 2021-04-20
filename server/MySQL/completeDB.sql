DROP DATABASE IF EXISTS groupomania;

CREATE DATABASE groupomania CHARACTER SET 'utf8';

USE groupomania;

DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Post;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Likes;

CREATE TABLE User (
    id VARCHAR(200) NOT NULL UNIQUE, 
    email VARCHAR(200) NOT NULL UNIQUE,
    username VARCHAR(16) NOT NULL UNIQUE,
    passwrd VARCHAR(200) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    profile_picture VARCHAR(200) DEFAULT NULL,
    PRIMARY KEY (id)
)
ENGINE=INNODB;

LOCK TABLES User WRITE;
INSERT INTO User(id, email, username, passwrd, is_admin) VALUES ('$2b$10$RTUsFsAe7EkiW25YzozW9.vyUecsFdPDGJAmL67WCHVWmzIkJeN3u','91976461d473bb6154633dc824500f18248341e3c554b6ffb0a3ad2827be5353', 'admin', '$2b$10$YAs9HEHKbCv2sKfoi1Gvr.kfXkgsGgHwW4EOFUAwj4YF6MSS.cLIS', 1),
('$2b$10$OZ4UQykEwCiaYoP50/uEne6w.iYUQodxZHRb.0h.656rDMQtOYS9K','74aa39d57e5ecbf2e848cb0fcb5c20ecd965488a22658f5ae50345a8fbd0c5b1', 'aldo1', '$2b$10$nHJoIuGTFfX3J3fFpsWxlOtnx4ZuA/DgFHHgYAb4081/U.BmtlXum', 0),
('$2b$10$aU2qVyXmYsICU67Pr4rASObp4kPZoeHdQYAmiPj5JyTOfHD6bRlvG','01c737fa54cf67f742c47310a0e07fadfe9573fd07c70c350b050798efaac529', 'Giogio_', '$2b$10$5LYwMqWMRXXW8WBZduD8re7PL9T5PPTP3falbzGjmtrc6RUXfP1iy', 0),        
('$2b$10$44n48/rSeiESq5bEwgwq9ObwCCal.b8sG5VLWFnh3lS6NuqFUqy8m','c3159adbc5704caea05c2b5053bee5a68bb44cbbe61f4083b74a6e683c7ee087', 'annaC', '$2b$10$VU.OgOhFHqnV8Qd7CF7qL.yUd1jblNzGhSSr41vMO4w3Q0tTZfeYS', 0),
('$2b$10$NZAUDicfPIEiKR45mqaqf.wzr5VlNAdrnyzU0d22vPK.Rdi0619uC','af773101abd48f4f635c2ef849b7c73d0e957b9f64c2b05bd79778dc16f04acc', 'LuciaFI', '$2b$10$A2xA9bjZ62FIdk6RQmENkepZPFAh4jvZMkVMtixr/UGu5RK7JJmai', 0),        
('$2b$10$R3FB3H0pjeU0ExiaIB37G.7qvnfcIL0xeyjrs0Ui5htQz5dwTN9gi','650e3b512a5096e0d7e1d1d4953d2902efb735efe687248c1bd7c0d475ce1152', 'Wilfred', '$2b$10$TKjF9ygVdu43jVOGgk5kje1rHWPvdkorSfoSJZ2MbF4uvGaSL88nq', 0),        
('$2b$10$453mM1WWH4GDdqIVm9Vf2uX.z.Juqdcc3K.oUSYN5e//z9CehZkXq','00f4ca4dd95d92e46112d5fef70441f860601e48944d088d1964028f2fa43299', 'GuyLee', '$2b$10$AyuMmfRik4K.qNwKqJCMke4wuTBuhwjmsh1rIDtmEfXjQtkO/ZWbm', 0),
('$2b$10$WMVi4RmleCWXe8yFwnKHTu8x52QolN6SpgudEQYWgw1IcN0ng6kb.','c0e7b67f5ee50e962b529142bfac21cef415f78f64b167662c8f8ab1742497fa', 'WuChang', '$2b$10$AqAFJuAdzJRCJgPcKLzM8uKY4lWZ.fypxA61FY/dqhb1c6PTLEVdW', 0),        
('$2b$10$UhjNq74178/Ii.7YxzJ5c.xTTA3FYVF5IhwlK30uRp/w9eKMwuAVK','b8ca145fd7130517008a7d6f9a342ba3537a05ee635ec91dea10af3d5ee4cd37', 'Kevin', '$2b$10$GXFEfCjN68qwBnLmtX/oiuy04JoAPHzfFwax6VEic74mhnetQIF3W', 0),
('$2b$10$UaQGilFnllqbIG8TJXmzIOz2YR0Vgx4qTey78B6bloAOkCMLlZeNy','1dadf1e8fe09607fd1b40077b0ff7fdcc1caecf2211191f1f5dc2be963cb0cff', 'LucyLu', '$2b$10$k2TxX8cYsy7BJzvp4mztwuf0gl88Q.8q.1T6MRNw2ZvoiZdoVHh96', 0),
('$2b$10$hoPvPlFOVU.6/TrVl6O5wenxYvjBjqxrrolaRzewWj6s2m5OPkOg2','c4cb9c103958e313a9a6a8fe3f4ea4fd82a494de9d95eba92d4c616afe7e790a', 'michel_g', '$2b$10$MbuiCNckwcRTd0FbhkqdceNNWMUzk361t8QTRHVh5lJXU4fe.0QVG', 0);
UNLOCK TABLES;

CREATE TABLE Post (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    userId VARCHAR(200) NOT NULL,
    imageUrl VARCHAR(200),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (id)
)
ENGINE=INNODB;

LOCK TABLES Post WRITE;
INSERT INTO Post (content, userId) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$NZAUDicfPIEiKR45mqaqf.wzr5VlNAdrnyzU0d22vPK.Rdi0619uC'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$453mM1WWH4GDdqIVm9Vf2uX.z.Juqdcc3K.oUSYN5e//z9CehZkXq'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$453mM1WWH4GDdqIVm9Vf2uX.z.Juqdcc3K.oUSYN5e//z9CehZkXq'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$OZ4UQykEwCiaYoP50/uEne6w.iYUQodxZHRb.0h.656rDMQtOYS9K'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$hoPvPlFOVU.6/TrVl6O5wenxYvjBjqxrrolaRzewWj6s2m5OPkOg2'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$R3FB3H0pjeU0ExiaIB37G.7qvnfcIL0xeyjrs0Ui5htQz5dwTN9gi'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$hoPvPlFOVU.6/TrVl6O5wenxYvjBjqxrrolaRzewWj6s2m5OPkOg2'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$OZ4UQykEwCiaYoP50/uEne6w.iYUQodxZHRb.0h.656rDMQtOYS9K'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$R3FB3H0pjeU0ExiaIB37G.7qvnfcIL0xeyjrs0Ui5htQz5dwTN9gi'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$R3FB3H0pjeU0ExiaIB37G.7qvnfcIL0xeyjrs0Ui5htQz5dwTN9gi'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$hoPvPlFOVU.6/TrVl6O5wenxYvjBjqxrrolaRzewWj6s2m5OPkOg2'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$WMVi4RmleCWXe8yFwnKHTu8x52QolN6SpgudEQYWgw1IcN0ng6kb.'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$R3FB3H0pjeU0ExiaIB37G.7qvnfcIL0xeyjrs0Ui5htQz5dwTN9gi'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$RTUsFsAe7EkiW25YzozW9.vyUecsFdPDGJAmL67WCHVWmzIkJeN3u'),
('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','$2b$10$UhjNq74178/Ii.7YxzJ5c.xTTA3FYVF5IhwlK30uRp/w9eKMwuAVK');
UNLOCK TABLES;

CREATE TABLE Comment (

    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    userId VARCHAR(200) NOT NULL,
    postId INT UNSIGNED NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (id)
)
ENGINE=INNODB;

LOCK TABLES Comment WRITE;
INSERT INTO Comment (content, userId, postId) VALUES ('This is a comment !','$2b$10$hoPvPlFOVU.6/TrVl6O5wenxYvjBjqxrrolaRzewWj6s2m5OPkOg2', 3),
('This is a comment !','$2b$10$453mM1WWH4GDdqIVm9Vf2uX.z.Juqdcc3K.oUSYN5e//z9CehZkXq', 6),
('This is a comment !','$2b$10$R3FB3H0pjeU0ExiaIB37G.7qvnfcIL0xeyjrs0Ui5htQz5dwTN9gi', 10),
('This is a comment !','$2b$10$44n48/rSeiESq5bEwgwq9ObwCCal.b8sG5VLWFnh3lS6NuqFUqy8m', 11),
('This is a comment !','$2b$10$R3FB3H0pjeU0ExiaIB37G.7qvnfcIL0xeyjrs0Ui5htQz5dwTN9gi', 14),
('This is a comment !','$2b$10$44n48/rSeiESq5bEwgwq9ObwCCal.b8sG5VLWFnh3lS6NuqFUqy8m', 12),
('This is a comment !','$2b$10$OZ4UQykEwCiaYoP50/uEne6w.iYUQodxZHRb.0h.656rDMQtOYS9K', 12),
('This is a comment !','$2b$10$UhjNq74178/Ii.7YxzJ5c.xTTA3FYVF5IhwlK30uRp/w9eKMwuAVK', 6),
('This is a comment !','$2b$10$NZAUDicfPIEiKR45mqaqf.wzr5VlNAdrnyzU0d22vPK.Rdi0619uC', 6),
('This is a comment !','$2b$10$453mM1WWH4GDdqIVm9Vf2uX.z.Juqdcc3K.oUSYN5e//z9CehZkXq', 4),
('This is a comment !','$2b$10$aU2qVyXmYsICU67Pr4rASObp4kPZoeHdQYAmiPj5JyTOfHD6bRlvG', 3),
('This is a comment !','$2b$10$UhjNq74178/Ii.7YxzJ5c.xTTA3FYVF5IhwlK30uRp/w9eKMwuAVK', 9),
('This is a comment !','$2b$10$aU2qVyXmYsICU67Pr4rASObp4kPZoeHdQYAmiPj5JyTOfHD6bRlvG', 5),
('This is a comment !','$2b$10$UaQGilFnllqbIG8TJXmzIOz2YR0Vgx4qTey78B6bloAOkCMLlZeNy', 4),
('This is a comment !','$2b$10$RTUsFsAe7EkiW25YzozW9.vyUecsFdPDGJAmL67WCHVWmzIkJeN3u', 3),
('This is a comment !','$2b$10$hoPvPlFOVU.6/TrVl6O5wenxYvjBjqxrrolaRzewWj6s2m5OPkOg2', 7),
('This is a comment !','$2b$10$NZAUDicfPIEiKR45mqaqf.wzr5VlNAdrnyzU0d22vPK.Rdi0619uC', 15),
('This is a comment !','$2b$10$OZ4UQykEwCiaYoP50/uEne6w.iYUQodxZHRb.0h.656rDMQtOYS9K', 11),
('This is a comment !','$2b$10$aU2qVyXmYsICU67Pr4rASObp4kPZoeHdQYAmiPj5JyTOfHD6bRlvG', 11),
('This is a comment !','$2b$10$453mM1WWH4GDdqIVm9Vf2uX.z.Juqdcc3K.oUSYN5e//z9CehZkXq', 10),
('This is a comment !','$2b$10$RTUsFsAe7EkiW25YzozW9.vyUecsFdPDGJAmL67WCHVWmzIkJeN3u', 2),
('This is a comment !','$2b$10$NZAUDicfPIEiKR45mqaqf.wzr5VlNAdrnyzU0d22vPK.Rdi0619uC', 7),
('This is a comment !','$2b$10$UhjNq74178/Ii.7YxzJ5c.xTTA3FYVF5IhwlK30uRp/w9eKMwuAVK', 15),
('This is a comment !','$2b$10$NZAUDicfPIEiKR45mqaqf.wzr5VlNAdrnyzU0d22vPK.Rdi0619uC', 13),
('This is a comment !','$2b$10$UaQGilFnllqbIG8TJXmzIOz2YR0Vgx4qTey78B6bloAOkCMLlZeNy', 14),
('This is a comment !','$2b$10$hoPvPlFOVU.6/TrVl6O5wenxYvjBjqxrrolaRzewWj6s2m5OPkOg2', 2),
('This is a comment !','$2b$10$R3FB3H0pjeU0ExiaIB37G.7qvnfcIL0xeyjrs0Ui5htQz5dwTN9gi', 11),
('This is a comment !','$2b$10$44n48/rSeiESq5bEwgwq9ObwCCal.b8sG5VLWFnh3lS6NuqFUqy8m', 2),
('This is a comment !','$2b$10$RTUsFsAe7EkiW25YzozW9.vyUecsFdPDGJAmL67WCHVWmzIkJeN3u', 12),
('This is a comment !','$2b$10$WMVi4RmleCWXe8yFwnKHTu8x52QolN6SpgudEQYWgw1IcN0ng6kb.', 15);
UNLOCK TABLES;

CREATE TABLE Likes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
  postId INT UNSIGNED NOT NULL,
  userId VARCHAR(200) NOT NULL,
  PRIMARY KEY (postId, userId)
)
ENGINE=INNODB;

LOCK TABLES Likes WRITE;
INSERT INTO Likes (postId, userId) VALUES (3, '$2b$10$OZ4UQykEwCiaYoP50/uEne6w.iYUQodxZHRb.0h.656rDMQtOYS9K'),
(14, '$2b$10$aU2qVyXmYsICU67Pr4rASObp4kPZoeHdQYAmiPj5JyTOfHD6bRlvG'),
(1, '$2b$10$44n48/rSeiESq5bEwgwq9ObwCCal.b8sG5VLWFnh3lS6NuqFUqy8m'),
(1, '$2b$10$NZAUDicfPIEiKR45mqaqf.wzr5VlNAdrnyzU0d22vPK.Rdi0619uC'),
(2, '$2b$10$44n48/rSeiESq5bEwgwq9ObwCCal.b8sG5VLWFnh3lS6NuqFUqy8m'),
(8, '$2b$10$hoPvPlFOVU.6/TrVl6O5wenxYvjBjqxrrolaRzewWj6s2m5OPkOg2'),
(7, '$2b$10$WMVi4RmleCWXe8yFwnKHTu8x52QolN6SpgudEQYWgw1IcN0ng6kb.'),
(3, '$2b$10$44n48/rSeiESq5bEwgwq9ObwCCal.b8sG5VLWFnh3lS6NuqFUqy8m'),
(7, '$2b$10$R3FB3H0pjeU0ExiaIB37G.7qvnfcIL0xeyjrs0Ui5htQz5dwTN9gi'),
(10, '$2b$10$NZAUDicfPIEiKR45mqaqf.wzr5VlNAdrnyzU0d22vPK.Rdi0619uC'),
(14, '$2b$10$NZAUDicfPIEiKR45mqaqf.wzr5VlNAdrnyzU0d22vPK.Rdi0619uC'),
(4, '$2b$10$44n48/rSeiESq5bEwgwq9ObwCCal.b8sG5VLWFnh3lS6NuqFUqy8m'),
(14, '$2b$10$UhjNq74178/Ii.7YxzJ5c.xTTA3FYVF5IhwlK30uRp/w9eKMwuAVK'),
(7, '$2b$10$44n48/rSeiESq5bEwgwq9ObwCCal.b8sG5VLWFnh3lS6NuqFUqy8m'),
(3, '$2b$10$WMVi4RmleCWXe8yFwnKHTu8x52QolN6SpgudEQYWgw1IcN0ng6kb.');
UNLOCK TABLES;

ALTER TABLE Post ADD CONSTRAINT fk_user_Id FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE;

ALTER TABLE Comment ADD CONSTRAINT fk_comment_user_Id FOREIGN KEY (userId) REFERENCES User (id) ON DELETE CASCADE;
ALTER TABLE Comment ADD CONSTRAINT fk_comment_post_Id FOREIGN KEY (postId) REFERENCES Post (id) ON DELETE CASCADE;

ALTER TABLE Likes ADD CONSTRAINT fk_likes_post_Id FOREIGN KEY (postId) REFERENCES Post (id) ON DELETE CASCADE;
ALTER TABLE Likes ADD CONSTRAINT fk_likes_user_Id FOREIGN KEY (userId) REFERENCES User (id) ON DELETE CASCADE;
