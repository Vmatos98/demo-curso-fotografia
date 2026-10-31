'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Video,
  User,
  ExternalLink,
  Copy,
  Check,
  MapPin,
  X,
  Filter,
  Sparkles,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Eye,
  Laptop
} from 'lucide-react';

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'consultoria' | 'live' | 'gravacao' | 'plantao' | 'pratica';
  dayIndex: number; // 0: Seg, 1: Ter, 2: Qua, 3: Qui, 4: Sex, 5: Sáb, 6: Dom
  dateStr: string; // e.g. "02/11"
  startTime: string; // "14:00"
  endTime: string; // "15:00"
  startHour: number; // 14
  durationHours: number; // 1
  studentName?: string;
  studentAvatar?: string;
  studentEmail?: string;
  planName?: string;
  platform: 'Google Meet' | 'Zoom' | 'Estúdio Lumina' | 'Discord VIP' | 'Presencial';
  meetingUrl?: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Gravação Módulo 4: Pós-Produção no Lightroom',
    type: 'gravacao',
    dayIndex: 0,
    dateStr: '02/11',
    startTime: '10:00',
    endTime: '11:30',
    startHour: 10,
    durationHours: 1.5,
    platform: 'Estúdio Lumina',
    notes: 'Gravação com 2 câmeras 4K. Foco em curadoria e color grading autoral.',
    status: 'completed'
  },
  {
    id: 'evt-2',
    title: 'Consultoria 1-a-1: Mariana Silveira',
    type: 'consultoria',
    dayIndex: 0,
    dateStr: '02/11',
    startTime: '15:00',
    endTime: '16:00',
    startHour: 15,
    durationHours: 1,
    studentName: 'Mariana Silveira',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    studentEmail: 'mariana.foto@gmail.com',
    planName: 'Plano Master & Consultoria',
    platform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/lum-mari-2026',
    notes: 'Transição para fotografia de família e parto. Avaliar primeiros 20 cliques.',
    status: 'confirmed'
  },
  {
    id: 'evt-3',
    title: 'Consultoria 1-a-1: Lucas Peixoto',
    type: 'consultoria',
    dayIndex: 1,
    dateStr: '03/11',
    startTime: '14:00',
    endTime: '15:00',
    startHour: 14,
    durationHours: 1,
    studentName: 'Lucas Peixoto',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    studentEmail: 'lucas.peixoto@fotografia.com',
    planName: 'Plano Master & Consultoria',
    platform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/lum-lucas-2026',
    notes: 'Precificação de casamentos e contratos jurídicos de prestação de serviços.',
    status: 'confirmed'
  },
  {
    id: 'evt-4',
    title: 'Plantão de Dúvidas ao Vivo na Comunidade',
    type: 'plantao',
    dayIndex: 1,
    dateStr: '03/11',
    startTime: '17:00',
    endTime: '18:00',
    startHour: 17,
    durationHours: 1,
    platform: 'Discord VIP',
    meetingUrl: 'https://discord.gg/lumina-vip',
    notes: 'Canal de voz com compartilhamento de tela para tirar dúvidas sobre lentes e foco.',
    status: 'confirmed'
  },
  {
    id: 'evt-5',
    title: 'Revisão Técnica das Fotos Enviadas pelos Alunos',
    type: 'gravacao',
    dayIndex: 2,
    dateStr: '04/11',
    startTime: '09:30',
    endTime: '11:00',
    startHour: 9.5,
    durationHours: 1.5,
    platform: 'Estúdio Lumina',
    notes: 'Preparação dos slides e seleção das 15 melhores fotos para a Masterclass noturna.',
    status: 'confirmed'
  },
  {
    id: 'evt-6',
    title: 'Masterclass Ao Vivo: Análise de Fotos & Feedbacks',
    type: 'live',
    dayIndex: 2,
    dateStr: '04/11',
    startTime: '20:00',
    endTime: '21:30',
    startHour: 20,
    durationHours: 1.5,
    platform: 'Zoom',
    meetingUrl: 'https://zoom.us/j/94827103982',
    notes: '94 alunos inscritos. Análise ao vivo na tela grande com correções em tempo real.',
    status: 'confirmed'
  },
  {
    id: 'evt-7',
    title: 'Consultoria 1-a-1: Rafael Guimarães',
    type: 'consultoria',
    dayIndex: 3,
    dateStr: '05/11',
    startTime: '10:00',
    endTime: '11:00',
    startHour: 10,
    durationHours: 1,
    studentName: 'Rafael Guimarães',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    studentEmail: 'rafa.guimaraes@outlook.com',
    planName: 'Plano Master & Consultoria',
    platform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/lum-rafa-2026',
    notes: 'Setup de tochas Godox em estúdio caseiro e esquemas de luz para beleza.',
    status: 'confirmed'
  },
  {
    id: 'evt-8',
    title: 'Consultoria 1-a-1: Camila Albuquerque',
    type: 'consultoria',
    dayIndex: 3,
    dateStr: '05/11',
    startTime: '16:30',
    endTime: '17:30',
    startHour: 16.5,
    durationHours: 1,
    studentName: 'Camila Albuquerque',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    studentEmail: 'camila.albuquerque@yahoo.com',
    planName: 'Plano Master & Consultoria',
    platform: 'Google Meet',
    meetingUrl: 'https://meet.google.com/lum-cami-2026',
    notes: 'Estratégia para dobrar ticket médio de ensaios de gestante e 15 anos.',
    status: 'pending'
  },
  {
    id: 'evt-9',
    title: 'Workshop Ao Vivo: Iluminação Feminina em Estúdio',
    type: 'live',
    dayIndex: 3,
    dateStr: '05/11',
    startTime: '19:30',
    endTime: '21:00',
    startHour: 19.5,
    durationHours: 1.5,
    platform: 'Zoom',
    meetingUrl: 'https://zoom.us/j/88371920311',
    notes: 'Transmissão com modelo convidada e setup de tochas, octabox e rebatedores.',
    status: 'confirmed'
  },
  {
    id: 'evt-10',
    title: 'Mentoria Coletiva: Fechando Contratos de R$ 5.000+',
    type: 'live',
    dayIndex: 4,
    dateStr: '06/11',
    startTime: '15:00',
    endTime: '16:30',
    startHour: 15,
    durationHours: 1.5,
    platform: 'Zoom',
    meetingUrl: 'https://zoom.us/j/77281923011',
    notes: 'Técnicas de negociação, atendimento a noivas e posicionamento high-ticket.',
    status: 'confirmed'
  },
  {
    id: 'evt-11',
    title: 'Saída Prática de Campo: Golden Hour & Exposição',
    type: 'pratica',
    dayIndex: 5,
    dateStr: '07/11',
    startTime: '08:30',
    endTime: '11:00',
    startHour: 8.5,
    durationHours: 2.5,
    platform: 'Presencial',
    notes: 'Parque Ibirapuera - Portão 7. Prática externa com modelos voluntários.',
    status: 'confirmed'
  }
];

