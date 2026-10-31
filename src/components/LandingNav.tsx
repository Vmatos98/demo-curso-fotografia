'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, Aperture, Menu, X, ArrowRight, UserCheck } from 'lucide-react';

export default function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'relative',
      zIndex: 50,
      borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
      background: 'rgba(7, 9, 13, 0.85)',
      backdropFilter: 'blur(16px)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
      }}>
        {/* Brand / Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#07090d',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
          }}>
            <Aperture size={24} strokeWidth={2.2} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#ffffff',
              display: 'block',
              lineHeight: 1.1,
            }}>
              LUMINA
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              color: '#f59e0b',
              textTransform: 'uppercase',
              display: 'block',
            }}>
              Master Academy
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '28px',
        }} className="desktop-nav">
          <a href="#metodologia" style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>
            4 Pilares
          </a>
          <a href="#simulador" style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>
            Simulador de Câmera
          </a>
          <a href="#grade" style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>
            Grade Curricular
          </a>
          <a href="#planos" style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }}>
            Planos & Preços
          </a>
          <a href="#depoimentos" style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>
            Resultados
          </a>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/aluno" className="btn-secondary btn-sm" style={{ display: 'none' }} id="nav-aluno-btn">
            <UserCheck size={14} />
            Área do Aluno
          </Link>
          <a href="#planos" className="btn-primary btn-sm">
            <span>Matrículas Abertas</span>
            <ArrowRight size={14} />
          </a>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'inline-flex',
              padding: '8px',
              color: '#ffffff',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px'
            }}
            className="mobile-toggle"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '20px 24px',
          background: 'rgba(11, 15, 22, 0.98)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <a
            href="#metodologia"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#e2e8f0', fontSize: '1rem', padding: '6px 0' }}
          >
            Os 4 Pilares do Método
          </a>
          <a
            href="#simulador"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#e2e8f0', fontSize: '1rem', padding: '6px 0' }}
          >
            Simulador de Câmera
          </a>
          <a
            href="#grade"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#e2e8f0', fontSize: '1rem', padding: '6px 0' }}
          >
            Grade Curricular Completa
          </a>
          <a
            href="#planos"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#f59e0b', fontSize: '1rem', fontWeight: 600, padding: '6px 0' }}
          >
            Ver Planos e Valores
          </a>
          <div style={{ display: 'flex', gap: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link href="/aluno" className="btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
              Área do Aluno
            </Link>
            <Link href="/gestor" className="btn-secondary" style={{ flex: 1, textAlign: 'center' }}>
              Painel Gestor
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          #nav-aluno-btn {
            display: inline-flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
