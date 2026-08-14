import React, { useState } from 'react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBroadcastEmergency: (type: string, location: string, message: string) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onBroadcastEmergency,
}) => {
  const [codeType, setCodeType] = useState('CODE BLUE (Cardiac Arrest)');
  const [location, setLocation] = useState('ICU - Floor 3');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBroadcastEmergency(codeType, location, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#FAF9F5] rounded-2xl max-w-lg w-full shadow-2xl border border-black/20 overflow-hidden">
        {/* Urgent Header */}
        <div className="bg-[#1A1A1A] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px]">
              emergency_home
            </span>
            <div>
              <h2 className="text-[16px] font-serif font-semibold uppercase tracking-wider">
                Emergency Rapid Response Dispatch
              </h2>
              <p className="text-[11px] text-white/70 font-sans">Hospital-wide Critical Alert Protocol</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Dispatch Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-[13px]">
          <div>
            <label className="block text-[11px] font-semibold text-black/70 uppercase tracking-wider mb-1 font-sans">
              Emergency Code Type *
            </label>
            <select
              value={codeType}
              onChange={(e) => setCodeType(e.target.value)}
              className="w-full p-2.5 border border-black/20 rounded-lg font-medium text-[#1A1A1A] bg-white outline-none focus:border-black font-sans"
            >
              <option value="CODE BLUE (Cardiac / Respiratory Arrest)">
                CODE BLUE (Cardiac / Respiratory Arrest)
              </option>
              <option value="CODE RED (Fire / Hazardous Evacuation)">
                CODE RED (Fire / Hazardous Evacuation)
              </option>
              <option value="CODE TRAUMA (Mass Casualty / Level 1 Triage)">
                CODE TRAUMA (Mass Casualty / Level 1 Triage)
              </option>
              <option value="CODE STROKE (Acute Neurological Protocol)">
                CODE STROKE (Acute Neurological Protocol)
              </option>
              <option value="CODE PURPLE (Security / Violent Incident)">
                CODE PURPLE (Security / Violent Incident)
              </option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-black/70 uppercase tracking-wider mb-1 font-sans">
              Exact Location / Ward *
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 border border-black/15 rounded-lg font-medium text-[#1A1A1A] bg-white outline-none focus:border-black font-sans"
            >
              <option value="ICU - Floor 3 (Bed 02)">ICU - Floor 3 (Bed 02)</option>
              <option value="Emergency Room - Trauma Bay 1">Emergency Room - Trauma Bay 1</option>
              <option value="General Ward A - Floor 2">General Ward A - Floor 2</option>
              <option value="Surgical Recovery Unit - Floor 4">Surgical Recovery Unit - Floor 4</option>
              <option value="Pediatric Wing - Floor 1">Pediatric Wing - Floor 1</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-black/70 uppercase tracking-wider mb-1 font-sans">
              Clinical Details / Patient Identifier
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Adult female, sudden ventricular tachycardia, CPR in progress"
              className="w-full p-2.5 border border-black/15 rounded-lg text-[13px] bg-white text-[#1A1A1A] outline-none resize-none focus:border-black font-sans"
            />
          </div>

          <div className="bg-white p-3 rounded-lg border border-black/10 text-[11px] text-black/70 font-sans">
            ⚠️ This alert will immediately page all on-duty code response physicians, intensive care specialists, and nursing supervisors.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black/15 rounded-lg text-black/70 font-medium text-[11px] uppercase tracking-wider hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1A1A1A] hover:bg-black text-white font-medium rounded-lg text-[11px] uppercase tracking-wider flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">broadcast_on_home</span>
              Broadcast Emergency Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
