import React, { useState, useRef, useEffect } from 'react';
import { ActiveView } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenSearch: () => void;
  onOpenEmergency: () => void;
  unreadNotificationsCount: number;
  onToggleMobileMenu: () => void;
  activeTab: 'dashboard' | 'patients' | 'staff';
  setActiveTab: (tab: 'dashboard' | 'patients' | 'staff') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onOpenSearch,
  onOpenEmergency,
  unreadNotificationsCount,
  onToggleMobileMenu,
  activeTab,
  setActiveTab,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Lab Report Ready',
      desc: 'Eleanor Pena CBC & CMP panel analysis completed.',
      time: '10m ago',
      urgent: false,
    },
    {
      id: 2,
      title: 'Vitals Alert',
      desc: 'Eleanor Pena body temperature elevated (99.8 °F).',
      time: '15m ago',
      urgent: true,
    },
    {
      id: 3,
      title: 'Upcoming Appointment',
      desc: 'Wade Warren scheduled for 11:15 AM Lab Review.',
      time: '25m ago',
      urgent: false,
    },
  ];

  return (
    <header
      id="main-top-navbar"
      className="h-[72px] fixed top-0 right-0 left-0 md:left-[260px] z-40 bg-[#F8F7F3]/90 backdrop-blur-md border-b border-black/[0.08] flex justify-between items-center px-4 md:px-8 transition-all"
    >
      {/* Left side: Mobile Toggle & Tab navigation */}
      <div className="flex items-center gap-4 md:gap-8 h-full">
        <button
          id="mobile-menu-button"
          onClick={onToggleMobileMenu}
          className="p-2 -ml-2 text-[#1A1A1A] md:hidden rounded-md hover:bg-black/5 transition-colors"
          title="Toggle Navigation"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Top bar Tab Navigation with editorial aesthetic */}
        <nav className="flex h-full gap-1 md:gap-6 items-center">
          <button
            id="tab-dashboard"
            onClick={() => {
              setActiveTab('dashboard');
              if (activeView !== 'doctor-dashboard' && activeView !== 'home' && activeView !== 'admin-dashboard') {
                setActiveView('home');
              }
            }}
            className={`flex items-center h-full px-2 text-[12px] uppercase tracking-[0.18em] font-medium transition-all border-b-2 ${
              activeTab === 'dashboard'
                ? 'text-[#1A1A1A] border-[#1A1A1A] font-semibold'
                : 'text-black/50 border-transparent hover:text-[#1A1A1A]'
            }`}
          >
            Dashboard
          </button>
          <button
            id="tab-patients"
            onClick={() => {
              setActiveTab('patients');
              setActiveView('patient-records');
            }}
            className={`flex items-center h-full px-2 text-[12px] uppercase tracking-[0.18em] font-medium transition-all border-b-2 ${
              activeTab === 'patients'
                ? 'text-[#1A1A1A] border-[#1A1A1A] font-semibold'
                : 'text-black/50 border-transparent hover:text-[#1A1A1A]'
            }`}
          >
            Patients
          </button>
          <button
            id="tab-staff"
            onClick={() => {
              setActiveTab('staff');
              setActiveView('departments');
            }}
            className={`flex items-center h-full px-2 text-[12px] uppercase tracking-[0.18em] font-medium transition-all border-b-2 ${
              activeTab === 'staff'
                ? 'text-[#1A1A1A] border-[#1A1A1A] font-semibold'
                : 'text-black/50 border-transparent hover:text-[#1A1A1A]'
            }`}
          >
            Staff
          </button>
        </nav>
      </div>

      {/* Right side: Search bar & Utilities */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Global Search Input with Cmd+K */}
        <div
          id="global-search-trigger"
          onClick={onOpenSearch}
          className="relative cursor-pointer group hidden sm:flex items-center bg-[#EBE8E0]/70 hover:bg-[#E2DFD6] border border-black/10 rounded-lg px-3 py-1.5 w-60 md:w-72 transition-all"
        >
          <span className="material-symbols-outlined text-[17px] text-black/50 mr-2">search</span>
          <span className="text-[12px] text-black/60 font-sans flex-1 truncate">Search clinical records, ID...</span>
          <div className="flex items-center gap-0.5 ml-2">
            <kbd className="text-[9px] font-semibold bg-white text-black/70 px-1.5 py-0.5 rounded border border-black/10 shadow-2xs">
              Cmd
            </kbd>
            <kbd className="text-[9px] font-semibold bg-white text-black/70 px-1.5 py-0.5 rounded border border-black/10 shadow-2xs">
              K
            </kbd>
          </div>
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 rounded-full text-[#1A1A1A] hover:bg-black/5 transition-colors"
          title="Search"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            id="notifications-bell"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-[#1A1A1A] hover:bg-black/5 transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[21px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8B2C2C] rounded-full border border-[#F8F7F3]"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FFFFFF] rounded-xl shadow-xl border border-black/10 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2.5 border-b border-black/[0.08] flex justify-between items-center bg-[#FAF9F5]">
                <span className="font-serif text-[15px] font-semibold text-[#1A1A1A]">Clinical Notices</span>
                <span className="text-[10px] bg-[#1A1A1A] text-[#F8F7F3] font-semibold tracking-wider uppercase px-2 py-0.5 rounded">
                  {notifications.length} New
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-black/[0.05]">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setShowNotifications(false);
                      setActiveView('doctor-dashboard');
                    }}
                    className="p-3.5 hover:bg-[#F8F7F3] cursor-pointer transition-colors flex gap-3 items-start"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] p-1.5 rounded shrink-0 ${
                        n.urgent ? 'bg-[#F9EBEA] text-[#8B2C2C]' : 'bg-[#EBE8E0] text-[#1A1A1A]'
                      }`}
                    >
                      {n.urgent ? 'warning' : 'info'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <p className="text-[13px] font-medium text-[#1A1A1A] truncate">{n.title}</p>
                        <span className="text-[11px] text-black/40 shrink-0 ml-1">{n.time}</span>
                      </div>
                      <p className="text-[12px] text-black/60 mt-0.5 leading-relaxed">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2.5 border-t border-black/[0.08] text-center bg-[#FAF9F5]">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] uppercase tracking-wider text-[#2C4A3E] font-semibold hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Button */}
        <button
          id="help-button"
          onClick={() => setShowHelp(true)}
          className="p-2 rounded-full text-[#1A1A1A] hover:bg-black/5 transition-colors"
          title="System Help & Quick Shortcuts"
        >
          <span className="material-symbols-outlined text-[21px]">help</span>
        </button>

        {/* User Profile Avatar */}
        <div className="relative pl-2 border-l border-black/10 ml-1" ref={profileRef}>
          <button
            id="profile-menu-button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-9 h-9 rounded-full overflow-hidden border border-black/20 hover:ring-2 hover:ring-black/30 transition-all flex items-center justify-center bg-[#1A1A1A]"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZAEARJtAd5wMHAsHXfnpLnxlodZf9sMYbKyEFzouQhRM6-qcxLyrRdDN2JnRzKeC99XTS7c5CxqYMEKB6A-_iguun2lczZXFCxuY84GkOi6n2Z0M9_FxcncrzeCPmVFbix9M7wnA7s3TDrynOavDVYcex3jN5t9nbFAABA8KsO_jpSs9Ru8CX0A8_JunJVL0MT4qnq26dGP_9sbWyazCM2pPxAp8eqoNDzOhNMYUabbxHqk9N0Q"
              alt="Dr. Sarah Johnson Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-black/10 py-2 z-50">
              <div className="px-4 py-3 border-b border-black/[0.08] bg-[#FAF9F5]">
                <p className="font-serif text-[15px] font-bold text-[#1A1A1A]">Dr. Sarah Johnson, MD</p>
                <p className="text-[11px] text-black/50 tracking-wide mt-0.5">Chief Attending Physician</p>
                <span className="inline-block mt-2 text-[10px] font-semibold bg-[#E2ECE7] text-[#173228] px-2 py-0.5 rounded tracking-wide">
                  Neurology & Critical Care
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveView('doctor-dashboard');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:bg-[#F8F7F3] flex items-center gap-2.5"
                >
                  <span className="material-symbols-outlined text-[18px] text-black/70">stethoscope</span>
                  Doctor Workspace
                </button>
                <button
                  onClick={() => {
                    setActiveView('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:bg-[#F8F7F3] flex items-center gap-2.5"
                >
                  <span className="material-symbols-outlined text-[18px] text-black/70">tune</span>
                  Clinical Preferences
                </button>
                <button
                  onClick={onOpenEmergency}
                  className="w-full text-left px-4 py-2.5 text-[13px] text-[#8B2C2C] hover:bg-[#F9EBEA] flex items-center gap-2.5 font-medium border-t border-black/[0.05]"
                >
                  <span className="material-symbols-outlined text-[18px]">emergency</span>
                  Broadcast Code Blue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-black/10">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-black/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1A1A1A]">help_center</span>
                <h3 className="font-serif font-bold text-[19px] text-[#1A1A1A]">Clinical Practice Guide</h3>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="text-black/40 hover:text-[#1A1A1A] text-lg p-1 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-[13px] text-black/70 leading-relaxed font-sans">
              <p>
                Welcome to <strong>MediCare HMS</strong>. Navigate clinical and operational modules seamlessly:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-black/70">
                <li><strong>Doctor Workspace:</strong> Live consultation for Eleanor Pena, edit vitals, ICD-10 diagnostics, draft prescriptions, and print patient summaries.</li>
                <li><strong>Hospital Overview:</strong> Hospital-wide KPI bento grid, quick operational actions, and real-time appointment logs.</li>
                <li><strong>Patient Intake:</strong> Structured intake form with medical history capture and instant appointment booking.</li>
                <li><strong>Cmd+K:</strong> Omnibar search across patients, physicians, beds, and diagnostic codes.</li>
                <li><strong>Code Blue Dispatch:</strong> Immediate emergency broadcast protocol.</li>
              </ul>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full bg-[#1A1A1A] text-[#F8F7F3] py-2.5 rounded-lg font-medium text-[13px] hover:bg-black transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
