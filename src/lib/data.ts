/**
 * Static UI data. Shapes mirror the future database tables so this module can be
 * swapped for Lovable Cloud queries without touching components.
 */

export type SkillCategory = "Strength" | "Skills" | "Advanced";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Elite";
export type StepState = "completed" | "current" | "locked";

export type PathwayStep = {
  id: string;
  index: number;
  title: string;
  summary: string;
  state: StepState;
  premium?: boolean;
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  difficulty: Difficulty;
  description: string;
  prerequisites: string[];
  steps: number;
  estimatedWeeks: number;
  progress: number; // 0-100
  premium?: boolean;
  pathway: PathwayStep[];
};

const makePathway = (skillId: string, titles: string[], completed: number): PathwayStep[] =>
  titles.map((title, i) => ({
    id: `${skillId}-step-${i + 1}`,
    index: i + 1,
    title,
    summary: "Technique focus, prescribed volume and quality standards for this step.",
    state: i < completed ? "completed" : i === completed ? "current" : "locked",
    premium: i > 2,
  }));

export const skills: Skill[] = [
  {
    id: "pull-up",
    name: "Pull-up",
    category: "Strength",
    difficulty: "Beginner",
    description:
      "The foundation of every pulling skill. Build scapular control, full-range strength and a clean, honest rep.",
    prerequisites: ["Dead hang 30s"],
    steps: 6,
    estimatedWeeks: 8,
    progress: 72,
    pathway: makePathway(
      "pull-up",
      [
        "Dead Hang & Scapular Control",
        "Active Hang Pulls",
        "Band-Assisted Pull-up",
        "Negative Pull-up",
        "Full Pull-up",
        "Weighted Pull-up",
      ],
      4,
    ),
  },
  {
    id: "dip",
    name: "Dip",
    category: "Strength",
    difficulty: "Beginner",
    description:
      "Vertical pressing power for the muscle-up and every straight-arm skill that follows.",
    prerequisites: ["Support hold 20s"],
    steps: 5,
    estimatedWeeks: 6,
    progress: 40,
    pathway: makePathway(
      "dip",
      [
        "Parallel Bar Support Hold",
        "Negative Dip",
        "Band-Assisted Dip",
        "Full Dip",
        "Weighted / Straight Bar Dip",
      ],
      2,
    ),
  },
  {
    id: "push-up",
    name: "Push-up",
    category: "Strength",
    difficulty: "Beginner",
    description: "Horizontal pressing mastery with a braced line from heel to head.",
    prerequisites: [],
    steps: 5,
    estimatedWeeks: 5,
    progress: 100,
    pathway: makePathway(
      "push-up",
      [
        "Incline Push-up",
        "Full Push-up",
        "Tempo Push-up",
        "Diamond & Archer Push-up",
        "Pseudo Planche Push-up",
      ],
      5,
    ),
  },
  {
    id: "handstand",
    name: "Handstand",
    category: "Skills",
    difficulty: "Intermediate",
    description:
      "Balance, alignment and shoulder capacity. The gateway skill for all overhead work.",
    prerequisites: ["Pike hold", "Wall plank 60s"],
    steps: 7,
    estimatedWeeks: 12,
    progress: 35,
    pathway: makePathway(
      "handstand",
      [
        "Wrist Prep & Wall Plank",
        "Chest-to-Wall Hold",
        "Weight Shifts & Taps",
        "Kick-up Practice",
        "Freestanding 5s",
        "Freestanding 30s",
        "Line Refinement",
      ],
      2,
    ),
  },
  {
    id: "muscle-up",
    name: "Muscle-up",
    category: "Skills",
    difficulty: "Intermediate",
    description: "Explosive pull, fast transition, controlled press-out. Power meets technique.",
    prerequisites: ["8 Pull-ups", "10 Dips"],
    steps: 6,
    estimatedWeeks: 10,
    progress: 15,
    premium: true,
    pathway: makePathway(
      "muscle-up",
      [
        "High Pull-up to Sternum",
        "Straight Bar Dip",
        "Transition Drills",
        "Jumping Muscle-up",
        "Band-Assisted Muscle-up",
        "Strict Muscle-up",
      ],
      1,
    ),
  },
  {
    id: "hspu",
    name: "HSPU",
    category: "Skills",
    difficulty: "Advanced",
    description: "Handstand push-up: vertical pressing strength under full bodyweight.",
    prerequisites: ["Handstand 30s", "Pike push-up"],
    steps: 6,
    estimatedWeeks: 14,
    progress: 0,
    premium: true,
    pathway: makePathway(
      "hspu",
      [
        "Pike Push-up",
        "Elevated Pike Push-up",
        "Wall HSPU Negative",
        "Wall HSPU",
        "Deficit Wall HSPU",
        "Freestanding HSPU",
      ],
      0,
    ),
  },
  {
    id: "front-lever",
    name: "Front Lever",
    category: "Advanced",
    difficulty: "Advanced",
    description: "Straight-arm pulling and total-body tension held horizontal to the ground.",
    prerequisites: ["10 Pull-ups", "Tuck hold 15s"],
    steps: 6,
    estimatedWeeks: 16,
    progress: 8,
    premium: true,
    pathway: makePathway(
      "front-lever",
      [
        "Scapular Pull-ups",
        "Tuck Front Lever",
        "Advanced Tuck",
        "One-Leg Front Lever",
        "Straddle Front Lever",
        "Full Front Lever",
      ],
      1,
    ),
  },
  {
    id: "planche",
    name: "Planche",
    category: "Advanced",
    difficulty: "Elite",
    description: "The straight-arm pressing benchmark. Built on lean, protraction and patience.",
    prerequisites: ["Pseudo planche push-up", "Handstand"],
    steps: 7,
    estimatedWeeks: 24,
    progress: 0,
    premium: true,
    pathway: makePathway(
      "planche",
      [
        "Planche Lean",
        "Tuck Planche",
        "Advanced Tuck Planche",
        "Straddle Planche Negative",
        "Straddle Planche",
        "Half Lay Planche",
        "Full Planche",
      ],
      0,
    ),
  },
  {
    id: "90-hspu",
    name: "90° HSPU",
    category: "Advanced",
    difficulty: "Elite",
    description: "Press from a 90-degree bent-arm position back to handstand. Elite pressing.",
    prerequisites: ["HSPU", "Straddle planche"],
    steps: 6,
    estimatedWeeks: 28,
    progress: 0,
    premium: true,
    pathway: makePathway(
      "90-hspu",
      [
        "Deep Wall HSPU",
        "90° Hold on Blocks",
        "Negative 90° Press",
        "Band-Assisted 90° Press",
        "90° HSPU on Parallettes",
        "Freestanding 90° HSPU",
      ],
      0,
    ),
  },
  {
    id: "full-planche",
    name: "Full Planche",
    category: "Advanced",
    difficulty: "Elite",
    description: "Full straight-body planche hold. The final entry in the pressing pathway.",
    prerequisites: ["Straddle planche 10s"],
    steps: 5,
    estimatedWeeks: 32,
    progress: 0,
    premium: true,
    pathway: makePathway(
      "full-planche",
      [
        "Straddle Planche 15s",
        "Half Lay Hold",
        "Full Planche Negative",
        "Full Planche 3s",
        "Full Planche 10s",
      ],
      0,
    ),
  },
];

