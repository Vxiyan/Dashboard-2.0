import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from '@/entities/User';
import { Gamepad2, LogIn } from 'lucide-react';

export default function WelcomeScreen() {

  const handleLogin = async () => {
    try {
      await User.login();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-800/20 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent -translate-x-1/2 -translate-y-1/3 rotate-45"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-purple-600/10 via-transparent to-transparent translate-x-1/2 translate-y-1/3 rotate-45"></div>

      <div className="relative z-10 text-center p-8 max-w-2xl mx-auto">
        <div className="inline-block p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-lg mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
          Welcome to GameHQ
        </h1>

        <p className="text-lg text-slate-400 max-w-lg mx-auto mb-8">
          Your all-in-one command center. Track coordinates, manage your game library, take notes, and organize your gaming life like never before.
        </p>

        <Button
          onClick={handleLogin}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
        >
          <LogIn className="w-5 h-5 mr-3" />
          Login to Get Started
        </Button>

        <p className="text-xs text-slate-600 mt-8">
          Authentication is handled securely by the platform.
        </p>
      </div>
    </div>
  );
}
