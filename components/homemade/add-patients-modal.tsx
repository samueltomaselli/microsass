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
import InputMask from "react-input-mask";
import { addPatients } from "@/app/dashboard/patients/actions";

export default function AddPatientsModal() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await addPatients(formData);
    console.log(response);
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
                <Input placeholder="Nome" name="name" className="w-full" />

                <Input placeholder="E-mail" name="email" className="w-full" />
                <InputMask mask="(99) 99999-9999">
                  <Input placeholder="Telefone" name="phone" className="w-full mb-3" />
                </InputMask>
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
