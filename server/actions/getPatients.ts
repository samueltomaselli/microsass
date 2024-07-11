"use server";

import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/validate-request";
import { db } from "@/server/db";
import { patientTable } from "@/server/schema";

export async function getPatients() {
  const { session } = await validateRequest();

  if (!session?.userId) {
    throw new Error("User ID is required");
  }

  const patients = await db
    .select()
    .from(patientTable)
    .where(eq(patientTable.userId, session.userId));

  return patients;
}
