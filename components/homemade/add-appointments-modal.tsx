"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Patient } from "@/types/types";
import { addAppointments, getAppointments } from "@/app/dashboard/appointments/actions";

type Props = {
  patients: Patient[];
};

export default function AddAppointmentsModal({ patients }: Props) {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await addAppointments(formData);
    window.location.reload();
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default">Adicionar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form onSubmit={handleSubmit} className="flex flex-col ">
            <AlertDialogHeader>
              <AlertDialogTitle>Adicionar consulta</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-4">
                <Input placeholder="Título" name="title" className="w-full" />
                <Input
                  placeholder="Descrição"
                  id="description"
                  name="description"
                  className="w-full"
                />
                <Select name="patient_id">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient, i) => (
                      <SelectItem value={patient.id} key={i}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Data" name="date" className="w-full" />
                <Input placeholder="Tipo" name="type" className="w-full mb-3" />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Adicionar</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
