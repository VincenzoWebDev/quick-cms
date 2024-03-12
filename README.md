# Quick-CMS

Quick-CMS is a content management system (CMS) developed using Laravel, Inertia.js, and React. It's designed to be a lightweight, fast, and flexible CMS that allows users to easily manage the content of their website.

## Key Features

- **Intuitive User Interface**: Quick-CMS provides an intuitive and easy-to-use user interface, allowing users to add, edit, and delete content without needing to know programming.
- **Modern Technologies**: It utilizes modern technologies like Laravel, Inertia.js, and React to provide a smooth and responsive user experience.
- **Customization**: Quick-CMS is highly customizable and can be extended to meet the specific needs of your project.
- **Permission Management**: It supports permission management to control user access to various CMS features.
- **Security**: It implements best security practices to protect sensitive data and prevent vulnerabilities.

## Installation

To install Quick-CMS on your local environment, follow these steps:

1. Clone the repository from GitHub:

   ```
   git clone https://github.com/VincenzoDesigner/quick-cms.git
   ```

2. Install project dependencies using Composer:

   ```
   composer install
   ```

3. Install front-end dependencies using npm or yarn:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

4. Create a `.env` file by copying the `.env.example` file and configuring the necessary environment variables.

5. Generate a new application key:

   ```
   php artisan key:generate
   ```

6. Run database migrations:

   ```
   php artisan migrate
   ```

7. Start the development server:

   ```
   php artisan serve
   ```

Now you can access Quick-CMS in your browser window at `http://localhost:8000`.

## Contributing

If you want to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes:

   ```
   git checkout -b feature/new-feature
   ```

3. Make your changes and commit them:

   ```
   git commit -am 'Adding a new feature'
   ```

4. Push your branch to your fork:

   ```
   git push origin feature/new-feature
   ```

5. Make a Pull Request to the main repository.

## License

Quick-CMS is distributed under the [MIT License](https://opensource.org/licenses/MIT).
