import React, { useState } from 'react';
import { LoaderIcon } from './icons/LoaderIcon';

interface SkillInputFormProps {
    onGenerate: (skills: string) => void;
    isLoading: boolean;
}

const SkillInputForm: React.FC<SkillInputFormProps> = ({ onGenerate, isLoading }) => {
    const [skills, setSkills] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (skills.trim()) {
            onGenerate(skills.trim());
        }
    };

    return (
        <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-700 mb-1">Step 1: Define Your Skills</h2>
            <p className="text-slate-500 mb-4">Enter a few skills you have, separated by commas, to see what job roles might be a good fit.</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="skills-input" className="block text-sm font-medium text-slate-600 mb-2">
                        Your Skills (e.g., React, Node.js, AWS)
                    </label>
                    <textarea
                        id="skills-input"
                        rows={3}
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="w-full px-3 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                        placeholder="Enter skills here..."
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !skills.trim()}
                    className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {isLoading ? <LoaderIcon /> : 'Generate Job Profile'}
                </button>
            </form>
        </section>
    );
};

export default SkillInputForm;