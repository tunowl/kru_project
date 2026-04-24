import { redirect } from "next/navigation";

export default function RootPage() {
  // Before Supabase is ready, we just force redirect to /student
  // Later, you will check auth here and redirect to /login if not logged in.
  redirect("/student");
}