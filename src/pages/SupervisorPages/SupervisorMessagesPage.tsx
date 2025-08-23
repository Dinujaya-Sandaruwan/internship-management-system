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
} from "react-icons/fa";
import SupervisorSideMenu from "../../components/SupervisorSideMenu";

const SupervisorMessagesPage: React.FC = () => {
  // Active menu item state
  const [activeMenuItem, setActiveMenuItem] = useState("messages");

  // Sample supervisor data
  const [currentUser] = useState({
    id: 1,
    name: "Dr. Kumara Jayasuriya",
    avatar: "KJ",
    status: "online",
    title: "Senior Lecturer",
    department: "Department of Computer Science",
    university: "University of Colombo",
  });

  // Sample contacts (including students, coordinators, and department heads)
  const [contacts, setContacts] = useState([
    {
      id: 101,
      name: "Erandi Katugampala",
      avatar: "EK",
      role: "Software Engineering Intern",
      company: "Tech Solutions Ltd.",
      status: "online",
      type: "student",
      unread: 2,
      lastMessage:
        "Thank you for the feedback on my weekly report, Dr. Jayasuriya.",
      lastMessageTime: "10:15 AM",
    },
    {
      id: 102,
      name: "Dinesh Perera",
      avatar: "DP",
      role: "Data Science Intern",
      company: "DataViz Analytics",
      status: "offline",
      type: "student",
      unread: 0,
      lastMessage:
        "I've submitted my mid-term evaluation form. Could you please review it?",
      lastMessageTime: "Yesterday",
    },
    {
      id: 103,
      name: "Dr. Chandima Jayasundara",
      avatar: "CJ",
      role: "Internship Coordinator",
      department: "Faculty of Technology",
      status: "online",
      type: "coordinator",
      unread: 1,
      lastMessage:
        "Can we discuss the upcoming supervisor meeting agenda tomorrow?",
      lastMessageTime: "2:30 PM",
    },
    {
      id: 104,
      name: "Prof. Sampath Deegalla",
      avatar: "SD",
      role: "Head of Department",
      department: "Department of ICT",
      status: "away",
      type: "hod",
      unread: 0,
      lastMessage:
        "Please submit your supervisor evaluation report by next Monday.",
      lastMessageTime: "Yesterday",
    },
    {
      id: 105,
      name: "Amali Fernando",
      avatar: "AF",
      role: "Network Engineering Intern",
      company: "CloudNet Solutions",
      status: "away",
      type: "student",
      unread: 3,
      lastMessage: "I had some questions about the final report requirements.",
      lastMessageTime: "3:45 PM",
    },
    {
      id: 106,
      name: "Dr. Thilini Peiris",
      avatar: "TP",
      role: "Internship Coordinator",
      department: "Faculty of Technology",
      status: "online",
      type: "coordinator",
      unread: 0,
      lastMessage:
        "The industry feedback forms have been updated. Please use the new template.",
      lastMessageTime: "May 07",
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

  // Sample conversation messages for each contact
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
        senderId: 1,
        text: "Hello Erandi, I've reviewed your weekly report. Good work overall.",
        timestamp: "09:30 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 101,
        text: "Thank you Dr. Jayasuriya. I appreciate your feedback.",
        timestamp: "09:32 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 1,
        text: "I'd like to discuss your progress on the React component library project. Could we schedule a meeting for tomorrow?",
        timestamp: "09:40 AM",
        read: true,
      },
      {
        id: 4,
        senderId: 101,
        text: "Yes, of course. I'm available tomorrow from 10 AM to 3 PM.",
        timestamp: "09:45 AM",
        read: true,
      },
      {
        id: 5,
        senderId: 1,
        text: "I've attached the evaluation criteria document for your upcoming mid-term assessment. Please review it before our meeting.",
        timestamp: "09:50 AM",
        read: true,
        attachment: {
          type: "file",
          name: "Mid_Term_Evaluation_Criteria.pdf",
          size: "2.4 MB",
          url: "#",
        },
      },
      {
        id: 6,
        senderId: 101,
        text: "Thank you for the feedback on my weekly report, Dr. Jayasuriya.",
        timestamp: "10:15 AM",
        read: false,
      },
    ],
    102: [
      {
        id: 1,
        senderId: 102,
        text: "Good morning Dr. Jayasuriya. I've submitted my mid-term evaluation form. Could you please review it?",
        timestamp: "Yesterday, 11:20 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hello Dinesh, I'll review it by tomorrow and provide my feedback.",
        timestamp: "Yesterday, 11:25 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 102,
        text: "Thank you. I'm also planning to submit my data analysis project by next week.",
        timestamp: "Yesterday, 11:30 AM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "That sounds good. Let me know if you need any help with the analytical approaches.",
        timestamp: "Yesterday, 11:35 AM",
        read: true,
      },
    ],
    103: [
      {
        id: 1,
        senderId: 103,
        text: "Good morning Dr. Jayasuriya. We need to discuss the upcoming supervisor meeting agenda.",
        timestamp: "1:30 PM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hello Dr. Jayasundara. Yes, I've been reviewing the agenda items. I have a few suggestions to add.",
        timestamp: "1:40 PM",
        read: true,
      },
      {
        id: 3,
        senderId: 103,
        text: "Excellent. Could you email your suggestions by tomorrow? Also, how are your assigned students performing this semester?",
        timestamp: "2:00 PM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "I'll send my suggestions today. Overall, my students are doing well. I've seen particularly strong progress from Erandi and Amali.",
        timestamp: "2:15 PM",
        read: true,
      },
      {
        id: 5,
        senderId: 103,
        text: "Can we discuss the upcoming supervisor meeting agenda tomorrow?",
        timestamp: "2:30 PM",
        read: false,
      },
    ],
    104: [
      {
        id: 1,
        senderId: 104,
        text: "Dr. Jayasuriya, please remember to submit your supervisor evaluation report by next Monday.",
        timestamp: "Yesterday, 9:30 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Good morning Professor Deegalla. I've actually completed most of the evaluations already. I'll have them submitted by Friday.",
        timestamp: "Yesterday, 9:45 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 104,
        text: "That's excellent. Thank you for your promptness. We'll be discussing the evaluation results in the next faculty meeting.",
        timestamp: "Yesterday, 10:00 AM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "You're welcome. I've also prepared some recommendations for improving the internship program based on my observations this semester.",
        timestamp: "Yesterday, 10:15 AM",
        read: true,
      },
      {
        id: 5,
        senderId: 104,
        text: "I'd be very interested to hear those. Please include them with your report or we can discuss them in person.",
        timestamp: "Yesterday, 10:30 AM",
        read: true,
      },
    ],
    105: [
      {
        id: 1,
        senderId: 105,
        text: "Hello Dr. Jayasuriya. I had some questions about the final report requirements.",
        timestamp: "2:30 PM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Hi Amali. What specific questions do you have about the final report?",
        timestamp: "2:40 PM",
        read: true,
      },
      {
        id: 3,
        senderId: 105,
        text: "I'm not sure about the expected length and the technical depth required for the network architecture section.",
        timestamp: "3:00 PM",
        read: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "The report should be around 30-40 pages. For the network architecture section, I expect detailed diagrams and explanations of the protocols and security measures you implemented.",
        timestamp: "3:15 PM",
        read: true,
      },
      {
        id: 5,
        senderId: 1,
        text: "Here's a sample network diagram format that you can follow. It highlights the key components that need to be covered.",
        timestamp: "3:30 PM",
        read: false,
        attachment: {
          type: "image",
          name: "Network_Diagram_Example.png",
          size: "1.8 MB",
          url: "https://cdn.sanity.io/images/599r6htc/regionalized/2cf39e150b70de3bd55b5a9862748cb242ec8844-1440x1440.png",
        },
      },
      {
        id: 6,
        senderId: 1,
        text: "We should schedule a meeting to discuss this in more detail. How about Friday at 2 PM?",
        timestamp: "3:45 PM",
        read: false,
      },
    ],
    106: [
      {
        id: 1,
        senderId: 106,
        text: "Hello Dr. Jayasuriya. I wanted to inform you that the industry feedback forms have been updated.",
        timestamp: "May 07, 10:00 AM",
        read: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Good morning Dr. Peiris. Thank you for letting me know. Has the evaluation criteria changed as well?",
        timestamp: "May 07, 10:15 AM",
        read: true,
      },
      {
        id: 3,
        senderId: 106,
        text: "Yes, we've added a new section for assessing technical communication skills. I'm attaching the updated template.",
        timestamp: "May 07, 10:30 AM",
        read: true,
        attachment: {
          type: "file",
          name: "Updated_Industry_Feedback_Form.pdf",
          size: "1.2 MB",
          url: "#",
        },
      },
      {
        id: 4,
        senderId: 1,
        text: "I've reviewed the template. The changes make sense. I'll use this for the upcoming evaluations.",
        timestamp: "May 07, 10:45 AM",
        read: true,
      },
      {
        id: 5,
        senderId: 106,
        text: "The industry feedback forms have been updated. Please use the new template.",
        timestamp: "May 07, 11:00 AM",
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

  // Get today's date for display
  const getTodayDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, selectedContact]);

  return (
    <div className="dashboard supervisor-dashboard">
      {/* Sidebar */}
      {/* <SupervisorSideMenu /> */}

      {/* Main Content */}
      <div className="dashboard__main messages-page">
        <div className="messages-container supervisor-messages">
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
                      {contact.type === "student"
                        ? contact.role
                        : contact.role + ", " + contact.department}
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
                        {selectedContact.type === "student"
                          ? `${selectedContact.role} at ${selectedContact.company}`
                          : `${selectedContact.role}, ${selectedContact.department}`}
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
                    {selectedContact.type === "student"
                      ? selectedContact.role
                      : selectedContact.role +
                        ", " +
                        selectedContact.department}
                  </p>
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
                  <h4>Contact Details</h4>
                  {selectedContact.type === "student" ? (
                    <p>
                      <strong>Company:</strong> {selectedContact.company}
                      <br />
                      <br />
                      <strong>Program:</strong> BSc in Software Engineering
                      <br />
                      <strong>Duration:</strong> Jan 15, 2025 - Jul 15, 2025
                      <br />
                      <strong>Academic Year:</strong> 3rd Year
                      <br />
                      <strong>Student ID:</strong> TP/2020/123
                      <br />
                      <strong>Email:</strong>{" "}
                      {selectedContact.name.split(" ")[0].toLowerCase()}
                      @student.cmb.ac.lk
                    </p>
                  ) : (
                    <p>
                      <strong>Department:</strong> {selectedContact.department}
                      <br />
                      <br />
                      <strong>Office:</strong> Room{" "}
                      {200 + Math.floor(Math.random() * 100)}, Technology
                      Building
                      <br />
                      <strong>Email:</strong>{" "}
                      {selectedContact.name.split(" ")[0].toLowerCase()}
                      @cmb.ac.lk
                      <br />
                      <strong>Phone:</strong> +94 11 2158
                      {Math.floor(Math.random() * 100)}
                    </p>
                  )}
                </div>

                {selectedContact.type === "student" && (
                  <div className="supervisor-actions">
                    <h4>Supervision Actions</h4>
                    <div className="action-buttons">
                      <button className="action-button">
                        <FaFileAlt /> View Progress Reports
                      </button>
                      <button className="action-button">
                        <FaClipboardCheck /> Submit Evaluation
                      </button>
                      <button className="action-button">
                        <FaCalendarAlt /> Schedule Meeting
                      </button>
                    </div>
                  </div>
                )}

                {selectedContact.type !== "student" && (
                  <div className="supervisor-actions">
                    <h4>Faculty Actions</h4>
                    <div className="action-buttons">
                      <button className="action-button">
                        <FaUserTie /> View Academic Profile
                      </button>
                      <button className="action-button">
                        <FaCalendarAlt /> Schedule Meeting
                      </button>
                    </div>
                  </div>
                )}

                <div className="shared-media">
                  <h4>Shared Files</h4>
                  <div className="shared-files-list">
                    {Object.entries(conversations)
                      .filter(([key]) => parseInt(key) === selectedContact.id)
                      .flatMap(([_, messages]) =>
                        messages
                          .filter((message) => message.attachment)
                          .map((message) => message.attachment)
                      )
                      .map((attachment, index) => (
                        <div key={index} className="shared-file-item">
                          <div className="file-icon">
                            {attachment?.type === "image" ? (
                              <FaImage />
                            ) : (
                              <FaFile />
                            )}
                          </div>
                          <div className="file-details">
                            <div className="file-name">{attachment?.name}</div>
                            <div className="file-meta">
                              <span className="file-size">
                                {attachment?.size}
                              </span>
                              <button className="file-download">
                                <FaDownload />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
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

export default SupervisorMessagesPage;
