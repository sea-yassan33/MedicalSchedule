export type Patient = {
  kana: string;
  id: number;
  duration: number;
  phone_number: string;
  first_visit_date: string | null;
  profession_ids: string;
  delet_flag: number;
  updated_at: string;
  age: number;
  name: string;
  gender: string | null;
  email: string | null;
  last_visit_date: string | null;
  memo: string;
  created_at: string;
};

export type PatientsApiResponse = {
  status: string;
  data: Patient[];
};