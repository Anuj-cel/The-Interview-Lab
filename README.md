# The Interview Lab 

An intelligent AI-powered interview preparation platform that simulates real technical interviews with personalized feedback and comprehensive analytics.

##  Features

- ** Secure Authentication** - Clerk integration for seamless user authentication
- ** Audio/Video Recording** - Real-time audio and video capture during mock interviews
- ** AI-Powered Questions** - Dynamic question generation based on job role and requirements
- ** Comprehensive Feedback** - Detailed analysis and feedback on interview performance
- ** Data Persistence** - All interview data stored securely using Drizzle ORM with Neon DB
- **Progress Tracking** - Track improvement over multiple interview sessions
- ** Role-Specific Preparation** - Customized interviews for different tech positions

## 🚀 Live Demo

**[🔗 Try AI Interview Mocker](https://ai-interview-mocker-rust-eight.vercel.app)**

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Authentication:** Clerk
- **Database:** Neon PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Media Handling:** Web APIs for audio/video recording

## 📋 How It Works

1. **Sign Up/Login** - Secure authentication with Clerk
2. **Setup Interview** - Provide job details:
   - Job Role (Frontend Developer, Backend Developer, Full Stack, etc.)
   - Job Description and Required Skills (React, Node.js, Python, etc.)
   - Years of Experience
3. **Take Mock Interview** - AI generates relevant questions based on your inputs
4. **Record Responses** - Answer questions with audio and video recording
5. **Get Feedback** - Receive detailed AI-generated feedback on your performance
6. **Track Progress** - All sessions saved to review improvement over time

## 🏗️ Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm
- Clerk account for authentication
- Neon database for data storage

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-mocker.git
cd ai-mocker
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_neon_database_url

# AI Service (if using external API)
OPENAI_API_KEY=your_openai_api_key

# App URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 4. Database Setup
```bash
# Generate database migrations
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 5. Run the development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
ai-mocker/
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── interview/         # Interview pages
│   └── globals.css        # Global styles
├── components/            # Reusable React components
├── lib/                   # Utilities and configurations
│   ├── db.ts             # Database connection
│   └── utils.ts          # Helper functions
├── drizzle/              # Database schema and migrations
├── public/               # Static assets
└── package.json
```

## 🎨 Key Components

- **Interview Setup Form** - Collects job requirements and experience level
- **Recording Interface** - Handles audio/video capture with user-friendly controls
- **Question Generator** - AI-powered question generation based on job requirements
- **Feedback Dashboard** - Displays comprehensive interview analysis
- **Progress Tracker** - Shows improvement metrics across sessions

## 🔒 Database Schema

The application uses Drizzle ORM with the following main entities:

- **Users** - User profiles and authentication data
- **Interviews** - Interview session metadata
- **Questions** - Generated questions for each interview
- **Responses** - User responses with audio/video data
- **Feedback** - AI-generated feedback and scores

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically with each push

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) for authentication
- [Neon](https://neon.tech) for database hosting
- [Drizzle ORM](https://orm.drizzle.team) for database management
- [Vercel](https://vercel.com) for deployment

---

**Built with ❤️ for interview preparation and career growth**
