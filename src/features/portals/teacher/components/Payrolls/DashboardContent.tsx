import React from 'react';
import type { MetricData, Transaction, TransactionStatusType } from '../../types';
import { TransactionStatus } from '../../types';

interface Props {
  metrics: MetricData;
  transactions: Transaction[];
}

const DashboardContent: React.FC<Props> = ({ metrics, transactions }) => {
  const getStatusStyle = (status: TransactionStatusType) => {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return 'bg-green-50 text-green-600 border-green-100';
      case TransactionStatus.PENDING:
        return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case TransactionStatus.PROCESSED:
        return 'bg-slate-100 text-slate-500 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-400';
    }
  };

  const getCategoryIcon = (description: string) => {
    if (description.includes('Withdrawal')) return 'arrow_outward';
    if (description.includes('Fees')) return 'school';
    return 'inventory_2';
  };

  const getCategoryColor = (description: string) => {
    if (description.includes('Withdrawal')) return 'bg-blue-50 text-blue-500';
    if (description.includes('Fees')) return 'bg-teal-50 text-teal-600';
    return 'bg-purple-50 text-purple-500';
  };

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Balance Card */}
        <div className="bg-teal-sidebar text-white rounded-3xl p-6 shadow-lg relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div className="absolute left-0 bottom-0 w-24 h-24 bg-teal-400/20 rounded-full -ml-8 -mb-8 blur-xl"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                Available Balance
              </div>
              <button className="text-teal-100 hover:text-white transition-colors">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
            <div className="mt-4">
              <h2 className="text-4xl font-bold tracking-tight">
                ${metrics.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h2>
              <p className="text-sm text-teal-100 mt-1">Last payout on Oct 15, 2023</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 flex gap-4 text-sm font-medium">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_upward</span>
                +12% vs last month
              </div>
            </div>
          </div>
        </div>

        {/* Small Metrics Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 flex items-center gap-4 relative overflow-hidden h-full">
            <div className="size-12 rounded-2xl bg-accent-yellow-bg flex items-center justify-center text-accent-yellow-icon shrink-0">
              <span className="material-symbols-outlined icon-filled">hourglass_top</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Pending Clearance</p>
              <p className="text-2xl font-bold text-slate-800">
                ${metrics.pendingClearance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 flex items-center gap-4 relative overflow-hidden h-full">
            <div className="size-12 rounded-2xl bg-accent-green-bg flex items-center justify-center text-accent-green-icon shrink-0">
              <span className="material-symbols-outlined icon-filled">monetization_on</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Lifetime Earnings</p>
              <p className="text-2xl font-bold text-slate-800">
                ${metrics.lifetimeEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
          <div className="flex items-center gap-2">
            <select className="text-xs border-none bg-slate-50 rounded-lg py-1.5 pl-3 pr-8 shadow-sm focus:ring-0 text-slate-600 font-medium hover:bg-slate-100 transition-colors cursor-pointer">
              <option>All Transactions</option>
              <option>Withdrawals</option>
              <option>Earnings</option>
            </select>
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-teal-sidebar hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-1/4">Date & ID</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-1/3">Description</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-700">{tx.date}</span>
                      <span className="text-xs text-slate-400 font-mono">{tx.id}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${getCategoryColor(tx.description)}`}>
                        <span className="material-symbols-outlined text-sm">{getCategoryIcon(tx.description)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{tx.description}</p>
                        <p className="text-xs text-slate-400">{tx.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ${getStatusStyle(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <span className={`text-sm font-bold ${tx.isCredit ? 'text-green-600' : 'text-slate-800'}`}>
                      {tx.isCredit ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-50 text-center">
          <button className="text-xs font-semibold text-teal-sidebar hover:text-teal-dark transition-colors flex items-center justify-center gap-1 mx-auto">
            View Full History
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
