export interface TableColumn {
  name: string;
  type: string;
  attributes?: string;
  isPrimary?: boolean;
  isForeign?: boolean;
  references?: string;
  nullable?: boolean;
  description: string;
}

export interface DbTable {
  id: string;
  name: string;
  description: string;
  category: 'Seguridad y Usuarios' | 'Catálogo Bibliográfico' | 'Circulación y Préstamos' | 'Auditoría y Mantenimiento';
  columns: TableColumn[];
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  components: {
    title: string;
    description: string;
    path: string;
    role: string;
  }[];
}

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'presentation',
    name: '1. Capa de Presentación (Frontend & HTTP Interface)',
    subtitle: 'Vistas Blade, Assets CSS/JS, Controladores HTTP y Form Requests',
    color: 'emerald',
    components: [
      {
        title: 'Vistas Blade (Templates)',
        path: 'resources/views/',
        role: 'Renderiza las interfaces de usuario (Admin, Bibliotecario, Usuario). Layouts compartidos, componentes reusables y alertas.',
        description: 'Vistas estructuradas con Bootstrap/Tailwind + Blade: dashboard, catálogos, formularios reactivos con fetch/AJAX.'
      },
      {
        title: 'Controladores HTTP (Web)',
        path: 'app/Http/Controllers/',
        role: 'Punto de entrada de las peticiones HTTP. No contiene lógica de negocio pesada.',
        description: 'AuthController, UserController, BookController, LoanController, ReportController. Delegan a los Servicios.'
      },
      {
        title: 'Form Request Validations',
        path: 'app/Http/Requests/',
        role: 'Valida los datos de entrada antes de llegar al controlador garantizando integridad (RNF02, sanitización).',
        description: 'StoreUserRequest, StoreBookRequest, StoreLoanRequest, UpdateReturnRequest.'
      },
      {
        title: 'Middlewares de Rol & Autenticación',
        path: 'app/Http/Middleware/',
        role: 'Protección de rutas según roles (admin, librarian, student/teacher).',
        description: 'EnsureUserHasRole, ActiveUserMiddleware, PreventBackHistory.'
      }
    ]
  },
  {
    id: 'business',
    name: '2. Capa de Lógica de Negocio (Business Logic & Domain Services)',
    subtitle: 'Servicios de dominio, políticas de negocio, transacciones y cálculos',
    color: 'sky',
    components: [
      {
        title: 'Servicios de Dominio (Service Layer)',
        path: 'app/Services/',
        role: 'Encapsula reglas del negocio de préstamos, multas, stock y validación de sanciones.',
        description: 'LoanService (valida límite de 3 libros por estudiante, días de préstamo, decremento de stock atómico), BookService, UserService, ReportService.'
      },
      {
        title: 'Acciones Específicas / Use Cases',
        path: 'app/Actions/ (o en Services)',
        role: 'Operaciones atómicas como registro de devolución, cálculo de mora, verificación de disponibilidad.',
        description: 'CalculateLateFeeAction, ProcessBookReturnAction, CheckBookAvailabilityAction.'
      },
      {
        title: 'Políticas de Autorización (Policies)',
        path: 'app/Policies/',
        role: 'Determina si un actor puede realizar una acción sobre un modelo.',
        description: 'BookPolicy, LoanPolicy, UserPolicy (ej. Solo admin modifica usuarios; usuario solo ve sus préstamos).'
      },
      {
        title: 'Servicio Singleton de Configuración & Mantenimiento',
        path: 'app/Services/SystemConfigService.php',
        role: 'Patrón Singleton para parámetros globales (días máximos de préstamo, cuota de libros, alertas).',
        description: 'Carga configuraciones en memoria una sola vez por ciclo de vida o cache para alto rendimiento (<3 seg).'
      }
    ]
  },
  {
    id: 'data',
    name: '3. Capa de Acceso a Datos (Data Access / Repository Pattern)',
    subtitle: 'Interfaces DAO/Repository, Implementaciones Eloquent y Migraciones MySQL',
    color: 'amber',
    components: [
      {
        title: 'Interfaces de Repositorio (Contracts)',
        path: 'app/Repositories/Contracts/',
        role: 'Define los contratos de persistencia desacoplando la lógica de la base de datos.',
        description: 'UserRepositoryInterface, BookRepositoryInterface, LoanRepositoryInterface, CategoryRepositoryInterface.'
      },
      {
        title: 'Implementaciones Eloquent de Repositorios',
        path: 'app/Repositories/Eloquent/',
        role: 'Implementa los métodos de consulta usando Eloquent ORM y Query Builder de Laravel.',
        description: 'EloquentUserRepository, EloquentBookRepository (consultas optimizadas con eager loading with("category")).'
      },
      {
        title: 'Modelos de Dominio (Eloquent Models)',
        path: 'app/Models/',
        role: 'Mapeo objeto-relacional con MySQL. Define relaciones, casts, mutators y scopes.',
        description: 'User, Role, Category, Book, Loan, LoanDetail, Sanction, BackupLog.'
      },
      {
        title: 'Service Provider de Inyección de Dependencias',
        path: 'app/Providers/RepositoryServiceProvider.php',
        role: 'Enlaza cada Interface con su implementación concreta en el Service Container de Laravel.',
        description: '$this->app->bind(BookRepositoryInterface::class, EloquentBookRepository::class);'
      }
    ]
  }
];

