export type Appointment = {
  date: string;
  type: string | null;
  id: string;
  userId: string;
  description: string | null;
  title: string | null;
  patientId: string;
};

export type Patient = {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string | null;
};
