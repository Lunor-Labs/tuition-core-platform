import React, { useState } from 'react';
import type { Question } from '../../types';

const ExamBuilder: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: '',
      points: 1,
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false },
      ]
    }
  ]);

  const addQuestion = () => {
    const newId = (questions.length + 1).toString();
    setQuestions([...questions, {
      id: newId,
      text: '',
      points: 1,
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false },
      ]
    }]);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft sticky top-6 border border-slate-100 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-sidebar">
          <span className="material-symbols-outlined">add_task</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Create New Exam</h3>
          <p className="text-xs text-slate-400">Setup MCQ details & questions</p>
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Assign to Class</label>
          <select className="w-full text-sm rounded-xl border-slate-200 bg-page-bg focus:border-teal-sidebar focus:ring-0 text-slate-700">
            <option>A/L 2026 Physics Theory - Nov</option>
            <option>Chemistry Organic Masterclass</option>
            <option>Combined Maths 2024</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Title</label>
          <input
            className="w-full text-sm rounded-xl border-slate-200 bg-page-bg focus:border-teal-sidebar focus:ring-0 placeholder:text-slate-400"
            placeholder="e.g. Weekly Theory Test 05"
            type="text"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
            <input className="w-full text-sm rounded-xl border-slate-200 bg-page-bg focus:border-teal-sidebar focus:ring-0 text-slate-500" type="date" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Time</label>
            <input className="w-full text-sm rounded-xl border-slate-200 bg-page-bg focus:border-teal-sidebar focus:ring-0 text-slate-500" type="time" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Minutes)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 material-symbols-outlined text-slate-400 text-lg">timer</span>
            <input
              className="w-full text-sm rounded-xl border-slate-200 bg-page-bg pl-10 focus:border-teal-sidebar focus:ring-0 placeholder:text-slate-400"
              placeholder="60"
              type="number"
            />
          </div>
        </div>

        <hr className="border-slate-100 my-4" />

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Question {idx + 1}</span>
                <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border">{q.points} Point</span>
              </div>
              <textarea
                className="w-full text-sm rounded-lg border-slate-200 focus:border-teal-sidebar focus:ring-0 resize-none mb-3 p-2"
                placeholder="Enter your question here..."
                rows={2}
              ></textarea>

              <div className="space-y-2">
                {q.options.map((opt) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <input
                      className="text-teal-600 focus:ring-teal-600 border-gray-300 w-4 h-4 rounded-full"
                      name={`correct_q${q.id}`}
                      title="Mark as correct answer"
                      type="radio"
                    />
                    <input
                      className="w-full text-xs rounded-lg border-slate-200 py-1.5 focus:border-teal-sidebar focus:ring-0"
                      placeholder={`Option ${opt.id.toUpperCase()}`}
                      type="text"
                    />
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-2 text-right italic">Select the radio button to mark correct answer</p>
            </div>
          ))}
        </div>

        <button
          onClick={addQuestion}
          className="w-full py-2 border-2 border-dashed border-teal-sidebar/30 text-teal-700 rounded-xl text-sm font-medium hover:bg-teal-50 hover:border-teal-sidebar transition-colors flex items-center justify-center gap-2"
          type="button"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Add Another Question
        </button>

        <button
          className="w-full py-3 bg-teal-sidebar text-white rounded-xl font-medium shadow-md hover:bg-teal-dark transition-colors flex items-center justify-center gap-2 mt-4"
          type="button"
        >
          <span className="material-symbols-outlined text-lg">send</span>
          Publish Exam
        </button>
      </form>
    </div>
  );
};

export default ExamBuilder;
