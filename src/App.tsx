import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/ui/AppLayout.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

const LandingPage = lazy(() => import('./pages/LandingPage.tsx'))
const DashboardPage = lazy(() => import('./pages/DashboardPage.tsx'))
const FrameworksPage = lazy(() => import('./pages/FrameworksPage.tsx'))
const ControlsPage = lazy(() => import('./pages/ControlsPage.tsx'))
const EvidencePage = lazy(() => import('./pages/EvidencePage.tsx'))
const GapsPage = lazy(() => import('./pages/GapsPage.tsx'))
const PoliciesPage = lazy(() => import('./pages/PoliciesPage.tsx'))
const MonitoringPage = lazy(() => import('./pages/MonitoringPage.tsx'))
const VendorsPage = lazy(() => import('./pages/VendorsPage.tsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'))

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      color: 'var(--color-text)',
    }}>
      Loading...
    </div>
  )
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="frameworks" element={<FrameworksPage />} />
              <Route path="controls" element={<ControlsPage />} />
              <Route path="evidence" element={<EvidencePage />} />
              <Route path="gaps" element={<GapsPage />} />
              <Route path="policies" element={<PoliciesPage />} />
              <Route path="monitoring" element={<MonitoringPage />} />
              <Route path="vendors" element={<VendorsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
