# MelodyVerse Theme Used

This is a simple social media app where users can share their thoughts and ideas with others. Users can create an account, log in, create posts, and view posts shared by other users.

## Features

- **User Authentication:** Users can sign up for an account and log in securely.
- **Create Posts:** Authenticated users can create new posts to share with others.
- **View Posts:** Users can view posts shared by other users.

## Technologies Used

- **Frontend:** React.js, React Router
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Image Upload:** Cloudinary

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install the dependencies:**


    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory of the project and add the following environment variables:**

    ```bash
    PORT=8080
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    ``` 

4. **Run the app:**

## Frontend

```bash
cd client
npm run dev
```

## Backend

```bash
cd server
npm start
```

## That's it! Thanks for checking out the project. If you have any questions, feel free to reach out.