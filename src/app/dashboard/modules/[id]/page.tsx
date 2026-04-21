
"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, PlayCircle, FileText, CheckCircle2, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

const MODULE_DATA: Record<string, any> = {
  "1": { title: "Introdução ao Método", lessons: [
    { title: "Boas-vindas ao Sono Zen", type: "video", duration: "5 min", completed: true },
    { title: "A Ciência por trás do Método", type: "text", duration: "7 min", completed: false },
    { title: "O que esperar na primeira semana", type: "video", duration: "3 min", completed: false },
  ]},
  "2": { title: "A Receita do Chá", lessons: [
    { title: "Lista de Ervas Mágicas", type: "text", duration: "5 min", completed: false },
    { title: "O preparo perfeito (Vídeo)", type: "video", duration: "8 min", completed: false },
  ]},
  "3": { title: "Técnica de Respiração", lessons: [
    { title: "O Guia da Respiração 4-7-8", type: "video", duration: "8 min", completed: false },
  ]},
  "4": { title: "Sua Nova Rotina", lessons: [
    { title: "Preparando o Ambiente", type: "video", duration: "10 min", completed: false },
    { title: "O que evitar antes de deitar", type: "text", duration: "6 min", completed: false },
  ]},
  "5": { title: "Dicas Extras", lessons: [
    { title: "Suplementação Inteligente", type: "text", duration: "10 min", completed: false },
    { title: "Respondendo Dúvidas", type: "video", duration: "15 min", completed: false },
  ]}
};

export default function ModulePage() {
  const { id } = useParams();
  const router = useRouter();
  const module = MODULE_DATA[id as string] || MODULE_DATA["1"];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="rounded-full bg-white/5">
          <ChevronLeft />
        </Button>
        <div>
          <p className="text-xs text-secondary font-bold uppercase tracking-widest">Módulo {id}</p>
          <h1 className="text-2xl font-headline font-bold">{module.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video w-full rounded-3xl glass-dark border border-white/5 flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <PlayCircle className="w-20 h-20 text-secondary drop-shadow-2xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-lg font-bold">Assistindo agora: {module.lessons[0].title}</h3>
            </div>
          </div>

          <div className="glass-dark border-white/5 p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-headline font-bold">Sobre esta aula</h3>
            <p className="text-muted-foreground leading-relaxed">
              Nesta aula vamos aprofundar nos fundamentos do método Sono Zen. Você aprenderá como preparar seu corpo para o estado de relaxamento profundo e por que a combinação do chá com a respiração é tão poderosa.
            </p>
            <div className="flex gap-4 pt-4">
              <Button className="bg-secondary hover:bg-secondary/90 rounded-xl px-8">Marcar como Concluída</Button>
              <Button variant="outline" className="border-white/10 rounded-xl">Download PDF</Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-8">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-white" disabled={id === "1"}>
              <ArrowLeft className="w-4 h-4" /> Módulo Anterior
            </Button>
            <Button variant="ghost" className="gap-2 text-secondary hover:text-secondary/80" disabled={id === "5"}>
              Próximo Módulo <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-headline font-bold px-2">Aulas deste Módulo</h3>
          <div className="space-y-3">
            {module.lessons.map((lesson: any, i: number) => (
              <Card key={i} className={`glass-dark border-white/5 hover:border-secondary/30 transition-all cursor-pointer overflow-hidden ${i === 0 ? 'border-secondary/50 bg-secondary/5' : ''}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${lesson.completed ? 'bg-accent/20 text-accent' : 'bg-white/5 text-muted-foreground'}`}>
                    {lesson.completed ? <CheckCircle2 className="w-5 h-5" /> : (lesson.type === 'video' ? <PlayCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${i === 0 ? 'text-secondary' : ''}`}>{lesson.title}</p>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration}</span>
                      <span className="bg-white/5 px-2 py-0.5 rounded uppercase">{lesson.type}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
