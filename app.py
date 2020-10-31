from flask import Flask, render_template, session, redirect, jsonify, request, json, url_for
import requests
from functools import wraps
import pymongo
import urllib.parse
from bson.json_util import dumps

inventory_books = []

username = urllib.parse.quote_plus("priyam")
password = urllib.parse.quote_plus("Qwerty@1234")

app = Flask(__name__)
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'

# Database

client = pymongo.MongoClient("mongodb+srv://{}:{}@cluster0.guqz8.mongodb.net/logintest?retryWrites=true&w=majority".format(username,password))
db = client.booksinventory


@app.route('/')
def home():
  return render_template('home.html')

@app.route('/inventory/')
def inventory():
  global inventory_books
  inventory_books = list(db.books.find())
  return render_template('inventory.html')

@app.route('/inventory/ajax/',methods=['GET'])
def getinventory():
  return jsonify(list(inventory_books)), 200


@app.route('/checkbook/ajax/',methods=['POST'])
def checkbookajax():
  id = request.form.get('id')
  temp = { "_id": id}
  if not db.books.find_one(temp):
    return jsonify(0), 200
  data = db.books.find_one(temp)
  return jsonify(data), 200

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

@app.route('/removebook/ajax/',methods=['POST'])
def removebookajax():
  id = request.form.get('id')
  temp = {"_id": id}
  db.books.remove(temp)
  return jsonify(1), 200

@app.route('/updatebook',methods=['GET'])
def updatebookajax():
  id = request.args.get('id')
  return redirect(url_for('updatebook', id=id))

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

@app.route('/addbooks/',methods=['POST'])
def addbooks():
  id = request.form.get('id')
  num = request.form.get('num')
  temp = { "_id": id}
  dbdata = db.books.find_one(temp)
  num = int(num)
  num +=dbdata["count"]
  newvalues = { "$set": { "_id": id, "count": num } }
  db.books.update_one(temp, newvalues)
  return jsonify(),200

# if __name__ == "__main__":
#     app.run(host="0.0.0.0",port=8000,debug=True)