# Stack

-   MongoDB and Mongoose
-   Express
-   React (with TypeScript)
-   Node.js
-   SCSS
-   Vite

# Usage on local machine

1. Download the zip file or git clone to your machine.
2. Run npm install in server and client folders
    ```
    cd client
    npm install
    cd ../server
    npm install
    ```
3. Setup env variables in server folder
    ```
    NODE_ENV=development
    PORT=YOUR_PORT_NUMBER
    MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
    JWT_SECRET=RANDOM_STRING
    ```
4. In client folder change the baseURL for the axios instance (_./client/helpers/axiosInstance.ts_) to `http://localhost:YOUR_PORT_NUMBER/api`
5. Start up the server with `npm run dev` (uses nodemon)
6. Start up the client with `npm run dev` and open in browser
