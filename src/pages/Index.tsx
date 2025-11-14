import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Story {
  id: number;
  name: string;
  avatar: string;
  viewed: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
}

const mockStories: Story[] = [
  { id: 1, name: 'Твоя история', avatar: '👤', viewed: false },
  { id: 2, name: 'Анна', avatar: '🎨', viewed: false },
  { id: 3, name: 'Иван', avatar: '🚀', viewed: false },
  { id: 4, name: 'Мария', avatar: '🌸', viewed: true },
  { id: 5, name: 'Дмитрий', avatar: '⚡', viewed: false },
  { id: 6, name: 'Елена', avatar: '🎭', viewed: true },
];

const mockChats: Chat[] = [
  { id: 1, name: 'Анна Иванова', avatar: '🎨', lastMessage: 'Посмотри новый дизайн!', time: '14:32', unread: 2, online: true },
  { id: 2, name: 'Рабочая группа', avatar: '💼', lastMessage: 'Встреча перенесена на 15:00', time: '13:15', unread: 5, online: false },
  { id: 3, name: 'Иван Петров', avatar: '🚀', lastMessage: 'Готов к запуску проекта', time: '12:48', unread: 0, online: true },
  { id: 4, name: 'Мария Смирнова', avatar: '🌸', lastMessage: 'Спасибо за помощь!', time: '11:20', unread: 0, online: false },
  { id: 5, name: 'Дмитрий Козлов', avatar: '⚡', lastMessage: 'Код готов к ревью', time: '10:05', unread: 1, online: true },
  { id: 6, name: 'Елена Волкова', avatar: '🎭', lastMessage: 'Отлично, договорились', time: 'Вчера', unread: 0, online: false },
];

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
      <div className="w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-6">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl font-bold">
          T
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-muted ${
                activeTab === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
              title={item.label}
            >
              <Icon name={item.icon as any} size={24} />
            </button>
          ))}
        </div>
      </div>

      <div className="w-96 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-2xl font-bold mb-4">Terefva</h2>
          
          <div className="mb-4">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск чатов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-none"
              />
            </div>
          </div>

          <ScrollArea className="h-32">
            <div className="flex gap-3 pb-2">
              {mockStories.map(story => (
                <button
                  key={story.id}
                  className="flex flex-col items-center gap-2 flex-shrink-0 group"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-transform hover:scale-105 ${
                    story.viewed
                      ? 'bg-muted'
                      : 'bg-gradient-to-br from-primary via-secondary to-accent p-0.5'
                  }`}>
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${
                      story.viewed ? '' : 'bg-card'
                    }`}>
                      {story.avatar}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground max-w-[64px] truncate">
                    {story.name}
                  </span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <ScrollArea className="flex-1">
          <div className="divide-y divide-border">
            {filteredChats.map(chat => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-4 flex gap-3 hover:bg-muted transition-colors ${
                  selectedChat?.id === chat.id ? 'bg-muted' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card"></div>
                  )}
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold truncate">{chat.name}</span>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground ml-2 h-5 min-w-5 rounded-full px-1.5">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-xl">{selectedChat.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedChat.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.online ? 'в сети' : 'был(а) недавно'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Icon name="Video" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4 max-w-3xl mx-auto">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 bg-card border-t border-border">
              <div className="flex gap-3 max-w-3xl mx-auto">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground flex-shrink-0">
                  <Icon name="Paperclip" size={20} />
                </Button>
                
                <Input
                  placeholder="Написать сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-muted border-none"
                />
                
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90 flex-shrink-0"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
