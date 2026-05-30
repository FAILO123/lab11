"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  team: number;
};

type Member = {
  userId: number;
  role: string;
  name: string;
  email: string;
  position: string;
  birthdate: string;
  phone: string;
  projectId: number;
  isActive: boolean;
};

type Task = {
  id: number;
  description: string;
  projectId: number;
  status: string;
  priority: string;
  userId: number;
  dateline: string;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Plataforma de comercio electrónico con Next.js",
      status: "En progreso",
      progress: 65,
      team: 5,
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Aplicación móvil con React Native",
      status: "En revisión",
      progress: 90,
      team: 3,
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Panel de análisis con visualizaciones",
      status: "Planificado",
      progress: 20,
      team: 4,
    },
  ]);

  const [members, setMembers] = useState<Member[]>([
    {
      userId: 1,
      role: "Admin",
      name: "María García",
      email: "maria@example.com",
      position: "Frontend Developer",
      birthdate: "2000-05-10",
      phone: "999999999",
      projectId: 1,
      isActive: true,
    },
    {
      userId: 2,
      role: "User",
      name: "Juan Pérez",
      email: "juan@example.com",
      position: "Backend Developer",
      birthdate: "1999-03-15",
      phone: "988888888",
      projectId: 2,
      isActive: true,
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      description: "Implementar autenticación",
      projectId: 1,
      status: "En progreso",
      priority: "Alta",
      userId: 1,
      dateline: "2025-11-15",
    },
    {
      id: 2,
      description: "Diseñar pantalla de perfil",
      projectId: 2,
      status: "Pendiente",
      priority: "Media",
      userId: 2,
      dateline: "2025-11-20",
    },
    {
      id: 3,
      description: "Configurar CI/CD",
      projectId: 3,
      status: "Completado",
      priority: "Alta",
      userId: 1,
      dateline: "2025-11-10",
    },
    {
      id: 4,
      description: "Optimizar consultas SQL",
      projectId: 1,
      status: "Pendiente",
      priority: "Urgente",
      userId: 2,
      dateline: "2025-11-25",
    },
  ]);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    team: "",
  });

  const [memberForm, setMemberForm] = useState({
    name: "",
    email: "",
    role: "",
    position: "",
    phone: "",
    projectId: "",
  });

  const [taskForm, setTaskForm] = useState({
    description: "",
    projectId: "",
    status: "",
    priority: "",
    userId: "",
  });

  const [settings, setSettings] = useState({
    appName: "Dashboard de Proyectos",
    supportEmail: "soporte@empresa.com",
    mode: "Producción",
    notifications: "Activadas",
  });

  const [page, setPage] = useState(1);
  const tasksPerPage = 3;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * tasksPerPage;
    return tasks.slice(start, start + tasksPerPage);
  }, [tasks, page]);

  const completedTasks = tasks.filter((task) => task.status === "Completado").length;
  const activeMembers = members.filter((member) => member.isActive).length;
  const totalHours = tasks.length * 8;

  const showAlert = (message: string) => {
    setAlert(message);
    setTimeout(() => setAlert(""), 3000);
  };

  const addProject = () => {
    if (!projectForm.title || !projectForm.description || !projectForm.team) {
      showAlert("Completa todos los campos del proyecto.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setProjects([
        ...projects,
        {
          id: Date.now(),
          title: projectForm.title,
          description: projectForm.description,
          status: "Planificado",
          progress: 0,
          team: Number(projectForm.team),
        },
      ]);

      setProjectForm({
        title: "",
        description: "",
        team: "",
      });

      setLoading(false);
    }, 1000);
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
    setTasks(tasks.filter((task) => task.projectId !== id));
  };

  const viewProject = (project: Project) => {
    window.alert(
      `Proyecto: ${project.title}\nDescripción: ${project.description}\nEstado: ${project.status}\nProgreso: ${project.progress}%\nMiembros: ${project.team}`
    );
  };

  const addMember = () => {
    if (!memberForm.name || !memberForm.email || !memberForm.role) {
      showAlert("Completa nombre, email y rol del miembro.");
      return;
    }

    setMembers([
      ...members,
      {
        userId: Date.now(),
        role: memberForm.role,
        name: memberForm.name,
        email: memberForm.email,
        position: memberForm.position || "Sin cargo",
        birthdate: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
        phone: memberForm.phone || "Sin teléfono",
        projectId: Number(memberForm.projectId || 1),
        isActive: true,
      },
    ]);

    setMemberForm({
      name: "",
      email: "",
      role: "",
      position: "",
      phone: "",
      projectId: "",
    });
  };

  const deleteMember = (id: number) => {
    setMembers(members.filter((member) => member.userId !== id));
  };

  const toggleMember = (id: number) => {
    setMembers(
      members.map((member) =>
        member.userId === id
          ? { ...member, isActive: !member.isActive }
          : member
      )
    );
  };

  const addTask = () => {
    if (!taskForm.description || !taskForm.projectId || !taskForm.userId) {
      showAlert("Completa descripción, proyecto y usuario de la tarea.");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        description: taskForm.description,
        projectId: Number(taskForm.projectId),
        status: taskForm.status || "Pendiente",
        priority: taskForm.priority || "Media",
        userId: Number(taskForm.userId),
        dateline: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
      },
    ]);

    setTaskForm({
      description: "",
      projectId: "",
      status: "",
      priority: "",
      userId: "",
    });
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completeTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "Completado" } : task
      )
    );
  };

  const saveSettings = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showAlert("Configuración guardada correctamente.");
    }, 1000);
  };

  const statusVariant = (status: string) => {
    if (status === "Completado") return "default";
    if (status === "En progreso") return "secondary";
    return "outline";
  };

  const priorityVariant = (priority: string) => {
    if (priority === "Urgente") return "destructive";
    if (priority === "Alta") return "default";
    if (priority === "Media") return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_35%),radial-gradient(circle_at_top_right,#ede9fe,transparent_35%),linear-gradient(to_bottom_right,#f8fafc,#eef2ff)] p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border bg-white/75 p-8 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge className="mb-3 rounded-full px-4 py-1">
                Panel Administrativo
              </Badge>

              <h1 className="bg-gradient-to-r from-blue-700 via-violet-700 to-fuchsia-700 bg-clip-text text-5xl font-black tracking-tight text-transparent">
                Dashboard de Proyectos
              </h1>

              <p className="mt-3 text-lg text-slate-600">
                Gestión moderna de proyectos, equipo, tareas y configuración con shadcn/ui.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
              <p className="text-sm font-medium text-primary">
                Tema personalizado activo
              </p>
              <p className="text-xs text-slate-500">
                Azul / violeta con Tailwind CSS
              </p>
            </div>
          </div>
        </div>

        {alert && (
          <Alert className="border-primary/30 bg-white/80 shadow-md backdrop-blur-xl">
            <AlertTitle>Mensaje del sistema</AlertTitle>
            <AlertDescription>{alert}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-5">
          <TabsList className="rounded-2xl bg-white/70 p-2 shadow-md backdrop-blur-xl">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                ["Total Proyectos", projects.length],
                ["Tareas", tasks.length],
                ["Tareas Completadas", completedTasks],
                ["Miembros Activos", activeMembers],
              ].map((item, index) => (
                <Card
                  key={index}
                  className="rounded-3xl border-white/60 bg-white/80 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  <CardHeader>
                    <CardTitle className="text-sm text-slate-500">
                      {item[0]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-black text-slate-900">
                      {item[1]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-5 rounded-3xl border-white/60 bg-white/80 shadow-lg backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Resumen General</CardTitle>
                <CardDescription>
                  Métricas actualizadas según los datos en memoria.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-sm text-slate-500">Horas estimadas</p>
                  <p className="text-3xl font-bold">{totalHours}h</p>
                </div>
                <div className="rounded-2xl bg-violet-50 p-4">
                  <p className="text-sm text-slate-500">Proyectos activos</p>
                  <p className="text-3xl font-bold">
                    {projects.filter((p) => p.status !== "Completado").length}
                  </p>
                </div>
                <div className="rounded-2xl bg-fuchsia-50 p-4">
                  <p className="text-sm text-slate-500">Pendientes</p>
                  <p className="text-3xl font-bold">
                    {tasks.filter((t) => t.status !== "Completado").length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-5">
            <Card className="rounded-3xl border-white/60 bg-white/80 shadow-lg backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Crear Proyecto</CardTitle>
                <CardDescription>
                  Agrega proyectos nuevos y simula una petición al backend.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-4">
                <Input
                  placeholder="Nombre del proyecto"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                />
                <Input
                  placeholder="Descripción"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Miembros"
                  type="number"
                  value={projectForm.team}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, team: e.target.value })
                  }
                />
                <Button
                  onClick={addProject}
                  disabled={loading}
                  className="rounded-xl shadow-md transition-all hover:scale-[1.02]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Spinner /> Guardando...
                    </span>
                  ) : (
                    "Crear Proyecto"
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="rounded-3xl border-white/60 bg-white/80 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  <CardHeader>
                    <div className="flex justify-between gap-2">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge variant={statusVariant(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-sm text-slate-500">
                      Miembros: {project.team}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewProject(project)}
                      >
                        Ver detalles
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteProject(project.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-5">
            <Card className="rounded-3xl border-white/60 bg-white/80 shadow-lg backdrop-blur-xl">
              <CardHeader>
                <CardTitle>CRUD de Equipo</CardTitle>
                <CardDescription>
                  Campos: userId, role, name, email, position, birthdate, phone, projectId, isActive.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                <Input
                  placeholder="Nombre"
                  value={memberForm.name}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Email"
                  value={memberForm.email}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, email: e.target.value })
                  }
                />
                <Input
                  placeholder="Rol"
                  value={memberForm.role}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, role: e.target.value })
                  }
                />
                <Input
                  placeholder="Cargo"
                  value={memberForm.position}
                  onChange={(e) =>
                    setMemberForm({
                      ...memberForm,
                      position: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Teléfono"
                  value={memberForm.phone}
                  onChange={(e) =>
                    setMemberForm({ ...memberForm, phone: e.target.value })
                  }
                />
                <Input
                  placeholder="Project ID"
                  value={memberForm.projectId}
                  onChange={(e) =>
                    setMemberForm({
                      ...memberForm,
                      projectId: e.target.value,
                    })
                  }
                />

                <Popover>
                  <PopoverTrigger className="rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm">
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "Fecha de nacimiento"}
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                    />
                  </PopoverContent>
                </Popover>

                <Button onClick={addMember}>Agregar Miembro</Button>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {members.map((member) => (
                <Card
                  key={member.userId}
                  className="rounded-3xl border-white/60 bg-white/80 shadow-lg backdrop-blur-xl"
                >
                  <CardContent className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-bold">{member.name}</p>
                        <p className="text-sm text-slate-500">
                          {member.email} | {member.position}
                        </p>
                        <p className="text-xs text-slate-400">
                          ID: {member.userId} | Proyecto: {member.projectId} | Tel: {member.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleMember(member.userId)}
                      >
                        {member.isActive ? "Desactivar" : "Activar"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMember(member.userId)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-5">
            <Card className="rounded-3xl border-white/60 bg-white/80 shadow-lg backdrop-blur-xl">
              <CardHeader>
                <CardTitle>CRUD de Tareas</CardTitle>
                <CardDescription>
                  Campos: description, projectId, status, priority, userId, dateline.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                <Textarea
                  placeholder="Descripción"
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, description: e.target.value })
                  }
                />
                <Input
                  placeholder="Project ID"
                  value={taskForm.projectId}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, projectId: e.target.value })
                  }
                />
                <Input
                  placeholder="User ID"
                  value={taskForm.userId}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, userId: e.target.value })
                  }
                />
                <Input
                  placeholder="Estado"
                  value={taskForm.status}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, status: e.target.value })
                  }
                />
                <Input
                  placeholder="Prioridad"
                  value={taskForm.priority}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, priority: e.target.value })
                  }
                />

                <Popover>
                  <PopoverTrigger className="rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm">
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "Fecha límite"}
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                    />
                  </PopoverContent>
                </Popover>

                <Button onClick={addTask}>Agregar Tarea</Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/60 bg-white/80 shadow-lg backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Lista de Tareas</CardTitle>
                <CardDescription>
                  Sección con paginación usando shadcn/ui Pagination.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {paginatedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-4 shadow-sm md:flex-row md:items-center"
                  >
                    <div>
                      <p className="font-bold">{task.description}</p>
                      <p className="text-sm text-slate-500">
                        Proyecto: {task.projectId} | Usuario: {task.userId} | Fecha: {task.dateline}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Badge variant={statusVariant(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge variant={priorityVariant(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => completeTask(task.id)}
                      >
                        Completar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteTask(task.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage(Math.max(1, page - 1))}
                      />
                    </PaginationItem>

                    <PaginationItem className="px-4 py-2 text-sm">
                      Página {page} de {totalPages || 1}
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setPage(Math.min(totalPages || 1, page + 1))
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="rounded-3xl border-white/60 bg-white/80 shadow-lg backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>
                  Formulario para simular preferencias del sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Nombre de la aplicación</Label>
                  <Input
                    value={settings.appName}
                    onChange={(e) =>
                      setSettings({ ...settings, appName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Correo de soporte</Label>
                  <Input
                    value={settings.supportEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        supportEmail: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Modo de trabajo</Label>
                  <Input
                    value={settings.mode}
                    onChange={(e) =>
                      setSettings({ ...settings, mode: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Notificaciones</Label>
                  <Input
                    value={settings.notifications}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: e.target.value,
                      })
                    }
                  />
                </div>

                <Button onClick={saveSettings} disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Spinner /> Guardando...
                    </span>
                  ) : (
                    "Guardar Configuración"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}