# Nonprofit Risk Management Application

A React-based web application that helps nonprofit organizations dynamically assign financial and operational tasks to different roles and visualize how these assignments affect their internal control risks in real-time.

## Overview

This tool helps CPAs and nonprofit boards optimize their organizational structure to minimize fraud and error risks by:
- Testing different task assignment scenarios
- Identifying segregation of duties violations
- Detecting high-risk task combinations
- Providing actionable recommendations

## Features

### 1. Dynamic Task Assignment
- Assign 30+ financial and operational tasks to different roles
- Real-time conflict detection
- Visual status indicators (Assigned, Conflict, Unassigned)
- Filter tasks by category (Cash Receipt, Disbursement, Payroll, etc.)
- Risk weight visualization for each task

### 2. Risk Calculation Engine
- Automated segregation of duties violation detection
- High-risk combination identification
- Unassigned critical task tracking
- Workload distribution analysis
- Risk scoring (0-100 scale) with three levels:
  - Low Risk (0-30): Good segregation
  - Medium Risk (31-60): Some issues
  - High Risk (61-100): Significant weaknesses

### 3. Scenario Comparison
- Compare up to 4+ different organizational structures
- Side-by-side risk score visualization
- Copy and modify scenarios
- Rename scenarios for better organization
- Test "what if" questions instantly

### 4. Smart Recommendations
- Prioritized action items (High, Medium, Low)
- Specific guidance for resolving violations
- Workload balancing suggestions
- Severity ratings for each issue

### 5. Role Management
- 7 pre-defined roles (Treasurer, Executive Director, etc.)
- Add custom roles for unique positions
- Visual workload indicators
- Role type categorization (Board, Staff, External)
- Task count tracking per role

### 6. Data Persistence
- Save configurations to browser localStorage
- Export analysis as JSON
- Load saved configurations on app restart

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **Frontend Framework**: React 19 with hooks
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React useState hooks

## Project Structure

```
nonprofit-risk-app/
├── src/
│   ├── components/
│   │   ├── RiskDashboard.jsx       # Scenario comparison & risk details
│   │   ├── TaskAssignment.jsx      # Task assignment interface
│   │   ├── RoleManagement.jsx      # Role cards & custom role creation
│   │   └── Recommendations.jsx     # Prioritized action items
│   ├── data/
│   │   ├── roles.js                # Role definitions
│   │   ├── tasks.js                # Task definitions with conflicts
│   │   └── scenarios.js            # Initial scenario structure
│   ├── utils/
│   │   └── riskCalculation.js      # Risk scoring & recommendation logic
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles & Tailwind imports
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── package.json                    # Dependencies & scripts
```

## Key Data Structures

### Tasks
Each task includes:
- `id`: Unique identifier
- `name`: Display name
- `category`: Grouping (Cash Receipt, Disbursement, etc.)
- `riskWeight`: 1-10 scale of inherent risk
- `conflictsWith`: Array of task IDs that shouldn't be assigned together

### Roles
Each role includes:
- `id`: Unique identifier
- `name`: Display name
- `type`: Board, Staff, or External
- `icon`: Lucide React icon component
- `color`: Tailwind color scheme

### Scenarios
Each scenario includes:
- `name`: Scenario display name
- `assignments`: Object mapping task IDs to role IDs

## Usage Workflow

1. **Setup Phase**
   - Review default roles or add custom ones
   - Understand task categories and risk weights

2. **Assignment Phase**
   - Select a scenario to work on
   - Assign tasks to roles using dropdowns
   - Watch for immediate conflict indicators

3. **Analysis Phase**
   - Review overall risk score and level
   - Expand details to see specific violations
   - Compare multiple scenarios side-by-side

4. **Optimization Phase**
   - Follow recommendations to reduce risk
   - Reassign tasks to resolve conflicts
   - Test different organizational structures

5. **Documentation Phase**
   - Save configuration to browser
   - Export analysis report as JSON
   - Present findings to board/management

## Risk Calculation Logic

### Segregation of Duties Violations
The system checks if conflicting tasks are assigned to the same person:
- Example: Same person shouldn't "prepare checks" AND "sign checks"
- Points added based on task risk weights

### High-Risk Combinations
Detects dangerous control concentrations:
- Complete banking control (online access + signing + reconciliation)
- Complete cash receipt control (open mail + deposits + recording)
- Complete disbursement control (approve + prepare + record)

### Unassigned Critical Tasks
Identifies tasks with risk weight ≥8 that have no assignment:
- These represent control gaps
- Each adds points equal to its risk weight

### Workload Analysis
Flags roles with >10 assigned tasks:
- Helps identify potential bottlenecks
- Suggests redistribution for efficiency

## Color Coding System

- **Risk Levels**: Red (High), Yellow (Medium), Green (Low)
- **Task Status**: Red (Conflict), Green (Assigned), Gray (Unassigned)
- **Role Types**: Blue (Board), Green (Staff), Teal (External)
- **Categories**: Different colors per task category

## Responsive Design

- **Desktop**: Full grid layout with side-by-side panels
- **Tablet**: Stacked layout with collapsible sections
- **Mobile**: Single column with accordion-style components

## Future Enhancement Ideas

- Database backend for multi-user access
- PDF report generation with charts
- Industry benchmark comparisons
- Automated optimization algorithms
- Integration with accounting systems
- Cost-benefit analysis for outsourcing decisions
- Compliance tracking (Form 990, audit requirements)
- Training mode with best practice examples
- Board member training modules
- Audit trail for changes

## Use Cases

1. **CPA Firms**: Assess client internal controls during engagements
2. **Nonprofit Boards**: Evaluate and improve governance structures
3. **Executive Directors**: Plan organizational changes
4. **Auditors**: Document control testing and recommendations
5. **Consultants**: Demonstrate control concepts to clients
6. **Training**: Teach internal control principles

## License

This application is designed for use by CPAs and nonprofit organizations to improve internal controls and reduce fraud risk.

## Support

For questions or issues, please consult the documentation or reach out to your CPA advisor.
