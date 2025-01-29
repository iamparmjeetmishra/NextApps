import { LoaderCircle } from "lucide-react";

export default function LoadingComponent() {
  return (
    <div className="flex gap-2 items-center justify-center min-h-screen">
      <span className="animate-spin"><LoaderCircle /></span>
      <p>loading...</p>
    </div>
  );
}
