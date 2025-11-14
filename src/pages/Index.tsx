import { useState } from 'react';
import Sidebar from '@/components/messenger/Sidebar';
import ChatList from '@/components/messenger/ChatList';
import ChatWindow from '@/components/messenger/ChatWindow';
import {
  Chat,
  Message,
  mockStories,
  mockChats,
  mockGroups,
  mockChannels,
  mockCalls,
} from '@/components/messenger/types';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', time: '14:30', isOwn: false },
    { id: 2, text: 'Отлично! А у тебя?', time: '14:31', isOwn: true },
    { id: 3, text: 'Посмотри новый дизайн!', time: '14:32', isOwn: false },
  ]);

  const navItems = [
    { id: 'chats', label: 'Чаты', icon: 'MessageCircle' },
    { id: 'groups', label: 'Группы', icon: 'Users' },
    { id: 'channels', label: 'Каналы', icon: 'Radio' },
    { id: 'calls', label: 'Звонки', icon: 'Phone' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = mockGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChannels = mockChannels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCalls = mockCalls.filter(call =>
    call.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        navItems={navItems} 
      />
      
      <ChatList
        activeTab={activeTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedChat={selectedChat}
        onChatSelect={setSelectedChat}
        stories={mockStories}
        chats={filteredChats}
        groups={filteredGroups}
        channels={filteredChannels}
        calls={filteredCalls}
      />

      <div className="flex-1 flex flex-col">
        <ChatWindow
          activeTab={activeTab}
          selectedChat={selectedChat}
          messages={messages}
          messageText={messageText}
          onMessageChange={setMessageText}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Index;
