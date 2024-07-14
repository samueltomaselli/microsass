import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { columns } from "@/components/homemade/tables/patients-table/columns";
import { DataTable } from "@/components/homemade/tables/patients-table/data-table";

import AddModal from "@/components/homemade/add-appointments-modal";
import { getPatients } from "./actions";
import AddPatientsModal from "@/components/homemade/add-patients-modal";
import { validateRequest } from "@/lib/validate-request";
import { redirect } from "next/navigation";

export default async function Appointments() {
  const { user } = await validateRequest();
  const patients = await getPatients();

  return (
    <>
      {user ? (
        <div>
          <Card className="border-none shadow-none">
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Pacientes</CardTitle>
                <CardDescription>Lista de pacientes.</CardDescription>
              </div>
              <div className="flex gap items-center justify-center gap-2">
                <AddPatientsModal />
              </div>
            </CardHeader>
            <DataTable columns={columns} data={patients} />
          </Card>
        </div>
      ) : (
        redirect("/login")
      )}
    </>
  );
}
