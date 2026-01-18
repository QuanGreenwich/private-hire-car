import React from 'react';
import { Screen } from '../types';
import { Mail, Lock, EyeOff, ArrowRight, Diamond } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const AuthScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full bg-bg-light flex flex-col">
       <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2021" 
          alt="Travel Background" 
          className="w-full h-full object-cover brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-primary/30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full px-6 pb-8 pt-20 justify-end max-w-md mx-auto w-full">
        <div className="mb-auto text-center">
             <div className="mx-auto w-12 h-12 mb-6 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10">
                <Diamond className="text-white w-6 h-6" />
             </div>
             <h1 className="text-5xl font-display italic font-bold text-white mb-2">PrivateHire</h1>
             <p className="text-slate-200 text-lg font-light">Your journey begins here.</p>
        </div>

        <div className="w-full">
            <div className="mb-8 space-y-1">
                <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                <p className="text-slate-300 text-sm">Sign in to continue your premium experience</p>
            </div>

            <form className="space-y-4">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="text-slate-400 w-5 h-5" />
                    </div>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="block w-full pl-12 pr-4 py-4 bg-white/95 backdrop-blur-md border-none rounded-xl text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary"
                    />
                </div>
                
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="text-slate-400 w-5 h-5" />
                    </div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="block w-full pl-12 pr-12 py-4 bg-white/95 backdrop-blur-md border-none rounded-xl text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                        <EyeOff className="text-slate-400 w-5 h-5" />
                    </div>
                </div>

                <div className="flex justify-end">
                    <a href="#" className="text-sm font-medium text-slate-200 hover:text-white">Forgot Password?</a>
                </div>

                <button 
                    type="button"
                    onClick={() => onNavigate(Screen.HOME)}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                >
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-4 text-xs font-medium text-slate-300 bg-transparent backdrop-blur-sm rounded">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl shadow-sm bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all">
                    <span className="text-sm font-medium text-white">Google</span>
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-xl shadow-sm bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all">
                    <span className="text-sm font-medium text-white">Apple</span>
                </button>
            </div>

            <div className="text-center">
                <p className="text-sm text-slate-300">
                    Don't have an account? 
                    <button onClick={() => onNavigate(Screen.AUTH_SIGNUP)} className="font-bold text-white hover:text-gold ml-1">Create Account</button>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;