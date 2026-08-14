import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Patient, Doctor, Appointment, Department } from '../types';

interface AppointmentBookingViewProps {
  patients: Patient[];
  doctors: Doctor[];
  departments: Department[];
  onBookAppointment: (appointment: Appointment) => void;
  preselectedPatientId?: string;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AppointmentBookingView: React.FC<AppointmentBookingViewProps> = ({
  patients,
  doctors,
  departments,
  onBookAppointment,
  preselectedPatientId,
  onShowToast,
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState(
    preselectedPatientId || patients[0]?.id || ''
  );
  const [selectedDepartment, setSelectedDepartment] = useState('Neurology');
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [appointmentType, setAppointmentType] = useState<
    'Consultation' | 'Follow-up' | 'Routine Checkup' | 'Lab Review' | 'Pre-Op' | 'Emergency'
  >('Consultation');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:15 AM',
    '01:00 PM',
    '02:00 PM',
    '03:30 PM',
    '04:15 PM',
  ];

  const filteredDoctors = doctors.filter(
    (d) => !selectedDepartment || d.department.toLowerCase() === selectedDepartment.toLowerCase()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const patient = patients.find((p) => p.id === selectedPatientId);
    const doctor = doctors.find((d) => d.id === selectedDoctorId);

    if (!patient || !doctor) {
      onShowToast('Please select both a patient and a doctor.', 'warning');
      return;
    }

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.fullName,
      doctorName: doctor.name,
      department: doctor.department,
      time: selectedTime,
      date: selectedDate,
      status: 'Waiting',
      type: appointmentType,
      chiefComplaint: notes || `${appointmentType} requested by patient.`,
      clinicalNotes: '',
      diagnoses: [],
      prescriptions: [],
      vitals: {
        bp: '120/80',
        hr: 75,
        temp: 98.6,
        spO2: 99,
        takenTimeAgo: 'Just now',
        tempStatus: 'normal',
      },
    };

    onBookAppointment(newAppointment);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    onShowToast(
      `Appointment confirmed for ${patient.fullName} with ${doctor.name} at ${selectedTime}!`,
      'success'
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-10">
      <div className="flex flex-col gap-1 border-b border-black/[0.08] pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">Clinical Calendar</span>
        <h1 className="text-[28px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight">
          Appointment Booking
        </h1>
        <p className="text-[14px] text-black/60 font-sans">
          Schedule patient visits, clinical consultations, and routine specialty checkups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Booking Form (Span 8) */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-8 bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 md:p-8 space-y-6"
        >
          <div className="flex items-center gap-2 border-b border-black/[0.08] pb-3">
            <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">edit_calendar</span>
            <h3 className="text-[17px] font-serif text-[#1A1A1A] font-semibold">Schedule Consultation</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Patient Selector */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Select Patient *
              </label>
              <select
                id="patient-selector"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.id}) — {p.gender}, {p.age} yrs • {p.bloodGroup}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Department *
              </label>
              <select
                id="dept-selector"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.doctorCount} Doctors)
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Assigned Doctor *
              </label>
              <select
                id="doctor-selector"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              >
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty}
                    </option>
                  ))
                ) : (
                  doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} ({doc.department})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Appointment Date *
              </label>
              <input
                id="apt-date-input"
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            {/* Consultation Type */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Appointment Type *
              </label>
              <select
                id="apt-type-selector"
                value={appointmentType}
                onChange={(e) =>
                  setAppointmentType(
                    e.target.value as
                      | 'Consultation'
                      | 'Follow-up'
                      | 'Routine Checkup'
                      | 'Lab Review'
                      | 'Pre-Op'
                      | 'Emergency'
                  )
                }
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              >
                <option value="Consultation">General Consultation</option>
                <option value="Follow-up">Follow-up Visit</option>
                <option value="Routine Checkup">Routine Annual Checkup</option>
                <option value="Lab Review">Laboratory Results Review</option>
                <option value="Pre-Op">Pre-Operative Assessment</option>
                <option value="Emergency">Urgent Care / Priority</option>
              </select>
            </div>

            {/* Time Slots */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-2">
                Available Time Slots *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 px-3 rounded-lg text-[12px] font-medium transition-all border ${
                      selectedTime === slot
                        ? 'bg-[#1A1A1A] text-white border-black shadow-xs'
                        : 'bg-[#FAF9F5] text-[#1A1A1A] border-black/10 hover:bg-black/5'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason / Notes */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Reason for Visit / Clinical Notes
              </label>
              <textarea
                id="apt-notes-input"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe reason for consultation or patient symptoms..."
                className="w-full rounded-lg border border-black/15 bg-white p-3 text-[13px] text-[#1A1A1A] focus:border-black outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-black/[0.08]">
            <button
              id="confirm-booking-btn"
              type="submit"
              className="bg-[#1A1A1A] text-white font-medium text-[11px] uppercase tracking-wider py-2.5 px-6 rounded-lg shadow-sm hover:bg-black active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              Confirm &amp; Schedule Appointment
            </button>
          </div>
        </form>

        {/* Doctor & Clinic Details Sidebar (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Selected Doctor Summary Card */}
          {(() => {
            const doc = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];
            return (
              <div className="bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-5 flex flex-col gap-4">
                <h4 className="text-[15px] font-serif font-semibold text-[#1A1A1A] border-b border-black/[0.08] pb-2">
                  Physician Overview
                </h4>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-black/10 shrink-0">
                    <img
                      src={doc.photoUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-serif font-semibold text-[15px] text-[#1A1A1A]">{doc.name}</h5>
                    <p className="text-[12px] text-black/60">{doc.specialty}</p>
                    <span className="inline-block mt-1 bg-black/5 text-[#1A1A1A] text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border border-black/10">
                      {doc.availability}
                    </span>
                  </div>
                </div>
                <div className="text-[12px] text-black/70 space-y-1.5 bg-[#FAF9F5] p-3 rounded-lg border border-black/10">
                  <div className="flex justify-between">
                    <span className="text-black/50">Department:</span>
                    <span className="font-medium text-[#1A1A1A]">{doc.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/50">Experience:</span>
                    <span className="font-medium text-[#1A1A1A]">{doc.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/50">Total Consultations:</span>
                    <span className="font-medium text-[#1A1A1A]">1,420+</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Appointment Guidelines */}
          <div className="bg-[#FAF9F5] rounded-xl border border-black/10 p-5 flex flex-col gap-2.5">
            <h4 className="text-[13px] font-serif font-semibold text-[#1A1A1A] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-black/60">verified_user</span>
              Hospital Scheduling Policy
            </h4>
            <ul className="text-[12px] text-black/70 space-y-1.5 list-disc pl-4 leading-relaxed font-sans">
              <li>Patients must arrive 15 minutes prior to appointment time for vital checks.</li>
              <li>Emergency triage patients receive immediate clinical priority over standard slots.</li>
              <li>Prescriptions generated during the visit are electronically transmitted to MediCare Pharmacy.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
