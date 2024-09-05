# **Flipable: AI-Powered Study Aid**

**Flipable** is a flashcard-based study aid built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, manage, and share flashcard decks to enhance learning. What makes Flipable unique is its AI-powered test feature, which grades users based on conceptual understanding rather than exact definitions, ensuring deeper learning.

## **Overview**
Flipable is designed to help users create custom flashcards and test themselves in an intuitive and user-friendly environment. Users can also explore decks created by the community, providing a collaborative study experience. A standout feature is the AI-powered grading system, which assesses conceptual understanding instead of penalizing for slight variations in phrasing. This approach encourages deeper learning and better retention.

## **Features**
- **Flashcard Creation**: Create and manage your own flashcard decks for personalized study sessions.
- **Community Flashcards**: Access and study from decks created by other users in the community.
- **AI Graded Tests**: Take quizzes that are automatically graded by AI based on conceptual understanding rather than exact answers.
- **Responsive Design**: Fully responsive UI, accessible from both desktop and mobile devices.

## **Tech Stack**
- **Frontend**:
  - **React**: For building the dynamic user interface.
  - **DaisyUI**: For styling the application and ensuring a responsive design.
- **Backend**:
  - **Node.js**: Server-side JavaScript runtime.
  - **Express**: Web framework for creating robust APIs.
  - **MongoDB**: NoSQL database for storing user data, flashcards, and progress.
  - **AI Integration**: Uses a OpenAI API to grade quizzes based on conceptual understanding.
- **Additional Tools**:
  - **Git/GitHub**: Version control and collaboration.
  - **Postman**: For API testing.
  - **Figma**: For designing the UI.ures a nuanced learning experience through creating tailored flashcard decks, assess key concepts, and elevate your learning journey. Explore the future of dynamic learning with Quizify!

## Run

To run Quizify on your local machine -

Clone the github repo and install all dependencies by typing  `npm i` in each folder

Ensure you create `.env` files with your own API_KEY's. For frontend, we are using Vite and as such, all readable keys must be sent with the `VITE_` prefix

Go to the frontend folder and run `npm run dev` and same with the back end

Once done, go to your localhost url and see the project
