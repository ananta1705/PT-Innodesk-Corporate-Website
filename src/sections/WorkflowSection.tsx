import React, { useState } from 'react';
import {
  Cpu,
  Radio,
  Server,
  LayoutDashboard,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { WORKFLOW_CONTENT } from '../data/siteContent';
import { WorkflowStageItem } from '../types';

export const WorkflowSection: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>(
    WORKFLOW_CONTENT.stages[0].id
  );

  const activeStage =
    WORKFLOW_CONTENT.stages.find((s) => s.id === selectedStageId) ||
    WORKFLOW_CONTENT.stages[0];

  const renderStageIcon = (icon: WorkflowStageItem['icon'], isSelected: boolean) => {
    const colorClass = isSelected ? 'text-white' : 'text-[#1769F5]';
    switch (icon) {
      case 'device':
        return <Cpu className={`w-6 h-6 ${colorClass}`} strokeWidth={1.8} aria-hidden="true" />;
      case 'gateway':
        return <Radio className={`w-6 h-6 ${colorClass}`} strokeWidth={1.8} aria-hidden="true" />;
      case 'processing':
        return <Server className={`w-6 h-6 ${colorClass}`} strokeWidth={1.8} aria-hidden="true" />;
      case 'dashboard':
        return (
          <LayoutDashboard
            className={`w-6 h-6 ${colorClass}`}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        );
    }
  };

  return (
    <section
      id="cara-kerja"
      className="py-16 lg:py-22 bg-[#F7F9FC] relative border-b border-[#E5EAF2]"
    >
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#1769F5] text-xs font-bold uppercase tracking-[0.15em] mb-2">
            <span>{WORKFLOW_CONTENT.eyebrow}</span>
            <span className="w-6 h-[1.5px] bg-[#1769F5]/45" aria-hidden="true" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold text-[#111827] tracking-tight leading-tight">
            {WORKFLOW_CONTENT.headingPrefix}
            <span className="text-[#1769F5]">{WORKFLOW_CONTENT.headingHighlight}</span>
          </h2>
          <p className="text-sm sm:text-[15px] text-[#5F6B7A] leading-relaxed mt-3">
            {WORKFLOW_CONTENT.intro}
          </p>
        </div>

        {/* 4-Stage Diagram (Horizontal on Desktop, Vertical Flow on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 relative">
          {WORKFLOW_CONTENT.stages.map((stage, idx) => {
            const isSelected = stage.id === activeStage.id;
            const isLast = idx === WORKFLOW_CONTENT.stages.length - 1;

            return (
              <div key={stage.id} className="relative flex flex-col">
                <button
                  type="button"
                  onClick={() => setSelectedStageId(stage.id)}
                  aria-pressed={isSelected}
                  className={`w-full flex-1 text-left rounded-2xl p-6 transition-all duration-200 border cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#081A42] text-white border-[#1769F5] shadow-[0_12px_28px_rgba(6,17,47,0.16)]'
                      : 'bg-white text-[#111827] border-[#E5EAF2] hover:border-[#3D8BFF] shadow-[0_4px_16px_rgba(17,24,39,0.04)]'
                  }`}
                >
                  <div>
                    {/* Top Row: Step Number & Layer Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${
                          isSelected
                            ? 'bg-[#1769F5] text-white'
                            : 'bg-[#EAF2FF] text-[#1769F5]'
                        }`}
                      >
                        Tahap {stage.stepNumber}
                      </span>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider ${
                          isSelected ? 'text-[#93C5FD]' : 'text-[#5F6B7A]'
                        }`}
                      >
                        {stage.layerBadge}
                      </span>
                    </div>

                    {/* Icon Box */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        isSelected ? 'bg-[#1769F5]' : 'bg-[#EAF2FF]'
                      }`}
                    >
                      {renderStageIcon(stage.icon, isSelected)}
                    </div>

                    {/* Stage Title & Description */}
                    <h3 className="text-base font-bold mb-2 leading-snug">{stage.title}</h3>
                    <p
                      className={`text-xs sm:text-[13px] leading-relaxed ${
                        isSelected ? 'text-slate-200' : 'text-[#5F6B7A]'
                      }`}
                    >
                      {stage.shortDescription}
                    </p>
                  </div>

                  <div
                    className={`mt-5 pt-3 border-t text-[11px] font-semibold flex items-center justify-between ${
                      isSelected
                        ? 'border-white/15 text-[#3D8BFF]'
                        : 'border-[#E5EAF2] text-[#1769F5]'
                    }`}
                  >
                    <span>{isSelected ? 'Tahap Aktif Dipilih' : 'Klik untuk Rincian'}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </button>

                {/* Desktop Horizontal Connector Arrow */}
                {!isLast && (
                  <div
                    className="hidden lg:flex items-center justify-center w-7 h-7 rounded-full bg-white border border-[#E5EAF2] text-[#1769F5] shadow-xs absolute top-1/2 -right-5 -translate-y-1/2 z-10"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Mobile Vertical Connector Arrow */}
                {!isLast && (
                  <div
                    className="lg:hidden flex items-center justify-center my-2 text-[#1769F5]"
                    aria-hidden="true"
                  >
                    <ArrowDown className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Stage Detail Panel */}
        <div className="mt-8 bg-white rounded-2xl p-6 sm:p-7 border border-[#E5EAF2] shadow-[0_4px_20px_rgba(17,24,39,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E5EAF2]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1769F5]">
                DETAIL TAHAP {activeStage.stepNumber} · {activeStage.layerBadge}
              </span>
              <h3 className="text-lg font-extrabold text-[#111827] mt-0.5">
                {activeStage.title}
              </h3>
            </div>
            <span className="text-xs text-[#5F6B7A]">
              Pilih kartu tahap di atas untuk menelusuri alur
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeStage.detailPoints.map((point, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#F7F9FC] border border-[#E5EAF2] flex items-start gap-2.5 text-xs sm:text-[13px] text-[#111827] leading-relaxed"
              >
                <CheckCircle2
                  className="w-4 h-4 text-[#1769F5] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Conceptual Workflow Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[#5F6B7A]">
          <Info className="w-4 h-4 text-[#1769F5] shrink-0" aria-hidden="true" />
          <p>{WORKFLOW_CONTENT.disclaimerNote}</p>
        </div>
      </div>
    </section>
  );
};
