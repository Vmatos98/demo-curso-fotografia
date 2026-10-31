'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  COURSE_PLANS,
  STUDENTS_LIST,
  CONSULTING_SESSIONS,
  UPCOMING_LIVES,
  STUDY_MATERIALS
} from '@/data/courseData';
import {
  Users,
  DollarSign,
  TrendingUp,
  Video,
  UserCheck,
  Calendar,
  PlusCircle,
  Search,
  Filter,
  CheckCircle,
  Clock,
  ExternalLink,
  UploadCloud,
  FileText,
  Mail,
  MessageCircle,
  Sparkles,
  BarChart3,
  BookOpen
} from 'lucide-react';
import WeeklyScheduleCalendar from '@/components/WeeklyScheduleCalendar';
import GestorFinanceiro from '@/components/GestorFinanceiro';

export default function GestorDashboard() {
  const [activeTab, setActiveTab] = useState<'metricas' | 'financeiro' | 'alunos' | 'lives' | 'consultorias' | 'conteudo'>('metricas');
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('todos');

  // New Live modal mock
  const [showNewLiveModal, setShowNewLiveModal] = useState(false);
  const [liveTitle, setLiveTitle] = useState('');
  const [liveDate, setLiveDate] = useState('');
  const [liveTime, setLiveTime] = useState('');
  const [liveSuccessMsg, setLiveSuccessMsg] = useState(false);

  // New Content upload mock
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState(false);

  const filteredStudents = STUDENTS_LIST.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'todos' || student.plan.toLowerCase().includes(planFilter.toLowerCase());
    return matchesSearch && matchesPlan;
  });

  const handleCreateLive = (e: React.FormEvent) => {
    e.preventDefault();
    setLiveSuccessMsg(true);
    setTimeout(() => {
      setLiveSuccessMsg(false);
      setShowNewLiveModal(false);
    }, 2000);
  };

  return (
    <div style={{ background: '#07090d', minHeight: '100vh', color: '#f8fafc' }}>
      {/* Top Admin Header */}
      <div style={{
        background: '#0d1117',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 0',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Admin Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
            }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                  Painel do Gestor & Mentor
                </h1>
                <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  ADMINISTRADOR
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                Lumina Master Academy · Gestão de Turmas, Faturamento & Consultorias
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setShowNewLiveModal(true)}
              className="btn-primary btn-sm"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff' }}
            >
              <PlusCircle size={15} />
              <span>Agendar Aula Ao Vivo</span>
            </button>

            <Link href="/" className="btn-secondary btn-sm" style={{ fontSize: '0.8rem' }}>
              Ver Site Público
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="container" style={{ marginTop: '20px' }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            overflowX: 'auto',
            paddingBottom: '2px'
          }}>
            <button
              onClick={() => setActiveTab('metricas')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderBottom: activeTab === 'metricas' ? '2px solid #10b981' : '2px solid transparent',
                color: activeTab === 'metricas' ? '#10b981' : '#94a3b8',
                transition: 'all 0.2s ease',
              }}
            >
              <BarChart3 size={16} />
              Dashboard & Indicadores
            </button>

            <button
              onClick={() => setActiveTab('financeiro')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderBottom: activeTab === 'financeiro' ? '2px solid #10b981' : '2px solid transparent',
                color: activeTab === 'financeiro' ? '#10b981' : '#94a3b8',
                transition: 'all 0.2s ease',
              }}
            >
              <DollarSign size={16} />
              Financeiro & Churn
              <span style={{ background: '#10b981', color: '#07090d', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '9999px', fontWeight: 700 }}>
                R$ 54.8k
              </span>
            </button>

            <button
              onClick={() => setActiveTab('alunos')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderBottom: activeTab === 'alunos' ? '2px solid #f59e0b' : '2px solid transparent',
                color: activeTab === 'alunos' ? '#f59e0b' : '#94a3b8',
                transition: 'all 0.2s ease',
              }}
            >
              <Users size={16} />
              Alunos & Matrículas (CRM)
              <span style={{ background: '#f59e0b', color: '#07090d', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '9999px', fontWeight: 700 }}>
                1.420
              </span>
            </button>

            <button
              onClick={() => setActiveTab('lives')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderBottom: activeTab === 'lives' ? '2px solid #60a5fa' : '2px solid transparent',
                color: activeTab === 'lives' ? '#60a5fa' : '#94a3b8',
                transition: 'all 0.2s ease',
              }}
            >
              <Video size={16} />
              Gestão de Aulas Ao Vivo
            </button>

            <button
              onClick={() => setActiveTab('consultorias')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderBottom: activeTab === 'consultorias' ? '2px solid #a78bfa' : '2px solid transparent',
                color: activeTab === 'consultorias' ? '#a78bfa' : '#94a3b8',
                transition: 'all 0.2s ease',
              }}
            >
              <UserCheck size={16} />
              Agenda de Consultorias (1-a-1)
              <span style={{ background: '#a78bfa', color: '#07090d', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '9999px', fontWeight: 700 }}>
                3 Pendentes
              </span>
            </button>

            <button
              onClick={() => setActiveTab('conteudo')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderBottom: activeTab === 'conteudo' ? '2px solid #ec4899' : '2px solid transparent',
                color: activeTab === 'conteudo' ? '#ec4899' : '#94a3b8',
                transition: 'all 0.2s ease',
              }}
            >
              <BookOpen size={16} />
              Publicar Aulas & Presets
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="container" style={{ padding: '36px 24px 80px' }}>

        {/* TAB 1: METRICAS E KPI */}
        {activeTab === 'metricas' && (
          <div>
            {/* 4 Big KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>FATURAMENTO MENSAL (MRR)</span>
                  <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                    <DollarSign size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  R$ 54.820
                </div>
                <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={14} /> +18.4% em relação ao mês anterior
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>ALUNOS MATRICULADOS</span>
                  <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
                    <Users size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  1.420
                </div>
                <div style={{ fontSize: '0.8rem', color: '#f59e0b' }}>
                  +42 novas matrículas este mês
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>CONSULTORIAS 1-A-1 ATIVAS</span>
                  <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(167,139,250,0.15)', color: '#a78bfa' }}>
                    <UserCheck size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  18 / 24
                </div>
                <div style={{ fontSize: '0.8rem', color: '#a78bfa' }}>
                  6 slots disponíveis na agenda
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>TAXA DE CONCLUSÃO</span>
                  <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
                    <TrendingUp size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  88.2%
                </div>
                <div style={{ fontSize: '0.8rem', color: '#60a5fa' }}>
                  Muito acima da média do mercado (12%)
                </div>
              </div>
            </div>

            {/* Google Calendar Weekly Schedule */}
            <WeeklyScheduleCalendar />

            {/* Distribution by Plan & Next Operations */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {/* Plan Distribution */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
                  Distribuição de Alunos por Plano
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ color: '#cbd5e1' }}>Plano Pro Master (Gravadas + Ao Vivo)</span>
                      <strong style={{ color: '#f59e0b' }}>780 alunos (55%)</strong>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '55%', height: '100%', background: '#f59e0b' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ color: '#cbd5e1' }}>Plano Essencial (Apenas Gravadas)</span>
                      <strong style={{ color: '#64748b' }}>490 alunos (34%)</strong>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '34%', height: '100%', background: '#64748b' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ color: '#cbd5e1' }}>Plano Master & Consultoria 1-a-1</span>
                      <strong style={{ color: '#10b981' }}>150 alunos (11%)</strong>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: '11%', height: '100%', background: '#10b981' }}></div>
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '24px',
                  padding: '14px',
                  background: 'rgba(245, 158, 11, 0.05)',
                  borderRadius: '10px',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  fontSize: '0.82rem',
                  color: '#fbbf24'
                }}>
                  💡 O Plano Pro Master é o mais rentável e com maior retenção devido aos encontros semanais.
                </div>
              </div>

              {/* Next Operational Tasks */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
                  Tarefas e Prioridades do Mentor
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: '4px solid #ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                        Live de Feedback Quarta 20h
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        14 fotos de alunos na fila de análise
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('lives')} className="btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
                      Ver Fila
                    </button>
                  </div>

                  <div style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: '4px solid #a78bfa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                        Consultoria com Mariana Silveira
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        Amanhã às 14:00 (Meet já gerado)
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('consultorias')} className="btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
                      Detalhes
                    </button>
                  </div>

                  <div style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    borderLeft: '4px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>
                        Subir Novo Pack de Presets de Verão
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        Arquivos .XMP prontos para download
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('conteudo')} className="btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB FINANCEIRO: SAÚDE DO NEGÓCIO & MÊS A MÊS */}
        {activeTab === 'financeiro' && <GestorFinanceiro />}

        {/* TAB 2: ALUNOS E CRM */}
        {activeTab === 'alunos' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                  Gestão de Alunos & Matrículas
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Acompanhe o engajamento, plano contratado e consultorias utilizadas por cada aluno.
                </p>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou e-mail..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '8px 14px 8px 36px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      width: '240px'
                    }}
                  />
                </div>

                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: '#0d1117',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="todos">Todos os Planos</option>
                  <option value="essencial">Plano Essencial</option>
                  <option value="pro">Plano Pro Master</option>
                  <option value="master">Plano Master & Consultoria</option>
                </select>
              </div>
            </div>

            {/* Students Table */}
            <div className="glass-panel" style={{ overflowX: 'auto', borderRadius: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                    <th style={{ padding: '16px 20px', color: '#94a3b8', fontWeight: 600 }}>Aluno</th>
                    <th style={{ padding: '16px 20px', color: '#94a3b8', fontWeight: 600 }}>Plano</th>
                    <th style={{ padding: '16px 20px', color: '#94a3b8', fontWeight: 600 }}>Progresso</th>
                    <th style={{ padding: '16px 20px', color: '#94a3b8', fontWeight: 600 }}>Consultorias 1-a-1</th>
                    <th style={{ padding: '16px 20px', color: '#94a3b8', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '16px 20px', color: '#94a3b8', fontWeight: 600, textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((std) => (
                    <tr key={std.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={std.avatar}
                            alt={std.name}
                            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: '#ffffff' }}>{std.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{std.email}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: std.plan.includes('Master') ? 'rgba(16, 185, 129, 0.15)' :
                                      std.plan.includes('Pro') ? 'rgba(245, 158, 11, 0.15)' : 'rgba(100, 116, 139, 0.2)',
                          color: std.plan.includes('Master') ? '#34d399' :
                                 std.plan.includes('Pro') ? '#fbbf24' : '#cbd5e1'
                        }}>
                          {std.plan}
                        </span>
                      </td>

                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div style={{ width: `${std.progress}%`, height: '100%', background: '#f59e0b' }} />
                          </div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                            {std.progress}%
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: '16px 20px' }}>
                        {std.consultingsTotal > 0 ? (
                          <span style={{ fontSize: '0.82rem', color: '#a78bfa', fontWeight: 600 }}>
                            {std.consultingsUsed} de {std.consultingsTotal} utilizadas
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Não incluso</span>
                        )}
                      </td>

                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#10b981',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                          {std.status}
                        </span>
                      </td>

                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            title="Conversar via WhatsApp"
                            onClick={() => alert(`Abrindo conversa de suporte no WhatsApp com ${std.name}`)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              background: 'rgba(16,185,129,0.15)',
                              color: '#10b981'
                            }}
                          >
                            <MessageCircle size={15} />
                          </button>

                          <button
                            title="Ver histórico do aluno"
                            onClick={() => alert(`Exibindo ficha acadêmica completa de ${std.name}`)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              background: 'rgba(255,255,255,0.06)',
                              color: '#ffffff'
                            }}
                          >
                            <FileText size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: GESTAO DE LIVES */}
        {activeTab === 'lives' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px'
            }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                  Sessões Ao Vivo Semanais
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Gerencie links do Zoom/Meet, envie notificações em massa e suba as gravações para a plataforma.
                </p>
              </div>

              <button
                onClick={() => setShowNewLiveModal(true)}
                className="btn-primary btn-sm"
              >
                <PlusCircle size={15} />
                <span>Nova Sessão Ao Vivo</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {UPCOMING_LIVES.map((live) => (
                <div key={live.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-emerald">
                      {live.status === 'upcoming' ? 'Agendada' : 'Finalizada'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {live.date} às {live.time}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                    {live.title}
                  </h3>

                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
                    {live.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
                      {live.attendeesCount} alunos inscritos
                    </span>

                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => alert(`Link de transmissão da aula copiado para a área de transferência!`)}
                    >
                      <span>Copiar Link Zoom</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONSULTORIAS 1-A-1 */}
        {activeTab === 'consultorias' && (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                Agenda de Consultorias Individuais (1-a-1)
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Sessões particulares com alunos do Plano Master para diagnóstico e mentoria de carreira.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {CONSULTING_SESSIONS.map((sess) => (
                <div key={sess.id} className="glass-panel" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                      {sess.status === 'confirmed' ? 'Confirmada' : 'Aguardando Confirmação'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {sess.date} ({sess.time})
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                    {sess.studentName}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: '#60a5fa', marginBottom: '12px', fontWeight: 600 }}>
                    Tópico: {sess.topic}
                  </div>

                  <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '16px' }}>
                    <strong>Anotações prévias:</strong> {sess.notes}
                  </p>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href="https://meet.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-sm"
                      style={{ flex: 1, textAlign: 'center' }}
                    >
                      <Video size={14} />
                      <span>Abrir Google Meet</span>
                    </a>

                    <a
                      href={sess.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary btn-sm"
                      title="Ver Portfólio do Aluno"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PUBLICAR CONTEUDO */}
        {activeTab === 'conteudo' && (
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <div style={{ marginBottom: '28px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                Upload & Publicação de Conteúdo
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Adicione novas aulas gravadas, arquivos RAW para prática, e-books e packs de presets.
              </p>
            </div>

            {uploadSuccessMsg ? (
              <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
                <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  Material Publicado com Sucesso!
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Os alunos já podem visualizar o novo conteúdo na Área do Aluno e receberão uma notificação automática.
                </p>
                <button onClick={() => setUploadSuccessMsg(false)} className="btn-secondary btn-sm">
                  Fazer Novo Upload
                </button>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '32px', borderRadius: '18px' }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setUploadSuccessMsg(true);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      Tipo de Conteúdo:
                    </label>
                    <select
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#0d1117',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option>Aula Gravada em 4K (Vídeo MP4 / HLS)</option>
                      <option>Pack de Presets Lightroom (.XMP / .DNG)</option>
                      <option>Material Teórico em PDF / E-book</option>
                      <option>Arquivo RAW de Exercício Prático</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      Título da Aula ou Material:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Como Direcionar Casais Tímidos em Ensaios de Golden Hour"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      Módulo Destino:
                    </label>
                    <select
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#0d1117',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option>Módulo 1: Fundamentos & Desvendando a Câmera</option>
                      <option>Módulo 2: Domínio Absoluto da Luz</option>
                      <option>Módulo 3: Composição & Narrativa Visual</option>
                      <option>Módulo 4: Pós-Produção no Lightroom & Photoshop</option>
                      <option>Módulo 5: O Negócio da Fotografia</option>
                    </select>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div style={{
                    border: '2px dashed rgba(245, 158, 11, 0.4)',
                    borderRadius: '12px',
                    padding: '36px 20px',
                    textAlign: 'center',
                    background: 'rgba(245, 158, 11, 0.02)',
                    cursor: 'pointer'
                  }}>
                    <UploadCloud size={40} color="#f59e0b" style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>
                      Arraste seu arquivo de vídeo ou anexo aqui
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      Suporta MP4, MOV, PDF, ZIP até 5GB por arquivo
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
                    <UploadCloud size={16} />
                    <span>Publicar na Plataforma</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL: NOVA AULA AO VIVO */}
      {showNewLiveModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '520px',
            width: '100%',
            padding: '32px',
            borderRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            background: '#0d1117'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Agendar Nova Sessão Ao Vivo
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
              Um link Zoom e notificação por e-mail serão gerados automaticamente para todos os alunos com acesso a lives.
            </p>

            {liveSuccessMsg ? (
              <div style={{ padding: '20px', background: 'rgba(16,185,129,0.15)', borderRadius: '10px', textAlign: 'center', color: '#10b981' }}>
                <CheckCircle size={32} style={{ margin: '0 auto 8px' }} />
                Aula agendada e notificações disparadas!
              </div>
            ) : (
              <form onSubmit={handleCreateLive} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                    Tema da Live:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Análise de Fotos de Retrato & Direção"
                    value={liveTitle}
                    onChange={(e) => setLiveTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      Data:
                    </label>
                    <input
                      type="date"
                      required
                      value={liveDate}
                      onChange={(e) => setLiveDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      Horário:
                    </label>
                    <input
                      type="time"
                      required
                      value={liveTime}
                      onChange={(e) => setLiveTime(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                    Confirmar e Notificar Turma
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewLiveModal(false)}
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
