from flask import Flask, render_template, session, redirect, jsonify, request, json, url_for
import requests
from functools import wraps
import pymongo
from application.config import username,password

app = Flask(__name__)
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'

# Database

client = pymongo.MongoClient("mongodb+srv://{}:{}@cluster0.guqz8.mongodb.net/logintest?retryWrites=true&w=majority".format(username,password))
db = client.booksinventory

from application import routes
