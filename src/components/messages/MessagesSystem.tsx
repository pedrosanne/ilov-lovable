
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ConversationsList } from './ConversationsList';
import { ChatWindow } from './ChatWindow';
import { Card } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

interface MessagesSystemProps {
  startConversationWith?: string; // userId para iniciar conversa diretamente
  onClose?: () => void;
}

export function MessagesSystem({ startConversationWith, onClose }: MessagesSystemProps) {
  const { user } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Buscar conversas do usuário
  const { data: conversations } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          participant_1_profile:profiles!conversations_participant_1_fkey(*),
          participant_2_profile:profiles!conversations_participant_2_fkey(*),
          last_message:messages(content, created_at, sender_id)
        `)
        .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Mutation para criar nova conversa
  const createConversationMutation = useMutation({
    mutationFn: async (otherUserId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase.rpc('get_or_create_conversation', {
        user1_id: user.id,
        user2_id: otherUserId
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (conversationId) => {
      setSelectedConversationId(conversationId);
      queryClient.invalidateQueries({ queryKey: ['conversations', user?.id] });
    },
  });

  // Iniciar conversa automaticamente se especificado
  useEffect(() => {
    if (startConversationWith && user) {
      createConversationMutation.mutate(startConversationWith);
    }
  }, [startConversationWith, user]);

  // Configurar real-time para conversas
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('conversations-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `participant_1=eq.${user.id},participant_2=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
          if (selectedConversationId) {
            queryClient.invalidateQueries({ queryKey: ['messages', selectedConversationId] });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, selectedConversationId, queryClient]);

  if (!user) {
    return (
      <Card className="p-8 text-center">
        <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Faça login para acessar as mensagens
        </h3>
      </Card>
    );
  }

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Lista de conversas */}
      <div className={`${selectedConversationId ? 'hidden md:block' : 'block'} w-full md:w-1/3 border-r`}>
        <ConversationsList
          conversations={conversations || []}
          selectedConversationId={selectedConversationId}
          onSelectConversation={setSelectedConversationId}
          currentUserId={user.id}
        />
      </div>

      {/* Janela de chat */}
      <div className={`${selectedConversationId ? 'block' : 'hidden md:block'} flex-1`}>
        {selectedConversationId ? (
          <ChatWindow
            conversationId={selectedConversationId}
            onBack={() => setSelectedConversationId(null)}
            onClose={onClose}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p>Selecione uma conversa para começar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
