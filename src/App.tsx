import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DoctorDashboard } from './components/DoctorDashboard';
import { HomeDashboard } from './components/HomeDashboard';
import { PatientRegistration } from './components/PatientRegistration';
import { AppointmentBookingView } from './components/AppointmentBookingView';
import { PatientRecordsView } from './components/PatientRecordsView';
import { DepartmentsView } from './components/DepartmentsView';
import { PharmacyView } from './components/PharmacyView';
import { BedManagementView } from './components/BedManagementView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { ContactSupportView } from './components/ContactSupportView';
import { MedicalHistoryModal } from './components/MedicalHistoryModal';
import { PrintHandoutModal } from './components/PrintHandoutModal';
import { EmergencyModal } from './components/EmergencyModal';
import { CommandPalette } from './components/CommandPalette';
import {
  initialPatients,
  initialDoctors,
  initialAppointments,
  initialDepartments,
  initialAnnouncements,
  eleanorLabResults,
  eleanorImagingRecords,
} from './data/initialData';
import { ActiveView, Patient, Appointment, Doctor } from './types';

interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'staff'>('dashboard');

  // Application Data States
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [departments] = useState(initialDepartments);
  const [announcements] = useState(initialAnnouncements);

  // Active Doctor Consultation Patient (Eleanor Pena initially)
  const [currentPatient, setCurrentPatient] = useState<Patient>(initialPatients[0]);

  // Modals & UI States
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [medicalHistoryPatient, setMedicalHistoryPatient] = useState<Patient | null>(null);
  const [printData, setPrintData] = useState<{ patient: Patient; appointment: Appointment } | null>(
    null
  );
  const [preselectedPatientId, setPreselectedPatientId] = useState<string | undefined>(undefined);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Appointment selection handler
  const handleSelectAppointment = (aptId: string) => {
    const apt = appointments.find((a) => a.id === aptId);
    if (apt) {
      const patient = patients.find((p) => p.id === apt.patientId);
      if (patient) {
        setCurrentPatient(patient);
      }
    }
  };

  // Update existing appointment notes / rx
  const handleUpdateAppointment = (updatedApt: Appointment) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === updatedApt.id ? updatedApt : apt))
    );
  };

  // Add new patient from registration form
  const handleSavePatient = (newPatient: Patient, andBook: boolean = false) => {
    setPatients((prev) => [newPatient, ...prev]);
    if (andBook) {
      setPreselectedPatientId(newPatient.id);
      setActiveView('appointment-booking');
    } else {
      setActiveView('patient-records');
    }
  };

  // Add new appointment
  const handleBookAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    setActiveView('doctor-dashboard');
    const patient = patients.find((p) => p.id === newAppointment.patientId);
    if (patient) {
      setCurrentPatient(patient);
    }
  };

  // Select patient for consultation from Patient Records table
  const handleSelectPatientForDoctor = (patient: Patient) => {
    setCurrentPatient(patient);
    setActiveView('doctor-dashboard');
  };

  // Broadcast Emergency
  const handleBroadcastEmergency = (type: string, location: string, message: string) => {
    showToast(
      `🚨 BROADCAST: ${type} dispatched to ${location}! Response teams paged.`,
      'warning'
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#E5E2D9] selection:text-[#1A1A1A]">
      {/* Fixed Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          if (view === 'patient-records') setActiveTab('patients');
          else if (view === 'departments') setActiveTab('staff');
          else setActiveTab('dashboard');
        }}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Top Navbar */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        unreadNotificationsCount={2}
        onToggleMobileMenu={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Viewport */}
      <main
        id="app-main-content"
        className="flex-1 ml-0 md:ml-[260px] pt-[88px] px-4 md:px-8 pb-16 transition-all min-h-[calc(100vh-72px)] bg-[#F8F7F3]"
      >
        {activeView === 'home' && (
          <HomeDashboard
            onNavigate={setActiveView}
            appointments={appointments}
            departments={departments}
            announcements={announcements}
            onSelectAppointment={(id) => {
              handleSelectAppointment(id);
              setActiveView('doctor-dashboard');
            }}
          />
        )}

        {activeView === 'doctor-dashboard' && (
          <DoctorDashboard
            currentPatient={currentPatient}
            appointments={appointments}
            onSelectAppointment={handleSelectAppointment}
            onOpenHistoryModal={(p) => setMedicalHistoryPatient(p)}
            onOpenPrintModal={(p, apt) => setPrintData({ patient: p, appointment: apt })}
            labResults={eleanorLabResults}
            imagingRecords={eleanorImagingRecords}
            onUpdateAppointment={handleUpdateAppointment}
            onShowToast={showToast}
          />
        )}

        {activeView === 'patient-registration' && (
          <PatientRegistration
            onSavePatient={handleSavePatient}
            onCancel={() => setActiveView('home')}
            onShowToast={showToast}
          />
        )}

        {activeView === 'appointment-booking' && (
          <AppointmentBookingView
            patients={patients}
            doctors={doctors}
            departments={departments}
            onBookAppointment={handleBookAppointment}
            preselectedPatientId={preselectedPatientId}
            onShowToast={showToast}
          />
        )}

        {activeView === 'patient-records' && (
          <PatientRecordsView
            patients={patients}
            onSelectPatientForDoctor={handleSelectPatientForDoctor}
            onOpenHistoryModal={(p) => setMedicalHistoryPatient(p)}
            onRegisterNewPatient={() => setActiveView('patient-registration')}
          />
        )}

        {activeView === 'departments' && (
          <DepartmentsView
            departments={departments}
            doctors={doctors}
            onSelectDoctor={(doc) => {
              setDoctors([doc, ...doctors.filter((d) => d.id !== doc.id)]);
            }}
            onShowToast={showToast}
          />
        )}

        {activeView === 'pharmacy' && <PharmacyView onShowToast={showToast} />}

        {activeView === 'building' && <BedManagementView onShowToast={showToast} />}

        {activeView === 'admin-dashboard' && <AdminDashboardView onShowToast={showToast} />}

        {(activeView === 'contact-us' || activeView === 'settings') && (
          <ContactSupportView onShowToast={showToast} />
        )}
      </main>

      {/* Global Modals */}
      {medicalHistoryPatient && (
        <MedicalHistoryModal
          patient={medicalHistoryPatient}
          onClose={() => setMedicalHistoryPatient(null)}
        />
      )}

      {printData && (
        <PrintHandoutModal
          patient={printData.patient}
          appointment={printData.appointment}
          onClose={() => setPrintData(null)}
        />
      )}

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onBroadcastEmergency={handleBroadcastEmergency}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        patients={patients}
        doctors={doctors}
        appointments={appointments}
        departments={departments}
        onSelectPatient={(p) => {
          setCurrentPatient(p);
          setActiveView('doctor-dashboard');
        }}
        onNavigate={setActiveView}
      />

      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto p-4 rounded-lg shadow-lg border flex items-start gap-3 transition-all transform animate-in slide-in-from-bottom-3 duration-200 cursor-pointer ${
              toast.type === 'success'
                ? 'bg-[#1A1A1A] text-[#F8F7F3] border-black/20'
                : toast.type === 'warning'
                ? 'bg-[#7A2E2E] text-[#F8F7F3] border-[#5E1B1B]'
                : 'bg-[#2C2C2C] text-[#F8F7F3] border-black/30'
            }`}
          >
            <span className="material-symbols-outlined text-[19px] shrink-0 mt-0.5 opacity-90">
              {toast.type === 'success'
                ? 'check_circle'
                : toast.type === 'warning'
                ? 'emergency'
                : 'info'}
            </span>
            <div className="flex-1 text-[13px] leading-snug font-medium font-sans">{toast.message}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeToast(toast.id);
              }}
              className="text-[#F8F7F3]/60 hover:text-[#F8F7F3] text-xs font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
