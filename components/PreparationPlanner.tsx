import React from 'react';
import type { ExperienceLevel, PrepTime } from '../types';
import { EXPERIENCE_LEVELS, PREPARATION_TIMES } from '../constants';
import { CheckIcon } from './icons/CheckIcon';
import { LoaderIcon } from './icons/LoaderIcon';

interface PreparationPlannerProps {
    skills: string[];
    selectedSkills: string[];
    onToggleSkill: (skill: string) => void;
    experienceLevel: ExperienceLevel;
    onSetExperienceLevel: (level: ExperienceLevel) => void;
    prepTime: PrepTime;
    onSetPrepTime: (time: PrepTime) => void;
    onGeneratePlan: () => void;
    isLoading: boolean;
}

const PreparationPlanner: React.FC<PreparationPlannerProps> = ({
    skills,
    selectedSkills,
    onToggleSkill,
    experienceLevel,
    onSetExperienceLevel,
    prepTime,
    onSetPrepTime,
    onGeneratePlan,
    isLoading,
}) => {
    return (
        <section className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold text-slate-700 mb-1">Step 2: Create Your Plan</h2>
            <p className="text-slate-500 mb-6">Customize your preparation by selecting the skills to focus on, your experience level, and how much time you have.</p>

            <div className="space-y-6">
                {/* Skill Selection */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-3">Skills to Practice</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => {
                            const isSelected = selectedSkills.includes(skill);
                            return (
                                <button
                                    key={skill}
                                    onClick={() => onToggleSkill(skill)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                                        isSelected
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                                    }`}
                                >
                                    {isSelected && <CheckIcon />}
                                    {skill}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Experience and Time Selection */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="experience-level" className="block text-sm font-medium text-slate-600 mb-2">
                            Your Experience Level
                        </label>
                        <select
                            id="experience-level"
                            value={experienceLevel}
                            onChange={e => onSetExperienceLevel(e.target.value as ExperienceLevel)}
                            className="w-full px-3 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {EXPERIENCE_LEVELS.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="prep-time" className="block text-sm font-medium text-slate-600 mb-2">
                            Preparation Time
                        </label>
                        <select
                            id="prep-time"
                            value={prepTime}
                            onChange={e => onSetPrepTime(e.target.value as PrepTime)}
                            className="w-full px-3 py-2 text-slate-700 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {PREPARATION_TIMES.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Generate Button */}
                <div>
                    <button
                        onClick={onGeneratePlan}
                        disabled={isLoading || selectedSkills.length === 0}
                        className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {isLoading ? <LoaderIcon /> : 'Generate Study Plan'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PreparationPlanner;