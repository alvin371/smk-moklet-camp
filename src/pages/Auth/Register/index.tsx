import React, { useState } from "react";
import { registerUser } from "./action";
import { notification, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { z } from "zod";

// Define the schema for validation using zod
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "cashier", "manager"]),
});

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using zod
    const validation = registerSchema.safeParse({
      username,
      password,
      role,
    });

    if (!validation.success) {
      const errorMessages = validation.error.errors.map(
        (error) => error.message
      );
      notification.error({
        message: "Validation Error",
        description: errorMessages.join(", "),
      });
      return;
    }

    const data = {
      user_name: username,
      role,
      username,
      password,
    };

    try {
      await registerUser(data);
      notification.success({
        message: "Registration successful!",
        description: "You can now log in to your account.",
      });
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error: any) {
      notification.error({
        message: "Registration Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-extrabold">Sign Up</h3>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Create a new account by filling out the information below.
              </p>
            </div>

            {/* Username Field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Username
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field with Toggle */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-4 cursor-pointer"
                  onClick={handlePasswordToggle}
                >
                  {showPassword ? (
                    <EyeInvisibleOutlined
                      style={{ fontSize: "18px", color: "#bbb" }}
                    />
                  ) : (
                    <EyeOutlined style={{ fontSize: "18px", color: "#bbb" }} />
                  )}
                </div>
              </div>
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Role</label>
              <Select
                value={role}
                onChange={(value) => setRole(value)}
                className="w-full"
                placeholder="Select role"
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="cashier">Cashier</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
              </Select>
            </div>

            {/* Submit Button */}
            <div className="!mt-8">
              <button
                type="submit"
                className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Sign Up
              </button>
            </div>

            <p className="text-sm !mt-8 text-center text-gray-800">
              Already have an account?
              <a
                href="/auth/login"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Log in here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
