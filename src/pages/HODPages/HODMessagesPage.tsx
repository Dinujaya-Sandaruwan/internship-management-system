import { useState, useRef, useEffect } from "react";
import {
  FaEnvelope,
  FaPaperPlane,
  FaSearch,
  FaEllipsisH,
  FaInfoCircle,
  FaChevronLeft,
  FaSmile,
  FaPaperclip,
  FaCircle,
  FaImage,
  FaFile,
  FaDownload,
} from "react-icons/fa";

const MessagePage: React.FC = () => {

  // Sample user data
  const [currentUser] = useState({
    id: 1,
    name: "Prof. Sampath Deegalla",
    avatar: "S",
    status: "online",
    title: "Head of Department",
  });

  // Sample message contacts
  const [contacts, setContacts] = useState([
    {
      id: 101,
      name: "Dr. Chandima Jayasundara",
      avatar: "C",
      role: "Internship Coordinator",
      status: "online",
      unread: 2,
      lastMessage: "The internship program evaluation results are ready for review.",
      lastMessageTime: "10:15 AM",
    },
    {
      id: 102,
      name: "Prof. Nimal Jayawardena",
      avatar: "N",
      role: "Deputy Head of Department",
      status: "offline",
      unread: 0,
      lastMessage: "The faculty meeting agenda has been finalized.",
      lastMessageTime: "Yesterday",
    },
    {
      id: 103,
      name: "Dr. Kumara Jayasuriya",
      avatar: "K",
      role: "Industry Supervisor",
      status: "away",
      unread: 5,
      lastMessage: "Let's schedule a call to discuss your progress.",
      lastMessageTime: "3:45 PM",
    },
    {
      id: 104,
      name: "Ms. Thilini Peiris",
      avatar: "T",
      role: "Industry Supervisor",
      status: "online",
      unread: 0,
      lastMessage: "Great work on the project presentation!",
      lastMessageTime: "2 days ago",
    },
    {
      id: 105,
      name: "Technical Support",
      avatar: "T",
      role: "System Support",
      status: "online",
      unread: 0,
      lastMessage: "How can I help you with the portal access?",
      lastMessageTime: "May 02",
    },
  ]);

  // Selected conversation
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  // Search query
  const [searchQuery, setSearchQuery] = useState("");

  // Message input
  const [messageText, setMessageText] = useState("");

  // Sidebar visibility on mobile
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Info panel visibility
  const [infoPanelVisible, setInfoPanelVisible] = useState(false);

  // Sample conversation messages
  const [conversations, setConversations] = useState<
    Record<
      number,
      Array<{
        id: number;
        senderId: number;
        text: string;
        timestamp: string;
        read: boolean;
        attachment?: {
          type: "image" | "file";
          name: string;
          size: string;
          url: string;
        };
      }>
    >
  >({
    101: [
      {
        id: 1,
        senderId: 101,
        text: "Good morning Professor, I have the internship program evaluation results ready for your review.",
        timestamp: "09:30 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Thank you Dr. Jayasundara. How are the students performing overall?",
        timestamp: "09:32 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 101,
        text: "The performance has been excellent. Most students are meeting their learning objectives.",
        timestamp: "09:33 AM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "That's great to hear. Any areas that need improvement?",
        timestamp: "09:35 AM",
        read: true,
      },
      {
        id: 5,
        senderId: 101,
        text: "I've attached the detailed evaluation report with recommendations for program enhancement.",
        timestamp: "09:40 AM",
        read: true,
        attachment: {
          type: "file",
          name: "Internship_Program_Evaluation_Report.pdf",
          size: "2.4 MB",
          url: "#",
        },
      },
      {
        id: 6,
        senderId: 101,
        text: "The internship program evaluation results are ready for review.",
        timestamp: "10:15 AM",
        read: false,
      },
    ],
    102: [
      {
        id: 1,
        senderId: 102,
        text: "Good morning Professor, I wanted to discuss the upcoming faculty meeting agenda.",
        timestamp: "Yesterday, 11:20 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hello Professor Jayawardena. Please share the key discussion points.",
        timestamp: "Yesterday, 11:25 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 102,
        text: "The faculty meeting agenda has been finalized.",
        timestamp: "Yesterday, 11:30 AM",
        read: true,
      },
    ],
    103: [
      {
        id: 1,
        senderId: 103,
        text: "Good afternoon Professor, I wanted to discuss the curriculum updates for the software engineering program.",
        timestamp: "2:30 PM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hello Dr. Jayasuriya. I'm interested in hearing your recommendations.",
        timestamp: "2:40 PM",
        read: true,
      },
      {
        id: 3,
        senderId: 103,
        text: "I believe we should incorporate more modern technologies into our curriculum.",
        timestamp: "3:00 PM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "That sounds excellent. Which technologies do you recommend we focus on?",
        timestamp: "3:15 PM",
        read: true,
      },
      {
        id: 5,
        senderId: 103,
        text: "I've prepared a curriculum framework diagram. Please review it and share your feedback.",
        timestamp: "3:30 PM",
        read: false,
        attachment: {
          type: "image",
          name: "Curriculum_Framework.png",
          size: "1.8 MB",
          url: "https://cdn.sanity.io/images/599r6htc/regionalized/2cf39e150b70de3bd55b5a9862748cb242ec8844-1440x1440.png",
        },
      },
      {
        id: 6,
        senderId: 103,
        text: "Let's schedule a call to discuss your progress.",
        timestamp: "3:45 PM",
        read: false,
      },
    ],
    104: [
      {
        id: 1,
        senderId: 104,
        text: "Good morning Professor, I wanted to update you on the faculty development program progress.",
        timestamp: "2 days ago, 1:30 PM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hello Ms. Peiris. Please share the current status and any feedback from participants.",
        timestamp: "2 days ago, 1:40 PM",
        read: true,
      },
      {
        id: 3,
        senderId: 104,
        text: "The response has been very positive. Would you like me to present the feedback summary at tomorrow's meeting?",
        timestamp: "2 days ago, 1:45 PM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "Yes, please prepare a comprehensive report for the meeting.",
        timestamp: "2 days ago, 1:50 PM",
        read: true,
      },
      {
        id: 5,
        senderId: 104,
        text: "Great work on the project presentation!",
        timestamp: "2 days ago, 4:20 PM",
        read: true,
      },
    ],
    105: [
      {
        id: 1,
        senderId: 105,
        text: "Hello Professor! This is the technical support team. How can we assist you today?",
        timestamp: "May 02, 10:00 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hi, I need assistance with the faculty management portal. I'm unable to access the student records section.",
        timestamp: "May 02, 10:05 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 105,
        text: "I understand the issue. Could you please provide a screenshot of what you're seeing?",
        timestamp: "May 02, 10:07 AM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "Here's the access error I'm encountering:",
        timestamp: "May 02, 10:10 AM",
        read: true,
        attachment: {
          type: "image",
          name: "Portal_Access_Error.png",
          size: "0.8 MB",
          url: "https://placeholder.pics/svg/400x200/DEDEDE/555555/Error%20Screen",
        },
      },
      {
        id: 5,
        senderId: 105,
        text: "Thank you for the screenshot. This appears to be a permissions issue. I'll update your access rights and you should be able to access the portal within a few minutes.",
        timestamp: "May 02, 10:15 AM",
        read: true,
      },
      {
        id: 6,
        senderId: 1,
        text: "Perfect! The access is working now. Thank you for the quick resolution.",
        timestamp: "May 02, 10:20 AM",
        read: true,
      },
      {
        id: 7,
        senderId: 105,
        text: "How can I help you with the portal access?",
        timestamp: "May 02, 10:25 AM",
        read: true,
      },
    ],
  });

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Send a new message
  const sendMessage = () => {
    if (messageText.trim() !== "") {
      const newMessage = {
        id: conversations[selectedContact.id]
          ? conversations[selectedContact.id].length + 1
          : 1,
        senderId: currentUser.id,
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: true,
      };

      setConversations((prevConversations) => ({
        ...prevConversations,
        [selectedContact.id]: [
          ...(prevConversations[selectedContact.id] || []),
          newMessage,
        ],
      }));

      setMessageText("");
    }
  };

  // Handle key press in message input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Ref for message container to auto-scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle selecting a contact and mark messages as read
  const handleContactSelect = (contact: typeof contacts[0]) => {
    // Mark all messages as read
    if (contact.unread > 0) {
      // Update the conversations first
      setConversations((prev) => {
        const updatedConversation = [...(prev[contact.id] || [])].map(
          (msg) => ({
            ...msg,
            read: true,
          })
        );

        return {
          ...prev,
          [contact.id]: updatedConversation,
        };
      });

      // Update the contact's unread count
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c))
      );
    }

    setSelectedContact(contact);
    setSidebarVisible(false); // Hide sidebar on mobile when contact is selected
  };

  // Toggle info panel
  const toggleInfoPanel = () => {
    setInfoPanelVisible(!infoPanelVisible);
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, selectedContact]);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      {/* <SideMenu
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      /> */}

      {/* Main Content - Now with class for specific styling */}
      <div className="dashboard__main messages-page">
        <div className="messages-container">
          {/* Messages sidebar */}
          <div className={`messages-sidebar ${sidebarVisible ? "" : "hidden"}`}>
            <div className="messages-sidebar-header">
              <h2>Messages</h2>
              <div className="messages-search">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </div>
            </div>

            <div className="messages-contacts">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`contact-item ${
                    selectedContact?.id === contact.id ? "active" : ""
                  }`}
                  onClick={() => handleContactSelect(contact)}
                >
                  <div className="contact-avatar">
                    <div className="avatar-text">{contact.avatar}</div>
                    <span
                      className={`status-indicator status-${contact.status}`}
                    ></span>
                  </div>
                  <div className="contact-info">
                    <div className="contact-header">
                      <h3>{contact.name}</h3>
                      <span className="contact-time">
                        {contact.lastMessageTime}
                      </span>
                    </div>
                    <div className="contact-role">{contact.role}</div>
                    <p className="contact-last-message">
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="unread-badge">{contact.unread}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Conversation area */}
          <div
            className={`conversation-area ${!sidebarVisible ? "active" : ""}`}
          >
            {selectedContact ? (
              <>
                {/* Conversation header */}
                <div className="conversation-header">
                  <div className="conversation-header-left">
                    <div className="back-button-mobile" onClick={toggleSidebar}>
                      <FaChevronLeft />
                    </div>
                    <div className="header-avatar">
                      <div className="avatar-text">
                        {selectedContact.avatar}
                      </div>
                      <span
                        className={`status-indicator status-${selectedContact.status}`}
                      ></span>
                    </div>
                    <div className="header-info">
                      <h3>{selectedContact.name}</h3>
                      <span className="header-status">
                        {selectedContact.status === "online"
                          ? "Online"
                          : selectedContact.status === "away"
                          ? "Away"
                          : "Offline"}
                      </span>
                    </div>
                  </div>
                  <div className="conversation-header-right">
                    <button
                      className="header-action-btn"
                      onClick={toggleInfoPanel}
                    >
                      <FaInfoCircle />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="conversation-messages">
                  {(conversations[selectedContact.id] || []).map((message) => (
                    <div
                      key={message.id}
                      className={`message ${
                        message.senderId === currentUser.id
                          ? "message-sent"
                          : "message-received"
                      }`}
                    >
                      {/* Removed message avatar here as requested */}
                      <div className="message-content">
                        {message.text && (
                          <div className="message-bubble">{message.text}</div>
                        )}
                        {message.attachment && (
                          <div className="message-attachment">
                            {message.attachment.type === "image" ? (
                              <div className="attachment-image">
                                <img
                                  src={message.attachment.url}
                                  alt={message.attachment.name}
                                />
                                <div className="attachment-info">
                                  <div className="attachment-name">
                                    <FaImage />
                                    <span>{message.attachment.name}</span>
                                  </div>
                                  <div className="attachment-actions">
                                    <span className="attachment-size">
                                      {message.attachment.size}
                                    </span>
                                    <button className="attachment-download">
                                      <FaDownload />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="attachment-file">
                                <div className="attachment-file-icon">
                                  <FaFile />
                                </div>
                                <div className="attachment-info">
                                  <div className="attachment-name">
                                    {message.attachment.name}
                                  </div>
                                  <div className="attachment-actions">
                                    <span className="attachment-size">
                                      {message.attachment.size}
                                    </span>
                                    <button className="attachment-download">
                                      <FaDownload />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="message-meta">
                          <span className="message-time">
                            {message.timestamp}
                          </span>
                          {message.senderId === currentUser.id && (
                            <span
                              className={`message-status ${
                                message.read ? "read" : "sent"
                              }`}
                            >
                              {message.read ? "Read" : "Sent"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input */}
                <div className="conversation-footer">
                  <button className="footer-btn attachment-btn">
                    <FaPaperclip />
                  </button>
                  <div className="message-input-wrapper">
                    <textarea
                      className="message-input"
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyPress}
                    ></textarea>
                    <button className="footer-btn emoji-btn">
                      <FaSmile />
                    </button>
                  </div>
                  <button
                    className="footer-btn send-btn"
                    onClick={sendMessage}
                    disabled={messageText.trim() === ""}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </>
            ) : (
              <div className="no-conversation-selected">
                <div className="no-conversation-content">
                  <FaEnvelope className="empty-icon" />
                  <h3>No Conversation Selected</h3>
                  <p>Select a contact to start messaging</p>
                </div>
              </div>
            )}
          </div>

          {/* Contact info sidebar */}
          <div
            className={`contact-info-sidebar ${
              infoPanelVisible ? "active" : ""
            }`}
          >
            {selectedContact && (
              <>
                <div className="contact-info-header">
                  <h3>Contact Info</h3>
                  <button className="close-info-btn" onClick={toggleInfoPanel}>
                    <FaEllipsisH />
                  </button>
                </div>
                <div className="contact-info-profile">
                  <div className="profile-avatar">
                    <div className="avatar-text large">
                      {selectedContact.avatar}
                    </div>
                    <span
                      className={`status-indicator status-${selectedContact.status}`}
                    ></span>
                  </div>
                  <h2>{selectedContact.name}</h2>
                  <p className="profile-role">{selectedContact.role}</p>
                  <div className="profile-status">
                    <FaCircle
                      className={`status-icon status-${selectedContact.status}`}
                    />
                    <span>
                      {selectedContact.status === "online"
                        ? "Online"
                        : selectedContact.status === "away"
                        ? "Away"
                        : "Offline"}
                    </span>
                  </div>
                </div>

                <div className="contact-about">
                  <h4>About</h4>
                  <p>
                    Faculty of Technology, University of Colombo
                    <br />
                    <br />
                    Department: Computer Science
                    <br />
                    Office: Room 304, Technology Building
                    <br />
                    Email: {selectedContact.name.split(" ")[0].toLowerCase()}
                    @cmb.ac.lk
                    <br />
                    Phone: +94 11 2158xx
                  </p>
                </div>

                <div className="shared-media">
                  <h4>Shared Media</h4>
                  <div className="shared-media-grid">
                    {/* Mock shared images */}
                    <div className="shared-media-item">
                      <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa8%2F95%2F61%2Fa89561d5fb4270f06386d9d7bb7506d2.jpg&f=1&nofb=1&ipt=a6fe4f6cf614b4d08158441e0dbc3f3a21c60c63d8e3f3c0b6b0ae3616dd7304"
                        alt="Shared document"
                      />
                    </div>
                    <div className="shared-media-item">
                      <img
                        src="https://cdn.sanity.io/images/599r6htc/regionalized/2cf39e150b70de3bd55b5a9862748cb242ec8844-1440x1440.png"
                        alt="Shared image"
                      />
                    </div>
                    <div className="shared-media-item">
                      <img
                        src="https://static-cse.canva.com/blob/1127409/graph_diagrams_how-to.df0045a1.avif"
                        alt="Shared PDF"
                      />
                    </div>
                  </div>
                  <button className="view-all-btn">View All</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
