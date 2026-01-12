import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaMicrophone, FaMicrophoneSlash, FaTimes, FaPaperPlane, FaVolumeUp, FaComments } from 'react-icons/fa';
import gsap from 'gsap';
const AIAssistant = ({ isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState('chat'); 
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your AI Property Assistant. How can I help you find your dream property today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        setSpeechRecognition(recognition);
      }

      // Speech Synthesis
      if (window.speechSynthesis) {
        setSpeechSynthesis(window.speechSynthesis);
      }
    }
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // GSAP animations for sidebar
  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(modalRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClose = () => {
    gsap.to(modalRef.current, {
      x: '100%',
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => setIsOpen(false)
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Text-to-speech for bot response
      if (speechSynthesis && activeMode === 'voice') {
        speakText(botResponse);
      }
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('property') || input.includes('house') || input.includes('flat')) {
      return "I can help you find properties! What type of property are you looking for? Residential, commercial, or agricultural land?";
    } else if (input.includes('budget') || input.includes('price') || input.includes('cost')) {
      return "What's your budget range? I can show you properties within your preferred price range.";
    } else if (input.includes('location') || input.includes('area') || input.includes('city')) {
      return "Which location are you interested in? I can help you find properties in specific areas with good connectivity and amenities.";
    } else if (input.includes('loan') || input.includes('emi') || input.includes('finance')) {
      return "I can help you with home loan information! Would you like to calculate EMI or apply for a loan? Our loan partners offer competitive rates.";
    } else if (input.includes('bhk') || input.includes('bedroom') || input.includes('room')) {
      return "How many bedrooms do you need? We have 1BHK, 2BHK, 3BHK, and larger properties available.";
    } else if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! I'm here to help you find your perfect property. Is there anything else you'd like to know?";
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm your AI Property Assistant. I can help you search for properties, calculate EMI, get loan information, and answer any property-related questions. What would you like to know?";
    } else {
      return "I understand you're looking for property assistance. Could you please be more specific about what you need? I can help with property search, pricing, locations, loans, and more!";
    }
  };

  const startVoiceRecognition = () => {
    if (!speechRecognition) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    setIsListening(true);
    speechRecognition.start();

    speechRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    speechRecognition.onerror = () => {
      setIsListening(false);
    };

    speechRecognition.onend = () => {
      setIsListening(false);
    };
  };

  const stopVoiceRecognition = () => {
    if (speechRecognition) {
      speechRecognition.stop();
    }
    setIsListening(false);
  };

  const speakText = (text) => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Show me 2BHK flats", icon: "🏠" },
    { text: "Calculate EMI", icon: "💰" },
    { text: "Properties under 50 lakhs", icon: "💸" },
    { text: "Commercial properties", icon: "🏢" }
  ];

  return (
    <>
      {/* AI Assistant Button - Small Icon */}
      <button 
        className={`fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full shadow-lg z-[1000] transition-all duration-300 ease-out flex items-center justify-center transform hover:scale-110 hover:shadow-xl ${
          !isVisible ? 'translate-x-20 opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        title="AI Assistant"
      >
        <FaComments className="text-xl animate-pulse" />
      </button>

      {/* AI Assistant Modal - Sidebar Style */}
      {isOpen && (
        <div ref={overlayRef} className="fixed inset-0 z-[2000]" onClick={handleClose}>
          <div 
            ref={modalRef} 
            className="fixed right-0 top-0 h-full bg-white shadow-2xl border-l-4 border-purple-500 transform transition-transform duration-300 ease-out flex flex-col w-full sm:w-96 md:w-[420px]"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">AI Property Assistant</h3>
                  <p className="text-xs text-purple-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors text-white"
                onClick={handleClose}
              >
                <FaTimes />
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="flex p-3 bg-gray-50 border-b border-gray-100">
              <button 
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeMode === 'chat' 
                    ? 'bg-purple-500 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveMode('chat')}
              >
                💬 Chat Mode
              </button>
              <button 
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ml-2 ${
                  activeMode === 'voice' 
                    ? 'bg-purple-500 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveMode('voice')}
              >
                🎤 Voice Mode
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md' 
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span className={`text-xs mt-2 block ${
                        message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  {message.type === 'bot' && (
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100 transition-colors text-gray-500 hover:text-purple-600 ml-2 mt-1"
                      onClick={() => speakText(message.text)}
                      title="Listen to message"
                    >
                      <FaVolumeUp className="text-sm" />
                    </button>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-bl-md border border-gray-200 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 mb-2 font-medium">Quick Actions:</p>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white hover:bg-purple-50 rounded-lg transition-all text-sm text-gray-700 hover:text-purple-700 border border-gray-200 hover:border-purple-200 text-left"
                    onClick={() => {
                      setInputMessage(action.text);
                      setTimeout(handleSendMessage, 100);
                    }}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="font-medium">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={activeMode === 'voice' ? "Speak or type your message..." : "Type your message..."}
                    className="w-full p-3 pr-12 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm max-h-20"
                    rows="1"
                  />
                  
                  {activeMode === 'voice' && (
                    <button 
                      className={`absolute right-12 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                        isListening 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}
                      onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                    >
                      {isListening ? <FaMicrophoneSlash className="text-sm" /> : <FaMicrophone className="text-sm" />}
                    </button>
                  )}
                </div>
                
                <button 
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                    inputMessage.trim() 
                      ? 'bg-purple-500 text-white hover:bg-purple-600 shadow-md' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;