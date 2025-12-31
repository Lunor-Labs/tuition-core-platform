import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

export interface Transaction {
  id: string;
  userId: string;
  type: 'earning' | 'withdrawal' | 'purchase' | 'refund';
  amount: number;
  currency: string;
  description: string;
  category: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  classId?: string;
  paymentMethod?: {
    type: 'bank' | 'card' | 'wallet';
    lastFour?: string;
    bankName?: string;
  };
  createdAt: Timestamp;
}

export interface EarningsStats {
  totalEarnings: number;
  monthlyEarnings: number;
  availableBalance: number;
  pendingClearance: number;
  totalStudents: number;
  activeClasses: number;
}

/**
 * Calculate and update teacher earnings
 */
export const calculateEarnings = async (teacherId: string): Promise<EarningsStats> => {
  try {
    const calculateEarningsFunction = httpsCallable(functions, 'calculateEarnings');
    const result = await calculateEarningsFunction({ teacherId });

    return result.data as EarningsStats;
  } catch (error) {
    console.error('Error calculating earnings:', error);
    throw error;
  }
};

/**
 * Get teacher transactions
 */
export const getTeacherTransactions = async (
  teacherId: string,
  limit: number = 50
): Promise<Transaction[]> => {
  try {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', teacherId),
      orderBy('createdAt', 'desc')
      // Note: Firestore doesn't support limit with inequality filters
      // We'll handle pagination on the client side
    );

    const querySnapshot = await getDocs(q);
    const transactions = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Transaction))
      .slice(0, limit); // Apply limit client-side

    return transactions;
  } catch (error) {
    console.error('Error getting teacher transactions:', error);
    throw error;
  }
};

/**
 * Process withdrawal request
 */
export const processWithdrawal = async (
  teacherId: string,
  amount: number,
  paymentMethod: {
    type: 'BANK' | 'VISA' | 'MASTERCARD';
    name: string;
    lastFour: string;
  }
) => {
  try {
    const processWithdrawalFunction = httpsCallable(functions, 'processWithdrawal');
    const result = await processWithdrawalFunction({
      teacherId,
      amount,
      paymentMethod
    });

    return result.data;
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    throw error;
  }
};

/**
 * Get earnings summary for dashboard
 */
export const getEarningsSummary = async (teacherId: string) => {
  try {
    // Get recent transactions (last 10)
    const recentTransactions = await getTeacherTransactions(teacherId, 10);

    // Calculate stats from transactions
    const earnings = recentTransactions.filter(t => t.type === 'earning');
    const withdrawals = recentTransactions.filter(t => t.type === 'withdrawal');

    const totalEarnings = earnings.reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.amount, 0);
    const pendingWithdrawals = withdrawals
      .filter(t => t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0);

    const availableBalance = totalEarnings - totalWithdrawals;

    return {
      totalEarnings,
      availableBalance,
      pendingClearance: pendingWithdrawals,
      recentTransactions: recentTransactions.slice(0, 5)
    };
  } catch (error) {
    console.error('Error getting earnings summary:', error);
    throw error;
  }
};

/**
 * Get monthly earnings breakdown
 */
export const getMonthlyEarnings = async (teacherId: string) => {
  try {
    const transactions = await getTeacherTransactions(teacherId, 1000); // Get more for analysis

    const monthlyData: { [key: string]: number } = {};

    transactions
      .filter(t => t.type === 'earning' && t.status === 'completed')
      .forEach(transaction => {
        const date = transaction.createdAt.toDate();
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + transaction.amount;
      });

    return monthlyData;
  } catch (error) {
    console.error('Error getting monthly earnings:', error);
    throw error;
  }
};
