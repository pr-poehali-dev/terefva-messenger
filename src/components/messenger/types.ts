export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface Group {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  members: number;
  unread: number;
}

export interface Channel {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  subscribers: string;
  verified: boolean;
}

export interface Call {
  id: number;
  name: string;
  avatar: string;
  time: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration?: string;
}

export interface Story {
  id: number;
  name: string;
  avatar: string;
  viewed: boolean;
}

export interface Message {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
}

export const mockStories: Story[] = [
  { id: 1, name: 'Твоя история', avatar: '👤', viewed: false },
  { id: 2, name: 'Анна', avatar: '🎨', viewed: false },
  { id: 3, name: 'Иван', avatar: '🚀', viewed: false },
  { id: 4, name: 'Мария', avatar: '🌸', viewed: true },
  { id: 5, name: 'Дмитрий', avatar: '⚡', viewed: false },
  { id: 6, name: 'Елена', avatar: '🎭', viewed: true },
];

export const mockChats: Chat[] = [
  { id: 1, name: 'Анна Иванова', avatar: '🎨', lastMessage: 'Посмотри новый дизайн!', time: '14:32', unread: 2, online: true },
  { id: 2, name: 'Иван Петров', avatar: '🚀', lastMessage: 'Готов к запуску проекта', time: '12:48', unread: 0, online: true },
  { id: 3, name: 'Мария Смирнова', avatar: '🌸', lastMessage: 'Спасибо за помощь!', time: '11:20', unread: 0, online: false },
  { id: 4, name: 'Дмитрий Козлов', avatar: '⚡', lastMessage: 'Код готов к ревью', time: '10:05', unread: 1, online: true },
  { id: 5, name: 'Елена Волкова', avatar: '🎭', lastMessage: 'Отлично, договорились', time: 'Вчера', unread: 0, online: false },
];

export const mockGroups: Group[] = [
  { id: 1, name: 'Рабочая группа', avatar: '💼', lastMessage: 'Встреча перенесена на 15:00', time: '13:15', members: 24, unread: 5 },
  { id: 2, name: 'Семья', avatar: '👨‍👩‍👧‍👦', lastMessage: 'Мама: Не забудьте про ужин', time: '12:00', members: 5, unread: 0 },
  { id: 3, name: 'Футбол по выходным', avatar: '⚽', lastMessage: 'Завтра играем в 10:00', time: '11:30', members: 12, unread: 3 },
  { id: 4, name: 'Книжный клуб', avatar: '📚', lastMessage: 'Новая книга месяца!', time: 'Вчера', members: 18, unread: 0 },
];

export const mockChannels: Channel[] = [
  { id: 1, name: 'Новости технологий', avatar: '📱', lastMessage: 'Новый iPhone 16 представлен', time: '15:20', subscribers: '1.2M', verified: true },
  { id: 2, name: 'Дизайн и UX', avatar: '🎨', lastMessage: 'Тренды дизайна 2025', time: '14:45', subscribers: '850K', verified: true },
  { id: 3, name: 'Программирование', avatar: '💻', lastMessage: 'React 19 выпущен', time: '13:30', subscribers: '2.1M', verified: true },
  { id: 4, name: 'Путешествия', avatar: '✈️', lastMessage: 'Лучшие места для отдыха', time: 'Вчера', subscribers: '500K', verified: false },
];

export const mockCalls: Call[] = [
  { id: 1, name: 'Анна Иванова', avatar: '🎨', time: 'Сегодня, 14:20', type: 'incoming', duration: '12:34' },
  { id: 2, name: 'Иван Петров', avatar: '🚀', time: 'Сегодня, 12:15', type: 'outgoing', duration: '5:42' },
  { id: 3, name: 'Мария Смирнова', avatar: '🌸', time: 'Вчера, 18:30', type: 'missed' },
  { id: 4, name: 'Дмитрий Козлов', avatar: '⚡', time: 'Вчера, 15:00', type: 'outgoing', duration: '1:23' },
  { id: 5, name: 'Елена Волкова', avatar: '🎭', time: '12 ноября', type: 'incoming', duration: '25:18' },
];
