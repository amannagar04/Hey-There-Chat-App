import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { useAuthStore } from '../store/useAuthStore.js';

const Sidebar = () => {
  const {getUsers, users , selectedUser , setSelectedUser , isUserLoading } = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(() => {
    getUsers()
  }, [getUsers]);

  if(isUserLoading) return(<div className="w-1/4 h-full border-2"> Loading </div>);

  return (
    <div className="w-1/4 h-full border-r-2 border-amber-200 font-mono bg-amber-50">
  <div className="w-full h-full overflow-y-auto p-4 space-y-2">
    {users
      .filter((user) => user._id !== authUser._id)
      .map((user) => (
        <button
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`w-full text-left p-3 text-lg rounded-md transition-colors duration-150
            ${
              selectedUser?._id === user._id
                ? "bg-amber-300 border border-amber-400 ring-1 ring-amber-400"
                : "hover:bg-amber-200"
            }
          `}
        >
          {user.fullName}
        </button>
      ))}
  </div>
</div>

    
  )
}

export default Sidebar
