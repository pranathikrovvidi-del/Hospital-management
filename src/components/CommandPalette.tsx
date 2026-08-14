import React, { useState, useEffect, useRef } from 'react';
import { Patient, Doctor, Appointment, Department, ActiveView } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  departments: Department[];
  onSelectPatient: (patient: Patient) => void;
  onNavigate: (view: ActiveView) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  patients,
  doctors,
  appointments,
  departments,
  onSelectPatient,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent toggles
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPatients = patients.filter(
    (p) =>
      p.fullName.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase()) ||
      p.phone.includes(query)
  );

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.department.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDepts = departments.filter((dept) =>
    dept.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 flex items-start justify-center pt-20 p-4 animate-in fade-in">
      <div
        className="bg-[#FAF9F5] rounded-2xl max-w-xl w-full shadow-2xl border border-black/15 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-black/10 flex items-center gap-3 bg-white">
          <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patient name, ID, physician, or department..."
            className="w-full text-[14px] bg-transparent outline-none text-[#1A1A1A] placeholder:text-black/40 font-sans"
          />
          <kbd className="text-[10px] bg-black/5 border border-black/10 px-1.5 py-0.5 rounded text-black/50 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto custom-scrollbar divide-y divide-black/[0.06] text-[13px]">
          {/* Quick Actions if query is empty */}
          {!query && (
            <div className="py-2">
              <span className="text-[10px] font-semibold text-black/50 uppercase tracking-wider px-3 mb-1.5 block">
                Quick Navigation
              </span>
              <div
                onClick={() => {
                  onNavigate('doctor-dashboard');
                  onClose();
                }}
                className="p-2.5 hover:bg-black/5 rounded-lg cursor-pointer flex items-center gap-3 text-[#1A1A1A] transition-colors"
              >
                <span className="material-symbols-outlined text-[#1A1A1A] text-[18px]">stethoscope</span>
                <span className="font-serif font-semibold text-[14px]">Open Live Doctor Dashboard</span>
              </div>
              <div
                onClick={() => {
                  onNavigate('patient-registration');
                  onClose();
                }}
                className="p-2.5 hover:bg-black/5 rounded-lg cursor-pointer flex items-center gap-3 text-[#1A1A1A] transition-colors"
              >
                <span className="material-symbols-outlined text-[#1A1A1A] text-[18px]">person_add</span>
                <span className="font-serif font-semibold text-[14px]">Register New Patient</span>
              </div>
              <div
                onClick={() => {
                  onNavigate('appointment-booking');
                  onClose();
                }}
                className="p-2.5 hover:bg-black/5 rounded-lg cursor-pointer flex items-center gap-3 text-[#1A1A1A] transition-colors"
              >
                <span className="material-symbols-outlined text-[#1A1A1A] text-[18px]">calendar_today</span>
                <span className="font-serif font-semibold text-[14px]">Schedule Consultation</span>
              </div>
            </div>
          )}

          {/* Patients */}
          {filteredPatients.length > 0 && (
            <div className="py-2">
              <span className="text-[10px] font-semibold text-black/50 uppercase tracking-wider px-3 mb-1 block">
                Patients ({filteredPatients.length})
              </span>
              {filteredPatients.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectPatient(p);
                    onNavigate('doctor-dashboard');
                    onClose();
                  }}
                  className="p-2.5 hover:bg-black/5 rounded-lg cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-black/5 text-[#1A1A1A] font-serif font-semibold text-[12px] flex items-center justify-center border border-black/10">
                      {p.firstName[0]}
                      {p.lastName[0]}
                    </span>
                    <div>
                      <p className="font-serif font-semibold text-[14px] text-[#1A1A1A]">{p.fullName}</p>
                      <p className="text-[11px] text-black/50 font-sans">
                        ID: {p.id} • {p.gender}, {p.age} yrs • Blood: {p.bloodGroup}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-black/70 font-semibold">Consult →</span>
                </div>
              ))}
            </div>
          )}

          {/* Doctors */}
          {filteredDoctors.length > 0 && (
            <div className="py-2">
              <span className="text-[10px] font-semibold text-black/50 uppercase tracking-wider px-3 mb-1 block">
                Doctors &amp; Specialists
              </span>
              {filteredDoctors.map((d) => (
                <div
                  key={d.id}
                  onClick={() => {
                    onNavigate('departments');
                    onClose();
                  }}
                  className="p-2.5 hover:bg-black/5 rounded-lg cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <p className="font-serif font-semibold text-[14px] text-[#1A1A1A]">{d.name}</p>
                    <p className="text-[11px] text-black/50 font-sans">
                      {d.department} • {d.specialty}
                    </p>
                  </div>
                  <span className="text-[10px] bg-black/5 text-black/80 px-2 py-0.5 rounded font-medium border border-black/10">
                    {d.availability}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Departments */}
          {filteredDepts.length > 0 && (
            <div className="py-2">
              <span className="text-[10px] font-semibold text-black/50 uppercase tracking-wider px-3 mb-1 block">
                Departments
              </span>
              {filteredDepts.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => {
                    onNavigate('departments');
                    onClose();
                  }}
                  className="p-2.5 hover:bg-black/5 rounded-lg cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1A1A1A] text-[18px]">
                      {dept.icon}
                    </span>
                    <span className="font-serif font-semibold text-[14px] text-[#1A1A1A]">{dept.name}</span>
                  </div>
                  <span className="text-[11px] text-black/50 font-sans">
                    {dept.doctorCount} Doctors • {dept.bedCapacity} Beds
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
