
import React from 'react';
import type { JobSummaryType } from '../types';

interface JobSummaryProps {
    summary: JobSummaryType;
}

const JobSummary: React.FC<JobSummaryProps> = ({ summary }) => {
    return (
        <section className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold text-slate-700 mb-2">Suggested Job Profile</h2>
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                 <h3 className="text-xl font-bold text-indigo-800">{summary.jobTitle}</h3>
                 <p className="text-slate-600 mt-2">{summary.jobDescription}</p>
            </div>
           
            <div className="mt-6">
                 <h4 className="text-lg font-semibold text-slate-700 mb-3">How Your Skills Apply:</h4>
                 <div className="space-y-4">
                    {summary.skillBreakdown.map((item, index) => (
                        <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="font-bold text-slate-800">{item.skillName}</p>
                            <p className="text-slate-600 mt-1">{item.description}</p>
                        </div>
                    ))}
                 </div>
            </div>
        </section>
    );
};

export default JobSummary;
