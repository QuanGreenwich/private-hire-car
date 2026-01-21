import React, { useState } from 'react';
import { Screen } from '@/types';
import { User, Mail, Smartphone, Lock, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const SignUpScreen: React.FC<Props> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Phone validation
    const phoneRegex = /^[0-9+\s()-]{10,}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Terms validation
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Save user data to localStorage
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ email: userData.email, name: userData.name }));
    
    // Simulate email confirmation
    console.log(`✅ Confirmation email sent to ${formData.email}`);
    console.log('Email content: Welcome to PrivateHire! Your account has been created successfully.');
    console.log(`User will receive 15% discount code: WELCOME15`);
    
    // Navigate to home
    alert(`Welcome ${formData.name}! A confirmation email has been sent to ${formData.email}`);
    onNavigate(Screen.HOME);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

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
            <h1 className="italic font-bold text-primary text-2xl">PrivateHire</h1>
            <div className="w-10"></div>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-500 font-medium mt-1">Begin your premium journey.</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 backdrop-blur border border-amber-200 p-4 shadow-sm">
                <div className="flex items-start gap-3 relative z-10">
                    <div className="h-8 w-8 rounded-full bg-gold/15 flex items-center justify-center text-gold shrink-0">
                        <CheckCircle2 size={18} />
                    </div>
                    <div>
                        <h3 className="font-bold text-amber-900 text-base">Exclusive Offer</h3>
                        <p className="text-xs text-amber-800/80 mt-0.5 font-medium leading-relaxed">
                            Sign up now to receive a <span className="font-bold">15% discount</span> on your first luxury ride.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
                 {[
                    { icon: User, placeholder: "Full Name", type: "text", field: "name", value: formData.name },
                    { icon: Mail, placeholder: "Email Address", type: "email", field: "email", value: formData.email },
                    { icon: Smartphone, placeholder: "Phone Number", type: "tel", field: "phone", value: formData.phone }
                 ].map((fieldConfig, idx) => (
                    <div key={idx} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <fieldConfig.icon className="text-slate-400 w-5 h-5" />
                        </div>
                        <input 
                            type={fieldConfig.type}
                            value={fieldConfig.value}
                            onChange={(e) => handleInputChange(fieldConfig.field, e.target.value)}
                            placeholder={fieldConfig.placeholder} 
                            className={`block w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-xl border rounded-xl text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 ${errors[fieldConfig.field] ? 'border-red-500 ring-2 ring-red-200' : 'border-white focus:ring-primary/20'} focus:bg-white`}
                        />
                        {errors[fieldConfig.field] && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                            <AlertCircle size={12} />
                            <span>{errors[fieldConfig.field]}</span>
                          </div>
                        )}
                    </div>
                 ))}
                 
                 <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="text-slate-400 w-5 h-5" />
                    </div>
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Password" 
                        className={`block w-full pl-12 pr-12 py-4 bg-white/70 backdrop-blur-xl border rounded-xl text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 ${errors.password ? 'border-red-500 ring-2 ring-red-200' : 'border-white focus:ring-primary/20'} focus:bg-white`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Eye className="text-slate-400 w-5 h-5" /> : <EyeOff className="text-slate-400 w-5 h-5" />}
                    </div>
                    {errors.password && (
                      <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                        <AlertCircle size={12} />
                        <span>{errors.password}</span>
                      </div>
                    )}
                 </div>

                <div className="flex items-start gap-2 pt-1 px-1">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={agreedToTerms}
                      onChange={(e) => {
                        setAgreedToTerms(e.target.checked);
                        if (errors.terms) {
                          const newErrors = { ...errors };
                          delete newErrors.terms;
                          setErrors(newErrors);
                        }
                      }}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary bg-white/50 mt-0.5" 
                    />
                    <label htmlFor="terms" className="text-xs text-gray-500 font-medium">
                        I agree to the <a href="#" className="text-primary font-bold hover:underline">Terms of Service</a>
                    </label>
                </div>
                {errors.terms && (
                  <div className="flex items-center gap-1 text-red-600 text-xs px-1">
                    <AlertCircle size={12} />
                    <span>{errors.terms}</span>
                  </div>
                )}

            <div className="space-y-4 pt-2">
                <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
                >
                    <span>Sign Up</span>
                    <ArrowRight size={20} />
                </button>
                <p className="text-center text-sm text-gray-500 font-medium">
                    Already have an account? <button type="button" onClick={() => onNavigate(Screen.AUTH_SIGNIN)} className="text-primary font-bold hover:underline">Log In</button>
                </p>
            </div>
            </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpScreen;