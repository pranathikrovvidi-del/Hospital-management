import React from 'react';
import { ActiveView } from '../types';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenEmergency: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onOpenEmergency,
  mobileOpen,
  setMobileOpen,
}) => {
  const navItems: { id: ActiveView; label: string; icon: string; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'patient-registration', label: 'Patient Registration', icon: 'person_add' },
    { id: 'doctor-dashboard', label: 'Doctor Dashboard', icon: 'medical_services' },
    { id: 'appointment-booking', label: 'Appointment Booking', icon: 'calendar_today' },
    { id: 'patient-records', label: 'Patient Records', icon: 'folder_shared' },
    { id: 'departments', label: 'Departments', icon: 'domain' },
    { id: 'pharmacy', label: 'Pharmacy', icon: 'local_pharmacy' },
    { id: 'building', label: 'Building', icon: 'apartment' },
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: 'admin_panel_settings' },
    { id: 'contact-us', label: 'Contact Us', icon: 'contact_support' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          id="sidebar-mobile-backdrop"
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        id="main-sidebar"
        className={`w-[260px] h-screen fixed left-0 top-0 bg-[#141414] border-r border-black/20 shadow-xl flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header / Logo with Editorial Typography */}
        <div className="flex items-center gap-3 p-5 border-b border-white/10 shrink-0 bg-[#0F0F0F]">
          <div className="w-9 h-9 rounded bg-[#FAF9F5] flex items-center justify-center shrink-0 shadow-xs p-1">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWxgEJH_W-1M4usPSNR_PrKFMIkR73cMhZgD-w782P7CqWuf_slIfA1haAisKDhMJ0GFoEV3lTt_aO48kiZoMbN_No5xHpi3teso8-EsLjCJprwCRreS91h6mIXGVkgc8uWoDMoI9d8dFtoMbFz4-MqP-SGabg4G6R3wic-suAU1Qfs3H3euK7w7YrqjQ0vYn5t1hPHDx-P6mJMeLNV-5VB3RrD_8plqMk5yVVAHGOZn2YfP7G0bs"
              alt="MediCare HMS Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-[17px] text-[#FAF9F5] leading-tight tracking-normal">MediCare HMS</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-sans font-medium mt-0.5">Clinical Systems</span>
          </div>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto py-4 px-2.5 flex flex-col gap-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all text-[13px] font-sans ${
                  isActive
                    ? 'text-[#F8F7F3] bg-white/[0.12] font-semibold border-l-2 border-[#D8D5CC]'
                    : 'text-white/60 hover:bg-white/[0.06] hover:text-[#F8F7F3] border-l-2 border-transparent'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[19px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-[#E2ECE7] text-[#173228] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Emergency Support & Footer links */}
        <div className="p-4 border-t border-white/10 flex flex-col gap-2 shrink-0 bg-[#0D0D0D]">
          <button
            id="emergency-support-btn"
            onClick={onOpenEmergency}
            className="w-full bg-[#8B2C2C] hover:bg-[#6D2020] active:scale-[0.98] text-[#FAF9F5] font-medium py-2.5 px-3 rounded-lg text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              emergency
            </span>
            <span>Emergency Support</span>
          </button>

          <div className="flex flex-col gap-0.5 mt-1">
            <button
              id="nav-support"
              onClick={() => {
                setActiveView('contact-us');
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-1.5 text-white/50 hover:bg-white/5 hover:text-white rounded-md text-[12px] transition-colors"
            >
              <span className="material-symbols-outlined text-[17px]">support</span>
              <span>Hospital Directory</span>
            </button>
            <button
              id="nav-settings"
              onClick={() => {
                setActiveView('settings');
                setMobileOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-md text-[12px] transition-colors ${
                activeView === 'settings' ? 'text-[#FAF9F5] bg-white/10' : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">settings</span>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
