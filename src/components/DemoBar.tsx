'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, GraduationCap, LayoutDashboard, Sparkles, HelpCircle } from 'lucide-react';

export default function DemoBar() {
  const pathname = usePathname();

  const isLanding = pathname === '/';
  const isAluno = pathname.startsWith('/aluno');
  const isGestor = pathname.startsWith('/gestor');
  const isCheckout = pathname.startsWith('/checkout');

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(8, 11, 16, 0.95)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
      backdropFilter: 'blur(12px)',
      padding: '8px 16px',
      fontSize: '0.82rem',
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left: Mode Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.3) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#fbbf24',
            padding: '3px 10px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={12} />
            DEMO INTERATIVA
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
            Navegue pelas 3 visões do ecossistema:
          </span>
        </div>

        {/* Center: Quick Switcher Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.78rem',
              transition: 'all 0.2s ease',
              background: isLanding || isCheckout ? 'rgba(245, 158, 11, 0.9)' : 'transparent',
              color: isLanding || isCheckout ? '#07090d' : '#94a3b8',
              boxShadow: isLanding || isCheckout ? '0 2px 8px rgba(245, 158, 11, 0.3)' : 'none',
            }}
          >
            <Globe size={13} />
            1. Landing Page (Vendas)
          </Link>

          <Link
            href="/aluno"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.78rem',
              transition: 'all 0.2s ease',
              background: isAluno ? 'rgba(59, 130, 246, 0.9)' : 'transparent',
              color: isAluno ? '#ffffff' : '#94a3b8',
              boxShadow: isAluno ? '0 2px 8px rgba(59, 130, 246, 0.3)' : 'none',
            }}
          >
            <GraduationCap size={13} />
            2. Área do Aluno (LMS)
          </Link>

          <Link
            href="/gestor"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.78rem',
              transition: 'all 0.2s ease',
              background: isGestor ? 'rgba(16, 185, 129, 0.9)' : 'transparent',
              color: isGestor ? '#ffffff' : '#94a3b8',
              boxShadow: isGestor ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none',
            }}
          >
            <LayoutDashboard size={13} />
            3. Painel do Gestor (Admin)
          </Link>
        </div>

        {/* Right: Quick Context */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.75rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'inline-block',
              boxShadow: '0 0 6px #10b981'
            }}></span>
            Pronto para Apresentação
          </span>
        </div>
      </div>
    </div>
  );
}
