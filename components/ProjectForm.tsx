"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Project = {
  title: string;
  description: string;
  status: string;
  progress: number;
  team: number;
};

type ProjectFormProps = {
  onAddProject?: (project: Project) => void;
};

export function ProjectForm({ onAddProject }: ProjectFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Ingresa el nombre del proyecto");
      return;
    }

    const newProject: Project = {
      title: name,
      description: description || category || "Proyecto nuevo",
      status: priority || "Planificado",
      progress: 0,
      team: 1,
    };

    onAddProject?.(newProject);

    setName("");
    setDescription("");
    setCategory("");
    setPriority("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger>
  Nuevo Proyecto
</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
            <DialogDescription>
              Completa la información del proyecto.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del Proyecto</Label>
              <Input
                id="name"
                placeholder="Mi Proyecto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                placeholder="Descripción del proyecto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <Input
                id="category"
                placeholder="Desarrollo Web"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">Estado</Label>
              <Input
                id="priority"
                placeholder="Planificado"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Crear Proyecto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}