export const getSkill = (id: string) => skills.find((s) => s.id === id);

export const categories: SkillCategory[] = ["Strength", "Skills", "Advanced"];

export const goals = [
  { id: "first-pullup", label: "Get my first pull-up", hint: "Foundational strength" },
  { id: "handstand", label: "Hold a handstand", hint: "Balance & control" },
  { id: "muscle-up", label: "Unlock the muscle-up", hint: "Explosive power" },
  { id: "planche", label: "Build toward the planche", hint: "Elite straight-arm strength" },
  { id: "strength", label: "General strength & physique", hint: "Look and feel athletic" },
  { id: "mobility", label: "Move better, stay injury-free", hint: "Joint prep & mobility" },
];

export const levels = [
  {
    id: "beginner",
    label: "Beginner",
    hint: "New to calisthenics, or fewer than 3 pull-ups",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    hint: "Comfortable with pull-ups and dips, working on skills",
  },
  {
    id: "advanced",
    label: "Advanced",
    hint: "Solid handstand and muscle-up, chasing levers",
  },
];

export const achievements = [
  { id: "a1", name: "First Rep", detail: "Completed your first lesson", earned: true },
  { id: "a2", name: "7-Day Streak", detail: "Trained 7 days in a row", earned: true },
  { id: "a3", name: "Push-up Master", detail: "Finished the push-up pathway", earned: true },
  { id: "a4", name: "Hang Time", detail: "60s dead hang logged", earned: true },
  { id: "a5", name: "Balanced", detail: "First 10s freestanding handstand", earned: false },
  { id: "a6", name: "Transition", detail: "First strict muscle-up", earned: false },
  { id: "a7", name: "Tension", detail: "Advanced tuck front lever 15s", earned: false },
  { id: "a8", name: "30-Day Streak", detail: "One month of consistency", earned: false },
];

