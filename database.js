let sqlite3 = require('sqlite3');
let database = new sqlite3.Database('./database.db');

// Customer table attributes
// Dealership table attributes
// Car table attributes
// Order table attributes 

const createTableCustomersQuery = 
	`CREATE TABLE IF NOT EXISTS customers (
		first_name TEXT,
		last_name TEXT,
		home_city TEXT)`;

const createTableDealershipsQuery = `
	CREATE TABLE IF NOT EXISTS dealerships (
		location TEXT)`;

const createTableCarsQuery = `
	CREATE TABLE IF NOT EXISTS cars (
		make TEXT,
		model TEXT,
		year INTEGER,
		body_type TEXT,
		wheel_drive TEXT)`;

const createTableOrdersQuery = `
	CREATE TABLE IF NOT EXISTS orders (
		order_number,
		customer_id,
		car_id)`;


	// database.run(createTableCustomersQuery, error=> {
	// 	if(error) console.log(new Error("Create customers table failed"), error);
	// 	else console.log("Create customers table succeeded");
	// });
	// database.run(createTableDealershipsQuery, error=> {
	// 	if(error) console.log(new Error("Create dealerships table failed"), error);
	// 	else console.log("Create dealerships table succeeded");
	// });
	// database.run(createTableCarsQuery, error=> {
	// 	if(error) console.log(new Error("Create cars table failed"), error);
	// 	else console.log("Create cars table succeeded");
	// });
	// database.run(createTableOrdersQuery, error=> {
	// 	if(error) console.log(new Error("Create orders table failed"), error);
	// 	else console.log("Create orders table succeeded");
	// });

module.exports = database;

