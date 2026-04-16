/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useCallback, useState} from 'react';

export function useContactForm() {
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContact = useCallback(
    async (type: 'speaker' | 'sponsor', formData: FormData) => {
      setIsSubmitting(true);
      setSubmitStatus(null);
      try {
        const payload = Object.fromEntries(formData.entries());
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({type, payload}),
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        setSubmitStatus(
          'Submitted successfully. We will get back to you shortly.',
        );
      } catch (_error) {
        setSubmitStatus(
          'Submission failed. Please try again in a moment.',
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  return {submitContact, submitStatus, isSubmitting, setSubmitStatus};
}
