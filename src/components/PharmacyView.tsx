import React, { useState } from 'react';
import { initialMedications } from '../data/initialData';
import { MedicationItem } from '../types';

interface PharmacyViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const PharmacyView: React.FC<PharmacyViewProps> = ({ onShowToast }) => {
  const [meds, setMeds] = useState<MedicationItem[]>(initialMedications);
  const [search, setSearch] = useState('');
  const [dispenseTarget, setDispenseTarget] = useState<string | null>(null);

  const filteredMeds = meds.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDispense = (id: string, name: string) => {
    setMeds(
      meds.map((m) => {
        if (m.id === id && m.stock > 0) {
          return { ...m, stock: m.stock - 1 };
        }
        return m;
      })
    );
    onShowToast(`Dispensed 1 unit of ${name} to Inpatient Ward.`, 'success');
  };

  const handleRestock = (id: string, name: string) => {
    setMeds(
      meds.map((m) => {
        if (m.id === id) {
          return { ...m, stock: m.stock + 50, status: 'In Stock' as const };
        }
        return m;
      })
    );
    onShowToast(`Restocked 50 units of ${name}. Inventory replenished.`, 'success');
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-10">
      <div className="flex justify-between items-start flex-wrap gap-4 border-b border-black/[0.08] pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">Hospital Formulary</span>
          <h1 className="text-[28px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight">
            Central Pharmacy &amp; Dispensary
          </h1>
          <p className="text-[14px] text-black/60 font-sans">
            Live formulary inventory, automated reorder thresholds, and inpatient dispensary tracking.
          </p>
        </div>
        <button
          onClick={() => onShowToast('Automated supplier requisition cycle initialized.', 'info')}
          className="bg-[#1A1A1A] text-white font-medium text-[11px] uppercase tracking-wider py-2 px-4 rounded-lg hover:bg-black flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">autorenew</span> Auto-Requisition
        </button>
      </div>

      {/* Search and stats bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Total Formularies</span>
          <p className="text-[24px] font-serif font-semibold text-[#1A1A1A] mt-1">{meds.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Low Stock Items</span>
          <p className="text-[24px] font-serif font-semibold text-[#1A1A1A] mt-1">
            {meds.filter((m) => m.stock < m.minThreshold).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Pending e-Prescriptions</span>
          <p className="text-[24px] font-serif font-semibold text-[#1A1A1A] mt-1">3</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Daily Dispenses</span>
          <p className="text-[24px] font-serif font-semibold text-[#1A1A1A] mt-1">142</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medications by brand name, active molecule, category..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-black/15 text-[13px] text-[#1A1A1A] outline-none focus:border-black"
          />
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-[#FAF9F5] border-b border-black/[0.08] text-[11px] font-semibold text-black/60 uppercase tracking-wider">
                <th className="py-3 px-4">Medication Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Dosage / Unit</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {filteredMeds.map((med) => {
                const isLow = med.stock <= med.minThreshold;
                return (
                  <tr key={med.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-serif font-semibold text-[14px] text-[#1A1A1A]">{med.name}</td>
                    <td className="py-3.5 px-4 text-[13px] text-black/70">{med.category}</td>
                    <td className="py-3.5 px-4 text-[12px] text-black/50">{med.unit}</td>
                    <td className="py-3.5 px-4 font-medium text-[13px] text-[#1A1A1A] tabular-nums">
                      {med.stock} units
                    </td>
                    <td className="py-3.5 px-4">
                      {isLow ? (
                        <span className="bg-black/5 text-[#1A1A1A] text-[10px] font-semibold px-2 py-0.5 rounded border border-black/20">
                          Low Stock ({med.stock})
                        </span>
                      ) : (
                        <span className="bg-black/5 text-[#1A1A1A] text-[10px] font-medium px-2 py-0.5 rounded border border-black/10">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDispense(med.id, med.name)}
                          disabled={med.stock <= 0}
                          className="text-[11px] font-medium uppercase tracking-wider text-black/70 bg-[#FAF9F5] border border-black/15 px-2.5 py-1 rounded hover:bg-black/5 disabled:opacity-40"
                        >
                          Dispense
                        </button>
                        <button
                          onClick={() => handleRestock(med.id, med.name)}
                          className="text-[11px] font-medium uppercase tracking-wider text-white bg-[#1A1A1A] px-2.5 py-1 rounded hover:bg-black"
                        >
                          Restock (+50)
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
