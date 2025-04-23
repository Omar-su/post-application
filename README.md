# Blog Post Management App

A modern **Blog Post Management System** with a React-based frontend and a Go-based backend. The frontend allows users to create, edit, delete, and search blog posts using the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). The backend handles user authentication (login and registration) with secure password hashing and stores credentials in a JSON file. The app supports light/dark theme switching, internationalization, and is fully responsive.

## Features

### User Authentication
- **Registration and Login**: Securely register and log in via the Go backend with hashed passwords.
- **Protected Routes**: Restrict access to post management features to authenticated users.

### Post Management
- **CRUD Operations**: View, create, edit, and delete blog posts using the JSONPlaceholder API.
- **Search Functionality**: Filter posts by title or content with a search bar.

### Theme Switching
- **Light and Dark Modes**: Toggle between themes for better usability.
- **Persistent Theme**: Theme preference persists across sessions.

### Error Handling
- **404 Page**: Custom page for invalid routes.
- **Form Validation**: Client-side validation for login, registration, and post forms.

## Project Structure

### Frontend
```
/frontend
  /src
    /app
      store.js             # Redux store to save state
    /components
      AuthLinks.jsx        # Links for login/register/logout
      Button.jsx           # Reusable button component
      DeleteModal.jsx      # Modal for confirming post deletion
      LanguageSelector.jsx # Language selection dropdown
      Layout.jsx           # Main layout component
      NavBar.jsx           # Navigation bar
      NavGroup.jsx         # Group of navigation links
      NavLink.jsx          # Custom navigation link
      ProfileIcon.jsx      # Profile icon component
      ProtectedRoute.jsx   # Component for protecting routes
      SearchBar.jsx        # Search bar for filtering posts
      Select.jsx           # Reusable select dropdown
      Table.jsx            # Table for displaying posts
      ThemeToggleButton.jsx# Button for toggling themes
      ToggleButton.jsx     # Reusable toggle button
    /features
      /auth
        AuthForm.jsx       # Form to be used by login and register
        authSlice.js       # Redux Toolkit slice for auth state
        Login.jsx          # Login form component
        Login.test.jsx     # Tests for Login component
        Register.jsx       # Registration form component
        Register.test.jsx  # Tests for Register component
      /errors
        NotFound.jsx       # 404 error page component
      /posts
        AddPost.jsx        # Form for creating new posts
        AddPost.test.jsx   # Tests for AddPost component
        EditPost.jsx       # Form for editing posts
        EditPost.test.jsx  # Tests for EditPost component
        PostForm.jsx       # Reusable form for post CRUD
        PostList.jsx       # Displays list of posts
        PostList.test.jsx  # Tests for PostList component
    /icons
      MyCharacter.png      # Profile icon image
    /theme
      theme.js             # Light and dark theme definitions
      ThemeProvider.jsx    # Context for theme switching
    App.js                 # Main app component
    index.js               # Entry point for the React app
```

### Backend
```
/backend
  go.mod                   # Go module dependencies
  go.sum                   # Go dependency checksums
  login.go                 # Login handler logic
  main.go                  # Main server setup and routes
  register.go              # Registration handler logic
  user.go                  # User struct and file operations
  userdata.json            # Stores user credentials (hashed passwords)
```

## Installation

