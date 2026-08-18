import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getSkill, skills as staticSkills } from "@/lib/data";

export type DbSkill = {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  description: string | null;
  thumbnail: string | null;
};

export type DbLesson = {
  id: string;
  title: string;
  description: string | null;
  order: number;
  is_free: boolean;
  duration: number | null;
  video_id: string | null;
};

/** Extra editorial metadata that lives in code, keyed by skill id. */
export const skillMeta = (id: string) => {
  const s = getSkill(id);
  return {
    prerequisites: s?.prerequisites ?? [],
    estimatedWeeks: s?.estimatedWeeks ?? 8,
    steps: s?.steps ?? 0,
  };
};

export const skillsQuery = queryOptions({
  queryKey: ["skills"],
  queryFn: async (): Promise<DbSkill[]> => {
    const { data, error } = await supabase
      .from("skills")
      .select("id,name,category,difficulty,description,thumbnail")
      .order("created_at", { ascending: true });
    if (error) throw error;
    const order = staticSkills.map((s) => s.id);
    return (data ?? []).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  },
});

export const programQuery = (skillId: string) =>
  queryOptions({
    queryKey: ["program", skillId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("id,title,level,description,skill_id, lessons(id,title,description,order,is_free,duration,video_id)")
        .eq("skill_id", skillId)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const lessons = ((data.lessons ?? []) as DbLesson[]).sort((a, b) => a.order - b.order);
      return { ...data, lessons };
    },
  });

export const skillQuery = (skillId: string) =>
  queryOptions({
    queryKey: ["skill", skillId],
    queryFn: async (): Promise<DbSkill | null> => {
      const { data, error } = await supabase
        .from("skills")
        .select("id,name,category,difficulty,description,thumbnail")
        .eq("id", skillId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const lessonQuery = (lessonId: string) =>
  queryOptions({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("id,title,description,order,is_free,duration,video_id,program_id, programs(id,title,skill_id, skills(id,name))")
        .eq("id", lessonId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const progressQuery = queryOptions({
  queryKey: ["progress"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("progress")
      .select("id,lesson_id,completed,completed_at")
      .eq("completed", true);
    if (error) throw error;
    return data ?? [];
  },
});

export const profileQuery = queryOptions({
  queryKey: ["profile"],
  queryFn: async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("id,name,email,avatar,current_level")
      .eq("id", auth.user.id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },
});

export const goalsQuery = queryOptions({
  queryKey: ["user_goals"],
  queryFn: async () => {
    const { data, error } = await supabase.from("user_goals").select("id,skill_id");
    if (error) throw error;
    return data ?? [];
  },
});

export const subscriptionQuery = queryOptions({
  queryKey: ["subscription"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("id,plan,status,current_period_end")
      .maybeSingle();
    if (error) throw error;
    return data;
  },
});

export const isAdminQuery = queryOptions({
  queryKey: ["is-admin"],
  queryFn: async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return false;
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", auth.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (error) throw error;
    return !!data;
  },
});


export const achievementsQuery = queryOptions({
  queryKey: ["achievements"],
  queryFn: async () => {
    const [{ data: all, error: e1 }, { data: mine, error: e2 }] = await Promise.all([
      supabase.from("achievements").select("id,name,description,requirement").order("requirement"),
      supabase.from("user_achievements").select("achievement_id,earned_at"),
    ]);
    if (e1) throw e1;
    if (e2) throw e2;
    const earned = new Set((mine ?? []).map((r) => r.achievement_id));
    return (all ?? []).map((a) => ({ ...a, earned: earned.has(a.id) }));
  },
});

export const allLessonsQuery = queryOptions({
  queryKey: ["all-lessons"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("lessons")
      .select("id,title,order,is_free,program_id, programs(skill_id, skills(id,name))")
      .order("order", { ascending: true });
    if (error) throw error;
    return (data ?? []).map((l) => ({
      id: l.id,
      title: l.title,
      order: l.order,
      is_free: l.is_free,
      skillId: l.programs?.skill_id ?? "",
      skillName: l.programs?.skills?.name ?? "",
    }));
  },
});

export type FlatLesson = {
  id: string;
  title: string;
  order: number;
  is_free: boolean;
  skillId: string;
  skillName: string;
};

/** Progress per skill, using the static step count as the denominator. */
export function useSkillProgress() {
  const { data: lessons = [] } = useQuery(allLessonsQuery);
  const completed = useCompletedLessonIds();

  const bySkill = new Map<string, FlatLesson[]>();
  for (const l of lessons) {
    const list = bySkill.get(l.skillId) ?? [];
    list.push(l);
    bySkill.set(l.skillId, list);
  }

  const progressFor = (skillId: string) => {
    const list = (bySkill.get(skillId) ?? []).slice().sort((a, b) => a.order - b.order);
    const total = skillMeta(skillId).steps || list.length || 1;
    const done = list.filter((l) => completed.has(l.id)).length;
    const next = list.find((l) => !completed.has(l.id)) ?? null;
    return { total, done, next, percent: Math.round((done / total) * 100) };
  };

  return { lessons, completed, bySkill, progressFor };
}

export function useCompletedLessonIds() {
  const { data } = useQuery(progressQuery);
  return new Set((data ?? []).map((p) => p.lesson_id));
}


export function useToggleLessonComplete() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ lessonId, completed }: { lessonId: string; completed: boolean }) => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Not signed in");
      const { error } = await supabase.from("progress").upsert(
        {
          user_id: auth.user.id,
          lesson_id: lessonId,
          completed,
          completed_at: completed ? new Date().toISOString() : null,
        },
        { onConflict: "user_id,lesson_id" },
      );
      if (error) throw error;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}
