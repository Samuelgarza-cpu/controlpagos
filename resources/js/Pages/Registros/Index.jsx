import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Registros({ auth }) {

    const [user, setUser] = useState();

    const Nestor = ({ texto }) => (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">{user ?? 'NESTOR'}</div>
                </div>
            </div>
        </div>
    )

    const cambiarNombre = () => {
        setUser('SAMUEL')
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registros</h2>}
        >
            <Head title="Registros" />
            <Nestor texto={'HOLA SOY COMPONENTE DE REACT EN LARAVEL'}></Nestor>
            <button type="button" onClick={cambiarNombre}>CLICK</button>

        </AuthenticatedLayout>
    );
}
