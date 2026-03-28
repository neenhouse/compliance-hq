export type FrameworkId = 'soc2' | 'hipaa' | 'gdpr' | 'iso27001'

export interface Framework {
  id: FrameworkId
  name: string
  fullName: string
  controlCount: number
  description: string
}

export type ControlStatus = 'compliant' | 'non-compliant' | 'partial' | 'not-assessed'
export type EvidenceStatus = 'collected' | 'missing' | 'stale'
export type Severity = 'critical' | 'high' | 'medium' | 'low'

export interface Control {
  id: string
  frameworkId: FrameworkId
  category: string
  name: string
  description: string
  status: ControlStatus
  infrastructureMapping: InfrastructureMapping | null
  evidence: EvidenceItem | null
  severity: Severity
}

export interface InfrastructureMapping {
  tool: string
  resource: string
  description: string
}

export interface EvidenceItem {
  id: string
  controlId: string
  status: EvidenceStatus
  collectedAt: string
  type: 'auto' | 'manual'
  source: string
  fileName?: string
}

export interface GapItem {
  controlId: string
  controlName: string
  category: string
  severity: Severity
  reason: string
  remediationSteps: string[]
  estimatedEffort: string
  assignee?: string
}

export interface PolicyTemplate {
  id: string
  name: string
  category: string
  description: string
  variables: PolicyVariable[]
  templateContent: string
}

export interface PolicyVariable {
  key: string
  label: string
  placeholder: string
  value: string
}

export interface MonitoringEvent {
  id: string
  controlId: string
  controlName: string
  previousStatus: ControlStatus
  currentStatus: ControlStatus
  detectedAt: string
  description: string
}

export interface Vendor {
  id: string
  name: string
  category: string
  securityScore: number
  privacyScore: number
  availabilityScore: number
  overallRisk: 'low' | 'medium' | 'high' | 'critical'
  lastReviewed: string
  nextReview: string
}
