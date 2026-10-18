import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, Info, Layers } from 'lucide-react';
import { ServiceItem, PortfolioConceptItem } from '../types';
import { SERVICES_DATA } from '../data/siteContent';

export type ModalData =
  | { type: 'service'; item: ServiceItem }
  | { type: 'all-services' }
  | { type: 'portfolio'; item: PortfolioConceptItem }
  | null;

interface DetailModalProps {
  modalData: ModalData;
  onClose: () => void;
  onSelectServiceForContact: (serviceTitle?: string) => void;
  onSelectServiceDetail?: (service: ServiceItem) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  modalData,
  onClose,
  onSelectServiceForContact,
  onSelectServiceDetail,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (modalData) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 20);
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalData) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalData, onClose]);

  if (!modalData) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#06112F]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5EAF2] relative my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 inline-flex items-center justify-center text-[#5F6B7A] hover:text-[#111827] hover:bg-[#F7F9FC] rounded-lg transition-colors cursor-pointer"
          aria-label="Tutup jendela detail"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* 1. SINGLE SERVICE DETAIL */}
        {modalData.type === 'service' && (
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#1769F5] mb-1">
              AREA LAYANAN IoT · PT INNODESK
            </span>
            <h3
              id="detail-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-[#111827] pr-8 mb-3"
            >
              {modalData.item.title}
            </h3>
            <p className="text-sm text-[#5F6B7A] leading-relaxed mb-6">
              {modalData.item.fullDescription}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3">
                Ruang Lingkup Eksplorasi & Teknis
              </h4>
              <ul className="space-y-2.5">
                {modalData.item.scopePoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#111827]">
                    <CheckCircle2
                      className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2] mb-6">
              <div className="text-xs font-bold text-[#111827] mb-2">Contoh Luaran Rancangan:</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {modalData.item.deliverables.map((del, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-[#EAF2FF] text-[#1769F5] px-3 py-1 rounded-md"
                  >
                    {del}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#5F6B7A]">
                <strong className="text-[#111827]">Relevansi Kebutuhan:</strong>{' '}
                {modalData.item.idealFor}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-[#E5EAF2]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-[#5F6B7A] hover:text-[#111827] border border-[#E5EAF2] rounded-lg min-h-[42px] cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => onSelectServiceForContact(modalData.item.title)}
                className="inline-flex items-center justify-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md min-h-[42px] cursor-pointer"
              >
                <span>Diskusikan Area Ini</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* 2. ALL SERVICES SUMMARY */}
        {modalData.type === 'all-services' && (
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#1769F5] mb-1">
              RINGKASAN LAYANAN IoT · PT INNODESK
            </span>
            <h3
              id="detail-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-[#111827] pr-8 mb-2"
            >
              Area Layanan & Integrasi Teknologi
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6B7A] leading-relaxed mb-5">
              Pilih salah satu kategori di bawah ini untuk membaca rincian cakupan konsep atau
              langsung menuju formulir diskusi kebutuhan.
            </p>

            <div className="space-y-3 mb-6">
              {SERVICES_DATA.map((svc) => (
                <div
                  key={svc.id}
                  className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2] hover:border-[#1769F5] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">{svc.title}</h4>
                    <p className="text-xs text-[#5F6B7A] mt-0.5">{svc.shortDescription}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {onSelectServiceDetail && (
                      <button
                        type="button"
                        onClick={() => onSelectServiceDetail(svc)}
                        className="text-xs font-semibold text-[#1769F5] hover:underline px-2 py-1.5 cursor-pointer"
                      >
                        Detail
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onSelectServiceForContact(svc.title)}
                      className="text-xs font-semibold bg-[#1769F5] text-white px-3.5 py-2 rounded-lg hover:bg-[#1256CE] cursor-pointer"
                    >
                      Pilih
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-[#E5EAF2]">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-[#5F6B7A] hover:text-[#111827] border border-[#E5EAF2] rounded-lg min-h-[42px] cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* 3. PORTFOLIO CONCEPT DETAIL */}
        {modalData.type === 'portfolio' && (
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1769F5] bg-[#EAF2FF] px-3 py-1 rounded-md mb-3">
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{modalData.item.conceptBadge}</span>
            </div>

            <h3
              id="detail-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-[#111827] pr-8 mb-3"
            >
              {modalData.item.title}
            </h3>

            <p className="text-sm text-[#5F6B7A] leading-relaxed mb-5">
              {modalData.item.fullExplanation}
            </p>

            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3">
                Gambaran Elemen Konsep
              </h4>
              <ul className="space-y-2">
                {modalData.item.architectureHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#111827]">
                    <CheckCircle2
                      className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {modalData.item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium bg-[#F7F9FC] border border-[#E5EAF2] text-[#5F6B7A] px-3 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#EAF2FF]/70 border border-[#1769F5]/20 flex items-start gap-2.5 mb-6">
              <Info className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs text-[#111827] leading-relaxed">{modalData.item.disclaimer}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-[#E5EAF2]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-[#5F6B7A] hover:text-[#111827] border border-[#E5EAF2] rounded-lg min-h-[42px] cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => onSelectServiceForContact()}
                className="inline-flex items-center justify-center gap-2 bg-[#1769F5] hover:bg-[#1256CE] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md min-h-[42px] cursor-pointer"
              >
                <span>Diskusikan Konsep Serupa</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
