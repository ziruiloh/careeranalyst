
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SkillInputForm from './components/SkillInputForm';
import JobSummary from './components/JobSummary';
import PreparationPlanner from './components/PreparationPlanner';
import StudyPlan from './components/StudyPlan';
import { generateJobSummary, generateStudyPlan } from './services/geminiService';
import type { JobSummaryType, StudyPlanType, ExperienceLevel, PrepTime } from './types';
import { EXPERIENCE_LEVELS, PREPARATION_TIMES } from './constants';

const App: React.FC = () => {
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);
    const [isLoadingPlan, setIsLoadingPlan] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [jobSummary, setJobSummary] = useState<JobSummaryType | null>(null);
    const [studyPlan, setStudyPlan] = useState<StudyPlanType | null>(null);

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(EXPERIENCE_LEVELS[0]);
    const [prepTime, setPrepTime] = useState<PrepTime>(PREPARATION_TIMES[0]);

    const handleGenerateSummary = useCallback(async (skillsPrompt: string) => {
        setIsLoadingSummary(true);
        setError(null);
        setJobSummary(null);
        setStudyPlan(null);
        setSelectedSkills([]);
        try {
            const summary = await generateJobSummary(skillsPrompt);
            setJobSummary(summary);
            // Pre-select all skills by default
            setSelectedSkills(summary.skillBreakdown.map(s => s.skillName));
        } catch (e) {
            console.error(e);
            setError('Failed to generate job summary. Please check your input and try again.');
        } finally {
            setIsLoadingSummary(false);
        }
    }, []);

    const handleGeneratePlan = useCallback(async () => {
        if (selectedSkills.length === 0) {
            setError("Please select at least one skill to practice.");
            return;
        }
        setIsLoadingPlan(true);
        setError(null);
        setStudyPlan(null);
        try {
            const plan = await generateStudyPlan(selectedSkills, experienceLevel, prepTime);
            setStudyPlan(plan);
        } catch (e) {
            console.error(e);
            setError('Failed to generate study plan. Please try again later.');
        } finally {
            setIsLoadingPlan(false);
        }
    }, [selectedSkills, experienceLevel, prepTime]);

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8 max-w-4xl">
                <div className="space-y-12">
                    <SkillInputForm onGenerate={handleGenerateSummary} isLoading={isLoadingSummary} />

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    
                    {jobSummary && (
                       <>
                         <JobSummary summary={jobSummary} />
                         <PreparationPlanner 
                            skills={jobSummary.skillBreakdown.map(s => s.skillName)}
                            selectedSkills={selectedSkills}
                            onToggleSkill={toggleSkill}
                            experienceLevel={experienceLevel}
                            onSetExperienceLevel={setExperienceLevel}
                            prepTime={prepTime}
                            onSetPrepTime={setPrepTime}
                            onGeneratePlan={handleGeneratePlan}
                            isLoading={isLoadingPlan}
                         />
                       </>
                    )}

                    {studyPlan && (
                        <StudyPlan plan={studyPlan} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
