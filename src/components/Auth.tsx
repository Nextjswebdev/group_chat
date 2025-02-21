import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, signInAnonymously, GoogleAuthProvider } from 'firebase/auth';
import Image from 'next/image';
import { AlertCircle, Loader2 } from 'lucide-react';

interface AuthProps {
  onAuthComplete: (username: string, isGuest: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLive, setShowLive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [username, setUsername] = useState('');
  const [animate, setAnimate] = useState(false);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setShowLive(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const username = result.user.displayName || result.user.email?.split('@')[0] || 'User';
      onAuthComplete(username, false);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.message || 'Failed to sign in with Google. Please try again.');
    }
    setIsLoading(false);
  };

  // const handleGuestAccess = async () => {
  //   if (!username.trim()) {
  //     setError('Please enter a username');
  //     return;
  //   }
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     await signInAnonymously(auth);
  //     onAuthComplete(username, true);
  //   } catch (error: any) {
  //     console.error('Guest access error:', error);
  //     setError(error.message || 'Failed to continue as guest. Please try again.');
  //   }
  //   setIsLoading(false);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 w-full bg-rose-400">
      <div 
        className={`max-w-md w-full space-y-8  p-8 rounded-3xl  transition-all duration-700 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-2 text-yellow-300 tracking-tight animate-fadeIn">
            Join the
            <span className="mx-1"></span>
            {showLive && (
              <span className="inline-block animate-flyIn"> Live </span>
            )}
            <span></span> Chat
          </h1>
          <p className="text-md text-white mb-6 animate-fadeIn">
            Connect and chat with people around the world
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm mb-4 flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="group w-full flex items-center justify-center px-4 py-3 border border-separate border-yellow-200 text-base font-medium rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-200 disabled:opacity-50 "
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2 group-hover:scale-110 transition-transform duration-200"
                />
                Sign in with Google
              </>
            )}
          </button>

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue as guest</span>
            </div>
          </div> */}

          {/* <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors duration-200 hover:border-gray-300"
          /> */}

          {/* <button
            onClick={handleGuestAccess}
            disabled={isLoading}
            className="w-full px-4 py-3 text-base font-medium rounded-xl border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-200 disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              'Continue as Guest'
            )}
          </button> */}
        </div>

        {/* <div className="mt-6 text-center space-y-2"> */}
          {/* <p className="text-xs text-gray-500">
            Guest users are limited to 20 messages
          </p> */}
          {/* <button
            className="text-rose-900 text-sm hover:text-rose-700 transition-colors duration-200 underline-offset-2 hover:underline"
            onClick={() => setShowModal(true)}
          >
            How It Works?
          </button> */}
        {/* </div>   */}
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-md w-full animate-scaleIn"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-rose-900">How It Works</h2>
            <p className="mb-6 text-gray-600 leading-relaxed">
              Join our chat room either with your Google account for unlimited access, 
              or as a guest with a 20-message limit. We've created a space where you 
              can connect with others in real-time, share thoughts, and engage in 
              meaningful conversations.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full px-4 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 focus:outline-none transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;