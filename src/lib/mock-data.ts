import type {
  Framework,
  Control,
  GapItem,
  PolicyTemplate,
  MonitoringEvent,
  Vendor,
} from './types.ts'

export const frameworks: Framework[] = [
  {
    id: 'soc2',
    name: 'SOC 2',
    fullName: 'Service Organization Control 2',
    controlCount: 30,
    description:
      'Trust service criteria for security, availability, processing integrity, confidentiality, and privacy.',
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    fullName: 'Health Insurance Portability and Accountability Act',
    controlCount: 54,
    description:
      'Safeguards for protecting sensitive patient health information.',
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    fullName: 'General Data Protection Regulation',
    controlCount: 42,
    description:
      'EU regulation for data protection and privacy of individuals.',
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    fullName: 'Information Security Management System',
    controlCount: 93,
    description:
      'International standard for information security management systems.',
  },
]

export const soc2Controls: Control[] = [
  // Access Control (CC6)
  {
    id: 'CC6.1',
    frameworkId: 'soc2',
    category: 'Access Control',
    name: 'Logical and physical access controls',
    description:
      'The entity implements logical access security software, infrastructure, and architectures over protected information assets.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'GitHub',
      resource: 'Organization settings',
      description: 'GitHub org-level access controls with SSO enforcement',
    },
    evidence: {
      id: 'ev-1',
      controlId: 'CC6.1',
      status: 'collected',
      collectedAt: '2026-03-15T10:30:00Z',
      type: 'auto',
      source: 'GitHub API',
    },
    severity: 'critical',
  },
  {
    id: 'CC6.2',
    frameworkId: 'soc2',
    category: 'Access Control',
    name: 'User authentication',
    description:
      'Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'Okta',
      resource: 'SSO configuration',
      description: 'Okta SSO with MFA enforcement for all users',
    },
    evidence: {
      id: 'ev-2',
      controlId: 'CC6.2',
      status: 'collected',
      collectedAt: '2026-03-20T14:00:00Z',
      type: 'auto',
      source: 'Okta API',
    },
    severity: 'critical',
  },
  {
    id: 'CC6.3',
    frameworkId: 'soc2',
    category: 'Access Control',
    name: 'Access removal',
    description:
      'The entity removes access to protected information assets when an employee leaves or changes role.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'Okta',
      resource: 'Lifecycle management',
      description: 'Automated deprovisioning via Okta lifecycle hooks',
    },
    evidence: {
      id: 'ev-3',
      controlId: 'CC6.3',
      status: 'collected',
      collectedAt: '2026-03-18T09:00:00Z',
      type: 'auto',
      source: 'Okta API',
    },
    severity: 'high',
  },
  {
    id: 'CC6.4',
    frameworkId: 'soc2',
    category: 'Access Control',
    name: 'Role-based access control',
    description:
      'The entity restricts access rights to authorized users based on role assignment.',
    status: 'partial',
    infrastructureMapping: {
      tool: 'AWS IAM',
      resource: 'IAM roles and policies',
      description: 'AWS IAM roles with least-privilege policies',
    },
    evidence: {
      id: 'ev-4',
      controlId: 'CC6.4',
      status: 'stale',
      collectedAt: '2026-01-10T09:00:00Z',
      type: 'auto',
      source: 'AWS Config',
    },
    severity: 'high',
  },
  {
    id: 'CC6.5',
    frameworkId: 'soc2',
    category: 'Access Control',
    name: 'Privileged access management',
    description:
      'The entity identifies and manages privileged access to sensitive systems.',
    status: 'non-compliant',
    infrastructureMapping: null,
    evidence: null,
    severity: 'critical',
  },
  // Encryption (CC6.6-CC6.8)
  {
    id: 'CC6.6',
    frameworkId: 'soc2',
    category: 'Encryption',
    name: 'Encryption at rest',
    description:
      'The entity protects data at rest using encryption mechanisms.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'AWS S3',
      resource: 'Bucket encryption policy',
      description: 'AES-256 server-side encryption on all S3 buckets',
    },
    evidence: {
      id: 'ev-6',
      controlId: 'CC6.6',
      status: 'collected',
      collectedAt: '2026-03-22T11:00:00Z',
      type: 'auto',
      source: 'AWS Config',
    },
    severity: 'critical',
  },
  {
    id: 'CC6.7',
    frameworkId: 'soc2',
    category: 'Encryption',
    name: 'Encryption in transit',
    description:
      'The entity protects data in transit using TLS/SSL encryption.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'Cloudflare',
      resource: 'SSL/TLS settings',
      description: 'Cloudflare enforced TLS 1.3 on all endpoints',
    },
    evidence: {
      id: 'ev-7',
      controlId: 'CC6.7',
      status: 'collected',
      collectedAt: '2026-03-21T16:00:00Z',
      type: 'auto',
      source: 'Cloudflare API',
    },
    severity: 'critical',
  },
  {
    id: 'CC6.8',
    frameworkId: 'soc2',
    category: 'Encryption',
    name: 'Key management',
    description:
      'The entity manages cryptographic keys throughout their lifecycle.',
    status: 'partial',
    infrastructureMapping: {
      tool: 'AWS KMS',
      resource: 'Key policies',
      description: 'AWS KMS with automatic key rotation enabled',
    },
    evidence: {
      id: 'ev-8',
      controlId: 'CC6.8',
      status: 'stale',
      collectedAt: '2026-01-05T08:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'kms-key-rotation-policy.pdf',
    },
    severity: 'high',
  },
  // Change Management (CC8)
  {
    id: 'CC8.1',
    frameworkId: 'soc2',
    category: 'Change Management',
    name: 'Change authorization',
    description:
      'The entity authorizes, designs, develops, configures, documents, tests, approves, and implements changes to infrastructure and software.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'GitHub',
      resource: 'Branch protection rules',
      description:
        'Required PR reviews and CI checks before merge to main',
    },
    evidence: {
      id: 'ev-9',
      controlId: 'CC8.1',
      status: 'collected',
      collectedAt: '2026-03-25T13:00:00Z',
      type: 'auto',
      source: 'GitHub API',
    },
    severity: 'high',
  },
  {
    id: 'CC8.2',
    frameworkId: 'soc2',
    category: 'Change Management',
    name: 'Infrastructure change testing',
    description:
      'Changes to infrastructure are tested before being promoted to production.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'GitHub Actions',
      resource: 'CI/CD pipeline',
      description: 'Automated test suites run on every PR',
    },
    evidence: {
      id: 'ev-10',
      controlId: 'CC8.2',
      status: 'collected',
      collectedAt: '2026-03-26T10:00:00Z',
      type: 'auto',
      source: 'GitHub Actions API',
    },
    severity: 'medium',
  },
  {
    id: 'CC8.3',
    frameworkId: 'soc2',
    category: 'Change Management',
    name: 'Emergency change process',
    description:
      'The entity manages emergency changes with post-implementation review.',
    status: 'non-compliant',
    infrastructureMapping: null,
    evidence: null,
    severity: 'medium',
  },
  // Risk Management (CC3)
  {
    id: 'CC3.1',
    frameworkId: 'soc2',
    category: 'Risk Management',
    name: 'Risk assessment process',
    description:
      'The entity identifies and assesses risks to the achievement of its objectives.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'Jira',
      resource: 'Risk register project',
      description: 'Quarterly risk assessment tracked in Jira',
    },
    evidence: {
      id: 'ev-12',
      controlId: 'CC3.1',
      status: 'collected',
      collectedAt: '2026-03-01T09:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'q1-2026-risk-assessment.pdf',
    },
    severity: 'high',
  },
  {
    id: 'CC3.2',
    frameworkId: 'soc2',
    category: 'Risk Management',
    name: 'Risk mitigation strategies',
    description:
      'The entity identifies and implements risk mitigation strategies.',
    status: 'partial',
    infrastructureMapping: null,
    evidence: {
      id: 'ev-13',
      controlId: 'CC3.2',
      status: 'stale',
      collectedAt: '2025-12-15T09:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'risk-treatment-plan.pdf',
    },
    severity: 'high',
  },
  {
    id: 'CC3.3',
    frameworkId: 'soc2',
    category: 'Risk Management',
    name: 'Fraud risk management',
    description:
      'The entity considers the potential for fraud in assessing risks.',
    status: 'non-compliant',
    infrastructureMapping: null,
    evidence: null,
    severity: 'medium',
  },
  // Monitoring (CC7)
  {
    id: 'CC7.1',
    frameworkId: 'soc2',
    category: 'Monitoring',
    name: 'Security event monitoring',
    description:
      'The entity monitors system components for anomalies and security events.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'Datadog',
      resource: 'Security monitoring',
      description: 'Datadog SIEM with alerting rules for security events',
    },
    evidence: {
      id: 'ev-15',
      controlId: 'CC7.1',
      status: 'collected',
      collectedAt: '2026-03-26T08:00:00Z',
      type: 'auto',
      source: 'Datadog API',
    },
    severity: 'critical',
  },
  {
    id: 'CC7.2',
    frameworkId: 'soc2',
    category: 'Monitoring',
    name: 'Incident detection',
    description:
      'The entity detects and responds to security incidents in a timely manner.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'PagerDuty',
      resource: 'Incident management',
      description: 'PagerDuty on-call rotation with escalation policies',
    },
    evidence: {
      id: 'ev-16',
      controlId: 'CC7.2',
      status: 'collected',
      collectedAt: '2026-03-24T12:00:00Z',
      type: 'auto',
      source: 'PagerDuty API',
    },
    severity: 'critical',
  },
  {
    id: 'CC7.3',
    frameworkId: 'soc2',
    category: 'Monitoring',
    name: 'Incident response plan',
    description:
      'The entity maintains and tests an incident response plan.',
    status: 'partial',
    infrastructureMapping: null,
    evidence: {
      id: 'ev-17',
      controlId: 'CC7.3',
      status: 'stale',
      collectedAt: '2025-11-20T09:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'incident-response-plan-v2.pdf',
    },
    severity: 'high',
  },
  {
    id: 'CC7.4',
    frameworkId: 'soc2',
    category: 'Monitoring',
    name: 'Vulnerability management',
    description:
      'The entity identifies, evaluates, and manages vulnerabilities in system components.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'GitHub',
      resource: 'Dependabot alerts',
      description: 'Automated dependency scanning with Dependabot',
    },
    evidence: {
      id: 'ev-18',
      controlId: 'CC7.4',
      status: 'collected',
      collectedAt: '2026-03-27T06:00:00Z',
      type: 'auto',
      source: 'GitHub API',
    },
    severity: 'high',
  },
  // Availability (A1)
  {
    id: 'A1.1',
    frameworkId: 'soc2',
    category: 'Availability',
    name: 'Capacity planning',
    description:
      'The entity manages capacity to meet availability commitments and system requirements.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'AWS',
      resource: 'Auto Scaling Groups',
      description: 'EC2 Auto Scaling with CloudWatch metrics',
    },
    evidence: {
      id: 'ev-19',
      controlId: 'A1.1',
      status: 'collected',
      collectedAt: '2026-03-25T14:00:00Z',
      type: 'auto',
      source: 'AWS CloudWatch',
    },
    severity: 'medium',
  },
  {
    id: 'A1.2',
    frameworkId: 'soc2',
    category: 'Availability',
    name: 'Disaster recovery',
    description:
      'The entity implements backup, recovery, and redundancy procedures.',
    status: 'partial',
    infrastructureMapping: {
      tool: 'AWS',
      resource: 'RDS automated backups',
      description: 'Daily RDS snapshots with 30-day retention',
    },
    evidence: {
      id: 'ev-20',
      controlId: 'A1.2',
      status: 'stale',
      collectedAt: '2026-01-20T09:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'dr-plan-2025.pdf',
    },
    severity: 'critical',
  },
  {
    id: 'A1.3',
    frameworkId: 'soc2',
    category: 'Availability',
    name: 'DR testing',
    description:
      'The entity tests backup and recovery procedures on a periodic basis.',
    status: 'non-compliant',
    infrastructureMapping: null,
    evidence: null,
    severity: 'high',
  },
  // Confidentiality (C1)
  {
    id: 'C1.1',
    frameworkId: 'soc2',
    category: 'Confidentiality',
    name: 'Data classification',
    description:
      'The entity identifies and classifies confidential information.',
    status: 'partial',
    infrastructureMapping: null,
    evidence: {
      id: 'ev-22',
      controlId: 'C1.1',
      status: 'stale',
      collectedAt: '2025-10-01T09:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'data-classification-policy.pdf',
    },
    severity: 'medium',
  },
  {
    id: 'C1.2',
    frameworkId: 'soc2',
    category: 'Confidentiality',
    name: 'Data retention and disposal',
    description:
      'The entity retains and disposes of confidential information according to policy.',
    status: 'non-compliant',
    infrastructureMapping: null,
    evidence: null,
    severity: 'medium',
  },
  // Communications (CC2)
  {
    id: 'CC2.1',
    frameworkId: 'soc2',
    category: 'Communications',
    name: 'Security awareness training',
    description:
      'The entity communicates information about its objectives and responsibilities to internal personnel.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'KnowBe4',
      resource: 'Training campaigns',
      description: 'Quarterly security awareness training with phishing simulations',
    },
    evidence: {
      id: 'ev-24',
      controlId: 'CC2.1',
      status: 'collected',
      collectedAt: '2026-03-10T09:00:00Z',
      type: 'auto',
      source: 'KnowBe4 API',
    },
    severity: 'medium',
  },
  {
    id: 'CC2.2',
    frameworkId: 'soc2',
    category: 'Communications',
    name: 'External communications',
    description:
      'The entity communicates with external users about policies and updates.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'Statuspage',
      resource: 'Public status page',
      description: 'Atlassian Statuspage for public incident communication',
    },
    evidence: {
      id: 'ev-25',
      controlId: 'CC2.2',
      status: 'collected',
      collectedAt: '2026-03-22T10:00:00Z',
      type: 'auto',
      source: 'Statuspage API',
    },
    severity: 'low',
  },
  // Control Environment (CC1)
  {
    id: 'CC1.1',
    frameworkId: 'soc2',
    category: 'Control Environment',
    name: 'Code of conduct',
    description:
      'The entity demonstrates a commitment to integrity and ethical values.',
    status: 'compliant',
    infrastructureMapping: null,
    evidence: {
      id: 'ev-26',
      controlId: 'CC1.1',
      status: 'collected',
      collectedAt: '2026-02-01T09:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'code-of-conduct-2026.pdf',
    },
    severity: 'low',
  },
  {
    id: 'CC1.2',
    frameworkId: 'soc2',
    category: 'Control Environment',
    name: 'Board oversight',
    description:
      'The board of directors demonstrates independence from management and oversight of controls.',
    status: 'compliant',
    infrastructureMapping: null,
    evidence: {
      id: 'ev-27',
      controlId: 'CC1.2',
      status: 'collected',
      collectedAt: '2026-01-15T09:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'board-meeting-minutes-q4.pdf',
    },
    severity: 'low',
  },
  {
    id: 'CC1.3',
    frameworkId: 'soc2',
    category: 'Control Environment',
    name: 'Organizational structure',
    description:
      'Management establishes, with board oversight, structures, reporting lines, and authorities.',
    status: 'compliant',
    infrastructureMapping: null,
    evidence: {
      id: 'ev-28',
      controlId: 'CC1.3',
      status: 'collected',
      collectedAt: '2026-02-10T09:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'org-chart-2026.pdf',
    },
    severity: 'low',
  },
  // Privacy (P1)
  {
    id: 'P1.1',
    frameworkId: 'soc2',
    category: 'Privacy',
    name: 'Privacy notice',
    description:
      'The entity provides notice about its privacy practices to data subjects.',
    status: 'compliant',
    infrastructureMapping: {
      tool: 'Website',
      resource: 'Privacy policy page',
      description: 'Public privacy policy accessible from footer',
    },
    evidence: {
      id: 'ev-29',
      controlId: 'P1.1',
      status: 'collected',
      collectedAt: '2026-03-01T09:00:00Z',
      type: 'manual',
      source: 'Manual upload',
      fileName: 'privacy-policy-v3.pdf',
    },
    severity: 'medium',
  },
  {
    id: 'P1.2',
    frameworkId: 'soc2',
    category: 'Privacy',
    name: 'Consent management',
    description:
      'The entity obtains consent for the collection and use of personal information.',
    status: 'non-compliant',
    infrastructureMapping: null,
    evidence: null,
    severity: 'high',
  },
]

