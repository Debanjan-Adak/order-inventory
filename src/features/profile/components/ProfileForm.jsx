import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  User,
  Mail,
  Lock,
  Pencil,
  X,
  LoaderCircle,
  CircleCheck,
  CircleAlert,
  Eye,
  EyeOff
} from 'lucide-react';
import useAuthStore from '../../auth/store/authStore';
import { updateCustomer } from '../../auth/api/authApi';

const profileSchema = Yup.object({
  fullName: Yup.string().required('This field is required.'),
  email: Yup.string().email('Enter a valid email address.').required('This field is required.')
});

const passwordSchema = Yup.object({
  newPassword: Yup.string().min(4, 'Password must be at least 4 characters.').required('This field is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match.')
    .required('This field is required.')
});

const getInitials = (fullName) => {
  if (!fullName) {
    return '?';
  }

  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';

  return `${first}${last}`.toUpperCase();
};

const ProfileForm = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [detailsError, setDetailsError] = useState('');
  const [detailsSuccess, setDetailsSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleDetailsSubmit = async (values, { setSubmitting }) => {
    setDetailsError('');
    setDetailsSuccess('');

    try {
      const { data } = await updateCustomer(user.id, {
        full_name: values.fullName,
        email_address: values.email
      });

      updateUser({ full_name: data.full_name, email_address: data.email_address });
      setDetailsSuccess('Profile updated.');
      setIsEditingDetails(false);
    } catch (error) {
      setDetailsError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    setPasswordSuccess('');

    await new Promise((resolve) => setTimeout(resolve, 400));

    setPasswordSuccess('Password updated.');
    setIsChangingPassword(false);
    setSubmitting(false);
    resetForm();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-card)] p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-accent)]/10 text-lg font-semibold text-[var(--brand-accent)]">
            {getInitials(user.full_name)}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[18px] font-semibold text-[var(--text-primary)]">{user.full_name}</span>
            <span className="text-sm text-[var(--text-muted)]">{user.email_address}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">Account details</h2>
          {!isEditingDetails ? (
            <button
              type="button"
              onClick={() => {
                setDetailsError('');
                setDetailsSuccess('');
                setIsEditingDetails(true);
              }}
              className="flex items-center gap-1.5 rounded-md border border-[var(--border-default)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-100 hover:bg-[var(--surface-base)]"
            >
              <Pencil size={16} strokeWidth={1.75} />
              <span>Edit</span>
            </button>
          ) : null}
        </div>

        {detailsSuccess ? (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-[var(--status-delivered)]/30 bg-[var(--status-delivered)]/10 px-3 py-2 text-sm text-[var(--status-delivered)]">
            <CircleCheck size={16} strokeWidth={1.75} />
            <span>{detailsSuccess}</span>
          </div>
        ) : null}

        {!isEditingDetails ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-[var(--text-muted)]">Full name</span>
              <span className="text-sm text-[var(--text-primary)]">{user.full_name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-[var(--text-muted)]">Email</span>
              <span className="text-sm text-[var(--text-primary)]">{user.email_address}</span>
            </div>
          </div>
        ) : (
          <Formik
            initialValues={{ fullName: user.full_name, email: user.email_address }}
            validationSchema={profileSchema}
            onSubmit={handleDetailsSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4" noValidate>
                {detailsError ? (
                  <div className="flex items-center gap-2 rounded-md border border-[var(--status-cancelled)]/30 bg-[var(--status-cancelled)]/10 px-3 py-2 text-sm text-[var(--status-cancelled)]">
                    <CircleAlert size={16} strokeWidth={1.75} />
                    <span>{detailsError}</span>
                  </div>
                ) : null}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-sm font-medium text-[var(--text-secondary)]">
                    Full name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      strokeWidth={1.75}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <Field
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="w-full rounded-md border border-[var(--border-default)] bg-[var(--surface-base)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none transition-shadow duration-100 focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)]/30"
                    />
                  </div>
                  <ErrorMessage name="fullName" component="p" className="text-xs text-[var(--status-cancelled)]" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--text-secondary)]">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      strokeWidth={1.75}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="w-full rounded-md border border-[var(--border-default)] bg-[var(--surface-base)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none transition-shadow duration-100 focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)]/30"
                    />
                  </div>
                  <ErrorMessage name="email" component="p" className="text-xs text-[var(--status-cancelled)]" />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-9 items-center justify-center gap-2 rounded-md bg-[var(--brand-accent)] px-4 text-sm font-medium text-white transition-transform duration-100 hover:brightness-[0.92] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle size={16} strokeWidth={2} className="animate-spin" />
                        <span>Saving…</span>
                      </>
                    ) : (
                      <span>Save changes</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingDetails(false)}
                    className="flex h-9 items-center gap-1.5 rounded-md border border-[var(--border-default)] px-4 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-100 hover:bg-[var(--surface-base)]"
                  >
                    <X size={16} strokeWidth={1.75} />
                    <span>Cancel</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>

      <div className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-card)] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">Password</h2>
          {!isChangingPassword ? (
            <button
              type="button"
              onClick={() => {
                setPasswordSuccess('');
                setIsChangingPassword(true);
              }}
              className="flex items-center gap-1.5 rounded-md border border-[var(--border-default)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-100 hover:bg-[var(--surface-base)]"
            >
              <Pencil size={16} strokeWidth={1.75} />
              <span>Change</span>
            </button>
          ) : null}
        </div>

        {passwordSuccess ? (
          <div className="mb-4 flex items-center gap-2 rounded-md border border-[var(--status-delivered)]/30 bg-[var(--status-delivered)]/10 px-3 py-2 text-sm text-[var(--status-delivered)]">
            <CircleCheck size={16} strokeWidth={1.75} />
            <span>{passwordSuccess}</span>
          </div>
        ) : null}

        {!isChangingPassword ? (
          <p className="text-sm text-[var(--text-muted)]">••••••••</p>
        ) : (
          <Formik
            initialValues={{ newPassword: '', confirmPassword: '' }}
            validationSchema={passwordSchema}
            onSubmit={handlePasswordSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4" noValidate>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="newPassword" className="text-sm font-medium text-[var(--text-secondary)]">
                    New password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      strokeWidth={1.75}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <Field
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      className="w-full rounded-md border border-[var(--border-default)] bg-[var(--surface-base)] py-2.5 pl-9 pr-9 text-sm text-[var(--text-primary)] outline-none transition-shadow duration-100 focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-100 hover:text-[var(--text-secondary)]"
                      aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                    >
                      {showNewPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                    </button>
                  </div>
                  <ErrorMessage name="newPassword" component="p" className="text-xs text-[var(--status-cancelled)]" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-[var(--text-secondary)]">
                    Confirm new password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      strokeWidth={1.75}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      className="w-full rounded-md border border-[var(--border-default)] bg-[var(--surface-base)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none transition-shadow duration-100 focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)]/30"
                    />
                  </div>
                  <ErrorMessage name="confirmPassword" component="p" className="text-xs text-[var(--status-cancelled)]" />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-9 items-center justify-center gap-2 rounded-md bg-[var(--brand-accent)] px-4 text-sm font-medium text-white transition-transform duration-100 hover:brightness-[0.92] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle size={16} strokeWidth={2} className="animate-spin" />
                        <span>Saving…</span>
                      </>
                    ) : (
                      <span>Update password</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(false)}
                    className="flex h-9 items-center gap-1.5 rounded-md border border-[var(--border-default)] px-4 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-100 hover:bg-[var(--surface-base)]"
                  >
                    <X size={16} strokeWidth={1.75} />
                    <span>Cancel</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;