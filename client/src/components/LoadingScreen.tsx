// reusable loading screen
import { Card, CardContent } from "@/components/ui/8bit/card";
import profileImage from "@/assets/images/profile-background.webp";

interface LoadingScreenProps {
  // Message lets each page describe what is currently loading.
  message: string;
}

function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    // Full-screen wrapper keeps the loading card centered on the page.
    <div className="relative min-h-screen overflow-hidden">
      <img
        src={profileImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <Card className=" bg-black/80w-125 animate-in fade-in zoom-in duration-700">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl text-amber-300 mb-4">The Arcane Script</h2>

            <div className="flex flex-col items-center gap-4">
              <div className=" h-3 w-3 rounded-full bg-amber-300 animate-pulse"/>
              <p className="text-slate-300">{message}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoadingScreen;
