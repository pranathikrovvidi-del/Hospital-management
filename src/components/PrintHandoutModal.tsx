import React from 'react';
import { Patient, Appointment } from '../types';

interface PrintHandoutModalProps {
  patient: Patient;
  appointment: Appointment;
  onClose: () => void;
}

export const PrintHandoutModal: React.FC<PrintHandoutModalProps> = ({
  patient,
  appointment,
  onClose,
}) => {
  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // safe fallback in iframe
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#FAF9F5] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-black/10 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 bg-[#1A1A1A] text-white flex justify-between items-center shrink-0">
          <span className="font-serif font-semibold text-[15px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">print</span>
            Clinical Visit Summary &amp; Patient Handout
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Printable Document Preview */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-white space-y-6 text-[#1A1A1A]">
          {/* Hospital Header */}
          <div className="border-b-2 border-black/80 pb-4 flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center font-serif font-bold text-[18px]">
                M
              </div>
              <div>
                <h1 className="text-[20px] font-serif font-semibold text-[#1A1A1A] tracking-tight">
                  MediCare Hospital &amp; Medical Center
                </h1>
                <p className="text-[11px] text-black/50 font-sans">
                  742 Evergreen Healthcare Blvd • Phone: +1 (800) 555-CARE • Department of Neurology
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-medium uppercase tracking-wider bg-black/5 text-[#1A1A1A] px-2.5 py-1 rounded border border-black/10">
                Official Clinical Handout
              </span>
              <p className="text-[11px] text-black/50 mt-1 font-sans">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Patient and Physician Meta Grid */}
          <div className="grid grid-cols-2 gap-4 bg-[#FAF9F5] p-4 rounded-xl text-[12px] border border-black/10">
            <div>
              <p className="text-black/50 text-[10px] uppercase tracking-wider font-semibold">Patient Name</p>
              <p className="font-serif font-semibold text-[15px] text-[#1A1A1A] mt-0.5">{patient.fullName}</p>
              <p className="text-black/60 font-sans mt-0.5">
                ID: {patient.id} • {patient.age} yrs • {patient.gender} • Blood: {patient.bloodGroup}
              </p>
            </div>
            <div>
              <p className="text-black/50 text-[10px] uppercase tracking-wider font-semibold">Attending Physician</p>
              <p className="font-serif font-semibold text-[15px] text-[#1A1A1A] mt-0.5">{appointment.doctorName || 'Dr. Sarah Johnson, MD'}</p>
              <p className="text-black/60 font-sans mt-0.5">Specialty: {appointment.department || 'Neurology'}</p>
            </div>
          </div>

          {/* Recorded Vitals */}
          {appointment.vitals && (
            <div>
              <h3 className="font-serif font-semibold text-[13px] uppercase tracking-wider text-[#1A1A1A] mb-2">
                Recorded Vital Signs
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center text-[12px]">
                <div className="border border-black/10 p-2 rounded-lg bg-[#FAF9F5]">
                  <span className="text-black/50 text-[11px] block">Blood Pressure</span>
                  <span className="font-serif font-semibold text-[13px] text-[#1A1A1A]">{appointment.vitals.bp} mmHg</span>
                </div>
                <div className="border border-black/10 p-2 rounded-lg bg-[#FAF9F5]">
                  <span className="text-black/50 text-[11px] block">Heart Rate</span>
                  <span className="font-serif font-semibold text-[13px] text-[#1A1A1A]">{appointment.vitals.hr} bpm</span>
                </div>
                <div className="border border-black/10 p-2 rounded-lg bg-[#FAF9F5]">
                  <span className="text-black/50 text-[11px] block">Temperature</span>
                  <span className="font-serif font-semibold text-[13px] text-[#1A1A1A]">{appointment.vitals.temp} °F</span>
                </div>
                <div className="border border-black/10 p-2 rounded-lg bg-[#FAF9F5]">
                  <span className="text-black/50 text-[11px] block">SpO2 Level</span>
                  <span className="font-serif font-semibold text-[13px] text-[#1A1A1A]">{appointment.vitals.spO2} %</span>
                </div>
              </div>
            </div>
          )}

          {/* Primary Diagnoses */}
          <div>
            <h3 className="font-serif font-semibold text-[13px] uppercase tracking-wider text-[#1A1A1A] mb-1.5">
              Primary Diagnostic Impression
            </h3>
            <div className="p-3 bg-[#FAF9F5] border border-black/10 rounded-lg text-[13px] space-y-1">
              {appointment.diagnoses && appointment.diagnoses.length > 0 ? (
                appointment.diagnoses.map((d, i) => (
                  <p key={i} className="font-medium text-[#1A1A1A] font-sans">
                    • {d}
                  </p>
                ))
              ) : (
                <p className="font-medium text-[#1A1A1A] font-sans">• G43.909 - Migraine, unspecified</p>
              )}
            </div>
          </div>

          {/* Prescriptions & Instructions */}
          <div>
            <h3 className="font-serif font-semibold text-[13px] uppercase tracking-wider text-[#1A1A1A] mb-1.5">
              Prescription Orders &amp; Medication Schedule
            </h3>
            <table className="w-full text-left text-[12px] border border-black/10 rounded-lg overflow-hidden">
              <thead className="bg-[#FAF9F5] font-semibold text-black/70 border-b border-black/10">
                <tr>
                  <th className="p-2.5 font-serif">Medication</th>
                  <th className="p-2.5 font-serif">Dosage</th>
                  <th className="p-2.5 font-serif">Frequency</th>
                  <th className="p-2.5 font-serif">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06]">
                {appointment.prescriptions && appointment.prescriptions.length > 0 ? (
                  appointment.prescriptions.map((rx) => (
                    <tr key={rx.id}>
                      <td className="p-2.5 font-medium text-[#1A1A1A]">{rx.medication}</td>
                      <td className="p-2.5 text-black/70">{rx.dosage}</td>
                      <td className="p-2.5 text-black/70">{rx.frequency}</td>
                      <td className="p-2.5 text-black/70">{rx.duration}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-2.5 font-medium text-[#1A1A1A]">Sumatriptan</td>
                    <td className="p-2.5 text-black/70">50mg Tablet</td>
                    <td className="p-2.5 text-black/70">1 tab PRN</td>
                    <td className="p-2.5 text-black/70">As needed</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Physician Signature Line */}
          <div className="pt-8 flex justify-between items-end border-t border-black/10 text-[11px]">
            <div>
              <p className="text-black/50">Emergency After-hours Hotline: +1 (800) 555-9911</p>
              <p className="text-black/50">Please retain this document for your pharmacy and insurance records.</p>
            </div>
            <div className="text-right">
              <div className="font-serif italic text-[15px] text-[#1A1A1A] mb-1">
                Dr. Sarah Johnson, MD
              </div>
              <div className="w-44 border-b border-black/80 ml-auto"></div>
              <p className="text-[10px] uppercase tracking-wider text-black/50 mt-1 font-sans font-medium">Physician Digital Signature</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF9F5] border-t border-black/10 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-black/15 rounded-lg font-medium text-[11px] uppercase tracking-wider text-black/70 hover:bg-black/5"
          >
            Cancel
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-[#1A1A1A] text-white rounded-lg font-medium text-[11px] uppercase tracking-wider hover:bg-black flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            Print Handout
          </button>
        </div>
      </div>
    </div>
  );
};
