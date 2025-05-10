import { useState, useRef, useEffect } from "react";
import {
  FaHome,
  FaEnvelope,
  FaBell,
  FaTasks,
  FaClipboardCheck,
  FaChartLine,
  FaUserEdit,
  FaUserTie,
  FaSignOutAlt,
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
  FaUniversity,
  FaUserGraduate,
  FaBuilding,
} from "react-icons/fa";

const MessagePage: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("messages");

  // Sample user data
  const [currentUser] = useState({
    id: 1,
    name: "Erandi Katugampala",
    avatar: "E",
    status: "online",
    title: "Software Engineering Intern",
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
      lastMessage: "Please submit your weekly report by tomorrow.",
      lastMessageTime: "10:15 AM",
    },
    {
      id: 102,
      name: "Prof. Sampath Deegalla",
      avatar: "S",
      role: "Head of Department",
      status: "offline",
      unread: 0,
      lastMessage: "The department meeting is scheduled for next Friday.",
      lastMessageTime: "Yesterday",
    },
    {
      id: 103,
      name: "Dr. Kumara Jayasuriya",
      avatar: "K",
      role: "Academic Supervisor",
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
        text: "Hello Erandi, how is your internship going?",
        timestamp: "09:30 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hi Dr. Jayasundara, it's going well. I'm learning a lot!",
        timestamp: "09:32 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 101,
        text: "Great to hear! Have you been keeping up with your weekly reports?",
        timestamp: "09:33 AM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "Yes, I've been submitting them every Friday.",
        timestamp: "09:35 AM",
        read: true,
      },
      {
        id: 5,
        senderId: 101,
        text: "Excellent. I've attached the template for the mid-semester evaluation report that you'll need to submit next month.",
        timestamp: "09:40 AM",
        read: true,
        attachment: {
          type: "file",
          name: "Mid_Semester_Evaluation_Template.pdf",
          size: "2.4 MB",
          url: "#",
        },
      },
      {
        id: 6,
        senderId: 101,
        text: "Please submit your weekly report by tomorrow.",
        timestamp: "10:15 AM",
        read: false,
      },
    ],
    102: [
      {
        id: 1,
        senderId: 102,
        text: "Hello Erandi, I hope your internship is progressing well.",
        timestamp: "Yesterday, 11:20 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hello Professor Deegalla. Yes, it has been a great learning experience!",
        timestamp: "Yesterday, 11:25 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 102,
        text: "The department meeting is scheduled for next Friday.",
        timestamp: "Yesterday, 11:30 AM",
        read: true,
      },
    ],
    103: [
      {
        id: 1,
        senderId: 103,
        text: "Hi Erandi, how are you finding the technical challenges in your role?",
        timestamp: "2:30 PM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hi Dr. Jayasuriya. The technical work is challenging but really interesting!",
        timestamp: "2:40 PM",
        read: true,
      },
      {
        id: 3,
        senderId: 103,
        text: "That's good to hear. What technologies are you working with currently?",
        timestamp: "3:00 PM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "I'm working with React and Node.js for a full-stack web application. The team is also using Docker for containerization.",
        timestamp: "3:15 PM",
        read: true,
      },
      {
        id: 5,
        senderId: 103,
        text: "Here's a screenshot of the architecture diagram I mentioned. Please review it and let me know your thoughts.",
        timestamp: "3:30 PM",
        read: false,
        attachment: {
          type: "image",
          name: "Architecture_Diagram.png",
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
        text: "Hello Erandi, how is your progress on the user authentication module?",
        timestamp: "2 days ago, 1:30 PM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hi Ms. Peiris. I've completed the basic implementation and I'm now working on the password reset functionality.",
        timestamp: "2 days ago, 1:40 PM",
        read: true,
      },
      {
        id: 3,
        senderId: 104,
        text: "Sounds good. Would you be able to present your work at the team meeting tomorrow?",
        timestamp: "2 days ago, 1:45 PM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "Yes, I can prepare a short demo.",
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
        text: "Hello! This is the technical support team. How can we assist you today?",
        timestamp: "May 02, 10:00 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hi, I'm having trouble accessing the internship portal. It keeps showing an error after login.",
        timestamp: "May 02, 10:05 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 105,
        text: "I'm sorry to hear that. Could you please provide a screenshot of the error?",
        timestamp: "May 02, 10:07 AM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "Here's the error I'm seeing:",
        timestamp: "May 02, 10:10 AM",
        read: true,
        attachment: {
          type: "image",
          name: "Error_Screenshot.png",
          size: "0.8 MB",
          url: "https://placeholder.pics/svg/400x200/DEDEDE/555555/Error%20Screen",
        },
      },
      {
        id: 5,
        senderId: 105,
        text: "Thank you for the screenshot. This appears to be a browser caching issue. Please try clearing your browser cache and cookies, then restart your browser and try logging in again.",
        timestamp: "May 02, 10:15 AM",
        read: true,
      },
      {
        id: 6,
        senderId: 1,
        text: "That worked! Thank you for the quick help.",
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
  const handleContactSelect = (contact: any) => {
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
      <div className="dashboard__sidebar">
        <div className="dashboard__sidebar-header">
          <div className="dashboard__logo">
            <img
              src="https://cmb.ac.lk/wp-content/uploads/logo-color.png"
              alt="UoC Logo"
            />
            <span>UoC IMS</span>
          </div>
        </div>

        <div className="dashboard__menu">
          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "home" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("home")}
          >
            <FaHome className="dashboard__menu-icon" />
            <span>Home</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "messages" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("messages")}
          >
            <FaEnvelope className="dashboard__menu-icon" />
            <span>Messages</span>
            <div className="dashboard__badge">
              {contacts.reduce((total, contact) => total + contact.unread, 0)}
            </div>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("notifications")}
          >
            <FaBell className="dashboard__menu-icon" />
            <span>Notifications</span>
            <div className="dashboard__badge">5</div>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "goals" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("goals")}
          >
            <FaTasks className="dashboard__menu-icon" />
            <span>Goals</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "evaluation" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("evaluation")}
          >
            <FaClipboardCheck className="dashboard__menu-icon" />
            <span>Evaluation</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "progress" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("progress")}
          >
            <FaChartLine className="dashboard__menu-icon" />
            <span>Progress</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "updateData" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("updateData")}
          >
            <FaUserEdit className="dashboard__menu-icon" />
            <span>Update Data</span>
          </div>

          <div
            className={`dashboard__menu-item ${
              activeMenuItem === "supervisors" ? "active" : ""
            }`}
            onClick={() => setActiveMenuItem("supervisors")}
          >
            <FaUserTie className="dashboard__menu-icon" />
            <span>Supervisor Requests</span>
          </div>
        </div>

        <div className="dashboard__menu-footer">
          <div className="dashboard__menu-item">
            <FaSignOutAlt className="dashboard__menu-icon" />
            <span>Sign Out</span>
          </div>
        </div>
      </div>

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
