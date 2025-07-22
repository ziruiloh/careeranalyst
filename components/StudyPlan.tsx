import React, { useState, useEffect } from 'react';
import type { StudyPlanType } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface StudyPlanProps {
    plan: StudyPlanType;
}

// A new interface to manage the completion status of each task
interface TaskWithStatus {
    text: string;
    completed: boolean;
}

interface WeeklyTasksWithStatus {
    week: string;
    tasks: TaskWithStatus[];
}


const AccordionItem: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-slate-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4 px-2"
            >
                <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
                <ChevronDownIcon className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="p-4 prose prose-slate max-w-none">
                    {children}
                </div>
            </div>
        </div>
    );
};

const StudyPlan: React.FC<StudyPlanProps> = ({ plan }) => {
    const [todos, setTodos] = useState<WeeklyTasksWithStatus[]>([]);

    useEffect(() => {
        if (plan && plan.weeklyTodos) {
            // Initialize the state with completion status for each task
            const initialTodos = plan.weeklyTodos.map(weekly => ({
                ...weekly,
                tasks: weekly.tasks.map(taskText => ({ text: taskText, completed: false }))
            }));
            setTodos(initialTodos);
        }
    }, [plan]);

    const handleToggleTask = (weekIndex: number, taskIndex: number) => {
        setTodos(currentTodos => 
            currentTodos.map((week, wIndex) => {
                if (wIndex === weekIndex) {
                    const updatedTasks = week.tasks.map((task, tIndex) => {
                        if (tIndex === taskIndex) {
                            return { ...task, completed: !task.completed };
                        }
                        return task;
                    });
                    return { ...week, tasks: updatedTasks };
                }
                return week;
            })
        );
    };

    // Basic markdown to HTML conversion
    const renderMarkdown = (text: string) => {
        const html = text
            .replace(/^### (.*$)/gim, '<h3 class="text-md font-semibold mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold mb-3">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-xl font-extrabold mb-4">$1</h1>')
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
            .replace(/(\r\n|\n|\r)/gm, '<br>');
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    };

    return (
        <section className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold text-slate-700 mb-1">Step 3: Your Personalized Study Plan</h2>
            <p className="text-slate-500 mb-6">Follow this guide to get job-ready. Good luck!</p>

            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-indigo-700 mb-4">Skill-by-Skill Breakdown</h3>
                     <div className="border border-slate-200 rounded-lg">
                        {plan.skillPlans.map((skillPlan, index) => (
                            <AccordionItem key={index} title={skillPlan.skillName} defaultOpen={index === 0}>
                                {renderMarkdown(skillPlan.plan)}
                            </AccordionItem>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-emerald-700 mb-4">Weekly To-Do List</h3>
                    <div className="space-y-4">
                        {todos.map((weekly, weekIndex) => (
                             <div key={weekIndex} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <h4 className="font-bold text-slate-800">{weekly.week}</h4>
                                <ul className="list-none mt-3 space-y-2">
                                    {weekly.tasks.map((task, taskIndex) => (
                                        <li key={taskIndex}>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => handleToggleTask(weekIndex, taskIndex)}
                                                    className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition"
                                                    aria-label={`Mark task as complete: ${task.text}`}
                                                />
                                                <span className={`transition-colors ${
                                                    task.completed
                                                        ? 'text-slate-400 line-through'
                                                        : 'text-slate-700 group-hover:text-slate-900'
                                                }`}>
                                                    {task.text}
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudyPlan;