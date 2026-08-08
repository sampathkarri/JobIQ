export interface Question {
  id: number;
  category:
    | "DBMS"
    | "OOPs"
    | "Computer Networks"
    | "Software Eng"
    | "Git"
    | "SQL"
    | "DSA"
    | "HR"
    | "Backend"
    | "Frontend"
    | "Python"
    | "Java";
  role: string;
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  tips: string;
  keywords: string[];
  ideal_points: string[];
  company?: string;
}

export const QUESTION_BANK: Question[] = [
  {
    "id": 1,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain ACID properties in DBMS with real-world examples.",
    "tips": "Atomicity, Consistency, Isolation, Durability.",
    "keywords": [
      "acid",
      "atomicity",
      "consistency",
      "isolation",
      "durability",
      "transaction"
    ],
    "ideal_points": [
      "Define ACID",
      "Bank transfer example",
      "Isolation levels",
      "WAL log"
    ],
    "company": "Amazon"
  },
  {
    "id": 2,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Normalization? Explain 1NF, 2NF, 3NF, and BCNF.",
    "tips": "Reduce redundancy, 2NF removes partial dep, 3NF removes transitive dep.",
    "keywords": [
      "normalization",
      "1nf",
      "2nf",
      "3nf",
      "bcnf",
      "redundancy"
    ],
    "ideal_points": [
      "1NF atomic",
      "2NF partial dep",
      "3NF transitive dep",
      "BCNF rules"
    ],
    "company": "Microsoft"
  },
  {
    "id": 3,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "How do B-Tree and B+ Tree indexes speed up database queries?",
    "tips": "B+ trees store data in leaf nodes linked for range queries.",
    "keywords": [
      "b-tree",
      "b+tree",
      "index",
      "binary search",
      "range query"
    ],
    "ideal_points": [
      "B-tree vs B+tree",
      "Leaf node pointers",
      "Clustered index",
      "Write penalty"
    ],
    "company": "Meta"
  },
  {
    "id": 4,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Hard",
    "title": "Explain Database Deadlocks and prevention methods.",
    "tips": "4 conditions: Mutual exclusion, hold & wait, no preemption, circular wait.",
    "keywords": [
      "deadlock",
      "circular wait",
      "lock",
      "prevention",
      "wait-for graph"
    ],
    "ideal_points": [
      "4 deadlock conditions",
      "Wait-for graph",
      "2-Phase Locking",
      "Timeouts"
    ],
    "company": "Uber"
  },
  {
    "id": 5,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is the difference between Clustered and Non-Clustered Index?",
    "tips": "Clustered determines physical order (1 per table). Non-clustered is separate structure.",
    "keywords": [
      "clustered",
      "non-clustered",
      "index",
      "physical order",
      "pointer"
    ],
    "ideal_points": [
      "Physical order vs logical",
      "One per table rule",
      "Secondary index lookup",
      "Performance impact"
    ],
    "company": "Oracle"
  },
  {
    "id": 6,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain 2-Phase Locking (2PL) protocol.",
    "tips": "Growing phase (acquire locks) and Shrinking phase (release locks).",
    "keywords": [
      "2pl",
      "locking",
      "growing",
      "shrinking",
      "concurrency"
    ],
    "ideal_points": [
      "Growing phase",
      "Shrinking phase",
      "Strict 2PL",
      "Prevents cascading rollbacks"
    ],
    "company": "Flipkart"
  },
  {
    "id": 7,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Sharding vs Partitioning?",
    "tips": "Sharding splits across multiple machines; Partitioning splits within single DB.",
    "keywords": [
      "sharding",
      "partitioning",
      "horizontal",
      "vertical",
      "scale"
    ],
    "ideal_points": [
      "Horizontal sharding",
      "Vertical partitioning",
      "Shard key choice",
      "Cross-shard joins"
    ],
    "company": "Infosys"
  },
  {
    "id": 8,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "What are Database Triggers and Stored Procedures?",
    "tips": "Triggers execute automatically on events; Stored Procedures are compiled SQL code.",
    "keywords": [
      "trigger",
      "stored procedure",
      "sql",
      "automation",
      "event"
    ],
    "ideal_points": [
      "Trigger execution events",
      "Stored procedure benefits",
      "Performance considerations",
      "Business logic in DB"
    ],
    "company": "TCS"
  },
  {
    "id": 9,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain Transaction Isolation Levels in SQL (Read Uncommitted, Read Committed, Repeatable Read, Serializable).",
    "tips": "Prevents Dirty Read, Non-Repeatable Read, and Phantom Read.",
    "keywords": [
      "isolation",
      "dirty read",
      "phantom read",
      "serializable",
      "repeatable read"
    ],
    "ideal_points": [
      "Read Uncommitted dirty read",
      "Read Committed prevents dirty",
      "Repeatable Read prevents non-repeatable",
      "Serializable strictest"
    ],
    "company": "Google"
  },
  {
    "id": 10,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Write-Ahead Logging (WAL) and how does it guarantee durability?",
    "tips": "Changes logged to disk log before updating data pages.",
    "keywords": [
      "wal",
      "write-ahead",
      "log",
      "durability",
      "recovery",
      "checkpoint"
    ],
    "ideal_points": [
      "Append-only log",
      "Crash recovery",
      "Checkpoints",
      "Buffer pool flush"
    ],
    "company": "Amazon"
  },
  {
    "id": 11,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Shadow Paging in DBMS?",
    "tips": "Alternative to WAL where old and new page tables maintain database state.",
    "keywords": [
      "shadow paging",
      "page table",
      "recovery",
      "atomicity"
    ],
    "ideal_points": [
      "Current vs Shadow page table",
      "No undo/redo needed",
      "Data fragmentation",
      "Garbage collection of pages"
    ],
    "company": "Microsoft"
  },
  {
    "id": 12,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain View and Materialized View in DBMS.",
    "tips": "View is virtual query; Materialized View stores query result physically.",
    "keywords": [
      "view",
      "materialized view",
      "virtual",
      "cache",
      "refresh"
    ],
    "ideal_points": [
      "Virtual query execution",
      "Physical storage of result",
      "Refresh strategies",
      "Use cases for reporting"
    ],
    "company": "Meta"
  },
  {
    "id": 13,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is ER Diagram and Cardinality (1:1, 1:N, M:N)?",
    "tips": "Entity-Relationship diagram models data entities, attributes, and relationships.",
    "keywords": [
      "er diagram",
      "entity",
      "attribute",
      "cardinality",
      "relationship"
    ],
    "ideal_points": [
      "Entities & attributes",
      "1-to-1, 1-to-Many",
      "Many-to-Many junction table",
      "Foreign keys"
    ],
    "company": "Uber"
  },
  {
    "id": 14,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Pooling and Connection Management?",
    "tips": "Reusing active DB connections to eliminate TCP handshake overhead.",
    "keywords": [
      "connection pool",
      "datasource",
      "handshake",
      "reuse",
      "idle"
    ],
    "ideal_points": [
      "Overhead of opening connections",
      "Max active & idle connections",
      "Connection leak handling",
      "HikariCP / SQLAlchemy pool"
    ],
    "company": "Oracle"
  },
  {
    "id": 15,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain CAP Theorem for distributed databases.",
    "tips": "Consistency, Availability, Partition Tolerance - pick any two.",
    "keywords": [
      "cap theorem",
      "consistency",
      "availability",
      "partition tolerance",
      "nosql"
    ],
    "ideal_points": [
      "Define CAP",
      "CP vs AP systems",
      "Network partition reality",
      "Eventual consistency"
    ],
    "company": "Flipkart"
  },
  {
    "id": 16,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is BASE consistency in NoSQL databases?",
    "tips": "Basically Available, Soft-state, Eventual consistency.",
    "keywords": [
      "base",
      "eventual consistency",
      "nosql",
      "availability"
    ],
    "ideal_points": [
      "Contrast with ACID",
      "Eventual consistency model",
      "Replica synchronization",
      "Use cases"
    ],
    "company": "Infosys"
  },
  {
    "id": 17,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Mirroring vs Replication?",
    "tips": "Replication copies data asynchronously/synchronously; Mirroring provides high availability standby.",
    "keywords": [
      "replication",
      "mirroring",
      "standby",
      "master-slave",
      "failover"
    ],
    "ideal_points": [
      "Primary/Replica model",
      "Synchronous vs Asynchronous",
      "Read scaling",
      "Automatic failover"
    ],
    "company": "TCS"
  },
  {
    "id": 18,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain Database Index Scans vs Index Seeks.",
    "tips": "Seek jumps to specific key; Scan reads entire index structure.",
    "keywords": [
      "index seek",
      "index scan",
      "table scan",
      "query plan"
    ],
    "ideal_points": [
      "Seek O(log N) lookup",
      "Scan reads index tree",
      "Selectivity impact",
      "Query optimizer decision"
    ],
    "company": "Google"
  },
  {
    "id": 19,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is a Foreign Key constraint and Cascading Delete?",
    "tips": "Enforces referential integrity. CASCADE automatically deletes child rows.",
    "keywords": [
      "foreign key",
      "referential integrity",
      "cascade",
      "delete",
      "constraint"
    ],
    "ideal_points": [
      "Referential integrity",
      "CASCADE DELETE / UPDATE",
      "SET NULL option",
      "Orphaned rows prevention"
    ],
    "company": "Amazon"
  },
  {
    "id": 20,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Concurrency Control?",
    "tips": "Protocols (Locking, Timestamping, Validation) to manage simultaneous transactions.",
    "keywords": [
      "concurrency",
      "locking",
      "timestamp",
      "mvcc",
      "optimistic"
    ],
    "ideal_points": [
      "Pessimistic vs Optimistic locking",
      "MVCC multi-versioning",
      "Lost update problem",
      "Phantom reads"
    ],
    "company": "Microsoft"
  },
  {
    "id": 21,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain Multi-Version Concurrency Control (MVCC).",
    "tips": "Provides concurrent access by keeping multiple versions of data rows.",
    "keywords": [
      "mvcc",
      "snapshot",
      "read view",
      "vacuum",
      "postgresql"
    ],
    "ideal_points": [
      "Snapshot isolation",
      "Readers don't block writers",
      "PostgreSQL tuple versions",
      "VACUUM cleanup"
    ],
    "company": "Meta"
  },
  {
    "id": 22,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is a Database Checkpoint?",
    "tips": "Flushes dirty pages from memory buffer pool to disk log.",
    "keywords": [
      "checkpoint",
      "buffer pool",
      "dirty page",
      "flush",
      "recovery"
    ],
    "ideal_points": [
      "Reduces recovery time",
      "Flushes memory to disk",
      "WAL truncation",
      "Background writer"
    ],
    "company": "Uber"
  },
  {
    "id": 23,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain Database Query Optimization and Execution Plans.",
    "tips": "Optimizer generates multiple plans and chooses minimum cost plan.",
    "keywords": [
      "optimizer",
      "execution plan",
      "cost",
      "explain",
      "cardinality"
    ],
    "ideal_points": [
      "Parse & analyze query",
      "Cost-based optimizer",
      "EXPLAIN ANALYZE command",
      "Index usage check"
    ],
    "company": "Oracle"
  },
  {
    "id": 24,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Star Schema vs Snowflake Schema in Data Warehousing?",
    "tips": "Star schema has denormalized dimension tables; Snowflake has normalized dimensions.",
    "keywords": [
      "star schema",
      "snowflake schema",
      "data warehouse",
      "fact table",
      "dimension"
    ],
    "ideal_points": [
      "Fact table & Dimensions",
      "Normalized vs Denormalized",
      "Query performance",
      "ETL complexity"
    ],
    "company": "Flipkart"
  },
  {
    "id": 25,
    "category": "DBMS",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Vacuuming in PostgreSQL?",
    "tips": "Reclaims storage occupied by dead tuples created by UPDATE/DELETE.",
    "keywords": [
      "vacuum",
      "postgres",
      "dead tuple",
      "bloat",
      "autovacuum"
    ],
    "ideal_points": [
      "MVCC tuple cleanup",
      "Transaction ID wraparound",
      "FREEZE operation",
      "Auto-vacuum daemon"
    ],
    "company": "Infosys"
  },
  {
    "id": 26,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    "tips": "The 4 core OOP pillars.",
    "keywords": [
      "encapsulation",
      "abstraction",
      "inheritance",
      "polymorphism"
    ],
    "ideal_points": [
      "Define all 4 pillars",
      "Real world example",
      "Access modifiers",
      "Interface vs abstract class"
    ],
    "company": "TCS"
  },
  {
    "id": 27,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "Difference between Abstract Class and Interface.",
    "tips": "Abstract class can have state/method bodies; Interface is pure contract.",
    "keywords": [
      "abstract class",
      "interface",
      "multiple inheritance",
      "contract"
    ],
    "ideal_points": [
      "Method implementation difference",
      "Multiple inheritance rule",
      "State & fields",
      "Default methods"
    ],
    "company": "Google"
  },
  {
    "id": 28,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Method Overloading vs Method Overriding?",
    "tips": "Overloading = same class compile time; Overriding = parent/child runtime.",
    "keywords": [
      "overloading",
      "overriding",
      "polymorphism",
      "compile time",
      "runtime"
    ],
    "ideal_points": [
      "Signature rules",
      "Compile vs runtime",
      "Annotation usage",
      "Virtual methods"
    ],
    "company": "Amazon"
  },
  {
    "id": 29,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "What are SOLID Principles? Explain each.",
    "tips": "S=Single Resp, O=Open/Closed, L=Liskov, I=Interface Seg, D=Dependency Inv.",
    "keywords": [
      "solid",
      "single responsibility",
      "open closed",
      "liskov",
      "dependency inversion"
    ],
    "ideal_points": [
      "Explain all 5 letters",
      "Code maintainability",
      "Dependency injection",
      "Refactoring example"
    ],
    "company": "Microsoft"
  },
  {
    "id": 30,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Composition vs Inheritance. Why favor composition?",
    "tips": "Composition = 'has-a', Inheritance = 'is-a'. Composition avoids tight coupling.",
    "keywords": [
      "composition",
      "inheritance",
      "has-a",
      "is-a",
      "coupling"
    ],
    "ideal_points": [
      "Is-a vs Has-a relationship",
      "Fragile base class problem",
      "Flexibility at runtime",
      "Design pattern preference"
    ],
    "company": "Meta"
  },
  {
    "id": 31,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is a Constructor? Default, Parameterized, and Copy Constructor.",
    "tips": "Special method to initialize objects upon creation.",
    "keywords": [
      "constructor",
      "default",
      "parameterized",
      "copy",
      "initialization"
    ],
    "ideal_points": [
      "Constructor rules",
      "Default constructor",
      "Copy constructor deep vs shallow",
      "Private constructor"
    ],
    "company": "Uber"
  },
  {
    "id": 32,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is the difference between Deep Copy and Shallow Copy?",
    "tips": "Shallow copies references; Deep copy recursively duplicates referenced objects.",
    "keywords": [
      "shallow copy",
      "deep copy",
      "clone",
      "reference",
      "pointer"
    ],
    "ideal_points": [
      "Reference copy vs object copy",
      "Impact on mutable fields",
      "Cloneable interface / copy method",
      "Memory overhead"
    ],
    "company": "Oracle"
  },
  {
    "id": 33,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Access Modifier (Private, Protected, Public, Package-Private)?",
    "tips": "Controls visibility of classes, methods, and variables.",
    "keywords": [
      "access modifier",
      "private",
      "protected",
      "public",
      "encapsulation"
    ],
    "ideal_points": [
      "Private = class only",
      "Protected = package + subclasses",
      "Public = global",
      "Encapsulation security"
    ],
    "company": "Flipkart"
  },
  {
    "id": 34,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Static Keyword (Variables, Methods, Blocks, Nested Classes).",
    "tips": "Belongs to class rather than instances.",
    "keywords": [
      "static",
      "class level",
      "memory",
      "method",
      "block"
    ],
    "ideal_points": [
      "Class memory allocation",
      "Static methods cannot access 'this'",
      "Static initialization block",
      "Utility classes"
    ],
    "company": "Infosys"
  },
  {
    "id": 35,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is a Singleton Design Pattern and how do you implement it thread-safely?",
    "tips": "Ensures class has only one instance and provides global access point.",
    "keywords": [
      "singleton",
      "design pattern",
      "thread safe",
      "private constructor",
      "double-checked locking"
    ],
    "ideal_points": [
      "Private constructor & static instance",
      "Double-checked locking",
      "Lazy vs Eager initialization",
      "Enum singleton"
    ],
    "company": "TCS"
  },
  {
    "id": 36,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Factory Pattern and Abstract Factory Pattern.",
    "tips": "Creational pattern to instantiate objects without exposing creation logic.",
    "keywords": [
      "factory pattern",
      "abstract factory",
      "creational",
      "instantiation"
    ],
    "ideal_points": [
      "Interface / Base class",
      "Factory method pattern",
      "Abstract factory for families",
      "Loose coupling"
    ],
    "company": "Google"
  },
  {
    "id": 37,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Observer Design Pattern?",
    "tips": "Behavioral pattern where subjects notify registered observers of state changes.",
    "keywords": [
      "observer",
      "behavioral",
      "publish subscribe",
      "event",
      "listener"
    ],
    "ideal_points": [
      "Subject and Observer interfaces",
      "Attach/Detach methods",
      "Event notification loop",
      "Loose coupling in UI/Event systems"
    ],
    "company": "Amazon"
  },
  {
    "id": 38,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Hard",
    "title": "Explain Strategy Design Pattern with an example.",
    "tips": "Defines a family of algorithms, encapsulates each, and makes them interchangeable.",
    "keywords": [
      "strategy pattern",
      "interchangeable",
      "algorithm",
      "behavioral"
    ],
    "ideal_points": [
      "Context class",
      "Strategy interface",
      "Runtime algorithm swapping",
      "Replacing switch statements"
    ],
    "company": "Microsoft"
  },
  {
    "id": 39,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Adapter Design Pattern?",
    "tips": "Converts interface of a class into another interface expected by client.",
    "keywords": [
      "adapter pattern",
      "structural",
      "wrapper",
      "compatibility"
    ],
    "ideal_points": [
      "Target & Adaptee interfaces",
      "Class vs Object adapter",
      "Legacy code integration",
      "Real-world plug adapter analogy"
    ],
    "company": "Meta"
  },
  {
    "id": 40,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Hard",
    "title": "Explain Decorator Design Pattern.",
    "tips": "Attaches additional responsibilities to an object dynamically.",
    "keywords": [
      "decorator pattern",
      "wrapper",
      "structural",
      "extensibility"
    ],
    "ideal_points": [
      "Base component & Decorator",
      "Wrapping objects recursively",
      "Alternative to subclassing",
      "Java I/O Streams example"
    ],
    "company": "Uber"
  },
  {
    "id": 41,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Dynamic Binding vs Static Binding?",
    "tips": "Static binding happens at compile-time (overloading); Dynamic at runtime (overriding).",
    "keywords": [
      "static binding",
      "dynamic binding",
      "compile time",
      "runtime",
      "virtual"
    ],
    "ideal_points": [
      "Method resolution timing",
      "Private/Static/Final use static binding",
      "Overridden methods use dynamic binding",
      "V-Table mechanism"
    ],
    "company": "Oracle"
  },
  {
    "id": 42,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is an Anonymous Inner Class?",
    "tips": "Class declared without a name, instantiated inline for one-time use.",
    "keywords": [
      "anonymous class",
      "inner class",
      "inline",
      "listener",
      "lambda"
    ],
    "ideal_points": [
      "Syntax & declaration",
      "One-time instantiation",
      "Access to final local variables",
      "Replacement by Lambdas"
    ],
    "company": "Flipkart"
  },
  {
    "id": 43,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain the concept of Immutability in OOP. How do you make a class Immutable?",
    "tips": "Object state cannot be modified after creation.",
    "keywords": [
      "immutable",
      "final",
      "string",
      "thread-safe",
      "read-only"
    ],
    "ideal_points": [
      "Declare class final",
      "Private final fields",
      "No setters",
      "Deep copy mutable fields in constructor/getters"
    ],
    "company": "Infosys"
  },
  {
    "id": 44,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Cohesion and Coupling? Why aim for High Cohesion & Low Coupling?",
    "tips": "Cohesion = focus within a module. Coupling = dependency between modules.",
    "keywords": [
      "cohesion",
      "coupling",
      "maintainability",
      "modular",
      "refactoring"
    ],
    "ideal_points": [
      "High cohesion definition",
      "Low coupling definition",
      "Ease of testing & maintenance",
      "Architectural benefits"
    ],
    "company": "TCS"
  },
  {
    "id": 45,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Hard",
    "title": "Explain Garbage Collection in Object-Oriented Systems.",
    "tips": "Automated memory management that destroys unreachable objects.",
    "keywords": [
      "garbage collection",
      "memory",
      "unreachable",
      "heap",
      "destructor"
    ],
    "ideal_points": [
      "Mark and Sweep phases",
      "Reference counting vs tracing",
      "Finalizer / Destructor concept",
      "Preventing memory leaks"
    ],
    "company": "Google"
  },
  {
    "id": 46,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is the Diamond Problem in Multiple Inheritance?",
    "tips": "Ambiguity when two parent classes inherit from same superclass.",
    "keywords": [
      "diamond problem",
      "multiple inheritance",
      "ambiguity",
      "virtual base"
    ],
    "ideal_points": [
      "Class hierarchy conflict",
      "Why Java disables multiple class inheritance",
      "Resolution via Interfaces with default methods",
      "C++ virtual inheritance"
    ],
    "company": "Amazon"
  },
  {
    "id": 47,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Dependency Injection (DI) and Inversion of Control (IoC)?",
    "tips": "IoC delegates object creation; DI passes dependencies into object.",
    "keywords": [
      "dependency injection",
      "ioc",
      "spring",
      "loose coupling",
      "constructor injection"
    ],
    "ideal_points": [
      "IoC principle",
      "Constructor vs Setter vs Field injection",
      "Testability benefits",
      "DI Frameworks"
    ],
    "company": "Microsoft"
  },
  {
    "id": 48,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain the Covariant Return Type in method overriding.",
    "tips": "Overridden method can return a subtype of the return type declared in parent.",
    "keywords": [
      "covariant",
      "return type",
      "subtype",
      "overriding"
    ],
    "ideal_points": [
      "Return type flexibility",
      "Subtype polymorphism",
      "Type safety",
      "Java 5+ support"
    ],
    "company": "Meta"
  },
  {
    "id": 49,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is a Virtual Method and Virtual Method Table (V-Table)?",
    "tips": "Mechanisms used by compilers to support dynamic dispatch (overriding).",
    "keywords": [
      "virtual method",
      "vtable",
      "dynamic dispatch",
      "polymorphism"
    ],
    "ideal_points": [
      "Function pointer array",
      "Runtime lookup overhead",
      "C++ virtual keyword",
      "Java methods are virtual by default"
    ],
    "company": "Uber"
  },
  {
    "id": 50,
    "category": "OOPs",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is the Marker Interface pattern?",
    "tips": "Interface with no methods used to tag/declare a capability to the runtime.",
    "keywords": [
      "marker interface",
      "tag",
      "serializable",
      "cloneable",
      "empty"
    ],
    "ideal_points": [
      "Empty interface definition",
      "Metadata tagging",
      "Serializable & Cloneable examples",
      "Modern replacement by Annotations"
    ],
    "company": "Oracle"
  },
  {
    "id": 51,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain OSI 7-Layer Model and TCP/IP 4-Layer Model.",
    "tips": "Physical, Data Link, Network, Transport, Session, Presentation, Application.",
    "keywords": [
      "osi",
      "tcp/ip",
      "layer",
      "packet",
      "frame",
      "router"
    ],
    "ideal_points": [
      "7 OSI layers",
      "TCP/IP mapping",
      "Encapsulation & Decapsulation",
      "L3 IP vs L4 TCP vs L7 HTTP"
    ],
    "company": "Flipkart"
  },
  {
    "id": 52,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "TCP 3-Way Handshake and 4-Way Termination.",
    "tips": "SYN -> SYN-ACK -> ACK for setup; FIN -> ACK -> FIN -> ACK for teardown.",
    "keywords": [
      "tcp",
      "3-way handshake",
      "syn",
      "ack",
      "fin",
      "termination"
    ],
    "ideal_points": [
      "SYN, SYN-ACK, ACK steps",
      "Sequence number negotiation",
      "4-Way FIN termination",
      "TIME_WAIT state"
    ],
    "company": "Infosys"
  },
  {
    "id": 53,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "What happens when you type a URL into a browser?",
    "tips": "DNS -> TCP -> TLS -> HTTP GET -> Server Response -> DOM Rendering.",
    "keywords": [
      "dns",
      "tcp",
      "tls",
      "http",
      "ip",
      "browser",
      "dom"
    ],
    "ideal_points": [
      "DNS resolution hierarchy",
      "TCP & TLS handshake",
      "HTTP Request/Response",
      "Browser rendering engine"
    ],
    "company": "TCS"
  },
  {
    "id": 54,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "TCP vs UDP: Differences, Use cases, and Header sizes.",
    "tips": "TCP = connection-oriented, reliable, 20-byte header. UDP = connectionless, fast, 8-byte header.",
    "keywords": [
      "tcp",
      "udp",
      "connectionless",
      "reliable",
      "streaming",
      "packet"
    ],
    "ideal_points": [
      "Reliable vs Unreliable",
      "Flow & Congestion control",
      "Use cases (Gaming/Video for UDP, Web/Email for TCP)",
      "Header structure"
    ],
    "company": "Google"
  },
  {
    "id": 55,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Hard",
    "title": "Explain DNS (Domain Name System) Query Resolution Process.",
    "tips": "Browser cache -> OS cache -> Router cache -> Recursive Resolver -> Root -> TLD -> Authoritative DNS.",
    "keywords": [
      "dns",
      "domain",
      "resolver",
      "root server",
      "tld",
      "a record"
    ],
    "ideal_points": [
      "Recursive vs Iterative queries",
      "DNS Hierarchy (Root, TLD, Authoritative)",
      "A, AAAA, CNAME, MX records",
      "DNS Caching & TTL"
    ],
    "company": "Amazon"
  },
  {
    "id": 56,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "HTTP vs HTTPS: How TLS/SSL Encryption Works.",
    "tips": "HTTPS adds TLS encryption layer over TCP port 443.",
    "keywords": [
      "https",
      "tls",
      "ssl",
      "certificate",
      "asymmetric",
      "symmetric"
    ],
    "ideal_points": [
      "TLS Handshake protocol",
      "Asymmetric key exchange",
      "Symmetric session key encryption",
      "CA Certificates & PKI"
    ],
    "company": "Microsoft"
  },
  {
    "id": 57,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC).",
    "tips": "HTTP/1.1 = text, head-of-line blocking. HTTP/2 = binary multiplexing. HTTP/3 = QUIC over UDP.",
    "keywords": [
      "http/1.1",
      "http/2",
      "http/3",
      "quic",
      "multiplexing",
      "udp"
    ],
    "ideal_points": [
      "Head-of-Line blocking in 1.1",
      "Multiplexing & Server Push in 2.0",
      "QUIC over UDP in 3.0",
      "Performance improvements"
    ],
    "company": "Meta"
  },
  {
    "id": 58,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is IPv4 vs IPv6? Explain IPv4 exhaustion and CIDR notation.",
    "tips": "IPv4 = 32-bit (4.3B addrs). IPv6 = 128-bit. CIDR notation defines subnet mask.",
    "keywords": [
      "ipv4",
      "ipv6",
      "cidr",
      "subnet",
      "ip address",
      "routing"
    ],
    "ideal_points": [
      "32-bit vs 128-bit addresses",
      "CIDR subnetting (/24, /16)",
      "NAT for IPv4 exhaustion",
      "IPv6 header simplicity"
    ],
    "company": "Uber"
  },
  {
    "id": 59,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is NAT (Network Address Translation) and Port Forwarding?",
    "tips": "Translates private IP addresses to single public IP address.",
    "keywords": [
      "nat",
      "private ip",
      "public ip",
      "router",
      "port forwarding"
    ],
    "ideal_points": [
      "Private IP ranges (192.168.x.x, 10.x.x.x)",
      "SNAT vs DNAT",
      "PAT (Port Address Translation)",
      "Bypassing NAT"
    ],
    "company": "Oracle"
  },
  {
    "id": 60,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain DHCP (Dynamic Host Configuration Protocol) - DORA Process.",
    "tips": "Discover -> Offer -> Request -> Acknowledge.",
    "keywords": [
      "dhcp",
      "dora",
      "ip assignment",
      "lease",
      "broadcast"
    ],
    "ideal_points": [
      "DORA sequence",
      "MAC address mapping",
      "Lease time & Renewal",
      "DHCP Relay"
    ],
    "company": "Flipkart"
  },
  {
    "id": 61,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is ARP (Address Resolution Protocol) and ARP Spoofing?",
    "tips": "Resolves IP address (L3) to physical MAC address (L2).",
    "keywords": [
      "arp",
      "mac address",
      "ip address",
      "ethernet",
      "spoofing"
    ],
    "ideal_points": [
      "IP to MAC resolution",
      "ARP cache table",
      "Broadcast request / Unicast reply",
      "ARP poisoning attack"
    ],
    "company": "Infosys"
  },
  {
    "id": 62,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Routing Algorithms: Distance Vector vs Link State Routing.",
    "tips": "Distance Vector (RIP - Bellman-Ford); Link State (OSPF - Dijkstra).",
    "keywords": [
      "routing",
      "distance vector",
      "link state",
      "ospf",
      "rip",
      "dijkstra"
    ],
    "ideal_points": [
      "Bellman-Ford vs Dijkstra algorithm",
      "Count to infinity problem",
      "Link state advertisement (LSA)",
      "Autonomous Systems (AS)"
    ],
    "company": "TCS"
  },
  {
    "id": 63,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is BGP (Border Gateway Protocol)?",
    "tips": "Exterior Gateway Protocol routing traffic across Autonomous Systems on internet.",
    "keywords": [
      "bgp",
      "routing",
      "autonomous system",
      "internet",
      "peering"
    ],
    "ideal_points": [
      "EGP vs IGP",
      "Path Vector protocol",
      "AS numbers & Peering",
      "BGP hijacking"
    ],
    "company": "Google"
  },
  {
    "id": 64,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is ICMP protocol and how do Ping and Traceroute work?",
    "tips": "ICMP delivers network error messages. Ping uses Echo Request/Reply. Traceroute increments TTL.",
    "keywords": [
      "icmp",
      "ping",
      "traceroute",
      "ttl",
      "echo request"
    ],
    "ideal_points": [
      "ICMP message types",
      "Ping echo & reply",
      "Traceroute TTL expiration trick",
      "Network troubleshooting"
    ],
    "company": "Amazon"
  },
  {
    "id": 65,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Flow Control vs Congestion Control in TCP.",
    "tips": "Flow control prevents sender from overwhelming receiver. Congestion control prevents network overload.",
    "keywords": [
      "flow control",
      "congestion control",
      "sliding window",
      "slow start",
      "congestion window"
    ],
    "ideal_points": [
      "Sliding Window protocol (rwnd)",
      "Slow Start & Congestion Avoidance (cwnd)",
      "Fast Retransmit & Fast Recovery",
      "TCP Tahoe/Reno"
    ],
    "company": "Microsoft"
  },
  {
    "id": 66,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Socket Programming? Explain TCP Socket lifecycle (socket, bind, listen, accept).",
    "tips": "Socket is endpoint for communication. Server lifecycle steps.",
    "keywords": [
      "socket",
      "bind",
      "listen",
      "accept",
      "connect",
      "port"
    ],
    "ideal_points": [
      "Socket creation",
      "Bind to IP & Port",
      "Listen queue",
      "Accept blocking connection"
    ],
    "company": "Meta"
  },
  {
    "id": 67,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is a Subnet Mask and Subnetting?",
    "tips": "Splits network into smaller sub-networks using bitwise AND operation.",
    "keywords": [
      "subnet",
      "subnet mask",
      "network id",
      "host id",
      "bitwise"
    ],
    "ideal_points": [
      "Network ID vs Host ID",
      "Default subnet masks (Class A, B, C)",
      "CIDR calculation",
      "Usable hosts per subnet"
    ],
    "company": "Uber"
  },
  {
    "id": 68,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain CORS (Cross-Origin Resource Sharing) and Preflight Requests.",
    "tips": "Browser security mechanism controlling cross-origin HTTP requests.",
    "keywords": [
      "cors",
      "preflight",
      "options",
      "header",
      "origin",
      "browser"
    ],
    "ideal_points": [
      "Same-Origin Policy (SOP)",
      "Preflight OPTIONS request",
      "Access-Control-Allow-Origin header",
      "Credentials and Cookies"
    ],
    "company": "Oracle"
  },
  {
    "id": 69,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is a Reverse Proxy vs Forward Proxy?",
    "tips": "Forward proxy acts on behalf of client; Reverse proxy acts on behalf of server.",
    "keywords": [
      "proxy",
      "forward proxy",
      "reverse proxy",
      "nginx",
      "load balancer"
    ],
    "ideal_points": [
      "Forward proxy for anonymity/filtering",
      "Reverse proxy for load balancing/caching",
      "Nginx/HAProxy examples",
      "SSL termination"
    ],
    "company": "Flipkart"
  },
  {
    "id": 70,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is CDN (Content Delivery Network) and Edge Caching?",
    "tips": "Geographically distributed servers caching static content close to users.",
    "keywords": [
      "cdn",
      "edge server",
      "cache",
      "latency",
      "cloudflare"
    ],
    "ideal_points": [
      "Point of Presence (PoP)",
      "Cache-Control headers",
      "Latency reduction",
      "Origin server offloading"
    ],
    "company": "Infosys"
  },
  {
    "id": 71,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is WebSocket Protocol and how does it differ from HTTP Polling?",
    "tips": "Full-duplex, persistent bidirectional connection over single TCP socket.",
    "keywords": [
      "websocket",
      "polling",
      "realtime",
      "bidirectional",
      "full-duplex"
    ],
    "ideal_points": [
      "HTTP upgrade request",
      "Persistent TCP connection",
      "Full-duplex vs Request/Response",
      "Low overhead per message"
    ],
    "company": "TCS"
  },
  {
    "id": 72,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is VLAN (Virtual Local Area Network) and 802.1Q tagging?",
    "tips": "Logically segments physical switch network into separate broadcast domains.",
    "keywords": [
      "vlan",
      "switch",
      "broadcast domain",
      "trunk",
      "tagging"
    ],
    "ideal_points": [
      "Broadcast domain isolation",
      "Trunking vs Access ports",
      "802.1Q tag header",
      "VLAN security"
    ],
    "company": "Google"
  },
  {
    "id": 73,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Firewall (Packet Filtering vs Stateful Inspection vs Application Level)?",
    "tips": "Monitors and filters network traffic based on security rules.",
    "keywords": [
      "firewall",
      "packet filter",
      "stateful",
      "next-gen",
      "rules"
    ],
    "ideal_points": [
      "Stateless packet filtering",
      "Stateful connection tracking",
      "Application level (WAF)",
      "Inbound vs Outbound rules"
    ],
    "company": "Amazon"
  },
  {
    "id": 74,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain TLS 1.3 vs TLS 1.2 handshake speed improvement.",
    "tips": "TLS 1.3 reduces handshake from 2 RTT to 1 RTT (or 0-RTT resumption).",
    "keywords": [
      "tls 1.3",
      "handshake",
      "rtt",
      "encryption",
      "cipher"
    ],
    "ideal_points": [
      "2-RTT vs 1-RTT latency",
      "Removal of legacy insecure ciphers",
      "0-RTT early data resumption",
      "Forward secrecy"
    ],
    "company": "Microsoft"
  },
  {
    "id": 75,
    "category": "Computer Networks",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is VPN (Virtual Private Network) and Tunneling Protocols (IPsec, OpenVPN, WireGuard)?",
    "tips": "Encrypts and tunnels network traffic across public internet.",
    "keywords": [
      "vpn",
      "tunneling",
      "ipsec",
      "openvpn",
      "wireguard",
      "encryption"
    ],
    "ideal_points": [
      "Tunneling concept",
      "IPsec ESP / AH modes",
      "WireGuard performance benefits",
      "Split tunneling"
    ],
    "company": "Meta"
  },
  {
    "id": 76,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is CI/CD Pipeline and how does it automate testing and deployment?",
    "tips": "Automated build, test, and release workflow on every code push.",
    "keywords": [
      "ci/cd",
      "pipeline",
      "jenkins",
      "github actions",
      "automated test",
      "deploy"
    ],
    "ideal_points": [
      "Continuous Integration push & test",
      "Continuous Delivery / Deployment to production",
      "Build artifacts & Docker images",
      "Pipeline rollback strategies"
    ],
    "company": "Uber"
  },
  {
    "id": 77,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Agile Methodology vs Waterfall Model.",
    "tips": "Agile = iterative, flexible 2-week sprints. Waterfall = sequential linear phases.",
    "keywords": [
      "agile",
      "waterfall",
      "sprint",
      "sdlc",
      "requirements",
      "iterative"
    ],
    "ideal_points": [
      "Sequential vs Iterative SDLC",
      "Flexibility to changing requirements",
      "Sprint planning & Retrospectives",
      "Customer feedback speed"
    ],
    "company": "Oracle"
  },
  {
    "id": 78,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Technical Debt and how do software teams manage it?",
    "tips": "Implied cost of additional rework caused by choosing easy/fast solution now.",
    "keywords": [
      "technical debt",
      "refactoring",
      "code quality",
      "legacy",
      "trade-off"
    ],
    "ideal_points": [
      "Causes of tech debt",
      "Refactoring sprints",
      "Static code analysis tools (SonarQube)",
      "Code smell detection"
    ],
    "company": "Flipkart"
  },
  {
    "id": 79,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Hard",
    "title": "Explain Microservices Architecture vs Monolithic Architecture.",
    "tips": "Monolith = single codebase & deployment unit. Microservices = decoupled autonomous services.",
    "keywords": [
      "microservices",
      "monolith",
      "decoupled",
      "api",
      "docker",
      "scalability"
    ],
    "ideal_points": [
      "Scalability per service",
      "Independent deployment pipelines",
      "Network latency & Distributed complexity",
      "Database per service pattern"
    ],
    "company": "Infosys"
  },
  {
    "id": 80,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Microservices API Gateway pattern?",
    "tips": "Single entry point for clients that routes, authenticates, and rate-limits API requests.",
    "keywords": [
      "api gateway",
      "microservices",
      "routing",
      "authentication",
      "rate limit"
    ],
    "ideal_points": [
      "Centralized routing",
      "Authentication & Authorization offloading",
      "Protocol translation",
      "Rate limiting & Throttling"
    ],
    "company": "TCS"
  },
  {
    "id": 81,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Test-Driven Development (TDD) - Red, Green, Refactor?",
    "tips": "Write failing test first (Red), write code to pass (Green), refactor clean (Refactor).",
    "keywords": [
      "tdd",
      "unit test",
      "red green refactor",
      "test driven",
      "coverage"
    ],
    "ideal_points": [
      "Red: Write failing test",
      "Green: Minimal code to pass",
      "Refactor: Clean code without breaking test",
      "Benefits of high test coverage"
    ],
    "company": "Google"
  },
  {
    "id": 82,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "What are Unit Tests, Integration Tests, and End-to-End (E2E) Tests?",
    "tips": "Testing pyramid: Unit (isolated functions), Integration (connected modules), E2E (user flows).",
    "keywords": [
      "unit test",
      "integration test",
      "e2e test",
      "testing pyramid",
      "mock"
    ],
    "ideal_points": [
      "Testing pyramid proportions",
      "Unit tests with Mocks/Stubs",
      "Integration DB/API tests",
      "E2E automation (Cypress/Playwright)"
    ],
    "company": "Amazon"
  },
  {
    "id": 83,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Code Refactoring and Code Smells.",
    "tips": "Restructuring existing code without changing external behavior to improve maintainability.",
    "keywords": [
      "refactoring",
      "code smell",
      "clean code",
      "dry",
      "solid"
    ],
    "ideal_points": [
      "Clean code principles",
      "DRY (Don't Repeat Yourself)",
      "Common smells: Long Method, Large Class, Feature Envy",
      "Automated regression testing"
    ],
    "company": "Microsoft"
  },
  {
    "id": 84,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Domain-Driven Design (DDD)?",
    "tips": "Software design approach focusing on domain model and ubiquitous language.",
    "keywords": [
      "ddd",
      "domain driven design",
      "bounded context",
      "aggregate",
      "entity"
    ],
    "ideal_points": [
      "Ubiquitous language",
      "Bounded contexts",
      "Entities vs Value objects",
      "Aggregates & Repositories"
    ],
    "company": "Meta"
  },
  {
    "id": 85,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Semantic Versioning (SemVer: MAJOR.MINOR.PATCH).",
    "tips": "MAJOR = breaking changes, MINOR = backwards-compatible features, PATCH = bug fixes.",
    "keywords": [
      "semver",
      "versioning",
      "major",
      "minor",
      "patch",
      "breaking change"
    ],
    "ideal_points": [
      "MAJOR: Breaking API changes",
      "MINOR: New backward-compatible feature",
      "PATCH: Backward-compatible bug fix",
      "Package manager resolution (^ vs ~)"
    ],
    "company": "Uber"
  },
  {
    "id": 86,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Feature Flag / Feature Toggle pattern?",
    "tips": "Decouples code deployment from feature release using conditional configuration flags.",
    "keywords": [
      "feature flag",
      "canary release",
      "decoupling",
      "deployment",
      "toggle"
    ],
    "ideal_points": [
      "Trunk-based development enablement",
      "Canary testing in production",
      "Instant kill-switch / rollback",
      "Gradual user rollout"
    ],
    "company": "Oracle"
  },
  {
    "id": 87,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain DevOps Culture, Infrastructure as Code (IaC), and Terraform.",
    "tips": "DevOps unites Dev and Ops. IaC manages infrastructure via versioned configuration files.",
    "keywords": [
      "devops",
      "iac",
      "terraform",
      "infrastructure",
      "automation",
      "ansible"
    ],
    "ideal_points": [
      "DevOps culture shift",
      "Declarative vs Imperative IaC",
      "Terraform state management",
      "Immutability of infrastructure"
    ],
    "company": "Flipkart"
  },
  {
    "id": 88,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Twelve-Factor App Methodology?",
    "tips": "Best practices for building modern, scalable, cloud-native SaaS applications.",
    "keywords": [
      "twelve-factor",
      "cloud-native",
      "config",
      "stateless",
      "environment"
    ],
    "ideal_points": [
      "I. Codebase, II. Dependencies, III. Config in env",
      "VI. Stateless processes",
      "IX. Disposability & Fast startup",
      "XI. Logs as event streams"
    ],
    "company": "Infosys"
  },
  {
    "id": 89,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Blue-Green Deployment vs Canary Deployment?",
    "tips": "Blue-Green = instant switch between two identical environments. Canary = gradual % traffic shift.",
    "keywords": [
      "blue-green",
      "canary",
      "deployment",
      "zero-downtime",
      "rollback"
    ],
    "ideal_points": [
      "Blue-Green 100% environment switch",
      "Canary 5% -> 25% -> 100% traffic shift",
      "Zero-downtime deployment",
      "Automatic rollback on error spike"
    ],
    "company": "TCS"
  },
  {
    "id": 90,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Log Aggregation and Observability (Metrics, Logs, Traces)?",
    "tips": "3 Pillars of Observability: Metrics (stats), Logs (events), Traces (request flow across services).",
    "keywords": [
      "observability",
      "metrics",
      "logs",
      "traces",
      "prometheus",
      "grafana",
      "jaeger"
    ],
    "ideal_points": [
      "Pillar 1: Metrics (Prometheus)",
      "Pillar 2: Logs (ELK stack)",
      "Pillar 3: Distributed Tracing (Jaeger/OpenTelemetry)",
      "APM dashboards"
    ],
    "company": "Google"
  },
  {
    "id": 91,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Hard",
    "title": "Explain Event-Driven Architecture (EDA) and Message Queues.",
    "tips": "Services communicate asynchronously by publishing and consuming event messages.",
    "keywords": [
      "event-driven",
      "kafka",
      "rabbitmq",
      "pub/sub",
      "async",
      "decoupled"
    ],
    "ideal_points": [
      "Publish-Subscribe pattern",
      "Asynchronous non-blocking processing",
      "At-least-once delivery",
      "Dead Letter Queues (DLQ)"
    ],
    "company": "Amazon"
  },
  {
    "id": 92,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Circuit Breaker pattern in Distributed Systems?",
    "tips": "Prevents cascading failures by stopping calls to failing remote services (Closed, Open, Half-Open).",
    "keywords": [
      "circuit breaker",
      "resilience",
      "fallback",
      "cascade",
      "resilience4j"
    ],
    "ideal_points": [
      "Closed state (normal)",
      "Open state (fast fail)",
      "Half-Open state (probe recovery)",
      "Fallback responses"
    ],
    "company": "Microsoft"
  },
  {
    "id": 93,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is CQRS (Command Query Responsibility Segregation)?",
    "tips": "Separates read data store operations from write data store operations.",
    "keywords": [
      "cqrs",
      "event sourcing",
      "read model",
      "write model",
      "scalability"
    ],
    "ideal_points": [
      "Command side (mutations)",
      "Query side (optimized reads)",
      "Eventual consistency between stores",
      "Scaling reads independently"
    ],
    "company": "Meta"
  },
  {
    "id": 94,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Event Sourcing pattern?",
    "tips": "State of entity is persisted as sequence of state-changing event logs.",
    "keywords": [
      "event sourcing",
      "event log",
      "audit trail",
      "replay",
      "cqrs"
    ],
    "ideal_points": [
      "Append-only event store",
      "Replaying events to rebuild state",
      "Complete audit trail",
      "Snapshotting for performance"
    ],
    "company": "Uber"
  },
  {
    "id": 95,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Hard",
    "title": "Explain Serverless Architecture and Function-as-a-Service (FaaS).",
    "tips": "Cloud provider manages infrastructure; code executes in ephemeral containers on-demand.",
    "keywords": [
      "serverless",
      "lambda",
      "faas",
      "cold start",
      "auto-scale"
    ],
    "ideal_points": [
      "Zero server maintenance",
      "Pay-per-execution pricing",
      "Cold start latency issue",
      "Stateless execution constraint"
    ],
    "company": "Oracle"
  },
  {
    "id": 96,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Technical Debt Ratio and Static Code Analysis?",
    "tips": "Tools like SonarQube analyze source code for bugs, vulnerabilities, and code smells automatically.",
    "keywords": [
      "sonarqube",
      "static analysis",
      "code smell",
      "vulnerability",
      "lint"
    ],
    "ideal_points": [
      "Automated code review in CI",
      "Cyclomatic complexity metric",
      "Security vulnerability detection",
      "Quality gates for PR merge"
    ],
    "company": "Flipkart"
  },
  {
    "id": 97,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Chaos Engineering and Netflix Chaos Monkey?",
    "tips": "Intentionally injecting failures into production systems to test resilience.",
    "keywords": [
      "chaos engineering",
      "chaos monkey",
      "resilience",
      "fault tolerance"
    ],
    "ideal_points": [
      "Hypothesize steady state",
      "Inject realistic failures (node kill, latency)",
      "Verify system self-healing",
      "Confidence in production resilience"
    ],
    "company": "Infosys"
  },
  {
    "id": 98,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Hard",
    "title": "Explain Software Documentation Best Practices (Swagger/OpenAPI, Architecture Decision Records).",
    "tips": "Clear API specs and ADR logs capturing architectural design decisions.",
    "keywords": [
      "swagger",
      "openapi",
      "adr",
      "documentation",
      "readme"
    ],
    "ideal_points": [
      "OpenAPI / Swagger auto-docs",
      "Architecture Decision Records (ADR)",
      "Code comments vs self-documenting code",
      "Up-to-date README guides"
    ],
    "company": "TCS"
  },
  {
    "id": 99,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is Code Coverage and Mutational Testing?",
    "tips": "Code coverage measures % lines executed by tests. Mutation testing modifies code to test the tests.",
    "keywords": [
      "code coverage",
      "mutation testing",
      "unit test",
      "quality"
    ],
    "ideal_points": [
      "Line vs Branch coverage",
      "100% coverage myth",
      "Mutation testing (killing mutants)",
      "Quality of test assertions"
    ],
    "company": "Google"
  },
  {
    "id": 100,
    "category": "Software Eng",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Database Migration Tools (Flyway, Liquibase, Alembic).",
    "tips": "Version-controlled SQL schema migration scripts applied sequentially.",
    "keywords": [
      "migration",
      "alembic",
      "flyway",
      "schema",
      "version control"
    ],
    "ideal_points": [
      "Versioned migration scripts (up/down)",
      "Database schema evolution",
      "CI/CD integration for automated migrations",
      "Locking schema during migration"
    ],
    "company": "Amazon"
  },
  {
    "id": 101,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "Difference between Git Merge and Git Rebase.",
    "tips": "Merge keeps full history with 3-way commit; Rebase rewrites commits linearly.",
    "keywords": [
      "git",
      "merge",
      "rebase",
      "linear history",
      "conflict"
    ],
    "ideal_points": [
      "Merge commit creation",
      "Linear rebase history",
      "Golden rule: don't rebase public main",
      "Interactive rebase (squash)"
    ],
    "company": "Microsoft"
  },
  {
    "id": 102,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Medium",
    "title": "How to resolve Merge Conflicts step-by-step?",
    "tips": "git status -> locate markers <<<<<<< -> edit -> git add -> git commit.",
    "keywords": [
      "merge conflict",
      "git status",
      "git add",
      "git commit",
      "markers"
    ],
    "ideal_points": [
      "Locate conflict markers",
      "Understand HEAD vs incoming",
      "Manual resolution & test",
      "Complete merge commit"
    ],
    "company": "Meta"
  },
  {
    "id": 103,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git Stash and when do you use it?",
    "tips": "Temporarily shelves dirty working directory changes without committing.",
    "keywords": [
      "git stash",
      "stash pop",
      "stash list",
      "working directory"
    ],
    "ideal_points": [
      "git stash save",
      "git stash pop vs apply",
      "Stashing untracked files (-u)",
      "Context switching scenario"
    ],
    "company": "Uber"
  },
  {
    "id": 104,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git Reset (Soft, Mixed, Hard)?",
    "tips": "Soft = keeps changes staged; Mixed = unstages changes; Hard = discards working changes completely.",
    "keywords": [
      "git reset",
      "soft",
      "mixed",
      "hard",
      "commit"
    ],
    "ideal_points": [
      "Soft: HEAD moves, index stays",
      "Mixed: HEAD & index move, working stays",
      "Hard: HEAD, index, working wiped",
      "Recovering via reflog"
    ],
    "company": "Oracle"
  },
  {
    "id": 105,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git Reflog and how does it rescue lost commits?",
    "tips": "Reference log tracking every HEAD change in local repository.",
    "keywords": [
      "git reflog",
      "reflog",
      "recover",
      "lost commit",
      "detached head"
    ],
    "ideal_points": [
      "Tracks every HEAD movement",
      "Recovers hard-reset commits",
      "Recovers deleted branches",
      "Local-only security net"
    ],
    "company": "Flipkart"
  },
  {
    "id": 106,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git Cherry-Pick?",
    "tips": "Applies changes introduced by specific existing commits onto current HEAD branch.",
    "keywords": [
      "cherry-pick",
      "git cherry-pick",
      "commit",
      "hotfix",
      "branch"
    ],
    "ideal_points": [
      "Copying specific commit",
      "Hotfix backporting scenario",
      "Handling cherry-pick conflicts",
      "Avoid duplicating commits"
    ],
    "company": "Infosys"
  },
  {
    "id": 107,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Medium",
    "title": "Explain Git Branching Strategies: GitFlow vs GitHub Flow vs Trunk-Based.",
    "tips": "GitFlow = feature/release/hotfix branches. GitHub Flow = simple feature/main. Trunk-Based = short-lived branches onto main.",
    "keywords": [
      "gitflow",
      "github flow",
      "trunk-based",
      "branching strategy",
      "pull request"
    ],
    "ideal_points": [
      "GitFlow complex releases",
      "GitHub Flow PR deployment",
      "Trunk-Based rapid delivery",
      "Feature flags role"
    ],
    "company": "TCS"
  },
  {
    "id": 108,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git Squashing (git rebase -i)?",
    "tips": "Combines multiple small WIP commits into single clean commit before merging PR.",
    "keywords": [
      "squash",
      "interactive rebase",
      "commit history",
      "clean history"
    ],
    "ideal_points": [
      "Interactive rebase `rebase -i`",
      "Combining WIP commits",
      "Writing clean commit messages",
      "PR review etiquette"
    ],
    "company": "Google"
  },
  {
    "id": 109,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is `.gitignore` file and how to un-track a committed file?",
    "tips": "Specifies intentionally untracked files. Un-track using `git rm --cached`.",
    "keywords": [
      "gitignore",
      "git rm --cached",
      "untrack",
      "environment"
    ],
    "ideal_points": [
      "Syntax rules (*.log, .env)",
      "git rm --cached <file>",
      "Ignoring already committed files",
      "Global gitignore"
    ],
    "company": "Amazon"
  },
  {
    "id": 110,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git Hooks (pre-commit, pre-push, Husky)?",
    "tips": "Scripts that run automatically before or after Git commands.",
    "keywords": [
      "git hooks",
      "pre-commit",
      "husky",
      "linter",
      "automation"
    ],
    "ideal_points": [
      "Pre-commit linting & formatting",
      "Pre-push test execution",
      "Husky setup in Node.js",
      "Bypassing hooks (--no-verify)"
    ],
    "company": "Microsoft"
  },
  {
    "id": 111,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Medium",
    "title": "Explain HEAD, Working Tree, Index (Staging Area), and Local Repository.",
    "tips": "Git's 3-tree architecture + HEAD pointer.",
    "keywords": [
      "head",
      "working tree",
      "index",
      "staging area",
      "repository"
    ],
    "ideal_points": [
      "Working tree (untracked/modified)",
      "Index / Staging (git add)",
      "Local repo (git commit)",
      "HEAD pointer to current commit"
    ],
    "company": "Meta"
  },
  {
    "id": 112,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is a Detached HEAD state in Git?",
    "tips": "HEAD points directly to a commit hash instead of a branch name.",
    "keywords": [
      "detached head",
      "git checkout commit",
      "head",
      "branch"
    ],
    "ideal_points": [
      "Causes: checking out commit hash",
      "Experimental work safety",
      "Creating branch from detached HEAD",
      "Losing commits on checkout"
    ],
    "company": "Uber"
  },
  {
    "id": 113,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git Submodule vs Git Subtree?",
    "tips": "Submodule links external repo commit hash; Subtree embeds code directly inside repo.",
    "keywords": [
      "submodule",
      "subtree",
      "dependency",
      "external repo"
    ],
    "ideal_points": [
      "Submodule pointer to commit",
      "git submodule update --init",
      "Subtree nested code storage",
      "Pros and Cons of each"
    ],
    "company": "Oracle"
  },
  {
    "id": 114,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Medium",
    "title": "Explain `git fetch` vs `git pull`.",
    "tips": "git fetch downloads remote changes without merging; git pull = git fetch + git merge.",
    "keywords": [
      "git fetch",
      "git pull",
      "remote",
      "origin/main",
      "merge"
    ],
    "ideal_points": [
      "Fetch updates remote tracking branches",
      "Pull immediately merges/rebases",
      "Inspecting fetched changes first",
      "Safe workflow with fetch"
    ],
    "company": "Flipkart"
  },
  {
    "id": 115,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is `git bisect` and how does it debug regression bugs?",
    "tips": "Uses binary search through commit history to find exact commit that introduced a bug.",
    "keywords": [
      "git bisect",
      "binary search",
      "bug",
      "regression",
      "debug"
    ],
    "ideal_points": [
      "Bisect start, good, bad",
      "Automated bisect testing script",
      "O(log N) commit search speed",
      "Ending with bisect reset"
    ],
    "company": "Infosys"
  },
  {
    "id": 116,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is `git blame`?",
    "tips": "Displays author, timestamp, and commit details line-by-line for a file.",
    "keywords": [
      "git blame",
      "author",
      "line history",
      "vscode extension"
    ],
    "ideal_points": [
      "Line-by-line author tracking",
      "Finding origin of code change",
      "Ignoring formatting changes (-w)",
      "Git Lens integration"
    ],
    "company": "TCS"
  },
  {
    "id": 117,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Medium",
    "title": "Explain `git commit --amend`.",
    "tips": "Modifies the most recent commit (updates message or adds staged files).",
    "keywords": [
      "git commit --amend",
      "commit message",
      "staging",
      "force push"
    ],
    "ideal_points": [
      "Updating latest commit message",
      "Adding forgotten staged files",
      "Rewriting history warning",
      "Force push required if pushed"
    ],
    "company": "Google"
  },
  {
    "id": 118,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git Origin and Remote?",
    "tips": "Remote is server URL (GitHub); Origin is default shorthand name for primary remote.",
    "keywords": [
      "origin",
      "remote",
      "git remote -v",
      "upstream"
    ],
    "ideal_points": [
      "git remote add origin <url>",
      "Upstream remote vs origin remote",
      "Fork & Pull Request workflow",
      "Fetching multiple remotes"
    ],
    "company": "Amazon"
  },
  {
    "id": 119,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Medium",
    "title": "Explain `git clean` command.",
    "tips": "Removes untracked files from working directory.",
    "keywords": [
      "git clean",
      "untracked files",
      "force",
      "directory"
    ],
    "ideal_points": [
      "git clean -f (force)",
      "git clean -fd (directories)",
      "git clean -n (dry run preview)",
      "Removing ignored files (-x)"
    ],
    "company": "Microsoft"
  },
  {
    "id": 120,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git LFS (Large File Storage)?",
    "tips": "Replaces large audio/video/binary files with text pointers inside Git, storing actual files on remote server.",
    "keywords": [
      "git lfs",
      "large files",
      "pointer",
      "binary",
      "media"
    ],
    "ideal_points": [
      "Git repo size bloat issue",
      "Pointer text file replacement",
      "Tracking binary extensions (*.psd, *.zip)",
      "Bandwidth & storage quotas"
    ],
    "company": "Meta"
  },
  {
    "id": 121,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is `git log --graph --oneline --all`?",
    "tips": "Displays visual ASCII graph of commit history across all branches.",
    "keywords": [
      "git log",
      "graph",
      "oneline",
      "visualization",
      "alias"
    ],
    "ideal_points": [
      "Linear vs branched history tree",
      "Oneline SHA and commit messages",
      "Configuring custom Git aliases",
      "Graph branch visualization"
    ],
    "company": "Uber"
  },
  {
    "id": 122,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Medium",
    "title": "Explain `git tag` (Lightweight vs Annotated).",
    "tips": "Points to specific point in Git history, used for release versions (v1.0.0).",
    "keywords": [
      "git tag",
      "annotated tag",
      "release",
      "semver",
      "version"
    ],
    "ideal_points": [
      "Lightweight = simple commit pointer",
      "Annotated = full object with message, GPG signature",
      "git push origin --tags",
      "Release notes on GitHub"
    ],
    "company": "Oracle"
  },
  {
    "id": 123,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Git Worktree?",
    "tips": "Allows checking out multiple branches simultaneously into separate directories from single repo.",
    "keywords": [
      "git worktree",
      "multiple branches",
      "directory",
      "context switch"
    ],
    "ideal_points": [
      "Checkout multiple branches at once",
      "No stashing needed for quick bugfix",
      "Shared `.git` objects storage",
      "git worktree add / remove"
    ],
    "company": "Flipkart"
  },
  {
    "id": 124,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Easy",
    "title": "What is Signed Commit (GPG Signature in Git)?",
    "tips": "Cryptographically verifies identity of commit author using GPG keys.",
    "keywords": [
      "gpg",
      "signed commit",
      "verified",
      "security",
      "signature"
    ],
    "ideal_points": [
      "Cryptographic author verification",
      "Preventing git author spoofing",
      "Verified badge on GitHub",
      "git commit -S"
    ],
    "company": "Infosys"
  },
  {
    "id": 125,
    "category": "Git",
    "role": "DevOps Engineer",
    "difficulty": "Medium",
    "title": "How to change remote repository URL in Git?",
    "tips": "`git remote set-url origin <new_url>`.",
    "keywords": [
      "git remote set-url",
      "origin",
      "url",
      "repository"
    ],
    "ideal_points": [
      "git remote set-url origin <url>",
      "Verifying with git remote -v",
      "HTTPS to SSH migration",
      "Updating broken remote links"
    ],
    "company": "TCS"
  },
  {
    "id": 126,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "Difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN.",
    "tips": "INNER = match both; LEFT = all left + matched right; RIGHT = all right + matched left; FULL = all both.",
    "keywords": [
      "join",
      "inner join",
      "left join",
      "right join",
      "full outer join"
    ],
    "ideal_points": [
      "INNER intersection",
      "LEFT table priority",
      "RIGHT table priority",
      "FULL UNION with NULLs"
    ],
    "company": "Google"
  },
  {
    "id": 127,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "What are SQL Window Functions (ROW_NUMBER, RANK, DENSE_RANK, OVER)?",
    "tips": "Performs calculations across set of rows related to current row without collapsing rows.",
    "keywords": [
      "window function",
      "over",
      "partition by",
      "row_number",
      "rank",
      "dense_rank"
    ],
    "ideal_points": [
      "OVER (PARTITION BY ... ORDER BY ...)",
      "RANK gap vs DENSE_RANK no gap",
      "Top N per category pattern",
      "SUM() OVER running total"
    ],
    "company": "Amazon"
  },
  {
    "id": 128,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is the difference between WHERE and HAVING clause?",
    "tips": "WHERE filters rows before aggregation; HAVING filters aggregated groups after GROUP BY.",
    "keywords": [
      "where",
      "having",
      "group by",
      "aggregate",
      "filter"
    ],
    "ideal_points": [
      "WHERE applies to individual rows",
      "HAVING applies to aggregated groups",
      "Aggregate functions in HAVING",
      "Execution order: WHERE -> GROUP BY -> HAVING"
    ],
    "company": "Microsoft"
  },
  {
    "id": 129,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain SQL Execution Order of a SELECT Query.",
    "tips": "FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.",
    "keywords": [
      "execution order",
      "select",
      "from",
      "where",
      "group by",
      "having",
      "order by"
    ],
    "ideal_points": [
      "FROM & JOIN first",
      "WHERE filtering second",
      "GROUP BY & HAVING aggregation",
      "SELECT & ORDER BY last"
    ],
    "company": "Meta"
  },
  {
    "id": 130,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is a CTE (Common Table Expression) and `WITH` clause?",
    "tips": "Temporary named result set defined within execution scope of single SELECT statement.",
    "keywords": [
      "cte",
      "common table expression",
      "with",
      "recursive",
      "subquery"
    ],
    "ideal_points": [
      "WITH cte_name AS (...) syntax",
      "Readability over nested subqueries",
      "Recursive CTE for hierarchy trees",
      "Performance vs Temp Tables"
    ],
    "company": "Uber"
  },
  {
    "id": 131,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "Difference between UNION and UNION ALL.",
    "tips": "UNION removes duplicate rows (requires sorting/hashing); UNION ALL includes all duplicates (faster).",
    "keywords": [
      "union",
      "union all",
      "duplicates",
      "performance",
      "set operator"
    ],
    "ideal_points": [
      "Duplicate elimination in UNION",
      "UNION ALL performance speed",
      "Matching column counts & types",
      "Set operation theory"
    ],
    "company": "Oracle"
  },
  {
    "id": 132,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "What are SQL Constraints (PRIMARY KEY, UNIQUE, FOREIGN KEY, CHECK, NOT NULL)?",
    "tips": "Rules enforced on data columns to maintain data integrity.",
    "keywords": [
      "constraint",
      "primary key",
      "unique",
      "foreign key",
      "check",
      "not null"
    ],
    "ideal_points": [
      "Primary key = Unique + Not Null",
      "Unique allows one NULL",
      "Foreign Key referential integrity",
      "CHECK custom validation expression"
    ],
    "company": "Flipkart"
  },
  {
    "id": 133,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is the difference between TRUNCATE, DELETE, and DROP?",
    "tips": "DELETE = DML row-by-row (can rollback); TRUNCATE = DDL reclaims pages (faster); DROP = removes table structure.",
    "keywords": [
      "truncate",
      "delete",
      "drop",
      "dml",
      "ddl",
      "rollback"
    ],
    "ideal_points": [
      "DELETE logs individual row deletions",
      "TRUNCATE resets identity & reclaims space",
      "DROP removes table definition",
      "Transaction rollback compatibility"
    ],
    "company": "Infosys"
  },
  {
    "id": 134,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain Correlated Subquery vs Non-Correlated Subquery.",
    "tips": "Correlated subquery evaluates once for EACH row processed by outer query.",
    "keywords": [
      "correlated subquery",
      "subquery",
      "outer query",
      "exists",
      "performance"
    ],
    "ideal_points": [
      "Outer query reference in subquery",
      "Row-by-row subquery execution",
      "EXISTS vs IN performance",
      "Converting to JOIN for speed"
    ],
    "company": "TCS"
  },
  {
    "id": 135,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Indexing in SQL and what are Clustered vs Non-Clustered Indexes?",
    "tips": "B-Tree structure to locate rows quickly.",
    "keywords": [
      "index",
      "clustered",
      "non-clustered",
      "b-tree",
      "performance"
    ],
    "ideal_points": [
      "Clustered = physical row ordering",
      "Non-clustered = index lookup table",
      "Composite index column ordering",
      "Indexing write penalty"
    ],
    "company": "Google"
  },
  {
    "id": 136,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is a Self JOIN and when do you use it?",
    "tips": "Regular join in which a table is joined with itself (useful for hierarchical/manager data).",
    "keywords": [
      "self join",
      "hierarchy",
      "manager",
      "parent child",
      "alias"
    ],
    "ideal_points": [
      "Aliasing same table twice",
      "Employee-Manager relationship example",
      "Finding duplicate records",
      "Hierarchical tree querying"
    ],
    "company": "Amazon"
  },
  {
    "id": 137,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain GROUP BY and Aggregate Functions (COUNT, SUM, AVG, MIN, MAX).",
    "tips": "Groups rows that have same values into summary rows.",
    "keywords": [
      "group by",
      "aggregate",
      "count",
      "sum",
      "avg",
      "min",
      "max"
    ],
    "ideal_points": [
      "Group collapse mechanism",
      "Combining with aggregate functions",
      "SELECT columns must be in GROUP BY",
      "Handling NULL values in aggregates"
    ],
    "company": "Microsoft"
  },
  {
    "id": 138,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is COALESCE and NULLIF functions in SQL?",
    "tips": "COALESCE returns first non-null argument. NULLIF returns NULL if two arguments are equal.",
    "keywords": [
      "coalesce",
      "nullif",
      "null",
      "fallback",
      "divide by zero"
    ],
    "ideal_points": [
      "COALESCE(col1, col2, default)",
      "NULLIF(col, 0) to prevent division by zero",
      "Handling missing data in queries",
      "IFNULL / ISNULL equivalents"
    ],
    "company": "Meta"
  },
  {
    "id": 139,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is CASE WHEN THEN ELSE END expression?",
    "tips": "Conditional logic statement inside SQL queries.",
    "keywords": [
      "case",
      "when",
      "then",
      "else",
      "conditional"
    ],
    "ideal_points": [
      "Searched CASE vs Simple CASE",
      "Categorizing data dynamically",
      "Pivoting rows into columns",
      "Using CASE inside aggregate functions"
    ],
    "company": "Uber"
  },
  {
    "id": 140,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain Database Transactions: COMMIT, ROLLBACK, SAVEPOINT.",
    "tips": "Group of SQL operations executed as atomic unit.",
    "keywords": [
      "transaction",
      "commit",
      "rollback",
      "savepoint",
      "begin transaction"
    ],
    "ideal_points": [
      "BEGIN / START TRANSACTION",
      "COMMIT persists changes",
      "ROLLBACK reverts changes",
      "SAVEPOINT partial rollback point"
    ],
    "company": "Oracle"
  },
  {
    "id": 141,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is SQL Injection (SQLi) and how do Parameterized Queries prevent it?",
    "tips": "Attacker injects malicious SQL via user input. Parameterized queries separate code from data.",
    "keywords": [
      "sql injection",
      "sqli",
      "parameterized query",
      "prepared statement",
      "sanitization"
    ],
    "ideal_points": [
      "Malicious string input OR 1=1",
      "Prepared statements parameter binding",
      "Raw SQL risks in ORMs",
      "Sanitization & Escaping"
    ],
    "company": "Flipkart"
  },
  {
    "id": 142,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is the difference between CHAR, VARCHAR, and TEXT data types?",
    "tips": "CHAR = fixed length (padded); VARCHAR = variable length with limit; TEXT = variable length large object.",
    "keywords": [
      "char",
      "varchar",
      "text",
      "data type",
      "storage"
    ],
    "ideal_points": [
      "Fixed padding in CHAR",
      "Length byte overhead in VARCHAR",
      "Off-page storage for TEXT",
      "Performance considerations"
    ],
    "company": "Infosys"
  },
  {
    "id": 143,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Deadlock in SQL and how to resolve it?",
    "tips": "Two transactions wait on locks held by each other.",
    "keywords": [
      "deadlock",
      "lock",
      "transaction",
      "error 1205",
      "resolution"
    ],
    "ideal_points": [
      "Deadlock detection engine",
      "Automatic victim transaction rollback",
      "Consistent lock ordering best practice",
      "Short transaction durations"
    ],
    "company": "TCS"
  },
  {
    "id": 144,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is EXPLAIN and EXPLAIN ANALYZE command?",
    "tips": "Displays execution plan generated by query optimizer.",
    "keywords": [
      "explain",
      "explain analyze",
      "query plan",
      "execution cost",
      "seq scan"
    ],
    "ideal_points": [
      "Reading query execution trees",
      "Sequential scan vs Index scan",
      "Actual time vs Estimated cost",
      "Identifying slow query bottlenecks"
    ],
    "company": "Google"
  },
  {
    "id": 145,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain Stored Procedures vs Functions (UDF) in SQL.",
    "tips": "Function must return value and cannot modify DB state; Stored Procedure can execute DDL/DML.",
    "keywords": [
      "stored procedure",
      "function",
      "udf",
      "return value",
      "side effect"
    ],
    "ideal_points": [
      "Return value requirements",
      "Transaction control inside procedures",
      "Calling function inside SELECT",
      "Compilation & Performance"
    ],
    "company": "Amazon"
  },
  {
    "id": 146,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database View and Materialized View?",
    "tips": "View = dynamic query template; Materialized View = cached physical query table.",
    "keywords": [
      "view",
      "materialized view",
      "cache",
      "refresh",
      "virtual"
    ],
    "ideal_points": [
      "Virtual table definition",
      "Materialized storage on disk",
      "Refresh strategies (COMPLETE/FAST)",
      "Security & Abstraction benefits"
    ],
    "company": "Microsoft"
  },
  {
    "id": 147,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain String Functions in SQL (CONCAT, SUBSTRING, LIKE, REGEXP).",
    "tips": "Functions to manipulate and filter text data.",
    "keywords": [
      "concat",
      "substring",
      "like",
      "wildcard",
      "regex"
    ],
    "ideal_points": [
      "Pattern matching (% and _ wildcards)",
      "String concatenation",
      "SUBSTRING extraction",
      "Case sensitivity (LIKE vs ILIKE)"
    ],
    "company": "Meta"
  },
  {
    "id": 148,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Sharding in Distributed Databases?",
    "tips": "Horizontal partitioning of database table across multiple database servers.",
    "keywords": [
      "sharding",
      "horizontal partitioning",
      "shard key",
      "distributed",
      "scalability"
    ],
    "ideal_points": [
      "Shard key selection strategy",
      "Cross-shard query overhead",
      "Resharding complexity",
      "High-volume horizontal scale"
    ],
    "company": "Uber"
  },
  {
    "id": 149,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Medium",
    "title": "Explain ROW_NUMBER() vs RANK() vs DENSE_RANK().",
    "tips": "ROW_NUMBER = sequential 1,2,3,4. RANK = 1,2,2,4 (gap). DENSE_RANK = 1,2,2,3 (no gap).",
    "keywords": [
      "row_number",
      "rank",
      "dense_rank",
      "tie",
      "window function"
    ],
    "ideal_points": [
      "Handling duplicate values / ties",
      "Rank gap behavior",
      "Top N ranking examples",
      "Partition ordering"
    ],
    "company": "Oracle"
  },
  {
    "id": 150,
    "category": "SQL",
    "role": "Database Engineer",
    "difficulty": "Easy",
    "title": "What is Database Normalization vs Denormalization?",
    "tips": "Normalization reduces redundancy; Denormalization adds controlled redundancy to improve read speed.",
    "keywords": [
      "normalization",
      "denormalization",
      "read performance",
      "redundancy",
      "olap"
    ],
    "ideal_points": [
      "Read vs Write optimization",
      "Joining overhead reduction",
      "Data warehouse design",
      "Data consistency maintenance burden"
    ],
    "company": "Flipkart"
  },
  {
    "id": 151,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Binary Search Algorithm (Time & Space Complexity).",
    "tips": "Divide and conquer on sorted array. O(log N) time, O(1) space iterative.",
    "keywords": [
      "binary search",
      "log n",
      "sorted",
      "divide and conquer",
      "pointer"
    ],
    "ideal_points": [
      "Prerequisite: sorted array",
      "Middle index comparison",
      "O(log N) time complexity",
      "Iterative vs recursive space"
    ],
    "company": "Infosys"
  },
  {
    "id": 152,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Two Sum Problem: How to solve in O(N) time complexity?",
    "tips": "Use HashMap to store complement (target - current) as you iterate.",
    "keywords": [
      "two sum",
      "hashmap",
      "dictionary",
      "complement",
      "o(n)"
    ],
    "ideal_points": [
      "Brute force O(N^2)",
      "HashMap O(N) time & O(N) space",
      "Single pass iteration",
      "Index mapping"
    ],
    "company": "TCS"
  },
  {
    "id": 153,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Reverse a Linked List (Iterative & Recursive).",
    "tips": "Iterative uses 3 pointers: prev, current, next. Reverse pointers step by step.",
    "keywords": [
      "linked list",
      "reverse",
      "pointer",
      "prev",
      "current",
      "next"
    ],
    "ideal_points": [
      "3 pointer approach (prev, curr, next)",
      "Loop condition curr != null",
      "Recursive base case & stack",
      "Time O(N), Space O(1)"
    ],
    "company": "Google"
  },
  {
    "id": 154,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Detect Cycle in Linked List (Floyd's Tortoise and Hare).",
    "tips": "Slow pointer moves 1 step; fast pointer moves 2 steps. If they meet, cycle exists.",
    "keywords": [
      "cycle",
      "floyd",
      "tortoise hare",
      "fast slow",
      "linked list"
    ],
    "ideal_points": [
      "Slow and Fast pointers",
      "Proof of convergence in cycle",
      "Finding entry point of cycle",
      "O(N) time, O(1) space"
    ],
    "company": "Amazon"
  },
  {
    "id": 155,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Stack vs Queue Data Structures (LIFO vs FIFO).",
    "tips": "Stack = Last In First Out; Queue = First In First Out.",
    "keywords": [
      "stack",
      "queue",
      "lifo",
      "fifo",
      "push",
      "pop",
      "enqueue",
      "dequeue"
    ],
    "ideal_points": [
      "LIFO vs FIFO principle",
      "Stack push/pop O(1)",
      "Queue enqueue/dequeue O(1)",
      "Applications (Call stack vs Job queue)"
    ],
    "company": "Microsoft"
  },
  {
    "id": 156,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Valid Parentheses Problem using Stack.",
    "tips": "Push open brackets onto stack. On close bracket, pop and check matching pair.",
    "keywords": [
      "stack",
      "parentheses",
      "matching",
      "expression",
      "pop"
    ],
    "ideal_points": [
      "Stack for nested balance",
      "Open bracket push",
      "Close bracket pop & match",
      "Empty stack final check"
    ],
    "company": "Meta"
  },
  {
    "id": 157,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Implement Queue using Stacks.",
    "tips": "Use two stacks (input & output). Transfer elements when output stack is empty.",
    "keywords": [
      "queue",
      "stack",
      "amortized",
      "push",
      "pop"
    ],
    "ideal_points": [
      "Two stack approach",
      "Amortized O(1) dequeue time",
      "Transfer step logic",
      "Space complexity O(N)"
    ],
    "company": "Uber"
  },
  {
    "id": 158,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain HashMap / HashTable Internal Working & Collision Resolution.",
    "tips": "Array of buckets + Hash function. Collisions handled via Chaining or Open Addressing.",
    "keywords": [
      "hashmap",
      "hashtable",
      "hash function",
      "collision",
      "chaining",
      "bucket"
    ],
    "ideal_points": [
      "Hash function mapping key to index",
      "Separate chaining (LinkedList/Tree)",
      "Open addressing (Linear probing)",
      "Load factor & Resizing"
    ],
    "company": "Oracle"
  },
  {
    "id": 159,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Binary Tree Traversal (Inorder, Preorder, Postorder, Level-Order).",
    "tips": "Inorder = L-Root-R; Preorder = Root-L-R; Postorder = L-R-Root; Level-order = BFS Queue.",
    "keywords": [
      "binary tree",
      "traversal",
      "inorder",
      "preorder",
      "postorder",
      "bfs",
      "queue"
    ],
    "ideal_points": [
      "Inorder gives sorted order for BST",
      "Preorder for cloning tree",
      "Postorder for deleting tree",
      "Level order using Queue (BFS)"
    ],
    "company": "Flipkart"
  },
  {
    "id": 160,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Binary Search Tree (BST) Properties & Operations.",
    "tips": "Left subtree < Root < Right subtree. Search, Insert, Delete in O(h) time.",
    "keywords": [
      "bst",
      "binary search tree",
      "left",
      "right",
      "inorder",
      "height"
    ],
    "ideal_points": [
      "BST ordering property",
      "Search & Insert logic",
      "Delete 3 cases (leaf, 1 child, 2 children)",
      "Balanced BST (AVL/Red-Black) O(log N)"
    ],
    "company": "Infosys"
  },
  {
    "id": 161,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Lowest Common Ancestor (LCA) in Binary Tree.",
    "tips": "Find node where p and q diverge in left and right subtrees.",
    "keywords": [
      "lca",
      "lowest common ancestor",
      "binary tree",
      "recursion"
    ],
    "ideal_points": [
      "Recursive base case",
      "Left and Right subtree recursion",
      "Return non-null child node",
      "O(N) time complexity"
    ],
    "company": "TCS"
  },
  {
    "id": 162,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Breadth-First Search (BFS) vs Depth-First Search (DFS) on Graphs.",
    "tips": "BFS uses Queue (level-by-level, shortest path); DFS uses Stack/Recursion (explores deep).",
    "keywords": [
      "bfs",
      "dfs",
      "queue",
      "stack",
      "recursion",
      "graph",
      "visited"
    ],
    "ideal_points": [
      "Queue for BFS, Stack for DFS",
      "Visited set to avoid cycles",
      "Shortest path in unweighted graph (BFS)",
      "Connected components (DFS)"
    ],
    "company": "Google"
  },
  {
    "id": 163,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Detect Cycle in Directed & Undirected Graph.",
    "tips": "Undirected: DFS with parent check. Directed: DFS with recursion stack tracking (color array).",
    "keywords": [
      "cycle detection",
      "graph",
      "dfs",
      "recursion stack",
      "visited"
    ],
    "ideal_points": [
      "Undirected parent tracking",
      "Directed recursion stack state",
      "3-Color algorithm (White, Gray, Black)",
      "Kahn's algorithm (Topological sort)"
    ],
    "company": "Amazon"
  },
  {
    "id": 164,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Topological Sort (Kahn's Algorithm & DFS).",
    "tips": "Linear ordering of vertices in DAG such that for u -> v, u comes before v.",
    "keywords": [
      "topological sort",
      "dag",
      "indegree",
      "kahn algorithm",
      "dependency"
    ],
    "ideal_points": [
      "DAG requirement (no cycles)",
      "Indegree array & Queue (Kahn)",
      "DFS stack reversal method",
      "Build system dependency resolution"
    ],
    "company": "Microsoft"
  },
  {
    "id": 165,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Dijkstra's Algorithm for Shortest Path.",
    "tips": "Greedy algorithm using Min-Heap / PriorityQueue for single-source shortest path.",
    "keywords": [
      "dijkstra",
      "shortest path",
      "min heap",
      "priority queue",
      "greedy"
    ],
    "ideal_points": [
      "Non-negative edge weights requirement",
      "Distance array & Min-Heap",
      "Relaxation step `dist[u] + weight < dist[v]`",
      "Time complexity O((V + E) log V)"
    ],
    "company": "Meta"
  },
  {
    "id": 166,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Merge Sort Algorithm (Divide & Conquer).",
    "tips": "Recursively halve array, sort halves, and merge sorted arrays. O(N log N) time.",
    "keywords": [
      "merge sort",
      "divide and conquer",
      "o(n log n)",
      "stable",
      "recursion"
    ],
    "ideal_points": [
      "Halving array recursively",
      "Merge process with two pointers",
      "O(N log N) time in all cases",
      "O(N) auxiliary space penalty"
    ],
    "company": "Uber"
  },
  {
    "id": 167,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Quick Sort Algorithm & Pivot Selection Strategy.",
    "tips": "Partition array around pivot element so left < pivot < right. Average O(N log N).",
    "keywords": [
      "quick sort",
      "pivot",
      "partition",
      "in-place",
      "randomized"
    ],
    "ideal_points": [
      "Lomuto vs Hoare partition",
      "Average O(N log N), Worst O(N^2)",
      "Randomized pivot to avoid worst-case",
      "In-place sorting O(log N) stack"
    ],
    "company": "Oracle"
  },
  {
    "id": 168,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Explain Heap Data Structure (Min-Heap / Max-Heap) & Heapify.",
    "tips": "Complete binary tree satisfying heap property. Parent <= Children (Min-Heap).",
    "keywords": [
      "heap",
      "min heap",
      "max heap",
      "heapify",
      "priority queue"
    ],
    "ideal_points": [
      "Array representation `child = 2i+1, 2i+2`",
      "Heapify up (insert) & Heapify down (extract)",
      "Build heap O(N) time",
      "Priority Queue implementation"
    ],
    "company": "Flipkart"
  },
  {
    "id": 169,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Find Kth Largest / Smallest Element in an Array.",
    "tips": "Use Min-Heap of size K (O(N log K)) or QuickSelect (O(N) average).",
    "keywords": [
      "kth largest",
      "min heap",
      "quickselect",
      "priority queue"
    ],
    "ideal_points": [
      "Sorting approach O(N log N)",
      "Min-Heap size K approach O(N log K)",
      "QuickSelect partition approach O(N) avg",
      "Space-time trade-off"
    ],
    "company": "Infosys"
  },
  {
    "id": 170,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Sliding Window Technique (Fixed & Variable Size).",
    "tips": "Maintains a running subarray window to compute continuous metrics in O(N).",
    "keywords": [
      "sliding window",
      "subarray",
      "max sum",
      "two pointer",
      "o(n)"
    ],
    "ideal_points": [
      "Fixed window size (sum of size K)",
      "Variable window (longest substring without repeating)",
      "Two pointers (left, right)",
      "O(N) linear time"
    ],
    "company": "TCS"
  },
  {
    "id": 171,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Two Pointer Technique (Opposite Direction & Same Direction).",
    "tips": "Pointers move towards each other or at different speeds to process sorted arrays/linked lists.",
    "keywords": [
      "two pointer",
      "opposite direction",
      "same direction",
      "palindrome",
      "sorted"
    ],
    "ideal_points": [
      "Opposite direction (Two Sum sorted, Palindrome)",
      "Same direction (Remove duplicates, Fast/Slow cycle)",
      "O(N) time complexity",
      "Requires sorted structure"
    ],
    "company": "Google"
  },
  {
    "id": 172,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Dynamic Programming: 0/1 Knapsack Problem.",
    "tips": "Given weights & values, maximize value within weight capacity. Pick or skip item.",
    "keywords": [
      "knapsack",
      "dynamic programming",
      "0/1",
      "dp table",
      "memoization"
    ],
    "ideal_points": [
      "Overlapping subproblems",
      "State representation `dp[item][capacity]`",
      "Include item vs Exclude item choice",
      "Space optimization O(W)"
    ],
    "company": "Amazon"
  },
  {
    "id": 173,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Dynamic Programming: Longest Common Subsequence (LCS).",
    "tips": "Find longest subsequence common to two strings.",
    "keywords": [
      "lcs",
      "longest common subsequence",
      "dp",
      "string",
      "matrix"
    ],
    "ideal_points": [
      "Subsequence vs Substring",
      "DP state `if match: 1 + dp[i-1][j-1] else: max(dp[i-1][j], dp[i][j-1])`",
      "Reconstructing string",
      "Time O(M*N)"
    ],
    "company": "Microsoft"
  },
  {
    "id": 174,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Trie (Prefix Tree) Data Structure & Search Autocomplete.",
    "tips": "Tree structure storing strings character-by-character for prefix search.",
    "keywords": [
      "trie",
      "prefix tree",
      "autocomplete",
      "search",
      "dictionary"
    ],
    "ideal_points": [
      "Node structure (children array + isEndOfWord)",
      "Insert O(L) & Search O(L) where L = word length",
      "Prefix matching for search engine autocomplete",
      "Memory footprint"
    ],
    "company": "Meta"
  },
  {
    "id": 175,
    "category": "DSA",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Disjoint Set Union (DSU / Union-Find) with Path Compression.",
    "tips": "Tracks partitioned set of elements with Find and Union operations.",
    "keywords": [
      "dsu",
      "union find",
      "path compression",
      "rank",
      "kruskal"
    ],
    "ideal_points": [
      "Parent array & Rank array",
      "Find operation with Path Compression",
      "Union by Rank",
      "Kruskal's MST algorithm application"
    ],
    "company": "Uber"
  },
  {
    "id": 176,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Tell me about yourself and walk me through your resume.",
    "tips": "Structure: Present background -> key projects/skills -> why this role fits.",
    "keywords": [
      "tell me about yourself",
      "resume",
      "background",
      "experience",
      "skills"
    ],
    "ideal_points": [
      "Elevator pitch under 2 mins",
      "Highlight key tech stack",
      "Recent engineering achievements",
      "Why this company"
    ],
    "company": "Oracle"
  },
  {
    "id": 177,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is your biggest weakness and how are you working to improve it?",
    "tips": "Pick genuine technical/work weakness and show concrete steps taken to solve it.",
    "keywords": [
      "weakness",
      "improvement",
      "growth",
      "learning",
      "action"
    ],
    "ideal_points": [
      "Genuine weakness",
      "Actionable steps taken",
      "Demonstrated progress",
      "Positive framing"
    ],
    "company": "Flipkart"
  },
  {
    "id": 178,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Why do you want to work for our company?",
    "tips": "Show company research: product alignment, tech stack, company mission, culture.",
    "keywords": [
      "company",
      "mission",
      "why us",
      "culture",
      "alignment"
    ],
    "ideal_points": [
      "Specific product mention",
      "Tech stack interest",
      "Company values alignment",
      "Long-term commitment"
    ],
    "company": "Infosys"
  },
  {
    "id": 179,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Tell me about a time you had a conflict with a coworker or manager.",
    "tips": "Use STAR: Situation, Task, Action (empathy & data), Result (positive relationship).",
    "keywords": [
      "conflict",
      "coworker",
      "disagreement",
      "star",
      "resolution"
    ],
    "ideal_points": [
      "Data-driven discussion",
      "Active listening",
      "Professional compromise",
      "Positive team outcome"
    ],
    "company": "TCS"
  },
  {
    "id": 180,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Describe a time you failed or made a mistake. How did you handle it?",
    "tips": "Own the mistake immediately, fix the issue, and explain preventive measures created.",
    "keywords": [
      "failure",
      "mistake",
      "accountability",
      "learning",
      "post-mortem"
    ],
    "ideal_points": [
      "Ownership without blaming others",
      "Immediate remediation action",
      "Root cause analysis",
      "Process improvement added"
    ],
    "company": "Google"
  },
  {
    "id": 181,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Where do you see yourself in 5 years?",
    "tips": "Focus on technical mastery, domain expertise, leadership growth, and impact.",
    "keywords": [
      "5 years",
      "career goals",
      "future",
      "growth",
      "leadership"
    ],
    "ideal_points": [
      "Technical depth development",
      "Leadership / Mentorship aspirations",
      "Alignment with company growth",
      "Realistic ambition"
    ],
    "company": "Amazon"
  },
  {
    "id": 182,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Why are you looking to leave your current job / company?",
    "tips": "Focus on seeking new challenges, growing technical skills, and scale.",
    "keywords": [
      "leaving",
      "reason for change",
      "growth",
      "challenge"
    ],
    "ideal_points": [
      "Positive framing of current company",
      "Desire for new technical challenges",
      "Career advancement focus",
      "No badmouthing past employers"
    ],
    "company": "Microsoft"
  },
  {
    "id": 183,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "How do you handle working under tight deadlines or high pressure?",
    "tips": "Prioritization, clear communication, breaking tasks down, maintaining code quality.",
    "keywords": [
      "deadline",
      "pressure",
      "prioritization",
      "stress",
      "communication"
    ],
    "ideal_points": [
      "Task breakdown & MVP prioritization",
      "Transparent status updates",
      "Stress management strategies",
      "Delivering quality results"
    ],
    "company": "Meta"
  },
  {
    "id": 184,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Describe a project you are most proud of.",
    "tips": "Highlight problem statement, your technical role, tech stack choices, and measurable impact.",
    "keywords": [
      "proud project",
      "achievement",
      "impact",
      "tech stack",
      "role"
    ],
    "ideal_points": [
      "Problem & Solution architecture",
      "Specific personal contributions",
      "Tech stack trade-offs",
      "Quantifiable result (speed, users, revenue)"
    ],
    "company": "Uber"
  },
  {
    "id": 185,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "How do you prioritize tasks when everything seems urgent?",
    "tips": "Eisenhower Matrix (Urgent vs Important), consulting stakeholders, estimating impact.",
    "keywords": [
      "prioritize",
      "urgent",
      "impact",
      "eisenhower matrix",
      "planning"
    ],
    "ideal_points": [
      "Impact vs Effort evaluation",
      "Communicating trade-offs to team",
      "Breaking into manageable sprints",
      "Focusing on core goals"
    ],
    "company": "Oracle"
  },
  {
    "id": 186,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Tell me about a time you led a team or project.",
    "tips": "Show leadership: setting clear goals, delegating, unblocking teammates, celebrating success.",
    "keywords": [
      "leadership",
      "leading",
      "teamwork",
      "delegation",
      "unblocking"
    ],
    "ideal_points": [
      "Setting clear vision",
      "Delegating based on strengths",
      "Unblocking team members",
      "Delivering project on time"
    ],
    "company": "Flipkart"
  },
  {
    "id": 187,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "How do you stay updated with new technologies and industry trends?",
    "tips": "Tech blogs, open-source projects, engineering podcasts, building side projects.",
    "keywords": [
      "learning",
      "trends",
      "blogs",
      "side projects",
      "podcasts"
    ],
    "ideal_points": [
      "Specific sources (HackerNews, Tech blogs)",
      "Building hands-on side projects",
      "Experimenting with new frameworks",
      "Sharing knowledge with team"
    ],
    "company": "Infosys"
  },
  {
    "id": 188,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "What makes you a good team player?",
    "tips": "Active listening, clear communication, helping unblock others, accepting feedback.",
    "keywords": [
      "team player",
      "collaboration",
      "communication",
      "feedback",
      "support"
    ],
    "ideal_points": [
      "Empathy & active listening",
      "Willingness to review PRs & mentor",
      "Openness to constructive feedback",
      "Putting team goal above ego"
    ],
    "company": "TCS"
  },
  {
    "id": 189,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "How do you respond to critical feedback on your code or work?",
    "tips": "View feedback as learning opportunity, thank reviewer, discuss objectively.",
    "keywords": [
      "feedback",
      "code review",
      "criticism",
      "growth",
      "learning"
    ],
    "ideal_points": [
      "Non-defensive attitude",
      "Objective data evaluation",
      "Implementing suggestions",
      "Continuous self-improvement"
    ],
    "company": "Google"
  },
  {
    "id": 190,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Describe a time you had to learn a new technology quickly.",
    "tips": "Explain learning strategy: documentation, small proof-of-concept, building production feature.",
    "keywords": [
      "learning fast",
      "new technology",
      "doc",
      "poc",
      "adaptation"
    ],
    "ideal_points": [
      "Structured learning approach",
      "Building rapid POC",
      "Asking targeted questions",
      "Successfully shipping feature"
    ],
    "company": "Amazon"
  },
  {
    "id": 191,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Easy",
    "title": "What is your expected salary and compensation expectations?",
    "tips": "State research-based range based on role, market standards, and skills.",
    "keywords": [
      "salary",
      "compensation",
      "market rate",
      "expectations"
    ],
    "ideal_points": [
      "Market value research",
      "Flexible range mention",
      "Total compensation focus (base, bonus, equity)",
      "Openness to negotiation"
    ],
    "company": "Microsoft"
  },
  {
    "id": 192,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "How do you handle ambiguous requirements or vague task descriptions?",
    "tips": "Ask clarifying questions, document assumptions, build small prototype, iterate with stakeholders.",
    "keywords": [
      "ambiguity",
      "requirements",
      "clarification",
      "prototype",
      "iteration"
    ],
    "ideal_points": [
      "Proactive stakeholder communication",
      "Documenting explicit assumptions",
      "Building quick POC for validation",
      "Iterative refinement"
    ],
    "company": "Meta"
  },
  {
    "id": 193,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Tell me about a time you went above and beyond your job responsibilities.",
    "tips": "Proactively identified a system bottleneck or bug, built automated tool, or helped teammate.",
    "keywords": [
      "above and beyond",
      "initiative",
      "proactive",
      "automation",
      "impact"
    ],
    "ideal_points": [
      "Identifying unprompted improvement",
      "Taking personal initiative",
      "Creating automated solution",
      "Positive team / system impact"
    ],
    "company": "Uber"
  },
  {
    "id": 194,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "How do you maintain work-life balance during demanding sprint crunch times?",
    "tips": "Time management, setting boundaries, taking short breaks, communicating burnout risks.",
    "keywords": [
      "work-life balance",
      "burnout",
      "time management",
      "rest",
      "boundaries"
    ],
    "ideal_points": [
      "Effective workday planning",
      "Setting realistic sprint commitments",
      "Communicating early if overworked",
      "Rest & recovery habits"
    ],
    "company": "Oracle"
  },
  {
    "id": 195,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "What motivates you to perform your best work every day?",
    "tips": "Solving complex technical problems, building products that users love, continuous learning.",
    "keywords": [
      "motivation",
      "passion",
      "problem solving",
      "learning",
      "impact"
    ],
    "ideal_points": [
      "Intellectual challenge of coding",
      "Seeing real user impact",
      "Collaborating with smart peers",
      "Constant skill growth"
    ],
    "company": "Flipkart"
  },
  {
    "id": 196,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "How do you handle working with a difficult personality or team member?",
    "tips": "Empathy, focusing on professional goals, separate personal feelings from work, open dialogue.",
    "keywords": [
      "difficult colleague",
      "empathy",
      "professionalism",
      "communication"
    ],
    "ideal_points": [
      "Professional detachment",
      "Focusing on shared goal",
      "Private 1-on-1 discussion if needed",
      "Respecting diverse perspectives"
    ],
    "company": "Infosys"
  },
  {
    "id": 197,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "What would your past manager or peers say about you?",
    "tips": "Dependable, strong problem solver, clear communicator, fast learner.",
    "keywords": [
      "peer review",
      "manager feedback",
      "strengths",
      "reputation"
    ],
    "ideal_points": [
      "Reliability & accountability",
      "Technical ownership",
      "Positive team attitude",
      "Fast learning ability"
    ],
    "company": "TCS"
  },
  {
    "id": 198,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Are you comfortable working remotely / in a hybrid environment?",
    "tips": "Self-discipline, asynchronous communication, clear written updates, time management.",
    "keywords": [
      "remote work",
      "async communication",
      "self-discipline",
      "hybrid"
    ],
    "ideal_points": [
      "Asynchronous written updates",
      "Over-communicating progress",
      "Self-starter initiative",
      "Home office productivity setup"
    ],
    "company": "Google"
  },
  {
    "id": 199,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "When can you join if offered the position (Notice Period)?",
    "tips": "State exact notice period (e.g. 30 days, 60 days, immediate joiner).",
    "keywords": [
      "notice period",
      "joining date",
      "buyout",
      "availability"
    ],
    "ideal_points": [
      "Clear timeline statement",
      "Notice period buyout feasibility if applicable",
      "Smooth transition plan for current job",
      "Enthusiasm to start"
    ],
    "company": "Amazon"
  },
  {
    "id": 200,
    "category": "HR",
    "role": "Software Engineer",
    "difficulty": "Medium",
    "title": "Do you have any questions for us?",
    "tips": "Ask intelligent questions about engineering culture, tech stack challenges, or company growth.",
    "keywords": [
      "questions for interviewer",
      "tech stack",
      "culture",
      "roadmap"
    ],
    "ideal_points": [
      "Ask about team's biggest technical challenge",
      "Ask about CI/CD & deployment frequency",
      "Ask about career growth & mentorship",
      "Avoid asking basic info on website"
    ],
    "company": "Microsoft"
  },
  {
    "id": 201,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Hard",
    "title": "Explain RESTful API architecture principles and HTTP methods.",
    "tips": "Statelessness, Uniform interface, Client-server separation, Cacheability. GET, POST, PUT, PATCH, DELETE.",
    "keywords": [
      "rest",
      "http",
      "get",
      "post",
      "put",
      "patch",
      "delete",
      "stateless"
    ],
    "ideal_points": [
      "Resource-based URIs",
      "Statelessness principle",
      "PUT (replace) vs PATCH (partial)",
      "HTTP Status codes (200, 201, 400, 404, 500)"
    ],
    "company": "Meta"
  },
  {
    "id": 202,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is API Rate Limiting and how to implement it?",
    "tips": "Restricts number of requests per user/IP using algorithms like Token Bucket, Leaky Bucket, Sliding Window.",
    "keywords": [
      "rate limit",
      "token bucket",
      "leaky bucket",
      "redis",
      "sliding window"
    ],
    "ideal_points": [
      "Prevent DDoS & abuse",
      "Token bucket vs Leaky bucket",
      "Distributed rate limiting with Redis",
      "HTTP 429 Too Many Requests"
    ],
    "company": "Uber"
  },
  {
    "id": 203,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is Authentication vs Authorization? Explain JWT (JSON Web Tokens).",
    "tips": "AuthN = who you are; AuthZ = what you can do. JWT = Header.Payload.Signature.",
    "keywords": [
      "jwt",
      "authentication",
      "authorization",
      "bearer token",
      "signature",
      "stateless"
    ],
    "ideal_points": [
      "AuthN vs AuthZ difference",
      "JWT 3 parts (Header, Payload, Signature)",
      "Stateless auth benefit",
      "Refresh token rotation & Security"
    ],
    "company": "Oracle"
  },
  {
    "id": 204,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Medium",
    "title": "Explain Database Indexing strategies for backend performance.",
    "tips": "B-Trees speed up lookup queries O(log N). Composite indexes order matters.",
    "keywords": [
      "index",
      "b-tree",
      "composite index",
      "performance",
      "query optimization"
    ],
    "ideal_points": [
      "Clustered vs Non-clustered index",
      "Composite index leftmost prefix rule",
      "Index scan vs Index seek",
      "Over-indexing write penalty"
    ],
    "company": "Flipkart"
  },
  {
    "id": 205,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is Database Connection Pooling (e.g., HikariCP, SQLAlchemy Pool)?",
    "tips": "Reuses active DB connections to avoid TCP handshake overhead on every request.",
    "keywords": [
      "connection pool",
      "sqlalchemy",
      "hikaricp",
      "overhead",
      "handshake"
    ],
    "ideal_points": [
      "TCP & TLS handshake cost",
      "Max connections limit",
      "Connection leak prevention",
      "Idle timeout configuration"
    ],
    "company": "Infosys"
  },
  {
    "id": 206,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Medium",
    "title": "Explain Message Queues (RabbitMQ, Kafka, Celery) and Asynchronous Processing.",
    "tips": "Offloads long-running tasks from HTTP request lifecycle to background workers.",
    "keywords": [
      "message queue",
      "celery",
      "redis",
      "rabbitmq",
      "kafka",
      "async"
    ],
    "ideal_points": [
      "HTTP response speed optimization",
      "Producer-Consumer pattern",
      "Task retry & Dead Letter Queue (DLQ)",
      "At-least-once delivery"
    ],
    "company": "TCS"
  },
  {
    "id": 207,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is Caching and Cache Invalidation Strategies?",
    "tips": "Stores frequent data in memory (Redis/Memcached). Strategies: Cache-Aside, Write-Through, Write-Behind.",
    "keywords": [
      "cache",
      "redis",
      "cache-aside",
      "ttl",
      "invalidation",
      "eviction"
    ],
    "ideal_points": [
      "Cache-Aside pattern",
      "Write-Through vs Write-Behind",
      "TTL (Time to Live) expiration",
      "Cache stampede / thundering herd"
    ],
    "company": "Google"
  },
  {
    "id": 208,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Medium",
    "title": "Explain WebSockets vs Server-Sent Events (SSE) vs Long Polling.",
    "tips": "WebSocket = full-duplex TCP; SSE = server-to-client HTTP stream; Long Polling = repeated HTTP requests.",
    "keywords": [
      "websocket",
      "sse",
      "long polling",
      "realtime",
      "full-duplex"
    ],
    "ideal_points": [
      "Bidirectional vs Unidirectional",
      "Connection overhead",
      "Use cases (Chat for WebSocket, Live Feed for SSE)",
      "Reconnection logic"
    ],
    "company": "Amazon"
  },
  {
    "id": 209,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is Microservices Architecture and Circuit Breaker Pattern?",
    "tips": "Decoupled services. Circuit Breaker prevents cascading failure when a service dies.",
    "keywords": [
      "microservices",
      "circuit breaker",
      "resilience4j",
      "fallback",
      "cascading"
    ],
    "ideal_points": [
      "Monolith vs Microservices",
      "Circuit breaker states (Closed, Open, Half-Open)",
      "Fallback responses",
      "Service discovery"
    ],
    "company": "Microsoft"
  },
  {
    "id": 210,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is gRPC vs REST API?",
    "tips": "gRPC uses HTTP/2 + Protocol Buffers (binary, fast, strongly typed). REST uses HTTP/1.1 + JSON.",
    "keywords": [
      "grpc",
      "protobuf",
      "http/2",
      "rest",
      "binary",
      "microservices"
    ],
    "ideal_points": [
      "Proto3 binary serialization",
      "HTTP/2 multiplexing speed",
      "Strongly typed contracts",
      "gRPC for internal microservices"
    ],
    "company": "Meta"
  },
  {
    "id": 211,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Medium",
    "title": "How do you handle Database Transactions and Distributed Transactions (Saga Pattern)?",
    "tips": "ACID local transactions. Saga pattern manages multi-service transactions via compensating events.",
    "keywords": [
      "saga pattern",
      "transaction",
      "acid",
      "distributed transaction",
      "compensation"
    ],
    "ideal_points": [
      "Local ACID transaction",
      "Choreography vs Orchestration Saga",
      "Compensating transactions on failure",
      "Eventual consistency"
    ],
    "company": "Uber"
  },
  {
    "id": 212,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is CORS (Cross-Origin Resource Sharing)?",
    "tips": "Browser security restriction preventing unauthorized cross-origin requests.",
    "keywords": [
      "cors",
      "origin",
      "preflight",
      "header",
      "access-control-allow-origin"
    ],
    "ideal_points": [
      "Same-Origin Policy",
      "Preflight OPTIONS request",
      "Access-Control-Allow-Origin header",
      "Handling credentials & cookies"
    ],
    "company": "Oracle"
  },
  {
    "id": 213,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Medium",
    "title": "Explain SQL Injection (SQLi) and how ORMs protect against it.",
    "tips": "Injecting malicious SQL code into input fields. ORMs use parameterized queries.",
    "keywords": [
      "sql injection",
      "sqli",
      "orm",
      "parameterized query",
      "prepared statement"
    ],
    "ideal_points": [
      "Malicious string input OR 1=1",
      "Prepared statements parameter binding",
      "Raw SQL risks in ORMs",
      "Sanitization & Escaping"
    ],
    "company": "Flipkart"
  },
  {
    "id": 214,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is Idempotency in REST APIs?",
    "tips": "Making same request multiple times has same effect as making it once (GET, PUT, DELETE are idempotent).",
    "keywords": [
      "idempotent",
      "put",
      "delete",
      "post",
      "idempotency key"
    ],
    "ideal_points": [
      "Definition of idempotency",
      "POST is NOT idempotent",
      "Idempotency-Key header pattern for payments",
      "Retry safety"
    ],
    "company": "Infosys"
  },
  {
    "id": 215,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is GraphQL vs REST API?",
    "tips": "GraphQL allows clients to request exact fields needed, solving over-fetching and under-fetching.",
    "keywords": [
      "graphql",
      "query",
      "mutation",
      "over-fetching",
      "schema",
      "resolver"
    ],
    "ideal_points": [
      "Over-fetching & Under-fetching solutions",
      "Single endpoint `/graphql`",
      "Schema & Resolvers",
      "N+1 query problem"
    ],
    "company": "TCS"
  },
  {
    "id": 216,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Medium",
    "title": "How to solve N+1 Query Problem in ORMs (SQLAlchemy, Hibernate)?",
    "tips": "Occurs when fetching parent + child items individually. Solved via Eager Loading / Joins.",
    "keywords": [
      "n+1 query",
      "eager loading",
      "lazy loading",
      "join",
      "sqlalchemy"
    ],
    "ideal_points": [
      "N+1 query explanation",
      "Lazy loading overhead",
      "Eager loading (`joinedload` / `selectinload`)",
      "Monitoring SQL queries"
    ],
    "company": "Google"
  },
  {
    "id": 217,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is Session-Based Authentication vs Token-Based Authentication?",
    "tips": "Session stores state on server (Redis/Memory); Token (JWT) stores state on client.",
    "keywords": [
      "session",
      "token",
      "jwt",
      "stateful",
      "stateless",
      "cookie"
    ],
    "ideal_points": [
      "Server memory session lookup",
      "Stateless JWT verification",
      "Revocation difficulty with JWTs",
      "HttpOnly secure cookies"
    ],
    "company": "Amazon"
  },
  {
    "id": 218,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is API Gateway Pattern?",
    "tips": "Single entry point for client requests in microservices handling routing, auth, and rate limits.",
    "keywords": [
      "api gateway",
      "routing",
      "microservices",
      "kong",
      "nginx"
    ],
    "ideal_points": [
      "Centralized entry point",
      "Cross-cutting concerns (Auth, Rate limit, SSL)",
      "Protocol translation",
      "Load balancing"
    ],
    "company": "Microsoft"
  },
  {
    "id": 219,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Medium",
    "title": "How do you handle File Uploads in Scalable Backend (AWS S3 Presigned URLs)?",
    "tips": "Client requests presigned upload URL from backend, then uploads directly to S3.",
    "keywords": [
      "s3",
      "presigned url",
      "file upload",
      "aws",
      "storage"
    ],
    "ideal_points": [
      "Direct client-to-S3 upload",
      "Reduces backend server load & memory",
      "Presigned URL expiration time",
      "Validating file type & size"
    ],
    "company": "Meta"
  },
  {
    "id": 220,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is Database Connection Leak and how to prevent it?",
    "tips": "Failing to return DB connection to pool after request finishes.",
    "keywords": [
      "connection leak",
      "pool",
      "context manager",
      "try finally",
      "db.close()"
    ],
    "ideal_points": [
      "Causes: missing `finally` block or error",
      "Context managers `with get_db():`",
      "Pool exhaustion symptom",
      "Timeout monitoring"
    ],
    "company": "Uber"
  },
  {
    "id": 221,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Medium",
    "title": "Explain Load Balancing Algorithms (Round Robin, Least Connections, IP Hash).",
    "tips": "Distributes network traffic across server pool.",
    "keywords": [
      "load balancer",
      "round robin",
      "least connections",
      "ip hash",
      "nginx"
    ],
    "ideal_points": [
      "Round Robin distribution",
      "Least Connections for long requests",
      "IP Hash for sticky sessions",
      "Health checks"
    ],
    "company": "Oracle"
  },
  {
    "id": 222,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is SSL/TLS Termination at Reverse Proxy?",
    "tips": "Decrypting HTTPS traffic at Nginx/Load Balancer before forwarding HTTP to backend.",
    "keywords": [
      "ssl termination",
      "tls",
      "nginx",
      "reverse proxy",
      "https"
    ],
    "ideal_points": [
      "Decryption offloading",
      "Backend receives plain HTTP internally",
      "Certificate management at proxy",
      "Security considerations"
    ],
    "company": "Flipkart"
  },
  {
    "id": 223,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is Distributed Locking (e.g. Redis Redlock)?",
    "tips": "Ensures only one process across distributed servers executes a critical section.",
    "keywords": [
      "distributed lock",
      "redlock",
      "redis",
      "concurrency",
      "mutex"
    ],
    "ideal_points": [
      "Race conditions across multiple instances",
      "SETNX key with TTL in Redis",
      "Redlock algorithm multi-node safety",
      "Fencing tokens"
    ],
    "company": "Infosys"
  },
  {
    "id": 224,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Easy",
    "title": "What is Graceful Shutdown in Web Servers?",
    "tips": "Server stops accepting new requests, finishes in-flight requests, and closes DB pools cleanly.",
    "keywords": [
      "graceful shutdown",
      "uvicorn",
      "sigterm",
      "in-flight requests",
      "cleanup"
    ],
    "ideal_points": [
      "Handling SIGTERM signal",
      "Finishing pending requests before exit",
      "Closing database pools & Redis connections",
      "Kubernetes pod termination grace period"
    ],
    "company": "TCS"
  },
  {
    "id": 225,
    "category": "Backend",
    "role": "Backend Engineer",
    "difficulty": "Medium",
    "title": "Explain Database Replication Lag and Read-After-Write Consistency.",
    "tips": "Delay in propagating master updates to read replicas. Solved by reading primary after write.",
    "keywords": [
      "replication lag",
      "read replica",
      "read-after-write",
      "eventual consistency"
    ],
    "ideal_points": [
      "Master-Replica architecture",
      "Asynchronous replication delay",
      "Stale reads from replica",
      "Routing recent writer to Primary"
    ],
    "company": "Google"
  },
  {
    "id": 226,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Medium",
    "title": "Explain Virtual DOM and React Reconciliation / Diffing Algorithm.",
    "tips": "In-memory light representation of DOM. React diffs old and new trees O(N) and batches updates.",
    "keywords": [
      "virtual dom",
      "react",
      "reconciliation",
      "diffing",
      "key prop",
      "render"
    ],
    "ideal_points": [
      "Virtual DOM concept",
      "O(N) heuristic diffing algorithm",
      "Importance of unique `key` prop",
      "Batching real DOM mutations"
    ],
    "company": "Amazon"
  },
  {
    "id": 227,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is the difference between `useState`, `useEffect`, and `useMemo` in React?",
    "tips": "useState = component state; useEffect = side effects; useMemo = memoizes expensive calculations.",
    "keywords": [
      "usestate",
      "useeffect",
      "usememo",
      "hook",
      "dependency array",
      "re-render"
    ],
    "ideal_points": [
      "useState state trigger",
      "useEffect lifecycle & cleanup",
      "useMemo performance caching",
      "Dependency array rules"
    ],
    "company": "Microsoft"
  },
  {
    "id": 228,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is React Context API vs Redux / Zustand?",
    "tips": "Context API solves prop drilling for simple state; Redux/Zustand handle complex global state with middleware.",
    "keywords": [
      "context api",
      "redux",
      "zustand",
      "prop drilling",
      "state management"
    ],
    "ideal_points": [
      "Prop drilling problem",
      "Context API re-render caveat",
      "Zustand lightweight store",
      "Redux immutable state flow"
    ],
    "company": "Meta"
  },
  {
    "id": 229,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Medium",
    "title": "Explain CSS Box Model (Content, Padding, Border, Margin).",
    "tips": "Standard layout model. `box-sizing: border-box` includes padding & border in total width.",
    "keywords": [
      "box model",
      "content",
      "padding",
      "border",
      "margin",
      "box-sizing"
    ],
    "ideal_points": [
      "4 layers of box model",
      "Margin collapse concept",
      "content-box vs border-box",
      "Layout sizing calculation"
    ],
    "company": "Uber"
  },
  {
    "id": 230,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is Flexbox vs CSS Grid?",
    "tips": "Flexbox = 1D layout (rows OR columns); Grid = 2D layout (rows AND columns simultaneously).",
    "keywords": [
      "flexbox",
      "css grid",
      "layout",
      "flex-direction",
      "grid-template"
    ],
    "ideal_points": [
      "1D vs 2D layout control",
      "Flexbox alignment properties",
      "Grid area & template tracks",
      "Responsive design use cases"
    ],
    "company": "Oracle"
  },
  {
    "id": 231,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Medium",
    "title": "Explain Event Bubbling, Event Capturing, and Event Delegation.",
    "tips": "Capturing goes down; Bubbling goes up DOM tree. Delegation attaches 1 listener to parent.",
    "keywords": [
      "bubbling",
      "capturing",
      "event delegation",
      "stoppropagation",
      "target"
    ],
    "ideal_points": [
      "Event propagation phases",
      "e.stopPropagation()",
      "Event delegation performance benefit",
      "e.target vs e.currentTarget"
    ],
    "company": "Flipkart"
  },
  {
    "id": 232,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is the difference between `var`, `let`, and `const` in JavaScript?",
    "tips": "var = function-scoped, hoisted; let/const = block-scoped, temporal dead zone. const = immutable reference.",
    "keywords": [
      "var",
      "let",
      "const",
      "hoisting",
      "scope",
      "temporal dead zone"
    ],
    "ideal_points": [
      "Function vs Block scope",
      "Hoisting behavior",
      "Temporal Dead Zone (TDZ)",
      "Reassignment restrictions"
    ],
    "company": "Infosys"
  },
  {
    "id": 233,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is JavaScript Closures and lexical scoping?",
    "tips": "Function bundled with references to its surrounding state (lexical environment).",
    "keywords": [
      "closure",
      "lexical scope",
      "outer function",
      "private variables",
      "scope"
    ],
    "ideal_points": [
      "Access to outer function scope",
      "Preserving variables after outer function exits",
      "Private data encapsulation pattern",
      "Memory leak risk if held"
    ],
    "company": "TCS"
  },
  {
    "id": 234,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is Promises and `async/await` in JavaScript?",
    "tips": "Promises handle async operations (Pending, Fulfilled, Rejected). `async/await` is syntactic sugar over Promises.",
    "keywords": [
      "promise",
      "async",
      "await",
      "then",
      "catch",
      "event loop"
    ],
    "ideal_points": [
      "Promise states",
      "Chaining `.then()` vs `async/await`",
      "`try/catch` error handling",
      "Promise.all vs Promise.allSettled"
    ],
    "company": "Google"
  },
  {
    "id": 235,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Medium",
    "title": "Explain JavaScript Event Loop (Call Stack, Web APIs, Microtask Queue, Macrotask Queue).",
    "tips": "Single-threaded event loop processes microtasks (Promises) before macrotasks (setTimeout).",
    "keywords": [
      "event loop",
      "call stack",
      "microtask",
      "macrotask",
      "settimeout",
      "promise"
    ],
    "ideal_points": [
      "Single-threaded JavaScript nature",
      "Call stack execution",
      "Microtasks (Promises) priority",
      "Macrotasks (setTimeout, setInterval)"
    ],
    "company": "Amazon"
  },
  {
    "id": 236,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is Server-Side Rendering (SSR) vs Static Site Generation (SSG) vs Client-Side Rendering (CSR)?",
    "tips": "CSR = browser renders JS; SSR = server renders HTML per request; SSG = pre-rendered HTML at build time.",
    "keywords": [
      "ssr",
      "ssg",
      "csr",
      "nextjs",
      "hydration",
      "seo"
    ],
    "ideal_points": [
      "CSR SEO and initial load delay",
      "SSR dynamic server HTML rendering",
      "SSG static build performance",
      "Hydration process"
    ],
    "company": "Microsoft"
  },
  {
    "id": 237,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is React Performance Optimization (React.memo, useCallback, Code Splitting)?",
    "tips": "Preventing unnecessary re-renders and reducing initial bundle size.",
    "keywords": [
      "react.memo",
      "usecallback",
      "code splitting",
      "lazy",
      "re-render",
      "bundle"
    ],
    "ideal_points": [
      "React.memo prop comparison",
      "useCallback function reference stability",
      "React.lazy & Suspense code splitting",
      "Lighthouse metrics"
    ],
    "company": "Meta"
  },
  {
    "id": 238,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Medium",
    "title": "Explain `this` keyword binding in JavaScript (Default, Implicit, Explicit, Arrow functions).",
    "tips": "`this` depends on how function is called. Arrow functions inherit lexical `this`.",
    "keywords": [
      "this",
      "bind",
      "call",
      "apply",
      "arrow function",
      "lexical"
    ],
    "ideal_points": [
      "Implicit binding (obj.method())",
      "Explicit binding (call, apply, bind)",
      "Arrow function lexical `this`",
      "`this` in event handlers"
    ],
    "company": "Uber"
  },
  {
    "id": 239,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is Web Performance Metrics (Core Web Vitals: LCP, FID/INP, CLS)?",
    "tips": "Google performance standards measuring loading (LCP), interactivity (INP), and visual stability (CLS).",
    "keywords": [
      "core web vitals",
      "lcp",
      "cls",
      "inp",
      "lighthouse",
      "performance"
    ],
    "ideal_points": [
      "LCP (Largest Contentful Paint)",
      "INP (Interaction to Next Paint)",
      "CLS (Cumulative Layout Shift)",
      "Optimization strategies"
    ],
    "company": "Oracle"
  },
  {
    "id": 240,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is Progressive Web App (PWA) and Service Workers?",
    "tips": "Service workers intercept network requests to enable offline caching and push notifications.",
    "keywords": [
      "pwa",
      "service worker",
      "offline",
      "cache",
      "manifest"
    ],
    "ideal_points": [
      "Service worker lifecycle",
      "Offline caching strategies",
      "Web App Manifest",
      "Push notifications"
    ],
    "company": "Flipkart"
  },
  {
    "id": 241,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is HTML5 Semantic Elements and Web Accessibility (ARIA)?",
    "tips": "Semantic tags (<header>, <nav>, <article>) and ARIA attributes improve screen reader accessibility.",
    "keywords": [
      "semantic html",
      "aria",
      "accessibility",
      "a11y",
      "screen reader"
    ],
    "ideal_points": [
      "Semantic tags vs generic <div>",
      "ARIA roles & aria-label",
      "Keyboard navigation & focus management",
      "Contrast ratios"
    ],
    "company": "Infosys"
  },
  {
    "id": 242,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is Debouncing vs Throttling in JavaScript?",
    "tips": "Debounce delays execution until user stops action; Throttle limits execution to once per X time interval.",
    "keywords": [
      "debounce",
      "throttle",
      "resize",
      "scroll",
      "search input"
    ],
    "ideal_points": [
      "Debounce for search autocomplete",
      "Throttle for scroll/resize listeners",
      "Implementation using setTimeout",
      "Performance benefit"
    ],
    "company": "TCS"
  },
  {
    "id": 243,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is Webpack / Vite and Bundling?",
    "tips": "Module bundlers process JS/TS/CSS modules into optimized static assets for browser.",
    "keywords": [
      "vite",
      "webpack",
      "bundler",
      "hmr",
      "esbuild",
      "tree shaking"
    ],
    "ideal_points": [
      "Vite native ES modules speed",
      "Webpack dependency graph",
      "Hot Module Replacement (HMR)",
      "Tree shaking unused code"
    ],
    "company": "Google"
  },
  {
    "id": 244,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Medium",
    "title": "Explain Prototype and Prototypal Inheritance in JavaScript.",
    "tips": "Every JS object has a prototype reference from which it inherits properties.",
    "keywords": [
      "prototype",
      "proto",
      "prototypal inheritance",
      "prototype chain"
    ],
    "ideal_points": [
      "`__proto__` vs `prototype` property",
      "Prototype chain lookup",
      "Object.create()",
      "ES6 Class syntax underlying sugar"
    ],
    "company": "Amazon"
  },
  {
    "id": 245,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is Shadow DOM and Web Components?",
    "tips": "Encapsulated DOM tree isolated from main document styles.",
    "keywords": [
      "shadow dom",
      "web components",
      "custom elements",
      "encapsulation"
    ],
    "ideal_points": [
      "Scoped CSS isolation",
      "Custom Elements API",
      "HTML Templates",
      "Framework-agnostic components"
    ],
    "company": "Microsoft"
  },
  {
    "id": 246,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is LocalStorage vs SessionStorage vs Cookies?",
    "tips": "LocalStorage = persistent; SessionStorage = tab session; Cookies = sent with HTTP requests.",
    "keywords": [
      "localstorage",
      "sessionstorage",
      "cookie",
      "httponly",
      "storage"
    ],
    "ideal_points": [
      "Capacity limits (5MB vs 4KB)",
      "Expiration rules",
      "HttpOnly & Secure cookie flags",
      "SameSite attribute"
    ],
    "company": "Meta"
  },
  {
    "id": 247,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Medium",
    "title": "Explain CSS Flexbox Properties (`justify-content`, `align-items`, `flex-grow`).",
    "tips": "Properties controlling alignment along main axis and cross axis.",
    "keywords": [
      "flexbox",
      "justify-content",
      "align-items",
      "flex-grow",
      "flex-shrink"
    ],
    "ideal_points": [
      "Main axis vs Cross axis",
      "justify-content options",
      "align-items options",
      "flex-grow & flex-shrink ratios"
    ],
    "company": "Uber"
  },
  {
    "id": 248,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is Responsive Web Design (Media Queries, Mobile-First)?",
    "tips": "Designing layouts that adapt to screen sizes. Mobile-first starts styling from smallest screens.",
    "keywords": [
      "responsive",
      "media queries",
      "mobile-first",
      "viewport",
      "breakpoints"
    ],
    "ideal_points": [
      "`@media (min-width: ...)` syntax",
      "Fluid layouts & rem/em units",
      "Viewport meta tag",
      "Breakpoint design system"
    ],
    "company": "Oracle"
  },
  {
    "id": 249,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Medium",
    "title": "Explain React Component Lifecycle (Mounting, Updating, Unmounting).",
    "tips": "Functional components handle lifecycle via `useEffect` hooks.",
    "keywords": [
      "lifecycle",
      "mounting",
      "updating",
      "unmounting",
      "useeffect"
    ],
    "ideal_points": [
      "Mounting phase setup",
      "Updating phase dependencies",
      "Unmounting cleanup function",
      "Legacy class lifecycle equivalents"
    ],
    "company": "Flipkart"
  },
  {
    "id": 250,
    "category": "Frontend",
    "role": "Frontend Engineer",
    "difficulty": "Easy",
    "title": "What is TypeScript and Benefits over JavaScript?",
    "tips": "Statically typed superset of JS catching type errors at compile-time.",
    "keywords": [
      "typescript",
      "type",
      "interface",
      "generic",
      "compile time"
    ],
    "ideal_points": [
      "Static type checking",
      "Interfaces vs Type aliases",
      "Generics for reusable code",
      "Developer tooling & IntelliSense"
    ],
    "company": "Infosys"
  },
  {
    "id": 251,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain Python Global Interpreter Lock (GIL) and Multithreading vs Multiprocessing.",
    "tips": "GIL prevents parallel execution of bytecode in CPython. Use multiprocessing for CPU-bound tasks.",
    "keywords": [
      "gil",
      "cpython",
      "multithreading",
      "multiprocessing",
      "asyncio"
    ],
    "ideal_points": [
      "GIL explanation",
      "CPU-bound vs I/O-bound tasks",
      "Multiprocessing process memory",
      "Asyncio event loop"
    ],
    "company": "TCS"
  },
  {
    "id": 252,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is the difference between List, Tuple, Set, and Dictionary in Python?",
    "tips": "List = mutable ordered; Tuple = immutable ordered; Set = unordered unique; Dict = Key-Value pairs.",
    "keywords": [
      "list",
      "tuple",
      "set",
      "dict",
      "mutable",
      "immutable"
    ],
    "ideal_points": [
      "Mutability differences",
      "Time complexity (List O(N) vs Set/Dict O(1) lookup)",
      "Tuple hashability as dict keys",
      "Memory efficiency"
    ],
    "company": "Google"
  },
  {
    "id": 253,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain Python Decorators and `@functools.wraps`.",
    "tips": "Functions that modify behavior of another function without changing its source code.",
    "keywords": [
      "decorator",
      "wrapper",
      "functools",
      "wraps",
      "closure"
    ],
    "ideal_points": [
      "First-class functions concept",
      "Nested wrapper function syntax",
      "@wraps preserving docstrings & name",
      "Decorator with arguments"
    ],
    "company": "Amazon"
  },
  {
    "id": 254,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "What are Python Generators and `yield` keyword?",
    "tips": "Iterators that generate values one at a time on demand (lazy evaluation), saving memory.",
    "keywords": [
      "generator",
      "yield",
      "iterator",
      "lazy evaluation",
      "memory"
    ],
    "ideal_points": [
      "`yield` vs `return`",
      "Memory efficiency for large datasets",
      "Generator expressions",
      "`next()` function mechanism"
    ],
    "company": "Microsoft"
  },
  {
    "id": 255,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is List Comprehension and Dictionary Comprehension?",
    "tips": "Concise syntax for creating lists/dicts from iterables `[x**2 for x in nums if x > 0]`.",
    "keywords": [
      "list comprehension",
      "dict comprehension",
      "filter",
      "map",
      "syntax"
    ],
    "ideal_points": [
      "Syntax structure",
      "Replacing `map()` and `filter()`",
      "Nested comprehensions",
      "Readability vs complexity"
    ],
    "company": "Meta"
  },
  {
    "id": 256,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain `*args` and `**kwargs` in Python function arguments.",
    "tips": "`*args` passes variable positional arguments as tuple; `**kwargs` passes keyword arguments as dict.",
    "keywords": [
      "args",
      "kwargs",
      "positional",
      "keyword",
      "arguments"
    ],
    "ideal_points": [
      "`*args` tuple packing",
      "`**kwargs` dict packing",
      "Argument ordering rules",
      "Unpacking operators in function calls"
    ],
    "company": "Uber"
  },
  {
    "id": 257,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is `__init__` vs `__new__` in Python OOP?",
    "tips": "`__new__` creates object instance; `__init__` initializes created object instance.",
    "keywords": [
      "__init__",
      "__new__",
      "dunder",
      "instantiation",
      "singleton"
    ],
    "ideal_points": [
      "`__new__` static method returning instance",
      "`__init__` initializer returning None",
      "Overriding `__new__` for Singletons/Immutable types",
      "Object lifecycle"
    ],
    "company": "Oracle"
  },
  {
    "id": 258,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain Python Memory Management and Garbage Collection (Reference Counting + Cyclical GC).",
    "tips": "Python uses reference counting as primary mechanism, plus generational GC for cyclic references.",
    "keywords": [
      "memory management",
      "garbage collection",
      "reference counting",
      "gc module",
      "cyclical"
    ],
    "ideal_points": [
      "Reference count increment/decrement",
      "Cyclic reference problem",
      "Generational GC (Gen 0, 1, 2)",
      "The `gc` module"
    ],
    "company": "Flipkart"
  },
  {
    "id": 259,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is the difference between `is` and `==` in Python?",
    "tips": "`==` checks value equality; `is` checks memory identity (same object in RAM).",
    "keywords": [
      "is",
      "==",
      "equality",
      "identity",
      "id()"
    ],
    "ideal_points": [
      "Value equality vs Memory address",
      "Integer caching / String interning",
      "`is None` best practice",
      "`id()` built-in function"
    ],
    "company": "Infosys"
  },
  {
    "id": 260,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain `asyncio`, `async`, and `await` in Python.",
    "tips": "Asynchronous I/O library using event loop for single-threaded concurrent code.",
    "keywords": [
      "asyncio",
      "async",
      "await",
      "event loop",
      "coroutine",
      "non-blocking"
    ],
    "ideal_points": [
      "Coroutines definition",
      "Event loop mechanism",
      "Non-blocking I/O operations",
      "Task gathering `asyncio.gather()`"
    ],
    "company": "TCS"
  },
  {
    "id": 261,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "What are Python Context Managers and `with` statement (`__enter__`, `__exit__`)?",
    "tips": "Manages setup and teardown resources cleanly (e.g. file opening, DB connections).",
    "keywords": [
      "context manager",
      "with",
      "__enter__",
      "__exit__",
      "resource management"
    ],
    "ideal_points": [
      "Resource leak prevention",
      "`__enter__` and `__exit__` dunder methods",
      "Exception handling in `__exit__`",
      "`@contextmanager` decorator"
    ],
    "company": "Google"
  },
  {
    "id": 262,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is Deepcopy vs Shallowcopy in Python (`copy` module)?",
    "tips": "Shallow copy creates new object but copies references; Deep copy recursively duplicates all sub-objects.",
    "keywords": [
      "deepcopy",
      "copy",
      "shallow",
      "mutable",
      "reference"
    ],
    "ideal_points": [
      "`copy.copy()` vs `copy.deepcopy()`",
      "Nested list / dict mutation behavior",
      "Custom copy implementations",
      "Memory overhead"
    ],
    "company": "Amazon"
  },
  {
    "id": 263,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain Python Special Dunder Methods (`__str__`, `__repr__`, `__call__`, `__len__`).",
    "tips": "Magic methods enabling built-in language features for custom classes.",
    "keywords": [
      "dunder",
      "__str__",
      "__repr__",
      "__call__",
      "magic methods"
    ],
    "ideal_points": [
      "`__str__` user-friendly vs `__repr__` developer-friendly",
      "`__call__` making object callable like function",
      "Operator overloading (`__add__`)",
      "Container dunders (`__getitem__`)"
    ],
    "company": "Microsoft"
  },
  {
    "id": 264,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is the `pass`, `continue`, and `break` keywords in Python?",
    "tips": "`break` exits loop; `continue` skips to next iteration; `pass` is null statement placeholder.",
    "keywords": [
      "break",
      "continue",
      "pass",
      "loop",
      "control flow"
    ],
    "ideal_points": [
      "`break` loop termination",
      "`continue` iteration skip",
      "`pass` syntactical placeholder",
      "Loop `else` clause behavior"
    ],
    "company": "Meta"
  },
  {
    "id": 265,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain Type Hinting in Python (`typing` module) and Pydantic.",
    "tips": "Provides static type annotations for code clarity and automated runtime data validation.",
    "keywords": [
      "type hints",
      "typing",
      "pydantic",
      "type safety",
      "annotation"
    ],
    "ideal_points": [
      "Type annotation syntax `x: int = 5`",
      "`typing` module (List, Dict, Optional, Union)",
      "Pydantic BaseModel data validation",
      "MyPy static type checker"
    ],
    "company": "Uber"
  },
  {
    "id": 266,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is a Lambda Function in Python?",
    "tips": "Small anonymous inline function defined with `lambda arguments: expression`.",
    "keywords": [
      "lambda",
      "anonymous function",
      "map",
      "filter",
      "inline"
    ],
    "ideal_points": [
      "Lambda syntax constraints (single expression)",
      "Using with `map()`, `filter()`, `sorted()`",
      "Readability guidelines",
      "Anonymous function scope"
    ],
    "company": "Oracle"
  },
  {
    "id": 267,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is `monkey patching` in Python?",
    "tips": "Dynamically modifying a module or class at runtime.",
    "keywords": [
      "monkey patch",
      "runtime modification",
      "gevent",
      "mocking",
      "testing"
    ],
    "ideal_points": [
      "Modifying class/module at runtime",
      "Testing & Mocking applications",
      "Risks of unexpected side effects",
      "Gevent / Eventlet I/O patching"
    ],
    "company": "Flipkart"
  },
  {
    "id": 268,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain `dataclass` in Python 3.7+ (`@dataclass`).",
    "tips": "Decorator that automatically generates `__init__`, `__repr__`, `__eq__` for data classes.",
    "keywords": [
      "dataclass",
      "decorator",
      "boilerplate",
      "fields",
      "frozen"
    ],
    "ideal_points": [
      "Automatic `__init__` generation",
      "Type annotations requirement",
      "`frozen=True` for immutability",
      "`field(default_factory=...)` for mutable defaults"
    ],
    "company": "Infosys"
  },
  {
    "id": 269,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is the difference between `func(*args)` and unpacking operator?",
    "tips": "Unpacking operator `*` unpacks iterables into positional arguments; `**` unpacks dicts.",
    "keywords": [
      "unpacking",
      "asterisk",
      "list unpacking",
      "dict unpacking"
    ],
    "ideal_points": [
      "Unpacking lists `[*a, *b]`",
      "Unpacking dicts `{**a, **b}`",
      "Function call argument expansion",
      "Multiple assignment"
    ],
    "company": "TCS"
  },
  {
    "id": 270,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is `sys.path` and how does Python import modules?",
    "tips": "List of directory strings Python searches when importing a module.",
    "keywords": [
      "sys.path",
      "import",
      "module",
      "package",
      "__init__.py"
    ],
    "ideal_points": [
      "Search order: Built-in -> Current dir -> PYTHONPATH -> Site-packages",
      "Modifying `sys.path` dynamically",
      "`__init__.py` package marker",
      "Relative vs Absolute imports"
    ],
    "company": "Google"
  },
  {
    "id": 271,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain Abstract Base Classes (ABC) in Python (`abc` module).",
    "tips": "Defines common API interface contracts using `@abstractmethod` decorator.",
    "keywords": [
      "abc",
      "abstract base class",
      "abstractmethod",
      "interface"
    ],
    "ideal_points": [
      "`from abc import ABC, abstractmethod`",
      "Enforcing method implementation in subclasses",
      "Cannot instantiate abstract class",
      "Interface contract in Python"
    ],
    "company": "Amazon"
  },
  {
    "id": 272,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is a Docstring and Doctest in Python?",
    "tips": "Triple-quoted strings documenting modules/classes/functions. Doctests test code snippets in docstrings.",
    "keywords": [
      "docstring",
      "doctest",
      "documentation",
      "pep 257",
      "sphinx"
    ],
    "ideal_points": [
      "PEP 257 docstring conventions",
      "`__doc__` attribute",
      "`doctest` execution module",
      "Sphinx documentation generation"
    ],
    "company": "Microsoft"
  },
  {
    "id": 273,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Medium",
    "title": "Explain `map()`, `filter()`, and `reduce()` built-ins.",
    "tips": "Functional programming tools. `map` transforms; `filter` selects; `reduce` aggregates.",
    "keywords": [
      "map",
      "filter",
      "reduce",
      "functools",
      "functional"
    ],
    "ideal_points": [
      "`map(func, iterable)` transformation",
      "`filter(pred, iterable)` selection",
      "`functools.reduce(func, iterable)` aggregation",
      "Comprehensions preference in Python"
    ],
    "company": "Meta"
  },
  {
    "id": 274,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is Exception Handling in Python (`try-except-else-finally`)?",
    "tips": "Error management block. `else` runs if no error; `finally` always runs.",
    "keywords": [
      "exception",
      "try",
      "except",
      "else",
      "finally",
      "custom exception"
    ],
    "ideal_points": [
      "Catching specific exceptions",
      "`else` block execution condition",
      "`finally` cleanup guarantee",
      "Creating custom Exception subclasses"
    ],
    "company": "Uber"
  },
  {
    "id": 275,
    "category": "Python",
    "role": "Python Developer",
    "difficulty": "Easy",
    "title": "What is Python Virtual Environment (`venv`, `virtualenv`, `conda`)?",
    "tips": "Isolated directory tree containing Python executable and independent package dependencies.",
    "keywords": [
      "venv",
      "virtual environment",
      "pip",
      "isolation",
      "site-packages"
    ],
    "ideal_points": [
      "Isolation from global site-packages",
      "Creating with `python -m venv venv`",
      "Activation scripts",
      "`requirements.txt` freeze"
    ],
    "company": "Oracle"
  },
  {
    "id": 276,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Hard",
    "title": "Explain JVM Architecture (JIT Compiler, ClassLoader, Execution Engine).",
    "tips": "JVM loads bytecode, interprets/compiles to machine code via JIT, and executes.",
    "keywords": [
      "jvm",
      "jit",
      "classloader",
      "bytecode",
      "execution engine"
    ],
    "ideal_points": [
      "ClassLoader phases (Loading, Linking, Initialization)",
      "Execution Engine & JIT compiler",
      "JVM Garbage Collector",
      "Platform independence"
    ],
    "company": "Flipkart"
  },
  {
    "id": 277,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "Difference between Heap Memory and Stack Memory in Java.",
    "tips": "Heap stores objects (shared, GC managed); Stack stores primitives & thread execution frames.",
    "keywords": [
      "heap",
      "stack",
      "memory",
      "garbage collection",
      "thread"
    ],
    "ideal_points": [
      "Heap = shared object storage",
      "Stack = thread-local frame storage",
      "StackOverflowError vs OutOfMemoryError",
      "Reference pointers on Stack"
    ],
    "company": "Infosys"
  },
  {
    "id": 278,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is Java Garbage Collection and how does Mark and Sweep work?",
    "tips": "Automated memory management reclaiming unreferenced heap objects.",
    "keywords": [
      "garbage collection",
      "mark and sweep",
      "heap",
      "gc",
      "memory leak"
    ],
    "ideal_points": [
      "Mark phase identifies live objects",
      "Sweep phase reclaims dead memory",
      "Generational GC (Young, Old, Tenured)",
      "G1GC and ZGC collectors"
    ],
    "company": "TCS"
  },
  {
    "id": 279,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "Explain the difference between `String`, `StringBuilder`, and `StringBuffer`.",
    "tips": "String = immutable; StringBuilder = mutable, unsynchronized (fast); StringBuffer = mutable, synchronized (thread-safe).",
    "keywords": [
      "string",
      "stringbuilder",
      "stringbuffer",
      "immutable",
      "thread-safe"
    ],
    "ideal_points": [
      "Immutability of String class",
      "String Pool concept",
      "StringBuilder for single-threaded string manipulation",
      "StringBuffer for thread-safe operations"
    ],
    "company": "Google"
  },
  {
    "id": 280,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is the Java String Constant Pool?",
    "tips": "Special memory area in Heap that stores unique string literals to save memory.",
    "keywords": [
      "string pool",
      "heap",
      "literal",
      "intern",
      "immutable"
    ],
    "ideal_points": [
      "String literal caching",
      "Creation via `\"abc\"` vs `new String(\"abc\")`",
      "`String.intern()` method",
      "Memory optimization"
    ],
    "company": "Amazon"
  },
  {
    "id": 281,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Medium",
    "title": "Explain HashMap internal implementation in Java (Buckets, Hash code, Red-Black Trees in Java 8).",
    "tips": "Array of Node buckets. Collisions use LinkedList; converted to Red-Black Tree when bucket size > 8.",
    "keywords": [
      "hashmap",
      "bucket",
      "hashcode",
      "equals",
      "red-black tree",
      "collision"
    ],
    "ideal_points": [
      "`hashCode()` and `equals()` contract",
      "Bucket index calculation `hash & (n-1)`",
      "Collision handling via LinkedList",
      "Java 8 Treeification threshold (8)"
    ],
    "company": "Microsoft"
  },
  {
    "id": 282,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is the contract between `hashCode()` and `equals()` in Java?",
    "tips": "If two objects are equal by `equals()`, their `hashCode()` MUST be identical.",
    "keywords": [
      "hashcode",
      "equals",
      "contract",
      "hashmap",
      "override"
    ],
    "ideal_points": [
      "Equal objects must have equal hashCodes",
      "Unequal objects can share same hashCode (collision)",
      "Must override both when creating custom key objects",
      "HashMap breakdown if violated"
    ],
    "company": "Meta"
  },
  {
    "id": 283,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Medium",
    "title": "Explain Java 8 Features: Stream API, Lambda Expressions, Functional Interfaces, Optional.",
    "tips": "Major modernization adding functional programming features to Java.",
    "keywords": [
      "java 8",
      "stream api",
      "lambda",
      "functional interface",
      "optional"
    ],
    "ideal_points": [
      "Lambda syntax `(a, b) -> a + b`",
      "@FunctionalInterface single abstract method",
      "Stream map/filter/reduce pipeline",
      "Optional avoiding NullPointerException"
    ],
    "company": "Uber"
  },
  {
    "id": 284,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is the difference between `checked` and `unchecked` exceptions in Java?",
    "tips": "Checked exceptions (Exception) must be caught/declared at compile-time; Unchecked (RuntimeException) occur at runtime.",
    "keywords": [
      "checked",
      "unchecked",
      "exception",
      "runtimeexception",
      "compile-time"
    ],
    "ideal_points": [
      "Checked exceptions inherit Exception",
      "Unchecked inherit RuntimeException",
      "Throws clause requirement",
      "NullPointerException & ArrayIndexOutOfBounds examples"
    ],
    "company": "Oracle"
  },
  {
    "id": 285,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Medium",
    "title": "Explain Multithreading in Java (Thread class, Runnable interface, ExecutorService).",
    "tips": "Executing multiple threads concurrently to maximize CPU utilization.",
    "keywords": [
      "thread",
      "runnable",
      "executorservice",
      "multithreading",
      "thread pool"
    ],
    "ideal_points": [
      "`Thread` vs `Runnable` interface",
      "ExecutorService thread pools",
      "Callable and Future<V>",
      "Thread lifecycle states"
    ],
    "company": "Flipkart"
  },
  {
    "id": 286,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is `synchronized` keyword and Volatile variable in Java?",
    "tips": "`synchronized` locks object/class for thread safety; `volatile` guarantees visibility of variable reads/writes across threads.",
    "keywords": [
      "synchronized",
      "volatile",
      "thread safe",
      "lock",
      "memory visibility"
    ],
    "ideal_points": [
      "Synchronized method / block locking",
      "Reentrant lock behavior",
      "Volatile CPU cache flushing (visibility)",
      "Volatile does NOT guarantee atomicity"
    ],
    "company": "Infosys"
  },
  {
    "id": 287,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is the difference between `Comparable` and `Comparator` interfaces?",
    "tips": "Comparable defines natural sorting inside class (`compareTo`); Comparator defines custom external sorting (`compare`).",
    "keywords": [
      "comparable",
      "comparator",
      "sort",
      "compareto",
      "compare"
    ],
    "ideal_points": [
      "Comparable `compareTo(T o)` single natural order",
      "Comparator `compare(T o1, T o2)` multiple custom orders",
      "Collections.sort() usage",
      "Java 8 Comparator lambda methods"
    ],
    "company": "TCS"
  },
  {
    "id": 288,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Medium",
    "title": "Explain Java Collections Framework Hierarchy (List, Set, Queue, Map).",
    "tips": "Root interfaces for working with object collections.",
    "keywords": [
      "collections",
      "list",
      "set",
      "queue",
      "map",
      "arraylist"
    ],
    "ideal_points": [
      "Collection root interface (Map is separate)",
      "List (ArrayList, LinkedList) ordered with index",
      "Set (HashSet, TreeSet) unique elements",
      "Map (HashMap, TreeMap) key-value pairs"
    ],
    "company": "Google"
  },
  {
    "id": 289,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Medium",
    "title": "ArrayList vs LinkedList in Java.",
    "tips": "ArrayList uses dynamic array (fast random access O(1)); LinkedList uses doubly-linked list (fast insert/delete O(1)).",
    "keywords": [
      "arraylist",
      "linkedlist",
      "random access",
      "node",
      "performance"
    ],
    "ideal_points": [
      "O(1) random access vs O(N)",
      "Memory overhead per node in LinkedList",
      "Array resizing & copying penalty",
      "Insertion / Deletion performance"
    ],
    "company": "Amazon"
  },
  {
    "id": 290,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is `final`, `finally`, and `finalize` in Java?",
    "tips": "final = constant/un-overridable; finally = try-catch cleanup block; finalize = deprecated GC cleanup method.",
    "keywords": [
      "final",
      "finally",
      "finalize",
      "keyword",
      "cleanup"
    ],
    "ideal_points": [
      "final variable/method/class",
      "finally block execution guarantee",
      "finalize() method deprecation",
      "Contrast summary"
    ],
    "company": "Microsoft"
  },
  {
    "id": 291,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Medium",
    "title": "Explain Java Reflection API.",
    "tips": "Allows inspecting and modifying classes, interfaces, fields, and methods at runtime.",
    "keywords": [
      "reflection",
      "inspect",
      "runtime",
      "class",
      "private field"
    ],
    "ideal_points": [
      "`Class.forName()` loading",
      "Accessing private fields/methods",
      "Framework usage (Spring, JUnit, Hibernate)",
      "Performance & Security penalties"
    ],
    "company": "Meta"
  },
  {
    "id": 292,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is Spring Boot and Annotations (`@RestController`, `@Autowired`, `@Service`, `@Repository`)?",
    "tips": "Opinionated framework for building standalone production-grade Spring applications rapidly.",
    "keywords": [
      "spring boot",
      "annotation",
      "autowired",
      "restcontroller",
      "dependency injection"
    ],
    "ideal_points": [
      "Auto-configuration concept",
      "@RestController combines @Controller & @ResponseBody",
      "@Autowired component dependency injection",
      "Layered architecture (@Service, @Repository)"
    ],
    "company": "Uber"
  },
  {
    "id": 293,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Medium",
    "title": "Explain Spring Dependency Injection and Bean Lifecycles.",
    "tips": "Spring IoC container manages creation, configuration, and destruction of Beans.",
    "keywords": [
      "spring",
      "bean",
      "singleton",
      "prototype",
      "scope",
      "lifecycle"
    ],
    "ideal_points": [
      "Bean scopes (Singleton, Prototype, Request, Session)",
      "Postconstruct & Predestroy annotations",
      "IoC Container application context",
      "Circular dependency handling"
    ],
    "company": "Oracle"
  },
  {
    "id": 294,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is Abstract Class vs Interface in Java 8+?",
    "tips": "Interface supports default/static methods and multiple inheritance; Abstract class can have state/constructors.",
    "keywords": [
      "interface",
      "abstract class",
      "default method",
      "state",
      "inheritance"
    ],
    "ideal_points": [
      "Default & Static methods in Java 8 interfaces",
      "State (instance fields) restriction in interfaces",
      "Multiple interface implementation",
      "Single class inheritance rule"
    ],
    "company": "Flipkart"
  },
  {
    "id": 295,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Medium",
    "title": "Explain Try-with-Resources statement in Java 7+.",
    "tips": "Automatically closes resources implementing `AutoCloseable` interface after try block exits.",
    "keywords": [
      "try-with-resources",
      "autocloseable",
      "resource leak",
      "close()",
      "stream"
    ],
    "ideal_points": [
      "Syntax `try (BufferedReader br = ...) {}`",
      "AutoCloseable interface requirement",
      "Suppressed exceptions handling",
      "Replaces messy finally blocks"
    ],
    "company": "Infosys"
  },
  {
    "id": 296,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is `CompletableFuture` in Java 8?",
    "tips": "Asynchronous programming framework supporting non-blocking pipeline chaining (`thenApply`, `thenCombine`).",
    "keywords": [
      "completablefuture",
      "async",
      "future",
      "non-blocking",
      "thread"
    ],
    "ideal_points": [
      "Asynchronous task composition",
      "`thenApply()`, `thenAccept()`, `thenCombine()`",
      "Handling exceptions asynchronously",
      "ForkJoinPool.commonPool()"
    ],
    "company": "TCS"
  },
  {
    "id": 297,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is Java Module System (Project Jigsaw in Java 9+)?",
    "tips": "Introduced `module-info.java` to group packages into named modules with explicit exports and requires.",
    "keywords": [
      "module",
      "java 9",
      "module-info",
      "exports",
      "requires",
      "jlink"
    ],
    "ideal_points": [
      "Encapsulation at package level",
      "`exports` and `requires` directives",
      "Custom JRE runtime creation with `jlink`",
      "Classpath vs Modulepath"
    ],
    "company": "Google"
  },
  {
    "id": 298,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is the difference between `fail-fast` and `fail-safe` Iterators?",
    "tips": "Fail-fast throws `ConcurrentModificationException` if collection is modified during iteration; Fail-safe operates on a copy.",
    "keywords": [
      "fail-fast",
      "fail-safe",
      "iterator",
      "concurrentmodificationexception",
      "copyonwritearraylist"
    ],
    "ideal_points": [
      "Fail-fast (ArrayList, HashMap iterators)",
      "Fail-safe (ConcurrentHashMap, CopyOnWriteArrayList)",
      "ModCount check",
      "Copy-on-write overhead"
    ],
    "company": "Amazon"
  },
  {
    "id": 299,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Medium",
    "title": "Explain Java Generics (`<T>`, Wildcards `? extends T`, `? super T`) and Type Erasure.",
    "tips": "Provides compile-time type safety. Compiler erases generic types to `Object` in bytecode.",
    "keywords": [
      "generics",
      "wildcard",
      "type erasure",
      "extends",
      "super",
      "producer extends consumer super"
    ],
    "ideal_points": [
      "PECS rule (Producer Extends, Consumer Super)",
      "Type erasure bytecode backward compatibility",
      "Compile-time safety without runtime overhead",
      "Cannot instantiate generic array `new T[]`"
    ],
    "company": "Microsoft"
  },
  {
    "id": 300,
    "category": "Java",
    "role": "Java Developer",
    "difficulty": "Easy",
    "title": "What is `ConcurrentHashMap` and how does it achieve thread safety in Java 8?",
    "tips": "Uses bucket-level locking (synchronized on bucket head) and CAS (Compare-And-Swap) operations.",
    "keywords": [
      "concurrenthashmap",
      "thread-safe",
      "cas",
      "bucket lock",
      "segment"
    ],
    "ideal_points": [
      "Segment locking (Java 7) vs Bucket head locking (Java 8)",
      "CAS (Compare-And-Swap) non-blocking updates",
      "No global lock (unlike Hashtable)",
      "Null keys/values disallowed"
    ],
    "company": "Meta"
  }
];