const DAYS_OF_WEEK = [
  { name: 'Segunda', short: 'Seg', dayNum: 2, fullDate: '02/11' },
  { name: 'Terça', short: 'Ter', dayNum: 3, fullDate: '03/11' },
  { name: 'Quarta', short: 'Qua', dayNum: 4, fullDate: '04/11', isToday: true },
  { name: 'Quinta', short: 'Qui', dayNum: 5, fullDate: '05/11' },
  { name: 'Sexta', short: 'Sex', dayNum: 6, fullDate: '06/11' },
  { name: 'Sábado', short: 'Sáb', dayNum: 7, fullDate: '07/11' },
  { name: 'Domingo', short: 'Dom', dayNum: 8, fullDate: '08/11' }
];

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const HOUR_HEIGHT = 62; // px per hour slot

export default function WeeklyScheduleCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'week' | 'workdays'>('week');
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Modal Novo Agendamento
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'consultoria' | 'live' | 'gravacao' | 'plantao' | 'pratica'>('consultoria');
  const [newDayIndex, setNewDayIndex] = useState<number>(0);
  const [newStartHour, setNewStartHour] = useState<number>(14);
  const [newDuration, setNewDuration] = useState<number>(1);
  const [newStudent, setNewStudent] = useState('');
  const [newPlatform, setNewPlatform] = useState<'Google Meet' | 'Zoom' | 'Estúdio Lumina' | 'Discord VIP' | 'Presencial'>('Google Meet');
  const [newNotes, setNewNotes] = useState('');

  const displayedDays = viewMode === 'workdays' ? DAYS_OF_WEEK.slice(0, 5) : DAYS_OF_WEEK;

  const filteredEvents = events.filter((e) => {
    if (selectedType !== 'todos' && e.type !== selectedType) return false;
    if (viewMode === 'workdays' && e.dayIndex > 4) return false;
    return true;
  });

  const getTypeStyle = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'consultoria':
        return {
          bg: 'rgba(139, 92, 246, 0.18)',
          border: 'rgba(167, 139, 250, 0.85)',
          color: '#c4b5fd',
          badgeBg: '#8b5cf6',
          badgeText: '#ffffff',
          label: 'Consultoria 1-a-1'
        };
      case 'live':
        return {
          bg: 'rgba(245, 158, 11, 0.18)',
          border: 'rgba(251, 191, 36, 0.85)',
          color: '#fde68a',
          badgeBg: '#f59e0b',
          badgeText: '#07090d',
          label: 'Aula Ao Vivo (Zoom)'
        };
      case 'gravacao':
        return {
          bg: 'rgba(16, 185, 129, 0.18)',
          border: 'rgba(52, 211, 153, 0.85)',
          color: '#a7f3d0',
          badgeBg: '#10b981',
          badgeText: '#ffffff',
          label: 'Gravação / Estúdio'
        };
      case 'plantao':
        return {
          bg: 'rgba(6, 182, 212, 0.18)',
          border: 'rgba(34, 211, 238, 0.85)',
          color: '#a5f3fc',
          badgeBg: '#06b6d4',
          badgeText: '#07090d',
          label: 'Plantão VIP'
        };
      case 'pratica':
        return {
          bg: 'rgba(244, 63, 94, 0.18)',
          border: 'rgba(251, 113, 133, 0.85)',
          color: '#fecdd3',
          badgeBg: '#f43f5e',
          badgeText: '#ffffff',
          label: 'Prática de Campo'
        };
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const startStr = `${String(Math.floor(newStartHour)).padStart(2, '0')}:${newStartHour % 1 !== 0 ? '30' : '00'}`;
    const endHourNum = newStartHour + newDuration;
    const endStr = `${String(Math.floor(endHourNum)).padStart(2, '0')}:${endHourNum % 1 !== 0 ? '30' : '00'}`;

    const newEvt: CalendarEvent = {
      id: `evt-custom-${Date.now()}`,
      title: newTitle || (newType === 'consultoria' ? `Consultoria 1-a-1: ${newStudent || 'Aluno'}` : 'Nova Sessão'),
      type: newType,
      dayIndex: newDayIndex,
      dateStr: DAYS_OF_WEEK[newDayIndex].fullDate,
      startTime: startStr,
      endTime: endStr,
      startHour: newStartHour,
      durationHours: newDuration,
      studentName: newStudent || undefined,
      platform: newPlatform,
      meetingUrl: newPlatform === 'Google Meet' ? 'https://meet.google.com/lum-sala-mentoria' : 'https://zoom.us/j/live-lumina',
      notes: newNotes,
      status: 'confirmed'
    };

    setEvents((prev) => [...prev, newEvt]);
    setShowAddModal(false);
    // Reset form
    setNewTitle('');
    setNewStudent('');
    setNewNotes('');
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setActiveEvent(null);
  };

  const handleToggleStatus = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const nextStatus = e.status === 'completed' ? 'confirmed' : 'completed';
          return { ...e, status: nextStatus };
        }
        return e;
      })
    );
    if (activeEvent && activeEvent.id === id) {
      setActiveEvent((prev) => (prev ? { ...prev, status: prev.status === 'completed' ? 'confirmed' : 'completed' } : null));
    }
  };

  const openSlotCreator = (dayIdx: number, hour: number) => {
    setNewDayIndex(dayIdx);
    setNewStartHour(hour);
    setNewDuration(1);
    setShowAddModal(true);
  };

  // Red line indicator position for current time (simulate Wednesday at 14:45)
  const currentSimulatedHour = 14.75;
  const currentIndicatorTop = (currentSimulatedHour - 8) * HOUR_HEIGHT;

  return (
    <div
      className="glass-panel"
      style={{
        padding: '28px',
        marginBottom: '32px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'linear-gradient(180deg, rgba(14, 18, 26, 0.85) 0%, rgba(10, 13, 20, 0.95) 100%)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)'
      }}
    >
      {/* 1. TOP HEADER: Title, Date navigation & Quick Action */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.35)'
            }}
          >
            <CalendarIcon size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                Agenda da Semana (Google Calendar Sync)
              </h2>
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                Sincronizado em tempo real
              </span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '2px' }}>
              Visualize e gerencie consultorias 1-a-1, encontros ao vivo, gravações e mentorias coletivas.
            </p>
          </div>
        </div>

        {/* Calendar Nav Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Week Selector buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '3px'
            }}
          >
            <button
              onClick={() => setWeekOffset((prev) => prev - 1)}
              style={{
                padding: '6px 10px',
                borderRadius: '7px',
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.2s'
              }}
              title="Semana Anterior"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() => setWeekOffset(0)}
              style={{
                padding: '6px 14px',
                borderRadius: '7px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: weekOffset === 0 ? '#10b981' : '#cbd5e1',
                background: weekOffset === 0 ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              Hoje
            </button>

            <button
              onClick={() => setWeekOffset((prev) => prev + 1)}
              style={{
                padding: '6px 10px',
                borderRadius: '7px',
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.2s'
              }}
              title="Próxima Semana"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Current Period Label */}
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Semana de 02 a 08 de Novembro, 2026</span>
          </div>

          {/* View Mode Toggle (Semana Completa vs Dias Úteis) */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '3px'
            }}
          >
            <button
              onClick={() => setViewMode('week')}
              style={{
                padding: '6px 12px',
                borderRadius: '7px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: viewMode === 'week' ? '#ffffff' : '#94a3b8',
                background: viewMode === 'week' ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              7 Dias
            </button>
            <button
              onClick={() => setViewMode('workdays')}
              style={{
                padding: '6px 12px',
                borderRadius: '7px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: viewMode === 'workdays' ? '#ffffff' : '#94a3b8',
                background: viewMode === 'workdays' ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              Seg - Sex
            </button>
          </div>

          {/* Add Event Button */}
          <button
            onClick={() => {
              setNewDayIndex(2); // default to Wednesday
              setNewStartHour(14);
              setNewDuration(1);
              setShowAddModal(true);
            }}
            className="btn-primary btn-sm"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              padding: '8px 16px',
              fontSize: '0.82rem',
              gap: '6px'
            }}
          >
            <Plus size={16} />
            <span>Novo Agendamento</span>
          </button>
        </div>
      </div>

      {/* 2. CATEGORY FILTERS & LEGEND BAR */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '16px 0 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginRight: '4px' }}>
            <Filter size={13} style={{ display: 'inline', marginRight: '4px' }} /> FILTRAR:
          </span>

          <button
            onClick={() => setSelectedType('todos')}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              fontSize: '0.76rem',
              fontWeight: 600,
              background: selectedType === 'todos' ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
              color: selectedType === 'todos' ? '#07090d' : '#94a3b8',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s'
            }}
          >
            Todos ({events.length})
          </button>

          <button
            onClick={() => setSelectedType('consultoria')}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              fontSize: '0.76rem',
              fontWeight: 600,
              background: selectedType === 'consultoria' ? '#8b5cf6' : 'rgba(139, 92, 246, 0.12)',
              color: selectedType === 'consultoria' ? '#ffffff' : '#c4b5fd',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a78bfa' }} />
            Consultorias 1-a-1 ({events.filter((e) => e.type === 'consultoria').length})
          </button>

          <button
            onClick={() => setSelectedType('live')}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              fontSize: '0.76rem',
              fontWeight: 600,
              background: selectedType === 'live' ? '#f59e0b' : 'rgba(245, 158, 11, 0.12)',
              color: selectedType === 'live' ? '#07090d' : '#fde68a',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
            Aulas Ao Vivo ({events.filter((e) => e.type === 'live').length})
          </button>

          <button
            onClick={() => setSelectedType('gravacao')}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              fontSize: '0.76rem',
              fontWeight: 600,
              background: selectedType === 'gravacao' ? '#10b981' : 'rgba(16, 185, 129, 0.12)',
              color: selectedType === 'gravacao' ? '#ffffff' : '#a7f3d0',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            Gravações & Estúdio ({events.filter((e) => e.type === 'gravacao').length})
          </button>

          <button
            onClick={() => setSelectedType('plantao')}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              fontSize: '0.76rem',
              fontWeight: 600,
              background: selectedType === 'plantao' ? '#06b6d4' : 'rgba(6, 182, 212, 0.12)',
              color: selectedType === 'plantao' ? '#07090d' : '#a5f3fc',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }} />
            Plantão Discord ({events.filter((e) => e.type === 'plantao').length})
          </button>
        </div>

        {/* Quick hint for user interaction */}
        <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} style={{ color: '#f59e0b' }} />
          <span>Dica: Clique em qualquer horário vazio para agendar diretamente</span>
        </div>
      </div>

      {/* 3. GOOGLE CALENDAR MAIN SCHEDULE GRID */}
      <div
        style={{
          marginTop: '16px',
          overflowX: 'auto',
          borderRadius: '14px',
          background: '#090d14',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ minWidth: viewMode === 'workdays' ? '760px' : '980px', position: 'relative' }}>
          {/* Day of Week Header Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `70px repeat(${displayedDays.length}, 1fr)`,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#0e131d',
              position: 'sticky',
              top: 0,
              zIndex: 20
            }}
          >
            {/* GMT / Timezone cell */}
            <div
              style={{
                padding: '14px 8px',
                textAlign: 'center',
                borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#64748b',
                fontSize: '0.72rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              GMT-3
            </div>

            {/* Day columns headers */}
            {displayedDays.map((day, idx) => (
              <div
                key={day.name}
                style={{
                  padding: '12px 10px',
                  textAlign: 'center',
                  borderRight: idx < displayedDays.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  background: day.isToday ? 'rgba(59, 130, 246, 0.07)' : 'transparent',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ fontSize: '0.76rem', color: day.isToday ? '#60a5fa' : '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                  {day.name}
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: day.isToday ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'transparent',
                    color: day.isToday ? '#ffffff' : '#f1f5f9',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginTop: '4px',
                    boxShadow: day.isToday ? '0 2px 10px rgba(59, 130, 246, 0.5)' : 'none'
                  }}
                >
                  {day.dayNum}
                </div>
              </div>
            ))}
          </div>

          {/* Time Rows and Grid Body */}
          <div style={{ position: 'relative' }}>
            {/* Current simulated time indicator line (Wednesday 14:45) */}
            {displayedDays.some((d) => d.isToday) && (
              <div
                style={{
                  position: 'absolute',
                  top: `${currentIndicatorTop}px`,
                  left: '70px',
                  right: 0,
                  height: '2px',
                  background: '#ef4444',
                  zIndex: 15,
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    position: 'absolute',
                    left: '-5px',
                    boxShadow: '0 0 8px #ef4444'
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '-16px',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontWeight: 700
                  }}
                >
                  Agora · 14:45
                </span>
              </div>
            )}

            {/* Hourly background lines */}
            {HOURS.map((hour) => (
              <div
                key={hour}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `70px repeat(${displayedDays.length}, 1fr)`,
                  height: `${HOUR_HEIGHT}px`,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Time Label on left axis */}
                <div
                  style={{
                    paddingRight: '12px',
                    paddingTop: '6px',
                    textAlign: 'right',
                    color: '#64748b',
                    fontSize: '0.74rem',
                    fontFamily: 'monospace',
                    fontWeight: 500,
                    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                    userSelect: 'none'
                  }}
                >
                  {String(hour).padStart(2, '0')}:00
                </div>

                {/* Day Slot Cells */}
                {displayedDays.map((day, dIdx) => (
                  <div
                    key={`${day.name}-${hour}`}
                    onClick={() => openSlotCreator(dIdx, hour)}
                    style={{
                      borderRight: dIdx < displayedDays.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                      background: day.isToday ? 'rgba(59, 130, 246, 0.02)' : 'transparent',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.04)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = day.isToday ? 'rgba(59, 130, 246, 0.02)' : 'transparent';
                    }}
                    title={`Clique para agendar ${day.name} às ${hour}:00`}
                  />
                ))}
              </div>
            ))}

            {/* Absolute Event Overlays */}
            {filteredEvents.map((evt) => {
              const dayColumnIndex = displayedDays.findIndex((_, idx) => idx === evt.dayIndex);
              if (dayColumnIndex === -1) return null; // Outside selected view (e.g., weekend in workdays view)

              const top = (evt.startHour - 8) * HOUR_HEIGHT;
              const height = evt.durationHours * HOUR_HEIGHT - 4;
              const style = getTypeStyle(evt.type);

              // Calculate left and width based on grid columns
              const colWidthPercent = 100 / displayedDays.length;

              return (
                <div
                  key={evt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEvent(evt);
                  }}
                  style={{
                    position: 'absolute',
                    top: `${top + 2}px`,
                    height: `${Math.max(height, 36)}px`,
                    left: `calc(70px + ${dayColumnIndex * colWidthPercent}% + 3px)`,
                    width: `calc(${colWidthPercent}% - 6px)`,
                    background: style.bg,
                    borderLeft: `4px solid ${style.border}`,
                    borderTop: `1px solid ${style.border}`,
                    borderRight: `1px solid ${style.border}`,
                    borderBottom: `1px solid ${style.border}`,
                    borderRadius: '8px',
                    padding: '6px 8px',
                    cursor: 'pointer',
                    zIndex: 10,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    backdropFilter: 'blur(8px)'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                    (e.currentTarget as HTMLElement).style.zIndex = '18';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                    (e.currentTarget as HTMLElement).style.zIndex = '10';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.3)';
                  }}
                  title={`${evt.title} (${evt.startTime} - ${evt.endTime})`}
                >
                  <div>
                    {/* Header line: Time & Platform Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          color: style.color,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <Clock size={11} />
                        {evt.startTime} - {evt.endTime}
                      </span>

                      {evt.status === 'completed' ? (
                        <span style={{ fontSize: '0.62rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <CheckCircle2 size={11} /> Concluída
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.62rem',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            background: style.badgeBg,
                            color: style.badgeText,
                            fontWeight: 700
                          }}
                        >
                          {evt.platform}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.25,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: evt.durationHours > 1 ? 'normal' : 'nowrap'
                      }}
                    >
                      {evt.title}
                    </div>
                  </div>

                  {/* Footer details: Student or Attendees */}
                  {evt.studentName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                      {evt.studentAvatar ? (
                        <img
                          src={evt.studentAvatar}
                          alt={evt.studentName}
                          style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        <User size={13} style={{ color: '#94a3b8' }} />
                      )}
                      <span style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 500, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {evt.studentName}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. EVENT DETAILS MODAL */}
      {activeEvent && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveEvent(null)}
        >
          <div
            style={{
              background: '#0e131d',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '18px',
              maxWidth: '540px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveEvent(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: '#94a3b8',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            {/* Type badge */}
            <div style={{ marginBottom: '14px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: getTypeStyle(activeEvent.type).badgeBg,
                  color: getTypeStyle(activeEvent.type).badgeText
                }}
              >
                {getTypeStyle(activeEvent.type).label}
              </span>
            </div>

            {/* Title */}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
              {activeEvent.title}
            </h3>

            {/* Time & Date details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '20px'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Horário</span>
                <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <Clock size={15} style={{ color: '#f59e0b' }} />
                  {activeEvent.startTime} às {activeEvent.endTime} ({activeEvent.durationHours}h)
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Plataforma</span>
                <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <Video size={15} style={{ color: '#3b82f6' }} />
                  {activeEvent.platform}
                </div>
              </div>
            </div>

            {/* Student info if consulting */}
            {activeEvent.studentName && (
              <div
                style={{
                  background: 'rgba(139, 92, 246, 0.06)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  padding: '14px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                {activeEvent.studentAvatar ? (
                  <img
                    src={activeEvent.studentAvatar}
                    alt={activeEvent.studentName}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: '#8b5cf6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}
                  >
                    <User size={22} />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                    {activeEvent.studentName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    {activeEvent.studentEmail || 'Aluno matriculado'} · <span style={{ color: '#a78bfa' }}>{activeEvent.planName || 'Plano Master'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {activeEvent.notes && (
              <div style={{ marginBottom: '22px' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                  Anotações da Sessão:
                </span>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.5 }}>
                  {activeEvent.notes}
                </p>
              </div>
            )}

            {/* Meeting link action bar */}
            {activeEvent.meetingUrl && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  marginBottom: '24px'
                }}
              >
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {activeEvent.meetingUrl}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleCopyLink(activeEvent.meetingUrl!)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#f8fafc',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Copiar link"
                  >
                    {copiedLink ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                    {copiedLink ? 'Copiado!' : 'Copiar'}
                  </button>

                  <a
                    href={activeEvent.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: '#3b82f6',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <ExternalLink size={14} />
                    Entrar na Sala
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '18px'
              }}
            >
              <button
                onClick={() => handleDeleteEvent(activeEvent.id)}
                style={{
                  color: '#ef4444',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: 'rgba(239, 68, 68, 0.1)'
                }}
              >
                <Trash2 size={14} />
                Excluir da Agenda
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleToggleStatus(activeEvent.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    background: activeEvent.status === 'completed' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(16, 185, 129, 0.15)',
                    color: activeEvent.status === 'completed' ? '#94a3b8' : '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <CheckCircle2 size={15} />
                  {activeEvent.status === 'completed' ? 'Reabrir Agendamento' : 'Marcar como Concluída'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL NOVO AGENDAMENTO */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              background: '#0e131d',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '18px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: '#94a3b8',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
              Novo Agendamento na Semana
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '20px' }}>
              Adicione uma consultoria 1-a-1, aula ao vivo ou gravação na grade.
            </p>

            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Tipo de Compromisso
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#141a26',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="consultoria">🟣 Consultoria 1-a-1 (VIP)</option>
                  <option value="live">🟡 Aula Ao Vivo / Masterclass (Zoom)</option>
                  <option value="gravacao">🟢 Gravação de Aulas no Estúdio</option>
                  <option value="plantao">🔵 Plantão de Dúvidas (Discord)</option>
                  <option value="pratica">🔴 Prática de Campo Externa</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Título da Sessão
                </label>
                <input
                  type="text"
                  placeholder="Ex: Análise de Fotos de Retrato ou Consultoria 1-a-1"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#141a26',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                  required
                />
              </div>

              {newType === 'consultoria' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Nome do Aluno (Plano Master)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Gabriel Monteiro"
                    value={newStudent}
                    onChange={(e) => setNewStudent(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: '#141a26',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Dia da Semana
                  </label>
                  <select
                    value={newDayIndex}
                    onChange={(e) => setNewDayIndex(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: '#141a26',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.85rem'
                    }}
                  >
                    {DAYS_OF_WEEK.map((d, i) => (
                      <option key={d.name} value={i}>
                        {d.name} ({d.fullDate})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Horário de Início
                  </label>
                  <select
                    value={newStartHour}
                    onChange={(e) => setNewStartHour(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: '#141a26',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.85rem'
                    }}
                  >
                    {HOURS.map((h) => (
                      <option key={h} value={h}>
                        {String(h).padStart(2, '0')}:00
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Duração
                  </label>
                  <select
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: '#141a26',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value={0.5}>30 minutos</option>
                    <option value={1}>1 hora</option>
                    <option value={1.5}>1 hora e 30 min</option>
                    <option value={2}>2 horas</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Plataforma
                  </label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: '#141a26',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Estúdio Lumina">Estúdio Lumina</option>
                    <option value="Discord VIP">Discord VIP</option>
                    <option value="Presencial">Presencial</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                  Anotações / Pauta
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Tópicos a abordar, revisão de fotos, dúvidas prévias..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#141a26',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: '#94a3b8',
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '10px 22px',
                    fontSize: '0.85rem',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff'
                  }}
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
