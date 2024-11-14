import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";

export default function Users() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getUsers = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/students`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Failed to fetch users");
    }
  };
  return (
    <div className="flex justify-center items-center flex-col gap-4 ">
      <h1 className="text-3xl font-semibold my-12">Users</h1>

      <table className="table-auto border-collapse border border-gray-400 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user?.id}>
              <td className="border border-gray-300 px-4 py-2">{user?.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user?.phoneNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
