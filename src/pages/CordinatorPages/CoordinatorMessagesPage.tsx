import React, { useState, useRef, useEffect } from "react";
import {
  FaEnvelope,
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
  FaPaperPlane,
  FaCalendarAlt,
  FaUserGraduate,
  FaBuilding,
  FaUniversity,
  FaFileAlt,
  FaClipboardCheck,
  FaUserTie,
  FaUsers,
  FaChartLine,
  FaBell,
} from "react-icons/fa";
import CoordinatorSideMenu from "../../components/CoordinatorSideMenu";

const CoordinatorMessagesPage: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("messages");

  // Sample coordinator data
  const [currentUser] = useState({
    id: 1,
    name: "Dr. Chandima Jayasundara",
    avatar: "CJ",
    status: "online",
    title: "Internship Coordinator",
    department: "Faculty of Technology",
    university: "University of Colombo",
  });

  // Sample contacts (including students, supervisors, department heads, and industry partners)
  const [contacts, setContacts] = useState([
    {
      id: 101,
      name: "Prof. Sampath Deegalla",
      avatar: "SD",
      role: "Head of Department",
      department: "Department of Computer Science",
      status: "online",
      type: "hod",
      unread: 2,
      lastMessage:
        "Please prepare the quarterly internship report for the faculty meeting.",
      lastMessageTime: "10:15 AM",
    },
    {
      id: 102,
      name: "Dr. Kumara Jayasuriya",
      avatar: "KJ",
      role: "Academic Supervisor",
      department: "Computer Science",
      status: "online",
      type: "supervisor",
      unread: 0,
      lastMessage: "I've reviewed all the evaluations for my assigned interns.",
      lastMessageTime: "Yesterday",
    },
    {
      id: 103,
      name: "Dr. Priyantha Silva",
      avatar: "PS",
      role: "Academic Supervisor",
      department: "Software Engineering",
      status: "away",
      type: "supervisor",
      unread: 1,
      lastMessage: "Need clarification on the new evaluation criteria.",
      lastMessageTime: "2:30 PM",
    },
    {
      id: 104,
      name: "Erandi Katugampala",
      avatar: "EK",
      role: "Software Engineering Intern",
      company: "Tech Solutions Ltd.",
      status: "online",
      type: "student",
      unread: 3,
      lastMessage: "Thank you for approving my internship placement.",
      lastMessageTime: "3:45 PM",
    },
    {
      id: 105,
      name: "Mr. Ravi Fernando",
      avatar: "RF",
      role: "HR Manager",
      company: "Tech Solutions Ltd.",
      status: "offline",
      type: "industry",
      unread: 0,
      lastMessage: "We'd like to discuss expanding our internship partnership.",
      lastMessageTime: "2 days ago",
    },
    {
      id: 106,
      name: "Ms. Shanika Perera",
      avatar: "SP",
      role: "Talent Acquisition Lead",
      company: "DataViz Analytics",
      status: "online",
      type: "industry",
      unread: 1,
      lastMessage:
        "Can we schedule a meeting to discuss the new batch of interns?",
      lastMessageTime: "11:30 AM",
    },
    {
      id: 107,
      name: "Dinesh Perera",
      avatar: "DP",
      role: "Data Science Intern",
      company: "DataViz Analytics",
      status: "away",
      type: "student",
      unread: 0,
      lastMessage:
        "I've submitted all required documents for the internship registration.",
      lastMessageTime: "Yesterday",
    },
    {
      id: 108,
      name: "Administrative Office",
      avatar: "AO",
      role: "Faculty Administration",
      department: "Faculty of Technology",
      status: "online",
      type: "admin",
      unread: 2,
      lastMessage:
        "Reminder: Submit the internship statistics for this semester.",
      lastMessageTime: "9:00 AM",
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
          size?: string;
          url?: string;
        };
      }>
    >
  >({
    101: [
      {
        id: 1,
        senderId: 101,
        text: "Good morning Dr. Jayasundara. I wanted to discuss the upcoming faculty meeting agenda.",
        timestamp: "9:45 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Good morning Professor. I'll be happy to discuss the agenda. What specific topics would you like to cover?",
        timestamp: "9:50 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 101,
        text: "We need to review the internship placement statistics for this semester and discuss the new industry partnerships.",
        timestamp: "10:00 AM",
        read: true,
      },
      {
        id: 4,
        senderId: 101,
        text: "Also, please prepare the quarterly internship report for the faculty meeting.",
        timestamp: "10:15 AM",
        read: true,
      },
    ],
    102: [
      {
        id: 1,
        senderId: 102,
        text: "Hi Dr. Jayasundara, I've completed the evaluations for all my assigned interns.",
        timestamp: "Yesterday, 3:30 PM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Thank you, Dr. Jayasuriya. Have you uploaded them to the system?",
        timestamp: "Yesterday, 3:45 PM",
        read: true,
      },
      {
        id: 3,
        senderId: 102,
        text: "Yes, all evaluations have been submitted through the portal. I've also added my recommendations for each intern.",
        timestamp: "Yesterday, 4:00 PM",
        read: true,
      },
      {
        id: 4,
        senderId: 102,
        text: "I've reviewed all the evaluations for my assigned interns.",
        timestamp: "Yesterday, 4:15 PM",
        read: true,
      },
    ],
    103: [
      {
        id: 1,
        senderId: 103,
        text: "Dr. Jayasundara, I need some clarification on the new evaluation criteria that was introduced this semester.",
        timestamp: "2:00 PM",
        read: true,
      },
      {
        id: 2,
        senderId: 103,
        text: "Specifically, how should we weight the industry supervisor feedback versus academic performance?",
        timestamp: "2:15 PM",
        read: true,
      },
      {
        id: 3,
        senderId: 103,
        text: "Need clarification on the new evaluation criteria.",
        timestamp: "2:30 PM",
        read: false,
      },
    ],
    104: [
      {
        id: 1,
        senderId: 104,
        text: "Dear Dr. Jayasundara, thank you so much for approving my internship placement at Tech Solutions Ltd.",
        timestamp: "3:00 PM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "You're welcome, Erandi. Make sure to submit your weekly reports on time and maintain regular communication with your academic supervisor.",
        timestamp: "3:15 PM",
        read: true,
      },
      {
        id: 3,
        senderId: 104,
        text: "I will definitely do that. I've already scheduled my first meeting with Dr. Jayasuriya.",
        timestamp: "3:30 PM",
        read: true,
      },
      {
        id: 4,
        senderId: 104,
        text: "Thank you for approving my internship placement.",
        timestamp: "3:45 PM",
        read: false,
      },
    ],
    106: [
      {
        id: 1,
        senderId: 106,
        text: "Hello Dr. Jayasundara, I hope this message finds you well.",
        timestamp: "11:00 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 106,
        text: "We're very pleased with the quality of interns from your university. Can we schedule a meeting to discuss the new batch of interns?",
        timestamp: "11:30 AM",
        read: false,
      },
    ],
    108: [
      {
        id: 1,
        senderId: 108,
        text: "Dear Dr. Jayasundara, this is a reminder to submit the internship statistics for this semester.",
        timestamp: "8:30 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 108,
        text: "The deadline is next Friday. Please include placement rates, company distribution, and student feedback summary.",
        timestamp: "8:45 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 108,
        text: "Reminder: Submit the internship statistics for this semester.",
        timestamp: "9:00 AM",
        read: false,
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

  // Get contact type label
  const getContactTypeLabel = (type: string) => {
    switch (type) {
      case "student":
        return "Student Intern";
      case "supervisor":
        return "Academic Supervisor";
      case "hod":
        return "Department Head";
      case "industry":
        return "Industry Partner";
      case "admin":
        return "Administration";
      default:
        return "Contact";
    }
  };

  // Get contact icon based on type
  const getContactIcon = (type: string) => {
    switch (type) {
      case "student":
        return <FaUserGraduate />;
      case "supervisor":
        return <FaUserTie />;
      case "hod":
        return <FaUniversity />;
      case "industry":
        return <FaBuilding />;
      case "admin":
        return <FaFileAlt />;
      default:
        return <FaUsers />;
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      {/* <CoordinatorSideMenu
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
                    <div className="contact-role">
                      {contact.role}
                      {contact.company && ` - ${contact.company}`}
                      {contact.department &&
                        !contact.company &&
                        ` - ${contact.department}`}
                    </div>
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
                          ? "Active now"
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
                  {conversations[selectedContact.id]?.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${
                        message.senderId === currentUser.id
                          ? "message-sent"
                          : "message-received"
                      }`}
                    >
                      <div className="message-content">
                        {message.attachment && (
                          <div className="message-attachment">
                            {message.attachment.type === "image" ? (
                              <div className="attachment-image">
                                <img
                                  src={message.attachment.url}
                                  alt={message.attachment.name}
                                />
                              </div>
                            ) : (
                              <div className="attachment-file">
                                <div className="attachment-file-icon">
                                  <FaFile />
                                </div>
                                <div className="attachment-info">
                                  <span className="attachment-name">
                                    {message.attachment.name}
                                  </span>
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
                        <div className="message-bubble">{message.text}</div>
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
                  <h3>Contact Information</h3>
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
                  <p className="profile-role">
                    {getContactTypeLabel(selectedContact.type)}
                  </p>
                  <p className="profile-department">
                    {selectedContact.department || selectedContact.company}
                  </p>
                </div>

                <div className="contact-info-details">
                  <div className="info-section">
                    <h4>Contact Type</h4>
                    <div className="info-item">
                      <span className="info-icon">
                        {getContactIcon(selectedContact.type)}
                      </span>
                      <span>{getContactTypeLabel(selectedContact.type)}</span>
                    </div>
                  </div>

                  <div className="info-section">
                    <h4>Organization</h4>
                    <div className="info-item">
                      <span className="info-icon">
                        {selectedContact.company ? (
                          <FaBuilding />
                        ) : (
                          <FaUniversity />
                        )}
                      </span>
                      <span>
                        {selectedContact.company ||
                          selectedContact.department ||
                          "University of Colombo"}
                      </span>
                    </div>
                  </div>

                  {selectedContact.type === "student" && (
                    <div className="info-section">
                      <h4>Internship Details</h4>
                      <div className="info-item">
                        <span className="info-icon">
                          <FaClipboardCheck />
                        </span>
                        <span>Evaluation Status: In Progress</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">
                          <FaCalendarAlt />
                        </span>
                        <span>Started: January 2025</span>
                      </div>
                    </div>
                  )}

                  {selectedContact.type === "supervisor" && (
                    <div className="info-section">
                      <h4>Supervision Details</h4>
                      <div className="info-item">
                        <span className="info-icon">
                          <FaUsers />
                        </span>
                        <span>Supervising: 4 Interns</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">
                          <FaChartLine />
                        </span>
                        <span>Evaluations: 12 Completed</span>
                      </div>
                    </div>
                  )}

                  {selectedContact.type === "industry" && (
                    <div className="info-section">
                      <h4>Partnership Details</h4>
                      <div className="info-item">
                        <span className="info-icon">
                          <FaUsers />
                        </span>
                        <span>Active Interns: 8</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">
                          <FaCalendarAlt />
                        </span>
                        <span>Partner Since: 2023</span>
                      </div>
                    </div>
                  )}

                  <div className="info-section">
                    <h4>Recent Activity</h4>
                    <div className="info-item">
                      <span className="info-icon">
                        <FaBell />
                      </span>
                      <span>
                        Last active:{" "}
                        {selectedContact.status === "online"
                          ? "Now"
                          : "2 hours ago"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorMessagesPage;
