'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LandingNav from '@/components/LandingNav';
import Footer from '@/components/Footer';
import ExposureSimulator from '@/components/ExposureSimulator';
import {
  COURSE_PLANS,
  COURSE_MODULES,
  UPCOMING_LIVES,
  STUDY_MATERIALS,
  Plan
} from '@/data/courseData';
import {
  PlayCircle,
  Video,
  FileText,
  UserCheck,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Award,
  Clock,
  ShieldCheck,
  ChevronDown,
  Camera,
  Layers,
  HeartHandshake,
  Download,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleModule = (id: number) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'Preciso ter uma câmera profissional topo de linha para fazer o curso?',
      a: 'Não! O método Lumina foca na física da luz, composição e direção de olhar. Você pode começar com qualquer câmera DSLR/Mirrorless de entrada ou até mesmo explorar as configurações manuais do seu smartphone. Você aprenderá como extrair 100% de qualquer equipamento.'
    },
    {
      q: 'Como funcionam as aulas ao vivo se eu não puder assistir no horário?',
      a: 'Todas as transmissões ao vivo semanais são gravadas em resolução 4K e disponibilizadas na Área do Aluno em até 24 horas, com marcadores de capítulos para você rever quantas vezes quiser.'
    },
    {
      q: 'Como são agendadas as Consultorias Individuais 1-a-1?',
      a: 'Alunos do Plano Master & Consultoria têm acesso a um calendário interativo exclusivo dentro da plataforma. Você escolhe o melhor dia e horário e recebe um link de videoconferência particular de 60 minutos com o mentor.'
    },
    {
      q: 'Os materiais teóricos e presets podem ser baixados?',
      a: 'Sim! Todos os e-books em PDF, checklists de produção, modelos de contratos jurídicos e presets do Lightroom (.XMP e .DNG para mobile) são seus para sempre após o download.'
    },
    {
      q: 'Qual é o prazo de garantia se eu não gostar?',
      a: 'Oferecemos 7 dias de garantia incondicional. Se você acessar o curso, assistir às aulas e achar que não é para você, basta nos enviar um e-mail com 1 clique e devolveremos 100% do seu dinheiro, sem perguntas.'
    }
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: '#f8fafc' }}>
      <LandingNav />

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        padding: '80px 0 100px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% -10%, rgba(245, 158, 11, 0.15), transparent 70%), linear-gradient(180deg, #07090d 0%, #0d1219 100%)',
      }}>
        {/* Glow ambient effects */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            {/* Top Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '9999px',
              marginBottom: '24px',
              fontSize: '0.85rem',
              color: '#fbbf24',
              fontWeight: 600,
            }}>
              <Sparkles size={14} />
              FORMAÇÃO DEFINITIVA EM FOTOGRAFIA AUTORAL E COMERCIAL
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '24px',
              letterSpacing: '-0.02em',
            }}>
              Domine a Luz, Crie Fotos de Impacto e <span className="gradient-text-gold">Construa sua Carreira</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '750px',
              margin: '0 auto 36px',
            }}>
              O método completo que reúne <strong style={{ color: '#ffffff' }}>aulas gravadas em 4K</strong>,{' '}
              <strong style={{ color: '#ffffff' }}>encontros ao vivo semanais</strong>,{' '}
              <strong style={{ color: '#ffffff' }}>materiais teóricos & presets</strong> e{' '}
              <strong style={{ color: '#ffffff' }}>consultorias individuais 1-a-1</strong> com fotógrafo profissional.
            </p>

            {/* CTA Group */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}>
              <a href="#planos" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                <span>Ver Planos & Matrícula</span>
                <ArrowRight size={18} />
              </a>

              <Link href="/aluno" className="btn-secondary" style={{ padding: '16px 28px', fontSize: '1.05rem' }}>
                <PlayCircle size={20} color="#60a5fa" />
                <span>Testar Área do Aluno (Demo)</span>
              </Link>
            </div>

            {/* Social Proof Stats Pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              padding: '16px 24px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              maxWidth: '650px',
              margin: '0 auto',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', color: '#f59e0b' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" />
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>4.9/5</span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>satisfação</span>
              </div>

              <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }}></div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} color="#60a5fa" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>+1.400</span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>alunos formados</span>
              </div>

              <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }}></div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} color="#10b981" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Certificado 60h</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Showcase Visual */}
          <div style={{
            marginTop: '60px',
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          }}>
            <div style={{
              height: '460px',
              backgroundImage: 'linear-gradient(180deg, rgba(7,9,13,0.1) 0%, rgba(7,9,13,0.85) 100%), url("https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1600&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '28px',
            }}>
              {/* Top Viewfinder Metadata */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(10px)',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                }}>
                  <span style={{ color: '#10b981' }}>● REC [4K 60FPS]</span>
                  <span style={{ color: '#94a3b8' }}>|</span>
                  <span style={{ color: '#ffffff' }}>50mm f/1.4 · 1/500s · ISO 100</span>
                </div>

                <div style={{
                  background: 'rgba(245, 158, 11, 0.9)',
                  color: '#07090d',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <PlayCircle size={15} />
                  BASTIDORES DO CURSO
                </div>
              </div>

              {/* Bottom Hero Overlay Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}>
                <div className="glass-panel" style={{ padding: '16px', background: 'rgba(10, 14, 20, 0.85)' }}>
                  <div style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontWeight: 700, fontSize: '0.9rem' }}>
                    <PlayCircle size={18} /> Aulas Gravadas
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    +80 aulas gravadas em 4K cinematográfico com acesso imediato e vitalício.
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '16px', background: 'rgba(10, 14, 20, 0.85)' }}>
                  <div style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontWeight: 700, fontSize: '0.9rem' }}>
                    <Video size={18} /> Encontros Ao Vivo
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Sessões semanais pelo Zoom para feedback direto e análise das fotos dos alunos.
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '16px', background: 'rgba(10, 14, 20, 0.85)' }}>
                  <div style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontWeight: 700, fontSize: '0.9rem' }}>
                    <FileText size={18} /> Material & Presets
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    E-books, guias de campo, modelos de contratos e 40 presets autorais inclusos.
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '16px', background: 'rgba(10, 14, 20, 0.85)' }}>
                  <div style={{ color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontWeight: 700, fontSize: '0.9rem' }}>
                    <UserCheck size={18} /> Consultoria 1-a-1
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Mentoria individual com o professor para aceleração de carreira e portfólio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OS 4 PILARES DO MÉTODO */}
      <section id="metodologia" style={{ padding: '100px 0', background: '#0a0e14' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
              POR QUE NOSSO MÉTODO FUNCIONA
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>
              Os 4 Pilares da Formação Fotográfica
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Não é apenas um curso gravado que você abandona pela metade. Criamos um ecossistema completo de suporte, prática e mentoria próxima.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px',
          }}>
            {/* Pilar 1 */}
            <div className="glass-panel" style={{
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <PlayCircle size={28} />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pilar 01
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '6px 0 14px', color: '#ffffff' }}>
                Aulas Gravadas em 4K
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                Mais de 80 aulas cinematográficas gravadas em locações reais, estúdios e externa. Aprenda no seu ritmo, assista do celular, tablet ou computador quando quiser.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Bastidores de ensaios sem cortes
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Edição no Lightroom & Photoshop
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Exercícios práticos pós-aula
                </li>
              </ul>
            </div>

            {/* Pilar 2 */}
            <div className="glass-panel" style={{
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease',
              border: '1px solid rgba(96, 165, 250, 0.3)',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(59, 130, 246, 0.15)',
                color: '#60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <Video size={28} />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pilar 02
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '6px 0 14px', color: '#ffffff' }}>
                Aulas Ao Vivo Semanais
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                Encontros ao vivo semanais pelo Zoom para tirar dúvidas em tempo real, debater tendências e receber análise detalhada das fotos enviadas pelos alunos.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Análise de fotos e feedback ao vivo
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Gravações salvas na plataforma
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Convidados renomados do mercado
                </li>
              </ul>
            </div>

            {/* Pilar 3 */}
            <div className="glass-panel" style={{
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <FileText size={28} />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pilar 03
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '6px 0 14px', color: '#ffffff' }}>
                Material Teórico & Presets
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                Biblioteca rica de apoio com e-books diagramados, guias de campo para levar no bolso, modelos de contratos jurídicos e packs profissionais de presets de cor.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Guias de bolso em PDF para celular
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> 40 Presets Lumina para Lightroom
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Modelos editáveis de propostas e contratos
                </li>
              </ul>
            </div>

            {/* Pilar 4 */}
            <div className="glass-panel" style={{
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease',
              border: '1px solid rgba(167, 139, 250, 0.3)',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(167, 139, 250, 0.15)',
                color: '#a78bfa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <UserCheck size={28} />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pilar 04
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '6px 0 14px', color: '#ffffff' }}>
                Consultorias Individuais (1-a-1)
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                Sessões privadas de 60 minutos diretamente com o mentor para diagnóstico cirúrgico do seu portfólio, definição de preços e estratégia de captação de clientes.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Chamada individual de 1 hora
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Plano de ação sob medida para você
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10b981" /> Acesso direto via WhatsApp VIP
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULADOR INTERATIVO */}
      <section id="simulador" style={{ padding: '100px 0', background: '#07090d' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
              EXPERIMENTE AGORA
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>
              Veja como ensinamos na prática
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
              A fotografia não se aprende decorando números, e sim entendendo a reação da luz. Use nossa ferramenta interativa abaixo para sentir a câmera em suas mãos.
            </p>
          </div>

          <ExposureSimulator />
        </div>
      </section>

      {/* GRADE CURRICULAR COMPLETA */}
      <section id="grade" style={{ padding: '100px 0', background: '#0a0e14' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>
              CONTEÚDO PROGRAMÁTICO
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>
              Uma Jornada Estruturada Passo a Passo
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
              São 5 módulos principais cuidadosamente organizados para transformar qualquer pessoa em um fotógrafo confiante e requisitado.
            </p>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {COURSE_MODULES.map((mod) => {
              const isOpen = expandedModule === mod.id;
              return (
                <div
                  key={mod.id}
                  className="glass-panel"
                  style={{
                    border: isOpen ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <button
                    onClick={() => toggleModule(mod.id)}
                    style={{
                      width: '100%',
                      padding: '22px 28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      background: isOpen ? 'rgba(245, 158, 11, 0.05)' : 'transparent',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: '#f59e0b',
                          fontWeight: 700,
                          background: 'rgba(245, 158, 11, 0.1)',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          MÓDULO {mod.id}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={13} /> {mod.duration}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                          • {mod.lessonsCount} Aulas
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                        {mod.title}
                      </h3>
                    </div>

                    <div style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      color: isOpen ? '#f59e0b' : '#94a3b8'
                    }}>
                      <ChevronDown size={22} />
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 28px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '16px 0', lineHeight: 1.6 }}>
                        {mod.description}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {mod.lessons.map((lesson, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '10px 14px',
                              background: 'rgba(255, 255, 255, 0.02)',
                              borderRadius: '8px',
                              fontSize: '0.86rem',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                              <PlayCircle size={16} color="#f59e0b" />
                              <span>{lesson.title}</span>
                            </div>
                            <span style={{ color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALERIA DOS ALUNOS / ESTILOS DE FOTOGRAFIA */}
      <section style={{ padding: '100px 0', background: '#07090d' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
              VERSATILIDADE E MERCADO
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>
              Fotografia que Conquista Clientes e Prêmios
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
              O treinamento capacita você a dominar os nichos mais lucrativos da fotografia contemporânea:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {[
              {
                title: 'Retratos Autorais & Boudoir',
                desc: 'Direção humanizada de pessoas reais e iluminação intimista.',
                img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
                specs: '85mm f/1.4 · Luz de Janela + Rebatedor'
              },
              {
                title: 'Casamentos & Eventos Sociais',
                desc: 'Captura espontânea de momentos decisivos e fotojornalismo refinado.',
                img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
                specs: '35mm f/1.8 · Luz Ambiente Dourada'
              },
              {
                title: 'Ensaios Urbanos & Street',
                desc: 'Leitura rápida de composição urbana e contrastes da cidade.',
                img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
                specs: '28mm f/2.8 · 1/1000s · Geometria'
              },
              {
                title: 'Estúdio & Editorial Comercial',
                desc: 'Esquemas profissionais com flashes tocha e modificadores.',
                img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
                specs: '105mm f/8 · Octabox + Strip light'
              }
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  height: '340px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `linear-gradient(180deg, transparent 40%, rgba(7,9,13,0.95) 100%), url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.4s ease',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#fbbf24',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    marginBottom: '8px'
                  }}>
                    {item.specs}
                  </span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.84rem' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS DE CURSOS & PREÇOS (DESTAQUE DA PROPOSTA) */}
      <section id="planos" style={{ padding: '110px 0', background: '#0a0e14', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
              INVESTIMENTO & MATRÍCULA
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
              Escolha o Plano Ideal para a sua Evolução
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Todos os planos incluem acesso imediato, suporte e certificado de conclusão. Selecione o nível de acompanhamento que você deseja.
            </p>

            {/* Billing Cycle Switcher */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '4px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginTop: '28px',
            }}>
              <button
                onClick={() => setBillingCycle('annual')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  background: billingCycle === 'annual' ? '#f59e0b' : 'transparent',
                  color: billingCycle === 'annual' ? '#07090d' : '#94a3b8',
                }}
              >
                Pagamento Anual (Economize até 35%)
              </button>

              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  background: billingCycle === 'monthly' ? '#f59e0b' : 'transparent',
                  color: billingCycle === 'monthly' ? '#07090d' : '#94a3b8',
                }}
              >
                Parcelamento em 12x
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '28px',
            alignItems: 'stretch',
          }}>
            {COURSE_PLANS.map((plan) => {
              const isPopular = plan.popular;
              return (
                <div
                  key={plan.id}
                  className={isPopular ? 'glass-panel-glow' : 'glass-panel'}
                  style={{
                    padding: '36px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    background: isPopular ? 'rgba(18, 24, 38, 0.95)' : 'rgba(14, 18, 26, 0.75)',
                    transform: isPopular ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Top Badge for Popular or Limited */}
                  {plan.badge && (
                    <div style={{
                      position: 'absolute',
                      top: '-13px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: plan.popular ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '#10b981',
                      color: plan.popular ? '#07090d' : '#ffffff',
                      padding: '4px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                    }}>
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan Header */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                      {plan.name}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.86rem', minHeight: '42px', lineHeight: 1.5 }}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div style={{
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '14px',
                    marginBottom: '28px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}>
                    {billingCycle === 'annual' ? (
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '2px' }}>
                          À vista por apenas
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                          <span style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: 600 }}>R$</span>
                          <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>
                            {plan.priceAnnualTotal.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                          </span>
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>/ano</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>
                          Ou em até 12x no cartão de crédito
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '2px' }}>
                          Parcelamento em
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                            {plan.installments}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>
                          Total de R$ {plan.priceAnnualTotal.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div style={{ flex: 1, marginBottom: '32px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                      O que está incluso:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
                      {plan.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#e2e8f0' }}>
                          <Check size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.notIncluded && plan.notIncluded.map((notFeat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#64748b' }}>
                          <X size={18} color="#475569" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ textDecoration: 'line-through' }}>{notFeat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Target Audience Note */}
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}>
                    💡 <strong style={{ color: '#cbd5e1' }}>Indicado para:</strong> {plan.targetAudience}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/checkout?plano=${plan.id}`}
                    className={isPopular ? 'btn-primary' : 'btn-secondary'}
                    style={{ width: '100%', textAlign: 'center', padding: '14px 20px' }}
                  >
                    <span>Garantir Vaga no {plan.name}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Guarantee banner under plans */}
          <div style={{
            marginTop: '50px',
            padding: '24px 32px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                  Garantia Total de Satisfação de 7 Dias
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                  Acesse toda a plataforma, assista às primeiras aulas e avalie o material. Risco zero para a sua inscrição.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                🔒 Pagamento 100% Seguro via Cartão, Pix ou Boleto
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PERFIL DO INSTRUTOR / FOTÓGRAFO */}
      <section style={{ padding: '100px 0', background: '#07090d' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            {/* Instructor Photo */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: '2px solid rgba(245, 158, 11, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                height: '460px',
                backgroundImage: 'url("https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
              }} />

              {/* Floating Award Badge */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                background: 'rgba(11, 15, 22, 0.95)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                padding: '14px 20px',
                borderRadius: '16px',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
              }}>
                <Award size={28} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>Lucas Andrade</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>+14 anos no mercado & Mentor</div>
                </div>
              </div>
            </div>

            {/* Instructor Bio */}
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
                SEU MENTOR E PROFESSOR
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '20px' }}>
                Aprenda com quem vive da fotografia todos os dias
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, marginBottom: '18px' }}>
                "Quando comecei, perdi meses tentando decifrar tutoriais desconexos na internet e gastando dinheiro em equipamentos que não precisava. Meu propósito com a <strong>Lumina Academy</strong> é entregar o caminho claro, sem mistérios ou segredos guardados a sete chaves."
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '28px' }}>
                Fotógrafo premiado com trabalhos publicados em revistas de moda e casamentos por todo o Brasil e Europa. Criou este método integrando a facilidade das gravações com o calor e a proximidade das aulas ao vivo e consultorias individuais.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>+1.400</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Fotógrafos formados</div>
                </div>
                <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>14 Anos</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Experiência de mercado</div>
                </div>
              </div>

              <a href="#planos" className="btn-primary">
                <span>Quero ser mentorado por Lucas</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ padding: '90px 0', background: '#0a0e14' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
              TIRA-DÚVIDAS
            </span>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, marginBottom: '12px' }}>
              Perguntas Frequentes
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
              Tudo o que você precisa saber antes de iniciar sua jornada conosco.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    overflow: 'hidden',
                    border: isOpen ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: isOpen ? '#f59e0b' : '#ffffff',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                        marginLeft: '12px'
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section style={{
        padding: '90px 0',
        background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(11,15,22,0.95) 100%)',
        borderTop: '1px solid rgba(245, 158, 11, 0.2)',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '20px' }}>
            Pronto para transformar sua paixão por fotografia em excelência?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '36px', lineHeight: 1.6 }}>
            Junte-se à comunidade mais ativa de fotógrafos. Aulas gravadas em 4K, encontros semanais ao vivo, materiais práticos e consultorias com quem entende do assunto.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#planos" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
              <span>Quero Fazer Minha Matrícula</span>
              <ArrowRight size={18} />
            </a>
            <Link href="/aluno" className="btn-secondary" style={{ padding: '16px 30px' }}>
              <span>Conhecer a Área do Aluno</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
