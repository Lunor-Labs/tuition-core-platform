import React, { useState } from 'react';
import type { PaymentMethod } from '../../types';

interface Props {
  balance: number;
  paymentMethods: PaymentMethod[];
}

const WithdrawPanel: React.FC<Props> = ({ balance, paymentMethods }) => {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]?.id);
  const [amount, setAmount] = useState<string>('');

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) < 50) {
      alert("Minimum withdrawal is $50.00");
      return;
    }
    alert(`Initiating withdrawal of $${amount} to ${paymentMethods.find(p => p.id === selectedMethod)?.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-sidebar">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Withdraw Funds</h3>
            <p className="text-xs text-slate-400">Transfer to your bank</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Amount to Withdraw</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">$</span>
              <input
                className="w-full text-lg font-bold rounded-xl border-slate-200 bg-page-bg pl-8 py-2.5 focus:border-teal-sidebar focus:ring-0 placeholder:text-slate-300 text-slate-800"
                placeholder="0.00"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="absolute right-2 top-2 text-[10px] font-bold bg-white px-2 py-1 rounded-md text-teal-sidebar shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors"
                type="button"
                onClick={() => setAmount(balance.toFixed(2))}
              >
                MAX
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 flex justify-between">
              <span>Available: ${balance.toLocaleString()}</span>
              <span>Min: $50.00</span>
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Select Method</label>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedMethod === method.id
                    ? 'border-teal-sidebar bg-teal-50/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 group'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      checked={selectedMethod === method.id}
                      className="text-teal-sidebar focus:ring-teal-sidebar border-slate-300"
                      name="method"
                      type="radio"
                      onChange={() => setSelectedMethod(method.id)}
                    />
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${selectedMethod === method.id ? 'text-slate-500' : 'text-slate-400'}`}>
                        {method.type === 'BANK' ? 'account_balance' : 'credit_card'}
                      </span>
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold ${selectedMethod === method.id ? 'text-slate-700' : 'text-slate-600 group-hover:text-slate-800'}`}>
                          {method.name}
                        </span>
                        <span className="text-[10px] text-slate-400">**** {method.lastFour}</span>
                      </div>
                    </div>
                  </div>
                  {selectedMethod === method.id && (
                    <span className="material-symbols-outlined text-teal-sidebar text-sm">check_circle</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <hr className="border-slate-100 my-2"/>
          <div className="bg-blue-50 rounded-xl p-3 flex gap-3 items-start">
            <span className="material-symbols-outlined text-blue-400 text-sm mt-0.5">info</span>
            <p className="text-[10px] text-blue-600 leading-tight">Withdrawals to bank accounts typically take 1-3 business days to process.</p>
          </div>

          <button
            className="w-full py-3 bg-teal-sidebar text-white rounded-xl font-medium shadow-md hover:bg-teal-dark transition-colors flex items-center justify-center gap-2 mt-2"
            type="button"
            onClick={handleWithdraw}
          >
            Initiate Withdrawal
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800">Payment Methods</h4>
          <button className="text-teal-sidebar hover:bg-teal-50 rounded-full p-1 transition-colors">
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between text-xs text-slate-600 py-2 border-b last:border-none border-slate-50">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-5 rounded flex items-center justify-center text-[8px] font-bold ${method.type === 'BANK' ? 'bg-slate-200 text-slate-500' : 'bg-slate-800 text-white'}`}>
                  {method.type}
                </div>
                <span>{method.name} **** {method.lastFour}</span>
              </div>
              {method.isPrimary ? (
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[9px] font-bold">PRIMARY</span>
              ) : (
                <button className="text-slate-400 hover:text-red-400 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithdrawPanel;
