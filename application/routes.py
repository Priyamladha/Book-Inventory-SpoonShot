from flask import Flask, render_template, session, redirect, jsonify, request, json, url_for
import requests
from functools import wraps
import pymongo
from app import app, db

# Global list to store temporary documents from mongodb
inventory_books = []

# Redirects to inventory route
@app.route('/')
def home():
  return redirect('/inventory')

# Rendering Start Page
@app.route('/booksearch/')
def booksearch():
  return render_template('home.html')

# Rendering Inventory page which show all the books currently in inventory
@app.route('/inventory/')
def inventory():
  return render_template('inventory.html')

# Ajax call from javascript on inventory page to fetch all the documents in the database
@app.route('/inventory/ajax/',methods=['GET'])
def getinventory():
  global inventory_books
  inventory_books = list(db.books.find())
  return jsonify(list(inventory_books)), 200

# Ajax call from javascript on book search page to check if a book exists in database or not
@app.route('/checkbook/ajax/',methods=['POST'])
def checkbookajax():
  id = request.form.get('id')
  temp = { "_id": id}
  if not db.books.find_one(temp):
    return jsonify(0), 200
  data = db.books.find_one(temp)
  return jsonify(data), 200

# Ajax call from javascript on book search page to add a book in the database book inventory
@app.route('/addbook/ajax/',methods=['POST'])
def addbookajax():
  id = request.form.get('id')
  if(id==""):
    pass
  else:
    temp = { "_id": id,"count":0}
    if not db.books.find_one({ "_id": id}):
      db.books.insert_one(temp)
  return jsonify(1), 200

# Ajax call from javascript to remove a book in the database book inventory
@app.route('/removebook/ajax/',methods=['POST'])
def removebookajax():
  id = request.form.get('id')
  temp = {"_id": id}
  db.books.remove(temp)
  return jsonify(1), 200

# Ajax call from javascript on update book page to update number of copies of a book id inside inventory
# Redirects to updatebook route with id parameter
@app.route('/updatebook',methods=['GET'])
def updatebookajax():
  id = request.args.get('id')
  return redirect(url_for('updatebook', id=id))

""" Api call is done using the book id and json data is fetched for the book id and a key-value pair variable
 is created which stores book details which then is passed to html as a jinja object.
"""
@app.route('/updatebook/<id>',methods=['GET'])
def updatebook(id):
  temp = { "_id": id}
  dbdata = db.books.find_one(temp)
  response = requests.get("https://www.googleapis.com/books/v1/volumes/"+id)
  data = response.json()
  title = data["volumeInfo"]["title"]
  img = data["volumeInfo"]["imageLinks"]["thumbnail"]
  infolink = data["volumeInfo"]["infoLink"]
  bookcount = dbdata["count"]
  bookdata ={
    'title':title,
    'image': img,
    'count': bookcount,
    'infolink' : infolink
    }
  return render_template('updatebook.html',id=id,bookdata=bookdata)


# Updates the number of copies for the particular book id
@app.route('/addbooks/',methods=['POST'])
def addbooks():
  id = request.form.get('id')
  num = request.form.get('num')
  temp = { "_id": id}
  num = int(num)
  if(num<0):
    num=0
  newvalues = { "$set": { "_id": id, "count": num } }
  db.books.update_one(temp, newvalues)
  return jsonify(),200
