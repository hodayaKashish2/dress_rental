'use client';

import { useCallback, useState } from 'react';
import CatalogEmailModal from '@/components/CatalogEmailModal';

const actionBtnClass =
  'inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-[#3a2430] shadow-sm transition-colors hover:bg-[#fff8fa]';

type CatalogAccessActionsProps = {
  onError?: (message: string) => void;
};

export default function CatalogAccessActions({ onError }: CatalogAccessActionsProps) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const closeEmailModal = useCallback(() => setEmailModalOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setEmailModalOpen(true)}
        className={actionBtnClass}
        title="קבלת הקטלוג במייל"
      >
        <span aria-hidden>✉</span>
        שליחת הקטלוג במייל
      </button>

      <CatalogEmailModal open={emailModalOpen} onClose={closeEmailModal} onError={onError} />
    </>
  );
}
