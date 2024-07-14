import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { columns } from "@/components/homemade/tables/appointments-table/columns";
import { DataTable } from "@/components/homemade/tables/appointments-table/data-table";
import { addAppointments, getAppointments } from "./actions";
import { getPatients } from "@/server/actions/getPatients";
import AddAppointmentsModal from "@/components/homemade/add-appointments-modal";

export default async function Appointments() {
  const appointments = await getAppointments();
  const patients = await getPatients();

  return (
    <div>
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Consultas</CardTitle>
            <CardDescription>Histórico de consultas.</CardDescription>
          </div>
          <div className="flex gap items-center justify-center gap-2">
            <AddAppointmentsModal patients={patients} />
          </div>
        </CardHeader>
        <DataTable columns={columns} data={appointments} />
      </Card>
    </div>
  );
}
