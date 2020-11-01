# SpoonShot Book Inventory Management Assignment

The Application is Deployed on Heroku, Link for the same is [Book Inventory Management](https://spoonshot-bookinventory.herokuapp.com/)
<br/>

## Assumptions
  
* When a book is searched it should display all the list of books and whether they are available in inventory or not. 
* Multiple books could be added from the list of searched title.
* A different page of book inventory should be there which lists all the books currently in inventory.
* It is assumed that when inventory is updated for an existing book it means we can edit number of copies or remove the book.

## Implementation

* The project is build on flask framework which makes it easy to integrate it with mongodb and store and fetch data seamlessly.
<br/>

* Whenever a book title is searched for the page isn't reloaded to fetch the books for that title but instead Ajax is used beacause of which everything happens in backend and enhances the interface and the user experience.
<br/>

* Ajax calls have been used to fetch the json response from Google Books Api which is then displayed over the webpage in form of books.
<br/>

* Whenever a new book is added to the inventory it creates a new div on the inventory page for this book which stores all the display information which makes the webpage dynamic.
<br/>

* In search books, if a book is already present in inventory it will be displayed "Available" also if in stock or not which makes it easy for the user to distinguish whether if a book is present in inventory or not. Also, all the "Not Available" books have an add button and "Available" one's don't.
<br/>

* On update book page Jinja is used to display book information since the webpage is static in nature. Also, the page let's user edit number of copies of the book or remove the book.
## Instructions To Run

* Clone the project and change the working directory with command
    ```
    cd Book-Inventory-SpoonShot
    ```
* Open terminal and run
    ```
    pip install -r requirements.txt
    ```
* Then, run
    
    ```
    export FLASK_APP=app.py
    ```
* Run the server with the command
    ```
    flask run
    ```
* Open the Localhost link - http://127.0.0.1:5000/ on your web browser


<!-- This is how the Application looks


![What is looks like ](static/css/imgs/app.png) -->

<!-- ## Approach



To capture the details of User and Host the idea is Simple

* First created a html page in which User can enter his/her and host details
* For Check-in if the User doesn't enter host details an alert will be given to him stating that no host details added, on successful completion of the form User and
Host Details will get saved in database and also Host will get a sms and email having Visitor Details
* To Store User and Host data Sqlite database is used, ```Flask-SQLAlchemy``` let us do that
* For sms, ```Fast2sms``` dev api is used
* For email, python inbuilt library ```smtplib``` is used also dependency ```Flask-Mail```
* Now more users can check-in with the same procedure or previous one who already are checked-in can check-out
* To Check-out user has to select check-out option and enter his/her details if the details entered are wrong they will alerted that user doesn't exists, basically for check-out phone number should be correct as phone number being a primary key it is used to retrieve data from database
* Once details retrieved a mail is sent to the user stating his/her visit details

## Dependencies Used

* Flask
* Flask-Mail
* Flask-SQLAlchemy
* Jinja2
* requests
* SQLAlchemy -->
