'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '../app/firebaseConfig';
import emailjs from '@emailjs/browser';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Define the type for contact type: either 'persona' or 'empresa'
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
  const t = useTranslations('formulario'); // Translation function
  const router = useRouter(); // Next.js router for navigation
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [contactType, setContactType] = useState<ContactType>('persona'); // Track selected contact type
  const [error, setError] = useState<string | null>(null); // Error message state
  const [success, setSuccess] = useState<string | null>(null); // Success message state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission loading state

  // Handle changes to input fields
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Validate form fields
  const validateFields = useCallback(() => {
    if (!formData.nombreApellido || !formData.email || !formData.service) {
      return t('requiredFieldsError'); // Error for missing required fields
    }
    if (contactType === 'empresa' && (!formData.nombreEmpresa || !formData.cuilEmpresa)) {
      return t('companyFieldsError'); // Error for missing company-specific fields
    }
    return null; // No validation errors
  }, [formData, contactType, t]);

  // Send email using EmailJS
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setError(null);
    setSuccess(null);
    setIsSubmitting(true); // Show loading state

    try {
      const validationError = validateFields(); // Validate the form
      if (validationError) {
        setError(validationError);
        return;
      }

      const finalFormData = {
        ...formData,
        contactType,
      };

      // Submit data to Firestore and send email in parallel
      await Promise.all([
        addDoc(collection(db, 'formSubmissions'), finalFormData),
        sendEmail(finalFormData),
      ]);

      setSuccess(t('formSentSuccess')); // Show success message
      setFormData(INITIAL_FORM_STATE); // Reset form

      // Redirect to gracias page
      router.push('/gracias');
    } catch (err) {
      console.error('Form submission failed:', err);
      setError(t('formSendError')); // Show error message
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  // Render input fields dynamically
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
          {/* Contact Type Selection */}
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

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            {renderField({ label: t('nameAndLastName'), name: 'nombreApellido', required: true })}
            {renderField({ label: t('email'), name: 'email', type: 'email', required: true })}
          </div>

          {/* Contact Specific Fields */}
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

          {/* Service Selection */}
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

          {/* Message */}
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

          {/* Status Messages */}
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

          {/* Submit Button */}
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