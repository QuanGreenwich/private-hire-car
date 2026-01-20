import React from 'react';
import { Screen } from '@/types';
import { User, Mail, Smartphone, Lock, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const SignUpScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full bg-bg-light flex flex-col">
       <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2070" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/60 to-[#eef2f6]"></div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col px-6 pt-6 pb-8 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between h-14 mb-4">
            <button 
                onClick={() => onNavigate(Screen.AUTH_SIGNIN)}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/60 backdrop-blur border border-white/50 text-gray-700 hover:bg-white transition-all"
            >
                <ArrowLeft size={20} />
            </button>
            <h1 className="font-display italic font-bold text-primary text-2xl">PrivateHire</h1>
            <div className="w-10"></div>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="text-center mb-2">
                <h2 className="text-3xl font-display font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-500 font-medium mt-1">Begin your premium journey.</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 backdrop-blur border border-amber-200 p-4 shadow-sm">
                <div className="flex items-start gap-3 relative z-10">
                    <div className="h-8 w-8 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">
                        <CheckCircle2 size={18} />
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-amber-900 text-sm">Exclusive Offer</h3>
                        <p className="text-xs text-amber-800/80 mt-0.5 font-medium leading-relaxed">
                            Sign up now to receive a <span className="font-bold">15% discount</span> on your first luxury ride.
                        </p>
                    </div>
                </div>
            </div>

            <form className="space-y-4">
                 {[
                    { icon: User, placeholder: "Full Name", type: "text" },
                    { icon: Mail, placeholder: "Email Address", type: "email" },
                    { icon: Smartphone, placeholder: "Phone Number", type: "tel" },
                    { icon: Lock, placeholder: "Password", type: "password" }
                 ].map((field, idx) => (
                    <div key={idx} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <field.icon className="text-slate-400 w-5 h-5" />
                        </div>
                        <input 
                            type={field.type} 
                            placeholder={field.placeholder} 
                            className="block w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-xl border border-white rounded-xl text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary/20 focus:bg-white"
                        />
                    </div>
                 ))}

                <div className="flex items-center gap-2 pt-1 px-1">
                    <input type="checkbox" id="terms" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary bg-white/50" />
                    <label htmlFor="terms" className="text-xs text-gray-500 font-medium">
                        I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a>
                    </label>
                </div>
            </form>

            <div className="space-y-4 pt-2">
                <button 
                    onClick={() => onNavigate(Screen.HOME)}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-display font-semibold py-4 rounded-xl shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                >
                    <span>Sign Up</span>
                    <ArrowRight size={20} />
                </button>
                <p className="text-center text-sm text-gray-500 font-medium">
                    Already have an account? <button onClick={() => onNavigate(Screen.AUTH_SIGNIN)} className="text-primary font-bold hover:underline">Log In</button>
                </p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpScreen;