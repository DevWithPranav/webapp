import UserQuiz from "@/models/user";
import { connectToDB } from "@/util/database";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    
    // Wait for the promise to resolve
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    if (!id) {
      return new Response(JSON.stringify({ message: "Invalid user ID" }), { status: 400 });
    }

    const user = await UserQuiz.findOne({ userId: id });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ username: user.username }), { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}