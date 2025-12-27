
import React, { useState } from 'react';

interface CreateClassFormProps {
  onPublish: (data: any) => void;
}

const CreateClassForm: React.FC<CreateClassFormProps> = ({ onPublish }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    zoomLink: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file logic if needed
    console.log('File uploaded:', e.target.files?.[0]?.name);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft sticky top-6 border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-sidebar">
          <span className="material-symbols-outlined">add</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Create New Class</h3>
          <p className="text-xs text-slate-400">Setup a new course for students</p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onPublish(formData); }}>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Class Name</label>
          <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full text-sm rounded-xl border-slate-200 bg-page-bg focus:border-teal-sidebar focus:ring-0 placeholder:text-slate-400 transition-colors" 
            placeholder="e.g. 2027 Biology Theory" 
            type="text"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full text-sm rounded-xl border-slate-200 bg-page-bg focus:border-teal-sidebar focus:ring-0 placeholder:text-slate-400 resize-none transition-colors" 
            placeholder="Briefly describe the curriculum..." 
            rows={3}
          ></textarea>
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Zoom Link</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 material-symbols-outlined text-slate-400 text-lg">videocam</span>
            <input 
              name="zoomLink"
              value={formData.zoomLink}
              onChange={handleChange}
              className="w-full text-sm rounded-xl border-slate-200 bg-page-bg pl-10 focus:border-teal-sidebar focus:ring-0 placeholder:text-slate-400 transition-colors" 
              placeholder="https://zoom.us/j/..." 
              type="url"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Course Materials (PDF/Zip)</label>
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-teal-sidebar hover:bg-teal-50/30 transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <span className="material-symbols-outlined text-slate-400 mb-1 group-hover:text-teal-sidebar">cloud_upload</span>
              <p className="text-[10px] text-slate-500"><span className="font-semibold text-teal-600">Click to upload</span> or drag and drop</p>
            </div>
            <input className="hidden" type="file" onChange={handleFileChange} />
          </label>
        </div>

        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 flex gap-3 items-start">
          <span className="material-symbols-outlined text-amber-500 text-lg mt-0.5">lock_person</span>
          <div className="text-xs text-amber-800">
            <span className="font-bold">Access Control:</span> Students must purchase this class to access the Zoom link and downloaded materials.
          </div>
        </div>

        <button 
          className="w-full py-3 bg-teal-sidebar text-white rounded-xl font-medium shadow-md hover:bg-teal-dark transition-all flex items-center justify-center gap-2 mt-2 active:scale-[0.98]" 
          type="submit"
        >
          <span className="material-symbols-outlined text-lg">check</span>
          Publish Class
        </button>
      </form>
    </div>
  );
};

export default CreateClassForm;
