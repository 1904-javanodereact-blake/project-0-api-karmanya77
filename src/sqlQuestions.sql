-- SQL Lab

-- Setting up Oracle Chinook
-- In this section you will begin the process of working with the Oracle Chinook database
-- Task – Open the Chinook_Oracle.sql file and execute the scripts within.
-- 2.0 SQL Queries
-- In this section you will be performing various queries against the Oracle Chinook database.
-- 2.1 SELECT
-- Task – Select all records from the Employee table.
select * from employee;
-- Task – Select all records from the Employee table where last name is King.
select * from employee where lastname = 'King';
-- Task – Select all records from the Employee table where first name is Andrew and REPORTSTO is NULL.
select * from employee where firstname = 'Andrew' AND reportsto is null;

-- 2.2 ORDER BY
-- Task – Select all albums in Album table and sort result set in descending order by title.
select * from album order by title desc;
-- Task – Select first name from Customer and sort result set in ascending order by city
select firstname from customer order by city;

-- 2.3 INSERT INTO
-- Task – Insert two new records into Genre table
 insert into genre (genreid,name) values (27,'Bollywood'),(28,'Psychedelic');
-- Task – Insert two new records into Employee table
insert into employee (employeeid,lastname,firstname,title) values (9,'Suryavanshi','Karmanya','Full Stack Developer'),
			(10,'Hunt','Ethan','MI6 Agent');
-- Task – Insert two new records into Customer table
insert into customer (customerid,firstname,lastname,email) values (60,'Karmanya','Suryavanshi','abcd@gmail.com'),
		(61,'Shreyas','Kathavate','xyz@gmail.com');

-- 2.4 UPDATE
-- Task – Update Aaron Mitchell in Customer table to Robert Walter
update customer set firstname = 'Robert',lastname = 'Walter' where firstname = 'Aaron';
-- Task – Update name of artist in the Artist table “Creedence Clearwater Revival” to “CCR”
update artist set name = 'CCR' where name = 'Creedence Clearwater Revival'; 

-- 2.5 LIKE
-- Task – Select all invoices with a billing address like “T%”
select * from invoice where billingaddress like 'T%';

-- 2.6 BETWEEN
-- Task – Select all invoices that have a total between 15 and 50
select * from invoice where total between 15 and 50;
-- Task – Select all employees hired between 1st of June 2003 and 1st of March 2004
select * from employee where hiredate between 'June 1,2003' and 'March 1,2004';

-- 2.7 DELETE
-- Task – Delete a record in Customer table where the name is Robert Walter (There may be constraints that rely on this, find out how to resolve them).
Alter table invoice 
drop constraint fk_invoicecustomerid;

alter table invoice 
add constraint fk_invoicecustomerid_cascade
foreign key (customerid) references chinook.customer(customerid) on delete cascade;

alter table invoiceline
drop constraint fk_invoicelineinvoiceid;

alter table invoiceline
add constraint fk_invoicelineinvoiceid_cascade
foreign key (invoiceid) references chinook.invoice(invoiceid) on delete cascade;

delete from customer where firstname = 'Robert';

-- SQL Functions
-- In this section you will be using the Oracle system functions, as well as your own functions, to perform various actions against the database
-- 3.1 System Defined Functions
-- Task – Use a function that returns the current time.
select now();
-- Task – Use a function that returns the length of a mediatype from the mediatype table
select length(name) as  Length_of_Media_Types
from mediatype;

-- 3.2 System Defined Aggregate Functions
-- Task – Use a function that returns the average total of all invoices
select avg(total) from invoice;
-- Task – Use a function that returns the most expensive track
select max(unitprice) from track;

-- 7.0 JOINS
-- In this section you will be working with combing various tables through the use of joins. You will work with outer, inner, right, left, cross, and self joins.
-- 7.1 INNER
-- Task – Create an inner join that joins customers and orders and specifies the name of the customer and the invoiceId.
select customer.firstname,customer.lastname, invoice.invoiceid
from customer
inner join invoice on invoice.customerid = customer.customerid;

-- 7.2 OUTER
-- Task – Create an outer join that joins the customer and invoice table, specifying the CustomerId, firstname, lastname, invoiceId, and total.


-- 7.3 RIGHT
-- Task – Create a right join that joins album and artist specifying artist name and title.
-- 7.4 CROSS
-- Task – Create a cross join that joins album and artist and sorts by artist name in ascending order.
-- 7.5 SELF
-- Task – Perform a self-join on the employee table, joining on the reportsto column.