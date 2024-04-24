# YouTube Comments Fetcher

## Overview

YouTube Comments Fetcher is a web application built with Node.js and Express that allows users to view comments and replies from a YouTube video. The application fetches comments and replies using the YouTube Data API and displays them in an organized format on the web page.

## Features

- Fetches comments and replies from a specified YouTube video using the YouTube Data API.
- Displays the comments and replies in a structured layout, with each comment accompanied by its author's profile picture and name.
- Allows users to toggle the visibility of replies by clicking a "Show Replies" button.
- Provides a responsive design, ensuring a consistent viewing experience across different devices.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd yt-comments-fetcher
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the project root directory.
   - Add your YouTube Data API key to the `.env` file:

     ```
     API_KEY=your_youtube_data_api_key
     ```

5. Start the server:

   ```bash
   npm start
   ```

6. Open your web browser and navigate to `http://localhost:PORT`, where `PORT` is the port number specified in your environment variables or the default port (e.g., 3000).

## Usage

1. Enter the YouTube video ID of the video you want to view comments for.
2. Click the "Fetch Comments" button.
3. Once the comments are loaded, you can view them along with their respective replies.
4. To toggle the visibility of replies for a comment, click the "Show Replies" button next to the comment.

## Technologies Used

- Node.js
- Express
- Googleapis (YouTube Data API)
- HTML
- CSS
- JavaScript

## Contributing

Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
