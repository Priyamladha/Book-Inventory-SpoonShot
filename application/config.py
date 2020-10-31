import urllib.parse

# Temporary username and passwords, add yours.
mongodbUsername = "priyam" 
mongodbPassword = "Qwerty@1234"

username = urllib.parse.quote_plus(mongodbUsername)
password = urllib.parse.quote_plus(mongodbPassword)