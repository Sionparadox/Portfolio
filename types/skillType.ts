type SkillType = {
  name: string;
  percentage: number;
  image: string;
};
type SkillCategoryType =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'others';

export type { SkillType, SkillCategoryType };
