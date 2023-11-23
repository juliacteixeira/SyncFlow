create table users(
	user_id serial primary key,
	name varchar(150) not null,
	email varchar(150) not null,
	password varchar(200) not null,
	type varchar(15) not null
);

create table project(
	project_id serial primary key,
	name_project varchar(150) not null,
	description text,
	date_create date not null,
	date_last_update date not null,
	user_id int references users(user_id)
);

create table tasks(
	task_id serial primary key,
	name_task varchar(150) not null,
	description text,
	status varchar(25) not null,
	data_create date not null,
	date_conclusion date not null,
	project_id int references project(project_id)
);