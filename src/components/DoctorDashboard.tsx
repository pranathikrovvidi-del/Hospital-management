import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Patient, Appointment, PrescriptionItem, LabResult, ImagingRecord } from '../types';
import { icd10Database } from '../data/initialData';

interface DoctorDashboardProps {
  currentPatient: Patient;
  appointments: Appointment[];
  onSelectAppointment: (aptId: string) => void;
  onOpenHistoryModal: (patient: Patient) => void;
  onOpenPrintModal: (patient: Patient, appointment: Appointment) => void;
  labResults: LabResult[];
  imagingRecords: ImagingRecord[];
  onUpdateAppointment: (apt: Appointment) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  currentPatient,
  appointments,
  onSelectAppointment,
  onOpenHistoryModal,
  onOpenPrintModal,
  labResults,
  imagingRecords,
  onUpdateAppointment,
  onShowToast,
}) => {
  // Find current active appointment or fallback to Eleanor Pena's
  const activeAppointment =
    appointments.find((a) => a.patientId === currentPatient.id) ||
    appointments.find((a) => a.status === 'In Progress') ||
    appointments[1];

  const [activeTab, setActiveTab] = useState<'notes' | 'labs' | 'imaging'>('notes');
  const [filterSchedule, setFilterSchedule] = useState<'ALL' | 'WAITING' | 'COMPLETED'>('ALL');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Form state
  const [chiefComplaint, setChiefComplaint] = useState(activeAppointment?.chiefComplaint || '');
  const [clinicalNotes, setClinicalNotes] = useState(activeAppointment?.clinicalNotes || '');
  const [diagnosisQuery, setDiagnosisQuery] = useState('');
  const [showIcdDropdown, setShowIcdDropdown] = useState(false);
  const [diagnoses, setDiagnoses] = useState<string[]>(
    activeAppointment?.diagnoses || ['G43.909 - Migraine, unspecified']
  );
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>(
    activeAppointment?.prescriptions || [
      {
        id: 'rx-1',
        medication: 'Sumatriptan',
        dosage: '50mg Tablet',
        frequency: '1 tab PRN',
        duration: 'As needed',
      },
    ]
  );

  // Vitals state
  const [vitals, setVitals] = useState(
    activeAppointment?.vitals || {
      bp: '120/80',
      hr: 72,
      temp: 99.8,
      spO2: 98,
      takenTimeAgo: '15m ago',
      tempStatus: 'high' as const,
    }
  );

  // Add Medication Modal
  const [showAddMedModal, setShowAddMedModal] = useState(false);
  const [newMed, setNewMed] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
  });

  const handleAddDiagnosis = (codeStr: string) => {
    if (!diagnoses.includes(codeStr)) {
      setDiagnoses([...diagnoses, codeStr]);
    }
    setDiagnosisQuery('');
    setShowIcdDropdown(false);
  };

  const handleRemoveDiagnosis = (codeStr: string) => {
    setDiagnoses(diagnoses.filter((d) => d !== codeStr));
  };

  const handleAddPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.medication || !newMed.dosage) return;
    const item: PrescriptionItem = {
      id: `rx-${Date.now()}`,
      medication: newMed.medication,
      dosage: newMed.dosage,
      frequency: newMed.frequency || 'Once daily',
      duration: newMed.duration || '7 days',
    };
    setPrescriptions([...prescriptions, item]);
    setNewMed({ medication: '', dosage: '', frequency: '', duration: '' });
    setShowAddMedModal(false);
    onShowToast(`Added prescription for ${item.medication}`, 'success');
  };

  const handleDeletePrescription = (id: string) => {
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
    onShowToast('Prescription item removed', 'info');
  };

  const handleSaveDraft = () => {
    if (activeAppointment) {
      const updated: Appointment = {
        ...activeAppointment,
        chiefComplaint,
        clinicalNotes,
        diagnoses,
        prescriptions,
        vitals,
      };
      onUpdateAppointment(updated);
      onShowToast('Consultation draft saved successfully', 'success');
    }
  };

  const handleCompleteVisit = () => {
    if (activeAppointment) {
      const updated: Appointment = {
        ...activeAppointment,
        chiefComplaint,
        clinicalNotes,
        diagnoses,
        prescriptions,
        vitals,
        status: 'Completed',
      };
      onUpdateAppointment(updated);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });

      onShowToast(
        `Consultation for ${currentPatient.fullName} completed & prescriptions sent to Pharmacy!`,
        'success'
      );
    }
  };

  // Filtered timeline appointments
  const filteredAppointments = appointments.filter((apt) => {
    if (filterSchedule === 'WAITING') return apt.status === 'Waiting';
    if (filterSchedule === 'COMPLETED') return apt.status === 'Completed';
    return true;
  });

  const filteredIcd = icd10Database.filter(
    (item) =>
      item.code.toLowerCase().includes(diagnosisQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(diagnosisQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-12">
      {/* Page Header */}
      <header className="flex flex-col gap-1 border-b border-black/[0.08] pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">Physician Workspace</span>
        <h2 className="text-[28px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight">
          Dr. Sarah Johnson, MD
        </h2>
        <p className="text-[14px] text-black/60 font-sans">Attending Neurologist • Daily clinical schedule and patient encounters</p>
      </header>

      {/* Key Stats (4 Grid Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-white rounded-xl p-5 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-3 group hover:-translate-y-0.5 transition-transform">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 bg-[#FAF9F5] border border-black/10 rounded-md text-[#1A1A1A] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">groups</span>
            </div>
            <span className="text-[10px] font-semibold text-[#173228] bg-[#E2ECE7] px-2 py-0.5 rounded">
              +12%
            </span>
          </div>
          <div>
            <h3 className="text-[36px] font-serif font-bold text-[#1A1A1A] leading-none tabular-nums">24</h3>
            <p className="text-[10px] text-black/50 mt-1.5 uppercase font-semibold tracking-widest">
              Today's Patients
            </p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-xl p-5 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-3 group hover:-translate-y-0.5 transition-transform">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 bg-[#FAF9F5] border border-black/10 rounded-md text-[#1A1A1A] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">event_upcoming</span>
            </div>
          </div>
          <div>
            <h3 className="text-[36px] font-serif font-bold text-[#1A1A1A] leading-none tabular-nums">8</h3>
            <p className="text-[10px] text-black/50 mt-1.5 uppercase font-semibold tracking-widest">Upcoming</p>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white rounded-xl p-5 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-3 group hover:-translate-y-0.5 transition-transform">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 bg-[#FAF9F5] border border-black/10 rounded-md text-[#1A1A1A] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </div>
            <span className="text-[10px] font-semibold text-black/60 bg-[#EBE8E0] px-2 py-0.5 rounded">
              On Track
            </span>
          </div>
          <div>
            <h3 className="text-[36px] font-serif font-bold text-[#1A1A1A] leading-none tabular-nums">12</h3>
            <p className="text-[10px] text-black/50 mt-1.5 uppercase font-semibold tracking-widest">Completed</p>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white rounded-xl p-5 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-3 group hover:-translate-y-0.5 transition-transform">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 bg-[#F9EBEA] border border-[#8B2C2C]/20 rounded-md text-[#8B2C2C] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">pending_actions</span>
            </div>
            <span className="text-[10px] font-semibold text-[#8B2C2C] bg-[#F9EBEA] px-2 py-0.5 rounded">
              Action Needed
            </span>
          </div>
          <div>
            <h3 className="text-[36px] font-serif font-bold text-[#1A1A1A] leading-none tabular-nums">4</h3>
            <p className="text-[10px] text-black/50 mt-1.5 uppercase font-semibold tracking-widest">
              Pending Reports
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout (Today's Schedule Left 4 cols, Workspace Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Today's Schedule (4 cols) */}
        <section className="lg:col-span-4 bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden h-fit">
          <div className="p-4 border-b border-black/[0.08] flex justify-between items-center bg-[#FAF9F5]">
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] text-[#1A1A1A] font-serif font-semibold">Today's Schedule</h3>
              <span className="text-[10px] font-semibold bg-[#1A1A1A] text-white px-2 py-0.5 rounded-full">
                {filteredAppointments.length}
              </span>
            </div>

            <div className="relative">
              <button
                id="schedule-filter-btn"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="text-black/60 hover:text-black p-1.5 rounded-md hover:bg-black/5 transition-colors flex items-center"
                title="Filter schedule"
              >
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-black/10 rounded-lg shadow-lg py-1 z-30 text-[12px]">
                  <button
                    onClick={() => {
                      setFilterSchedule('ALL');
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#FAF9F5] ${
                      filterSchedule === 'ALL' ? 'font-semibold text-[#1A1A1A]' : 'text-black/70'
                    }`}
                  >
                    All Appointments
                  </button>
                  <button
                    onClick={() => {
                      setFilterSchedule('WAITING');
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#FAF9F5] ${
                      filterSchedule === 'WAITING' ? 'font-semibold text-[#1A1A1A]' : 'text-black/70'
                    }`}
                  >
                    Waiting Only
                  </button>
                  <button
                    onClick={() => {
                      setFilterSchedule('COMPLETED');
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#FAF9F5] ${
                      filterSchedule === 'COMPLETED' ? 'font-semibold text-[#1A1A1A]' : 'text-black/70'
                    }`}
                  >
                    Completed Only
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 overflow-y-auto max-h-[640px] custom-scrollbar">
            <div className="relative border-l border-black/15 ml-3 flex flex-col gap-6 py-2">
              {filteredAppointments.map((apt) => {
                const isCurrent = apt.patientId === currentPatient.id || apt.status === 'In Progress';
                const isCompleted = apt.status === 'Completed';
                const isWaiting = apt.status === 'Waiting';

                return (
                  <div key={apt.id} className="relative pl-5">
                    {/* Node Dot */}
                    {isCurrent ? (
                      <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#1A1A1A] border-2 border-white ring-2 ring-black/20" />
                    ) : isCompleted ? (
                      <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-black/30 border-2 border-white" />
                    ) : (
                      <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-black/15 border-2 border-white" />
                    )}

                    {/* Timeline Item Box */}
                    <div className="flex flex-col gap-1">
                      <span
                        className={`text-[11px] uppercase tracking-wider font-semibold ${
                          isCurrent
                            ? 'text-[#1A1A1A]'
                            : isCompleted
                            ? 'text-black/40'
                            : 'text-black/60'
                        }`}
                      >
                        {apt.time}
                      </span>

                      {isCurrent ? (
                        <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-black/20 flex flex-col gap-2 shadow-xs">
                          <div className="flex justify-between items-start">
                            <span className="text-[14px] text-[#1A1A1A] font-semibold">
                              {apt.patientName}
                            </span>
                            <span className="text-[9px] font-semibold text-[#FAF9F5] bg-[#1A1A1A] px-2 py-0.5 rounded uppercase tracking-wider">
                              In Progress
                            </span>
                          </div>
                          <p className="text-[12px] text-black/60 font-sans">{apt.type}</p>
                          <div className="flex gap-2 mt-1">
                            <button
                              onClick={() => onSelectAppointment(apt.id)}
                              className="flex-1 bg-[#1A1A1A] text-white text-[11px] uppercase tracking-wider font-medium py-1.5 rounded hover:bg-black transition-colors"
                            >
                              Resume Consult
                            </button>
                          </div>
                        </div>
                      ) : isCompleted ? (
                        <div
                          onClick={() => onSelectAppointment(apt.id)}
                          className="bg-[#FAF9F5]/50 p-3.5 rounded-lg border border-black/10 flex flex-col gap-1.5 opacity-80 hover:opacity-100 cursor-pointer transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[13px] font-medium text-[#1A1A1A]">
                              {apt.patientName}
                            </span>
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#173228] bg-[#E2ECE7] px-1.5 py-0.5 rounded">
                              Completed
                            </span>
                          </div>
                          <p className="text-[11px] text-black/50">{apt.type}</p>
                        </div>
                      ) : (
                        <div
                          onClick={() => onSelectAppointment(apt.id)}
                          className="bg-white p-3.5 rounded-lg border border-black/10 hover:border-black/30 transition-all cursor-pointer group flex flex-col gap-1.5 shadow-2xs"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[13px] font-medium text-[#1A1A1A] group-hover:underline">
                              {apt.patientName}
                            </span>
                            {isWaiting && (
                              <span className="text-[9px] font-semibold uppercase tracking-wider text-black/70 bg-[#EBE8E0] px-1.5 py-0.5 rounded">
                                Waiting
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-black/50">{apt.type}</p>
                          <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectAppointment(apt.id);
                              }}
                              className="flex-1 border border-black/20 text-black/70 text-[11px] uppercase tracking-wider font-medium py-1 rounded hover:bg-black/5 transition-colors"
                            >
                              View
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectAppointment(apt.id);
                              }}
                              className="flex-1 border border-black text-[#1A1A1A] text-[11px] uppercase tracking-wider font-medium py-1 rounded hover:bg-black hover:text-white transition-colors"
                            >
                              Start
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Panel: Active Consultation Workspace (8 cols) */}
        <section className="lg:col-span-8 flex flex-col gap-5">
          {/* Patient Context Bar */}
          <div className="bg-white rounded-xl p-4 border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-black/10 shrink-0 bg-[#FAF9F5]">
                <img
                  src={
                    currentPatient.photoUrl ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuB7RbV9hzSprI28FQsvyFIMSRBIQgXJLGi3ExCFetlHTjGY31kiqmqKsMOpFDZBVZjqvjwWP6MVXDcSyqG69RYQn9-1O85LpD4L3Agn7QPa2CCMW9CoMwgA-LeHuk_MqV1xuUI09hdaAtH5ldwy46O-yEevkHO1oae4LjoEBDugrtng1ze0qh4RvxhqeiWa_AnEPsWiwU9E28Kkf88MzEdETQx9oGGxDmOcCQ1NGCqIn8tggaLIbsQ'
                  }
                  alt={currentPatient.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-[18px] text-[#1A1A1A] font-serif font-semibold tracking-tight">
                  {currentPatient.fullName}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-[12px] text-black/60 mt-0.5">
                  <span>ID: {currentPatient.id}</span>
                  <span>•</span>
                  <span>
                    {currentPatient.age} yrs, {currentPatient.gender}
                  </span>
                  {currentPatient.medicalInfo.knownAllergies?.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-[#8B2C2C] font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">warning</span>
                        Allergies: {currentPatient.medicalInfo.knownAllergies.join(', ')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              id="full-medical-history-btn"
              onClick={() => onOpenHistoryModal(currentPatient)}
              className="text-[#1A1A1A] hover:bg-[#FAF9F5] px-3.5 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-medium border border-black/20 transition-colors"
            >
              Medical History
            </button>
          </div>

          {/* Consultation Main Card */}
          <div className="bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden">
            {/* Consultation Tabs */}
            <div className="p-3 px-5 border-b border-black/[0.08] bg-[#FAF9F5] flex gap-6">
              <button
                onClick={() => setActiveTab('notes')}
                className={`text-[12px] uppercase tracking-wider pb-1 font-medium transition-all border-b-2 ${
                  activeTab === 'notes'
                    ? 'text-[#1A1A1A] border-[#1A1A1A] font-semibold'
                    : 'text-black/50 border-transparent hover:text-[#1A1A1A]'
                }`}
              >
                Consultation Notes
              </button>
              <button
                onClick={() => setActiveTab('labs')}
                className={`text-[12px] uppercase tracking-wider pb-1 font-medium transition-all border-b-2 ${
                  activeTab === 'labs'
                    ? 'text-[#1A1A1A] border-[#1A1A1A] font-semibold'
                    : 'text-black/50 border-transparent hover:text-[#1A1A1A]'
                }`}
              >
                Lab Results (2 New)
              </button>
              <button
                onClick={() => setActiveTab('imaging')}
                className={`text-[12px] uppercase tracking-wider pb-1 font-medium transition-all border-b-2 ${
                  activeTab === 'imaging'
                    ? 'text-[#1A1A1A] border-[#1A1A1A] font-semibold'
                    : 'text-black/50 border-transparent hover:text-[#1A1A1A]'
                }`}
              >
                Imaging & Scans
              </button>
            </div>

            {/* Tab 1: Consultation Notes */}
            {activeTab === 'notes' && (
              <div className="p-5 md:p-6 flex flex-col gap-6">
                {/* Vitals Mini-Cards */}
                <div>
                  <h4 className="text-[11px] text-black/50 uppercase font-semibold tracking-widest mb-2.5">
                    Current Vitals (Taken {vitals.takenTimeAgo})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#FAF9F5] p-3 rounded-lg border border-black/10 flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">BP</span>
                      <span className="text-[18px] font-serif font-bold text-[#1A1A1A]">
                        {vitals.bp} <span className="text-[11px] text-black/40 font-sans font-normal">mmHg</span>
                      </span>
                    </div>

                    <div className="bg-[#FAF9F5] p-3 rounded-lg border border-black/10 flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">HR</span>
                      <span className="text-[18px] font-serif font-bold text-[#1A1A1A]">
                        {vitals.hr} <span className="text-[11px] text-black/40 font-sans font-normal">bpm</span>
                      </span>
                    </div>

                    <div className="bg-[#F9EBEA] p-3 rounded-lg border border-[#8B2C2C]/20 flex flex-col relative">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8B2C2C] flex items-center gap-1">
                        Temp <span className="material-symbols-outlined text-[13px]">arrow_upward</span>
                      </span>
                      <span className="text-[18px] font-serif font-bold text-[#1A1A1A]">
                        {vitals.temp} <span className="text-[11px] text-black/40 font-sans font-normal">°F</span>
                      </span>
                    </div>

                    <div className="bg-[#FAF9F5] p-3 rounded-lg border border-black/10 flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-black/50">SpO2</span>
                      <span className="text-[18px] font-serif font-bold text-[#1A1A1A]">
                        {vitals.spO2} <span className="text-[11px] text-black/40 font-sans font-normal">%</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Symptoms & Diagnosis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-black/60 uppercase font-semibold tracking-wider">
                      Chief Complaint / Symptoms
                    </label>
                    <textarea
                      id="chief-complaint-input"
                      rows={4}
                      value={chiefComplaint}
                      onChange={(e) => setChiefComplaint(e.target.value)}
                      className="w-full rounded-lg border border-black/15 bg-white p-3 text-[13px] text-[#1A1A1A] focus:border-black outline-none resize-none transition-all"
                      placeholder="Enter patient symptoms..."
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-black/60 uppercase font-semibold tracking-wider">
                      Clinical Notes & Observations
                    </label>
                    <textarea
                      id="clinical-notes-input"
                      rows={4}
                      value={clinicalNotes}
                      onChange={(e) => setClinicalNotes(e.target.value)}
                      className="w-full rounded-lg border border-black/15 bg-white p-3 text-[13px] text-[#1A1A1A] focus:border-black outline-none resize-none transition-all"
                      placeholder="Enter detailed observations..."
                    />
                  </div>
                </div>

                {/* Primary Diagnosis (ICD-10) */}
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-[11px] text-black/60 uppercase font-semibold tracking-wider">
                    Primary Diagnosis (ICD-10)
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-[18px]">
                      search
                    </span>
                    <input
                      id="icd10-search-input"
                      type="text"
                      value={diagnosisQuery}
                      onChange={(e) => {
                        setDiagnosisQuery(e.target.value);
                        setShowIcdDropdown(true);
                      }}
                      onFocus={() => setShowIcdDropdown(true)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg border border-black/15 bg-white text-[13px] text-[#1A1A1A] focus:border-black outline-none"
                      placeholder="Search diagnosis codes (e.g. Migraine, Hypertension)..."
                    />
                  </div>

                  {/* ICD Autocomplete Dropdown */}
                  {showIcdDropdown && filteredIcd.length > 0 && (
                    <div className="absolute top-[68px] left-0 right-0 bg-white rounded-lg shadow-xl border border-black/10 max-h-48 overflow-y-auto z-30 divide-y divide-black/5">
                      {filteredIcd.map((item) => (
                        <div
                          key={item.code}
                          onClick={() => handleAddDiagnosis(`${item.code} - ${item.description}`)}
                          className="p-2.5 hover:bg-[#FAF9F5] cursor-pointer text-[12px] flex items-center justify-between"
                        >
                          <span className="font-semibold text-[#1A1A1A]">{item.code}</span>
                          <span className="text-black/60 ml-2 text-right truncate">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Diagnosis Tags representation */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {diagnoses.map((diag) => (
                      <span
                        key={diag}
                        className="bg-[#FAF9F5] text-[#1A1A1A] text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-black/15 shadow-2xs"
                      >
                        {diag}
                        <button
                          type="button"
                          onClick={() => handleRemoveDiagnosis(diag)}
                          className="hover:text-[#8B2C2C] ml-1 p-0.5 rounded hover:bg-black/5"
                        >
                          <span className="material-symbols-outlined text-[13px]">close</span>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prescription Section */}
                <div className="flex flex-col gap-2.5 border-t border-black/[0.08] pt-4 mt-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[11px] text-black/60 uppercase font-semibold tracking-wider">
                      Prescription Draft
                    </h4>
                    <button
                      id="add-medication-btn"
                      onClick={() => setShowAddMedModal(true)}
                      className="text-[#1A1A1A] flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold hover:underline"
                    >
                      <span className="material-symbols-outlined text-[15px]">add</span> Add Medication
                    </button>
                  </div>

                  {/* Dense Table for Rx */}
                  <div className="border border-black/10 rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#FAF9F5] border-b border-black/10">
                          <th className="p-3 text-[11px] uppercase font-semibold text-black/50 tracking-wider">Medication</th>
                          <th className="p-3 text-[11px] uppercase font-semibold text-black/50 tracking-wider">Dosage</th>
                          <th className="p-3 text-[11px] uppercase font-semibold text-black/50 tracking-wider">Frequency</th>
                          <th className="p-3 text-[11px] uppercase font-semibold text-black/50 tracking-wider">Duration</th>
                          <th className="p-3 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {prescriptions.map((rx) => (
                          <tr
                            key={rx.id}
                            className="bg-white hover:bg-[#FAF9F5] transition-colors"
                          >
                            <td className="p-3 text-[13px] font-medium text-[#1A1A1A]">{rx.medication}</td>
                            <td className="p-3 text-[12px] text-black/70">{rx.dosage}</td>
                            <td className="p-3 text-[12px] text-black/70">{rx.frequency}</td>
                            <td className="p-3 text-[12px] text-black/70">{rx.duration}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleDeletePrescription(rx.id)}
                                className="text-black/40 hover:text-[#8B2C2C] p-1 rounded hover:bg-black/5 transition-colors"
                                title="Remove medication"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Lab Results */}
            {activeTab === 'labs' && (
              <div className="p-6 flex flex-col gap-6 animate-in fade-in duration-150">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-serif font-semibold text-[17px] text-[#1A1A1A]">Recent Laboratory Diagnostics</h3>
                    <p className="text-[12px] text-black/60">
                      Automated high-throughput analyzer reports for Eleanor Pena
                    </p>
                  </div>
                  <span className="bg-[#E2ECE7] text-[#173228] font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                    Verified by Pathology
                  </span>
                </div>

                {labResults.map((lab) => (
                  <div
                    key={lab.id}
                    className="border border-black/10 rounded-xl overflow-hidden shadow-2xs"
                  >
                    <div className="bg-[#FAF9F5] p-3.5 border-b border-black/10 flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-[14px] text-[#1A1A1A]">{lab.testName}</span>
                        <span className="text-[12px] text-black/50 ml-3">
                          {lab.date} • {lab.category}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                          lab.status === 'Abnormal'
                            ? 'bg-[#F9EBEA] text-[#8B2C2C]'
                            : 'bg-[#EBE8E0] text-black/80'
                        }`}
                      >
                        {lab.status}
                      </span>
                    </div>

                    <div className="p-3">
                      <table className="w-full text-left text-[12px]">
                        <thead>
                          <tr className="text-black/50 border-b border-black/5">
                            <th className="py-2 font-semibold">Test Parameter</th>
                            <th className="py-2 font-semibold">Observed Value</th>
                            <th className="py-2 font-semibold">Standard Reference</th>
                            <th className="py-2 font-semibold">Unit</th>
                            <th className="py-2 font-semibold">Flag</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                          {lab.values.map((v, i) => (
                            <tr key={i} className="hover:bg-[#FAF9F5]">
                              <td className="py-2 font-medium text-[#1A1A1A]">{v.param}</td>
                              <td
                                className={`py-2 font-semibold ${
                                  v.flag === 'HIGH' ? 'text-[#8B2C2C]' : 'text-[#1A1A1A]'
                                }`}
                              >
                                {v.value}
                              </td>
                              <td className="py-2 text-black/60">{v.reference}</td>
                              <td className="py-2 text-black/60">{v.unit}</td>
                              <td className="py-2">
                                {v.flag && (
                                  <span className="bg-[#8B2C2C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                    {v.flag}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-3 p-2.5 bg-[#FAF9F5] rounded-lg border border-black/10 text-[12px] text-black/70">
                        <strong>Clinical Impression:</strong> {lab.notes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Imaging */}
            {activeTab === 'imaging' && (
              <div className="p-6 flex flex-col gap-6 animate-in fade-in duration-150">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-serif font-semibold text-[17px] text-[#1A1A1A]">Radiology & Imaging Scans</h3>
                    <p className="text-[12px] text-black/60">High-resolution cranial imaging library</p>
                  </div>
                  <button
                    onClick={() => onShowToast('Full DICOM viewer opened in radiology workstation.', 'info')}
                    className="text-[#1A1A1A] font-medium text-[11px] uppercase tracking-wider border border-black/20 px-3 py-1.5 rounded-lg hover:bg-[#FAF9F5]"
                  >
                    Launch DICOM 3D
                  </button>
                </div>

                {imagingRecords.map((img) => (
                  <div
                    key={img.id}
                    className="border border-black/10 rounded-xl overflow-hidden shadow-2xs flex flex-col md:flex-row"
                  >
                    <div className="md:w-5/12 bg-black flex items-center justify-center p-4">
                      <div className="relative group">
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                          <span className="text-white text-[12px] font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">zoom_in</span> Inspect Scan
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 md:w-7/12 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-semibold text-[16px] text-[#1A1A1A]">{img.title}</h4>
                          <span className="bg-[#FAF9F5] border border-black/15 text-black/80 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                            {img.modality}
                          </span>
                        </div>
                        <p className="text-[11px] text-black/50 mt-1">
                          Date: {img.date} • Region: {img.bodyPart}
                        </p>
                        <div className="mt-3 p-3 bg-[#FAF9F5] rounded-lg border border-black/10">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-black/50 mb-1">
                            Radiologist Findings:
                          </p>
                          <p className="text-[12px] text-black/80 leading-relaxed">{img.findings}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => onShowToast('Exported scan report as signed PDF.', 'success')}
                          className="text-[11px] uppercase tracking-wider font-medium text-[#1A1A1A] border border-black/20 px-3 py-1 rounded-md hover:bg-[#FAF9F5]"
                        >
                          Export Report
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Consultation Action Footer */}
            <div className="p-4 border-t border-black/[0.08] bg-[#FAF9F5] flex flex-wrap justify-between gap-3 items-center">
              <button
                id="print-handout-btn"
                onClick={() => activeAppointment && onOpenPrintModal(currentPatient, activeAppointment)}
                className="text-[12px] font-medium text-black/70 hover:text-black px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">print</span> Print Handout
              </button>

              <div className="flex items-center gap-3">
                <button
                  id="save-draft-btn"
                  onClick={handleSaveDraft}
                  className="text-[11px] uppercase tracking-wider font-semibold text-[#1A1A1A] border border-black/30 px-4 py-2 rounded-lg hover:bg-white active:scale-[0.98] transition-all"
                >
                  Save Draft
                </button>
                <button
                  id="complete-visit-btn"
                  onClick={handleCompleteVisit}
                  className="text-[11px] uppercase tracking-wider font-semibold bg-[#1A1A1A] text-white px-5 py-2 rounded-lg hover:bg-black active:scale-[0.98] transition-all shadow-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  Complete Visit & Prescribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Add Medication Modal */}
      {showAddMedModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-black/10">
            <div className="flex justify-between items-center mb-4 border-b border-black/[0.08] pb-3">
              <h3 className="text-[18px] font-serif font-semibold text-[#1A1A1A]">Add Prescription Item</h3>
              <button
                onClick={() => setShowAddMedModal(false)}
                className="text-black/40 hover:text-black text-lg"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddPrescription} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                  Medication Name *
                </label>
                <input
                  type="text"
                  required
                  value={newMed.medication}
                  onChange={(e) => setNewMed({ ...newMed, medication: e.target.value })}
                  placeholder="e.g. Sumatriptan, Propranolol"
                  className="w-full p-2.5 border border-black/15 rounded-lg text-[13px] focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                  Dosage *
                </label>
                <input
                  type="text"
                  required
                  value={newMed.dosage}
                  onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                  placeholder="e.g. 50mg Tablet, 10mg/mL"
                  className="w-full p-2.5 border border-black/15 rounded-lg text-[13px] focus:border-black outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                    Frequency
                  </label>
                  <input
                    type="text"
                    value={newMed.frequency}
                    onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                    placeholder="e.g. 1 tab PRN, BID"
                    className="w-full p-2.5 border border-black/15 rounded-lg text-[13px] focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newMed.duration}
                    onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                    placeholder="e.g. As needed, 14 days"
                    className="w-full p-2.5 border border-black/15 rounded-lg text-[13px] focus:border-black outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-black/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowAddMedModal(false)}
                  className="px-4 py-2 rounded-lg border border-black/20 text-black/70 font-medium text-[11px] uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#1A1A1A] text-white font-medium text-[11px] uppercase tracking-wider hover:bg-black"
                >
                  Add to Rx Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
