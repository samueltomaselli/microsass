import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { columns } from "@/components/homemade/tables/patient-tables/columns";
import { DataTable } from "@/components/homemade/tables/patient-tables/data-table";
import { getAppointments } from "./actions";
import { Appointment } from "@/types/types";

async function getData(): Promise<Appointment[]> {
  const data = await getAppointments();
  console.log(data);
  return data;
}

async function Appointments() {
  const data = await getData();
  return (
    <div>
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Consultas</CardTitle>
            <CardDescription>Histórico de consultas.</CardDescription>
          </div>
          <div className="flex gap items-center justify-center gap-2">
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </CardHeader>
        <DataTable columns={columns} data={data} />
      </Card>
    </div>
  );
}

export default Appointments;
