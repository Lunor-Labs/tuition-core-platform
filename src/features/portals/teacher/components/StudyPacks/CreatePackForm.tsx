import React, { useState } from 'react';
import type { VideoContent } from '../../types';

const CreatePackForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [description, setDescription] = useState('');
  const [videos, setVideos] = useState<VideoContent[]>([
    { id: '1', title: '1. Introduction to Motion', duration: '12 mins', size: '45 MB' },
    { id: '2', title: "2. Newton's Laws", duration: '28 mins', size: '120 MB' },
  ]);

  const handleAiSuggest = async () => {
    if (!title) return;
    // For now, we'll provide a simple description suggestion
    // In a real implementation, this would call an AI service
    const suggestedDescriptions = {
      Physics: `Complete coverage of ${title.toLowerCase()}. Includes fundamental concepts, practical examples, and problem-solving techniques.`,
      Chemistry: `Comprehensive guide to ${title.toLowerCase()}. Covers theoretical foundations, laboratory techniques, and real-world applications.`,
      'Combined Maths': `Detailed exploration of ${title.toLowerCase()}. Includes proofs, examples, and step-by-step problem solving.`,
      Biology: `Thorough examination of ${title.toLowerCase()}. Covers key concepts, diagrams, and biological processes.`
    };
    setDescription(suggestedDescriptions[subject as keyof typeof suggestedDescriptions] || `Learn about ${title.toLowerCase()} with comprehensive video lessons and resources.`);
  };

  const removeVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft sticky top-6 border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-sidebar">
          <span className="material-symbols-outlined">add_to_photos</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Create New Pack</h3>
          <p className="text-xs text-slate-400">Bundle videos for sale</p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Pack Title</label>
          <input
            className="w-full text-sm rounded-xl border-slate-200 bg-page-bg focus:border-teal-sidebar focus:ring-0 placeholder:text-slate-400"
            placeholder="e.g. Mechanics Full Revision"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
          <select
            className="w-full text-sm rounded-xl border-slate-200 bg-page-bg focus:border-teal-sidebar focus:ring-0 text-slate-700"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Combined Maths</option>
            <option>Biology</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">$</span>
            <input
              className="w-full text-sm rounded-xl border-slate-200 bg-page-bg pl-8 focus:border-teal-sidebar focus:ring-0 placeholder:text-slate-400"
              placeholder="0.00"
              type="number"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">Description</label>
            <button
              type="button"
              onClick={handleAiSuggest}
              disabled={!title}
              className="text-[10px] flex items-center gap-1 font-bold text-teal-600 hover:text-teal-700 disabled:opacity-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              AI Suggest
            </button>
          </div>
          <textarea
            className="w-full text-sm rounded-xl border-slate-200 bg-page-bg focus:border-teal-sidebar focus:ring-0 resize-none p-2"
            placeholder="What will students learn?"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <hr className="border-slate-100 my-4" />

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">Video Content</label>
          <div className="flex flex-col gap-2 mb-3">
            {videos.map((video) => (
              <div key={video.id} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100 group">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="size-8 rounded bg-white flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-lg">play_circle</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-slate-700 truncate">{video.title}</span>
                    <span className="text-[10px] text-slate-400">{video.duration} • {video.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeVideo(video.id)}
                  className="text-slate-300 hover:text-red-400 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))}
          </div>
          <button className="w-full py-2 border-2 border-dashed border-teal-sidebar/30 text-teal-700 rounded-xl text-sm font-medium hover:bg-teal-50 hover:border-teal-sidebar transition-colors flex items-center justify-center gap-2" type="button">
            <span className="material-symbols-outlined text-lg">upload_file</span>
            Upload Video Lesson
          </button>
          <p className="text-[10px] text-slate-400 mt-2 text-center">Supports MP4, MOV up to 2GB per file.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors" type="button">
            Save Draft
          </button>
          <button className="flex-1 py-3 bg-teal-sidebar text-white rounded-xl font-medium shadow-md hover:bg-teal-dark transition-colors flex items-center justify-center gap-2" type="button">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePackForm;
