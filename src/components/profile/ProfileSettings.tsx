
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Settings, Bell, Lock, Eye, Trash2, Download } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { IdentityVerification } from './IdentityVerification';

export function ProfileSettings() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: true,
    profileVisibility: true,
    messageNotifications: true,
    emailUpdates: false,
    dataSharing: false,
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      // Primeiro deletar dados do perfil
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Depois deletar a conta de auth
      const { error: authError } = await supabase.auth.admin.deleteUser(user?.id || '');
      if (authError) throw authError;
    },
    onSuccess: () => {
      toast({
        title: "Conta deletada",
        description: "Sua conta foi deletada permanentemente.",
      });
      signOut();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Não foi possível deletar a conta. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Configuração atualizada",
      description: "Suas preferências foram salvas.",
    });
  };

  const exportData = () => {
    // Simular export de dados
    const userData = {
      profile: user,
      settings: settings,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meus-dados.json';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Dados exportados",
      description: "Seus dados foram baixados com sucesso.",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Identity Verification Section */}
      <IdentityVerification />

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Notificações gerais</Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="messageNotifications">Notificações de mensagem</Label>
            <Switch
              id="messageNotifications"
              checked={settings.messageNotifications}
              onCheckedChange={(checked) => handleSettingChange('messageNotifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="emailUpdates">Atualizações por email</Label>
            <Switch
              id="emailUpdates"
              checked={settings.emailUpdates}
              onCheckedChange={(checked) => handleSettingChange('emailUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Privacidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="profileVisibility">Perfil público</Label>
            <Switch
              id="profileVisibility"
              checked={settings.profileVisibility}
              onCheckedChange={(checked) => handleSettingChange('profileVisibility', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="dataSharing">Compartilhar dados para melhorias</Label>
            <Switch
              id="dataSharing"
              checked={settings.dataSharing}
              onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2" />
            Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Alterar Senha
          </Button>
          <Button variant="outline" className="w-full">
            Verificação em Duas Etapas
          </Button>
          <Button variant="outline" className="w-full">
            Sessões Ativas
          </Button>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            onClick={exportData}
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Meus Dados
          </Button>
          
          <Separator />
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Deletar Conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso irá deletar permanentemente
                  sua conta e remover todos os seus dados de nossos servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteAccountMutation.mutate()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Sim, deletar conta
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