export const gapItems: GapItem[] = soc2Controls
  .filter((c) => c.status === 'non-compliant' || c.status === 'partial')
  .map((c) => {
    const remediationMap: Record<string, { steps: string[]; effort: string }> = {
      'CC6.4': {
        steps: [
          'Audit all AWS IAM roles and remove unused permissions',
          'Implement AWS IAM Access Analyzer',
          'Create IAM role templates for each team function',
          'Enable AWS CloudTrail for access logging',
        ],
        effort: '2-3 days',
      },
      'CC6.5': {
        steps: [
          'Deploy a PAM solution (e.g., HashiCorp Vault)',
          'Implement just-in-time privileged access',
          'Create privileged access request workflow',
          'Set up session recording for privileged sessions',
        ],
        effort: '1-2 weeks',
      },
      'CC6.8': {
        steps: [
          'Enable automatic key rotation in AWS KMS',
          'Document key management procedures',
          'Implement key access audit logging',
          'Review and update KMS key policies quarterly',
        ],
        effort: '2-3 days',
      },
      'CC8.3': {
        steps: [
          'Document emergency change procedure',
          'Create emergency change approval workflow in Jira',
          'Set up post-implementation review template',
          'Train team on emergency change process',
        ],
        effort: '3-5 days',
      },
      'CC3.2': {
        steps: [
          'Update risk treatment plan with current mitigations',
          'Assign risk owners for each identified risk',
          'Schedule quarterly risk review meetings',
          'Implement automated risk monitoring dashboards',
        ],
        effort: '3-5 days',
      },
      'CC3.3': {
        steps: [
          'Conduct fraud risk assessment workshop',
          'Document fraud risk scenarios and controls',
          'Implement segregation of duties matrix',
          'Set up fraud detection monitoring alerts',
        ],
        effort: '1 week',
      },
      'CC7.3': {
        steps: [
          'Update incident response plan to current tooling',
          'Schedule tabletop exercise for Q2 2026',
          'Create incident response runbooks for common scenarios',
          'Implement post-incident review process',
        ],
        effort: '1 week',
      },
      'A1.2': {
        steps: [
          'Update disaster recovery plan documentation',
          'Test RDS snapshot restoration procedure',
          'Document RTO and RPO targets',
          'Configure cross-region replication for critical data',
        ],
        effort: '1 week',
      },
      'A1.3': {
        steps: [
          'Schedule quarterly DR testing',
          'Create DR test plan and success criteria',
          'Execute first DR test and document results',
          'Set up automated DR failover testing',
        ],
        effort: '2 weeks',
      },
      'C1.1': {
        steps: [
          'Update data classification policy',
          'Classify all data stores by sensitivity level',
          'Implement data classification labels in tools',
          'Train team on data classification procedures',
        ],
        effort: '1 week',
      },
      'C1.2': {
        steps: [
          'Define data retention schedule by data type',
          'Implement automated data deletion for expired data',
          'Create data disposal procedures and documentation',
          'Audit existing data against retention policy',
        ],
        effort: '1-2 weeks',
      },
      'P1.2': {
        steps: [
          'Implement cookie consent management platform',
          'Add consent collection to user registration flow',
          'Create consent withdrawal mechanism',
          'Maintain consent records with timestamps',
        ],
        effort: '1 week',
      },
    }

    const mapped = remediationMap[c.id] ?? {
      steps: [
        'Assess current state of this control',
        'Define implementation plan',
        'Implement required changes',
        'Collect evidence and verify compliance',
      ],
      effort: '1 week',
    }

    return {
      controlId: c.id,
      controlName: c.name,
      category: c.category,
      severity: c.severity,
      reason:
        c.status === 'non-compliant'
          ? 'Control has no evidence or infrastructure mapping'
          : 'Control is partially implemented with stale evidence',
      remediationSteps: mapped.steps,
      estimatedEffort: mapped.effort,
    }
  })

