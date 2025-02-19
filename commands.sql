CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text ,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

INSERT INTO blogs (author, url, title) 
VALUES ('Mikko Mesikämmen', 'http://testi.fi', 'Tarinoita metsästä');

INSERT INTO blogs (author, url, title) 
VALUES ('Jorma', 'http://testi2.fi', 'Tarinoita kaupungista');

INSERT INTO blogs (author, url, title) 
VALUES ('Pera', 'http://testi3.fi', 'Tarinoita landelta');


