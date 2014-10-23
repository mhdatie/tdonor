tdonor
======

Blood donation aid through Twitter API v1.1. 

This project aims to display tweets based on a pre-defined hashtag and location. By tweeting with #tweetforblood, the home feed
updates real-time thanks to the filter option. However, there are some fixes and todos to make this app convenient.

Bower for Bootstrap 3.

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
  - Structure of project

#TODO together
  - caching tweets in redis with proper periodic updates of the Stream API and REST API.
  - add the ability to tweet with location and stream nearby tweets only.
  - Chat application with block list stored in MongoDB using mongoose.js.
    - connect user with nearby conencted users to chat, using ip, geoip, twitter and redis subscribe and publish.
  
