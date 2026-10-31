'use client';

import React from 'react';
import Link from 'next/link';
import { Aperture, Camera, Video, Mail, MapPin, ShieldCheck, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#040608',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '60px 0 30px',
      color: '#94a3b8',
      fontSize: '0.88rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Column 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#07090d',
              }}>
                <Aperture size={20} />
              </div>
              <div>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  display: 'block',
                  lineHeight: 1,
                }}>
                  LUMINA
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  color: '#f59e0b',
                  textTransform: 'uppercase'
                }}>
                  Master Academy
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.6, marginBottom: '18px' }}>
              Formação completa para fotógrafos que desejam dominar a luz, construir um portfólio de respeito e viver com liberdade da sua arte.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{ padding: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', color: '#ffffff' }} aria-label="Instagram">
                <Camera size={18} />
              </a>
              <a href="#" style={{ padding: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', color: '#ffffff' }} aria-label="YouTube">
                <Video size={18} />
              </a>
              <a href="#" style={{ padding: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', color: '#ffffff' }} aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: O Curso */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Ecossistema do Curso
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><a href="#metodologia" style={{ transition: 'color 0.2s' }}>Aulas Gravadas em 4K</a></li>
              <li><a href="#metodologia" style={{ transition: 'color 0.2s' }}>Encontros Semanais Ao Vivo</a></li>
              <li><a href="#metodologia" style={{ transition: 'color 0.2s' }}>Materiais Teóricos & E-books</a></li>
              <li><a href="#metodologia" style={{ transition: 'color 0.2s' }}>Consultorias Individuais 1-a-1</a></li>
              <li><a href="#grade" style={{ transition: 'color 0.2s' }}>Grade Curricular dos Módulos</a></li>
            </ul>
          </div>

          {/* Column 3: Visões da Demonstração */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Telas da Demonstração
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li>
                <Link href="/" style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🌐</span> Landing Page (Comercial)
                </Link>
              </li>
              <li>
                <Link href="/aluno" style={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🎓</span> Área do Aluno (Player & Materiais)
                </Link>
              </li>
              <li>
                <Link href="/gestor" style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>💼</span> Painel do Gestor (LMS & CRM)
                </Link>
              </li>
              <li>
                <Link href="/checkout?plano=pro" style={{ color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>💳</span> Tela de Checkout / Matrícula
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Garantias */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Garantia & Certificação
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
              <ShieldCheck size={22} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.82rem' }}>
                <strong style={{ color: '#ffffff' }}>7 Dias de Garantia Incondicional:</strong> Se não amar a metodologia, devolvemos 100% do seu investimento.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Award size={22} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.82rem' }}>
                <strong style={{ color: '#ffffff' }}>Certificado Profissional de 60 Horas:</strong> Reconhecido em todo o território nacional.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.78rem'
        }}>
          <div>
            © 2026 Lumina Academy de Fotografia. Todos os direitos reservados.
          </div>
          <div style={{ display: 'flex', gap: '18px' }}>
            <span>Termos de Uso</span>
            <span>Políticas de Privacidade</span>
            <span>Segurança SSL 256-bit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
