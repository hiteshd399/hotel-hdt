import { Toaster } from 'react-hot-toast'

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#1B1B1B',
            color: '#FFFFFF',
            border: '1px solid rgba(201, 162, 39, 0.3)',
            padding: '14px 18px',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 20px 50px -20px rgba(0,0,0,0.8)',
          },
          success: { iconTheme: { primary: '#C9A227', secondary: '#0E0E0E' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#0E0E0E' } },
        }}
      />
    </>
  )
}
