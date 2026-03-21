import type { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'nombre-empresa',
    type: 'text',
    question: '¿Cuál es el nombre de su empresa?',
    placeholder: 'Escriba aquí el nombre...',
    required: true,
  },
  {
    id: 'control-ventas',
    type: 'choice',
    question: '¿Tiene claridad diaria sobre cuánto vende exactamente su empresa?',
    options: ['Sí', 'No'],
    required: true,
  },
  {
    id: 'metodo-ventas',
    type: 'choice',
    question: '¿Cómo lleva actualmente el control de ventas?',
    options: [
      'A. En tiempo real con sistema',
      'B. Reportes periódicos',
      'C. Manual (Excel/cuaderno)',
      'D. No hay control claro'
    ],
    required: true,
  },
  {
    id: 'top-productos',
    type: 'choice',
    question: '¿Puede identificar en tiempo real sus productos más vendidos?',
    options: ['Sí', 'No'],
    required: true,
  },
  {
    id: 'gestion-inventario',
    type: 'choice',
    question: '¿Cómo gestiona su inventario?',
    options: [
      'A. Sistema automatizado',
      'B. Sistema digital básico',
      'C. Manual',
      'D. Sin control estructurado'
    ],
    required: true,
  },
  {
    id: 'perdidas-inventario',
    type: 'choice',
    question: '¿Ha tenido pérdidas por productos vencidos o no rotados?',
    options: ['Sí', 'No'],
    required: true,
  },
  {
    id: 'potencial-ventas',
    type: 'choice',
    question: '¿Siente que podría vender más con los mismos clientes actuales?',
    options: ['Sí', 'No'],
    required: true,
  },
  {
    id: 'ticket-promedio',
    type: 'choice',
    question: '¿Tiene una estrategia definida para aumentar el ticket promedio?',
    options: ['Sí', 'No'],
    required: true,
  },
  {
    id: 'proceso-ventas',
    type: 'choice',
    question: '¿Cómo funciona el proceso de ventas de su equipo?',
    options: [
      'A. Estandarizado y medido',
      'B. Parcialmente definido',
      'C. Cada vendedor vende a su manera',
      'D. No hay proceso'
    ],
    required: true,
  },
  {
    id: 'tasa-conversion',
    type: 'choice',
    question: '¿Mide su tasa de conversión (visitas vs compras)?',
    options: ['Sí', 'No'],
    required: true,
  },
  {
    id: 'seguimiento-no-compradores',
    type: 'choice',
    question: '¿Realiza seguimiento a clientes que no compran en su primera visita?',
    options: ['Sí', 'No'],
    required: true,
  },
  {
    id: 'base-datos',
    type: 'choice',
    question: '¿Cuenta con una base de datos organizada de sus clientes?',
    options: ['Sí', 'No'],
    required: true,
  },
  {
    id: 'cambio-gafas',
    type: 'choice',
    question: '¿Sabe cuándo un cliente necesita cambiar sus productos o servicios nuevamente?',
    options: ['Sí', 'No'],
    required: true,
  },
  {
    id: 'personalizacion-ofertas',
    type: 'choice',
    question: '¿Cómo personaliza sus ofertas?',
    options: [
      'A. Basadas en datos',
      'B. Segmentación básica',
      'C. Generalizadas',
      'D. No se personalizan'
    ],
    required: true,
  },
];
