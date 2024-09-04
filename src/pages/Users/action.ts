import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(), // id is optional for creation
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    suite: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(5, "Zipcode is required"),
  }),
});

export type IUser = z.infer<typeof userSchema>;

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

// Fetch all users
export const fetchUsers = async (): Promise<IUser[]> => {
  const response = await fetch("/users");
  return handleResponse(response);
};

// Fetch a single user by ID
export const fetchUserById = async (id: number): Promise<IUser> => {
  const response = await fetch(`/users/${id}`);
  return handleResponse(response);
};

// Delete a user (DELETE /users/1)
export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    {
      method: "DELETE",
    }
  );
  await handleResponse(response);
};
