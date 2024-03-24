import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
const Index_Tipo = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tipos</h2>
                    <Link href={route('tipos.index')}>
                        CREAR Tipos
                    </Link>
                </div>
            }
        >
            <Head title="Areas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">TIPOS</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index_Tipo