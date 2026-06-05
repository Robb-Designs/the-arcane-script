// reusable loading screen
import { Card, CardContent } from "@/components/ui/8bit/card";

interface LoadingScreenProps {
  // Message lets each page describe what is currently loading.
  message: string;
}

function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    // Full-screen wrapper keeps the loading card centered on the page.
    <div className="relative min-h-screen flex items-center justify-center">
      <Card className="bg-black/80 w-[500px]">
        <CardContent className="py-12 text-center">
          <h2 className="text-3xl text-amber-300 mb-4">
            The Arcane Script
          </h2>

          {/* Reusable loading text passed in by the page using this component. */}
          <p className="text-slate-300 animate-pulse">
            {message}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoadingScreen;