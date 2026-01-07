'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Define the type for contact type
type ContactType = 'persona' | 'empresa';

// Define the structure of the form data
interface FormData {
  nombreApellido: string;
  email: string;
  url: string;
  dni: string;
  nombreEmpresa: string;
  cuilEmpresa: string;
  service: string;
  mensaje: string;
}

// Initial state for the form
const INITIAL_FORM_STATE: FormData = {
  nombreApellido: '',
  email: '',
  url: '',
  dni: '',
  nombreEmpresa: '',
  cuilEmpresa: '',
  service: '',
  mensaje: '',
};

// List of available services
const SERVICES = [
  'Desarrollo web',
  'Marketing digital',
  'Diseño UX/UI',
  'Consultoría',
  'Branding',
] as const;

// EmailJS configuration
const EMAIL_CONFIG = {
  serviceId: 'service_pmcdpsa',
  templateId: 'template_l4blfjn',
  userId: '2nr6R1gaSrTHzXlYs',
} as const;

export default function Formulario() {
  const t = useTranslations('formulario');
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [contactType, setContactType] = useState<ContactType>('persona');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const validateFields = useCallback(() => {
    if (!formData.nombreApellido || !formData.email || !formData.service) {
      return t('requiredFieldsError');
    }
    if (contactType === 'empresa' && (!formData.nombreEmpresa || !formData.cuilEmpresa)) {
      return t('companyFieldsError');
    }
    return null;
  }, [formData, contactType, t]);

  const sendEmail = useCallback(async (finalFormData: FormData & { contactType: ContactType }) => {
    try {
      await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        Object.fromEntries(Object.entries(finalFormData).map(([key, value]) => [key, String(value)])),
        EMAIL_CONFIG.userId
      );
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const validationError = validateFields();
      if (validationError) {
        setError(validationError);
        setIsSubmitting(false);
        return;
      }

      const { getDb, getAnalyticsInstance } = await import('@/app/[locale]/firebaseConfig');
      const { collection, addDoc } = await import('firebase/firestore');
      const { logEvent } = await import('firebase/analytics');
      
      const db = getDb();
      const analytics = getAnalyticsInstance();

      const finalFormData = {
        ...formData,
        contactType,
      };

      if (analytics) {
        logEvent(analytics, 'form_submission', {
          form_name: 'contact',
          contact_type: contactType,
        });
      }

      await Promise.all([
        addDoc(collection(db, 'formSubmissions'), finalFormData),
        sendEmail(finalFormData),
      ]);

      setSuccess(t('formSentSuccess'));
      setFormData(INITIAL_FORM_STATE);

      router.push('/gracias');
    } catch (err) {
      console.error('Form submission failed:', err);
      setError(t('formSendError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = useCallback(
    ({ label, name, type = 'text', required = false, placeholder }: {
      label: string;
      name: keyof FormData;
      type?: string;
      required?: boolean;
      placeholder?: string;
    }) => (
      <div className="form-group">
        <label htmlFor={name} className="text-white font-semibold">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          name={name}
          className="form-input mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
          id={name}
          placeholder={placeholder || label}
          value={formData[name]}
          onChange={handleInputChange}
          required={required}
        />
      </div>
    ),
    [formData, handleInputChange]
  );

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="relative z-10 max-w-2xl w-full px-6 lg:max-w-7xl lg:px-8 p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-md">
        <form className="container space-y-6" onSubmit={handleSubmit}>
          <fieldset className="space-y-2">
            <legend className="text-white font-semibold">{t('contactType')}</legend>
            <div className="flex flex-col sm:flex-row gap-4">
              {(['persona', 'empresa'] as const).map((type) => (
                <label key={type} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="contactType"
                    className="form-radio"
                    value={type}
                    checked={contactType === type}
                    onChange={() => setContactType(type)}
                  />
                  <span className="ml-2 text-white">{t(type)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid md:grid-cols-2 gap-4">
            {renderField({ label: t('nameAndLastName'), name: 'nombreApellido', required: true })}
            {renderField({ label: t('email'), name: 'email', type: 'email', required: true })}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {renderField({ label: t('url'), name: 'url' })}
            {contactType === 'persona'
              ? renderField({ label: t('dni'), name: 'dni' })
              : (
                <>
                  {renderField({ label: t('companyName'), name: 'nombreEmpresa' })}
                  {renderField({ label: t('cuil'), name: 'cuilEmpresa' })}
                </>
              )}
          </div>

          <div className="form-group">
            <label className="text-white font-semibold">
              {t('serviceLabel')} <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              className="form-select mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900"
              value={formData.service}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>{t('servicePlaceholder')}</option>
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje" className="text-white font-semibold">
              {t('messageLabel')}
            </label>
            <textarea
              name="mensaje"
              id="mensaje"
              className="form-input mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 h-32"
              placeholder={t('messagePlaceholder')}
              value={formData.mensaje}
              onChange={handleInputChange}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {isSubmitting ? t('submitting') : t('submitButton')}
          </button>
        </form>
      </div>
    </div>
  );
}
