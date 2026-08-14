import React, { useState } from 'react';
import { Department, Doctor } from '../types';

interface DepartmentsViewProps {
  departments: Department[];
  doctors: Doctor[];
  onSelectDoctor: (doc: Doctor) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DepartmentsView: React.FC<DepartmentsViewProps> = ({
  departments,
  doctors,
  onSelectDoctor,
  onShowToast,
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState(departments[0]?.id || 'dept-1');

  const currentDept = departments.find((d) => d.id === selectedDeptId) || departments[0];
  const deptDoctors = doctors.filter((d) => d.department.toLowerCase() === currentDept.name.toLowerCase());

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-10">
      <div className="border-b border-black/[0.08] pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">Clinical Infrastructure</span>
        <h1 className="text-[28px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight">
          Clinical Departments &amp; Medical Staff
        </h1>
        <p className="text-[14px] text-black/60 font-sans">
          Hospital division roster, head physicians, ward allocation, and physician registry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Department List Grid (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          {departments.map((dept) => {
            const isSelected = dept.id === selectedDeptId;
            return (
              <div
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-white border-black shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                    : 'bg-white/80 border-black/10 hover:bg-white hover:border-black/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#1A1A1A] text-white' : 'bg-black/5 text-[#1A1A1A]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{dept.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-[15px] text-[#1A1A1A]">{dept.name}</h3>
                    <p className="text-[11px] text-black/50">
                      {dept.doctorCount} Doctors • Head: {dept.headDoctor}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-black/40 text-[16px]">
                  chevron_right
                </span>
              </div>
            );
          })}
        </div>

        {/* Department Detail & Staff (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">{currentDept.icon}</span>
                </div>
                <div>
                  <h2 className="text-[20px] font-serif font-semibold text-[#1A1A1A]">{currentDept.name} Department</h2>
                  <p className="text-[12px] text-black/50 font-sans">Floor 4, East Wing • Head: {currentDept.headDoctor}</p>
                </div>
              </div>

              <span className="bg-black/5 text-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-black/10">
                Operating 24/7
              </span>
            </div>

            <p className="text-[13px] text-black/70 mt-4 leading-relaxed font-sans">
              {currentDept.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-black/10 text-center">
                <span className="text-[11px] uppercase tracking-wider text-black/50 font-medium">Active Physicians</span>
                <p className="text-[20px] font-serif font-semibold text-[#1A1A1A] mt-0.5">{currentDept.doctorCount}</p>
              </div>
              <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-black/10 text-center">
                <span className="text-[11px] uppercase tracking-wider text-black/50 font-medium">Ward Capacity</span>
                <p className="text-[20px] font-serif font-semibold text-[#1A1A1A] mt-0.5">{currentDept.bedCapacity} Beds</p>
              </div>
              <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-black/10 text-center">
                <span className="text-[11px] uppercase tracking-wider text-black/50 font-medium">Occupancy</span>
                <p className="text-[20px] font-serif font-semibold text-[#1A1A1A] mt-0.5">
                  {Math.round((currentDept.occupiedBeds / currentDept.bedCapacity) * 100)}%
                </p>
              </div>
            </div>
          </div>

          {/* Department Doctors List */}
          <div className="bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6">
            <h3 className="text-[16px] font-serif font-semibold text-[#1A1A1A] mb-4">
              Attending Physicians in {currentDept.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deptDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-black/10 rounded-xl p-4 flex gap-3.5 hover:border-black/25 transition-all bg-[#FAF9F5]"
                >
                  <img
                    src={doc.photoUrl}
                    alt={doc.name}
                    className="w-12 h-12 rounded-full object-cover border border-black/10 shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif font-semibold text-[14px] text-[#1A1A1A]">{doc.name}</h4>
                    <p className="text-[11px] text-black/50">{doc.specialty}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-medium bg-black/5 text-black/70 px-2 py-0.5 rounded border border-black/10">
                        {doc.experience}
                      </span>
                      <button
                        onClick={() => {
                          onSelectDoctor(doc);
                          onShowToast(`Selected ${doc.name} for schedule viewing.`, 'info');
                        }}
                        className="text-[10px] uppercase tracking-wider font-semibold text-black/70 hover:text-black ml-auto"
                      >
                        View Shifts
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
