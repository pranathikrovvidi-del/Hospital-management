import React from 'react';
import { ActiveView, Appointment, Department, Announcement } from '../types';

interface HomeDashboardProps {
  onNavigate: (view: ActiveView) => void;
  appointments: Appointment[];
  departments: Department[];
  announcements: Announcement[];
  onSelectAppointment: (aptId: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  appointments,
  departments,
  announcements,
  onSelectAppointment,
}) => {
  // Subset of appointments for home table matching design
  const homeAppointments = appointments.slice(0, 5);

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-12">
      {/* Page Header */}
      <header className="flex flex-col gap-1 border-b border-black/[0.08] pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">Clinical Overview</span>
        <h1 className="text-[32px] md:text-[40px] font-serif text-[#1A1A1A] tracking-tight">
          MediCare Hospital
        </h1>
        <p className="text-[14px] text-black/60 font-sans">Comprehensive clinical practice and patient operations</p>
      </header>

      {/* Hero Card (Editorial Aesthetic) */}
      <div className="bg-[#FAF9F5] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/10 flex flex-col md:flex-row relative">
        {/* Left hero content */}
        <div className="p-6 md:p-10 flex-1 flex flex-col justify-center gap-6 z-10 relative">
          <div className="flex flex-col gap-2 max-w-lg">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#2C4A3E] font-semibold">
              Excellence in Healthcare
            </span>
            <h2 className="text-[26px] md:text-[34px] font-serif text-[#1A1A1A] leading-tight">
              Patient Care & Clinical Practice
            </h2>
            <p className="text-[13px] md:text-[14px] text-black/70 leading-relaxed font-sans">
              Streamline inpatient workflow, record comprehensive physician notes, and maintain rigorous clinical excellence across all medical departments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 mt-1">
            <button
              id="hero-book-appointment-btn"
              onClick={() => onNavigate('appointment-booking')}
              className="bg-[#1A1A1A] text-[#FAF9F5] font-medium text-[12px] uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-sm hover:bg-black active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[17px]">calendar_add_on</span>
              Book Consultation
            </button>
            <button
              id="hero-register-patient-btn"
              onClick={() => onNavigate('patient-registration')}
              className="border border-black/20 text-[#1A1A1A] font-medium text-[12px] uppercase tracking-wider py-2.5 px-5 rounded-lg hover:bg-black/5 active:scale-95 transition-all flex items-center gap-2 bg-white/70 backdrop-blur-xs"
            >
              <span className="material-symbols-outlined text-[17px]">person_add</span>
              Register Patient
            </button>
          </div>
        </div>

        {/* Right hero image */}
        <div className="w-full md:w-5/12 h-64 md:h-auto relative z-10">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf-9Ki1xkrrCOTTP-sGwpg1_M2lBouF4X4y_5KSCdA_c3RM0XdONiFoejcx21ndshe15GWfSXIgHLRIk6sVKRVEMJ2X1823e7UaSdMuDAEN68I01EZmCK9FFwAGr7Cn-_Z9DJNuXuVZO4HZlnTebsVF9l8Vuwn1JRdqpZ781ocp5XjWAuim6Gu4Lrv1NYa7iHVwcir-p39ySlT6PGQzUO9rOBHb4sxkyJIK0nn59ebUp_5mcdEA1E"
            alt="Hospital Doctors and Staff"
            className="w-full h-full object-cover object-center hidden md:block"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)' }}
          />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf-9Ki1xkrrCOTTP-sGwpg1_M2lBouF4X4y_5KSCdA_c3RM0XdONiFoejcx21ndshe15GWfSXIgHLRIk6sVKRVEMJ2X1823e7UaSdMuDAEN68I01EZmCK9FFwAGr7Cn-_Z9DJNuXuVZO4HZlnTebsVF9l8Vuwn1JRdqpZ781ocp5XjWAuim6Gu4Lrv1NYa7iHVwcir-p39ySlT6PGQzUO9rOBHb4sxkyJIK0nn59ebUp_5mcdEA1E"
            alt="Hospital Doctors and Staff"
            className="w-full h-full object-cover object-center md:hidden"
          />
        </div>
      </div>

      {/* Statistics (5 Horizontal Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-4 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-2 hover:-translate-y-0.5 transition-transform group">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Total Patients</span>
            <div className="w-7 h-7 rounded-md bg-[#FAF9F5] border border-black/10 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px]">groups</span>
            </div>
          </div>
          <div className="flex items-end gap-2 mt-auto">
            <span className="text-[26px] font-serif font-bold text-[#1A1A1A] leading-none tabular-nums">256</span>
            <span className="flex items-center text-[10px] font-semibold text-[#173228] bg-[#E2ECE7] px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[13px]">trending_up</span> +12%
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-4 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-2 hover:-translate-y-0.5 transition-transform group">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Appointments Today</span>
            <div className="w-7 h-7 rounded-md bg-[#FAF9F5] border border-black/10 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px]">event</span>
            </div>
          </div>
          <div className="flex items-end gap-2 mt-auto">
            <span className="text-[26px] font-serif font-bold text-[#1A1A1A] leading-none tabular-nums">128</span>
            <span className="flex items-center text-[10px] font-semibold text-[#173228] bg-[#E2ECE7] px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[13px]">trending_up</span> +5%
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-4 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-2 hover:-translate-y-0.5 transition-transform group">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Total Doctors</span>
            <div className="w-7 h-7 rounded-md bg-[#FAF9F5] border border-black/10 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px]">stethoscope</span>
            </div>
          </div>
          <div className="flex items-end gap-2 mt-auto">
            <span className="text-[26px] font-serif font-bold text-[#1A1A1A] leading-none tabular-nums">45</span>
            <span className="flex items-center text-[10px] font-semibold text-black/60 bg-[#EBE8E0] px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[13px]">horizontal_rule</span> 0%
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl p-4 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-2 hover:-translate-y-0.5 transition-transform group">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Departments</span>
            <div className="w-7 h-7 rounded-md bg-[#FAF9F5] border border-black/10 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px]">domain</span>
            </div>
          </div>
          <div className="flex items-end gap-2 mt-auto">
            <span className="text-[26px] font-serif font-bold text-[#1A1A1A] leading-none tabular-nums">12</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-xl p-4 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-2 hover:-translate-y-0.5 transition-transform group">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">Available Beds</span>
            <div className="w-7 h-7 rounded-md bg-[#F9EBEA] border border-[#8B2C2C]/20 flex items-center justify-center text-[#8B2C2C] group-hover:bg-[#8B2C2C] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px]">bed</span>
            </div>
          </div>
          <div className="flex items-end gap-2 mt-auto">
            <span className="text-[26px] font-serif font-bold text-[#1A1A1A] leading-none tabular-nums">85</span>
            <span className="flex items-center text-[10px] font-semibold text-[#8B2C2C] bg-[#F9EBEA] px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[13px]">trending_down</span> -2%
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions (Grid of 8) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between border-b border-black/[0.08] pb-2">
          <h3 className="text-[18px] font-serif font-semibold text-[#1A1A1A]">Clinical Operations</h3>
          <span className="text-[11px] text-black/40 uppercase tracking-widest font-sans">Quick Access</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          {/* Action 1 */}
          <button
            id="qa-register-patient"
            onClick={() => onNavigate('patient-registration')}
            className="bg-white hover:bg-[#FAF9F5] transition-all border border-black/10 rounded-xl p-4 flex flex-col items-start gap-2.5 text-left group focus:ring-1 focus:ring-black outline-none"
          >
            <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-black/10 text-[#1A1A1A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1A1A1A]">Register Patient</h4>
              <p className="text-[11px] text-black/50 mt-0.5 line-clamp-1">Intake and clinical records</p>
            </div>
          </button>

          {/* Action 2 */}
          <button
            id="qa-book-appointment"
            onClick={() => onNavigate('appointment-booking')}
            className="bg-white hover:bg-[#FAF9F5] transition-all border border-black/10 rounded-xl p-4 flex flex-col items-start gap-2.5 text-left group focus:ring-1 focus:ring-black outline-none"
          >
            <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-black/10 text-[#1A1A1A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1A1A1A]">Book Appointment</h4>
              <p className="text-[11px] text-black/50 mt-0.5 line-clamp-1">Schedule a consultation</p>
            </div>
          </button>

          {/* Action 3 */}
          <button
            id="qa-doctor-dashboard"
            onClick={() => onNavigate('doctor-dashboard')}
            className="bg-white hover:bg-[#FAF9F5] transition-all border border-black/10 rounded-xl p-4 flex flex-col items-start gap-2.5 text-left group focus:ring-1 focus:ring-black outline-none"
          >
            <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-black/10 text-[#1A1A1A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">stethoscope</span>
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1A1A1A]">Doctor Workspace</h4>
              <p className="text-[11px] text-black/50 mt-0.5 line-clamp-1">Live consult & prescription</p>
            </div>
          </button>

          {/* Action 4 */}
          <button
            id="qa-billing"
            onClick={() => onNavigate('patient-records')}
            className="bg-white hover:bg-[#FAF9F5] transition-all border border-black/10 rounded-xl p-4 flex flex-col items-start gap-2.5 text-left group focus:ring-1 focus:ring-black outline-none"
          >
            <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-black/10 text-[#1A1A1A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1A1A1A]">Patient Records</h4>
              <p className="text-[11px] text-black/50 mt-0.5 line-clamp-1">Diagnostics and histories</p>
            </div>
          </button>

          {/* Action 5 */}
          <button
            id="qa-lab-results"
            onClick={() => onNavigate('doctor-dashboard')}
            className="bg-white hover:bg-[#FAF9F5] transition-all border border-black/10 rounded-xl p-4 flex flex-col items-start gap-2.5 text-left group focus:ring-1 focus:ring-black outline-none"
          >
            <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-black/10 text-[#1A1A1A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">biotech</span>
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1A1A1A]">Lab & Pathology</h4>
              <p className="text-[11px] text-black/50 mt-0.5 line-clamp-1">Panels and diagnostics</p>
            </div>
          </button>

          {/* Action 6 */}
          <button
            id="qa-pharmacy"
            onClick={() => onNavigate('pharmacy')}
            className="bg-white hover:bg-[#FAF9F5] transition-all border border-black/10 rounded-xl p-4 flex flex-col items-start gap-2.5 text-left group focus:ring-1 focus:ring-black outline-none"
          >
            <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-black/10 text-[#1A1A1A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">vaccines</span>
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1A1A1A]">Pharmacy</h4>
              <p className="text-[11px] text-black/50 mt-0.5 line-clamp-1">Formulary and dispensing</p>
            </div>
          </button>

          {/* Action 7 */}
          <button
            id="qa-bed-management"
            onClick={() => onNavigate('building')}
            className="bg-white hover:bg-[#FAF9F5] transition-all border border-black/10 rounded-xl p-4 flex flex-col items-start gap-2.5 text-left group focus:ring-1 focus:ring-black outline-none"
          >
            <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-black/10 text-[#1A1A1A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">airline_seat_flat</span>
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1A1A1A]">Bed Allocation</h4>
              <p className="text-[11px] text-black/50 mt-0.5 line-clamp-1">Wards and ICU capacity</p>
            </div>
          </button>

          {/* Action 8 */}
          <button
            id="qa-admin-dashboard"
            onClick={() => onNavigate('admin-dashboard')}
            className="bg-white hover:bg-[#FAF9F5] transition-all border border-black/10 rounded-xl p-4 flex flex-col items-start gap-2.5 text-left group focus:ring-1 focus:ring-black outline-none"
          >
            <div className="w-9 h-9 rounded-md bg-[#FAF9F5] border border-black/10 text-[#1A1A1A] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">summarize</span>
            </div>
            <div>
              <h4 className="text-[14px] font-medium text-[#1A1A1A]">Administration</h4>
              <p className="text-[11px] text-black/50 mt-0.5 line-clamp-1">Hospital metrics & analytics</p>
            </div>
          </button>
        </div>
      </section>

      {/* 3 Column Layout Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Col 1: Today's Appointments (Span 7/12) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-black/[0.08] flex justify-between items-center bg-[#FAF9F5] z-10 relative">
            <h3 className="font-serif text-[17px] font-semibold text-[#1A1A1A]">Today's Clinical Roster</h3>
            <button
              id="view-all-appointments-btn"
              onClick={() => onNavigate('doctor-dashboard')}
              className="text-[#1A1A1A] font-medium text-[12px] uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              View Roster <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>

          <div className="overflow-x-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-[#FAF9F5]/70 border-b border-black/[0.08] text-[11px] uppercase tracking-wider font-semibold text-black/50">
                  <th className="py-2.5 px-4 font-semibold">Patient</th>
                  <th className="py-2.5 px-4 font-semibold">Attending</th>
                  <th className="py-2.5 px-4 font-semibold">Time</th>
                  <th className="py-2.5 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.05] bg-white text-[13px]">
                {homeAppointments.map((apt) => {
                  const initials = apt.patientName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2);

                  return (
                    <tr
                      key={apt.id}
                      onClick={() => {
                        onSelectAppointment(apt.id);
                        onNavigate('doctor-dashboard');
                      }}
                      className="hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded bg-[#EBE8E0] flex items-center justify-center text-[#1A1A1A] font-semibold text-[11px] shrink-0 border border-black/5">
                            {initials}
                          </div>
                          <div>
                            <p className="font-medium text-[#1A1A1A]">{apt.patientName}</p>
                            <p className="text-[11px] text-black/40">ID: {apt.patientId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-black/80">
                        <span className="font-medium">{apt.doctorName}</span>
                        <br />
                        <span className="text-[11px] text-black/40">{apt.department}</span>
                      </td>
                      <td className="py-3 px-4 text-black/80 font-medium font-sans">{apt.time}</td>
                      <td className="py-3 px-4">
                        {apt.status === 'Completed' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#E2ECE7] text-[#173228]">
                            Completed
                          </span>
                        )}
                        {apt.status === 'In Progress' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#1A1A1A] text-[#FAF9F5]">
                            In Progress
                          </span>
                        )}
                        {apt.status === 'Waiting' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#EBE8E0] text-black/70">
                            Waiting
                          </span>
                        )}
                        {apt.status === 'Cancelled' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#F9EBEA] text-[#8B2C2C]">
                            Cancelled
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Col 2: Department Overview (Span 2/12) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-3">
          <h3 className="font-serif text-[16px] font-semibold text-[#1A1A1A] pb-2 border-b border-black/[0.08]">
            Departments
          </h3>
          <div className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar max-h-[300px] lg:max-h-none">
            {departments.slice(0, 5).map((dept) => (
              <div
                key={dept.id}
                onClick={() => onNavigate('departments')}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#FAF9F5] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-[#FAF9F5] border border-black/10 flex items-center justify-center text-[#1A1A1A]">
                    <span className="material-symbols-outlined text-[15px]">{dept.icon}</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-[#1A1A1A] group-hover:underline">
                      {dept.name}
                    </p>
                    <p className="text-[10px] text-black/40">{dept.doctorCount} Doctors</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[15px] text-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </div>
            ))}
          </div>
          <button
            id="view-all-departments-btn"
            onClick={() => onNavigate('departments')}
            className="mt-auto w-full border border-black/15 text-black/70 font-medium text-[11px] uppercase tracking-wider py-1.5 rounded-lg hover:bg-[#FAF9F5] transition-colors"
          >
            All Departments
          </button>
        </div>

        {/* Col 3: Hospital Announcements (Span 3/12) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center pb-2 border-b border-black/[0.08]">
            <h3 className="font-serif text-[16px] font-semibold text-[#1A1A1A]">Announcements</h3>
            <span className="material-symbols-outlined text-[18px] text-black/40">campaign</span>
          </div>

          <div className="flex flex-col gap-3">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="border border-black/10 bg-[#FAF9F5] rounded-lg p-3 relative overflow-hidden group cursor-pointer hover:border-black/30 transition-colors"
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${
                    ann.type === 'SYSTEM'
                      ? 'bg-[#1A1A1A]'
                      : ann.type === 'STAFF'
                      ? 'bg-[#2C4A3E]'
                      : 'bg-[#5A4B3C]'
                  }`}
                />
                <div className="flex items-center gap-2 mb-1 pl-1">
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-xs uppercase tracking-wider ${
                      ann.type === 'SYSTEM'
                        ? 'bg-[#1A1A1A] text-[#FAF9F5]'
                        : ann.type === 'STAFF'
                        ? 'bg-[#E2ECE7] text-[#173228]'
                        : 'bg-[#EBE8E0] text-black/70'
                    }`}
                  >
                    {ann.type}
                  </span>
                  <span className="text-[10px] text-black/40">{ann.time}</span>
                </div>
                <h4 className="text-[12px] font-medium text-[#1A1A1A] mb-1 pl-1 group-hover:underline">
                  {ann.title}
                </h4>
                <p className="text-[11px] text-black/60 line-clamp-2 leading-relaxed pl-1 font-sans">
                  {ann.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