export const policyTemplates: PolicyTemplate[] = [
  {
    id: 'pol-access-control',
    name: 'Access Control Policy',
    category: 'Security',
    description:
      'Defines how access to systems and data is granted, reviewed, and revoked.',
    variables: [
      {
        key: 'companyName',
        label: 'Company Name',
        placeholder: 'Acme Corp',
        value: '',
      },
      {
        key: 'ssoProvider',
        label: 'SSO Provider',
        placeholder: 'Okta',
        value: '',
      },
      {
        key: 'reviewFrequency',
        label: 'Access Review Frequency',
        placeholder: 'Quarterly',
        value: '',
      },
    ],
    templateContent: `# Access Control Policy

## 1. Purpose

This policy establishes the access control requirements for {{companyName}} to ensure that access to information systems and data is appropriately managed throughout the user lifecycle.

## 2. Scope

This policy applies to all employees, contractors, and third parties who access {{companyName}} information systems.

## 3. Authentication Requirements

- All users must authenticate via {{ssoProvider}} single sign-on
- Multi-factor authentication (MFA) is required for all accounts
- Password requirements: minimum 12 characters, complexity enforced by {{ssoProvider}}
- Service accounts must use API keys or certificates, never passwords

## 4. Authorization

- Access is granted based on the principle of least privilege
- Role-based access control (RBAC) is implemented across all systems
- Access requests must be approved by the resource owner and security team
- Privileged access requires additional approval from the CTO or VP Engineering

## 5. Access Reviews

- Access reviews are conducted {{reviewFrequency}} by security team
- All access grants are logged and auditable
- Unused accounts are automatically disabled after 90 days of inactivity

## 6. Offboarding

- Access is revoked within 24 hours of employment termination
- Automated deprovisioning is configured in {{ssoProvider}}
- Exit interviews include return of all company devices and credentials

## 7. Compliance

This policy supports SOC 2 controls CC6.1, CC6.2, CC6.3, and CC6.4.

---

*Last updated: {{date}}*
*Policy owner: Security Team at {{companyName}}*`,
  },
  {
    id: 'pol-incident-response',
    name: 'Incident Response Policy',
    category: 'Security',
    description:
      'Defines procedures for detecting, responding to, and recovering from security incidents.',
    variables: [
      {
        key: 'companyName',
        label: 'Company Name',
        placeholder: 'Acme Corp',
        value: '',
      },
      {
        key: 'oncallTool',
        label: 'On-Call Tool',
        placeholder: 'PagerDuty',
        value: '',
      },
      {
        key: 'chatTool',
        label: 'Communication Tool',
        placeholder: 'Slack',
        value: '',
      },
    ],
    templateContent: `# Incident Response Policy

## 1. Purpose

This policy establishes the incident response procedures for {{companyName}} to ensure timely detection, response, and recovery from security incidents.

## 2. Incident Severity Levels

| Level | Description | Response Time | Example |
|-------|------------|---------------|---------|
| P1 - Critical | System-wide outage or data breach | 15 minutes | Production down, data exfiltration |
| P2 - High | Significant degradation | 1 hour | Partial outage, unauthorized access attempt |
| P3 - Medium | Limited impact | 4 hours | Single service degradation |
| P4 - Low | Minimal impact | 24 hours | Minor configuration issue |

## 3. Detection

- Automated monitoring via security tooling detects anomalies
- On-call engineers are alerted via {{oncallTool}}
- Any employee can report a security concern via #security in {{chatTool}}

## 4. Response Procedures

1. **Triage**: On-call engineer assesses severity and impact
2. **Containment**: Isolate affected systems to prevent spread
3. **Communication**: Notify stakeholders per severity level
4. **Investigation**: Determine root cause and scope
5. **Remediation**: Apply fixes and verify resolution
6. **Recovery**: Restore normal operations

## 5. Post-Incident Review

- All P1 and P2 incidents require a post-incident review within 72 hours
- Blameless post-mortems are documented and shared
- Action items are tracked to completion

## 6. Compliance

This policy supports SOC 2 controls CC7.2, CC7.3, and CC7.4.

---

*Last updated: {{date}}*
*Policy owner: Security Team at {{companyName}}*`,
  },
  {
    id: 'pol-data-classification',
    name: 'Data Classification Policy',
    category: 'Privacy',
    description:
      'Defines data classification levels and handling requirements.',
    variables: [
      {
        key: 'companyName',
        label: 'Company Name',
        placeholder: 'Acme Corp',
        value: '',
      },
      {
        key: 'dpoName',
        label: 'Data Protection Officer',
        placeholder: 'Jane Smith',
        value: '',
      },
    ],
    templateContent: `# Data Classification Policy

## 1. Purpose

This policy defines the data classification framework for {{companyName}} to ensure appropriate protection of information based on its sensitivity.

## 2. Classification Levels

### Confidential
- Customer PII, financial data, trade secrets
- Encryption required at rest and in transit
- Access restricted to need-to-know basis

### Internal
- Internal communications, business plans, employee data
- Standard encryption and access controls
- Accessible to all employees with valid business need

### Public
- Marketing materials, public documentation, open source code
- No special protection required
- May be freely shared externally

## 3. Data Handling

| Level | Storage | Transmission | Disposal |
|-------|---------|-------------|----------|
| Confidential | Encrypted, access-logged | TLS 1.3+ required | Secure deletion, certified |
| Internal | Standard security | TLS recommended | Standard deletion |
| Public | Any | Any | No requirements |

## 4. Responsibilities

- Data Protection Officer ({{dpoName}}) oversees classification
- Data owners are responsible for classifying their data
- All employees must complete data handling training annually

## 5. Compliance

This policy supports SOC 2 controls C1.1 and C1.2.

---

*Last updated: {{date}}*
*Policy owner: {{dpoName}}, {{companyName}}*`,
  },
  {
    id: 'pol-change-management',
    name: 'Change Management Policy',
    category: 'Operations',
    description:
      'Defines how changes to production systems are authorized, tested, and deployed.',
    variables: [
      {
        key: 'companyName',
        label: 'Company Name',
        placeholder: 'Acme Corp',
        value: '',
      },
      {
        key: 'ciTool',
        label: 'CI/CD Tool',
        placeholder: 'GitHub Actions',
        value: '',
      },
    ],
    templateContent: `# Change Management Policy

## 1. Purpose

This policy defines the change management process for {{companyName}} to ensure all changes to production systems are properly authorized, tested, and documented.

## 2. Change Types

- **Standard**: Pre-approved, low-risk changes (e.g., dependency updates)
- **Normal**: Requires review and approval before implementation
- **Emergency**: Critical fixes that bypass normal process with post-review

## 3. Process

1. All code changes require a pull request with at least one reviewer approval
2. Automated tests must pass via {{ciTool}} before merge
3. Deployments to production are automated through the CI/CD pipeline
4. All changes are logged with author, reviewer, and timestamp

## 4. Emergency Changes

- Must be approved by on-call lead or CTO
- Post-implementation review required within 48 hours
- Full documentation of change and impact

## 5. Compliance

This policy supports SOC 2 controls CC8.1, CC8.2, and CC8.3.

---

*Last updated: {{date}}*
*Policy owner: Engineering Team at {{companyName}}*`,
  },
]

