let express = require('express');
let database = require('./database.js');
let app = express();

//Middleware 
app.use(express.json());
//Configuration Variables
const port = 9000;

// Routes
app.get('/', (req, res) => {
	res.send('uh hello');
});

//Customers 
app.get('/api/customers', (req, res)=> {
	const getAllCustomers = 'SELECT * FROM customers';

	database.all(getAllCustomers, (error, results)=> {
		if(error) {
			console.log("Get all customers table failed", error);
			res.sendStatus(500); 
		}
		else res.status(200).json(results);
	});
});

app.get('api/customers/:id', (req, res)=> {
	const customerId = req.params.id;
	const getOneCustomer = `SELECT * FROM customers WHERE customers.oid = ?`;

	database.all(getOneCustomer, [customerId], (error, results)=> {
		if(error) {
			console.log("Failed to retrieve a customer from table", error);
			res.sendStatus(500);
		}
		else res.status(200).json(results);
	});
});

app.post('/api/customers', (req, res)=> {
	const reqBody = [req.body.first_name, req.body.last_name, req.body.home_city];
	const insertNewCustomer = 'INSERT INTO customers VALUES (?, ?, ?)';

	database.run(insertNewCustomer, reqBody, error => {
		if(error) {
			console.log(`Create new customer with name ${req.body.first_name} ${req.body.last_name} failed`);
			res.sendStatus(500);
		} else {
			console.log(`Successfully added new customer ${req.body.first_name} ${req.body.last_name}`);
			res.sendStatus(200);
		}
	});
});

app.put('/api/customers/:id', (req, res) => {
	const customerId = req.params.id;
	const updateOneCustomer = `UPDATE customers SET FIRST_NAME = ?, LAST_NAME = ? WHERE customers.oid = ${customerId}`;

	//use the query string and req.body to run the query in the database
	database.run(updateOneCustomer, [req.body.first_name, req.body.last_name], error=> {
		if(error) {
			console.log(`Update customer named ${req.body.first_name} ${req.body.last_name} failed`, error);
			res.sendStatus(500);
		} else {
			console.log(`Customer named ${req.body.first_name} ${req.body.last_name} was updated successfully`);
			res.sendStatus(200);
		}
	})
})
//for later: I want to automatically create a new ID everytime a name is created

app.delete('/api/customers/:id', (req, res)=> {
	const customerId = [req.params.id];
	const deleteCustomer = `DELETE FROM customers WHERE ? = oid`;

	database.run(deleteCustomer, customerId, error=> {
		if(error) {
			console.log(`Delete from customer with ID of ${customerId} failed`);
			res.sendStatus(500);
		} else {
			console.log(`Delete from customer with ID of ${customerId} succeeded`);
			res.sendStatus(200);
		}
	})
})

//Dealerships

app.get('/api/dealerships', (req, res)=> {
	const getAllDealerships = 'SELECT * FROM dealerships';

	database.all(getAllDealerships, (error, results)=> {
		if(error) {
			console.log("Get all dealerships table failed", error);
			res.sendStatus(500); 
		}
		else res.status(200).json(results);
	});
});

app.get('/api/dealership', (req, res)=> {
	console.log("inside function")
	const dealershipLocation = req.body.location;
	const getOneDealership = `SELECT * FROM dealerships WHERE dealerships.location = ?`;

	database.all(getOneDealership, [dealershipLocation], (error, results)=> {
		if(error) {
			console.log("Failed to retrieve a dealership from table", error);
			res.sendStatus(500);
		}
		else res.status(200).json(results);
	});
});

app.post('/api/dealerships', (req, res)=> {
	const reqBody = [req.body.location];
	const insertNewDealership = 'INSERT INTO dealerships VALUES (?)';

	database.run(insertNewDealership, reqBody, error => {
		if(error) {
			console.log(`Create new dealership in ${req.body.location} failed`);
			res.sendStatus(500);
		} else {
			console.log(`Successfully added new dealership ${req.body.location}`);
			res.sendStatus(200);
		}
	});
});

