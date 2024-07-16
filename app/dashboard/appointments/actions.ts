"use server";

import { SQLWrapper, eq, and } from "drizzle-orm";
import { db } from "@/server/db";
import { appointmentTable, patientTable, sessionTable } from "@/server/schema";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/validate-request";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export async function getAppointments() {
  const { session } = await validateRequest();

  if (!session?.userId) {
    throw new Error("User ID is required");
  }

  const appointments = await db
    .select({
      title: appointmentTable.title,
      id: appointmentTable.id,
      type: appointmentTable.type,
      userId: appointmentTable.userId,
      patientId: appointmentTable.patientId,
      date: appointmentTable.date,
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

export async function addAppointments(formData: FormData) {
  const { session } = await validateRequest();

  if (!session?.userId) {
    throw new Error("User ID is required");
  }

  const type = formData.get("type") as string;
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string;
  const patientId = formData.get("patient_id") as string;

  if (!type || !title || !date || !description || !patientId) {
    throw new Error("All fields are required");
  }

  const newAppointment = {
    id: crypto.randomUUID(),
    type,
    title,
    userId: session.userId,
    date: new Date(date),
    description,
    patientId,
  };

  await db.insert(appointmentTable).values(newAppointment);

  revalidatePath("/dashboard/appointments");

  return {
    message: "Appointment added successfully",
  };
}

export async function deleteAppointments(appointmentId: string) {
  const { session } = await validateRequest();

  if (!session?.userId) {
    throw new Error("User ID is required");
  }

  const appointments = await db
    .select()
    .from(appointmentTable)
    .where(and(eq(patientTable.userId, session.userId), eq(appointmentTable.id, appointmentId)))
    .limit(1);

  const appointment = appointments[0];

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.userId !== session.userId) {
    throw new Error("You do not have permission to delete this appointment");
  }

  await db.delete(appointmentTable).where(eq(appointmentTable.id, appointmentId));

  revalidatePath("/dashboard/appointments");

  return {
    message: "Appointment deleted successfully",
  };
}
