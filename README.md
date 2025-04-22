Blog Post Management App
A modern Blog Post Management System built with React, Redux, React Router, and Styled Components. This application enables users to create, edit, delete, and search blog posts, with user authentication and theme switching (light/dark mode) for an enhanced user experience. The app is responsive, accessible, and supports internationalization.
Features
User Authentication

Registration and Login: Securely register and log in with a username and password.
Protected Routes: Restrict access to certain routes (e.g., post management) to authenticated users only.

Post Management

CRUD Operations: View, create, edit, and delete blog posts.
Search Functionality: Filter posts by title or content using a search bar.

Theme Switching

Light and Dark Modes: Toggle between light and dark themes for better usability.
Persistent Theme: Theme preference is saved across sessions.

Error Handling

404 Page: Custom page for invalid routes.
Form Validation: Client-side validation for login, registration, and post forms.

Technologies Used

React: Component-based UI library for building the interface.
Redux: State management for predictable state handling.
React Router: Declarative routing for seamless navigation.
Styled Components: CSS-in-JS for themable and reusable styling.
i18next: Internationalization for multi-language support.

Installation
Prerequisites

Node.js and npm: Ensure you have Node.js (v16 or higher) and npm installed. Download from the Node.js official website.
A modern web browser (e.g., Chrome, Firefox).

Steps

Clone the Repository:
git clone https://github.com/your-username/blog-post-management.git
cd blog-post-management


Install Dependencies:
npm install


Run the Application:
npm start

The app will start in development mode and open at http://localhost:3000.


Building for Production
To create a production-ready build:
npm run build

This generates optimized files in the build/ folder, which can be served using a static server (e.g., serve -s build).
Folder Structure
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

Usage
Authentication

Register: Create an account by providing a unique username and password.
Login: Log in with your credentials to access protected features.
Logout: Sign out to end your session.

Post Management

View Posts: Browse all posts in a tabular format.
Create Post: Add a new post with a title and content.
Edit Post: Update existing posts via an edit form.
Delete Post: Remove posts with a confirmation modal.
Search Posts: Use the search bar to filter posts by title or content.

Theme Switching

Toggle between light and dark modes using the theme switcher button in the UI.
The selected theme persists across page reloads.

Protected Routes
The following routes require authentication:

/posts (Post List)
/posts/add (Add Post)
/posts/edit/:id (Edit Post)

Unauthenticated users attempting to access these routes are redirected to the login page.
Testing
To run tests (if implemented):
npm test

This launches the test runner in interactive mode. Ensure test files are present in the __tests__ directory or configured in package.json.
Troubleshooting

Port Conflict: If http://localhost:3000 is in use, change the port by setting PORT:PORT=3001 npm start


Dependency Issues: If npm install fails, delete node_modules and package-lock.json, then retry:rm -rf node_modules package-lock.json
npm install


CORS Errors: Ensure the backend server (if used) is configured to allow requests from http://localhost:3000.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add YourFeature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request with a clear description of your changes.

Please follow the Contributor Covenant Code of Conduct.
License
This project is licensed under the MIT License.
Acknowledgements

React
Redux
React Router
Styled Components
i18next


For issues or feature requests, please open an issue on the GitHub repository.
