import React, { useState } from 'react';

interface ContactSupportViewProps {
  onShowToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ContactSupportView: React.FC<ContactSupportViewProps> = ({ onShowToast }) => {
  const [ticket, setTicket] = useState({
    name: '',
    department: 'Cardiology',
    priority: 'Standard',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(`Support ticket #${Math.floor(10000 + Math.random() * 90000)} dispatched to IT/Clinical Engineering.`, 'success');
    setTicket({ name: '', department: 'Cardiology', priority: 'Standard', subject: '', message: '' });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto animate-in fade-in duration-200 pb-10">
      <div>
        <h1 className="text-[28px] md:text-[32px] font-serif font-semibold text-[#1A1A1A] tracking-tight">
          Hospital Contact &amp; Clinical Support
        </h1>
        <p className="text-[14px] text-black/60 font-sans mt-0.5">
          Hospital directory, on-call paging, engineering support, and helpdesk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-white rounded-2xl border border-black/10 shadow-2xs p-6 md:p-8 space-y-4"
        >
          <h3 className="text-[17px] font-serif font-semibold text-[#1A1A1A] border-b border-black/10 pb-3">
            Submit Support Request
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1 font-sans">Your Name</label>
              <input
                type="text"
                required
                value={ticket.name}
                onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
                placeholder="Dr. Sarah Johnson"
                className="w-full p-2.5 border border-black/15 rounded-lg text-[13px] bg-[#FAF9F5] outline-none focus:border-black font-sans"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1 font-sans">Department</label>
              <select
                value={ticket.department}
                onChange={(e) => setTicket({ ...ticket, department: e.target.value })}
                className="w-full p-2.5 border border-black/15 rounded-lg text-[13px] bg-[#FAF9F5] outline-none focus:border-black font-sans"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Emergency">Emergency</option>
                <option value="Radiology">Radiology</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1 font-sans">Subject</label>
            <input
              type="text"
              required
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
              placeholder="e.g. PACS integration sync delay"
              className="w-full p-2.5 border border-black/15 rounded-lg text-[13px] bg-[#FAF9F5] outline-none focus:border-black font-sans"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-black/60 uppercase tracking-wider mb-1 font-sans">Issue Description</label>
            <textarea
              rows={4}
              required
              value={ticket.message}
              onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
              placeholder="Provide specific details..."
              className="w-full p-2.5 border border-black/15 rounded-lg text-[13px] bg-[#FAF9F5] outline-none focus:border-black resize-none font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] text-white font-medium py-2.5 rounded-lg hover:bg-black transition-colors text-[12px] uppercase tracking-wider font-sans"
          >
            Dispatch Ticket to IT Helpdesk
          </button>
        </form>

        {/* Rapid Directory */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-black/10 shadow-2xs p-5">
            <h3 className="text-[16px] font-serif font-semibold text-[#1A1A1A] mb-3">Key Hospital Extensions</h3>
            <div className="space-y-2.5 text-[12px]">
              <div className="flex justify-between items-center p-2.5 bg-[#FAF9F5] border border-black/5 rounded-lg">
                <span className="font-medium text-[#1A1A1A]">Emergency Command Center</span>
                <span className="font-mono font-bold text-[#1A1A1A]">Ext. 911 / 999</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-[#FAF9F5] border border-black/5 rounded-lg">
                <span className="font-medium text-[#1A1A1A]">Central Laboratory Desk</span>
                <span className="font-mono font-medium text-black/70">Ext. 4021</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-[#FAF9F5] border border-black/5 rounded-lg">
                <span className="font-medium text-[#1A1A1A]">Pharmacy Dispense Station</span>
                <span className="font-mono font-medium text-black/70">Ext. 4055</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-[#FAF9F5] border border-black/5 rounded-lg">
                <span className="font-medium text-[#1A1A1A]">Radiology PACS Support</span>
                <span className="font-mono font-medium text-black/70">Ext. 3088</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] text-white rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-white/80 text-[20px]">location_on</span>
              <h4 className="font-serif font-semibold text-[15px]">MediCare Hospital Campus</h4>
            </div>
            <p className="text-[12px] text-white/70 leading-relaxed font-sans">
              742 Evergreen Healthcare Blvd, Medical District, Springfield, IL 62701
            </p>
            <p className="text-[12px] text-white/90 mt-2 font-medium font-sans">
              General Inquiries: +1 (800) 555-CARE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
