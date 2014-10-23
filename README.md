tdonor
======

Blood donation aid through Twitter API v1.1. 

This project aims to display tweets based on a pre-defined hashtag and location. By tweeting with #tweetforblood, the home feed
updates real-time thanks to the filter option. However, there are some fixes and todos to make this app convenient.

Bower for Bootstrap 3 and Grunt.

Modules installed: 
  - Express
  - Jade
  - body-parser
  - twitter
  - cookies
  - socket.io
  - consolidate
  - Mongoose (future use)
  - redis (future use)
  - ip (future use)
  - geoip-lite (future use)
  
#FIXME if looking for contribution:
  - .emit() in ./controllers/twitter.js fires multiple times on multiple page refreshes.
  - figuring out how to instantiate Socket object on server and access it globally (current sollution is fine).

#TODO together
  - caching tweets in redis with proper periodic updates of the Stream API and REST API.
  - Chat application with block list stored in MongoDB using mongoose.js.
    - (extention) connect user with nearby conencted users to chat, using ip, geoip, twitter and redis subscribe and publish.
  
