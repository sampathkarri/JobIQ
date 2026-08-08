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
  // ==================== DBMS ====================
  {
    id: 1, category: "DBMS", role: "Database Engineer", difficulty: "Medium",
    title: "Explain ACID properties in Database Management Systems with real-world examples.",
    tips: "Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions), Durability (persisted committed data).",
    keywords: ["acid", "atomicity", "consistency", "isolation", "durability", "transaction", "commit", "rollback"],
    ideal_points: ["Define each ACID letter", "Transaction isolation levels", "Bank transfer example", "Write-ahead logging (WAL)"],
    company: "Oracle"
  },
  {
    id: 2, category: "DBMS", role: "Backend Engineer", difficulty: "Hard",
    title: "What is Database Normalization? Explain 1NF, 2NF, 3NF, and BCNF.",
    tips: "Focus on reducing data redundancy, partial dependency removal (2NF), and transitive dependency removal (3NF).",
    keywords: ["normalization", "1nf", "2nf", "3nf", "bcnf", "redundancy", "dependency", "primary key", "foreign key"],
    ideal_points: ["1NF atomic values", "2NF no partial dependency", "3NF no transitive dependency", "BCNF strict 3NF", "Denormalization trade-offs"],
    company: "Amazon"
  },
  {
    id: 3, category: "DBMS", role: "Database Administrator", difficulty: "Medium",
    title: "How do B-Tree and B+ Tree indexes speed up database queries? What is indexing overhead?",
    tips: "Explain logarithmic search O(log N), disk block reads, leaf node linked lists in B+ trees for range queries.",
    keywords: ["index", "b-tree", "b+tree", "binary search", "range query", "overhead", "write penalty", "leaf node"],
    ideal_points: ["B-Tree vs B+ Tree structure", "Range query efficiency", "Clustered vs Non-clustered index", "Write/Insert performance trade-off"],
    company: "Microsoft"
  },
  {
    id: 4, category: "DBMS", role: "Systems Engineer", difficulty: "Hard",
    title: "Explain Database Deadlocks and methods to prevent or detect them.",
    tips: "Mutual exclusion, hold and wait, no preemption, circular wait. Detection via wait-for graph.",
    keywords: ["deadlock", "circular wait", "mutex", "lock", "prevention", "detection", "wait-for graph", "rollback"],
    ideal_points: ["4 necessary deadlock conditions", "Wait-for graph detection", "Two-phase locking (2PL)", "Lock timeouts"],
    company: "Goldman Sachs"
  },

  // ==================== OOPs ====================
  {
    id: 5, category: "OOPs", role: "Software Developer", difficulty: "Easy",
    title: "Explain the 4 main pillars of Object-Oriented Programming (Encapsulation, Abstraction, Inheritance, Polymorphism).",
    tips: "Use real-world analogies like a car driving interface (abstraction) or engine internals (encapsulation).",
    keywords: ["encapsulation", "abstraction", "inheritance", "polymorphism", "class", "object", "interface", "override"],
    ideal_points: ["Encapsulation via access modifiers", "Abstraction hiding complexity", "Inheritance code reuse", "Compile-time vs runtime polymorphism"],
    company: "TCS / Infosys"
  },
  {
    id: 6, category: "OOPs", role: "Full-Stack Engineer", difficulty: "Medium",
    title: "What is the difference between Method Overloading and Method Overriding?",
    tips: "Overloading: same class, same method name, different parameters (compile-time). Overriding: parent/child class, exact signature (runtime).",
    keywords: ["overloading", "overriding", "polymorphism", "compile time", "runtime", "signature", "virtual", "super"],
    ideal_points: ["Compile-time vs Runtime polymorphism", "Same vs parent-child class", "Return type and parameter rules", "Virtual/override keywords"],
    company: "Wipro"
  },
  {
    id: 7, category: "OOPs", role: "Senior Developer", difficulty: "Medium",
    title: "What are SOLID principles? Explain single responsibility and open-closed principle.",
    tips: "S = Single Responsibility, O = Open for extension / closed for modification, L = Liskov, I = Interface segregation, D = Dependency inversion.",
    keywords: ["solid", "single responsibility", "open closed", "liskov", "interface segregation", "dependency inversion", "design pattern"],
    ideal_points: ["S: One reason to change", "O: Extension without modification", "L: Subtypes substitutable", "D: Depend on abstractions"],
    company: "Thoughtworks"
  },

  // ==================== Computer Networks ====================
  {
    id: 8, category: "Computer Networks", role: "Network / Backend Engineer", difficulty: "Medium",
    title: "Explain the OSI 7-Layer Model and map TCP/IP stack to it.",
    tips: "Physical, Data Link, Network, Transport, Session, Presentation, Application. Focus on L3 (IP), L4 (TCP/UDP), L7 (HTTP).",
    keywords: ["osi", "tcp/ip", "transport", "network", "application", "packet", "frame", "segment", "router", "switch"],
    ideal_points: ["7 Layers named in order", "Data encapsulation (header/trailer)", "Router at L3, Switch at L2", "TCP/IP 4-layer mapping"],
    company: "Cisco"
  },
  {
    id: 9, category: "Computer Networks", role: "Software Engineer", difficulty: "Medium",
    title: "How does the TCP 3-Way Handshake work during connection establishment?",
    tips: "SYN (synchronize) → SYN-ACK (acknowledge) → ACK. Also mention FIN 4-way handshake for termination.",
    keywords: ["tcp", "3-way handshake", "syn", "syn-ack", "ack", "seq number", "connection", "reliable", "socket"],
    ideal_points: ["SYN from client", "SYN-ACK from server", "ACK from client", "Sequence numbers initialization", "Reliable transmission"],
    company: "Google"
  },
  {
    id: 10, category: "Computer Networks", role: "Web Developer", difficulty: "Easy",
    title: "What happens under the hood when you type a URL like 'https://google.com' into your browser?",
    tips: "DNS resolution → TCP connection → TLS handshake → HTTP GET request → Server Response → Browser rendering.",
    keywords: ["dns", "ip address", "tcp", "tls", "ssl", "http", "rendering", "cache", "socket", "request"],
    ideal_points: ["DNS lookup hierarchy", "TCP handshake", "TLS certificate exchange", "HTTP GET/Response cycle", "DOM Parsing"],
    company: "Amazon"
  },

  // ==================== Software Eng ====================
  {
    id: 11, category: "Software Eng", role: "Software Engineer", difficulty: "Medium",
    title: "What is CI/CD (Continuous Integration / Continuous Deployment) and why is it important?",
    tips: "CI: automated build and test on commit. CD: automated deployment to staging/production.",
    keywords: ["ci/cd", "continuous integration", "continuous deployment", "pipeline", "jenkins", "github actions", "automated testing"],
    ideal_points: ["Automated testing on push", "Deployment pipelines", "Reduced release risk", "Faster feedback loops"],
    company: "Atlassian"
  },
  {
    id: 12, category: "Software Eng", role: "Agile Practitioner", difficulty: "Easy",
    title: "Explain Agile methodology, Scrum framework, Sprint planning, and Daily Standups.",
    tips: "Iterative development, 2-week sprints, product backlog, user stories, retrospectives.",
    keywords: ["agile", "scrum", "sprint", "standup", "backlog", "user story", "retrospective", "velocity"],
    ideal_points: ["Iterative development benefits", "Scrum ceremonies (Sprint, Daily, Retro)", "User stories & estimation", "Cross-functional teams"],
    company: "Accenture"
  },

  // ==================== Git ====================
  {
    id: 13, category: "Git", role: "DevOps / Developer", difficulty: "Medium",
    title: "What is the difference between Git Merge and Git Rebase? When should you use which?",
    tips: "Merge creates a merge commit preserving history. Rebase rewrites commit history linearly. Don't rebase shared public branches!",
    keywords: ["git", "merge", "rebase", "commit", "history", "branch", "conflict", "linear history", "pull request"],
    ideal_points: ["Merge creates 3-way merge commit", "Rebase rewrites commit history", "Linear commit history", "Golden rule: never rebase public main"],
    company: "GitHub"
  },
  {
    id: 14, category: "Git", role: "Software Developer", difficulty: "Easy",
    title: "How do you handle merge conflicts in Git?",
    tips: "Identify conflicted files, open conflict markers (<<<<<<<, =======, >>>>>>>), resolve manually, stage, and commit.",
    keywords: ["conflict", "merge conflict", "markers", "git status", "git add", "git commit", "head", "branch"],
    ideal_points: ["Understanding conflict markers", "Manual resolution strategy", "git status to inspect", "git add & commit completion"],
    company: "GitLab"
  },

  // ==================== SQL ====================
  {
    id: 15, category: "SQL", role: "Data / Backend Engineer", difficulty: "Medium",
    title: "Explain the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.",
    tips: "INNER: matches in both tables. LEFT: all rows from left + matched right. RIGHT: all right + matched left. FULL: all rows from both.",
    keywords: ["join", "inner join", "left join", "right join", "full join", "null", "on clause", "table"],
    ideal_points: ["INNER join intersection", "LEFT join preserve left table", "RIGHT join preserve right table", "FULL join union with NULLs"],
    company: "Flipkart"
  },
  {
    id: 16, category: "SQL", role: "Database Engineer", difficulty: "Hard",
    title: "What are SQL Window Functions (ROW_NUMBER, RANK, DENSE_RANK, OVER PARTITION BY)?",
    tips: "Window functions calculate values across a set of table rows related to current row without collapsing rows like GROUP BY.",
    keywords: ["window function", "over", "partition by", "row_number", "rank", "dense_rank", "order by", "analytics"],
    ideal_points: ["OVER (PARTITION BY ... ORDER BY ...)", "Difference between RANK and DENSE_RANK", "Running totals", "Top-N per group query pattern"],
    company: "Uber"
  },

  // ==================== DSA ====================
  {
    id: 17, category: "DSA", role: "SDE", difficulty: "Medium",
    title: "Explain how Binary Search works. What is its time and space complexity?",
    tips: "Requires sorted array. Divide and conquer: compare middle element, eliminate half the search space. O(log N) time, O(1) space iterative.",
    keywords: ["binary search", "sorted array", "log n", "divide and conquer", "middle", "pointer", "time complexity"],
    ideal_points: ["Prerequisite: sorted array", "Middle index comparison", "O(log N) time complexity", "Iterative vs recursive space complexity"],
    company: "Microsoft"
  },
  {
    id: 18, category: "DSA", role: "Algorithm Engineer", difficulty: "Hard",
    title: "Explain Dynamic Programming and the difference between Memoization (Top-Down) and Tabulation (Bottom-Up).",
    tips: "DP breaks problem into overlapping subproblems with optimal substructure. Memoization uses recursion + cache. Tabulation uses iterative table.",
    keywords: ["dynamic programming", "memoization", "tabulation", "top-down", "bottom-up", "subproblem", "cache", "fibonacci"],
    ideal_points: ["Overlapping subproblems", "Optimal substructure", "Top-Down (recursion + hashmap)", "Bottom-Up (DP array iteration)", "Space optimization"],
    company: "Google"
  },

  // ==================== HR ====================
  {
    id: 19, category: "HR", role: "Any Role", difficulty: "Easy",
    title: "Tell me about yourself and walk me through your resume.",
    tips: "Structure: Present role/studies → key technical achievements/projects → why you are excited for this opportunity.",
    keywords: ["background", "education", "projects", "skills", "achievement", "passion", "career goals"],
    ideal_points: ["Elevator pitch under 2 mins", "Highlight key tech stack", "Recent impact or projects", "Connection to target role"],
    company: "HR / Recruiter"
  },
  {
    id: 20, category: "HR", role: "Any Role", difficulty: "Easy",
    title: "What is your biggest weakness and how are you actively working to overcome it?",
    tips: "Pick a genuine professional weakness (e.g. difficulty delegating, public speaking, over-engineering), and explain actionable steps taken.",
    keywords: ["weakness", "improvement", "growth", "self-awareness", "learning", "action", "overcome"],
    ideal_points: ["Genuine self-aware weakness", "NOT a fake weakness like 'perfectionist'", "Specific corrective action taken", "Demonstrated progress"],
    company: "HR / Recruiter"
  },

  // ==================== Backend ====================
  {
    id: 21, category: "Backend", role: "Backend Engineer", difficulty: "Medium",
    title: "What is REST API design? Explain HTTP methods (GET, POST, PUT, PATCH, DELETE) and status codes.",
    tips: "Statelessness, resource-oriented URIs. GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove). 200, 201, 400, 401, 404, 500.",
    keywords: ["rest", "http", "get", "post", "put", "patch", "delete", "status code", "200", "404", "stateless"],
    ideal_points: ["Stateless constraint", "Resource URIs vs verbs", "PUT vs PATCH difference", "Status code ranges (2xx, 4xx, 5xx)"],
    company: "Paytm"
  },
  {
    id: 22, category: "Backend", role: "Senior Backend Developer", difficulty: "Hard",
    title: "How do API Rate Limiters work? Explain Leaky Bucket and Token Bucket algorithms.",
    tips: "Prevent DDoS and API abuse. Token bucket allows bursts; Leaky bucket smooths traffic output.",
    keywords: ["rate limit", "token bucket", "leaky bucket", "redis", "fixed window", "sliding window", "burst", "ddos"],
    ideal_points: ["Token bucket mechanism", "Leaky bucket mechanism", "Sliding window log vs counter", "Distributed rate limiting with Redis"],
    company: "Swiggy"
  },

  // ==================== Frontend ====================
  {
    id: 23, category: "Frontend", role: "Frontend Engineer", difficulty: "Medium",
    title: "Explain Virtual DOM in React and how the Reconciliation / Diffing algorithm works.",
    tips: "Virtual DOM is lightweight in-memory representation of real DOM. React diffs old and new VDOM trees and batches real DOM updates.",
    keywords: ["virtual dom", "react", "reconciliation", "diffing", "render", "batching", "keys", "performance"],
    ideal_points: ["In-memory JavaScript DOM representation", "O(N) heuristic diffing algorithm", "Importance of unique `key` prop", "Batching DOM mutations"],
    company: "Meta"
  },

  // ==================== Python ====================
  {
    id: 24, category: "Python", role: "Python Developer", difficulty: "Medium",
    title: "What is Python GIL (Global Interpreter Lock) and how does it impact multi-threading vs multi-processing?",
    tips: "GIL prevents true parallel thread execution of CPython bytecode. Use multi-processing or async I/O for concurrency.",
    keywords: ["gil", "global interpreter lock", "multithreading", "multiprocessing", "cpython", "asyncio", "cpu-bound", "i/o-bound"],
    ideal_points: ["GIL forces single-thread execution in CPython", "Impact on CPU-bound vs I/O-bound tasks", "Multiprocessing bypasses GIL", "Asyncio for I/O bound concurrency"],
    company: "Zomato"
  },

  // ==================== Java ====================
  {
    id: 25, category: "Java", role: "Java Developer", difficulty: "Medium",
    title: "Explain JVM architecture, Java Memory Model (Heap vs Stack), and Garbage Collection.",
    tips: "Heap stores objects (shared). Stack stores primitive types & thread execution frames. GC cleans unreachable heap objects.",
    keywords: ["jvm", "heap", "stack", "garbage collection", "memory", "mark and sweep", "bytecode", "jdk"],
    ideal_points: ["Heap memory vs Stack memory", "Garbage collection generations (Young, Old, Metaspace)", "Mark and Sweep algorithm", "OutOFMemoryError"],
    company: "Infosys / TCS"
  }
];