### Prerequisites
- **Node.js** and **npm**: Install Node.js (v16 or higher) from [nodejs.org](https://nodejs.org/).
- **Go**: Install Go (v1.16 or higher) from [go.dev](https://go.dev/).
- A modern web browser (e.g., Chrome, Firefox).

### Frontend Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Omar-su/post-application.git
   cd post-application
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

### Backend Setup
1. **Install Backend Dependencies**:
   ```bash
   cd backend
   go mod tidy
   ```
   This ensures dependencies like `golang.org/x/crypto/bcrypt` and `github.com/rs/cors` are installed.

## Running the Application

### Run the Frontend
```bash
cd frontend
npm start
```
The frontend will run at `http://localhost:3000`.

### Run the Backend
The Go backend handles authentication and runs on `http://localhost:5000`.
```bash
cd backend
go run main.go login.go register.go user.go
```
The server will start at `http://localhost:5000` with `/register` and `/login` endpoints.

### Building for Production
To build the frontend for production:
```bash
cd frontend
npm run build
```
This generates optimized files in the `build/` folder, which can be served with a static server (e.g., `serve -s build`).

## Authentication Process

### Registration
- **Frontend**: Users enter a username and password in the registration form (`http://localhost:3000/register`) via `Register.jsx`.
- **Backend**: The form sends a POST request to `http://localhost:5000/register`. The `RegisterHandler` in `register.go`:
  - Receives the plaintext password.
  - Hashes it using `bcrypt` (a secure hashing algorithm).
  - Stores the hashed password in `userdata.json`.
- **Security**: Passwords are never stored in plaintext. The `bcrypt` library ensures passwords are hashed with a secure salt, making them resistant to rainbow table attacks.

### Login
- **Frontend**: Users enter their credentials in the login form (`http://localhost:3000/login`) via `Login.jsx`.
- **Backend**: The form sends a POST request to `http://localhost:5000/login`. The `LoginHandler` in `login.go`:
  - Receives the plaintext password.
  - Compares it with the stored hash in `userdata.json` using `bcrypt`.
  - Returns a success response if the password matches.
- **Security**: The plaintext password is never stored or logged. The comparison happens securely using `bcrypt`, ensuring attackers cannot reverse-engineer the password even if they access `userdata.json`.

### Why It’s Secure
- **Hashing on Backend**: Passwords are hashed in the backend (`register.go`), ensuring plaintext passwords are never transmitted over the network beyond the initial HTTPS request.
- **bcrypt**: Uses a strong, slow hashing algorithm with a unique salt per password, preventing brute-force and precomputed attacks.
- **CORS**: The backend allows requests only from `http://localhost:3000`, preventing unauthorized cross-origin access.

## Tools Used

### Frontend
- **React**: Component-based UI library for building the interface.
- **Redux (with Redux Toolkit)**: State management for predictable state handling (e.g., `authSlice.js`).
- **React Router**: Declarative routing for navigation (e.g., `ProtectedRoute.jsx`).
- **Styled Components**: CSS-in-JS for themable styling (used with `ThemeProvider.jsx`).
- **i18next**: Internationalization for multi-language support (via `LanguageSelector.jsx`).
- **JSONPlaceholder API**: Mock API for blog post data.
- **Jest**: Testing framework for unit tests (e.g., `Login.test.jsx`).

### Backend
- **Go**: Server for user authentication (`main.go`, `login.go`, `register.go`).
- **bcrypt**: Password hashing library (`golang.org/x/crypto/bcrypt`).
- **CORS**: Middleware for cross-origin requests (`github.com/rs/cors`).
- **JSON File Storage**: Stores user credentials in `userdata.json`.

## Lessons Learned
Through this project, the following concepts and tools were explored and understood:

- **React and Redux**: Learned how to build a component-based UI with React and manage state predictably using Redux (and Redux Toolkit with `authSlice.js`).
- **i18next Library**: Gained experience in adding internationalization to a React app for multi-language support.
- **CORS Importance**: Understood the role of Cross-Origin Resource Sharing (CORS) in securing communication between the frontend (`localhost:3000`) and backend (`localhost:5000`).
- **Styled Components and ThemeProvider**: Learned to use Styled Components for CSS-in-JS styling and created a `ThemeProvider.jsx` for light/dark theme switching.
- **Testing with Jest**: Explored unit testing in React using Jest, writing tests for components like `Login.jsx` and `PostList.jsx`.

## Usage
- **Register**: Create an account at `http://localhost:3000/register`.
- **Login**: Log in at `http://localhost:3000/login` to access protected features.
- **Manage Posts**: Use the post management features (view, create, edit, delete) at `/posts`.
- **Search Posts**: Filter posts using the search bar.
- **Switch Themes**: Toggle between light and dark modes using the theme toggle button.

## Troubleshooting
- **CORS Errors**: Ensure the backend is running and CORS is configured to allow requests from `http://localhost:3000`.
- **JSONPlaceholder Errors**: Verify internet connectivity for API requests.
- **Login/Registration Issues**: Check `userdata.json` for hashed passwords and ensure the backend is running.

## Acknowledgements
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)
- [i18next](https://www.i18next.com/)
- [Go](https://go.dev/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)