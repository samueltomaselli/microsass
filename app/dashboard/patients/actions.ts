"use server";

import { eq, and } from "drizzle-orm";
import { validateRequest } from "@/lib/validate-request";
import { db } from "@/server/db";
import { patientTable } from "@/server/schema";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export async function getPatients() {
  const { session } = await validateRequest();

  if (!session?.userId) {
    throw new Error("User ID is required");
  }

  const patients = await db
    .select()
    .from(patientTable)
    .where(eq(patientTable.userId, session.userId));

  const formattedPatients = patients.map((patient) => ({
    ...patient,
    createdAt: patient.createdAt ? format(new Date(patient.createdAt), "HH:mm | dd/MM/yyyy") : null,
  }));

  return formattedPatients;
}

export async function addPatients(formData: FormData) {
  const { session } = await validateRequest();

  if (!session?.userId) {
    throw new Error("User ID is required");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!name || !email || !phone) {
    throw new Error("All fields are required");
  }

  const newPatient = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    userId: session.userId,
  };

  await db.insert(patientTable).values(newPatient);

  revalidatePath("/dashboard/patients");

  return {
    message: "Patient added successfully",
  };
}

export async function deletePatients(patientId: string) {
  const { session } = await validateRequest();

  if (!session?.userId) {
    throw new Error("User ID is required");
  }

  const patients = await db
    .select()
    .from(patientTable)
    .where(and(eq(patientTable.id, patientId), eq(patientTable.userId, session.userId)))
    .limit(1);

  const patient = patients[0];

  if (!patient) {
    throw new Error("Patient not found or you do not have permission to delete this patient");
  }

  try {
    await db.delete(patientTable).where(eq(patientTable.id, patientId));
    console.log("Patient deleted successfully");

    revalidatePath("/dashboard/patients");

    return {
      message: "Patient deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw new Error("Failed to delete patient");
  }
}
