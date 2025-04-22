# Blog Post Management App

A modern **Blog Post Management System** with a React-based frontend and a Go-based backend. The frontend, built with React, Redux, React Router, and Styled Components, allows users to create, edit, delete, and search blog posts using the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). The backend handles user authentication (login and registration) and stores credentials in a JSON file. The app supports light/dark theme switching, internationalization, and is fully responsive.

## Features

### User Authentication
- **Registration and Login**: Register and log in securely via the Go backend.
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

## Technologies Used

### Frontend
- **React**: Component-based UI library.
- **Redux**: State management for predictable state handling.
- **React Router**: Declarative routing for navigation.
- **Styled Components**: CSS-in-JS for themable styling.
- **i18next**: Internationalization for multi-language support.
- **JSONPlaceholder API**: Mock API for blog post data.

### Backend
- **Go**: Server for user authentication.
- **JSON File Storage**: Stores user credentials in `userdata.json`.

## Installation

### Prerequisites
- **Node.js** and **npm**: Install Node.js (v16 or higher) from [nodejs.org](https://nodejs.org/).
- **Go**: Install Go (v1.16 or higher) from [go.dev](https://go.dev/).
- A modern web browser (e.g., Chrome, Firefox).

### Frontend Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/blog-post-management.git
   cd blog-post-management
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm start
   ```
   The frontend will run at `http://localhost:3000`.

### Backend Setup
The Go backend handles authentication and runs on `http://localhost:5000`.

1. **Navigate to the Backend Directory** (assuming it’s in `backend/`):
   ```bash
   cd backend
   ```

2. **Run the Backend**:
   ```bash
   go run main.go
   ```
   The server will start at `http://localhost:5000` with `/register` and `/login` endpoints.

### Building for Production
To build the frontend for production:
```bash
npm run build
```
This generates optimized files in the `build/` folder, which can be served with a static server (e.g., `serve -s build`).

## Folder Structure

### Frontend
```
/src
  /app
    store.js              # Redux store configuration
  /components
    Layout.js             # Main layout component
    ProfileIcon.js        # Profile icon component
    SearchBar.js          # Search bar for filtering posts
    Table.js              # Table for displaying posts
    DeleteModal.js        # Modal for confirming post deletion
  /features
    /auth
      Login.js            # Login form component
      Register.js         # Registration form component
    /posts
      PostList.js         # Displays list of posts
      EditPost.js         # Form for editing posts
      AddPost.js          # Form for creating new posts
    /errors
      NotFound.js         # 404 error page component
  /theme
    ThemeProvider.js      # Context for theme switching
    theme.js              # Light and dark theme definitions
  /icons
    MyCharacter.png       # Profile icon image
  App.js                  # Main app component
  index.js                # Entry point for the React app
```

### Backend
```
/backend
  main.go                 # Go server for authentication
  userdata.json           # Stores user credentials (auto-created if missing)
```

## Usage

### Authentication
- **Register**: Create an account at `http://localhost:3000/register` with a unique username and password.
- **Login**: Log in at `http://localhost:3000/login` to access protected features.
- **Logout**: Sign out to end your session.

### Post Management
- **View Posts**: Browse posts fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts).
- **Create Post**: Add a new post (simulated via JSONPlaceholder).
- **Edit Post**: Update existing posts.
- **Delete Post**: Remove posts with a confirmation modal.
- **Search Posts**: Filter posts by title or content using the search bar.

### Theme Switching
- Toggle between light and dark modes using the theme switcher button.
- Theme preference is saved across page reloads.

### Protected Routes
The following routes require authentication:
- `/posts` (Post List)
- `/posts/add` (Add Post)
- `/posts/edit/:id` (Edit Post)

Unauthenticated users are redirected to the login page.

## Integration with JSONPlaceholder
The frontend uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to manage blog posts:
- **Fetch Posts**: `GET /posts`
- **Create Post**: `POST /posts` (simulated)
- **Update Post**: `PUT /posts/:id` (simulated)
- **Delete Post**: `DELETE /posts/:id` (simulated)

Note: JSONPlaceholder is a mock API, so changes to posts are not persisted.

## Testing
To run frontend tests (if implemented):
```bash
npm test
```
Ensure test files are in the `__tests__` directory.

## Troubleshooting
- **Port Conflict**:
  - **Frontend**: If `http://localhost:3000` is in use:
    ```bash
    PORT=3001 npm start
    ```
  - **Backend**: If `http://localhost:5000` is in use, update `main.go` to use a different port (e.g., `:5001`).
- **Dependency Issues**:
  - **Frontend**: If `npm install` fails:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```
  - **Backend**: Ensure Go modules are enabled:
    ```bash
    go mod init blog-post-management
    go mod tidy
    ```
- **CORS Errors**: The backend allows requests from `http://localhost:3000`. Ensure both frontend and backend are running.
- **JSONPlaceholder Errors**: Verify internet connectivity for API requests.
- **README Rendering as Plain Text**:
  - Ensure the file is named exactly `README.md` (case-sensitive, no extra extensions).
  - Verify the file is in the repository root.
  - Commit a small change to force GitHub to reprocess:
    ```bash
    echo "# " >> README.md
    git add README.md
    git commit -m "Force Markdown rendering"
    git push origin main
    ```

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request with a clear description.

Follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/).

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://styled-components.com/)
- [i18next](https://www.i18next.com/)
- [Go](https://go.dev/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

---

For issues or feature requests, open an issue on the [GitHub repository](https://github.com/your-username/blog-post-management/issues).