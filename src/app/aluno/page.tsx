'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  COURSE_MODULES,
  UPCOMING_LIVES,
  STUDY_MATERIALS,
  CONSULTING_SESSIONS,
  LiveSession
} from '@/data/courseData';
import {
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  UserCheck,
  Calendar,
  Download,
  UploadCloud,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Award,
  Volume2,
  Maximize2,
  Settings,
  HelpCircle,
  ThumbsUp,
  Share2
} from 'lucide-react';

export default function AlunoDashboard() {
  const [activeTab, setActiveTab] = useState<'aulas' | 'lives' | 'materiais' | 'consultorias' | 'critica'>('aulas');
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [selectedLessonIdx, setSelectedLessonIdx] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    '1-0': true,
    '1-1': true,
  });

  // Mentorship booking state
  const [consultingSlotsLeft, setConsultingSlotsLeft] = useState<number>(2);
  const [selectedSlotDate, setSelectedSlotDate] = useState<string>('12/11/2026');
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('15:00');
  const [consultingTopic, setConsultingTopic] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // Photo critique submission state
  const [critiquePhotoUrl, setCritiquePhotoUrl] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80');
  const [critiqueExif, setCritiqueExif] = useState<string>('Sony A7IV + 85mm f/1.4 GM · 1/320s · f/1.8 · ISO 100');
  const [critiqueComment, setCritiqueComment] = useState<string>('Gostaria de feedback sobre o tom de pele e a suavidade da transição de sombra no rosto.');
  const [critiqueSubmitted, setCritiqueSubmitted] = useState<boolean>(false);

  const currentModule = COURSE_MODULES.find((m) => m.id === selectedModuleId) || COURSE_MODULES[0];
  const currentLesson = currentModule.lessons[selectedLessonIdx] || currentModule.lessons[0];

  const lessonKey = `${currentModule.id}-${selectedLessonIdx}`;
  const isCurrentCompleted = !!completedLessons[lessonKey];

  const toggleLessonComplete = () => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonKey]: !prev[lessonKey],
    }));
  };

  const handleBookConsulting = (e: React.FormEvent) => {
    e.preventDefault();
    if (consultingSlotsLeft > 0) {
      setConsultingSlotsLeft((prev) => prev - 1);
      setBookingConfirmed(true);
    }
  };

  return (
    <div style={{ background: '#07090d', minHeight: '100vh', color: '#f8fafc' }}>
      {/* Top Student Header */}
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
          {/* Student Profile Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid #f59e0b',
              boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Mariana Silveira"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                  Mariana Silveira
                </h1>
                <span className="badge badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  Plano Master & Consultoria
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                Turma Alpha · 68% Concluído (32/49 aulas) · Certificado em andamento
              </p>
            </div>
          </div>

          {/* Progress Pill and Switch Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.82rem'
            }}>
              <Award size={20} color="#f59e0b" />
              <div>
                <div style={{ color: '#ffffff', fontWeight: 600 }}>Próxima Conquista</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Mestre da Fotometria (Faltam 2 aulas)</div>
              </div>
            </div>

            <Link href="/" className="btn-secondary btn-sm" style={{ fontSize: '0.8rem' }}>
              Voltar ao Site
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
              onClick={() => setActiveTab('aulas')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderBottom: activeTab === 'aulas' ? '2px solid #f59e0b' : '2px solid transparent',
                color: activeTab === 'aulas' ? '#f59e0b' : '#94a3b8',
                transition: 'all 0.2s ease',
              }}
            >
              <Play size={16} />
              Aulas Gravadas em 4K
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
              Encontros Ao Vivo Semanais
              <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '9999px' }}>
                Próxima: Qua
              </span>
            </button>

            <button
              onClick={() => setActiveTab('materiais')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderBottom: activeTab === 'materiais' ? '2px solid #10b981' : '2px solid transparent',
                color: activeTab === 'materiais' ? '#10b981' : '#94a3b8',
                transition: 'all 0.2s ease',
              }}
            >
              <FileText size={16} />
              Material Teórico & Presets
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
              Consultorias 1-a-1
              <span style={{ background: '#a78bfa', color: '#07090d', fontSize: '0.65rem', padding: '1px 6px', borderRadius: '9999px', fontWeight: 700 }}>
                {consultingSlotsLeft} Restantes
              </span>
            </button>

            <button
              onClick={() => setActiveTab('critica')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderBottom: activeTab === 'critica' ? '2px solid #ec4899' : '2px solid transparent',
                color: activeTab === 'critica' ? '#ec4899' : '#94a3b8',
                transition: 'all 0.2s ease',
              }}
            >
              <UploadCloud size={16} />
              Enviar Foto para Análise Ao Vivo
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="container" style={{ padding: '36px 24px 80px' }}>

        {/* TAB 1: AULAS GRAVADAS */}
        {activeTab === 'aulas' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: '28px',
          }} className="dashboard-grid">
            {/* Left: Video Player & Details */}
            <div>
              {/* Interactive Player Screen */}
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#020305',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
                aspectRatio: '16 / 9',
              }}>
                {/* Simulated Video Frame */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'url("https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: isPlaying ? 'brightness(1)' : 'brightness(0.65)',
                  transition: 'filter 0.3s ease',
                }} />

                {/* Big Center Play / Pause Button Overlay */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    background: isPlaying ? 'rgba(0,0,0,0.6)' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: isPlaying ? '#ffffff' : '#07090d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                    transition: 'transform 0.2s ease',
                  }}
                  title={isPlaying ? 'Pausar Aula' : 'Iniciar Reprodução'}
                >
                  {isPlaying ? <Pause size={30} /> : <Play size={30} style={{ marginLeft: '4px' }} />}
                </button>

                {/* Custom Video Controls Bar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '14px 20px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}>
                  {/* Progress scrubber bar */}
                  <div style={{
                    width: '100%',
                    height: '5px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '9999px',
                    position: 'relative',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      width: isPlaying ? '55%' : '38%',
                      height: '100%',
                      background: '#f59e0b',
                      borderRadius: '9999px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <button onClick={() => setIsPlaying(!isPlaying)} style={{ color: '#ffffff' }}>
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <Volume2 size={18} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        12:45 / {currentLesson.duration}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}>
                        4K ULTRA-HD
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>1.0x</span>
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Action Bar */}
              <div style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                padding: '20px 24px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
                    {currentModule.title}
                  </div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                    Aula {selectedLessonIdx + 1}: {currentLesson.title}
                  </h2>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={toggleLessonComplete}
                    className={isCurrentCompleted ? 'btn-secondary btn-sm' : 'btn-primary btn-sm'}
                    style={{
                      background: isCurrentCompleted ? 'rgba(16, 185, 129, 0.2)' : undefined,
                      borderColor: isCurrentCompleted ? '#10b981' : undefined,
                      color: isCurrentCompleted ? '#10b981' : undefined,
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>{isCurrentCompleted ? 'Aula Concluída ✓' : 'Marcar como Concluída'}</span>
                  </button>

                  <button className="btn-secondary btn-sm" title="Baixar materiais anexos desta aula">
                    <Download size={15} />
                    <span>Anexos (RAW)</span>
                  </button>
                </div>
              </div>

              {/* Lesson Details & Community Q&A */}
              <div style={{
                marginTop: '24px',
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px', color: '#ffffff' }}>
                  Resumo da Aula & Objetivos Práticos
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '18px' }}>
                  Nesta aula cinematográfica gravada em externa com modelo profissional, você acompanha o fluxo real de tomada de decisão: como posicionar o sujeito em relação ao ângulo do sol poente, escolher a abertura ideal da lente para separar a modelo do plano de fundo e realizar a medição precisa da fotometria pontual sem queimar as altas luzes.
                </p>

                <div style={{
                  padding: '16px',
                  background: 'rgba(245, 158, 11, 0.05)',
                  borderRadius: '10px',
                  borderLeft: '4px solid #f59e0b',
                  fontSize: '0.85rem',
                  color: '#e2e8f0'
                }}>
                  💡 <strong>Desafio Prático da Semana:</strong> Fotografe um retrato usando a técnica demonstrada aos 14:20 e submeta o arquivo RAW revelado na aba "Crítica de Fotos" para avaliação na aula ao vivo de quarta-feira.
                </div>
              </div>
            </div>

            {/* Right: Modules & Lessons Playlist */}
            <div>
              <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                    Módulos do Curso
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 600 }}>
                    5 Módulos
                  </span>
                </div>

                {/* Module Selector Dropdown / Pills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {COURSE_MODULES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedModuleId(m.id);
                        setSelectedLessonIdx(0);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        textAlign: 'left',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        background: selectedModuleId === m.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: selectedModuleId === m.id ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
                        color: selectedModuleId === m.id ? '#fbbf24' : '#cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {m.title}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8', flexShrink: 0 }}>
                        {m.lessonsCount} aulas
                      </span>
                    </button>
                  ))}
                </div>

                {/* Lessons of selected module */}
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>
                  Aulas do Módulo {selectedModuleId}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '420px', overflowY: 'auto' }}>
                  {currentModule.lessons.map((lesson, idx) => {
                    const isSelected = selectedLessonIdx === idx;
                    const isDone = !!completedLessons[`${currentModule.id}-${idx}`];
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedLessonIdx(idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          textAlign: 'left',
                          fontSize: '0.82rem',
                          background: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                          border: isSelected ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                          color: isSelected ? '#ffffff' : '#94a3b8',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                          {isDone ? (
                            <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                          ) : (
                            <Play size={14} color={isSelected ? '#f59e0b' : '#64748b'} style={{ flexShrink: 0 }} />
                          )}
                          <span style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: isSelected ? '#ffffff' : '#cbd5e1',
                            fontWeight: isSelected ? 600 : 400
                          }}>
                            {idx + 1}. {lesson.title}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                          {lesson.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENCONTROS AO VIVO SEMANAIS */}
        {activeTab === 'lives' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-emerald">
                  <Video size={12} /> INTERATIVIDADE EM TEMPO REAL
                </span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                Encontros Semanais Ao Vivo com Lucas Andrade
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                Toda semana nos reunimos pelo Zoom para analisar as fotos dos alunos, tirar dúvidas ao vivo e realizar workshops práticos.
              </p>
            </div>

            {/* Next Live Class Featured Card */}
            <div className="glass-panel-glow" style={{
              padding: '32px',
              borderRadius: '20px',
              marginBottom: '40px',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '28px',
                alignItems: 'center',
              }}>
                <div>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#f87171',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '14px',
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                    PRÓXIMA SESSÃO AO VIVO
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                    {UPCOMING_LIVES[0].title}
                  </h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {UPCOMING_LIVES[0].description}
                  </p>

                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.9rem' }}>
                      <Calendar size={18} />
                      <strong>{UPCOMING_LIVES[0].date}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontSize: '0.9rem' }}>
                      <Clock size={18} />
                      <strong>{UPCOMING_LIVES[0].time}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                      href="https://zoom.us"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '12px 24px' }}
                    >
                      <Video size={18} />
                      <span>Entrar na Sala Zoom (Link do Aluno)</span>
                    </a>
                    <button
                      onClick={() => setActiveTab('critica')}
                      className="btn-secondary"
                      style={{ padding: '12px 20px' }}
                    >
                      <UploadCloud size={16} />
                      <span>Enviar Minha Foto para Análise</span>
                    </button>
                  </div>
                </div>

                <div style={{
                  padding: '24px',
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Alunos confirmados para esta transmissão
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f59e0b', marginBottom: '6px' }}>
                    {UPCOMING_LIVES[0].attendeesCount}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '16px' }}>
                    Envie perguntas no chat ao vivo ou abra o microfone para conversar com o Lucas.
                  </p>
                  <div style={{
                    padding: '8px 12px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '8px',
                    color: '#34d399',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                  }}>
                    ✓ Sua presença está pré-confirmada
                  </div>
                </div>
              </div>
            </div>

            {/* List of Previous Live Recordings */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '18px' }}>
              Gravações dos Encontros Anteriores
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {UPCOMING_LIVES.map((live, i) => (
                <div key={live.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                      {live.status === 'upcoming' ? 'Em Breve' : 'Gravação Disponível'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {live.date}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                    {live.title}
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.6, flex: 1, marginBottom: '18px' }}>
                    {live.description}
                  </p>
                  <button className="btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
                    <Play size={14} />
                    <span>Assistir Gravação na Íntegra</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MATERIAL TEÓRICO & PRESETS */}
        {activeTab === 'materiais' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
                DOWNLOADS & FERRAMENTAS EXCLUSIVAS
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                Biblioteca de Apoio, E-books & Presets
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                Arquivos oficiais para acelerar seu fluxo de trabalho, contratos blindados e presets profissionais de revelação.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
              {STUDY_MATERIALS.map((mat) => (
                <div
                  key={mat.id}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: mat.type === 'PRESET' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
                        color: mat.type === 'PRESET' ? '#f59e0b' : '#60a5fa',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {mat.type}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                        {mat.size}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                      {mat.title}
                    </h4>

                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '20px' }}>
                      {mat.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {mat.downloadsCount} downloads
                    </span>

                    <button
                      className="btn-primary btn-sm"
                      onClick={() => alert(`Iniciando download do material: ${mat.title}`)}
                    >
                      <Download size={14} />
                      <span>Baixar Arquivo</span>
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
            <div style={{ marginBottom: '32px' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>
                ACOMPANHAMENTO VIP INDIVIDUAL
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                Minhas Consultorias Individuais (1-a-1)
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                Encontros exclusivos de 60 minutos por videoconferência com o fotógrafo Lucas Andrade para análise de carreira, precificação e portfólio.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}>
              {/* Left: Schedule Widget */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  Agendar Nova Sessão Individual
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
                  Você possui <strong style={{ color: '#f59e0b' }}>{consultingSlotsLeft} consultorias</strong> disponíveis no seu plano.
                </p>

                {bookingConfirmed ? (
                  <div style={{
                    padding: '24px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid #10b981',
                    borderRadius: '12px',
                    textAlign: 'center',
                  }}>
                    <CheckCircle2 size={42} color="#10b981" style={{ margin: '0 auto 12px' }} />
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                      Consultoria Agendada com Sucesso!
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '14px' }}>
                      Sua mentoria foi marcada para <strong>{selectedSlotDate} às {selectedSlotTime}</strong>.
                      O link do Google Meet e as instruções foram enviados para o seu e-mail cadastrado.
                    </p>
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="btn-secondary btn-sm"
                    >
                      Agendar Outra Sessão
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookConsulting} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                        Data Desejada:
                      </label>
                      <select
                        value={selectedSlotDate}
                        onChange={(e) => setSelectedSlotDate(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                        }}
                      >
                        <option value="12/11/2026" style={{ background: '#0e121a' }}>Quinta-feira, 12 de Novembro de 2026</option>
                        <option value="17/11/2026" style={{ background: '#0e121a' }}>Terça-feira, 17 de Novembro de 2026</option>
                        <option value="20/11/2026" style={{ background: '#0e121a' }}>Sexta-feira, 20 de Novembro de 2026</option>
                        <option value="24/11/2026" style={{ background: '#0e121a' }}>Terça-feira, 24 de Novembro de 2026</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                        Horário Disponível:
                      </label>
                      <select
                        value={selectedSlotTime}
                        onChange={(e) => setSelectedSlotTime(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '0.9rem',
                        }}
                      >
                        <option value="10:00 - 11:00" style={{ background: '#0e121a' }}>10:00 às 11:00</option>
                        <option value="14:00 - 15:00" style={{ background: '#0e121a' }}>14:00 às 15:00</option>
                        <option value="15:30 - 16:30" style={{ background: '#0e121a' }}>15:30 às 16:30</option>
                        <option value="17:00 - 18:00" style={{ background: '#0e121a' }}>17:00 às 18:00</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                        Foco Principal da Mentoria:
                      </label>
                      <textarea
                        rows={3}
                        value={consultingTopic}
                        onChange={(e) => setConsultingTopic(e.target.value)}
                        placeholder="Ex: Quero rever o portfólio do meu último ensaio externo de gestante e precificar pacotes de R$ 1.500..."
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={consultingSlotsLeft <= 0}
                      className="btn-primary"
                      style={{ marginTop: '8px' }}
                    >
                      <Calendar size={16} />
                      <span>Confirmar Agendamento</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Right: History & Mentorship Instructions */}
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
                  Histórico de Consultorias Realizadas
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="glass-panel" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                        Concluída com Sucesso
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        22 de Outubro · 14:00
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                      Diagnóstico de Portfólio & Posicionamento no Instagram
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '12px' }}>
                      Feedback detalhado: Lucas revisou 30 fotos de ensaio externo, ajustou a paleta de cores para tons quentes e sugeriu novo formato de carrossel no feed.
                    </p>
                    <div style={{ fontSize: '0.78rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={14} /> Relatório da sessão salvo em PDF
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                        Próxima Sessão Agendada
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        06 de Novembro · 14:00
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                      Estratégia Comercial: Proposta Irresistível para Casamentos
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                      Preparar arquivo PDF com a proposta atual e custos fixos para montagem da nova tabela de preços.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CRÍTICA DE FOTOS */}
        {activeTab === 'critica' && (
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                FEEDBACK AO VIVO DO MENTOR
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                Envie sua Foto para a Análise da Semana
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                Todas as quartas-feiras às 20h, o Lucas projeta as melhores fotos dos alunos na tela grande para ajustes de recorte, cor e iluminação.
              </p>
            </div>

            {critiqueSubmitted ? (
              <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  Foto Enviada para a Próxima Masterclass!
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '20px' }}>
                  Sua imagem já está na fila de análise da live de quarta-feira. Prepare-se para assistir e tirar dúvidas com o Lucas ao vivo.
                </p>
                <button
                  onClick={() => setCritiqueSubmitted(false)}
                  className="btn-secondary btn-sm"
                >
                  Enviar Outra Imagem
                </button>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '32px', borderRadius: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
                  {/* Preview Image */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '8px' }}>
                      Prévia da Foto Selecionada:
                    </label>
                    <div style={{
                      height: '280px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundImage: `url(${critiquePhotoUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        background: 'rgba(0,0,0,0.7)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#fbbf24',
                      }}>
                        {critiqueExif}
                      </div>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                        Dados EXIF da Câmera (Lente, Abertura, ISO):
                      </label>
                      <input
                        type="text"
                        value={critiqueExif}
                        onChange={(e) => setCritiqueExif(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                        Sua Dúvida ou Ponto que Deseja Avaliação:
                      </label>
                      <textarea
                        rows={4}
                        value={critiqueComment}
                        onChange={(e) => setCritiqueComment(e.target.value)}
                        placeholder="Ex: Como posso melhorar a profundidade deste retrato? Senti que o fundo competiu com o assunto..."
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          fontFamily: 'inherit',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <button
                      onClick={() => setCritiqueSubmitted(true)}
                      className="btn-primary"
                      style={{ marginTop: '8px' }}
                    >
                      <UploadCloud size={16} />
                      <span>Confirmar Envio para a Live</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
