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

export interface StudyPack {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  lessonsCount?: number;
  pdfCount?: number;
  videoDuration?: string;
  hasQuiz: boolean;
  hasCode: boolean;
  hasDiagrams: boolean;
  hasTheory: boolean;
  hasExercises: boolean;
  creatorId: string;
  salesCount: number;
  revenue: number;
  averageRating: number;
  reviewCount: number;
  status: 'draft' | 'published' | 'archived';
  contentUrls: string[];
  thumbnailUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Create a new study pack
 */
export const createStudyPack = async (packData: Omit<StudyPack, 'id' | 'salesCount' | 'revenue' | 'averageRating' | 'reviewCount' | 'createdAt' | 'updatedAt'>) => {
  try {
    const createStudyPackFunction = httpsCallable(functions, 'createStudyPack');
    const result = await createStudyPackFunction(packData);

    return result.data;
  } catch (error) {
    console.error('Error creating study pack:', error);
    throw error;
  }
};

/**
 * Get all study packs for a teacher
 */
export const getTeacherStudyPacks = async (teacherId: string): Promise<StudyPack[]> => {
  try {
    const q = query(
      collection(db, 'studyPacks'),
      where('creatorId', '==', teacherId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as StudyPack));
  } catch (error) {
    console.error('Error getting teacher study packs:', error);
    throw error;
  }
};

/**
 * Get a specific study pack by ID
 */
export const getStudyPackById = async (packId: string): Promise<StudyPack | null> => {
  try {
    const docRef = doc(db, 'studyPacks', packId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as StudyPack;
    }

    return null;
  } catch (error) {
    console.error('Error getting study pack:', error);
    throw error;
  }
};

/**
 * Update a study pack
 */
export const updateStudyPack = async (packId: string, updates: Partial<StudyPack>) => {
  try {
    const docRef = doc(db, 'studyPacks', packId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating study pack:', error);
    throw error;
  }
};

/**
 * Delete a study pack
 */
export const deleteStudyPack = async (packId: string) => {
  try {
    const docRef = doc(db, 'studyPacks', packId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting study pack:', error);
    throw error;
  }
};

/**
 * Get study pack analytics
 */
export const getStudyPackAnalytics = async (teacherId: string) => {
  try {
    const studyPacks = await getTeacherStudyPacks(teacherId);

    const totalPacks = studyPacks.length;
    const publishedPacks = studyPacks.filter(p => p.status === 'published').length;
    const totalRevenue = studyPacks.reduce((sum, pack) => sum + pack.revenue, 0);
    const totalSales = studyPacks.reduce((sum, pack) => sum + pack.salesCount, 0);

    // Get recent sales (mock data - in real app, you'd track purchases)
    const recentSales = Math.floor(Math.random() * 50) + 10;

    return {
      totalPacks,
      publishedPacks,
      totalRevenue,
      totalSales,
      recentSales,
      averageRating: studyPacks.length > 0
        ? studyPacks.reduce((sum, pack) => sum + pack.averageRating, 0) / studyPacks.length
        : 0
    };
  } catch (error) {
    console.error('Error getting study pack analytics:', error);
    throw error;
  }
};
