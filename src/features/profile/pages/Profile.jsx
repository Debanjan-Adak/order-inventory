import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-[24px] font-semibold text-[var(--text-primary)]">Profile</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          View and edit your account details.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
};

export default Profile;