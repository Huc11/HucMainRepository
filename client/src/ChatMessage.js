// src/ChatMessage.js
const ChatMessage = ({ message }) => {
    return (
      <div className="chat-message">
        <div className="chat-message-center">
          <div className="avatar">me</div>
          <div className="message">{message}</div>
        </div>
      </div> 
    );
  };
  
  export default ChatMessage;
  