import { useEffect,useRef } from "react";
import { useChatStore } from "../store/useChatStore.js"
import ChatHeader from "./chatComponents/ChatHeader.jsx";
import MessegeInput from "./chatComponents/MessegeInput.jsx";
import { useAuthStore } from "../store/useAuthStore.js";


const ChatContainer = () => {
  const { 
    messege, 
    getMesseges, 
    isMessegesLoading, 
    selectedUser,
    subscribeToMesseges,
    unsubscribeFromMessages,
  } = useChatStore();

  const {authUser} = useAuthStore();
  const messegeEndRef = useRef(null);

  useEffect(() => {
    getMesseges( selectedUser._id,authUser._id );

    subscribeToMesseges();

    return () => unsubscribeFromMessages();

  }, [selectedUser._id, getMesseges, subscribeToMesseges, unsubscribeFromMessages]);

  useEffect(() => {
    if(messegeEndRef.current && messege){
      messegeEndRef.current.scrollIntoView({behaviour:"smooth"});
    }
  },[messege])

  if(isMessegesLoading) return(<div className="w-full bg-amber-100 text-2xl">Loading...</div>);

  return (
    <div className="flex flex-col w-full overflow-auto">
      
      <ChatHeader />
      
     <div className="flex flex-col w-full h-full bg-amber-100 overflow-y-auto p-2 space-y-2">
      {messege.map((messege1) => (
        <div
          key={messege1._id}
          className={`max-w-xs p-2 rounded-lg text-md ${
            messege1.senderId === authUser._id
              ? "self-end bg-blue-200"
              : "self-start bg-amber-200"
          }`}
          ref={messegeEndRef}
        >
          <div>{messege1.text}</div>
          <div className="text-[10px] text-gray-500 mt-1 text-right">
            {new Date(messege1.createdAt).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>

      
      <MessegeInput />
    
    </div>
  )
}

export default ChatContainer
