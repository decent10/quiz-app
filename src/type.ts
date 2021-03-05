export type Choice = {
  label?: string;
  value?: string;
  selected?: boolean;
};
export type Question = {
  question_type: string;
  identifier: string;
  answer?: string;
  headline: string;
  description?: string | null;
  required?: boolean;
  multiple?: string | undefined;
  choices?: {
    label?: string;
    value?: string;
    selected?: boolean;
  }[];
  jumps?: {
    conditions?: {
      field: string;
      value?: string;
    }[];
    destination?: { id?: string };
  }[];
  multiline?: string | undefined;
};