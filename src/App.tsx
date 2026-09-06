import React, { useState } from 'react';
import {
  Layers,
  FolderTree,
  Database,
  GitFork,
  ListOrdered,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Users,
  FileSpreadsheet,
  Clock,
  Key,
  HardDrive,
  Copy,
  ChevronRight,
  Terminal,
  BookMarked
} from 'lucide-react';
import {
  ARCHITECTURE_LAYERS,
  DB_TABLES,
  ROADMAP_STEPS,
  DbTable
} from './data/architectureData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'folders' | 'database' | 'relations' | 'roadmap' | 'requirements'>('architecture');
  const [selectedTable, setSelectedTable] = useState<DbTable>(DB_TABLES[3]); // default books
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BookMarked className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">BIBLIOTECH</h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Laravel 11 + MySQL
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  3 Capas + Repository Pattern
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sistema de Gestión de Biblioteca Digital • Documento de Arquitectura y Diseño Técnico
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Fase 0: Análisis y Especificación
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto no-scrollbar gap-1 border-t border-slate-800/80 pt-2">
          <button
            id="tab-architecture"
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            1. Arquitectura 3 Capas
          </button>
          <button
            id="tab-folders"
            onClick={() => setActiveTab('folders')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'folders'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            2. Estructura de Carpetas
          </button>
          <button
            id="tab-database"
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4" />
            3. Tablas y Modelo MySQL
          </button>
          <button
            id="tab-relations"
            onClick={() => setActiveTab('relations')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'relations'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GitFork className="w-4 h-4" />
            4. Relaciones entre Tablas
          </button>
          <button
            id="tab-roadmap"
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'roadmap'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            5. Orden de Desarrollo
          </button>
          <button
            id="tab-requirements"
            onClick={() => setActiveTab('requirements')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'requirements'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            6. Matriz RF / RNF
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* TAB 1: ARQUITECTURA EN 3 CAPAS */}
        {activeTab === 'architecture' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-400" />
                    Arquitectura en Tres Capas de BIBLIOTECH
                  </h2>
                  <p className="text-slate-300 text-sm mt-1 max-w-3xl">
                    Implementa una separación estricta de responsabilidades (SoC). La Capa de Presentación no consulta directamente la base de datos; delega en la Capa de Negocio (Servicios), la cual utiliza la Capa de Acceso a Datos mediante el <strong>Patrón Repositorio (DAO)</strong> sobre Eloquent ORM.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-slate-900 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                    Patrón MVC Laravel
                  </span>
                  <span className="text-xs bg-slate-900 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
                    Inversión de Dependencias (IoC)
                  </span>
                </div>
              </div>

              {/* Data flow diagram */}
              <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Flujo de una Petición (Ejemplo: Registrar Préstamo RF06)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center text-xs">
                  <div className="bg-slate-900 p-3 rounded-lg border border-emerald-500/40 text-emerald-300">
                    <div className="font-bold">1. Cliente (Blade)</div>
                    <div className="text-[11px] text-slate-400 mt-1">Envía POST /loans con token CSRF</div>
                  </div>
                  <div className="text-slate-500 hidden md:block">➔</div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-sky-500/40 text-sky-300">
                    <div className="font-bold">2. Presentación (Controller)</div>
                    <div className="text-[11px] text-slate-400 mt-1">StoreLoanRequest valida; LoanController invoca LoanService</div>
                  </div>
                  <div className="text-slate-500 hidden md:block">➔</div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-indigo-500/40 text-indigo-300">
                    <div className="font-bold">3. Lógica de Negocio (Service)</div>
                    <div className="text-[11px] text-slate-400 mt-1">LoanService valida stock, mora y abre transacción atómica</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center text-xs mt-3">
                  <div className="bg-slate-900 p-3 rounded-lg border border-amber-500/40 text-amber-300 col-span-1 md:col-start-2">
                    <div className="font-bold">4. Acceso a Datos (Repository)</div>
                    <div className="text-[11px] text-slate-400 mt-1">EloquentLoanRepository ejecuta queries seguras</div>
                  </div>
                  <div className="text-slate-500 hidden md:block">➔</div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-purple-500/40 text-purple-300 col-span-1">
                    <div className="font-bold">5. Persistencia (MySQL)</div>
                    <div className="text-[11px] text-slate-400 mt-1">COMMIT en tablas loans, loan_details, books (disminuye stock)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Layer Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {ARCHITECTURE_LAYERS.map((layer) => (
                <div
                  key={layer.id}
                  className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-600 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
                      <h3 className="font-semibold text-white text-base">{layer.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">{layer.subtitle}</p>

                    <div className="space-y-3">
                      {layer.components.map((c, i) => (
                        <div key={i} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                          <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
                            <span>{c.title}</span>
                            <span className="font-mono text-[10px] text-slate-500">{c.path}</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 font-medium">{c.role}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{c.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Aislamiento de responsabilidad</span>
                    <span className="text-emerald-400 font-medium">Desacoplado</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Patrones de Diseño Implementados */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Patrones de Software Aplicados</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-indigo-400 font-bold text-sm mb-1">Repository Pattern (DAO)</div>
                  <p className="text-slate-300">
                    Separa las reglas de negocio de la tecnología de persistencia. Permite que <code>LoanService</code> reciba <code>BookRepositoryInterface</code> sin conocer detalles de SQL ni Eloquent, facilitando pruebas unitarias con Mocks en PHPUnit.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-indigo-400 font-bold text-sm mb-1">Singleton Pattern</div>
                  <p className="text-slate-300">
                    Utilizado en <code>SystemConfigService</code> y gestores de conexión para mantener en memoria parámetros globales (días máximos de préstamo, límite de libros por rol) sin recargar la base de datos en cada consulta, asegurando RNF01 (&lt; 3 seg).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-indigo-400 font-bold text-sm mb-1">Model-View-Controller (MVC)</div>
                  <p className="text-slate-300">
                    Orquestación nativa de Laravel donde el Controlador actúa como mediador ligero entre la entrada HTTP y el resultado visual en Blade, eliminando la duplicación de código en la presentación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ESTRUCTURA DE CARPETAS */}
        {activeTab === 'folders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-indigo-400" />
                Estructura de Carpetas Recomendada para Laravel
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                Organización clean-architecture respetando los estándares de Laravel y agregando los paquetes de <code>Services</code> y <code>Repositories</code> para la arquitectura en tres capas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Directory Tree View */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-xs overflow-x-auto">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 font-sans text-xs">
                  <span>Árbol del Proyecto Laravel</span>
                  <button
                    onClick={() => copyToClipboard(laravelTreeString, 'tree')}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedCode === 'tree' ? '¡Copiado!' : 'Copiar Árbol'}
                  </button>
                </div>
                <pre className="text-slate-300 leading-relaxed">
{`bibliotech/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php          # RF01 Login / Logout
│   │   │   ├── UserController.php          # RF02, RF03 Gestión de Usuarios
│   │   │   ├── BookController.php          # RF04, RF05, RF08 Libros y Disponibilidad
│   │   │   ├── CategoryController.php      # Gestión de Categorías
│   │   │   ├── LoanController.php          # RF06, RF07 Préstamos y Devoluciones
│   │   │   └── ReportController.php        # RF09 Generación de Reportes
│   │   ├── Middleware/
│   │   │   ├── CheckRole.php               # Control de acceso (Admin, Bibliotecario, Usuario)
│   │   │   └── CheckUserActive.php         # RNF02 Estado activo del usuario
│   │   └── Requests/
│   │       ├── StoreUserRequest.php        # Validaciones de usuario
│   │       ├── StoreBookRequest.php        # Validaciones de libro
│   │       └── StoreLoanRequest.php        # Validaciones de préstamo
│   ├── Models/
│   │   ├── User.php                        # Modelo de usuario con Hashing
│   │   ├── Role.php                        # Modelo de rol
│   │   ├── Category.php                    # Modelo de categoría
│   │   ├── Book.php                        # Modelo de libro (stock y disponibilidad)
│   │   ├── Loan.php                        # Modelo de cabecera de préstamo
│   │   ├── LoanDetail.php                  # Detalle de libros prestados
│   │   └── BackupLog.php                   # RNF04 Registro de respaldos
│   ├── Services/                           # [CAPA 2: LÓGICA DE NEGOCIO]
│   │   ├── LoanService.php                 # Reglas de préstamo, cupos, mora
│   │   ├── BookService.php                 # Control de inventario y stock
│   │   ├── UserService.php                 # Lógica de usuarios y roles
│   │   ├── ReportService.php               # Consultas y agregados para reportes
│   │   └── SystemConfigService.php         # Patrón Singleton para configuración
│   ├── Repositories/                       # [CAPA 3: ACCESO A DATOS]
│   │   ├── Contracts/                      # Interfaces (DAO)
│   │   │   ├── UserRepositoryInterface.php
│   │   │   ├── BookRepositoryInterface.php
│   │   │   ├── CategoryRepositoryInterface.php
│   │   │   └── LoanRepositoryInterface.php
│   │   └── Eloquent/                       # Implementaciones concretas
│   │       ├── EloquentUserRepository.php
│   │       ├── EloquentBookRepository.php
│   │       ├── EloquentCategoryRepository.php
│   │       └── EloquentLoanRepository.php
│   ├── Providers/
│   │   └── RepositoryServiceProvider.php   # Vincula Interfaces con Implementaciones
│   └── Console/Commands/
│       └── DatabaseBackupCommand.php       # RNF04 Backup periódico automático
├── database/
│   ├── migrations/                         # 7 migraciones de tablas
│   ├── seeders/                            # Datos iniciales (Roles, Admin, Categorías)
│   └── factories/                          # Fábricas para tests PHPUnit
├── resources/views/                        # [CAPA 1: PRESENTACIÓN BLADE]
│   ├── layouts/
│   │   ├── app.blade.php                   # Layout principal
│   │   └── navigation.blade.php            # Menú dinámico según rol
│   ├── auth/
│   │   └── login.blade.php                 # Formulario de inicio de sesión
│   ├── admin/                              # Vistas exclusivas del Administrador
│   │   ├── users/
│   │   ├── categories/
│   │   └── reports/
│   ├── librarian/                          # Vistas del Bibliotecario
│   │   ├── loans/create.blade.php
│   │   ├── loans/returns.blade.php
│   │   └── books/
│   └── user/                               # Vistas del Usuario (Estudiante/Docente)
│       ├── catalog.blade.php
│       └── my_loans.blade.php
├── routes/
│   ├── web.php                             # Rutas protegidas por middleware de rol
│   └── console.php                         # Programación de respaldos periódicos
├── tests/                                  # Testing automatizado PHPUnit
│   ├── Unit/
│   │   ├── LoanServiceTest.php
│   │   └── UserServiceTest.php
│   └── Feature/
│       ├── AuthTest.php
│       └── BookAvailabilityTest.php
└── .github/workflows/
    └── laravel-ci.yml                      # Integración Continua (GitHub Actions)`}
                </pre>
              </div>

              {/* Folder Details & Rules */}
              <div className="space-y-4">
                <div className="bg-slate-800/40 border border-slate-700/70 rounded-xl p-4">
                  <h3 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    ¿Por qué agregar <code>app/Services/</code> y <code>app/Repositories/</code>?
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Laravel por defecto sugiere poner la lógica en controladores o modelos. Sin embargo, para un proyecto académico riguroso con arquitectura en 3 capas:
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1.5 mt-2 list-disc list-inside">
                    <li><strong className="text-slate-200">Controladores Delgados (Thin Controllers):</strong> Solo reciben la petición, validan con FormRequest y llaman al Service.</li>
                    <li><strong className="text-slate-200">Servicios Reutilizables:</strong> La lógica de préstamos puede invocarse desde la interfaz web o desde una futura API móvil sin duplicar código.</li>
                    <li><strong className="text-slate-200">Testabilidad con PHPUnit:</strong> Es posible probar la lógica de negocio sin depender de una base de datos real simulando los repositorios.</li>
                  </ul>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/70 rounded-xl p-4">
                  <h3 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Manejo de Rutas y Seguridad de Acceso
                  </h3>
                  <div className="bg-slate-900 p-3 rounded-lg font-mono text-[11px] text-slate-300 space-y-1">
                    <div className="text-slate-500">// routes/web.php con agrupación por roles</div>
                    <div>Route::middleware(['auth', 'role:admin'])-&gt;group(...);</div>
                    <div>Route::middleware(['auth', 'role:librarian'])-&gt;group(...);</div>
                    <div>Route::middleware(['auth', 'role:user'])-&gt;group(...);</div>
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/70 rounded-xl p-4">
                  <h3 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Cumplimiento de RNF04 (Respaldos Periódicos)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Se añade <code>app/Console/Commands/DatabaseBackupCommand.php</code> programado en <code>routes/console.php</code> mediante <code>Schedule::command('backup:database')-&gt;daily()</code>, guardando volcados comprimidos en almacenamiento seguro y registrando la ejecución en <code>backup_logs</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TABLAS Y MODELO DE BASE DE DATOS */}
        {activeTab === 'database' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-indigo-400" />
                    Diseño de Base de Datos MySQL
                  </h2>
                  <p className="text-slate-300 text-sm mt-1">
                    Estructura normalizada en 3FN (Tercera Forma Normal) optimizada para consultas en menos de 3 segundos (RNF01) mediante índices estratégicos en ISBN, estados y correos.
                  </p>
                </div>
                <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  Motor: InnoDB • Charset: utf8mb4_unicode_ci
                </div>
              </div>
            </div>

            {/* Table Selector & Table Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Table List */}
              <div className="space-y-2 lg:col-span-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block px-1 mb-2">
                  Tablas del Sistema ({DB_TABLES.length})
                </span>
                {DB_TABLES.map((table) => (
                  <button
                    key={table.id}
                    id={`btn-table-${table.name}`}
                    onClick={() => setSelectedTable(table)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      selectedTable.id === table.id
                        ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                        : 'bg-slate-800/30 border-slate-700/50 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-xs font-bold">{table.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{table.category}</div>
                    </div>
                    <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded text-slate-400 border border-slate-700">
                      {table.columns.length} cols
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Table Structure */}
              <div className="lg:col-span-3 bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/80 flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-mono font-bold text-indigo-300">{selectedTable.name}</h3>
                      <span className="text-xs bg-slate-900 text-slate-400 px-2.5 py-0.5 rounded-full border border-slate-800">
                        {selectedTable.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{selectedTable.description}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(generateCreateTableSql(selectedTable), selectedTable.name)}
                    className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-indigo-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    {copiedCode === selectedTable.name ? '¡SQL Copiado!' : 'Copiar DDL SQL'}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-400">
                        <th className="py-2.5 px-3 font-semibold">Columna</th>
                        <th className="py-2.5 px-3 font-semibold">Tipo de Dato</th>
                        <th className="py-2.5 px-3 font-semibold">Atributos / Llaves</th>
                        <th className="py-2.5 px-3 font-semibold">Descripción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {selectedTable.columns.map((col, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3 font-bold text-slate-200">
                            {col.name}
                            {col.isPrimary && (
                              <span className="ml-1.5 inline-block text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded">
                                PK
                              </span>
                            )}
                            {col.isForeign && (
                              <span className="ml-1.5 inline-block text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-1.5 py-0.2 rounded">
                                FK
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-emerald-400">{col.type}</td>
                          <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                            {col.references && <span className="text-sky-300">➜ {col.references} </span>}
                            {col.attributes && <span>{col.attributes} </span>}
                            {col.nullable ? <span className="text-slate-500">NULL</span> : <span className="text-rose-400/80">NOT NULL</span>}
                          </td>
                          <td className="py-2.5 px-3 text-slate-300 font-sans">{col.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RELACIONES ENTRE TABLAS */}
        {activeTab === 'relations' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <GitFork className="w-5 h-5 text-indigo-400" />
                Relaciones entre Tablas e Integridad Referencial
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                Definición de cardinalidades, llaves foráneas y reglas de cascada para asegurar consistencia e histórico en el sistema de biblioteca.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Relación 1 */}
              <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Relación 1 a N</span>
                  <span className="text-xs bg-slate-900 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">roles ➔ users</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Un Rol puede tener Muchos Usuarios</h3>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  Cada usuario (Administrador, Bibliotecario, Estudiante, Docente) pertenece a un único rol mediante <code>users.role_id ➔ roles.id</code>.
                </p>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-400">// Modelo User.php</div>
                  <div className="text-indigo-300">public function role() &#123; return $this-&gt;belongsTo(Role::class); &#125;</div>
                  <div className="text-slate-400 mt-2">// Modelo Role.php</div>
                  <div className="text-indigo-300">public function users() &#123; return $this-&gt;hasMany(User::class); &#125;</div>
                </div>
              </div>

              {/* Relación 2 */}
              <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Relación 1 a N</span>
                  <span className="text-xs bg-slate-900 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">categories ➔ books</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Una Categoría contiene Muchos Libros</h3>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  Cada libro clasificado pertenece a una categoría temática mediante <code>books.category_id ➔ categories.id</code>.
                </p>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-400">// Modelo Book.php</div>
                  <div className="text-indigo-300">public function category() &#123; return $this-&gt;belongsTo(Category::class); &#125;</div>
                  <div className="text-slate-400 mt-2">// Modelo Category.php</div>
                  <div className="text-indigo-300">public function books() &#123; return $this-&gt;hasMany(Book::class); &#125;</div>
                </div>
              </div>

              {/* Relación 3 */}
              <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Relación 1 a N Doble</span>
                  <span className="text-xs bg-slate-900 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">users ➔ loans</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Usuario Solicitante y Bibliotecario Despachador</h3>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  La tabla <code>loans</code> posee dos llaves foráneas a <code>users</code>:
                  <code>user_id</code> (el lector) y <code>librarian_id</code> (el responsable de la entrega).
                </p>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-indigo-300">public function borrower() &#123; return $this-&gt;belongsTo(User::class, 'user_id'); &#125;</div>
                  <div className="text-indigo-300">public function librarian() &#123; return $this-&gt;belongsTo(User::class, 'librarian_id'); &#125;</div>
                </div>
              </div>

              {/* Relación 4: N a M vía loan_details */}
              <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Relación N a M (Muchos a Muchos)</span>
                  <span className="text-xs bg-slate-900 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">loans ⇄ books (loan_details)</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">Préstamo con Múltiples Ejemplares</h3>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  Permite que un préstamo contenga varios libros a la vez y rastrear la fecha exacta de devolución (RF07) y condición de cada libro individual.
                </p>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-400">// Modelo Loan.php</div>
                  <div className="text-indigo-300">public function books() &#123; return $this-&gt;belongsToMany(Book::class, 'loan_details')-&gt;withPivot('return_date', 'condition_on_return'); &#125;</div>
                </div>
              </div>
            </div>

            {/* Reglas de Integridad y Restricciones */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-3">Reglas de Integridad Referencial (ON DELETE / ON UPDATE)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-rose-400 mb-1">ON DELETE RESTRICT en Libros y Usuarios</div>
                  <p>No se permite eliminar un usuario o un libro si cuenta con préstamos históricos asociados. Se utiliza Soft Deletes (<code>deleted_at</code>) para preservar la trazabilidad institucional.</p>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-amber-400 mb-1">ON DELETE CASCADE en Detalles de Préstamo</div>
                  <p>Si se anula un borrador de préstamo no formalizado, sus ítems en <code>loan_details</code> se eliminan limpiamente.</p>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-400 mb-1">Control de Concurrencia en Stock</div>
                  <p>Al prestar o devolver, se ejecutan actualizaciones atómicas (<code>available_copies = available_copies - 1</code>) dentro de una transacción con <code>lockForUpdate()</code> para evitar sobre-préstamos.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ORDEN DE DESARROLLO */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-indigo-400" />
                Plan y Orden Metodológico de Desarrollo (Paso a Paso)
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                Secuencia lógica de construcción de software: desde el cimiento de datos y reglas de negocio hasta la interfaz y las pruebas automatizadas.
              </p>
            </div>

            <div className="space-y-4">
              {ROADMAP_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6 hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-indigo-400">{step.step}</div>
                        <h3 className="text-base font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <span className="text-[11px] bg-slate-900 text-slate-400 px-3 py-1 rounded-full border border-slate-800">
                      Entregable clave
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-4">{step.summary}</p>

                  <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Productos Entregables del Paso:
                    </span>
                    <ul className="space-y-2">
                      {step.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: MATRIZ RF / RNF */}
        {activeTab === 'requirements' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                Matriz de Trazabilidad: Requerimientos vs Arquitectura
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                Mapeo exacto de cómo la arquitectura propuesta resuelve cada requerimiento funcional y no funcional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Funcionales */}
              <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Requerimientos Funcionales (RF01 - RF09)
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">RF01: Iniciar Sesión</span>
                    <p className="text-slate-400 mt-0.5"><code>AuthController::login</code>, verificación de hash con Bcrypt y sesión segura en Laravel.</p>
                  </div>
                  <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">RF02 & RF03: Registrar y Modificar Usuarios</span>
                    <p className="text-slate-400 mt-0.5"><code>UserController</code>, validación de código institucional único, asignación de rol (Admin, Bibliotecario, Docente, Estudiante).</p>
                  </div>
                  <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">RF04 & RF05: Registrar y Actualizar Libros</span>
                    <p className="text-slate-400 mt-0.5"><code>BookController</code>, validación de ISBN, control de ejemplares totales y disponibles, categorización.</p>
                  </div>
                  <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">RF06: Registrar Préstamos</span>
                    <p className="text-slate-400 mt-0.5"><code>LoanService::createLoan</code> con transacción DB, decremento de ejemplares y validación de mora previa.</p>
                  </div>
                  <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">RF07: Registrar Devoluciones</span>
                    <p className="text-slate-400 mt-0.5"><code>LoanService::returnBook</code>, registro de fecha de retorno real, actualización de condición física y reingreso a stock.</p>
                  </div>
                  <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">RF08: Consultar Disponibilidad</span>
                    <p className="text-slate-400 mt-0.5">Búsqueda reactiva por título, autor o categoría; visualización en tiempo real de ejemplares libres.</p>
                  </div>
                  <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-300">RF09: Generar Reportes</span>
                    <p className="text-slate-400 mt-0.5"><code>ReportService</code>: préstamos activos, historial por usuario, libros más solicitados y alertas de préstamos vencidos.</p>
                  </div>
                </div>
              </div>

              {/* No Funcionales */}
              <div className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  Requerimientos No Funcionales (RNF01 - RNF04)
                </h3>
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Clock className="w-4 h-4" />
                      RNF01: Tiempo de Respuesta &lt; 3 Segundos
                    </div>
                    <p className="text-slate-300 mt-1">
                      Garantizado mediante:
                    </p>
                    <ul className="list-disc list-inside text-slate-400 mt-1 space-y-1">
                      <li>Índices en columnas frecuentes: <code>books.isbn</code>, <code>books.category_id</code>, <code>users.email</code>, <code>loans.status</code>.</li>
                      <li>Carga ansiosa (Eager Loading con <code>with()</code>) en Eloquent para eliminar el problema de consultas N+1.</li>
                      <li>Cache de catálogo de categorías y roles con Singleton <code>SystemConfigService</code>.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                      <Key className="w-4 h-4" />
                      RNF02: Contraseñas Seguras con Hash
                    </div>
                    <p className="text-slate-300 mt-1">
                      Laravel utiliza por defecto el algoritmo <code>Bcrypt</code> (coste 12) o <code>Argon2id</code>. Las contraseñas se convierten automáticamente con el cast <code>'hashed'</code> en el modelo <code>User</code>, imposibilitando el almacenamiento en texto plano.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                      <BookOpen className="w-4 h-4" />
                      RNF03: Interfaz Intuitiva y Fácil de Usar
                    </div>
                    <p className="text-slate-300 mt-1">
                      Desarrollo de vistas Blade adaptadas a cada rol (Admin, Bibliotecario, Usuario) con retroalimentación inmediata, alertas de confirmación en eliminaciones y buscador en tiempo real.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <HardDrive className="w-4 h-4" />
                      RNF04: Respaldos Periódicos de Información
                    </div>
                    <p className="text-slate-300 mt-1">
                      Implementación del comando <code>php artisan backup:database</code> que ejecuta <code>mysqldump</code> empaquetando en <code>storage/app/backups/</code> y registrando auditoría en <code>backup_logs</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-4 text-center text-xs text-slate-500">
        BIBLIOTECH • Sistema de Gestión de Biblioteca Digital • Preparado para la siguiente instrucción.
      </footer>
    </div>
  );
}

function generateCreateTableSql(table: DbTable): string {
  const colDefs = table.columns.map((col) => {
    let def = `  \`${col.name}\` ${col.type}`;
    if (col.attributes) def += ` ${col.attributes}`;
    if (col.nullable === false || !col.nullable) def += ` NOT NULL`;
    if (col.isPrimary) def += ` AUTO_INCREMENT`;
    return def;
  });

  const pks = table.columns.filter((c) => c.isPrimary).map((c) => `\`${c.name}\``);
  if (pks.length > 0) {
    colDefs.push(`  PRIMARY KEY (${pks.join(', ')})`);
  }

  const fks = table.columns.filter((c) => c.isForeign && c.references);
  fks.forEach((c) => {
    const [targetTable, targetCol] = c.references!.replace(')', '').split('(');
    colDefs.push(`  CONSTRAINT \`fk_${table.name}_${c.name}\` FOREIGN KEY (\`${c.name}\`) REFERENCES \`${targetTable}\` (\`${targetCol}\`) ON DELETE RESTRICT ON UPDATE CASCADE`);
  });

  return `CREATE TABLE \`${table.name}\` (\n${colDefs.join(',\n')}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
}

const laravelTreeString = `bibliotech/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── UserController.php
│   │   │   ├── BookController.php
│   │   │   ├── CategoryController.php
│   │   │   ├── LoanController.php
│   │   │   └── ReportController.php
│   │   ├── Middleware/
│   │   │   ├── CheckRole.php
│   │   │   └── CheckUserActive.php
│   │   └── Requests/
│   │       ├── StoreUserRequest.php
│   │       ├── StoreBookRequest.php
│   │       └── StoreLoanRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Role.php
│   │   ├── Category.php
│   │   ├── Book.php
│   │   ├── Loan.php
│   │   ├── LoanDetail.php
│   │   └── BackupLog.php
│   ├── Services/
│   │   ├── LoanService.php
│   │   ├── BookService.php
│   │   ├── UserService.php
│   │   ├── ReportService.php
│   │   └── SystemConfigService.php
│   ├── Repositories/
│   │   ├── Contracts/
│   │   │   ├── UserRepositoryInterface.php
│   │   │   ├── BookRepositoryInterface.php
│   │   │   ├── CategoryRepositoryInterface.php
│   │   │   └── LoanRepositoryInterface.php
│   │   └── Eloquent/
│   │       ├── EloquentUserRepository.php
│   │       ├── EloquentBookRepository.php
│   │       ├── EloquentCategoryRepository.php
│   │       └── EloquentLoanRepository.php
│   ├── Providers/
│   │   └── RepositoryServiceProvider.php
│   └── Console/Commands/
│       └── DatabaseBackupCommand.php
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── resources/views/
│   ├── layouts/
│   ├── auth/
│   ├── admin/
│   ├── librarian/
│   └── user/
├── routes/
│   ├── web.php
│   └── console.php
└── tests/
    ├── Unit/
    └── Feature/`;
