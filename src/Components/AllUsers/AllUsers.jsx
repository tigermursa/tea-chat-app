import { useLoaderData } from "react-router-dom";

const AllUsers = () => {
  const users = useLoaderData([]);
  console.log(users);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mt-5">All Users</h2>
      <div className="mt-5">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={user.image}
                    alt=""
                    className="w-12 h-10 object-fill rounded-md mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
