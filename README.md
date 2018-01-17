# Swiggy Clone

Description:- I have tried to implement the core features of an online food delivery app. This project is an API built with node,
which would be consumed by an Angular front end. I have designed this application by assuming various processes, that are followed 
for food delivery business model. 

#: NODE.JS, JWT, SOCKET.IO, MONGODB, MONGOOSE, PASSPORT.JS  

Key Features:-
1. Account Management: There are 4 roles namely Admin, Customer, Vendor, DeliveryPerson. Customer can sign up as usual, but the Vendor &
DeliveryPerson need an OTP while signup, which would be added by the admin in to db after a partnership has been established. Sign In is 
secured using JWT Authentication. I have implemented various strategies which would be used for authentication by "Passport.js".

2. Wallet: No Food Delivery app can try to be a real project without a payment system. In order to mimic that, i have created a wallet 
system that would be used for all the transactions between the 3 parties. Wallet would be created for each user during signup.

3. Order Management System - OMS : This is a service that would be invoked once the orderSubmit hits the server. This service tracks the
complete lifecycle of the order. I have clearly described the step by step procedure in "services/OMS.js", i would like you to go
through it. In a nutshell, the order reaches OMS and then calculates the order amount , then verification for sufficient funds in the 
customer wallet is done to proceed for transaction. The amount is added to the admin's wallet. Order data is stored and then the service 
proceeds for delivery assignment. Once, the Transaction is successfull, response is sent to the client and from then on the client would 
recieve updates via websockets, which would update all the steps like delivery assignment etc.

4. Notifications: Real time data services enhance user experience and efficiency of the server by responding to client at the earliest thereby reducing the load on server. In this application, 'Socket.IO' a framework for real time comm using websockets protocol has been used to notify the client on various updates. ex: 'New-Order' notif to vendor, 'order-dispatched' notif to customer, 'Delivery details' notif to delivery person etc. 

** Note:- The Notification system & DeliveryPerson Assignment is still a Work-In-Progress.

Core Implementation:-
1. Validation: I have used "Joi", which is a really nice package to separate our validation schemas and use them in routing making the 
code clean and clear.

2. Routing: Routers have been built depending on the entity they were targeting, following the 3 steps
 validation => Authentication => Controller method.

3. Authentication: I have implemented Token based authentication with the help of JWT & passport.js.

4. Transactions: Since, there was no direct Transaction support in MongoDB as opposed to sql databases, i have implemented the wallet 
transactions using "2 Phase Commit System". The official mongodb docs have suggested to follow this system. Although, transactions
aren't preferred to be done using a NOSQL database.  

Deployment: The api has been deployed to heroku and hosted on 'https://eatup-api.herokuapp.com/'.

