export const tasks = [
  // Cash Receipt Tasks
  {
    id: 'open_mail',
    name: 'Open Mail/Receive Checks',
    category: 'Cash Receipt',
    riskWeight: 7,
    conflictsWith: ['prepare_deposits', 'record_receipts', 'bank_reconciliation']
  },
  {
    id: 'prepare_deposits',
    name: 'Prepare Bank Deposits',
    category: 'Cash Receipt',
    riskWeight: 8,
    conflictsWith: ['open_mail', 'record_receipts', 'bank_reconciliation', 'online_banking']
  },
  {
    id: 'record_receipts',
    name: 'Record Cash Receipts in Accounting',
    category: 'Cash Receipt',
    riskWeight: 9,
    conflictsWith: ['open_mail', 'prepare_deposits', 'bank_reconciliation']
  },
  {
    id: 'issue_donation_receipts',
    name: 'Issue Donation Receipts',
    category: 'Cash Receipt',
    riskWeight: 6,
    conflictsWith: ['record_receipts']
  },

  // Disbursement Tasks
  {
    id: 'approve_invoices',
    name: 'Approve Invoices for Payment',
    category: 'Disbursement',
    riskWeight: 9,
    conflictsWith: ['prepare_checks', 'sign_checks', 'record_payments']
  },
  {
    id: 'prepare_checks',
    name: 'Prepare Checks/Electronic Payments',
    category: 'Disbursement',
    riskWeight: 8,
    conflictsWith: ['approve_invoices', 'sign_checks', 'record_payments', 'online_banking']
  },
  {
    id: 'sign_checks',
    name: 'Sign Checks/Authorize Payments',
    category: 'Disbursement',
    riskWeight: 10,
    conflictsWith: ['prepare_checks', 'approve_invoices', 'record_payments', 'online_banking']
  },
  {
    id: 'record_payments',
    name: 'Record Payments in Accounting',
    category: 'Disbursement',
    riskWeight: 9,
    conflictsWith: ['prepare_checks', 'approve_invoices', 'sign_checks']
  },

  // Banking & Reconciliation
  {
    id: 'online_banking',
    name: 'Online Banking Access',
    category: 'Banking',
    riskWeight: 10,
    conflictsWith: ['prepare_deposits', 'prepare_checks', 'sign_checks', 'bank_reconciliation']
  },
  {
    id: 'bank_reconciliation',
    name: 'Perform Bank Reconciliation',
    category: 'Banking',
    riskWeight: 10,
    conflictsWith: ['open_mail', 'prepare_deposits', 'record_receipts', 'record_payments', 'online_banking']
  },
  {
    id: 'review_reconciliation',
    name: 'Review Bank Reconciliation',
    category: 'Banking',
    riskWeight: 8,
    conflictsWith: ['bank_reconciliation']
  },

  // Payroll
  {
    id: 'approve_timesheets',
    name: 'Approve Timesheets',
    category: 'Payroll',
    riskWeight: 8,
    conflictsWith: ['process_payroll', 'record_payroll']
  },
  {
    id: 'process_payroll',
    name: 'Process Payroll',
    category: 'Payroll',
    riskWeight: 9,
    conflictsWith: ['approve_timesheets', 'record_payroll', 'sign_checks']
  },
  {
    id: 'record_payroll',
    name: 'Record Payroll in Accounting',
    category: 'Payroll',
    riskWeight: 8,
    conflictsWith: ['approve_timesheets', 'process_payroll']
  },
  {
    id: 'maintain_employee_records',
    name: 'Maintain Employee Records',
    category: 'Payroll',
    riskWeight: 7,
    conflictsWith: ['process_payroll']
  },

  // General Ledger & Reporting
  {
    id: 'maintain_general_ledger',
    name: 'Maintain General Ledger',
    category: 'Accounting',
    riskWeight: 9,
    conflictsWith: ['record_receipts', 'record_payments', 'record_payroll']
  },
  {
    id: 'post_journal_entries',
    name: 'Post Journal Entries',
    category: 'Accounting',
    riskWeight: 8,
    conflictsWith: ['review_journal_entries']
  },
  {
    id: 'review_journal_entries',
    name: 'Review Journal Entries',
    category: 'Accounting',
    riskWeight: 7,
    conflictsWith: ['post_journal_entries']
  },
  {
    id: 'prepare_financial_statements',
    name: 'Prepare Financial Statements',
    category: 'Reporting',
    riskWeight: 8,
    conflictsWith: ['review_financial_statements']
  },
  {
    id: 'review_financial_statements',
    name: 'Review Financial Statements',
    category: 'Reporting',
    riskWeight: 9,
    conflictsWith: ['prepare_financial_statements']
  },
  {
    id: 'prepare_budget',
    name: 'Prepare Annual Budget',
    category: 'Reporting',
    riskWeight: 7,
    conflictsWith: ['approve_budget']
  },
  {
    id: 'approve_budget',
    name: 'Approve Budget',
    category: 'Reporting',
    riskWeight: 9,
    conflictsWith: ['prepare_budget']
  },

  // Asset Management
  {
    id: 'maintain_asset_records',
    name: 'Maintain Fixed Asset Records',
    category: 'Assets',
    riskWeight: 6,
    conflictsWith: ['physical_asset_verification']
  },
  {
    id: 'physical_asset_verification',
    name: 'Physical Asset Verification',
    category: 'Assets',
    riskWeight: 7,
    conflictsWith: ['maintain_asset_records']
  },

  // Oversight
  {
    id: 'review_monthly_reports',
    name: 'Review Monthly Financial Reports',
    category: 'Oversight',
    riskWeight: 8,
    conflictsWith: ['prepare_financial_statements', 'maintain_general_ledger']
  },
  {
    id: 'monitor_budget_variance',
    name: 'Monitor Budget vs. Actual',
    category: 'Oversight',
    riskWeight: 7,
    conflictsWith: ['prepare_budget', 'post_journal_entries']
  },

  // Accounts Payable/Receivable
  {
    id: 'maintain_ap',
    name: 'Maintain Accounts Payable Records',
    category: 'AP/AR',
    riskWeight: 7,
    conflictsWith: ['approve_invoices', 'prepare_checks']
  },
  {
    id: 'maintain_ar',
    name: 'Maintain Accounts Receivable Records',
    category: 'AP/AR',
    riskWeight: 7,
    conflictsWith: ['record_receipts', 'issue_donation_receipts']
  },

  // Compliance
  {
    id: 'prepare_990',
    name: 'Prepare Form 990',
    category: 'Compliance',
    riskWeight: 8,
    conflictsWith: ['review_990']
  },
  {
    id: 'review_990',
    name: 'Review Form 990',
    category: 'Compliance',
    riskWeight: 9,
    conflictsWith: ['prepare_990']
  }
];

export const categories = [
  'Cash Receipt',
  'Disbursement',
  'Banking',
  'Payroll',
  'Accounting',
  'Reporting',
  'Assets',
  'Oversight',
  'AP/AR',
  'Compliance'
];