export const monitoringEvents: MonitoringEvent[] = [
  {
    id: 'mon-1',
    controlId: 'CC6.4',
    controlName: 'Role-based access control',
    previousStatus: 'compliant',
    currentStatus: 'partial',
    detectedAt: '2026-03-25T14:32:00Z',
    description:
      'New IAM role "dev-admin" created with broad permissions. Violates least-privilege policy.',
  },
  {
    id: 'mon-2',
    controlId: 'CC6.8',
    controlName: 'Key management',
    previousStatus: 'compliant',
    currentStatus: 'partial',
    detectedAt: '2026-03-24T09:15:00Z',
    description:
      'KMS key rotation evidence expired. Last rotation was 95 days ago (policy requires 90 days).',
  },
  {
    id: 'mon-3',
    controlId: 'A1.2',
    controlName: 'Disaster recovery',
    previousStatus: 'compliant',
    currentStatus: 'partial',
    detectedAt: '2026-03-22T16:45:00Z',
    description:
      'DR plan document has not been updated in 14 months. Annual review required.',
  },
  {
    id: 'mon-4',
    controlId: 'CC7.3',
    controlName: 'Incident response plan',
    previousStatus: 'compliant',
    currentStatus: 'partial',
    detectedAt: '2026-03-20T11:00:00Z',
    description:
      'Last tabletop exercise was 8 months ago. Policy requires semi-annual testing.',
  },
  {
    id: 'mon-5',
    controlId: 'CC3.2',
    controlName: 'Risk mitigation strategies',
    previousStatus: 'compliant',
    currentStatus: 'partial',
    detectedAt: '2026-03-18T08:30:00Z',
    description:
      'Risk treatment plan references decommissioned tools. Update needed.',
  },
  {
    id: 'mon-6',
    controlId: 'C1.1',
    controlName: 'Data classification',
    previousStatus: 'partial',
    currentStatus: 'partial',
    detectedAt: '2026-03-15T13:20:00Z',
    description:
      'New S3 bucket "analytics-raw" created without data classification tag.',
  },
]

