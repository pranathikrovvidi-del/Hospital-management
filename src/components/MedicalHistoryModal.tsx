import React from 'react';
import { Patient } from '../types';

interface MedicalHistoryModalProps {
  patient: Patient;
  onClose: () => void;
}

export const MedicalHistoryModal: React.FC<MedicalHistoryModalProps> = ({ patient, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#FAF9F5] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-black/10 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 bg-[#1A1A1A] text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={
                patient.photoUrl ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuB7RbV9hzSprI28FQsvyFIMSRBIQgXJLGi3ExCFetlHTjGY31kiqmqKsMOpFDZBVZjqvjwWP6MVXDcSyqG69RYQn9-1O85LpD4L3Agn7QPa2CCMW9CoMwgA-LeHuk_MqV1xuUI09hdaAtH5ldwy46O-yEevkHO1oae4LjoEBDugrtng1ze0qh4RvxhqeiWa_AnEPsWiwU9E28Kkf88MzEdETQx9oGGxDmOcCQ1NGCqIn8tggaLIbsQ'
              }
              alt={patient.fullName}
              className="w-11 h-11 rounded-full object-cover border border-white/20"
            />
            <div>
              <h2 className="text-[17px] font-serif font-semibold">{patient.fullName} — Medical Record</h2>
              <p className="text-[11px] text-white/70 font-sans">
                ID: {patient.id} • {patient.age} yrs, {patient.gender} • Blood: {patient.bloodGroup}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar text-[13px]">
          {/* Critical Flags / Allergies */}
          {patient.medicalInfo.knownAllergies.length > 0 && (
            <div className="p-3.5 bg-white border border-black/15 rounded-xl flex items-center gap-3 shadow-2xs">
              <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">warning</span>
              <div>
                <h4 className="font-semibold text-[#1A1A1A] text-[11px] uppercase tracking-wider">
                  Critical Drug / Environmental Allergies
                </h4>
                <p className="text-black/70 font-medium text-[12px]">
                  {patient.medicalInfo.knownAllergies.join(', ')} — Exercise strict prescription caution.
                </p>
              </div>
            </div>
          )}

          {/* Section 1: Chronic & Existing Conditions */}
          <div className="border border-black/10 rounded-xl p-4 bg-white shadow-2xs">
            <h4 className="font-serif font-semibold text-[#1A1A1A] text-[13px] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-black/60">medical_services</span>
              Existing Chronic Conditions
            </h4>
            <p className="text-black/80 leading-relaxed font-sans text-[13px]">
              {patient.medicalInfo.existingConditions || 'No chronic conditions reported.'}
            </p>
          </div>

          {/* Section 2: Active Medications */}
          <div className="border border-black/10 rounded-xl p-4 bg-white shadow-2xs">
            <h4 className="font-serif font-semibold text-[#1A1A1A] text-[13px] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-black/60">medication</span>
              Current Prescribed Medications
            </h4>
            <p className="text-black/80 leading-relaxed font-sans text-[13px]">
              {patient.medicalInfo.currentMedications || 'No current medications reported.'}
            </p>
          </div>

          {/* Section 3: Past Surgeries & Medical History */}
          <div className="border border-black/10 rounded-xl p-4 bg-white shadow-2xs">
            <h4 className="font-serif font-semibold text-[#1A1A1A] text-[13px] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-black/60">history</span>
              Past Medical &amp; Surgical History
            </h4>
            <p className="text-black/80 leading-relaxed font-sans text-[13px]">
              {patient.medicalInfo.pastMedicalHistory || 'No past surgical records on file.'}
            </p>
          </div>

          {/* Section 4: Emergency & Insurance Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-black/10 rounded-xl p-4 bg-white shadow-2xs">
              <h5 className="font-semibold text-[10px] uppercase tracking-wider text-black/50 mb-1">
                Emergency Contact
              </h5>
              <p className="font-serif font-semibold text-[#1A1A1A] text-[14px]">{patient.emergencyContact.name}</p>
              <p className="text-[12px] text-black/60 font-sans">
                {patient.emergencyContact.relationship} • {patient.emergencyContact.phone}
              </p>
            </div>
            <div className="border border-black/10 rounded-xl p-4 bg-white shadow-2xs">
              <h5 className="font-semibold text-[10px] uppercase tracking-wider text-black/50 mb-1">
                Insurance Coverage
              </h5>
              <p className="font-serif font-semibold text-[#1A1A1A] text-[14px]">{patient.medicalInfo.insuranceDetails}</p>
              <p className="text-[12px] text-black/60 font-sans">Status: Verified Active</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF9F5] border-t border-black/10 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1A1A] text-white rounded-lg font-medium text-[11px] uppercase tracking-wider hover:bg-black transition-colors"
          >
            Close Medical Record
          </button>
        </div>
      </div>
    </div>
  );
};