export const DB_TABLES: DbTable[] = [
  {
    id: 'roles',
    name: 'roles',
    description: 'Catálogo de roles del sistema para control de acceso basado en roles (RBAC).',
    category: 'Seguridad y Usuarios',
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPrimary: true, description: 'Identificador único del rol (Auto-incremental).' },
      { name: 'name', type: 'VARCHAR(50)', description: 'Código único: "admin", "librarian", "student", "teacher".' },
      { name: 'display_name', type: 'VARCHAR(100)', description: 'Nombre legible: "Administrador", "Bibliotecario", "Estudiante", "Docente".' },
      { name: 'description', type: 'VARCHAR(255)', nullable: true, description: 'Breve descripción de las atribuciones del rol.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Fecha de creación del registro.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Fecha de última actualización.' }
    ]
  },
  {
    id: 'users',
    name: 'users',
    description: 'Usuarios del sistema (Administradores, Bibliotecarios, Estudiantes y Docentes).',
    category: 'Seguridad y Usuarios',
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPrimary: true, description: 'Identificador único del usuario.' },
      { name: 'role_id', type: 'BIGINT UNSIGNED', isForeign: true, references: 'roles(id)', description: 'Rol asignado al usuario.' },
      { name: 'code', type: 'VARCHAR(30)', description: 'Código institucional único (matrícula o cédula).' },
      { name: 'name', type: 'VARCHAR(100)', description: 'Nombres completos del usuario.' },
      { name: 'email', type: 'VARCHAR(150)', description: 'Correo electrónico único (usado para login RF01).' },
      { name: 'password', type: 'VARCHAR(255)', description: 'Contraseña encriptada con Bcrypt/Argon2id (RNF02).' },
      { name: 'phone', type: 'VARCHAR(20)', nullable: true, description: 'Teléfono de contacto.' },
      { name: 'address', type: 'VARCHAR(255)', nullable: true, description: 'Dirección domiciliaria.' },
      { name: 'status', type: "ENUM('active', 'inactive', 'suspended')", attributes: "DEFAULT 'active'", description: 'Estado para permitir/bloquear préstamos o acceso.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Auditoría de alta.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Auditoría de modificación.' },
      { name: 'deleted_at', type: 'TIMESTAMP', nullable: true, description: 'Soft delete para conservar histórico sin borrado físico.' }
    ]
  },
  {
    id: 'categories',
    name: 'categories',
    description: 'Clasificación temática o curricular de los recursos bibliográficos.',
    category: 'Catálogo Bibliográfico',
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPrimary: true, description: 'Identificador único de categoría.' },
      { name: 'name', type: 'VARCHAR(100)', description: 'Nombre: ej. Ciencias de la Computación, Matemáticas, Literatura.' },
      { name: 'code', type: 'VARCHAR(20)', nullable: true, description: 'Código decimal de clasificación (Dewey / CDU).' },
      { name: 'description', type: 'TEXT', nullable: true, description: 'Descripción o alcance temático.' },
      { name: 'is_active', type: 'BOOLEAN', attributes: 'DEFAULT TRUE', description: 'Bandera de vigencia.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Fecha de creación.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Fecha de actualización.' }
    ]
  },
  {
    id: 'books',
    name: 'books',
    description: 'Catálogo de títulos bibliográficos físicos y digitales.',
    category: 'Catálogo Bibliográfico',
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPrimary: true, description: 'Identificador único del libro.' },
      { name: 'category_id', type: 'BIGINT UNSIGNED', isForeign: true, references: 'categories(id)', description: 'Categoría o disciplina del libro.' },
      { name: 'isbn', type: 'VARCHAR(20)', description: 'Código ISBN internacional (indexado, único).' },
      { name: 'title', type: 'VARCHAR(200)', description: 'Título completo de la obra.' },
      { name: 'author', type: 'VARCHAR(150)', description: 'Autor(es) principales.' },
      { name: 'editorial', type: 'VARCHAR(100)', nullable: true, description: 'Editorial que publica el libro.' },
      { name: 'edition_year', type: 'SMALLINT UNSIGNED', nullable: true, description: 'Año de publicación o edición.' },
      { name: 'total_copies', type: 'INT UNSIGNED', attributes: 'DEFAULT 1', description: 'Número total de ejemplares físicos registrados.' },
      { name: 'available_copies', type: 'INT UNSIGNED', attributes: 'DEFAULT 1', description: 'Ejemplares disponibles en estantería (RF08).' },
      { name: 'location_rack', type: 'VARCHAR(50)', nullable: true, description: 'Ubicación física: estante, pasillo o clasificación.' },
      { name: 'digital_resource_url', type: 'VARCHAR(255)', nullable: true, description: 'URL o path al PDF si cuenta con versión digital.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Registro inicial.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Última modificación de datos o stock.' },
      { name: 'deleted_at', type: 'TIMESTAMP', nullable: true, description: 'Soft delete.' }
    ]
  },
  {
    id: 'loans',
    name: 'loans',
    description: 'Cabecera de préstamos de libros (RF06, RF07).',
    category: 'Circulación y Préstamos',
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPrimary: true, description: 'Número o folio de préstamo.' },
      { name: 'user_id', type: 'BIGINT UNSIGNED', isForeign: true, references: 'users(id)', description: 'Usuario solicitante (estudiante o docente).' },
      { name: 'librarian_id', type: 'BIGINT UNSIGNED', isForeign: true, references: 'users(id)', description: 'Bibliotecario que autoriza o entrega el préstamo.' },
      { name: 'loan_date', type: 'DATETIME', description: 'Fecha y hora exacta del préstamo.' },
      { name: 'due_date', type: 'DATE', description: 'Fecha máxima de devolución acordada según reglamento.' },
      { name: 'status', type: "ENUM('requested', 'active', 'returned', 'overdue')", attributes: "DEFAULT 'active'", description: 'Estado del préstamo.' },
      { name: 'notes', type: 'TEXT', nullable: true, description: 'Observaciones sobre el estado del material.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Auditoría.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Auditoría.' }
    ]
  },
  {
    id: 'loan_details',
    name: 'loan_details',
    description: 'Detalle de libros prestados por cada transacción (soporta préstamos de 1 a N libros con control individual de retorno).',
    category: 'Circulación y Préstamos',
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPrimary: true, description: 'Identificador del ítem prestado.' },
      { name: 'loan_id', type: 'BIGINT UNSIGNED', isForeign: true, references: 'loans(id)', description: 'Préstamo al que pertenece el detalle.' },
      { name: 'book_id', type: 'BIGINT UNSIGNED', isForeign: true, references: 'books(id)', description: 'Libro prestado.' },
      { name: 'quantity', type: 'INT UNSIGNED', attributes: 'DEFAULT 1', description: 'Cantidad prestada de este título.' },
      { name: 'return_date', type: 'DATETIME', nullable: true, description: 'Fecha y hora real en que se devolvió el ejemplar (RF07).' },
      { name: 'condition_on_loan', type: 'VARCHAR(100)', attributes: "DEFAULT 'good'", description: 'Estado físico del libro al salir.' },
      { name: 'condition_on_return', type: 'VARCHAR(100)', nullable: true, description: 'Estado físico del libro al reingresar.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Auditoría.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Auditoría.' }
    ]
  },
  {
    id: 'sanctions',
    name: 'sanctions',
    description: 'Historial y registro de penalizaciones por retraso o deterioro para generación de reportes de morosidad (RF09).',
    category: 'Circulación y Préstamos',
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPrimary: true, description: 'ID de la sanción.' },
      { name: 'user_id', type: 'BIGINT UNSIGNED', isForeign: true, references: 'users(id)', description: 'Usuario sancionado.' },
      { name: 'loan_id', type: 'BIGINT UNSIGNED', isForeign: true, references: 'loans(id)', description: 'Préstamo que generó la mora.' },
      { name: 'days_overdue', type: 'INT UNSIGNED', attributes: 'DEFAULT 0', description: 'Días de retraso acumulados.' },
      { name: 'fine_amount', type: 'DECIMAL(8,2)', attributes: 'DEFAULT 0.00', description: 'Monto de multa o penalización (si aplica).' },
      { name: 'status', type: "ENUM('pending', 'paid', 'forgiven')", attributes: "DEFAULT 'pending'", description: 'Estado de la sanción.' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: true, description: 'Fecha de sanción.' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: true, description: 'Fecha de regularización.' }
    ]
  },
  {
    id: 'backup_logs',
    name: 'backup_logs',
    description: 'Bitácora de respaldos de la base de datos (RNF04).',
    category: 'Auditoría y Mantenimiento',
    columns: [
      { name: 'id', type: 'BIGINT UNSIGNED', isPrimary: true, description: 'ID de registro de respaldo.' },
      { name: 'user_id', type: 'BIGINT UNSIGNED', isForeign: true, references: 'users(id)', nullable: true, description: 'Administrador que ejecutó el respaldo manual o NULL si fue cron.' },
      { name: 'filename', type: 'VARCHAR(255)', description: 'Nombre del archivo .sql.gz generado en storage.' },
      { name: 'file_size_kb', type: 'INT UNSIGNED', description: 'Tamaño del archivo de respaldo en kilobytes.' },
      { name: 'status', type: "ENUM('success', 'failed')", description: 'Resultado de la ejecución de mysqldump.' },
      { name: 'error_message', type: 'TEXT', nullable: true, description: 'Detalle de fallo si ocurriese.' },
      { name: 'created_at', type: 'TIMESTAMP', description: 'Marca de tiempo del respaldo.' }
    ]
  }
];

