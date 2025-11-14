import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Chat, Message } from './types';

interface ChatWindowProps {
  activeTab: string;
  selectedChat: Chat | null;
  messages: Message[];
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
}

export default function ChatWindow({
  activeTab,
  selectedChat,
  messages,
  messageText,
  onMessageChange,
  onSendMessage,
}: ChatWindowProps) {
  if (activeTab === 'profile') {
    return (
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
    );
  }

  if (activeTab === 'settings') {
    return (
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
    );
  }

  if (!selectedChat) {
    return (
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
    );
  }

  return (
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
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            className="flex-1 bg-muted border-none"
          />
          
          <Button
            size="icon"
            onClick={onSendMessage}
            className="bg-primary hover:bg-primary/90 flex-shrink-0"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </>
  );
}
