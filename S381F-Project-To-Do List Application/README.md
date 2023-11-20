# To-Do List Application

Group: 22
Name: Chan Kin Tsun (13395240)

Application link: https://s381f-group22.onrender.com/

# Intro

Welcome to the ToDo List App! This simple app allows you to manage your tasks and keep track of completed items. Below, you'll find information on how to use the app and test various functionalities.

# Login/Logout Pages

1. Access the login page: http://localhost:3000/login.

2. You'll be redirected to the login page, where you can enter your credentials.

3. Valid Login Information
	Use the following credentials to log in:

	1. Username: guest1 Password: guest

	2. Username: guest2 Password: guest

4. Logging Out

	To log out, click to logout button. You will be redirected to the home page after successfully logging out.


# CRUD Services
	
1. Adding a Task
	
	On the ToDo list page http://localhost:3000/todo, you can see your existing tasks.

	Click on the "Add Task" link to navigate to the add task page.

	Enter a new task in the input field and click the "+" button to add it to your ToDo list.

2. Completing a Task

	On the ToDo list page http://localhost:3000/todo, you can see your tasks.

	Check the checkbox next to the task you want to mark as completed.

	Click on the "Complete" button to move the selected task to the completed tasks list.

3. Viewing Completed Tasks

	On the ToDo list page http://localhost:3000/todo, click on the "Completed task" link to view completed tasks.

	On the completed tasks page, you can see the list of completed tasks.
	
4. Deleting Completed Tasks

	On the completed tasks page http://localhost:3000/completetask, check the checkbox next to the completed tasks you want to delete.

	Click on the "Delete" button to remove the selected completed tasks.

# API Endpoints

1. Login:

	Endpoint: /login
	HTTP Method: POST
	Parameters: name, password

2. Logout:

	Endpoint: /logout
	HTTP Method: GET

3. Add Task:

	Endpoint: /addtask
	HTTP Method: POST
	Parameters: newtask

4. Remove Task:

	Endpoint: /removetask
	HTTP Method: POST
	Parameters: check (task to be removed)

5. View ToDo List:

	Endpoint: /todo
	HTTP Method: GET

6. View Completed Tasks:

	Endpoint: /completetask
	HTTP Method: GET

7. Delete Completed Tasks:

	Endpoint: /deletecompleted
	HTTP Method: POST
	Parameters: deleteCheck (completed task to be deleted)

