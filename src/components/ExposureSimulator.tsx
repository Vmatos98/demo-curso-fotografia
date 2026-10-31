'use client';

import React, { useState } from 'react';
import { Sliders, Camera, Info, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

const APERTURES = [
  { value: 1.4, label: 'f/1.4', blur: 14, depth: 'Profundidade Mínima (Fundo Ultra Desfocado)' },
  { value: 2.0, label: 'f/2.0', blur: 10, depth: 'Bokeh Acentuado' },
  { value: 2.8, label: 'f/2.8', blur: 7, depth: 'Retrato Clássico / Nitidez Alta' },
  { value: 4.0, label: 'f/4.0', blur: 4, depth: 'Plano Médio Equilibrado' },
  { value: 5.6, label: 'f/5.6', blur: 2, depth: 'Sweet Spot da Lente' },
  { value: 8.0, label: 'f/8.0', blur: 1, depth: 'Nitidez Máxima de Ponta a Ponta' },
  { value: 11.0, label: 'f/11', blur: 0.5, depth: 'Paisagens & Estúdio' },
  { value: 16.0, label: 'f/16', blur: 0, depth: 'Profundidade Total (Tudo Nítido)' },
];

const SHUTTERS = [
  { value: 4000, label: '1/4000s', effect: 'Congela Pássaros, Gotas e Ação Extrema' },
  { value: 1000, label: '1/1000s', effect: 'Congela Pessoas Correndo e Esportes' },
  { value: 500, label: '1/500s', effect: 'Movimento Rápido em Luz do Dia' },
  { value: 250, label: '1/250s', effect: 'Velocidade de Segurança para Retratos' },
  { value: 125, label: '1/125s', effect: 'Limite Seguro para Foto na Mão' },
  { value: 60, label: '1/60s', effect: 'Risco de Trepidação sem Estabilizador' },
  { value: 30, label: '1/30s', effect: 'Movimento Intencional / Pan' },
  { value: 4, label: '1/4s', effect: 'Longa Exposição (Exige Tripé)' },
];

const ISOS = [
  { value: 100, label: 'ISO 100', grain: 0, noiseLevel: 'Pureza Absoluta / Luz Abundante' },
  { value: 200, label: 'ISO 200', grain: 0, noiseLevel: 'Sem Ruído / Sombras Claras' },
  { value: 400, label: 'ISO 400', grain: 0.05, noiseLevel: 'Excelente / Interior Bem Iluminado' },
  { value: 800, label: 'ISO 800', grain: 0.1, noiseLevel: 'Pequeno Grão Controlado' },
  { value: 1600, label: 'ISO 1600', grain: 0.2, noiseLevel: 'Situações de Baixa Luz' },
  { value: 3200, label: 'ISO 3200', grain: 0.35, noiseLevel: 'Eventos Noturnos sem Flash' },
  { value: 6400, label: 'ISO 6400', grain: 0.5, noiseLevel: 'Ruído Perceptível / Sensor Testado' },
  { value: 12800, label: 'ISO 12800', grain: 0.7, noiseLevel: 'Extrema Escuridão / Textura de Filme' },
];

export default function ExposureSimulator() {
  const [apertureIdx, setApertureIdx] = useState(2); // f/2.8
  const [shutterIdx, setShutterIdx] = useState(3);   // 1/250s
  const [isoIdx, setIsoIdx] = useState(1);          // ISO 200

  const currentAperture = APERTURES[apertureIdx];
  const currentShutter = SHUTTERS[shutterIdx];
  const currentIso = ISOS[isoIdx];

  // Base Exposure EV Index Calculation
  // Ideal neutral point: apertureIdx 2 (f/2.8), shutterIdx 3 (1/250), isoIdx 1 (200) -> EV offset = 0
  const evOffset = (2 - apertureIdx) * 0.7 + (shutterIdx - 3) * 0.7 + (isoIdx - 1) * 0.7;
  const clampedEv = Math.max(-3, Math.min(3, Math.round(evOffset * 10) / 10));

  // Visual brightness adjustment
  const brightness = Math.max(0.2, Math.min(1.8, 1 + clampedEv * 0.28));

  // Exposure label feedback
  let exposureStatus = 'Exposição Perfeita (Neutro 0 EV)';
  let statusColor = '#10b981';
  if (clampedEv <= -1.5) {
    exposureStatus = 'Muito Subexposta (Escura - Perda de Informação nas Sombras)';
    statusColor = '#ef4444';
  } else if (clampedEv < -0.4) {
    exposureStatus = 'Levemente Subexposta (-1 EV)';
    statusColor = '#f59e0b';
  } else if (clampedEv >= 1.5) {
    exposureStatus = 'Muito Superexposta (Estourada - Altas Luzes Queimadas)';
    statusColor = '#ef4444';
  } else if (clampedEv > 0.4) {
    exposureStatus = 'Levemente Superexposta (+1 EV)';
    statusColor = '#f59e0b';
  }

  const applyPreset = (preset: 'portrait' | 'action' | 'night' | 'landscape') => {
    if (preset === 'portrait') {
      setApertureIdx(0); // f/1.4
      setShutterIdx(1);  // 1/1000s
      setIsoIdx(0);      // ISO 100
    } else if (preset === 'action') {
      setApertureIdx(2); // f/2.8
      setShutterIdx(0);  // 1/4000s
      setIsoIdx(3);      // ISO 800
    } else if (preset === 'night') {
      setApertureIdx(0); // f/1.4
      setShutterIdx(5);  // 1/60s
      setIsoIdx(4);      // ISO 1600
    } else if (preset === 'landscape') {
      setApertureIdx(5); // f/8.0
      setShutterIdx(4);  // 1/125s
      setIsoIdx(0);      // ISO 100
    }
  };

  return (
    <div className="glass-panel" style={{
      padding: '32px',
      borderRadius: '24px',
      border: '1px solid rgba(245, 158, 11, 0.2)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
    }}>
      {/* Header of the simulator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-gold">
              <Sparkles size={12} />
              METODOLOGIA PRÁTICA INTERATIVA
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Exclusivo da Lumina Academy
            </span>
          </div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#ffffff' }}>
            Simulador de Visor Digital: O Triângulo de Exposição
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Ajuste a Abertura, Velocidade e ISO abaixo para ver em tempo real como a física da luz molda a imagem.
          </p>
        </div>

        {/* Quick Presets Buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => applyPreset('portrait')}
            className="btn-secondary btn-sm"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            📸 Retrato Bokeh
          </button>
          <button
            onClick={() => applyPreset('action')}
            className="btn-secondary btn-sm"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            ⚡ Ação & Esporte
          </button>
          <button
            onClick={() => applyPreset('landscape')}
            className="btn-secondary btn-sm"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            🏔️ Paisagem F/8
          </button>
          <button
            onClick={() => {
              setApertureIdx(2);
              setShutterIdx(3);
              setIsoIdx(1);
            }}
            title="Resetar Configurações"
            style={{
              padding: '6px 10px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.06)',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        alignItems: 'center'
      }}>
        {/* Left: Interactive Viewfinder Mockup */}
        <div>
          <div style={{
            position: 'relative',
            height: '380px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.7)',
            backgroundColor: '#05070a',
          }}>
            {/* Background Image Layer (Subject + Blur simulation) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: `brightness(${brightness}) blur(${currentAperture.blur * 0.3}px)`,
              transition: 'filter 0.25s ease-out',
            }} />

            {/* Grain Overlay for high ISO */}
            {currentIso.grain > 0 && (
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: currentIso.grain,
                pointerEvents: 'none',
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)',
                backgroundSize: '3px 3px',
                mixBlendMode: 'overlay',
              }} />
            )}

            {/* Viewfinder HUD Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              pointerEvents: 'none',
              fontFamily: 'var(--font-mono)',
              textShadow: '0 2px 4px rgba(0,0,0,0.9)',
              color: '#ffffff',
            }}>
              {/* Top Viewfinder Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', color: '#10b981' }}>
                    [●] AF-C EYE-TRACK
                  </span>
                  <span style={{ background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>
                    RAW + JPEG
                  </span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', color: '#f59e0b' }}>
                  BAT 84% ⚡
                </div>
              </div>

              {/* Center Focus Reticle */}
              <div style={{
                alignSelf: 'center',
                width: '74px',
                height: '74px',
                border: '1.5px solid rgba(16, 185, 129, 0.8)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)',
              }}>
                <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
              </div>

              {/* Bottom Camera Settings Bar */}
              <div style={{
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.85rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ color: '#fcd34d', fontWeight: 700 }}>{currentShutter.label}</span>
                  <span style={{ color: '#60a5fa', fontWeight: 700 }}>{currentAperture.label}</span>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>{currentIso.label}</span>
                </div>

                {/* Exposure Bar Meter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>-2</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>-1</span>
                  <span style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: statusColor,
                    display: 'inline-block',
                    boxShadow: `0 0 8px ${statusColor}`
                  }}></span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>+1</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>+2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Exposure Feedback Toast */}
          <div style={{
            marginTop: '12px',
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '10px',
            borderLeft: `4px solid ${statusColor}`,
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ color: '#e2e8f0' }}>{exposureStatus}</span>
            <span style={{ color: statusColor, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              {clampedEv > 0 ? `+${clampedEv}` : clampedEv} EV
            </span>
          </div>
        </div>

        {/* Right: Controls & Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Aperture Slider */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '18px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.07)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#60a5fa' }}>●</span> Abertura do Diafragma (f)
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#60a5fa', fontSize: '1rem' }}>
                {currentAperture.label}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={APERTURES.length - 1}
              value={apertureIdx}
              onChange={(e) => setApertureIdx(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#60a5fa', cursor: 'pointer' }}
            />
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '6px' }}>
              Efeito: <strong style={{ color: '#cbd5e1' }}>{currentAperture.depth}</strong>
            </p>
          </div>

          {/* Shutter Speed Slider */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '18px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.07)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#fcd34d' }}>●</span> Velocidade do Obturador (s)
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fcd34d', fontSize: '1rem' }}>
                {currentShutter.label}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={SHUTTERS.length - 1}
              value={shutterIdx}
              onChange={(e) => setShutterIdx(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#fcd34d', cursor: 'pointer' }}
            />
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '6px' }}>
              Efeito: <strong style={{ color: '#cbd5e1' }}>{currentShutter.effect}</strong>
            </p>
          </div>

          {/* ISO Slider */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '18px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.07)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#34d399' }}>●</span> Sensibilidade ISO
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34d399', fontSize: '1rem' }}>
                {currentIso.label}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={ISOS.length - 1}
              value={isoIdx}
              onChange={(e) => setIsoIdx(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#34d399', cursor: 'pointer' }}
            />
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '6px' }}>
              Efeito: <strong style={{ color: '#cbd5e1' }}>{currentIso.noiseLevel}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
