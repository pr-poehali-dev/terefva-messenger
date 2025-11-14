import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Chat, Group, Channel, Call, Story } from './types';

interface ChatListProps {
  activeTab: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  stories: Story[];
  chats: Chat[];
  groups: Group[];
  channels: Channel[];
  calls: Call[];
}

export default function ChatList({
  activeTab,
  searchQuery,
  onSearchChange,
  selectedChat,
  onChatSelect,
  stories,
  chats,
  groups,
  channels,
  calls,
}: ChatListProps) {
  return (
    <div className="w-96 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-2xl font-bold mb-4">Terefva</h2>
        
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск чатов..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-muted border-none"
            />
          </div>
        </div>

        <ScrollArea className="h-32">
          <div className="flex gap-3 pb-2">
            {stories.map(story => (
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
          {activeTab === 'chats' && chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat)}
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

          {activeTab === 'groups' && groups.map(group => (
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

          {activeTab === 'channels' && channels.map(channel => (
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

          {activeTab === 'calls' && calls.map(call => (
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
  );
}