export const vendors: Vendor[] = [
  {
    id: 'v-1',
    name: 'AWS',
    category: 'Cloud Infrastructure',
    securityScore: 95,
    privacyScore: 90,
    availabilityScore: 98,
    overallRisk: 'low',
    lastReviewed: '2026-02-15',
    nextReview: '2027-02-15',
  },
  {
    id: 'v-2',
    name: 'Okta',
    category: 'Identity & Access',
    securityScore: 92,
    privacyScore: 88,
    availabilityScore: 94,
    overallRisk: 'low',
    lastReviewed: '2026-01-20',
    nextReview: '2027-01-20',
  },
  {
    id: 'v-3',
    name: 'Datadog',
    category: 'Monitoring',
    securityScore: 88,
    privacyScore: 82,
    availabilityScore: 96,
    overallRisk: 'low',
    lastReviewed: '2026-03-01',
    nextReview: '2027-03-01',
  },
  {
    id: 'v-4',
    name: 'Stripe',
    category: 'Payment Processing',
    securityScore: 96,
    privacyScore: 94,
    availabilityScore: 99,
    overallRisk: 'low',
    lastReviewed: '2026-02-01',
    nextReview: '2027-02-01',
  },
  {
    id: 'v-5',
    name: 'SendGrid',
    category: 'Email Service',
    securityScore: 75,
    privacyScore: 70,
    availabilityScore: 88,
    overallRisk: 'medium',
    lastReviewed: '2025-11-15',
    nextReview: '2026-11-15',
  },
  {
    id: 'v-6',
    name: 'Notion',
    category: 'Documentation',
    securityScore: 72,
    privacyScore: 68,
    availabilityScore: 90,
    overallRisk: 'medium',
    lastReviewed: '2026-01-10',
    nextReview: '2027-01-10',
  },
  {
    id: 'v-7',
    name: 'Fivetran',
    category: 'Data Integration',
    securityScore: 65,
    privacyScore: 60,
    availabilityScore: 82,
    overallRisk: 'high',
    lastReviewed: '2025-09-01',
    nextReview: '2026-09-01',
  },
  {
    id: 'v-8',
    name: 'Retool',
    category: 'Internal Tools',
    securityScore: 58,
    privacyScore: 55,
    availabilityScore: 78,
    overallRisk: 'high',
    lastReviewed: '2025-08-20',
    nextReview: '2026-08-20',
  },
]
