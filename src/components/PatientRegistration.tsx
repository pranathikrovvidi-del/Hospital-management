import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Patient } from '../types';

interface PatientRegistrationProps {
  onSavePatient: (patient: Patient, andBook?: boolean) => void;
  onCancel: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const PatientRegistration: React.FC<PatientRegistrationProps> = ({
  onSavePatient,
  onCancel,
  onShowToast,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '' as 'Male' | 'Female' | 'Other' | '',
    bloodGroup: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    country: 'United States',
    zipCode: '',
    emergencyName: '',
    emergencyRel: '',
    emergencyPhone: '',
    existingConditions: '',
    knownAllergies: '',
    currentMedications: '',
    pastMedicalHistory: '',
    insuranceDetails: '',
    photoUrl: '',
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setFormData({ ...formData, photoUrl: url });
      onShowToast('Patient photograph loaded successfully.', 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent, andBook: boolean = false) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      onShowToast('Please provide first and last name.', 'warning');
      return;
    }

    const newId = `PT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const age = formData.dob
      ? Math.max(1, new Date().getFullYear() - new Date(formData.dob).getFullYear())
      : 30;

    const patient: Patient = {
      id: newId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      age: age,
      gender: (formData.gender as 'Male' | 'Female' | 'Other') || 'Other',
      dob: formData.dob || '1995-01-01',
      bloodGroup: formData.bloodGroup || 'O+',
      phone: formData.phone || '+1 (555) 000-0000',
      email: formData.email || `${formData.firstName.toLowerCase()}@example.com`,
      photoUrl: photoPreview || undefined,
      registeredAt: new Date().toISOString().split('T')[0],
      address: {
        street: formData.street || '123 Main St',
        city: formData.city || 'Springfield',
        state: formData.state || 'IL',
        country: formData.country || 'United States',
        zipCode: formData.zipCode || '62701',
      },
      emergencyContact: {
        name: formData.emergencyName || 'Emergency Contact',
        relationship: formData.emergencyRel || 'Relative',
        phone: formData.emergencyPhone || formData.phone || '+1 (555) 000-0000',
      },
      medicalInfo: {
        existingConditions: formData.existingConditions || 'None reported',
        knownAllergies: formData.knownAllergies
          ? formData.knownAllergies.split(',').map((s) => s.trim())
          : [],
        currentMedications: formData.currentMedications || 'None reported',
        pastMedicalHistory: formData.pastMedicalHistory || 'No major history',
        insuranceDetails: formData.insuranceDetails || 'Self-pay',
      },
    };

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
    });

    onSavePatient(patient, andBook);
    onShowToast(`Patient ${patient.fullName} successfully registered! ID: ${newId}`, 'success');
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-1 border-b border-black/[0.08] pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-black/50 font-sans font-semibold">Patient Intake</span>
        <h1 className="text-[28px] md:text-[36px] font-serif text-[#1A1A1A] tracking-tight">
          Patient Registration
        </h1>
        <p className="text-[14px] text-black/60 font-sans">Register a new patient encounter into the clinical health index.</p>
      </div>

      {/* Main Registration Form */}
      <form
        onSubmit={(e) => handleSubmit(e, false)}
        className="bg-white rounded-xl border border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] p-6 md:p-8 space-y-8"
      >
        {/* Section 1: Personal Information */}
        <section>
          <div className="flex items-center gap-2 mb-5 border-b border-black/[0.08] pb-2">
            <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">person</span>
            <h3 className="text-[17px] font-serif text-[#1A1A1A] font-semibold">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Upload photograph */}
            <div className="lg:col-span-3 flex items-center gap-4 mb-2">
              <label
                htmlFor="patient-photo-input"
                className="w-20 h-20 rounded-lg bg-[#FAF9F5] border border-dashed border-black/20 flex flex-col items-center justify-center text-black/60 cursor-pointer hover:bg-black/5 transition-colors relative overflow-hidden group shrink-0"
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px] mb-0.5">add_a_photo</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Upload</span>
                  </>
                )}
                <input
                  id="patient-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <div>
                <p className="text-[12px] font-medium text-[#1A1A1A]">Upload patient portrait</p>
                <p className="text-[11px] text-black/50">Max 2MB. JPG, PNG or WebP.</p>
              </div>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                First Name *
              </label>
              <input
                id="first-name-input"
                type="text"
                required
                placeholder="e.g. John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Last Name *
              </label>
              <input
                id="last-name-input"
                type="text"
                required
                placeholder="e.g. Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Date of Birth *
              </label>
              <input
                id="dob-input"
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">Gender *</label>
              <select
                id="gender-select"
                required
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as 'Male' | 'Female' | 'Other',
                  })
                }
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Blood Group
              </label>
              <select
                id="blood-group-select"
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                id="phone-input"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            {/* Email Address */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                id="email-input"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Address Details */}
        <section>
          <div className="flex items-center gap-2 mb-5 border-b border-black/[0.08] pb-2">
            <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">location_on</span>
            <h3 className="text-[17px] font-serif text-[#1A1A1A] font-semibold">Address Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="md:col-span-2 lg:col-span-4">
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Street Address *
              </label>
              <input
                id="street-input"
                type="text"
                required
                placeholder="123 Main St, Apt 4B"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">City *</label>
              <input
                id="city-input"
                type="text"
                required
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                State/Province *
              </label>
              <input
                id="state-input"
                type="text"
                required
                placeholder="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">Country *</label>
              <input
                id="country-input"
                type="text"
                required
                placeholder="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                PIN / Zip Code *
              </label>
              <input
                id="zip-input"
                type="text"
                required
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Emergency Contact */}
        <section>
          <div className="flex items-center gap-2 mb-5 border-b border-black/[0.08] pb-2">
            <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">contact_phone</span>
            <h3 className="text-[17px] font-serif text-[#1A1A1A] font-semibold">Emergency Contact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Contact Name *
              </label>
              <input
                id="emergency-name-input"
                type="text"
                required
                placeholder="Jane Doe"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Relationship *
              </label>
              <input
                id="emergency-rel-input"
                type="text"
                required
                placeholder="e.g. Spouse, Parent"
                value={formData.emergencyRel}
                onChange={(e) => setFormData({ ...formData, emergencyRel: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                id="emergency-phone-input"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>
          </div>
        </section>

        {/* Section 4: Medical Information */}
        <section>
          <div className="flex items-center gap-2 mb-5 border-b border-black/[0.08] pb-2">
            <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">medical_information</span>
            <h3 className="text-[17px] font-serif text-[#1A1A1A] font-semibold">Medical Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Existing Conditions
              </label>
              <textarea
                id="existing-conditions-input"
                rows={3}
                placeholder="List any chronic conditions..."
                value={formData.existingConditions}
                onChange={(e) => setFormData({ ...formData, existingConditions: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-[13px] text-[#1A1A1A] focus:border-black outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Known Allergies
              </label>
              <textarea
                id="known-allergies-input"
                rows={3}
                placeholder="List any known allergies (medications, food, etc)..."
                value={formData.knownAllergies}
                onChange={(e) => setFormData({ ...formData, knownAllergies: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-[13px] text-[#1A1A1A] focus:border-black outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Current Medications
              </label>
              <textarea
                id="current-medications-input"
                rows={3}
                placeholder="List current medications and dosages..."
                value={formData.currentMedications}
                onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-[13px] text-[#1A1A1A] focus:border-black outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Past Medical History
              </label>
              <textarea
                id="past-medical-history-input"
                rows={3}
                placeholder="Brief overview of past major medical events/surgeries..."
                value={formData.pastMedicalHistory}
                onChange={(e) => setFormData({ ...formData, pastMedicalHistory: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-[13px] text-[#1A1A1A] focus:border-black outline-none resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1">
                Insurance Details
              </label>
              <input
                id="insurance-details-input"
                type="text"
                placeholder="Provider name and Policy Number"
                value={formData.insuranceDetails}
                onChange={(e) => setFormData({ ...formData, insuranceDetails: e.target.value })}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-black outline-none"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-black/[0.08]">
          <button
            id="cancel-registration-btn"
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg font-medium text-[11px] uppercase tracking-wider border border-black/20 text-black/70 hover:bg-black/5 transition-colors"
          >
            Cancel
          </button>
          <button
            id="save-patient-btn"
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            className="px-5 py-2 rounded-lg font-medium text-[11px] uppercase tracking-wider border border-black text-[#1A1A1A] hover:bg-black/5 transition-all shadow-2xs"
          >
            Save Patient
          </button>
          <button
            id="save-and-book-btn"
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="px-6 py-2 rounded-lg font-medium text-[11px] uppercase tracking-wider bg-[#1A1A1A] text-white shadow-sm hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">event_available</span>
            Save &amp; Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};