export const recentLessons = [
  { id: "l-101", title: "Negative Pull-up", skill: "Pull-up", when: "Yesterday" },
  { id: "l-102", title: "Chest-to-Wall Hold", skill: "Handstand", when: "2 days ago" },
  { id: "l-103", title: "Negative Dip", skill: "Dip", when: "4 days ago" },
];

export type Lesson = {
  id: string;
  title: string;
  skillId: string;
  skillName: string;
  stepIndex: number;
  duration: string;
  objective: string;
  prerequisites: string[];
  technique: string[];
  mistakes: string[];
  regression: string;
  progression: string;
  prescription: { label: string; value: string }[];
  safety: string;
  premium?: boolean;
};

export const lessons: Record<string, Lesson> = {
  "pull-up-step-5": {
    id: "pull-up-step-5",
    title: "Full Pull-up",
    skillId: "pull-up",
    skillName: "Pull-up",
    stepIndex: 5,
    duration: "9 min",
    objective:
      "Perform a strict pull-up from a dead hang to chin-over-bar with no kipping and full control on the way down.",
    prerequisites: ["3x5 controlled negatives", "Dead hang 30s", "Scapular pull-ups 3x8"],
    technique: [
      "Start from a full dead hang with active shoulders — depress and retract before you pull.",
      "Drive the elbows down and back toward your ribs rather than pulling the chin up.",
      "Keep the ribcage down and glutes engaged so the body stays in one line.",
      "Lower for a count of three, finishing in a fully extended hang each rep.",
    ],
    mistakes: [
      "Kipping or swinging the legs to generate momentum.",
      "Cutting the range short at the bottom to protect the next rep.",
      "Shrugging the shoulders into the ears at the start of the pull.",
      "Flaring the elbows wide, which shifts load away from the lats.",
    ],
    regression: "Band-assisted pull-up — keep the same tempo and range with light assistance.",
    progression: "Weighted pull-up — add 2.5kg once you can do 8 clean strict reps.",
    prescription: [
      { label: "Sets", value: "4" },
      { label: "Reps", value: "3–6" },
      { label: "Tempo", value: "1-0-3" },
      { label: "Rest", value: "2–3 min" },
    ],
    safety:
      "Stop the set the moment form breaks. If you feel elbow or shoulder joint pain (not muscular fatigue), regress and reduce volume for a week.",
  },
};

export const getLesson = (id: string): Lesson => {
  const found = lessons[id];
  if (found) return found;
  const base = lessons["pull-up-step-5"];
  const [skillId] = id.split("-step-");
  const skill = getSkill(skillId);
  const step = skill?.pathway.find((p) => p.id === id);
  return {
    ...base,
    id,
    title: step?.title ?? base.title,
    skillId: skill?.id ?? base.skillId,
    skillName: skill?.name ?? base.skillName,
    stepIndex: step?.index ?? base.stepIndex,
    premium: step?.premium,
  };
};
