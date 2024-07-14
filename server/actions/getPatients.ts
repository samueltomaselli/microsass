"use server";

import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/validate-request";
import { db } from "@/server/db";
import { patientTable } from "@/server/schema";
import { format } from "date-fns";

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
    createdAt: patient.createdAt ? format(new Date(patient.createdAt), "dd/MM/yyyy HH:mm") : null,
  }));

  return formattedPatients;
}
