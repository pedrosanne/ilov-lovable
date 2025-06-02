
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Conversation {
  id: string;
  participant_1: string;
  participant_2: string;
  participant_1_profile: any;
  participant_2_profile: any;
  last_message_at: string;
  last_message: any[];
}

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  currentUserId: string;
}

export function ConversationsList({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation,
  currentUserId 
}: ConversationsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conversation => {
    const otherProfile = conversation.participant_1 === currentUserId 
      ? conversation.participant_2_profile 
      : conversation.participant_1_profile;
    
    const name = otherProfile?.presentation_name || otherProfile?.full_name || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours < 1) {
      return `${Math.floor(diffInMs / (1000 * 60))}min`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d`;
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-3">Mensagens</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar conversas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Lista de conversas */}
      <ScrollArea className="flex-1">
        {filteredConversations.length > 0 ? (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => {
              const otherProfile = conversation.participant_1 === currentUserId 
                ? conversation.participant_2_profile 
                : conversation.participant_1_profile;
              
              const lastMessage = conversation.last_message?.[0];
              const isSelected = selectedConversationId === conversation.id;

              return (
                <div
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={otherProfile?.avatar_url} />
                      <AvatarFallback>
                        {otherProfile?.presentation_name?.charAt(0) || 
                         otherProfile?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">
                          {otherProfile?.presentation_name || otherProfile?.full_name || 'Usuário'}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.last_message_at)}
                        </span>
                      </div>
                      
                      {lastMessage && (
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {lastMessage.sender_id === currentUserId ? 'Você: ' : ''}
                          {lastMessage.content}
                        </p>
                      )}
                      
                      {otherProfile?.is_provider && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          Anunciante
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma conversa</h3>
            <p className="text-center text-sm">
              {searchTerm 
                ? 'Nenhuma conversa encontrada com esse termo.' 
                : 'Suas conversas aparecerão aqui quando você começar a trocar mensagens.'}
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
