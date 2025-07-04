import { useState } from 'react'
import { useChatStore } from '../../store/useChatStore.js';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/useAuthStore.js';

const MessegeInput = () => {
  const [text,setText] = useState("");
  const { sendMesseges } = useChatStore(); 
    const {authUser} = useAuthStore(); //

  const handleSendMessege = async (e) => {
    e.preventDefault();
    if(!text.trim()) return;
      // console.log(authUser); //
    try {
      await sendMesseges(
        text.trim(),
        authUser._id,  //
      );

      // Clear Form
      setText("");
    } catch (error) {
      console.log(error);
      toast.error("failed to send messege");
    }
  };

  return (
    <div className="w-full px-4 py-2 bg-white border-t border-amber-300">
  <form onSubmit={handleSendMessege} className="flex items-center gap-2">
    <input
      type="text"
      placeholder="Enter message"
      className="flex-1 p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />

    <button
      type="submit"
      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-semibold transition duration-200 disabled:opacity-50"
      disabled={!text.trim()}
    >
      Send
    </button>
  </form>
</div>
 
    
  )
}

export default MessegeInput
