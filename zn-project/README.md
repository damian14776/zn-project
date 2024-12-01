Sure! Here’s a comprehensive `README.md` file based on everything you've provided so far:

---

# Zn Project - Take-home Assignment

This project is a simple web application built to meet the requirements of a take-home assignment. The app is built using React and follows the specified tech stack. It allows users to view posts, filter them by user, and navigate through pagination.

## Features

- **Post Display**: View a list of posts with titles, bodies, and user information.
- **User Filter**: Filter posts by users. This functionality is available via a dropdown on mobile devices.
- **Pagination**: Posts are paginated, and users can navigate between pages.
- **Responsive Design**: The app adapts seamlessly to both desktop and mobile views.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Bundler**: rspack (for fast build and performance)
- **State Management**: React’s useState and useEffect hooks
- **API Calls**: Fetching data from external services (posts, users, photos)

## Setup & Run Locally

To run the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/damian14776/zn-project.git
```

### 2. Navigate to the project directory

```bash
cd zn-project
```

### 3. Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 4. Start the development server

After the dependencies are installed, start the development server with the following command:

```bash
npm start
```

This will start the app on `http://localhost:3000`.

## Deployed Site

You can view the live version of the project here (clear your cache if needed):

[Zn Project Live](https://damian14776.github.io/zn-project/)

## How to Use

1. **Viewing Posts**: The posts will be displayed with their title, body, and user information.
2. **Filtering Posts**: On mobile, you can filter posts by users by clicking the "Filter Posts" button. A dropdown will appear with the list of users. Select a user to filter posts.
3. **Pagination**: You can navigate through the posts using the "Previous" and "Next" buttons located below the posts.

## Project Structure

Here’s a quick overview of the project structure:

```
zn-project/
├── public/
│   ├── index.html         # Main HTML file
├── src/
│   ├── components/
│   │   ├── FilterColumn.tsx  # Filter component for user selection
│   │   ├── PostDisplay.tsx   # Post display component
│   ├── services/
│   │   ├── app.ts          # Services for fetching posts, users, and photos
│   ├── App.tsx             # Main App component
├── package.json            # NPM configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── README.md               # Project README
```

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for creating modern and responsive layouts.
- **rspack**: A fast bundler for JavaScript and TypeScript projects.
- **Biome**: A next-generation code linter and formatter that enhances developer productivity by providing a unified configuration for linting, formatting, and type-checking.

## Known Issues

- None at the moment. Please reach out if you encounter any bugs or issues!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
