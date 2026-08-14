import React, { useState } from 'react';
import { Patient } from '../types';

interface PatientRecordsViewProps {
  patients: Patient[];
  onSelectPatientForDoctor: (patient: Patient) => void;
  onOpenHistoryModal: (patient: Patient) => void;
  onRegisterNewPatient: () => void;
}

export const PatientRecordsView: React.FC<PatientRecordsViewProps> = ({
  patients,
  onSelectPatientForDoctor,
  onOpenHistoryModal,
  onRegisterNewPatient,
}) => {
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState<'ALL' | 'Male' | 'Female'>('ALL');
  const [filterBloodGroup, setFilterBloodGroup] = useState<string>('ALL');

  const filtered = patients.filter((p) => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.medicalInfo.existingConditions.toLowerCase().includes(search.toLowerCase());

    const matchesGender = filterGender === 'ALL' || p.gender === filterGender;
    const matchesBlood = filterBloodGroup === 'ALL' || p.bloodGroup === filterBloodGroup;

    return matchesSearch && matchesGender && matchesBlood;
  });

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/[0.08] pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">Master Patient Index</span>
          <h1 className="text-[28px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight">
            Patient Records &amp; Directory
          </h1>
          <p className="text-[14px] text-black/60 font-sans">
            Comprehensive electronic medical records (EMR) index and clinical encounters.
          </p>
        </div>
        <button
          onClick={onRegisterNewPatient}
          className="bg-[#1A1A1A] text-white font-medium text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-lg shadow-sm hover:bg-black active:scale-[0.98] transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">person_add</span>
          Register New Patient
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, patient ID, phone, condition..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-black/15 text-[13px] text-[#1A1A1A] outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value as any)}
            className="border border-black/15 rounded-lg px-3 py-2 text-[12px] text-black/70 outline-none focus:border-black bg-white"
          >
            <option value="ALL">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            value={filterBloodGroup}
            onChange={(e) => setFilterBloodGroup(e.target.value)}
            className="border border-black/15 rounded-lg px-3 py-2 text-[12px] text-black/70 outline-none focus:border-black bg-white"
          >
            <option value="ALL">All Blood Groups</option>
            <option value="O+">O+</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      {/* Patient Records Table */}
      <div className="bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#FAF9F5] border-b border-black/[0.08] text-[11px] font-semibold text-black/60 uppercase tracking-wider">
                <th className="py-3 px-4">Patient Profile</th>
                <th className="py-3 px-4">Demographics</th>
                <th className="py-3 px-4">Blood Group</th>
                <th className="py-3 px-4">Emergency Contact</th>
                <th className="py-3 px-4">Allergies / Flags</th>
                <th className="py-3 px-4 text-right">Clinical Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {filtered.map((patient) => (
                <tr key={patient.id} className="hover:bg-black/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          patient.photoUrl ||
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuB7RbV9hzSprI28FQsvyFIMSRBIQgXJLGi3ExCFetlHTjGY31kiqmqKsMOpFDZBVZjqvjwWP6MVXDcSyqG69RYQn9-1O85LpD4L3Agn7QPa2CCMW9CoMwgA-LeHuk_MqV1xuUI09hdaAtH5ldwy46O-yEevkHO1oae4LjoEBDugrtng1ze0qh4RvxhqeiWa_AnEPsWiwU9E28Kkf88MzEdETQx9oGGxDmOcCQ1NGCqIn8tggaLIbsQ'
                        }
                        alt={patient.fullName}
                        className="w-10 h-10 rounded-full object-cover border border-black/10"
                      />
                      <div>
                        <p className="font-serif font-semibold text-[14px] text-[#1A1A1A]">{patient.fullName}</p>
                        <p className="text-[11px] text-black/50 font-mono">ID: {patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[13px] text-black/70">
                    <span className="font-medium text-[#1A1A1A]">{patient.age} yrs</span> •{' '}
                    {patient.gender}
                    <div className="text-[11px] text-black/50">{patient.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-black/5 text-[#1A1A1A] font-semibold text-[11px] px-2 py-0.5 rounded border border-black/10">
                      {patient.bloodGroup}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[12px] text-black/70">
                    <div className="font-medium text-[#1A1A1A]">{patient.emergencyContact.name}</div>
                    <div className="text-black/50 text-[11px]">
                      {patient.emergencyContact.relationship} • {patient.emergencyContact.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {patient.medicalInfo.knownAllergies.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {patient.medicalInfo.knownAllergies.map((allergy, i) => (
                          <span
                            key={i}
                            className="bg-black/5 text-[#1A1A1A] text-[10px] font-semibold px-1.5 py-0.5 rounded border border-black/15"
                          >
                            ⚠️ {allergy}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[12px] text-black/40">No known allergies</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onOpenHistoryModal(patient)}
                        className="text-[11px] font-medium uppercase tracking-wider text-black/70 bg-[#FAF9F5] border border-black/15 px-2.5 py-1 rounded hover:bg-black/5"
                      >
                        History
                      </button>
                      <button
                        onClick={() => onSelectPatientForDoctor(patient)}
                        className="text-[11px] font-medium uppercase tracking-wider text-white bg-[#1A1A1A] px-3 py-1 rounded hover:bg-black shadow-2xs"
                      >
                        Consult
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
