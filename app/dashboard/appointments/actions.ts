"use server";

import { SQLWrapper, eq } from "drizzle-orm";
import { db } from "@/server/db";
import { appointmentTable, patientTable, sessionTable } from "@/server/schema";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/validate-request";
import { format } from "date-fns";

export async function getAppointments() {
  const { session } = await validateRequest();

  if (!session?.userId) {
    throw new Error("User ID is required");
  }

  const appointments = await db
    .select({
      title: appointmentTable.title,
      id: appointmentTable.id,
      userId: appointmentTable.userId,
      patientId: appointmentTable.patientId,
      date: appointmentTable.date,
      time: appointmentTable.time,
      description: appointmentTable.description,
      patientName: patientTable.name,
    })
    .from(appointmentTable)
    .innerJoin(patientTable, eq(appointmentTable.patientId, patientTable.id))
    .where(eq(appointmentTable.userId, session.userId));

  const formattedAppointments = appointments.map((appointment) => ({
    ...appointment,
    date: format(new Date(appointment.date), "HH:mm | dd/MM/yyyy"),
  }));

  return formattedAppointments;
}
