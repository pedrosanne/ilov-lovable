
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface ProfileFormData {
  full_name: string;
  presentation_name: string;
  bio: string;
  profession: string;
  location: string;
  website: string;
  instagram_handle: string;
  twitter_handle: string;
  phone: string;
}

interface ProfileFormFieldsProps {
  formData: ProfileFormData;
  onFieldChange: (field: keyof ProfileFormData, value: string) => void;
}

export function ProfileFormFields({ formData, onFieldChange }: ProfileFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="full_name">Nome Completo</Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) => onFieldChange('full_name', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="presentation_name">Nome de Apresentação</Label>
        <Input
          id="presentation_name"
          value={formData.presentation_name}
          onChange={(e) => onFieldChange('presentation_name', e.target.value)}
          placeholder="Como você quer ser chamado"
        />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => onFieldChange('bio', e.target.value)}
          placeholder="Conte um pouco sobre você..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="profession">Profissão</Label>
        <Input
          id="profession"
          value={formData.profession}
          onChange={(e) => onFieldChange('profession', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="location">Localização</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => onFieldChange('location', e.target.value)}
          placeholder="Cidade, Estado"
        />
      </div>

      <div>
        <Label htmlFor="phone">Telefone/WhatsApp</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => onFieldChange('phone', e.target.value)}
          placeholder="(11) 99999-9999"
        />
      </div>

      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={formData.website}
          onChange={(e) => onFieldChange('website', e.target.value)}
          placeholder="https://seusite.com"
        />
      </div>

      <div>
        <Label htmlFor="instagram_handle">Instagram</Label>
        <Input
          id="instagram_handle"
          value={formData.instagram_handle}
          onChange={(e) => onFieldChange('instagram_handle', e.target.value)}
          placeholder="seuusuario"
        />
      </div>

      <div>
        <Label htmlFor="twitter_handle">Twitter</Label>
        <Input
          id="twitter_handle"
          value={formData.twitter_handle}
          onChange={(e) => onFieldChange('twitter_handle', e.target.value)}
          placeholder="seuusuario"
        />
      </div>
    </div>
  );
}
