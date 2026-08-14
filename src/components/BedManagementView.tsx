import React, { useState } from 'react';
import { initialWards } from '../data/initialData';
import { WardInfo, BedInfo } from '../types';

interface BedManagementViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const BedManagementView: React.FC<BedManagementViewProps> = ({ onShowToast }) => {
  const [wards, setWards] = useState<WardInfo[]>(initialWards);
  const [selectedWardId, setSelectedWardId] = useState<string>(initialWards[0].id);

  const currentWard = wards.find((w) => w.id === selectedWardId) || wards[0];

  const handleBedClick = (bed: BedInfo) => {
    if (bed.status === 'Available') {
      const patientName = prompt('Enter Patient Name to assign this bed:');
      if (patientName) {
        setWards(
          wards.map((w) => ({
            ...w,
            beds: w.beds.map((b) =>
              b.id === bed.id ? { ...b, status: 'Occupied', patientName } : b
            ),
          }))
        );
        onShowToast(`Bed ${bed.number} assigned to ${patientName}`, 'success');
      }
    } else if (bed.status === 'Occupied') {
      if (confirm(`Discharge or transfer patient ${bed.patientName} from Bed ${bed.number}?`)) {
        setWards(
          wards.map((w) => ({
            ...w,
            beds: w.beds.map((b) =>
              b.id === bed.id ? { ...b, status: 'Cleaning', patientName: undefined } : b
            ),
          }))
        );
        onShowToast(`Bed ${bed.number} marked for sanitization & cleaning.`, 'info');
      }
    } else if (bed.status === 'Cleaning') {
      setWards(
        wards.map((w) => ({
          ...w,
          beds: w.beds.map((b) =>
            b.id === bed.id ? { ...b, status: 'Available' } : b
          ),
        }))
      );
      onShowToast(`Bed ${bed.number} sanitized and marked Available.`, 'success');
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-10">
      <div className="border-b border-black/[0.08] pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">Ward &amp; Facility Logistics</span>
        <h1 className="text-[28px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight">
          Building &amp; Bed Capacity Management
        </h1>
        <p className="text-[14px] text-black/60 font-sans">
          Real-time inpatient bed occupancy, triage allocations, sanitization cycles, and ward census.
        </p>
      </div>

      {/* Ward tabs */}
      <div className="flex flex-wrap gap-2">
        {wards.map((ward) => (
          <button
            key={ward.id}
            onClick={() => setSelectedWardId(ward.id)}
            className={`px-4 py-2 rounded-lg font-medium text-[11px] uppercase tracking-wider transition-all flex items-center gap-2 ${
              selectedWardId === ward.id
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-white text-black/70 border border-black/10 hover:bg-black/5'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">apartment</span>
            {ward.name}
            <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded ml-1">
              Floor {ward.floor}
            </span>
          </button>
        ))}
      </div>

      {/* Ward Status Overview */}
      <div className="bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6">
        <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-black/[0.08]">
          <div>
            <h2 className="text-[18px] font-serif font-semibold text-[#1A1A1A]">{currentWard.name} Layout</h2>
            <p className="text-[12px] text-black/50 font-sans">
              Floor {currentWard.floor} • Total Capacity: {currentWard.totalBeds} Beds • Select any bed to assign or discharge
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium text-black/70">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black/15 border border-black/30"></span> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]"></span> Occupied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black/40"></span> Sanitization
            </span>
          </div>
        </div>

        {/* Visual Bed Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 mt-6">
          {currentWard.beds.map((bed) => {
            const isOcc = bed.status === 'Occupied';
            const isAvail = bed.status === 'Available';
            const isClean = bed.status === 'Cleaning';

            return (
              <div
                key={bed.id}
                onClick={() => handleBedClick(bed)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-32 ${
                  isOcc
                    ? 'bg-[#1A1A1A] text-white border-black shadow-sm'
                    : isAvail
                    ? 'bg-[#FAF9F5] text-[#1A1A1A] border-black/15 hover:bg-black/5'
                    : 'bg-black/5 text-black/80 border-black/20 hover:bg-black/10'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-serif font-semibold text-[14px]">{bed.number}</span>
                  <span className="material-symbols-outlined text-[18px]">
                    {isOcc ? 'bed' : isAvail ? 'check_circle' : 'cleaning_services'}
                  </span>
                </div>

                <div className="mt-auto">
                  <span className="text-[9px] font-semibold uppercase tracking-wider block opacity-70">
                    {bed.type}
                  </span>
                  {bed.patientName ? (
                    <p className="font-medium text-[12px] truncate mt-0.5">{bed.patientName}</p>
                  ) : (
                    <p className="text-[11px] opacity-60 mt-0.5">{bed.status}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
