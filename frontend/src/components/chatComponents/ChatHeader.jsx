import { useChatStore } from '../../store/useChatStore.js'

const ChatHeader = () => {
    const { selectedUser } = useChatStore();

  return (
    <div className="w-full p-4 bg-amber-200 border-b border-amber-300 text-2xl md:text-3xl font-mono font-semibold text-amber-800 shadow-sm">
  {selectedUser.fullName}
</div>

  )
}

export default ChatHeader
