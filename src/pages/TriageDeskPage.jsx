import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatINR } from '../engine/financialEngine';

export default function TriageDeskPage() {
  const navigate = useNavigate();
  const { language, t, applications, updateApplicationStatus, setBeneficiaryName, setMarginMoney } = useApp();
  const [filter, setFilter] = useState('all'); // 'all' | 'approved' | 'pending' | 'review'
  const [selectedApp, setSelectedApp] = useState(null);

  const filteredApps = applications.filter(app => {
    if (filter === 'all') return true;
    return app.statusCategory === filter;
  });

  const handleApprove = (appId) => {
    updateApplicationStatus(appId, 'Pre-Sanction Approved by SCA', 'approved');
  };

  const handleScheduleVisit = (appId) => {
    updateApplicationStatus(appId, 'Field Verification Scheduled (16 Sep 2026)', 'pending');
  };

  const handleInspectDocket = (app) => {
    setBeneficiaryName(app.applicantName.split(' ')[0]);
    setMarginMoney(app.marginCommitted);
    navigate('/report');
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-16 bg-[#fbf9f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* TOP HEADER */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#e4e2dc]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#03251d] text-white font-mono text-xs px-2.5 py-0.5 rounded font-semibold">
                  SCA DESK 2026
                </span>
                <span className="bg-[#c7eadd] text-[#03251d] text-xs px-2.5 py-0.5 rounded font-bold">
                  Telangana State Channelising Agency
                </span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#03251d]">
                {t.triageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[#414845] mt-1">
                {t.triageSub}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#414845]">Officer:</span>
              <div className="flex items-center gap-2 bg-[#f6f4ed] px-3.5 py-2 rounded-xl border border-[#e4e2dc]">
                <div className="w-8 h-8 rounded-full bg-[#1b3b32] text-white text-xs font-bold flex items-center justify-center">
                  KS
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-[#1b1c18] block">K. Sharma</span>
                  <span className="text-[10px] text-[#8a5100] block">District Prerak Lead</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="p-3.5 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc]">
              <span className="text-xs text-[#717975] block">Total Applications in Queue</span>
              <strong className="text-2xl font-bold text-[#03251d] block mt-0.5">42 Active</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-[#c7eadd]/30 border border-[#abcec1]">
              <span className="text-xs text-[#03251d] block">Algorithmic Pre-Approved</span>
              <strong className="text-2xl font-bold text-[#03251d] block mt-0.5">28 Cases</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-[#ffdcbd]/40 border border-[#ffb15b]">
              <span className="text-xs text-[#744300] block">Field Visit Pending</span>
              <strong className="text-2xl font-bold text-[#8a5100] block mt-0.5">9 Visits</strong>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f6f4ed] border border-[#e4e2dc]">
              <span className="text-xs text-[#717975] block">Sanction Ratio</span>
              <strong className="text-2xl font-bold text-[#45655a] block mt-0.5">91.4%</strong>
            </div>
          </div>
        </section>

        {/* APPLICATION QUEUE */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e4e2dc] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e4e2dc]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#03251d] text-xl">view_list</span>
              <h2 className="font-serif font-bold text-lg text-[#03251d]">
                Operational Applicant Pipeline
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#f6f4ed] p-1 rounded-xl border border-[#e4e2dc]">
              {[
                { id: 'all', label: t.allApplications },
                { id: 'approved', label: t.approvedFilter },
                { id: 'pending', label: t.pendingFilter },
                { id: 'review', label: t.reviewFilter }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filter === f.id
                      ? 'bg-[#03251d] text-white shadow-xs'
                      : 'text-[#414845] hover:text-[#1b1c18]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f6f4ed] text-[#414845] uppercase tracking-wider font-semibold border-b border-[#e4e2dc]">
                <tr>
                  <th className="py-3 px-4">{t.applicantNameCol}</th>
                  <th className="py-3 px-4">{t.villageCol}</th>
                  <th className="py-3 px-4">{t.businessCol}</th>
                  <th className="py-3 px-4">{t.schemeCol}</th>
                  <th className="py-3 px-4">{t.dscrCol}</th>
                  <th className="py-3 px-4">Status &amp; Verification</th>
                  <th className="py-3 px-4 text-right">{t.actionsCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e2dc]/60">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-[#f6f4ed]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <strong className="text-sm font-bold text-[#1b1c18] block">{app.applicantName}</strong>
                      <span className="text-[11px] text-[#8a5100]">{app.community}</span>
                      <span className="text-[10px] font-mono text-[#717975] block mt-0.5">{app.id}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#1b1c18] block">{app.village}</span>
                      <span className="text-[11px] font-mono text-[#45655a]">LGD: {app.lgdCode}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#03251d] block">{app.proposedBusiness}</span>
                      <span className="text-[11px] text-[#414845]">
                        Margin: {formatINR(app.marginCommitted)} · Cost: {formatINR(app.projectCost)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#1b1c18] block">{app.schemeRouted}</span>
                      <span className="text-[11px] font-bold text-[#8a5100]">{app.interestRate}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-sm text-[#03251d] block">{app.dscr}x</span>
                      <span className="text-[10px] font-semibold text-[#45655a]">Safe Coverage</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1 ${
                          app.statusCategory === 'approved'
                            ? 'bg-[#c7eadd] text-[#03251d]'
                            : app.statusCategory === 'pending'
                            ? 'bg-[#ffdcbd] text-[#744300]'
                            : 'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}
                      >
                        {app.status}
                      </span>
                      <span className="text-[10px] text-[#717975] block">
                        Visit: {app.fieldVisitDate}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleInspectDocket(app)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#eae8e1] hover:bg-[#e4e2dc] text-[#03251d] text-[11px] font-semibold transition-colors"
                          title="View Full Docket"
                        >
                          Docket
                        </button>
                        {app.statusCategory !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleApprove(app.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#03251d] hover:bg-[#1b3b32] text-white text-[11px] font-bold transition-colors"
                            title="Approve Pre-Sanction"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
