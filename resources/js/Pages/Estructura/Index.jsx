import { Head, Link } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

const EstructuraIndex = ({ auth, estructuras }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">ESTRUCTURAS</h2>
                    <Link href={route('estructuras.create')}>
                        CREAR ESTRUCTURA
                    </Link>
                </div>
            }
        >
            <Head title="Estructuras" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Estructura
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Accion
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            estructuras?.map(estructura => (
                                                <tr key={estructura.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {estructura.nombreEstructura}
                                                    </th>

                                                    <td className="px-6 py-4">
                                                        <div className='space-x-3'>
                                                            <Link href={route('estructuras.edit', [estructura])}>
                                                                Editar
                                                            </Link>
                                                            <Link as="button" method='delete' href={route('estructuras.destroy', [estructura])}>
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

export default EstructuraIndex