import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';
import { Request, Response } from 'express';

// Initialize Firebase Admin
admin.initializeApp();

// CORS configuration
const corsHandler = cors({ origin: true });


// ============================================================================
// TEACHER PORTAL BACKEND FUNCTIONS
// ============================================================================

/**
 * Generate sequential user ID for new users
 * POST /generateUserId
 * Body: { role: 'student' | 'teacher' }
 */
export const generateUserId = functions.https.onRequest((request: Request, response: Response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    try {
      const { role } = request.body;

      if (!role || !['student', 'teacher'].includes(role)) {
        response.status(400).json({
          success: false,
          message: 'Role is required and must be either "student" or "teacher"'
        });
        return;
      }

      // Determine which counter to use
      const counterType = role === 'student' ? 'studentId' : 'teacherId';
      const prefix = role === 'student' ? 'STU' : 'TCH';

      // Generate sequential ID
      const counterRef = admin.firestore().collection('counters').doc(counterType);
      const counterDoc = await counterRef.get();

      if (!counterDoc.exists) {
        response.status(500).json({
          success: false,
          message: `Counter ${counterType} not initialized. Please run database initialization.`
        });
        return;
      }

      const currentCount = counterDoc.data()?.count || 0;
      const newId = currentCount + 1;

      // Update counter
      await counterRef.set({ count: newId }, { merge: true });

      // Format display ID
      const displayId = role === 'student'
        ? `${prefix}-${newId.toString().padStart(7, '0')}` // STU-2024001
        : `${prefix}-${newId.toString().padStart(4, '0')}`; // TCH-0001

      response.json({
        success: true,
        userId: newId,
        displayId: displayId,
        role: role
      });

    } catch (error: any) {
      console.error('Error generating user ID:', error);
      response.status(500).json({
        success: false,
        message: error.message || 'Failed to generate user ID'
      });
    }
  });
});

/**
 * Create a new class
 * POST /createClass
 * Body: { teacherId, name, description, subject, batch, maxStudents, monthlyFee, schedule }
 */
export const createClass = functions.https.onRequest((request: Request, response: Response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    try {
      const {
        teacherId,
        name,
        description,
        subject,
        batch,
        maxStudents,
        monthlyFee,
        schedule
      } = request.body;

      if (!teacherId || !name || !subject) {
        response.status(400).json({
          success: false,
          message: 'Teacher ID, name, and subject are required'
        });
        return;
      }

      // Generate sequential class ID
      const counterRef = admin.firestore().collection('counters').doc('classId');
      const counterDoc = await counterRef.get();
      const currentCount = counterDoc.exists ? counterDoc.data()?.count || 0 : 0;
      const classId = currentCount + 1;

      // Update counter
      await counterRef.set({ count: classId }, { merge: true });

      // Create class document
      // Create class document
      const classDocRef = admin.firestore().collection('classes').doc();
      const classData = {
        id: classDocRef.id, // UUID for internal use
        classId: classId, // Sequential display ID
        teacherId,
        name,
        description: description || '',
        subject,
        batch: batch || new Date().getFullYear().toString(),
        maxStudents: maxStudents || 30,
        currentStudents: 0,
        monthlyFee: monthlyFee || 0,
        enrolledStudents: [],
        status: 'active',
        schedule: schedule || {},
        attendanceRate: 0,
        averageScore: 0,
        totalSessions: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      await classDocRef.set(classData);

      response.json({
        success: true,
        classId: classDocRef.id,
        displayId: classId,
        data: classData
      });

    } catch (error: any) {
      console.error('Error creating class:', error);
      response.status(500).json({
        success: false,
        message: error.message || 'Failed to create class'
      });
    }
  });
});

/**
 * Process student enrollment
 * POST /enrollStudent
 * Body: { studentId, classId, paymentMethod }
 */
