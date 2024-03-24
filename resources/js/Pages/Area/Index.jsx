import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
const Index_Area = ({ auth, areas }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Areas de Influencia</h2>
                    <Link href={route('areas.create')}>
                        CREAR Area de Incluencia
                    </Link>
                </div>
            }
        >
            <Head title="Areas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Area
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                ImagenDemo
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Accion
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            areas?.map(area => (
                                                <tr key={area.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {area.nameAreaI}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <img className='w-20' src={'/storage/logo.png'} alt="" srcset="" />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className='space-x-3'>
                                                            <Link href={route('areas.edit', [area])}>
                                                                Editar
                                                            </Link>
                                                            <Link method='delete' href={route('areas.destroy', [area])}>
                                                                Eliminar
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>

                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index_Area