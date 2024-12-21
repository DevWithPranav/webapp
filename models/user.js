import mongoose from "mongoose";

// Schema for storing user quiz data
const userQuizSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  quizChannelId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["started", "pending", "certificate_generated"],
    default: "pending",
  },
  questions: [
    {
      questionText: String,
      selectedAnswer: String,
      isCorrect: Boolean,
    },
  ],
});

// Check if the model exists in mongoose.models
const UserQuiz = mongoose.models.UserQuiz || mongoose.model("UserQuiz", userQuizSchema);

export default UserQuiz;