export const enrollStudent = functions.https.onRequest((request: Request, response: Response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    try {
      const { studentId, classId, paymentMethod } = request.body;

      if (!studentId || !classId) {
        response.status(400).json({
          success: false,
          message: 'Student ID and Class ID are required'
        });
        return;
      }

      const db = admin.firestore();

      // Get class details
      const classRef = db.collection('classes').where('id', '==', classId);
      const classSnapshot = await classRef.get();

      if (classSnapshot.empty) {
        response.status(404).json({ success: false, message: 'Class not found' });
        return;
      }

      const classData = classSnapshot.docs[0].data();

      // Check if class is full
      if (classData.currentStudents >= classData.maxStudents) {
        response.status(400).json({ success: false, message: 'Class is full' });
        return;
      }

      // Check if student is already enrolled
      if (classData.enrolledStudents.includes(studentId)) {
        response.status(400).json({ success: false, message: 'Student already enrolled' });
        return;
      }

      // Generate enrollment ID
      const counterRef = db.collection('counters').doc('enrollmentId');
      const counterDoc = await counterRef.get();
      const currentCount = counterDoc.exists ? counterDoc.data()?.count || 0 : 0;
      const enrollmentId = currentCount + 1;

      await counterRef.set({ count: enrollmentId }, { merge: true });

      // Create enrollment
      const enrollmentData = {
        id: db.collection('enrollments').doc().id,
        enrollmentId,
        studentId,
        classId,
        teacherId: classData.teacherId,
        enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'active',
        progress: {
          completedLessons: [],
          overallProgress: 0,
          timeSpent: 0,
          lastAccessedAt: null
        },
        paymentId: null,
        monthlyFee: classData.monthlyFee
      };

      const enrollmentRef = db.collection('enrollments').doc();
      await enrollmentRef.set(enrollmentData);

      // Update class
      await classSnapshot.docs[0].ref.update({
        enrolledStudents: admin.firestore.FieldValue.arrayUnion(studentId),
        currentStudents: admin.firestore.FieldValue.increment(1),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Create transaction record
      const transactionData = {
        id: db.collection('transactions').doc().id,
        userId: studentId,
        type: 'purchase',
        amount: classData.monthlyFee,
        currency: 'LKR',
        description: `Enrollment in ${classData.name}`,
        category: 'Class Enrollment',
        classId,
        status: 'completed',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      await db.collection('transactions').add(transactionData);

      response.json({
        success: true,
        enrollmentId: enrollmentRef.id,
        displayId: enrollmentId,
        data: enrollmentData
      });

    } catch (error: any) {
      console.error('Error enrolling student:', error);
      response.status(500).json({
        success: false,
        message: error.message || 'Failed to enroll student'
      });
    }
  });
});

/**
 * Process teacher withdrawal
 * POST /processWithdrawal
 * Body: { teacherId, amount, paymentMethod }
 */
export const processWithdrawal = functions.https.onRequest((request: Request, response: Response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    try {
      const { teacherId, amount, paymentMethod } = request.body;

      if (!teacherId || !amount || !paymentMethod) {
        response.status(400).json({
          success: false,
          message: 'Teacher ID, amount, and payment method are required'
        });
        return;
      }

      const db = admin.firestore();

      // Check teacher's available balance
      const teacherRef = db.collection('users').doc(teacherId);
      const teacherDoc = await teacherRef.get();

      if (!teacherDoc.exists) {
        response.status(404).json({ success: false, message: 'Teacher not found' });
        return;
      }

      const teacherData = teacherDoc.data();
      const availableBalance = teacherData?.teacherProfile?.availableBalance || 0;

      if (availableBalance < amount) {
        response.status(400).json({ success: false, message: 'Insufficient balance' });
        return;
      }

      // Check minimum withdrawal
      if (amount < 50) {
        response.status(400).json({ success: false, message: 'Minimum withdrawal is $50' });
        return;
      }

      // Create withdrawal transaction
      const transactionData = {
        id: db.collection('transactions').doc().id,
        userId: teacherId,
        type: 'withdrawal',
        amount: amount,
        currency: 'LKR',
        description: `Withdrawal to ${paymentMethod.name}`,
        category: `To: **** ${paymentMethod.lastFour}`,
        status: 'pending', // Will be updated when processed
        paymentMethod,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      await db.collection('transactions').add(transactionData);

      // Update teacher balance (subtract pending amount)
      await teacherRef.update({
        'teacherProfile.availableBalance': admin.firestore.FieldValue.increment(-amount),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      response.json({
        success: true,
        message: 'Withdrawal request submitted successfully',
        transactionId: transactionData.id
      });

    } catch (error: any) {
      console.error('Error processing withdrawal:', error);
      response.status(500).json({
        success: false,
        message: error.message || 'Failed to process withdrawal'
      });
    }
  });
});

/**
 * Calculate teacher earnings and update dashboard stats
 * POST /calculateEarnings
 * Body: { teacherId }
 */
export const calculateEarnings = functions.https.onRequest((request: Request, response: Response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    try {
      const { teacherId } = request.body;

      if (!teacherId) {
        response.status(400).json({
          success: false,
          message: 'Teacher ID is required'
        });
        return;
      }

      const db = admin.firestore();

      // Get all enrollments for this teacher
      const enrollmentsRef = db.collection('enrollments').where('teacherId', '==', teacherId);
      const enrollmentsSnapshot = await enrollmentsRef.get();

      let totalEarnings = 0;
      let monthlyEarnings = 0;
      let totalStudents = 0;
      let activeClasses = 0;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      enrollmentsSnapshot.forEach(doc => {
        const enrollment = doc.data();
        if (enrollment.status === 'active') {
          totalEarnings += enrollment.monthlyFee || 0;
          totalStudents++;

          // Check if enrollment is from current month
          const enrolledAt = enrollment.enrolledAt?.toDate();
          if (enrolledAt && enrolledAt.getMonth() === currentMonth && enrolledAt.getFullYear() === currentYear) {
            monthlyEarnings += enrollment.monthlyFee || 0;
          }
        }
      });

      // Get teacher's classes count
      const classesRef = db.collection('classes').where('teacherId', '==', teacherId);
      const classesSnapshot = await classesRef.get();

      classesSnapshot.forEach(doc => {
        const classData = doc.data();
        if (classData.status === 'active') {
          activeClasses++;
        }
      });

      // Get pending withdrawals
      const pendingWithdrawalsRef = db.collection('transactions')
        .where('userId', '==', teacherId)
        .where('type', '==', 'withdrawal')
        .where('status', '==', 'pending');

      const pendingSnapshot = await pendingWithdrawalsRef.get();
      let pendingAmount = 0;

      pendingSnapshot.forEach(doc => {
        pendingAmount += doc.data().amount || 0;
      });

      const availableBalance = totalEarnings - pendingAmount;

      // Update teacher profile
      await db.collection('users').doc(teacherId).update({
        'teacherProfile.totalEarnings': totalEarnings,
        'teacherProfile.monthlyEarnings': monthlyEarnings,
        'teacherProfile.availableBalance': availableBalance,
        'teacherProfile.totalStudents': totalStudents,
        'teacherProfile.activeClasses': activeClasses,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      response.json({
        success: true,
        stats: {
          totalEarnings,
          monthlyEarnings,
          availableBalance,
          pendingClearance: pendingAmount,
          totalStudents,
          activeClasses
        }
      });

    } catch (error: any) {
      console.error('Error calculating earnings:', error);
      response.status(500).json({
        success: false,
        message: error.message || 'Failed to calculate earnings'
      });
    }
  });
});

/**
 * Create study pack
 * POST /createStudyPack
 * Body: { teacherId, title, description, category, price, contentUrls }
 */
export const createStudyPack = functions.https.onRequest((request: Request, response: Response) => {
  corsHandler(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    try {
      const {
        teacherId,
        title,
        description,
        category,
        price,
        currency,
        lessonsCount,
        pdfCount,
        videoDuration,
        hasQuiz,
        hasCode,
        hasDiagrams,
        hasTheory,
        hasExercises,
        contentUrls
      } = request.body;

      if (!teacherId || !title || !category) {
        response.status(400).json({
          success: false,
          message: 'Teacher ID, title, and category are required'
        });
        return;
      }

      const db = admin.firestore();

      // Create study pack document
      const studyPackData = {
        id: db.collection('studyPacks').doc().id,
        title,
        description: description || '',
        category,
        price: price || 0,
        currency: currency || 'LKR',
        lessonsCount: lessonsCount || 0,
        pdfCount: pdfCount || 0,
        videoDuration: videoDuration || '',
        hasQuiz: hasQuiz || false,
        hasCode: hasCode || false,
        hasDiagrams: hasDiagrams || false,
        hasTheory: hasTheory || false,
        hasExercises: hasExercises || false,
        creatorId: teacherId,
        salesCount: 0,
        averageRating: 0,
        reviewCount: 0,
        status: 'published',
        contentUrls: contentUrls || [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const studyPackRef = db.collection('studyPacks').doc();
      await studyPackRef.set(studyPackData);

      response.json({
        success: true,
        studyPackId: studyPackRef.id,
        data: studyPackData
      });

    } catch (error: any) {
      console.error('Error creating study pack:', error);
      response.status(500).json({
        success: false,
        message: error.message || 'Failed to create study pack'
      });
    }
  });
});

