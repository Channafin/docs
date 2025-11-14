# CPA Forensic Analysis Dashboard - Enhanced Edition

**Version:** 7.0 Enhanced
**Last Updated:** November 14, 2025

## Description

This is a comprehensive forensic analysis dashboard for CPAs to review and analyze financial transactions. Built for the Tampa Bay Trial Lawyers Association, this tool provides advanced transaction review capabilities with built-in forensic analysis features.

## Features

### 📊 Dashboard & Analytics
- Complete transaction population overview with real-time statistics
- Interactive charts with multiple view options (quarterly/annual)
- Filter by review status (green/red/yellow/reclass)
- Filter by transaction type (credit card/bank)
- Review status distribution with yearly breakdown
- Transaction volume analysis by period
- Top vendors analysis with visual data labels
- Transaction count by vendor groups

### ✅ Transaction Review
- Individual transaction review with keyboard shortcuts
- Batch operations (accept/reject multiple transactions)
- Transaction splitting capability for mixed-purpose expenses
- Vendor grouping and categorization
- Vendor-level notes
- Review categories and detailed notes (5000 character limit)
- PDF document attachment with intelligent matching
- Progress tracking with completion percentages

### 🔍 Forensic Analysis
- Real-time forensic alerts
- Benford's Law analysis for detecting anomalies
- Duplicate transaction detection
- Weekend/after-hours transaction flagging
- Round-dollar amount detection
- Statistical outlier identification
- Risk scoring for all transactions

### 📎 Document Management
- Bulk PDF upload with automatic transaction matching
- Intelligent matching algorithm (vendor name, amount, date)
- Match confidence scoring
- PDF preview and download
- Document status tracking

### 📝 Journal Entry Generator
- Auto-generate journal entries for reclassifications
- Multiple JE types (reclass, correction, reversal, accrual)
- QuickBooks CSV export format
- Copy to clipboard functionality
- Auto-incrementing JE numbering

### 🏷️ Vendor Groups
- Create custom vendor groups with color coding
- Assign vendors to groups
- Filter transactions by group
- Track transaction counts per group

## Keyboard Shortcuts

- `A` - Accept transaction (mark as green/mission)
- `R` - Reject transaction (mark as red/non-mission)
- `Y` - Mark transaction for review (yellow)
- `N` - Navigate to next unreviewed transaction
- `P` - Navigate to previous transaction
- `Space` - Open detailed review modal
- `?` - Toggle keyboard shortcuts help

## Data Storage

All review data is stored locally in the browser using localStorage:
- Transaction review states
- PDF attachments (base64 encoded)
- Vendor groups and assignments
- Vendor notes
- Journal entry counter

### Export/Import
- Export review data as JSON for backup or team collaboration
- Import review data to merge with existing reviews
- All exports include version and timestamp

## Technology Stack

- **Chart.js** - Data visualization with datalabels plugin
- **SheetJS (XLSX)** - Excel file processing
- **PDF.js** - PDF rendering and preview
- **Vanilla JavaScript** - No framework dependencies
- **LocalStorage** - Client-side data persistence

## File Format

The dashboard accepts Excel files (.xlsx, .xls) with the following expected columns:
- `Transaction date`
- `Name V2` or `Vendor` or `Name` (vendor name)
- `Debit` / `Credit` or `Amount`
- `Transaction type` (e.g., Credit Card, Bank)
- `Memo/Description`
- `Account name`
- `Item class` (category)
- `legitimacy` (optional - pre-classification)

## Security Features

- HTML escaping for all user-generated content
- Input validation and sanitization
- Safe localStorage operations with error handling
- Character limits on text inputs
- XSS protection

## Browser Compatibility

- Modern browsers with ES6+ support
- LocalStorage enabled
- JavaScript enabled
- Recommended: Chrome, Firefox, Edge, Safari (latest versions)

## Checkpoint Information

This is a saved checkpoint (v7.0) before further enhancements. The application is fully functional with all core features implemented.

### Current Limitations
1. File size limited by Write tool constraints - full JavaScript may be truncated
2. LocalStorage has size limits (~5-10MB depending on browser)
3. Large PDF attachments may impact performance
4. No server-side storage or multi-user sync

### Planned Improvements
- [ ] Backend integration for data persistence
- [ ] Multi-user collaboration features
- [ ] Additional export formats (PDF reports)
- [ ] More advanced forensic algorithms
- [ ] Automated risk assessment rules
- [ ] Integration with accounting software APIs

## Usage

1. Open `index.html` in a modern web browser
2. Upload your transaction data (Excel format)
3. Review the dashboard analytics
4. Navigate to Transaction Review tab
5. Review transactions individually or in batch
6. Attach supporting documentation as needed
7. Generate journal entries for adjustments
8. Export your review data for safekeeping

## Support

For issues, questions, or feature requests, please refer to the main project documentation.

---
**Note:** This is a client-side application. All data processing occurs in the browser. Ensure you regularly export your review data for backup purposes.
