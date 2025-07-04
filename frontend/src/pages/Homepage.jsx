import { useChatStore } from "../store/useChatStore"
import Sidebar from "../components/Sidebar"
import NoChatSelected from "../components/NoChatSelected"
import ChatContainer from "../components/ChatContainer"
import Navbar from "../components/Navbar"

const Homepage = () => {
  const { selectedUser } = useChatStore();


  return (
    <div className="flex flex-col h-screen w-lvw items-center justify-center">
      <Navbar />
      <div className="flex h-full w-full rounded-lg overflow-hidden">
        <Sidebar/>
    
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  )
}

export default Homepage
