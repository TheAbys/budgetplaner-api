CREATE TABLE IF NOT EXISTS expenses (
    id int(11) NOT NULL,
    name varchar(200) NOT NULL,
    cost decimal(10,2),
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE expenses ADD PRIMARY KEY (id);
ALTER TABLE expenses MODIFY id int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE expenses ADD COLUMN userid int(11) not null;