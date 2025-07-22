
import type { EXPERIENCE_LEVELS, PREPARATION_TIMES } from './constants';

export interface SkillBreakdown {
    skillName: string;
    description: string;
}

export interface JobSummaryType {
    jobTitle: string;
    jobDescription: string;
    skillBreakdown: SkillBreakdown[];
}

export interface SkillPlan {
    skillName: string;
    plan: string;
}

export interface WeeklyTask {
    week: string;
    tasks: string[];
}

export interface StudyPlanType {
    skillPlans: SkillPlan[];
    weeklyTodos: WeeklyTask[];
}

export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];
export type PrepTime = typeof PREPARATION_TIMES[number];
