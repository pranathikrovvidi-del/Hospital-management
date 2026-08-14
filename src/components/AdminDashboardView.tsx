import React from 'react';

interface AdminDashboardViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onShowToast }) => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-10">
      <div className="flex justify-between items-start flex-wrap gap-4 border-b border-black/[0.08] pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">Executive Governance</span>
          <h1 className="text-[28px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight">
            Hospital Operations &amp; Administration
          </h1>
          <p className="text-[14px] text-black/60 font-sans">
            Executive operational overview, clinical productivity, revenue cycles, and regulatory audit logs.
          </p>
        </div>
        <button
          onClick={() => onShowToast('Exported Executive Hospital Report (PDF/Excel)', 'success')}
          className="bg-[#1A1A1A] text-white font-medium text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-lg hover:bg-black flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">download</span> Export Executive Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Monthly Admissions</span>
          <p className="text-[30px] font-serif font-semibold text-[#1A1A1A] mt-1 tabular-nums">1,248</p>
          <span className="text-[10px] font-medium text-black/70 bg-black/5 px-2 py-0.5 rounded border border-black/10 inline-block mt-2">
            ↑ 8.4% vs last month
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Bed Occupancy Rate</span>
          <p className="text-[30px] font-serif font-semibold text-[#1A1A1A] mt-1 tabular-nums">82.4%</p>
          <span className="text-[10px] font-medium text-black/70 bg-black/5 px-2 py-0.5 rounded border border-black/10 inline-block mt-2">
            Optimal Operating Zone
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Avg ER Triage Time</span>
          <p className="text-[30px] font-serif font-semibold text-[#1A1A1A] mt-1 tabular-nums">14.2 min</p>
          <span className="text-[10px] font-medium text-black/70 bg-black/5 px-2 py-0.5 rounded border border-black/10 inline-block mt-2">
            ↓ 3.1 min improvement
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Claims Adjudicated</span>
          <p className="text-[30px] font-serif font-semibold text-[#1A1A1A] mt-1 tabular-nums">96.8%</p>
          <span className="text-[10px] font-medium text-black/70 bg-black/5 px-2 py-0.5 rounded border border-black/10 inline-block mt-2">
            Auto-approved
          </span>
        </div>
      </div>

      {/* Audit Log and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5">
          <h3 className="text-[16px] font-serif font-semibold text-[#1A1A1A] mb-4">
            Recent System Security &amp; Clinical Audit Logs
          </h3>
          <div className="divide-y divide-black/[0.06] text-[13px]">
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-serif font-semibold text-[#1A1A1A]">Prescription Dispatched (Sumatriptan 50mg)</span>
                <p className="text-black/50 text-[11px]">By Dr. Sarah Johnson • Eleanor Pena (PT-2023-8942)</p>
              </div>
              <span className="text-black/40 text-[11px]">2 mins ago</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-serif font-semibold text-[#1A1A1A]">Bed Assignment (ICU Bed 03)</span>
                <p className="text-black/50 text-[11px]">Nurse Station B • Patient Admitted from ER</p>
              </div>
              <span className="text-black/40 text-[11px]">18 mins ago</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-serif font-semibold text-[#1A1A1A]">Automated Lab Sync (CBC Panel)</span>
                <p className="text-black/50 text-[11px]">Roche Cobas 8000 Analyzer • Verified by Lab Director</p>
              </div>
              <span className="text-black/40 text-[11px]">42 mins ago</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-serif font-semibold text-[#1A1A1A]">HIPAA Access Log Verified</span>
                <p className="text-black/50 text-[11px]">Super Admin • Compliance token validated</p>
              </div>
              <span className="text-black/40 text-[11px]">1 hour ago</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-[16px] font-serif font-semibold text-[#1A1A1A] mb-3">System Health</h3>
            <div className="space-y-2.5 text-[12px]">
              <div className="flex justify-between items-center p-2.5 bg-[#FAF9F5] border border-black/10 rounded-lg">
                <span className="font-medium text-black/80">EHR Core Engine</span>
                <span className="text-[#1A1A1A] font-semibold text-[10px] bg-black/5 border border-black/10 px-2 py-0.5 rounded">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-[#FAF9F5] border border-black/10 rounded-lg">
                <span className="font-medium text-black/80">DICOM PACS Server</span>
                <span className="text-[#1A1A1A] font-semibold text-[10px] bg-black/5 border border-black/10 px-2 py-0.5 rounded">
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-[#FAF9F5] border border-black/10 rounded-lg">
                <span className="font-medium text-black/80">Pharmacy Dispenser API</span>
                <span className="text-[#1A1A1A] font-semibold text-[10px] bg-black/5 border border-black/10 px-2 py-0.5 rounded">
                  Synced
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onShowToast('System diagnostic checks completed: 0 errors detected.', 'info')}
            className="w-full mt-4 py-2 border border-black/20 text-[#1A1A1A] font-medium text-[11px] uppercase tracking-wider rounded-lg hover:bg-black/5"
          >
            Run System Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
