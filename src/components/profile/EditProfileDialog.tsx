
import { ProfileFormDialog } from './edit/ProfileFormDialog';
import { ProfileForm } from './edit/ProfileForm';

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: any;
}

export function EditProfileDialog({ open, onOpenChange, profile }: EditProfileDialogProps) {
  return (
    <ProfileFormDialog open={open} onOpenChange={onOpenChange}>
      <ProfileForm 
        profile={profile} 
        onClose={() => onOpenChange(false)} 
      />
    </ProfileFormDialog>
  );
}