export const ROADMAP_STEPS = [
  {
    step: 'Paso 1',
    title: 'Configuración de Entorno y Modelo de Datos (Capa 3)',
    summary: 'Instalación de Laravel, configuración de .env con MySQL, migraciones de las 7 tablas, llaves foráneas e índices para queries < 3s (RNF01).',
    deliverables: [
      'Migraciones de BD: roles, users, categories, books, loans, loan_details, backup_logs.',
      'Seeders y Factories con datos iniciales (Admin, Bibliotecario, Docente, Estudiante).',
      'Configuración de MySQL UTF8mb4 y pruebas de conexión.'
    ]
  },
  {
    step: 'Paso 2',
    title: 'Modelos Eloquent, Relaciones y Contratos Repository (Capa 3)',
    summary: 'Construcción de los Modelos Eloquent con relacionesORM (hasMany, belongsTo, belongsToMany) e implementación del Repository Pattern.',
    deliverables: [
      'Modelos: User, Role, Category, Book, Loan, LoanDetail con casts y scopes.',
      'Interfaces DAO: UserRepositoryInterface, BookRepositoryInterface, LoanRepositoryInterface.',
      'Implementaciones Eloquent y registro en RepositoryServiceProvider.'
    ]
  },
  {
    step: 'Paso 3',
    title: 'Lógica de Negocio y Reglas de Dominio (Capa 2)',
    summary: 'Implementación de Services para gestionar las operaciones críticas respetando RF06, RF07, RF08 y RNF02.',
    deliverables: [
      'LoanService: Validar cupo disponible, transacción atómica (DB::transaction), decremento/incremento de available_copies.',
      'BookService: Búsquedas con indexación, filtros por categoría/título/autor.',
      'UserService: Hashing seguro Bcrypt/Argon2id (RNF02), validación de código único institucional.',
      'Singleton SystemConfigService para parámetros globales de la biblioteca.'
    ]
  },
  {
    step: 'Paso 4',
    title: 'Autenticación, Autorización y Seguridad (RF01, RF02, RF03)',
    summary: 'Flujo de Login con hashing, middlewares de rol (Admin, Bibliotecario, Usuario) y validaciones con Form Requests.',
    deliverables: [
      'AuthController y vistas de Login / Registro.',
      'Middlewares CheckRole (RBAC) para Admin, Bibliotecario y Alumno/Docente.',
      'Form Requests con validación estricta de campos y sanitización.'
    ]
  },
  {
    step: 'Paso 5',
    title: 'Interfaces de Usuario en Blade (Capa 1) y Controladores',
    summary: 'Desarrollo de las interfaces intuitivas y adaptables (RNF03) separadas por rol.',
    deliverables: [
      'Panel Administrador: CRUD de usuarios, libros, categorías y monitor de respaldos.',
      'Panel Bibliotecario: Módulo de préstamos, devoluciones y scanner/búsqueda rápida de disponibilidad.',
      'Panel Usuario: Catálogo digital, solicitud de préstamos y visualizador de estado de sus préstamos.',
      'Módulo de Reportes (RF09): Exportación en PDF/Excel de préstamos activos, mora y estadísticas.'
    ]
  },
  {
    step: 'Paso 6',
    title: 'Testing Automatizado con PHPUnit, Respaldos (RNF04) y CI/CD',
    summary: 'Pruebas unitarias de servicios y repositorios, pruebas funcionales HTTP, comando artisan de backup y workflow en GitHub Actions.',
    deliverables: [
      'Tests PHPUnit: LoanServiceTest, BookAvailabilityTest, AuthSecurityTest.',
      'Comando Artisan backup:database para volcado de MySQL a storage (RNF04).',
      '.github/workflows/laravel.yml para CI automatizado.'
    ]
  }
];