app.put('/api/dealerships/:id', (req, res) => {
	const dealershipId = req.params.id;
	const updateOneDealership = `UPDATE dealerships SET LOCATION = ? WHERE dealerships.oid = ${dealershipId}`;

	database.run(updateOneDealership, [req.body.location], error=> {
		if(error) {
			console.log(`Update dealerships named ${req.body.location} failed`, error);
			res.sendStatus(500);
		} else {
			console.log(`Dealership in ${req.body.location} was updated successfully`);
			res.sendStatus(200);
		}
	})
})

app.delete('/api/dealerships/:id', (req, res)=> {
	const dealershipId = [req.params.id];
	const deleteDealership = `DELETE FROM dealerships WHERE ? = oid`;

	database.run(deleteDealership, dealershipId, error=> {
		if(error) {
			console.log(`Delete from dealerships with ID of ${dealershipId} failed`);
			res.sendStatus(500);
		} else {
			console.log(`Delete from dealerships with ID of ${dealershipId} succeeded`);
			res.sendStatus(200);
		}
	})
})
	
//Cars

app.get('/api/cars', (req, res)=> {
	const getAllCars = 'SELECT * FROM cars';

	database.all(getAllCars, (error, results)=> {
		if(error) {
			console.log("Get all cars table failed", error);
			res.sendStatus(500); 
		}
		else res.status(200).json(results);
	});
});

app.get('api/cars/:id', (req, res)=> {
	const carId = req.params.id;
	const getOneCar = `SELECT * FROM cars WHERE cars.oid = ?`;

	database.all(getOneCar, [carId], (error, results)=> {
		if(error) {
			console.log("Failed to retrieve a car from table", error);
			res.sendStatus(500);
		}
		else res.status(200).json(results);
	});
});

app.post('/api/cars', (req, res)=> {
	const reqBody = [req.body.make, req.body.model, req.body.year, req.body.body_type, req.body.wheel_drive];
	const insertNewCar = 'INSERT INTO cars VALUES (?, ?, ?, ?, ?)';

	database.run(insertNewCar, reqBody, error => {
		if(error) {
			console.log(`Creating car make: ${req.body.make} model: ${req.body.model} failed`);
			res.sendStatus(500);
		} else {
			console.log(`Created car make: ${req.body.make} model: ${req.body.model} successfully`);
			res.sendStatus(200);
		}
	});
});

app.put('/api/cars/:id', (req, res) => {
	const carId = req.params.id;
	const updateOneCar = `UPDATE cars SET MODEL = ?, MAKE = ?, YEAR = ?, BODY_TYPE = ?, WHEEL_DRIVE = ? WHERE cars.oid = ${carId}`;

	//use the query string and req.body to run the query in the database
	database.run(updateOneCar, [req.body.make, req.body.model], error=> {
		if(error) {
			console.log(`Update car make: ${req.body.make} model: ${req.body.model} failed`, error);
			res.sendStatus(500);
		} else {
			console.log(`Update car make: ${req.body.make} model: ${req.body.model} successfully`);
			res.sendStatus(200);
		}
	})
})

//THIS DOESN'T CHANGE THE OTHER DESCRIPTIONS :(

app.delete('/api/cars/:id', (req, res)=> {
	const carId = [req.params.id];
	const deleteCar = `DELETE FROM cars WHERE ? = oid`;

	database.run(deleteCar, carId, error=> {
		if(error) {
			console.log(`Delete from cars with ID of ${carId} failed`);
			res.sendStatus(500);
		} else {
			console.log(`Delete from cars with ID of ${carId} succeeded`);
			res.sendStatus(200);
		}
	})
})

// Orders (join tables)

// app.get('/api/customers/:id/cars', (req, res)=> {
// 	const customerId = req.params.id;
// 	const queryString = "SELECT * FROM orders WHERE customer_id = ?";

// 	database.all(queryString, [customerId], (error, results) =>{
// 		if(error) {
// 			console.log(error)
// 			res.sendStatus(500);
// 		} else res.status(200).json(results);
// 	})
// })
// //Create an association
// app.post('/api/customers/:id/cars', (req, res)=>{
// 	const customerId = req.params.id;
// 	const carId = req.body.car_id;
// 	cons
// })





app.listen(port, () => {
	console.log(`App listening on port ${port}`);
})

