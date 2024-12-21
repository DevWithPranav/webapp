// This is a Server Component
import UserProfileClient from "@/components/UserProfileClient";

async function UserProfilePage({ params }) {
  // Wait for the promise to resolve
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  return <UserProfileClient userId={id} />;
}

export default UserProfilePage;