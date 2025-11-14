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

interface Group {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  members: number;
  unread: number;
}

interface Channel {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  subscribers: string;
  verified: boolean;
}

interface Call {
  id: number;
  name: string;
  avatar: string;
  time: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration?: string;
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
  { id: 2, name: 'Иван Петров', avatar: '🚀', lastMessage: 'Готов к запуску проекта', time: '12:48', unread: 0, online: true },
  { id: 3, name: 'Мария Смирнова', avatar: '🌸', lastMessage: 'Спасибо за помощь!', time: '11:20', unread: 0, online: false },
  { id: 4, name: 'Дмитрий Козлов', avatar: '⚡', lastMessage: 'Код готов к ревью', time: '10:05', unread: 1, online: true },
  { id: 5, name: 'Елена Волкова', avatar: '🎭', lastMessage: 'Отлично, договорились', time: 'Вчера', unread: 0, online: false },
];

const mockGroups: Group[] = [
  { id: 1, name: 'Рабочая группа', avatar: '💼', lastMessage: 'Встреча перенесена на 15:00', time: '13:15', members: 24, unread: 5 },
  { id: 2, name: 'Семья', avatar: '👨‍👩‍👧‍👦', lastMessage: 'Мама: Не забудьте про ужин', time: '12:00', members: 5, unread: 0 },
  { id: 3, name: 'Футбол по выходным', avatar: '⚽', lastMessage: 'Завтра играем в 10:00', time: '11:30', members: 12, unread: 3 },
  { id: 4, name: 'Книжный клуб', avatar: '📚', lastMessage: 'Новая книга месяца!', time: 'Вчера', members: 18, unread: 0 },
];

const mockChannels: Channel[] = [
  { id: 1, name: 'Новости технологий', avatar: '📱', lastMessage: 'Новый iPhone 16 представлен', time: '15:20', subscribers: '1.2M', verified: true },
  { id: 2, name: 'Дизайн и UX', avatar: '🎨', lastMessage: 'Тренды дизайна 2025', time: '14:45', subscribers: '850K', verified: true },
  { id: 3, name: 'Программирование', avatar: '💻', lastMessage: 'React 19 выпущен', time: '13:30', subscribers: '2.1M', verified: true },
  { id: 4, name: 'Путешествия', avatar: '✈️', lastMessage: 'Лучшие места для отдыха', time: 'Вчера', subscribers: '500K', verified: false },
];

const mockCalls: Call[] = [
  { id: 1, name: 'Анна Иванова', avatar: '🎨', time: 'Сегодня, 14:20', type: 'incoming', duration: '12:34' },
  { id: 2, name: 'Иван Петров', avatar: '🚀', time: 'Сегодня, 12:15', type: 'outgoing', duration: '5:42' },
  { id: 3, name: 'Мария Смирнова', avatar: '🌸', time: 'Вчера, 18:30', type: 'missed' },
  { id: 4, name: 'Дмитрий Козлов', avatar: '⚡', time: 'Вчера, 15:00', type: 'outgoing', duration: '1:23' },
  { id: 5, name: 'Елена Волкова', avatar: '🎭', time: '12 ноября', type: 'incoming', duration: '25:18' },
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
            {activeTab === 'chats' && filteredChats.map(chat => (
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

            {activeTab === 'groups' && filteredGroups.map(group => (
              <button
                key={group.id}
                className="w-full p-4 flex gap-3 hover:bg-muted transition-colors"
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-2xl">{group.avatar}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold truncate">{group.name}</span>
                    <span className="text-xs text-muted-foreground">{group.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{group.lastMessage}</p>
                    {group.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground ml-2 h-5 min-w-5 rounded-full px-1.5">
                        {group.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{group.members} участников</p>
                </div>
              </button>
            ))}

            {activeTab === 'channels' && filteredChannels.map(channel => (
              <button
                key={channel.id}
                className="w-full p-4 flex gap-3 hover:bg-muted transition-colors"
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-2xl">{channel.avatar}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold truncate">{channel.name}</span>
                    {channel.verified && (
                      <Icon name="BadgeCheck" size={16} className="text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate mb-1">{channel.lastMessage}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{channel.subscribers} подписчиков</p>
                    <span className="text-xs text-muted-foreground">{channel.time}</span>
                  </div>
                </div>
              </button>
            ))}

            {activeTab === 'calls' && filteredCalls.map(call => (
              <button
                key={call.id}
                className="w-full p-4 flex gap-3 hover:bg-muted transition-colors"
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="text-2xl">{call.avatar}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold truncate">{call.name}</span>
                    <Icon 
                      name={call.type === 'incoming' ? 'PhoneIncoming' : call.type === 'outgoing' ? 'PhoneOutgoing' : 'PhoneMissed'} 
                      size={16} 
                      className={call.type === 'missed' ? 'text-red-500' : 'text-muted-foreground'} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{call.time}</p>
                    {call.duration && (
                      <span className="text-xs text-muted-foreground">{call.duration}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {activeTab === 'profile' ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md w-full space-y-6">
              <div className="text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarFallback className="text-6xl">👤</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-1">Александр Петров</h2>
                <p className="text-muted-foreground">@alex_petrov</p>
                <p className="text-sm text-muted-foreground mt-2">в сети</p>
              </div>
              
              <div className="space-y-3 bg-card rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={20} className="text-muted-foreground" />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-muted-foreground" />
                  <span>alex@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={20} className="text-muted-foreground" />
                  <span>Москва, Россия</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Icon name="Edit" size={18} className="mr-2" />
                  Редактировать профиль
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Share2" size={18} className="mr-2" />
                  Поделиться профилем
                </Button>
              </div>
            </div>
          </div>
        ) : activeTab === 'settings' ? (
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold mb-6">Настройки</h2>
              
              <div className="bg-card rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Звук сообщений</p>
                    <p className="text-sm text-muted-foreground">Воспроизводить звук при получении сообщений</p>
                  </div>
                  <Button variant="outline" size="sm">Вкл</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push-уведомления</p>
                    <p className="text-sm text-muted-foreground">Показывать уведомления на экране</p>
                  </div>
                  <Button variant="outline" size="sm">Вкл</Button>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Приватность</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Статус "в сети"</p>
                    <p className="text-sm text-muted-foreground">Кто может видеть когда вы онлайн</p>
                  </div>
                  <Button variant="outline" size="sm">Все</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Фото профиля</p>
                    <p className="text-sm text-muted-foreground">Кто может видеть ваше фото</p>
                  </div>
                  <Button variant="outline" size="sm">Контакты</Button>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Внешний вид</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Тема оформления</p>
                    <p className="text-sm text-muted-foreground">Тёмная тема включена</p>
                  </div>
                  <Button variant="outline" size="sm">Тёмная</Button>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6">
                <Button variant="destructive" className="w-full">
                  <Icon name="LogOut" size={18} className="mr-2" />
                  Выйти из аккаунта
                </Button>
              </div>
            </div>
          </div>
        ) : selectedChat ? (
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
              {activeTab === 'chats' && (
                <>
                  <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Выберите чат для начала общения</p>
                </>
              )}
              {activeTab === 'groups' && (
                <>
                  <Icon name="Users" size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Выберите группу</p>
                </>
              )}
              {activeTab === 'channels' && (
                <>
                  <Icon name="Radio" size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Выберите канал</p>
                </>
              )}
              {activeTab === 'calls' && (
                <>
                  <Icon name="Phone" size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">История звонков</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;