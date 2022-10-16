drop table if exists task;
create table task
(
    id      string primary key,
    text    text,
    status  text,
    created number
);
