import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

export interface ClassData {
  id: string;
  classId: number;
  teacherId: string;
  name: string;
  description: string;
  subject: string;
  batch: string;
  maxStudents: number;
  currentStudents: number;
  monthlyFee: number;
  enrolledStudents: string[];
  status: 'active' | 'paused' | 'completed';
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    duration: number;
    timezone: string;
  };
  attendanceRate: number;
  averageScore: number;
  totalSessions: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Create a new class
 */
export const createClass = async (classData: Omit<ClassData, 'id' | 'classId' | 'createdAt' | 'updatedAt'>) => {
  try {
    const createClassFunction = httpsCallable(functions, 'createClass');
    const result = await createClassFunction(classData);

    return result.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

/**
 * Get all classes for a teacher
 */
export const getTeacherClasses = async (teacherId: string): Promise<ClassData[]> => {
  try {
    const q = query(
      collection(db, 'classes'),
      where('teacherId', '==', teacherId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ClassData));
  } catch (error) {
    console.error('Error getting teacher classes:', error);
    throw error;
  }
};

/**
 * Get a specific class by ID
 */
export const getClassById = async (classId: string): Promise<ClassData | null> => {
  try {
    const docRef = doc(db, 'classes', classId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as ClassData;
    }

    return null;
  } catch (error) {
    console.error('Error getting class:', error);
    throw error;
  }
};

/**
 * Update a class
 */
export const updateClass = async (classId: string, updates: Partial<ClassData>) => {
  try {
    const docRef = doc(db, 'classes', classId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

/**
 * Delete a class
 */
export const deleteClass = async (classId: string) => {
  try {
    const docRef = doc(db, 'classes', classId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

/**
 * Get class enrollments
 */
export const getClassEnrollments = async (classId: string) => {
  try {
    const q = query(
      collection(db, 'enrollments'),
      where('classId', '==', classId),
      where('status', '==', 'active'),
      orderBy('enrolledAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting class enrollments:', error);
    throw error;
  }
};
