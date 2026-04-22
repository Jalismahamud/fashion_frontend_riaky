import ClientDashboard from '@/components/dashboard/ClientDashboard'

const DashboardLayout = ({ children }) => {
    return (
        <ClientDashboard>
            {children}
        </ClientDashboard>
    )
}

export default DashboardLayout