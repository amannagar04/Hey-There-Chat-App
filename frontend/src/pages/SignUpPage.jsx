import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const SignUpPage = () => {
    const [formData,setFormData] = useState({
        fullName: "",
        email: "",
        password:"",
    });

    const { signup , isSigningUp } = useAuthStore();
    
    const validateForm = () => {
        if(!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) return toast.error("All fields required");
        
        if(formData.password.length < 6) return toast.error("Password length must be atleast 6 characteres");

        // check for correct email implemented later

        return true;
        
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(validateForm() === true){
            signup(formData);
        };

    };
  
  
    return (
        <div className="flex justify-center items-center min-h-screen bg-amber-100">
            <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-sm flex flex-col items-center">
                
                <h2 className="text-3xl font-mono font-bold text-amber-700 mb-6 text-center">
                Welcome to Hey There!
                </h2>

                <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 p-3 rounded-md w-full"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 p-3 rounded-md w-full"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 p-3 rounded-md w-full"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                <button
                    type="submit"
                    disabled={isSigningUp}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                >
                    {isSigningUp ? "Creating..." : "Create Account"}
                </button>

                <p className="text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-amber-600 font-medium hover:underline">
                    Sign in
                    </Link>
                </p>
                </form>
            </div>
            </div>

  )
}

export default SignUpPage
